'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Locale } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'

interface WhatsAppButtonProps {
  locale: Locale
  dictionary: Dictionary
}

// Placeholder WhatsApp number - easily configurable
const WHATSAPP_NUMBER = '35799000000'

export default function WhatsAppButton({ locale, dictionary }: WhatsAppButtonProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Show tooltip after a delay on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated) {
        setIsTooltipVisible(true)
        setHasAnimated(true)
        // Hide tooltip after 5 seconds
        setTimeout(() => setIsTooltipVisible(false), 5000)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [hasAnimated])

  const defaultMessage = locale === 'el'
    ? 'Γεια! Ενδιαφέρομαι για τις υπηρεσίες σας.'
    : "Hi! I'm interested in your boat services."

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <div
        className={cn(
          'absolute bottom-full right-0 mb-3 transition-all duration-300',
          isTooltipVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
        )}
      >
        <div className="relative bg-white rounded-xl shadow-lg p-4 max-w-[250px]">
          <button
            onClick={() => setIsTooltipVisible(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-sm text-slate-700 pr-4">
            {locale === 'el'
              ? 'Χρειάζεστε βοήθεια; Στείλτε μας μήνυμα στο WhatsApp!'
              : 'Need help? Send us a message on WhatsApp!'}
          </p>
          {/* Arrow */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 shadow-lg" />
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg',
          'hover:bg-[#20BD5A] hover:scale-110 transition-all duration-300',
          'animate-pulse-slow'
        )}
        aria-label={dictionary.common.whatsappChat}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
    </div>
  )
}
