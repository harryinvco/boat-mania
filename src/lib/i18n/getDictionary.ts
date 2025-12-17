import type { Locale } from '@/types'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  el: () => import('./dictionaries/el.json').then((module) => module.default),
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]()
}
