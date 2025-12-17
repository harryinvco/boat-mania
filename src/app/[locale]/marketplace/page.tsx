import Link from 'next/link'
import { Ship, Fish, Wrench, ArrowRight } from 'lucide-react'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { getFeaturedListings } from '@/data/marketplace'
import type { Locale } from '@/types'
import Card from '@/components/ui/Card'
import ListingCard from '@/components/marketplace/ListingCard'

interface MarketplacePageProps {
  params: Promise<{ locale: string }>
}

const categories = [
  {
    id: 'boats',
    key: 'boats',
    icon: Ship,
    color: 'bg-ocean-100 text-ocean-600',
    href: '/marketplace/boats',
  },
  {
    id: 'fishing-gear',
    key: 'fishingGear',
    icon: Fish,
    color: 'bg-turquoise-100 text-turquoise-600',
    href: '/marketplace/fishing-gear',
  },
  {
    id: 'parts-accessories',
    key: 'partsAccessories',
    icon: Wrench,
    color: 'bg-sand-100 text-sand-600',
    href: '/marketplace/parts-accessories',
  },
]

export default async function MarketplacePage({ params }: MarketplacePageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)
  const featuredListings = getFeaturedListings()

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-600 to-turquoise-600 py-20">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {dictionary.marketplace.title}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {dictionary.marketplace.subtitle}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.id}
                  href={`/${locale}${category.href}`}
                  className="group"
                >
                  <Card hover className="h-full">
                    <div className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-turquoise-600 transition-colors">
                        {dictionary.marketplace[category.key as keyof typeof dictionary.marketplace]}
                      </h3>
                      <div className="flex items-center justify-center text-turquoise-600 font-medium">
                        <span>{locale === 'el' ? 'Δείτε Αγγελίες' : 'Browse Listings'}</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-2 mb-8">
            {locale === 'el' ? 'Προτεινόμενες Αγγελίες' : 'Featured Listings'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((item) => (
              <ListingCard
                key={item.id}
                item={item}
                locale={locale as Locale}
                dictionary={dictionary}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
