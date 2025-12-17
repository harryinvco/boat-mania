import Link from 'next/link'
import Image from 'next/image'
import { Check, Clock, Users, Euro } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import type { Service, Locale } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'

interface ServicePageTemplateProps {
  service: Service
  locale: Locale
  dictionary: Dictionary
}

export default function ServicePageTemplate({ service, locale, dictionary }: ServicePageTemplateProps) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src={service.heroImage}
          alt={service.title[locale]}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
        <div className="relative z-10 container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {service.title[locale]}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {service.shortDescription[locale]}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Description */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="heading-3 mb-4">
                  {locale === 'el' ? 'Σχετικά' : 'About This Service'}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {service.fullDescription[locale]}
                </p>
              </div>

              {/* What's Included */}
              <div>
                <h2 className="heading-3 mb-4">{dictionary.common.includes}</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.includes[locale].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-turquoise-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              {service.gallery.length > 0 && (
                <div>
                  <h2 className="heading-3 mb-4">
                    {locale === 'el' ? 'Συλλογή' : 'Gallery'}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {service.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-video rounded-xl overflow-hidden">
                        <Image
                          src={image}
                          alt={`${service.title[locale]} gallery ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Pricing & Booking */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card>
                <div className="p-6 space-y-4">
                  <div className="flex items-center text-slate-700">
                    <Clock className="w-5 h-5 text-turquoise-500 mr-3" />
                    <span>{dictionary.common.duration}: {service.duration}</span>
                  </div>
                  {service.maxGuests > 0 && (
                    <div className="flex items-center text-slate-700">
                      <Users className="w-5 h-5 text-turquoise-500 mr-3" />
                      <span>{dictionary.common.maxGuests}: {service.maxGuests}</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Pricing Tiers */}
              {service.pricing.map((tier) => (
                <Card key={tier.id} hover>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900">
                        {tier.name[locale]}
                      </h3>
                      <span className="text-sm text-slate-500">{tier.duration}</span>
                    </div>

                    <div className="flex items-baseline mb-4">
                      <Euro className="w-5 h-5 text-turquoise-600 mr-1" />
                      <span className="text-3xl font-bold text-turquoise-600">{tier.price}</span>
                      {tier.maxGuests > 0 && (
                        <span className="text-slate-500 ml-2">
                          / {locale === 'el' ? 'έως' : 'up to'} {tier.maxGuests} {dictionary.common.guests}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2 mb-6">
                      {tier.includes[locale].slice(0, 4).map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-slate-600">
                          <Check className="w-4 h-4 text-turquoise-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {tier.depositPercentage > 0 && (
                      <p className="text-sm text-slate-500 mb-4">
                        {dictionary.booking.depositRequired}: {tier.depositPercentage}%
                      </p>
                    )}

                    <Link href={`/${locale}/booking?service=${service.slug}&tier=${tier.id}`}>
                      <Button className="w-full">{dictionary.common.bookNow}</Button>
                    </Link>
                  </div>
                </Card>
              ))}

              {/* WhatsApp Contact */}
              <Card className="bg-slate-50 border-0">
                <div className="p-6 text-center">
                  <p className="text-slate-600 mb-4">
                    {locale === 'el'
                      ? 'Έχετε ερωτήσεις; Επικοινωνήστε μαζί μας!'
                      : 'Have questions? Get in touch!'}
                  </p>
                  <a
                    href={`https://wa.me/35799000000?text=${encodeURIComponent(
                      locale === 'el'
                        ? `Γεια! Ενδιαφέρομαι για ${service.title[locale]}`
                        : `Hi! I'm interested in ${service.title[locale]}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" className="w-full">
                      {dictionary.common.whatsappChat}
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
