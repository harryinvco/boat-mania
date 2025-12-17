import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { getServiceBySlug } from '@/data/services'
import type { Locale } from '@/types'
import ServicePageTemplate from '@/components/services/ServicePageTemplate'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function SpearfishingPage({ params }: PageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)
  const service = getServiceBySlug('spearfishing')

  if (!service) {
    notFound()
  }

  return (
    <ServicePageTemplate
      service={service}
      locale={locale as Locale}
      dictionary={dictionary}
    />
  )
}
