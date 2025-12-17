import { getDictionary } from '@/lib/i18n/getDictionary'
import type { Locale } from '@/types'
import BookingWizard from '@/components/booking/BookingWizard'

interface BookingPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ service?: string; tier?: string }>
}

export default async function BookingPage({ params, searchParams }: BookingPageProps) {
  const { locale } = await params
  const { service, tier } = await searchParams
  const dictionary = await getDictionary(locale as Locale)

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-600 to-turquoise-600 py-16">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {dictionary.booking.title}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {locale === 'el'
              ? 'Κλείστε εύκολα και γρήγορα την επόμενη περιπέτειά σας'
              : 'Easily book your next adventure in just a few steps'}
          </p>
        </div>
      </section>

      {/* Booking Wizard */}
      <section className="py-12">
        <div className="container-custom">
          <BookingWizard
            locale={locale as Locale}
            dictionary={dictionary}
            initialService={service}
            initialTier={tier}
          />
        </div>
      </section>
    </div>
  )
}
