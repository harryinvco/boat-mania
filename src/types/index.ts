// Locale types
export type Locale = 'en' | 'el'

// Service types
export type ServiceType =
  | 'fishing-charters'
  | 'boat-rentals'
  | 'private-cruises'
  | 'maintenance'
  | 'fishing-lessons'
  | 'spearfishing'

export interface Service {
  id: string
  type: ServiceType
  slug: string
  title: { en: string; el: string }
  shortDescription: { en: string; el: string }
  fullDescription: { en: string; el: string }
  icon: string
  heroImage: string
  gallery: string[]
  pricing: PricingTier[]
  duration: string
  maxGuests: number
  includes: { en: string[]; el: string[] }
  featured: boolean
}

export interface PricingTier {
  id: string
  name: { en: string; el: string }
  duration: string
  price: number
  depositPercentage: number
  maxGuests: number
  includes: { en: string[]; el: string[] }
}

// Booking types
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'deposit-paid'
  | 'completed'
  | 'cancelled'

export interface Booking {
  id: string
  serviceType: ServiceType
  serviceId: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  date: string
  timeSlot: string
  guestCount: number
  basePrice: number
  totalPrice: number
  depositAmount: number
  depositPaid: boolean
  status: BookingStatus
  specialRequests?: string
  createdAt: string
}

// Marketplace types
export type MarketplaceCategory = 'boats' | 'fishing-gear' | 'parts-accessories'
export type ItemCondition = 'new' | 'like-new' | 'good' | 'fair' | 'parts-only'
export type ListingStatus = 'active' | 'sold' | 'reserved'

export interface MarketplaceItem {
  id: string
  category: MarketplaceCategory
  title: string
  description: string
  price: number
  negotiable: boolean
  condition: ItemCondition
  images: string[]
  specifications: Record<string, string>
  seller: {
    name: string
    phone: string
    location: string
    verified: boolean
  }
  status: ListingStatus
  featured: boolean
  createdAt: string
}

// Testimonial types
export interface Testimonial {
  id: string
  customerName: string
  customerLocation?: string
  customerImage?: string
  rating: 1 | 2 | 3 | 4 | 5
  content: { en: string; el: string }
  serviceType: ServiceType
  verified: boolean
  featured: boolean
}

// Gallery types
export type GalleryCategory =
  | 'catches'
  | 'trips'
  | 'boats'
  | 'spearfishing'
  | 'events'

export interface GalleryItem {
  id: string
  type: 'image' | 'video'
  url: string
  thumbnailUrl: string
  title?: string
  category: GalleryCategory
  featured: boolean
}

// Weather types
export interface WeatherData {
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    windDirection: string
    conditions: string
    icon: string
  }
  marine: {
    waveHeight: number
    waterTemperature: number
  }
  forecast: DayForecast[]
  recommendation: {
    isGood: boolean
    reason: { en: string; el: string }
  }
}

export interface DayForecast {
  date: string
  tempMax: number
  tempMin: number
  conditions: string
  icon: string
  precipitationChance: number
}

// Navigation types
export interface NavItem {
  label: { en: string; el: string }
  href: string
  children?: NavItem[]
}
