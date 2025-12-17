'use client'

import Link from 'next/link'
import { ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Locale } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'

interface CTASectionProps {
  locale: Locale
  dictionary: Dictionary
}

export default function CTASection({ locale, dictionary }: CTASectionProps) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-turquoise-100 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ocean-100 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="container-custom relative">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA card */}
          <div className="relative rounded-[2rem] overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

            {/* Animated gradient orbs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-turquoise-500/30 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-ocean-500/30 rounded-full blur-[80px] animate-pulse delay-1000" />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative p-10 md:p-16 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-8">
                <span className="w-2 h-2 bg-turquoise-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/70">
                  {locale === 'el' ? 'Διαθέσιμοι τώρα' : 'Available now'}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {locale === 'el'
                  ? 'Έτοιμοι για την'
                  : 'Ready for Your'}
                <span className="block mt-2 bg-gradient-to-r from-turquoise-400 to-ocean-400 bg-clip-text text-transparent">
                  {locale === 'el' ? 'Περιπέτειά σας;' : 'Adventure?'}
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10">
                {locale === 'el'
                  ? 'Κλείστε τώρα και ζήστε τις καλύτερες θαλάσσιες εμπειρίες της Κύπρου. Οι καπετάνιοι μας σας περιμένουν!'
                  : "Book now and experience the best of Cyprus's waters. Our expert captains are waiting for you!"}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/${locale}/booking`}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-turquoise-500 to-ocean-500 rounded-full text-white font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]"
                >
                  <span className="relative z-10">{dictionary.common.bookNow}</span>
                  <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-ocean-500 to-turquoise-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <a
                  href="https://wa.me/35799000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg border border-white/20 hover:bg-white/10 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>

              {/* Contact info */}
              <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-white/10">
                <a
                  href="tel:+35799000000"
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +357 99 000 000
                </a>
                <div className="hidden sm:block w-px h-6 bg-white/20" />
                <p className="text-white/60">
                  {locale === 'el' ? 'Καθημερινά 6:00 - 20:00' : 'Daily 6:00 AM - 8:00 PM'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
