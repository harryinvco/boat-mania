'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChatMessage as ChatMessageType,
  ConversationMessage,
  CartSummary,
  CartAction,
  EnhancedChatResponse,
} from '@/types';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/data/products';

const WELCOME_MESSAGE: ChatMessageType = {
  id: 'welcome',
  role: 'assistant',
  content: `Hey there! Welcome to PharmaCare+

I can help you find the right products, answer questions about medications, and assist with your order.

Try asking me things like:
- "Show me vitamins"
- "Add paracetamol to my cart"
- "What's in my cart?"

Tap the shop button below to browse our catalog, or ask me anything!`,
  timestamp: new Date(),
};

const MAX_HISTORY_LENGTH = 20;

interface ChatViewProps {
  onOpenCatalog?: () => void;
}

export default function ChatView({ onOpenCatalog }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE]);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Build cart summary for API context
  const getCartSummary = useCallback((): CartSummary => {
    return {
      items: cart.items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: cart.total,
      itemCount: cart.itemCount,
    };
  }, [cart]);

  // Execute cart actions returned from API
  const executeActions = useCallback((actions: CartAction[]) => {
    for (const action of actions) {
      switch (action.type) {
        case 'ADD_TO_CART':
          if (action.productId) {
            const product = getProductById(action.productId);
            if (product) {
              addToCart(product, action.quantity || 1);
            }
          }
          break;
        case 'REMOVE_FROM_CART':
          if (action.productId) {
            removeFromCart(action.productId);
          }
          break;
        case 'UPDATE_QUANTITY':
          if (action.productId && action.quantity !== undefined) {
            updateQuantity(action.productId, action.quantity);
          }
          break;
        case 'CLEAR_CART':
          clearCart();
          break;
        case 'SHOW_CART':
          // Could trigger a cart drawer/modal here
          break;
      }
    }
  }, [addToCart, removeFromCart, updateQuantity, clearCart]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Update conversation history
    const newHistory: ConversationMessage[] = [
      ...conversationHistory,
      { role: 'user' as const, content },
    ].slice(-MAX_HISTORY_LENGTH);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          conversationHistory: conversationHistory,
          cartContext: getCartSummary(),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data: EnhancedChatResponse = await response.json();

      // Execute any cart actions
      if (data.actions && data.actions.length > 0) {
        executeActions(data.actions);
      }

      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        metadata: {
          products: data.products,
          actions: data.actions,
        },
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Update history with assistant response
      setConversationHistory([
        ...newHistory,
        { role: 'assistant' as const, content: data.message },
      ].slice(-MAX_HISTORY_LENGTH));

    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: "Oops! Something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 glass z-10 px-4 py-3 safe-top border-b border-gray-100/50">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          {/* Logo */}
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full" />
          </div>

          {/* Title */}
          <div className="flex-1">
            <h1 className="font-bold text-gray-900 text-lg">PharmaCare+</h1>
            <p className="text-xs text-gray-500">Your AI pharmacy assistant</p>
          </div>

          {/* Cart Button */}
          {cart.itemCount > 0 && (
            <button
              onClick={onOpenCatalog}
              className="relative flex items-center gap-2 px-4 py-2.5 bg-[#00C896]/10 rounded-2xl touch-scale hover:bg-[#00C896]/20 transition-colors"
            >
              <svg className="w-5 h-5 text-[#00C896]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="text-sm font-bold text-[#00C896]">{cart.itemCount}</span>
            </button>
          )}
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 max-w-3xl mx-auto w-full">
        <ChatInput
          onSend={handleSendMessage}
          onOpenCatalog={onOpenCatalog}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
