import type { Testimonial } from '@/types'

export const testimonials: Testimonial[] = [
  {
    id: '1',
    customerName: 'Michael Thompson',
    customerLocation: 'London, UK',
    customerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    rating: 5,
    content: {
      en: 'Amazing fishing trip! Captain Yiannis knew exactly where to find the fish. We caught more than we could carry home. The boat was well-maintained and the crew was incredibly friendly. Will definitely book again!',
      el: 'Καταπληκτική ψαρευτική εκδρομή! Ο Καπετάνιος Γιάννης ήξερε ακριβώς πού να βρει τα ψάρια. Πιάσαμε περισσότερα από όσα μπορούσαμε να μεταφέρουμε. Σίγουρα θα κλείσω ξανά!',
    },
    serviceType: 'fishing-charters',
    verified: true,
    featured: true,
  },
  {
    id: '2',
    customerName: 'Sofia Papadopoulos',
    customerLocation: 'Athens, Greece',
    customerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
    content: {
      en: 'We celebrated our anniversary with a sunset cruise and it was absolutely magical. The crew went above and beyond to make it special. The Mediterranean views from the boat were breathtaking.',
      el: 'Γιορτάσαμε την επέτειό μας με μια κρουαζιέρα ηλιοβασιλέματος και ήταν απολύτως μαγική. Το πλήρωμα έκανε τα πάντα για να την κάνει ξεχωριστή. Η θέα της Μεσογείου ήταν εκπληκτική.',
    },
    serviceType: 'private-cruises',
    verified: true,
    featured: true,
  },
  {
    id: '3',
    customerName: 'Hans Mueller',
    customerLocation: 'Berlin, Germany',
    customerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    rating: 5,
    content: {
      en: 'Rented a boat for a week and explored the coastline. The boat was in perfect condition and the team was very helpful with recommendations for hidden coves and beaches. Great value for money!',
      el: 'Νοικιάσαμε ένα σκάφος για μια εβδομάδα και εξερευνήσαμε την ακτογραμμή. Το σκάφος ήταν σε άριστη κατάσταση και η ομάδα ήταν πολύ βοηθητική με συστάσεις.',
    },
    serviceType: 'boat-rentals',
    verified: true,
    featured: true,
  },
  {
    id: '4',
    customerName: 'Elena Georgiou',
    customerLocation: 'Nicosia, Cyprus',
    customerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    rating: 5,
    content: {
      en: 'The spearfishing trip was incredible! As a beginner, I was nervous, but the guide was patient and taught me everything I needed to know. Caught my first fish underwater - unforgettable!',
      el: 'Η εκδρομή υποβρύχιου ψαρέματος ήταν απίστευτη! Ως αρχάριος, ήμουν νευρικός, αλλά ο οδηγός ήταν υπομονετικός και με δίδαξε όλα όσα χρειαζόμουν.',
    },
    serviceType: 'spearfishing',
    verified: true,
    featured: true,
  },
  {
    id: '5',
    customerName: 'James Wilson',
    customerLocation: 'Manchester, UK',
    customerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    rating: 4,
    content: {
      en: 'Great fishing lessons! My son and I both learned so much in just one session. The instructor was knowledgeable and made it fun for both adults and kids. Highly recommend for families.',
      el: 'Εξαιρετικά μαθήματα ψαρέματος! Ο γιος μου κι εγώ μάθαμε τόσα πολλά σε μια μόνο συνεδρία. Ο εκπαιδευτής ήταν γνώστης και το έκανε διασκεδαστικό.',
    },
    serviceType: 'fishing-lessons',
    verified: true,
    featured: false,
  },
]

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured)
}
