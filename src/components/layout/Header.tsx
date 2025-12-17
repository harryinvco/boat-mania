'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Locale } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'
import LanguageSwitcher from './LanguageSwitcher'
import Button from '../ui/Button'

interface HeaderProps {
  locale: Locale
  dictionary: Dictionary
}

export default function Header({ locale, dictionary }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: dictionary.navigation.home, href: `/${locale}` },
    {
      name: dictionary.navigation.services,
      href: `/${locale}/services`,
      children: [
        { name: dictionary.services.fishingCharters.title, href: `/${locale}/services/fishing-charters` },
        { name: dictionary.services.boatRentals.title, href: `/${locale}/services/boat-rentals` },
        { name: dictionary.services.privateCruises.title, href: `/${locale}/services/private-cruises` },
        { name: dictionary.services.maintenance.title, href: `/${locale}/services/maintenance` },
        { name: dictionary.services.fishingLessons.title, href: `/${locale}/services/fishing-lessons` },
        { name: dictionary.services.spearfishing.title, href: `/${locale}/services/spearfishing` },
      ],
    },
    { name: dictionary.navigation.marketplace, href: `/${locale}/marketplace` },
    { name: dictionary.navigation.gallery, href: `/${locale}/gallery` },
    { name: dictionary.navigation.about, href: `/${locale}/about` },
    { name: dictionary.navigation.contact, href: `/${locale}/contact` },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Boat Mania"
              width={50}
              height={50}
              className="h-12 w-12"
            />
            <span
              className={cn(
                'text-xl font-bold transition-colors',
                isScrolled ? 'text-slate-900' : 'text-white'
              )}
            >
              Boat Mania
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button
                    className={cn(
                      'flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                      isScrolled
                        ? 'text-slate-700 hover:text-turquoise-600 hover:bg-slate-100'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={cn(
                      'absolute left-0 top-full mt-1 w-56 rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/5 transition-all',
                      isServicesOpen
                        ? 'visible opacity-100 translate-y-0'
                        : 'invisible opacity-0 -translate-y-2'
                    )}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-turquoise-50 hover:text-turquoise-600 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                    isScrolled
                      ? 'text-slate-700 hover:text-turquoise-600 hover:bg-slate-100'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher locale={locale} isScrolled={isScrolled} />

            <Link href={`/${locale}/booking`} className="hidden sm:block">
              <Button variant={isScrolled ? 'primary' : 'white'} size="sm">
                {dictionary.common.bookNow}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-[500px] pb-4' : 'max-h-0'
          )}
        >
          <div className="space-y-1 pt-4">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className={cn(
                      'flex w-full items-center justify-between px-4 py-3 text-base font-medium rounded-lg',
                      isScrolled
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-white hover:bg-white/10'
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 transition-transform',
                        isServicesOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-200',
                      isServicesOpen ? 'max-h-96' : 'max-h-0'
                    )}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block px-8 py-2.5 text-sm',
                          isScrolled
                            ? 'text-slate-600 hover:text-turquoise-600'
                            : 'text-white/80 hover:text-white'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 text-base font-medium rounded-lg',
                    isScrolled
                      ? 'text-slate-700 hover:bg-slate-100'
                      : 'text-white hover:bg-white/10'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="px-4 pt-4">
              <Link href={`/${locale}/booking`} className="block">
                <Button variant="primary" className="w-full">
                  {dictionary.common.bookNow}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
