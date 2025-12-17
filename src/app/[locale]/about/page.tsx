import Image from 'next/image'
import { Check, Anchor, Shield, Users, Award, Heart, Globe } from 'lucide-react'
import { getDictionary } from '@/lib/i18n/getDictionary'
import type { Locale } from '@/types'
import Card from '@/components/ui/Card'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  const reasons = [
    { icon: Users, text: dictionary.about.reason1 },
    { icon: Anchor, text: dictionary.about.reason2 },
    { icon: Award, text: dictionary.about.reason3 },
    { icon: Shield, text: dictionary.about.reason4 },
    { icon: Heart, text: dictionary.about.reason5 },
    { icon: Globe, text: dictionary.about.reason6 },
  ]

  const stats = [
    { value: '10+', label: locale === 'el' ? 'Χρόνια Εμπειρίας' : 'Years Experience' },
    { value: '5000+', label: locale === 'el' ? 'Ικανοποιημένοι Πελάτες' : 'Happy Customers' },
    { value: '15+', label: locale === 'el' ? 'Σκάφη στον Στόλο' : 'Boats in Fleet' },
    { value: '4.9', label: locale === 'el' ? 'Βαθμολογία' : 'Rating' },
  ]

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80"
          alt="Boat Mania Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
        <div className="relative z-10 container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {dictionary.about.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {dictionary.about.subtitle}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-turquoise-600 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-turquoise-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">{dictionary.about.story}</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {dictionary.about.storyText}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                {locale === 'el'
                  ? 'Με πάθος για τη θάλασσα και αφοσίωση στην εξυπηρέτηση, συνεχίζουμε να προσφέρουμε αξέχαστες εμπειρίες σε κάθε πελάτη μας. Η ομάδα μας αποτελείται από έμπειρους ψαράδες και καπετάνιους που γνωρίζουν τα νερά της Κύπρου σαν την παλάμη τους.'
                  : 'With a passion for the sea and a dedication to service, we continue to provide unforgettable experiences to every customer. Our team consists of experienced fishermen and captains who know Cyprus waters like the back of their hands.'}
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
                alt="Fishing in Cyprus"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6">{dictionary.about.mission}</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              {dictionary.about.missionText}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-12">{dictionary.about.whyChooseUs}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-turquoise-100 text-turquoise-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-slate-900">{reason.text}</h3>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ocean-600 py-16">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'el'
              ? 'Έτοιμοι να ξεκινήσετε;'
              : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {locale === 'el'
              ? 'Επικοινωνήστε μαζί μας σήμερα και κλείστε την επόμενη περιπέτειά σας!'
              : 'Contact us today and book your next adventure!'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`/${locale}/booking`}
              className="btn-primary min-w-[180px]"
            >
              {dictionary.common.bookNow}
            </a>
            <a
              href={`/${locale}/contact`}
              className="btn-outline border-white text-white hover:bg-white hover:text-ocean-600 min-w-[180px]"
            >
              {dictionary.common.contactUs}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
