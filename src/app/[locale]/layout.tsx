import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { i18nConfig } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import type { Locale } from '@/types'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/common/WhatsAppButton'

const inter = Inter({
  subsets: ['latin', 'greek'],
  variable: '--font-inter',
})

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isGreek = locale === 'el'

  return {
    title: isGreek
      ? 'Boat Mania | Ψαρευτικές Εκδρομές & Ενοικίαση Σκαφών στη Λάρνακα'
      : 'Boat Mania | Fishing Charters & Boat Rentals in Larnaca, Cyprus',
    description: isGreek
      ? 'Ζήστε τις καλύτερες ψαρευτικές εκδρομές, ενοικίαση σκαφών και θαλάσσιες περιπέτειες στη Λάρνακα, Κύπρος.'
      : 'Experience the best fishing charters, boat rentals, and marine adventures in Larnaca, Cyprus. Book your unforgettable trip today!',
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!i18nConfig.locales.includes(locale as Locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale as Locale)

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Header locale={locale as Locale} dictionary={dictionary} />
        <main className="flex-1">
          {children}
        </main>
        <Footer locale={locale as Locale} dictionary={dictionary} />
        <WhatsAppButton locale={locale as Locale} dictionary={dictionary} />
      </body>
    </html>
  )
}
