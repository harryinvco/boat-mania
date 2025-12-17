import type { MarketplaceItem } from '@/types'

export const marketplaceItems: MarketplaceItem[] = [
  // Boats
  {
    id: 'boat-1',
    category: 'boats',
    title: 'Bayliner VR5 Cuddy (2019)',
    description: 'Well-maintained family boat, perfect for day trips and fishing. Low engine hours, recently serviced. Full documentation available.',
    price: 32000,
    negotiable: true,
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80',
    ],
    specifications: {
      'Make': 'Bayliner',
      'Model': 'VR5 Cuddy',
      'Year': '2019',
      'Length': '5.5m',
      'Engine': '150HP Mercury',
      'Fuel Type': 'Petrol',
      'Max Passengers': '6',
    },
    seller: {
      name: 'Andreas K.',
      phone: '+357 99 111 111',
      location: 'Larnaca',
      verified: true,
    },
    status: 'active',
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: 'boat-2',
    category: 'boats',
    title: 'Quicksilver Activ 555 (2020)',
    description: 'Sporty and versatile, ideal for water sports and cruising. Includes trailer and cover.',
    price: 28500,
    negotiable: true,
    condition: 'like-new',
    images: [
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80',
    ],
    specifications: {
      'Make': 'Quicksilver',
      'Model': 'Activ 555',
      'Year': '2020',
      'Length': '5.55m',
      'Engine': '115HP Honda',
      'Fuel Type': 'Petrol',
      'Max Passengers': '7',
    },
    seller: {
      name: 'Maria P.',
      phone: '+357 99 222 222',
      location: 'Limassol',
      verified: true,
    },
    status: 'active',
    featured: true,
    createdAt: '2024-01-20',
  },
  {
    id: 'boat-3',
    category: 'boats',
    title: 'Traditional Fishing Boat (2015)',
    description: 'Classic wooden fishing boat, perfect for traditional fishing. Recently repainted and sealed.',
    price: 8500,
    negotiable: true,
    condition: 'fair',
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    ],
    specifications: {
      'Type': 'Traditional',
      'Year': '2015',
      'Length': '6m',
      'Engine': '40HP Yamaha',
      'Material': 'Wood',
    },
    seller: {
      name: 'Yiannis M.',
      phone: '+357 99 333 333',
      location: 'Larnaca',
      verified: false,
    },
    status: 'active',
    featured: false,
    createdAt: '2024-01-10',
  },

  // Fishing Gear
  {
    id: 'gear-1',
    category: 'fishing-gear',
    title: 'Shimano Stella SW 10000 Reel',
    description: 'Premium saltwater spinning reel, barely used. Perfect for big game fishing.',
    price: 650,
    negotiable: false,
    condition: 'like-new',
    images: [
      'https://images.unsplash.com/photo-1545816250-e12bedba42ba?w=800&q=80',
    ],
    specifications: {
      'Brand': 'Shimano',
      'Model': 'Stella SW 10000',
      'Type': 'Spinning Reel',
      'Line Capacity': '300m / 0.45mm',
    },
    seller: {
      name: 'Costas L.',
      phone: '+357 99 444 444',
      location: 'Paphos',
      verified: true,
    },
    status: 'active',
    featured: true,
    createdAt: '2024-01-25',
  },
  {
    id: 'gear-2',
    category: 'fishing-gear',
    title: 'Penn Slammer III 6500 Reel',
    description: 'Heavy-duty spinning reel, great for bottom fishing. Good condition with original box.',
    price: 180,
    negotiable: true,
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1545816250-e12bedba42ba?w=800&q=80',
    ],
    specifications: {
      'Brand': 'Penn',
      'Model': 'Slammer III 6500',
      'Type': 'Spinning Reel',
    },
    seller: {
      name: 'Nikos D.',
      phone: '+357 99 555 555',
      location: 'Larnaca',
      verified: false,
    },
    status: 'active',
    featured: false,
    createdAt: '2024-01-18',
  },
  {
    id: 'gear-3',
    category: 'fishing-gear',
    title: 'Complete Trolling Rod Set (4 rods)',
    description: 'Set of 4 trolling rods with reels, perfect for fishing charter setup.',
    price: 450,
    negotiable: true,
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80',
    ],
    specifications: {
      'Includes': '4 Rods + 4 Reels',
      'Rod Type': 'Trolling',
      'Line Class': '30-50lb',
    },
    seller: {
      name: 'Stavros K.',
      phone: '+357 99 666 666',
      location: 'Limassol',
      verified: true,
    },
    status: 'active',
    featured: true,
    createdAt: '2024-01-22',
  },

  // Parts & Accessories
  {
    id: 'parts-1',
    category: 'parts-accessories',
    title: 'Garmin GPS/Fish Finder Combo',
    description: 'Garmin EchoMap 73cv with transducer. Working perfectly, selling due to upgrade.',
    price: 320,
    negotiable: true,
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80',
    ],
    specifications: {
      'Brand': 'Garmin',
      'Model': 'EchoMap 73cv',
      'Screen': '7 inch',
      'Includes': 'Transducer, mount, cables',
    },
    seller: {
      name: 'Michalis R.',
      phone: '+357 99 777 777',
      location: 'Larnaca',
      verified: true,
    },
    status: 'active',
    featured: true,
    createdAt: '2024-01-28',
  },
  {
    id: 'parts-2',
    category: 'parts-accessories',
    title: 'Boat Cover - 6m',
    description: 'Heavy-duty boat cover for 5.5-6m boats. Used one season, excellent condition.',
    price: 150,
    negotiable: false,
    condition: 'like-new',
    images: [
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80',
    ],
    specifications: {
      'Size': '5.5m - 6m boats',
      'Material': 'Heavy-duty polyester',
      'Color': 'Navy blue',
    },
    seller: {
      name: 'Elena T.',
      phone: '+357 99 888 888',
      location: 'Nicosia',
      verified: false,
    },
    status: 'active',
    featured: false,
    createdAt: '2024-01-12',
  },
  {
    id: 'parts-3',
    category: 'parts-accessories',
    title: 'Marine Radio - VHF',
    description: 'Standard Horizon GX1400 marine radio with antenna. Everything working perfectly.',
    price: 85,
    negotiable: true,
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80',
    ],
    specifications: {
      'Brand': 'Standard Horizon',
      'Model': 'GX1400',
      'Type': 'VHF Marine Radio',
      'Includes': 'Antenna, microphone',
    },
    seller: {
      name: 'Petros A.',
      phone: '+357 99 999 999',
      location: 'Larnaca',
      verified: true,
    },
    status: 'active',
    featured: false,
    createdAt: '2024-01-08',
  },
]

export function getMarketplaceByCategory(category: string): MarketplaceItem[] {
  if (category === 'all') return marketplaceItems
  return marketplaceItems.filter((item) => item.category === category)
}

export function getFeaturedListings(): MarketplaceItem[] {
  return marketplaceItems.filter((item) => item.featured)
}

export function getMarketplaceItemById(id: string): MarketplaceItem | undefined {
  return marketplaceItems.find((item) => item.id === id)
}
