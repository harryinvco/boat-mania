import { getDictionary } from '@/lib/i18n/getDictionary'
import type { Locale } from '@/types'
import Hero from '@/components/sections/Hero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import Testimonials from '@/components/sections/Testimonials'
import WeatherWidget from '@/components/sections/WeatherWidget'
import GalleryPreview from '@/components/sections/GalleryPreview'
import CTASection from '@/components/sections/CTASection'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  return (
    <>
      <Hero locale={locale as Locale} dictionary={dictionary} />
      <ServicesGrid locale={locale as Locale} dictionary={dictionary} />
      <WeatherWidget locale={locale as Locale} dictionary={dictionary} />
      <Testimonials locale={locale as Locale} dictionary={dictionary} />
      <GalleryPreview locale={locale as Locale} dictionary={dictionary} />
      <CTASection locale={locale as Locale} dictionary={dictionary} />
    </>
  )
}
