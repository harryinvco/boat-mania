'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { getFeaturedTestimonials } from '@/data/testimonials'
import type { Locale } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'

interface TestimonialsProps {
  locale: Locale
  dictionary: Dictionary
}

export default function Testimonials({ locale, dictionary }: TestimonialsProps) {
  const testimonials = getFeaturedTestimonials()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const next = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-turquoise-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ocean-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {dictionary.testimonials.title}
          </h2>
          <p className="text-lg text-white/50">
            {dictionary.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote icon */}
            <Quote className="absolute -top-8 -left-4 w-20 h-20 text-turquoise-500/20" />

            {/* Cards */}
            <div className="relative min-h-[300px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    'absolute inset-0 transition-all duration-700',
                    index === activeIndex
                      ? 'opacity-100 translate-x-0 scale-100'
                      : index < activeIndex
                      ? 'opacity-0 -translate-x-full scale-95'
                      : 'opacity-0 translate-x-full scale-95'
                  )}
                >
                  {/* Card */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-5 h-5',
                            i < testimonial.rating
                              ? 'text-sand-400 fill-sand-400'
                              : 'text-white/20'
                          )}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                      "{testimonial.content[locale]}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-turquoise-400 to-ocean-500 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.customerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.customerName}</p>
                        {testimonial.customerLocation && (
                          <p className="text-white/50 text-sm">{testimonial.customerLocation}</p>
                        )}
                      </div>
                      {testimonial.verified && (
                        <div className="ml-auto px-3 py-1 rounded-full bg-turquoise-500/20 text-turquoise-400 text-xs font-medium">
                          {locale === 'el' ? 'Επαληθευμένο' : 'Verified'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Progress dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false)
                      setActiveIndex(index)
                    }}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      index === activeIndex
                        ? 'w-8 bg-turquoise-500'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    )}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
