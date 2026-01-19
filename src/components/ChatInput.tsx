'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onOpenCatalog?: () => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, onOpenCatalog, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '52px';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '52px';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const quickActions = [
    { icon: '💊', label: 'Pain Relief', query: 'Show me painkillers' },
    { icon: '🍊', label: 'Vitamins', query: 'Show me vitamins' },
    { icon: '🤧', label: 'Allergy', query: 'Show me allergy medicines' },
    { icon: '🔥', label: 'On Sale', query: 'Show me products on sale' },
  ];

  return (
    <div className="bg-white border-t border-gray-100 safe-bottom">
      {/* Quick Actions */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {quickActions.map((item) => (
          <button
            key={item.label}
            onClick={() => onSend(item.query)}
            disabled={disabled}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-all touch-scale disabled:opacity-50 flex-shrink-0"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-4 pb-4">
        <div
          className={`flex items-end gap-2 p-2 rounded-3xl transition-all duration-200 ${
            isFocused
              ? 'bg-white ring-2 ring-[#00C896]/30 shadow-lg'
              : 'bg-gray-100'
          }`}
        >
          {/* Catalog Button */}
          {onOpenCatalog && (
            <button
              onClick={onOpenCatalog}
              className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-[#00C896] to-[#00A87A] text-white rounded-2xl flex items-center justify-center shadow-sm touch-scale hover:shadow-md transition-all"
              title="Browse Products"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
              </svg>
            </button>
          )}

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask me anything..."
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent px-3 py-3 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none resize-none disabled:opacity-50"
            style={{ minHeight: '52px', maxHeight: '120px' }}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center transition-all touch-scale ${
              message.trim() && !disabled
                ? 'bg-gradient-to-br from-[#00C896] to-[#00A87A] text-white shadow-sm hover:shadow-md'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
