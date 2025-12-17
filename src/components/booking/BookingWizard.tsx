'use client'

import { useState } from 'react'
import { Check, ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Input from '../ui/Input'
import { services } from '@/data/services'
import type { Locale, ServiceType } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'

interface BookingWizardProps {
  locale: Locale
  dictionary: Dictionary
  initialService?: string
  initialTier?: string
}

const steps = ['service', 'date', 'details', 'payment', 'confirmation']

export default function BookingWizard({ locale, dictionary, initialService, initialTier }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(initialService ? 1 : 0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingData, setBookingData] = useState({
    service: initialService || '',
    tier: initialTier || '',
    date: '',
    time: '',
    guests: 2,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  const [bookingRef, setBookingRef] = useState('')

  const selectedService = services.find((s) => s.slug === bookingData.service)
  const selectedTier = selectedService?.pricing.find((t) => t.id === bookingData.tier)

  const totalPrice = selectedTier?.price || 0
  const depositAmount = totalPrice * ((selectedTier?.depositPercentage || 20) / 100)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleServiceSelect = (serviceSlug: string) => {
    setBookingData((prev) => ({ ...prev, service: serviceSlug, tier: '' }))
  }

  const handleTierSelect = (tierId: string) => {
    setBookingData((prev) => ({ ...prev, tier: tierId }))
  }

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setBookingRef(`BM-${Date.now().toString(36).toUpperCase()}`)
    setIsProcessing(false)
    setCurrentStep(4) // Move to confirmation
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return bookingData.service && bookingData.tier
      case 1:
        return bookingData.date && bookingData.time
      case 2:
        return (
          bookingData.firstName &&
          bookingData.lastName &&
          bookingData.email &&
          bookingData.phone
        )
      case 3:
        return bookingData.cardNumber && bookingData.expiryDate && bookingData.cvv
      default:
        return true
    }
  }

  const stepLabels = [
    dictionary.booking.selectService,
    dictionary.booking.selectDate,
    dictionary.booking.guestDetails,
    dictionary.booking.payment,
    dictionary.booking.confirmation,
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {stepLabels.map((label, index) => (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-colors',
                  index < currentStep
                    ? 'bg-turquoise-500 text-white'
                    : index === currentStep
                    ? 'bg-turquoise-100 text-turquoise-600 ring-2 ring-turquoise-500'
                    : 'bg-slate-100 text-slate-400'
                )}
              >
                {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span
                className={cn(
                  'hidden sm:block ml-2 text-sm font-medium',
                  index === currentStep ? 'text-turquoise-600' : 'text-slate-400'
                )}
              >
                {label}
              </span>
              {index < stepLabels.length - 1 && (
                <ChevronRight className="w-5 h-5 text-slate-300 mx-2 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <div className="p-6 md:p-8">
          {/* Step 1: Service Selection */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">{dictionary.booking.selectService}</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.slug}
                    onClick={() => handleServiceSelect(service.slug)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all',
                      bookingData.service === service.slug
                        ? 'border-turquoise-500 bg-turquoise-50'
                        : 'border-slate-200 hover:border-turquoise-200'
                    )}
                  >
                    <h3 className="font-semibold text-slate-900">{service.title[locale]}</h3>
                    <p className="text-sm text-slate-600 mt-1">{service.shortDescription[locale]}</p>
                    <p className="text-turquoise-600 font-semibold mt-2">
                      {dictionary.common.from} €{service.pricing[0]?.price || 0}
                    </p>
                  </button>
                ))}
              </div>

              {bookingData.service && selectedService && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4">
                    {locale === 'el' ? 'Επιλέξτε Πακέτο' : 'Select Package'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedService.pricing.map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => handleTierSelect(tier.id)}
                        className={cn(
                          'p-4 rounded-xl border-2 text-left transition-all',
                          bookingData.tier === tier.id
                            ? 'border-turquoise-500 bg-turquoise-50'
                            : 'border-slate-200 hover:border-turquoise-200'
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-slate-900">{tier.name[locale]}</h4>
                            <p className="text-sm text-slate-600">{tier.duration}</p>
                          </div>
                          <span className="text-xl font-bold text-turquoise-600">€{tier.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Date Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">{dictionary.booking.selectDate}</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  type="date"
                  label={locale === 'el' ? 'Ημερομηνία' : 'Date'}
                  value={bookingData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    {locale === 'el' ? 'Ώρα' : 'Time Slot'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['06:00', '09:00', '12:00', '15:00'].map((time) => (
                      <button
                        key={time}
                        onClick={() => handleInputChange('time', time)}
                        className={cn(
                          'py-3 px-4 rounded-lg border-2 font-medium transition-all',
                          bookingData.time === time
                            ? 'border-turquoise-500 bg-turquoise-50 text-turquoise-600'
                            : 'border-slate-200 hover:border-turquoise-200'
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {dictionary.booking.guests}
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleInputChange('guests', Math.max(1, bookingData.guests - 1))}
                    className="w-10 h-10 rounded-lg border-2 border-slate-200 flex items-center justify-center hover:border-turquoise-500"
                  >
                    -
                  </button>
                  <span className="text-2xl font-semibold w-10 text-center">{bookingData.guests}</span>
                  <button
                    onClick={() =>
                      handleInputChange('guests', Math.min(selectedTier?.maxGuests || 10, bookingData.guests + 1))
                    }
                    className="w-10 h-10 rounded-lg border-2 border-slate-200 flex items-center justify-center hover:border-turquoise-500"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Guest Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">{dictionary.booking.guestDetails}</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={dictionary.booking.firstName}
                  value={bookingData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
                <Input
                  label={dictionary.booking.lastName}
                  value={bookingData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="email"
                  label={dictionary.booking.email}
                  value={bookingData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
                <Input
                  type="tel"
                  label={dictionary.booking.phone}
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+357 99 000 000"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {dictionary.booking.specialRequests}
                </label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={3}
                  className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-turquoise-500 focus:outline-none focus:ring-2 focus:ring-turquoise-500/20"
                  placeholder={locale === 'el' ? 'Οποιαδήποτε ειδικά αιτήματα...' : 'Any special requests...'}
                />
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">{dictionary.booking.payment}</h2>

              {/* Booking Summary */}
              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">{selectedService?.title[locale]}</span>
                  <span className="font-medium">{selectedTier?.name[locale]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{locale === 'el' ? 'Ημερομηνία' : 'Date'}</span>
                  <span className="font-medium">{bookingData.date} @ {bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{dictionary.booking.guests}</span>
                  <span className="font-medium">{bookingData.guests}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{dictionary.booking.totalPrice}</span>
                    <span className="font-bold">€{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-turquoise-600">
                    <span>{dictionary.booking.depositAmount} ({selectedTier?.depositPercentage || 20}%)</span>
                    <span className="font-bold">€{depositAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Demo Payment Form */}
              <div className="space-y-4">
                <p className="text-sm text-slate-500 bg-sand-50 p-3 rounded-lg">
                  {locale === 'el'
                    ? '🔒 Demo Mode: Χρησιμοποιήστε οποιονδήποτε αριθμό κάρτας'
                    : '🔒 Demo Mode: Use any card number to test'}
                </p>

                <Input
                  label={dictionary.booking.cardNumber}
                  value={bookingData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="4242 4242 4242 4242"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label={dictionary.booking.expiryDate}
                    value={bookingData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    required
                  />
                  <Input
                    label={dictionary.booking.cvv}
                    value={bookingData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-turquoise-500" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {dictionary.booking.confirmation}
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                {dictionary.booking.confirmationMessage}
              </p>
              <div className="bg-slate-50 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-sm text-slate-500 mb-2">{dictionary.booking.bookingReference}</p>
                <p className="text-2xl font-bold text-turquoise-600">{bookingRef}</p>
              </div>
              <div className="mt-8 space-y-4">
                <p className="text-slate-600">
                  {locale === 'el'
                    ? 'Θα λάβετε email επιβεβαίωσης σύντομα.'
                    : 'You will receive a confirmation email shortly.'}
                </p>
                <a href={`/${locale}`}>
                  <Button variant="outline">
                    {locale === 'el' ? 'Επιστροφή στην Αρχική' : 'Return to Home'}
                  </Button>
                </a>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={cn(currentStep === 0 && 'invisible')}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {locale === 'el' ? 'Πίσω' : 'Back'}
              </Button>

              {currentStep === 3 ? (
                <Button onClick={handlePayment} disabled={!canProceed()} isLoading={isProcessing}>
                  {isProcessing ? dictionary.booking.processing : dictionary.booking.payDeposit}
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={!canProceed()}>
                  {locale === 'el' ? 'Συνέχεια' : 'Continue'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
