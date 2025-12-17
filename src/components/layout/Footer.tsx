import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import type { Locale } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'

interface FooterProps {
  locale: Locale
  dictionary: Dictionary
}

export default function Footer({ locale, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: dictionary.navigation.home, href: `/${locale}` },
    { name: dictionary.navigation.services, href: `/${locale}/services` },
    { name: dictionary.navigation.marketplace, href: `/${locale}/marketplace` },
    { name: dictionary.navigation.gallery, href: `/${locale}/gallery` },
    { name: dictionary.navigation.about, href: `/${locale}/about` },
    { name: dictionary.navigation.contact, href: `/${locale}/contact` },
  ]

  const services = [
    { name: dictionary.services.fishingCharters.title, href: `/${locale}/services/fishing-charters` },
    { name: dictionary.services.boatRentals.title, href: `/${locale}/services/boat-rentals` },
    { name: dictionary.services.privateCruises.title, href: `/${locale}/services/private-cruises` },
    { name: dictionary.services.maintenance.title, href: `/${locale}/services/maintenance` },
    { name: dictionary.services.fishingLessons.title, href: `/${locale}/services/fishing-lessons` },
    { name: dictionary.services.spearfishing.title, href: `/${locale}/services/spearfishing` },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/boatmania' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/boatmania' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/boatmania' },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="Boat Mania"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <span className="text-xl font-bold">Boat Mania</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {dictionary.footer.description}
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-turquoise-500 hover:text-white"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-turquoise-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer.services}</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-turquoise-400 transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer.contact}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-turquoise-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  Larnaca Marina<br />
                  Larnaca, Cyprus
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-turquoise-400 flex-shrink-0" />
                <a
                  href="tel:+35799000000"
                  className="text-slate-400 hover:text-turquoise-400 transition-colors text-sm"
                >
                  +357 99 000 000
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-turquoise-400 flex-shrink-0" />
                <a
                  href="mailto:info@boatmania.cy"
                  className="text-slate-400 hover:text-turquoise-400 transition-colors text-sm"
                >
                  info@boatmania.cy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-6">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-slate-500 text-sm">
              © {currentYear} Boat Mania. {dictionary.footer.rights}
            </p>
            <div className="flex space-x-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-slate-500 hover:text-slate-400 transition-colors text-sm"
              >
                {dictionary.footer.privacy}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-slate-500 hover:text-slate-400 transition-colors text-sm"
              >
                {dictionary.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
