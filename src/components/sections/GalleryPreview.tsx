'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Camera, Fish, Ship, Anchor, Waves } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Locale } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'

interface GalleryPreviewProps {
  locale: Locale
  dictionary: Dictionary
}

// Placeholder items with gradients instead of images
const galleryItems = [
  { id: 1, icon: Fish, gradient: 'from-turquoise-400 to-ocean-600', title: 'Big Catch', category: 'catches' },
  { id: 2, icon: Ship, gradient: 'from-ocean-500 to-ocean-700', title: 'Sunset Cruise', category: 'trips' },
  { id: 3, icon: Anchor, gradient: 'from-slate-500 to-slate-700', title: 'Our Fleet', category: 'boats' },
  { id: 4, icon: Waves, gradient: 'from-turquoise-500 to-turquoise-700', title: 'Spearfishing', category: 'spearfishing' },
  { id: 5, icon: Camera, gradient: 'from-coral-400 to-coral-600', title: 'Adventures', category: 'events' },
  { id: 6, icon: Fish, gradient: 'from-sand-400 to-sand-600', title: 'Trophy Fish', category: 'catches' },
]

export default function GalleryPreview({ locale, dictionary }: GalleryPreviewProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-24 bg-slate-50">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              {dictionary.gallery.title}
            </h2>
            <p className="text-lg text-slate-500">
              {dictionary.gallery.subtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/gallery`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors group"
          >
            {dictionary.common.viewAll}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Masonry-ish grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => {
            const Icon = item.icon
            const isHovered = hoveredId === item.id
            const isLarge = index === 0 || index === 3

            return (
              <Link
                key={item.id}
                href={`/${locale}/gallery`}
                className={cn(
                  'group relative rounded-3xl overflow-hidden',
                  isLarge ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'
                )}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Gradient background */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br transition-all duration-500',
                  item.gradient,
                  isHovered && 'scale-110'
                )} />

                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`pattern-${item.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1.5" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-${item.id})`} />
                  </svg>
                </div>

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className={cn(
                    'text-white/20 transition-all duration-500',
                    isLarge ? 'w-24 h-24' : 'w-16 h-16',
                    isHovered && 'scale-125 text-white/30'
                  )} />
                </div>

                {/* Overlay on hover */}
                <div className={cn(
                  'absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300',
                  isHovered && 'opacity-100'
                )}>
                  <Camera className="w-8 h-8 text-white mb-2" />
                  <p className="text-white font-medium">{item.title}</p>
                </div>

                {/* Category badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                    {dictionary.gallery[item.category as keyof typeof dictionary.gallery] || item.category}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
