'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Anchor, Waves } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Locale } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'

interface HeroProps {
  locale: Locale
  dictionary: Dictionary
}

export default function Hero({ locale, dictionary }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-950 via-slate-900 to-turquoise-950" />

        {/* Floating gradient orbs with parallax */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-turquoise-500/20 rounded-full blur-[100px] transition-transform duration-300"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-ocean-500/20 rounded-full blur-[120px] transition-transform duration-500"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-coral-500/10 rounded-full blur-[80px] animate-pulse"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Anchor className="absolute top-20 left-[10%] w-8 h-8 text-white/5 animate-float" />
        <Waves className="absolute top-40 right-[15%] w-12 h-12 text-turquoise-500/10 animate-float delay-1000" />
        <div className="absolute bottom-40 left-[20%] w-2 h-2 bg-turquoise-400/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-[25%] w-3 h-3 bg-coral-400/20 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-1/3 right-[10%] w-4 h-4 bg-ocean-400/20 rounded-full animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4 pb-32 md:pb-40">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 bg-turquoise-400 rounded-full animate-pulse" />
          <span className="text-sm text-white/70">
            {locale === 'el' ? 'Λάρνακα, Κύπρος' : 'Larnaca, Cyprus'}
          </span>
        </div>

        {/* Main heading with gradient */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          <span className="block text-white mb-2">
            {locale === 'el' ? 'Η Θάλασσα' : 'The Sea'}
          </span>
          <span className="block bg-gradient-to-r from-turquoise-400 via-ocean-400 to-turquoise-300 bg-clip-text text-transparent">
            {locale === 'el' ? 'Σε Περιμένει' : 'Awaits You'}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
          {dictionary.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/booking`}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-turquoise-500 to-ocean-500 rounded-full text-white font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]"
          >
            <span className="relative z-10">{dictionary.hero.cta1}</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-ocean-500 to-turquoise-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href={`/${locale}/services`}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white/80 font-semibold text-lg border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all"
          >
            {dictionary.hero.cta2}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 mt-16 pt-10 border-t border-white/10 max-w-2xl mx-auto">
          {[
            { value: '10+', label: locale === 'el' ? 'Χρόνια' : 'Years' },
            { value: '5K+', label: locale === 'el' ? 'Πελάτες' : 'Clients' },
            { value: '15+', label: locale === 'el' ? 'Σκάφη' : 'Boats' },
            { value: '4.9', label: locale === 'el' ? 'Βαθμός' : 'Rating' },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm text-white/50 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-20 md:h-28"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100L48 90C96 80 192 60 288 50C384 40 480 40 576 45C672 50 768 60 864 65C960 70 1056 70 1152 65C1248 60 1344 50 1392 45L1440 40V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z"
            className="fill-white"
          />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
