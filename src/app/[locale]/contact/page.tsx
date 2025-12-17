'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  // Get locale from URL
  const locale = typeof window !== 'undefined'
    ? window.location.pathname.split('/')[1] as 'en' | 'el'
    : 'en'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: locale === 'el' ? 'Διεύθυνση' : 'Address',
      content: ['Larnaca Marina', 'Larnaca, Cyprus'],
    },
    {
      icon: Phone,
      title: locale === 'el' ? 'Τηλέφωνο' : 'Phone',
      content: ['+357 99 000 000'],
      href: 'tel:+35799000000',
    },
    {
      icon: Mail,
      title: 'Email',
      content: ['info@boatmania.cy'],
      href: 'mailto:info@boatmania.cy',
    },
    {
      icon: Clock,
      title: locale === 'el' ? 'Ώρες Λειτουργίας' : 'Business Hours',
      content: [
        locale === 'el' ? 'Δευτέρα - Κυριακή' : 'Monday - Sunday',
        '6:00 AM - 8:00 PM',
      ],
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-600 to-turquoise-600 py-20">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {locale === 'el' ? 'Επικοινωνία' : 'Contact Us'}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {locale === 'el'
              ? 'Επικοινωνήστε μαζί μας για κρατήσεις και ερωτήσεις'
              : 'Get in touch for bookings and inquiries'}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="heading-3">
                {locale === 'el' ? 'Στοιχεία Επικοινωνίας' : 'Contact Information'}
              </h2>

              {contactInfo.map((item, index) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-turquoise-100 text-turquoise-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      {item.content.map((line, i) => (
                        <p key={i} className="text-slate-600">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )

                return (
                  <Card key={index} className="p-4">
                    {item.href ? (
                      <a href={item.href} className="block hover:opacity-80 transition-opacity">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </Card>
                )
              })}

              {/* WhatsApp */}
              <Card className="p-4 bg-[#25D366]/10 border-[#25D366]/30">
                <a
                  href="https://wa.me/35799000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-slate-900 mb-1">WhatsApp</h3>
                    <p className="text-slate-600">
                      {locale === 'el' ? 'Άμεση επικοινωνία' : 'Quick response'}
                    </p>
                  </div>
                </a>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <div className="p-6 md:p-8">
                  <h2 className="heading-3 mb-6">
                    {locale === 'el' ? 'Στείλτε μας Μήνυμα' : 'Send us a Message'}
                  </h2>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-turquoise-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        {locale === 'el' ? 'Μήνυμα Στάλθηκε!' : 'Message Sent!'}
                      </h3>
                      <p className="text-slate-600">
                        {locale === 'el'
                          ? 'Θα επικοινωνήσουμε μαζί σας σύντομα.'
                          : "We'll get back to you soon."}
                      </p>
                      <Button
                        variant="outline"
                        className="mt-6"
                        onClick={() => setIsSubmitted(false)}
                      >
                        {locale === 'el' ? 'Νέο Μήνυμα' : 'Send Another'}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          label={locale === 'el' ? 'Όνομα' : 'Name'}
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          required
                        />
                        <Input
                          type="email"
                          label="Email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                        />
                      </div>

                      <Input
                        label={locale === 'el' ? 'Θέμα' : 'Subject'}
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        required
                      />

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          {locale === 'el' ? 'Μήνυμα' : 'Message'}
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          rows={5}
                          required
                          className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-turquoise-500 focus:outline-none focus:ring-2 focus:ring-turquoise-500/20"
                          placeholder={
                            locale === 'el'
                              ? 'Πώς μπορούμε να σας βοηθήσουμε;'
                              : 'How can we help you?'
                          }
                        />
                      </div>

                      <Button type="submit" isLoading={isSubmitting} className="w-full md:w-auto">
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmitting
                          ? locale === 'el'
                            ? 'Αποστολή...'
                            : 'Sending...'
                          : locale === 'el'
                          ? 'Αποστολή Μηνύματος'
                          : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.0726744374!2d33.623!3d34.923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e082e22abc6e9f%3A0x5b1ce12c7f4f7d8b!2sLarnaca%20Marina!5e0!3m2!1sen!2scy!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
      </section>
    </div>
  )
}
