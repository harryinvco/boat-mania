'use client'

import { cn } from '@/lib/utils/cn'
import { Waves, Fish, Anchor, Ship, Compass, Sun } from 'lucide-react'

interface PlaceholderProps {
  className?: string
  variant?: 'ocean' | 'sunset' | 'deep' | 'coral' | 'sand'
  icon?: 'waves' | 'fish' | 'anchor' | 'ship' | 'compass' | 'sun' | 'none'
  animate?: boolean
}

const gradients = {
  ocean: 'from-turquoise-400 via-ocean-500 to-ocean-700',
  sunset: 'from-coral-400 via-sand-400 to-turquoise-500',
  deep: 'from-ocean-700 via-ocean-800 to-slate-900',
  coral: 'from-coral-300 via-coral-500 to-ocean-600',
  sand: 'from-sand-300 via-turquoise-400 to-ocean-500',
}

const icons = {
  waves: Waves,
  fish: Fish,
  anchor: Anchor,
  ship: Ship,
  compass: Compass,
  sun: Sun,
  none: null,
}

export default function Placeholder({
  className,
  variant = 'ocean',
  icon = 'waves',
  animate = true,
}: PlaceholderProps) {
  const Icon = icons[icon]

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gradient-to-br',
        gradients[variant],
        className
      )}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M0 10 Q 25 0, 50 10 T 100 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-white"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves-pattern)" />
        </svg>
      </div>

      {/* Floating circles for depth */}
      <div className={cn(
        'absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10',
        animate && 'animate-pulse'
      )} />
      <div className={cn(
        'absolute -bottom-20 -left-10 w-60 h-60 rounded-full bg-white/5',
        animate && 'animate-pulse delay-1000'
      )} />

      {/* Center icon */}
      {Icon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={cn(
            'w-16 h-16 text-white/30',
            animate && 'animate-float'
          )} />
        </div>
      )}
    </div>
  )
}

// Hero placeholder with animated waves
export function HeroPlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden bg-slate-900', className)}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-900 via-ocean-800 to-turquoise-900" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-turquoise-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ocean-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-coral-500/20 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

      {/* Animated wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 md:h-32"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  )
}
