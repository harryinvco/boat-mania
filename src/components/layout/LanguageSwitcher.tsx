'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Locale } from '@/types'
import { i18nConfig } from '@/lib/i18n/config'

interface LanguageSwitcherProps {
  locale: Locale
  isScrolled?: boolean
}

export default function LanguageSwitcher({ locale, isScrolled = true }: LanguageSwitcherProps) {
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    // Replace the locale in the pathname
    const segments = pathname.split('/')
    segments[1] = newLocale
    return segments.join('/')
  }

  const otherLocale = locale === 'en' ? 'el' : 'en'

  return (
    <Link
      href={switchLocale(otherLocale)}
      className={cn(
        'flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        isScrolled
          ? 'text-slate-700 hover:bg-slate-100'
          : 'text-white/90 hover:text-white hover:bg-white/10'
      )}
      title={`Switch to ${i18nConfig.localeNames[otherLocale]}`}
    >
      <Globe className="h-4 w-4" />
      <span className="uppercase">{otherLocale}</span>
    </Link>
  )
}
