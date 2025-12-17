'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { galleryItems } from '@/data/gallery'
import type { GalleryCategory } from '@/types'

const categories: { id: GalleryCategory | 'all'; labelEn: string; labelEl: string }[] = [
  { id: 'all', labelEn: 'All', labelEl: 'Όλα' },
  { id: 'catches', labelEn: 'Catches', labelEl: 'Ψαριά' },
  { id: 'trips', labelEn: 'Trips', labelEl: 'Εκδρομές' },
  { id: 'boats', labelEn: 'Boats', labelEl: 'Σκάφη' },
  { id: 'spearfishing', labelEn: 'Spearfishing', labelEl: 'Υποβρύχιο' },
  { id: 'events', labelEn: 'Events', labelEl: 'Εκδηλώσεις' },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'all'>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Get locale from URL
  const locale = typeof window !== 'undefined'
    ? window.location.pathname.split('/')[1] as 'en' | 'el'
    : 'en'

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
    }
  }

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length)
    }
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-600 to-turquoise-600 py-20">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {locale === 'el' ? 'Συλλογή' : 'Gallery'}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {locale === 'el'
              ? 'Αναμνήσεις από τη θάλασσα'
              : 'Memories from the sea'}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b sticky top-20 z-30">
        <div className="container-custom">
          <div className="flex overflow-x-auto py-4 space-x-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  activeCategory === category.id
                    ? 'bg-turquoise-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {locale === 'el' ? category.labelEl : category.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => openLightbox(index)}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <Image
                  src={item.thumbnailUrl}
                  alt={item.title || 'Gallery image'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image */}
          <div className="relative w-full max-w-5xl h-[80vh] mx-4">
            <Image
              src={filteredItems[lightboxIndex].url}
              alt={filteredItems[lightboxIndex].title || 'Gallery image'}
              fill
              className="object-contain"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60">
            {lightboxIndex + 1} / {filteredItems.length}
          </div>
        </div>
      )}
    </div>
  )
}
