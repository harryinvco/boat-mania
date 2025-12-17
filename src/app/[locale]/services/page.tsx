import { getDictionary } from '@/lib/i18n/getDictionary'
import type { Locale } from '@/types'
import ServicesGrid from '@/components/sections/ServicesGrid'

interface ServicesPageProps {
  params: Promise<{ locale: string }>
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-600 to-turquoise-600 py-20">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {dictionary.services.title}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {dictionary.services.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid locale={locale as Locale} dictionary={dictionary} />
    </div>
  )
}
