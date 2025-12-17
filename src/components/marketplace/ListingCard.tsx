import Link from 'next/link'
import Image from 'next/image'
import { MapPin, CheckCircle } from 'lucide-react'
import Badge from '../ui/Badge'
import type { MarketplaceItem, Locale } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'

interface ListingCardProps {
  item: MarketplaceItem
  locale: Locale
  dictionary: Dictionary
}

const conditionColors = {
  'new': 'success',
  'like-new': 'success',
  'good': 'info',
  'fair': 'warning',
  'parts-only': 'error',
} as const

const conditionLabels = {
  'new': { en: 'New', el: 'Καινούργιο' },
  'like-new': { en: 'Like New', el: 'Σαν Καινούργιο' },
  'good': { en: 'Good', el: 'Καλό' },
  'fair': { en: 'Fair', el: 'Μέτριο' },
  'parts-only': { en: 'Parts Only', el: 'Ανταλλακτικά' },
}

export default function ListingCard({ item, locale, dictionary }: ListingCardProps) {
  const categoryPaths = {
    'boats': 'boats',
    'fishing-gear': 'fishing-gear',
    'parts-accessories': 'parts-accessories',
  }

  return (
    <Link
      href={`/${locale}/marketplace/${categoryPaths[item.category]}/${item.id}`}
      className="group block"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge variant={conditionColors[item.condition]} size="sm">
              {conditionLabels[item.condition][locale]}
            </Badge>
            {item.featured && (
              <Badge variant="warning" size="sm">
                {locale === 'el' ? 'Προτεινόμενο' : 'Featured'}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-turquoise-600 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
            {item.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-turquoise-600">€{item.price.toLocaleString()}</span>
              {item.negotiable && (
                <span className="ml-2 text-sm text-slate-500">
                  ({dictionary.marketplace.negotiable})
                </span>
              )}
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center text-sm text-slate-500">
              <MapPin className="w-4 h-4 mr-1" />
              {item.seller.location}
            </div>
            {item.seller.verified && (
              <div className="flex items-center text-sm text-turquoise-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                {dictionary.marketplace.verified}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
