import { getDictionary } from '@/lib/i18n/getDictionary'
import { getMarketplaceByCategory } from '@/data/marketplace'
import type { Locale } from '@/types'
import ListingCard from '@/components/marketplace/ListingCard'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function BoatsPage({ params }: PageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)
  const listings = getMarketplaceByCategory('boats')

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-600 to-turquoise-600 py-16">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {dictionary.marketplace.boats}
          </h1>
          <p className="text-xl text-white/80">
            {locale === 'el'
              ? 'Βρείτε το τέλειο σκάφος για τις ανάγκες σας'
              : 'Find the perfect boat for your needs'}
          </p>
        </div>
      </section>

      {/* Listings */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          {listings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((item) => (
                <ListingCard
                  key={item.id}
                  item={item}
                  locale={locale as Locale}
                  dictionary={dictionary}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">{dictionary.marketplace.noResults}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
