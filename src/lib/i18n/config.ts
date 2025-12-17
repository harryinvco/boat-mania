import type { Locale } from '@/types'

export const i18nConfig = {
  defaultLocale: 'en' as Locale,
  locales: ['en', 'el'] as Locale[],
  localeNames: {
    en: 'English',
    el: 'Ελληνικά',
  },
}

export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale)
}
