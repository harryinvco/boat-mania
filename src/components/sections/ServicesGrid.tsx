'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Fish, Ship, PartyPopper, Wrench, GraduationCap, Waves, ArrowUpRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Locale } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'

interface ServicesGridProps {
  locale: Locale
  dictionary: Dictionary
}

const serviceData = [
  {
    id: 'fishing-charters',
    key: 'fishingCharters',
    icon: Fish,
    gradient: 'from-turquoise-500 to-ocean-600',
    bgGradient: 'from-turquoise-500/10 to-ocean-500/10',
    accentColor: 'text-turquoise-500',
    size: 'large',
    price: '€250',
  },
  {
    id: 'boat-rentals',
    key: 'boatRentals',
    icon: Ship,
    gradient: 'from-ocean-500 to-ocean-700',
    bgGradient: 'from-ocean-500/10 to-ocean-700/10',
    accentColor: 'text-ocean-500',
    size: 'medium',
    price: '€150',
  },
  {
    id: 'private-cruises',
    key: 'privateCruises',
    icon: PartyPopper,
    gradient: 'from-coral-400 to-coral-600',
    bgGradient: 'from-coral-400/10 to-coral-600/10',
    accentColor: 'text-coral-500',
    size: 'medium',
    price: '€350',
  },
  {
    id: 'spearfishing',
    key: 'spearfishing',
    icon: Waves,
    gradient: 'from-turquoise-400 to-turquoise-600',
    bgGradient: 'from-turquoise-400/10 to-turquoise-600/10',
    accentColor: 'text-turquoise-400',
    size: 'large',
    price: '€180',
  },
  {
    id: 'fishing-lessons',
    key: 'fishingLessons',
    icon: GraduationCap,
    gradient: 'from-sand-400 to-sand-600',
    bgGradient: 'from-sand-400/10 to-sand-500/10',
    accentColor: 'text-sand-500',
    size: 'small',
    price: '€100',
  },
  {
    id: 'maintenance',
    key: 'maintenance',
    icon: Wrench,
    gradient: 'from-slate-500 to-slate-700',
    bgGradient: 'from-slate-400/10 to-slate-500/10',
    accentColor: 'text-slate-500',
    size: 'small',
    price: '€80',
  },
]

export default function ServicesGrid({ locale, dictionary }: ServicesGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-turquoise-50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-ocean-50 to-transparent pointer-events-none" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turquoise-50 text-turquoise-600 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              {locale === 'el' ? 'Τι Προσφέρουμε' : 'What We Offer'}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              {dictionary.services.title}
            </h2>
          </div>
          <p className="text-lg text-slate-500 max-w-md">
            {dictionary.services.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
          {serviceData.map((service, index) => {
            const Icon = service.icon
            const serviceInfo = dictionary.services[service.key as keyof typeof dictionary.services] as {
              title: string
              shortDescription: string
            }
            const isHovered = hoveredId === service.id
            const isLarge = service.size === 'large'
            const isMedium = service.size === 'medium'

            return (
              <Link
                key={service.id}
                href={`/${locale}/services/${service.id}`}
                className={cn(
                  'group relative rounded-3xl overflow-hidden transition-all duration-500',
                  isLarge && 'md:col-span-2 md:row-span-2',
                  isMedium && 'lg:col-span-2',
                )}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Background gradient */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br transition-opacity duration-500',
                  service.bgGradient,
                  isHovered ? 'opacity-100' : 'opacity-50'
                )} />

                {/* Animated gradient border */}
                <div className={cn(
                  'absolute inset-0 rounded-3xl border-2 transition-all duration-500',
                  isHovered ? 'border-transparent' : 'border-slate-100'
                )} />
                <div className={cn(
                  'absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                  'bg-gradient-to-br p-[2px]',
                  service.gradient
                )}>
                  <div className="absolute inset-[2px] rounded-[22px] bg-white" />
                </div>

                {/* Content */}
                <div className="relative h-full p-6 flex flex-col">
                  {/* Icon with gradient background */}
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500',
                    'bg-gradient-to-br',
                    service.gradient,
                    isHovered && 'scale-110 shadow-lg'
                  )}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1">
                    <h3 className={cn(
                      'font-bold text-slate-900 mb-2 transition-colors',
                      isLarge ? 'text-2xl' : 'text-xl',
                      isHovered && service.accentColor
                    )}>
                      {serviceInfo.title}
                    </h3>
                    {(isLarge || isMedium) && (
                      <p className="text-slate-500 text-sm line-clamp-2">
                        {serviceInfo.shortDescription}
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-baseline gap-1">
                      <span className={cn('text-lg font-bold', service.accentColor)}>
                        {service.price}
                      </span>
                      <span className="text-xs text-slate-400">
                        {locale === 'el' ? 'από' : 'from'}
                      </span>
                    </div>
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                      isHovered ? `bg-gradient-to-br ${service.gradient} text-white` : 'bg-slate-100 text-slate-400'
                    )}>
                      <ArrowUpRight className={cn(
                        'w-5 h-5 transition-transform',
                        isHovered && 'rotate-45'
                      )} />
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={cn(
                  'absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
                  'bg-gradient-to-br blur-xl -z-10',
                  service.gradient
                )} />
              </Link>
            )
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-turquoise-600 font-medium transition-colors group"
          >
            {locale === 'el' ? 'Δείτε όλες τις υπηρεσίες' : 'View all services'}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
