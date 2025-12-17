import type { GalleryItem } from '@/types'

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
    title: 'Deep Sea Fishing',
    category: 'catches',
    featured: true,
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&q=80',
    title: 'Morning Catch',
    category: 'catches',
    featured: true,
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&q=80',
    title: 'Our Fleet',
    category: 'boats',
    featured: true,
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=400&q=80',
    title: 'Sunset Cruise',
    category: 'trips',
    featured: true,
  },
  {
    id: '5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&q=80',
    title: 'Speed Boat',
    category: 'boats',
    featured: true,
  },
  {
    id: '6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=400&q=80',
    title: 'Underwater Adventure',
    category: 'spearfishing',
    featured: true,
  },
  {
    id: '7',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1500463959177-e0869687df26?w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500463959177-e0869687df26?w=400&q=80',
    title: 'Learning to Fish',
    category: 'trips',
    featured: false,
  },
  {
    id: '8',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80',
    title: 'Party on Board',
    category: 'events',
    featured: true,
  },
]

export function getFeaturedGallery(): GalleryItem[] {
  return galleryItems.filter((item) => item.featured).slice(0, 6)
}

export function getGalleryByCategory(category: string): GalleryItem[] {
  if (category === 'all') return galleryItems
  return galleryItems.filter((item) => item.category === category)
}
