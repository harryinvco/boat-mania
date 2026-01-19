'use client';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 animate-fade-in">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-2xl gradient-primary flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>

      <div className="bubble-assistant px-5 py-4">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></span>
          <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></span>
          <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></span>
        </div>
      </div>
    </div>
  );
}
