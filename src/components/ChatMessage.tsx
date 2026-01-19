'use client';

import { ChatMessage as ChatMessageType, Product, CartAction } from '@/types';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface ChatMessageProps {
  message: ChatMessageType;
}

function ProductChip({ product }: { product: Product }) {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);
  const isOutOfStock = product.stock_status === 'out_of_stock';

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl mt-2 touch-scale">
      {/* Image */}
      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white flex-shrink-0">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-bold text-gray-900 text-sm">
            {product.currency}{product.price.toFixed(2)}
          </span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
            isOutOfStock
              ? 'bg-red-100 text-red-600'
              : product.stock_status === 'low_stock'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-emerald-100 text-emerald-700'
          }`}>
            {isOutOfStock ? 'Out of stock' : product.stock_status === 'low_stock' ? 'Low stock' : 'In stock'}
          </span>
        </div>
      </div>

      {/* Add Button */}
      {!isOutOfStock && (
        <button
          onClick={() => addToCart(product)}
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all touch-scale ${
            inCart
              ? 'bg-[#00C896] text-white'
              : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-[#00C896] hover:text-[#00C896]'
          }`}
        >
          {inCart ? (
            <span className="text-sm font-bold">{quantity}</span>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

function ActionBadge({ action }: { action: CartAction }) {
  const getActionInfo = () => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
          text: `Added ${action.quantity || 1}x ${action.productName || 'item'}`,
          bgColor: 'bg-emerald-100',
          textColor: 'text-emerald-700',
        };
      case 'REMOVE_FROM_CART':
        return {
          icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ),
          text: `Removed ${action.productName || 'item'}`,
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
        };
      case 'UPDATE_QUANTITY':
        return {
          icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ),
          text: `Updated to ${action.quantity}x`,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
        };
      case 'CLEAR_CART':
        return {
          icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ),
          text: 'Cart cleared',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
        };
      default:
        return null;
    }
  };

  const info = getActionInfo();
  if (!info || action.type === 'SHOW_CART') return null;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${info.bgColor} ${info.textColor}`}>
      {info.icon}
      {info.text}
    </span>
  );
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const actions = message.metadata?.actions;

  if (isSystem) {
    return (
      <div className="flex justify-center my-3 animate-fade-in">
        <span className="text-xs text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full font-medium">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in-up`}
    >
      {/* Avatar for assistant */}
      {!isUser && (
        <div className="w-9 h-9 rounded-2xl gradient-primary flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
      )}

      <div
        className={`max-w-[85%] ${
          isUser ? 'bubble-user' : 'bubble-assistant'
        } px-4 py-3`}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>

        {/* Action Badges */}
        {actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {actions.map((action, index) => (
              <ActionBadge key={index} action={action} />
            ))}
          </div>
        )}

        {/* Product Cards */}
        {message.metadata?.products && message.metadata.products.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.metadata.products.slice(0, 3).map((product) => (
              <ProductChip key={product.id} product={product} />
            ))}
            {message.metadata.products.length > 3 && (
              <p className="text-xs text-gray-500 text-center mt-2">
                +{message.metadata.products.length - 3} more products
              </p>
            )}
          </div>
        )}

        {/* Timestamp */}
        <p
          className={`text-[10px] mt-2 ${
            isUser ? 'text-white/70' : 'text-gray-400'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
