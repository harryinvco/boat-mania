import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'fishing-charters',
    type: 'fishing-charters',
    slug: 'fishing-charters',
    title: {
      en: 'Fishing Charters',
      el: 'Ψαρευτικές Εκδρομές',
    },
    shortDescription: {
      en: 'Experience world-class fishing in the Mediterranean with our expert captains',
      el: 'Ζήστε κορυφαίο ψάρεμα στη Μεσόγειο με τους έμπειρους καπετάνιους μας',
    },
    fullDescription: {
      en: 'Join us for an unforgettable fishing adventure in the crystal-clear waters of Cyprus. Our experienced captains know the best spots for catching grouper, sea bream, tuna, and more. All equipment provided, suitable for beginners and experienced anglers alike.',
      el: 'Ελάτε μαζί μας για μια αξέχαστη ψαρευτική περιπέτεια στα κρυστάλλινα νερά της Κύπρου. Οι έμπειροι καπετάνιοι μας γνωρίζουν τα καλύτερα σημεία για ροφό, τσιπούρα, τόνο και άλλα.',
    },
    icon: 'fish',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80',
      'https://images.unsplash.com/photo-1545816250-e12bedba42ba?w=800&q=80',
    ],
    pricing: [
      {
        id: 'half-day',
        name: { en: 'Half Day', el: 'Μισή Μέρα' },
        duration: '4 hours',
        price: 250,
        depositPercentage: 20,
        maxGuests: 4,
        includes: {
          en: ['All fishing equipment', 'Bait and tackle', 'Refreshments', 'Expert captain'],
          el: ['Όλος ο εξοπλισμός', 'Δόλωμα', 'Αναψυκτικά', 'Έμπειρος καπετάνιος'],
        },
      },
      {
        id: 'full-day',
        name: { en: 'Full Day', el: 'Ολόκληρη Μέρα' },
        duration: '8 hours',
        price: 450,
        depositPercentage: 20,
        maxGuests: 4,
        includes: {
          en: ['All fishing equipment', 'Bait and tackle', 'Lunch included', 'Refreshments', 'Expert captain'],
          el: ['Όλος ο εξοπλισμός', 'Δόλωμα', 'Γεύμα', 'Αναψυκτικά', 'Έμπειρος καπετάνιος'],
        },
      },
    ],
    duration: '4-8 hours',
    maxGuests: 4,
    includes: {
      en: ['All fishing equipment', 'Bait and tackle', 'Refreshments', 'Expert captain'],
      el: ['Όλος ο εξοπλισμός', 'Δόλωμα', 'Αναψυκτικά', 'Έμπειρος καπετάνιος'],
    },
    featured: true,
  },
  {
    id: 'boat-rentals',
    type: 'boat-rentals',
    slug: 'boat-rentals',
    title: {
      en: 'Boat Rentals',
      el: 'Ενοικίαση Σκαφών',
    },
    shortDescription: {
      en: 'Rent quality boats for your perfect day on the water',
      el: 'Νοικιάστε ποιοτικά σκάφη για την τέλεια ημέρα στη θάλασσα',
    },
    fullDescription: {
      en: 'Choose from our fleet of well-maintained boats, perfect for family outings, romantic getaways, or fishing trips. Various sizes available to suit your needs. No captain needed with proper licensing, or we can provide one.',
      el: 'Επιλέξτε από τον στόλο μας καλοσυντηρημένων σκαφών, ιδανικών για οικογενειακές εξορμήσεις, ρομαντικές αποδράσεις ή ψάρεμα.',
    },
    icon: 'ship',
    heroImage: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80',
    ],
    pricing: [
      {
        id: 'small-boat',
        name: { en: 'Small Boat (5m)', el: 'Μικρό Σκάφος (5μ)' },
        duration: 'Per day',
        price: 150,
        depositPercentage: 25,
        maxGuests: 4,
        includes: {
          en: ['Fuel included', 'Safety equipment', 'Cooler box'],
          el: ['Καύσιμα', 'Εξοπλισμός ασφαλείας', 'Ψυγείο'],
        },
      },
      {
        id: 'medium-boat',
        name: { en: 'Medium Boat (7m)', el: 'Μεσαίο Σκάφος (7μ)' },
        duration: 'Per day',
        price: 250,
        depositPercentage: 25,
        maxGuests: 6,
        includes: {
          en: ['Fuel included', 'Safety equipment', 'Cooler box', 'Snorkeling gear'],
          el: ['Καύσιμα', 'Εξοπλισμός ασφαλείας', 'Ψυγείο', 'Μάσκες κολύμβησης'],
        },
      },
    ],
    duration: 'Full day',
    maxGuests: 8,
    includes: {
      en: ['Fuel included', 'Safety equipment', 'Cooler box'],
      el: ['Καύσιμα', 'Εξοπλισμός ασφαλείας', 'Ψυγείο'],
    },
    featured: true,
  },
  {
    id: 'private-cruises',
    type: 'private-cruises',
    slug: 'private-cruises',
    title: {
      en: 'Private Cruises & Events',
      el: 'Ιδιωτικές Κρουαζιέρες',
    },
    shortDescription: {
      en: 'Celebrate special occasions with a private cruise along the coast',
      el: 'Γιορτάστε ειδικές περιστάσεις με μια ιδιωτική κρουαζιέρα',
    },
    fullDescription: {
      en: 'Create unforgettable memories with a private cruise. Perfect for birthdays, anniversaries, corporate events, proposals, or just a special day out with friends and family. Catering options available.',
      el: 'Δημιουργήστε αξέχαστες αναμνήσεις με μια ιδιωτική κρουαζιέρα. Ιδανική για γενέθλια, επετείους, εταιρικές εκδηλώσεις ή απλά μια ξεχωριστή μέρα.',
    },
    icon: 'party-popper',
    heroImage: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    ],
    pricing: [
      {
        id: 'sunset-cruise',
        name: { en: 'Sunset Cruise', el: 'Κρουαζιέρα Ηλιοβασιλέματος' },
        duration: '3 hours',
        price: 350,
        depositPercentage: 30,
        maxGuests: 10,
        includes: {
          en: ['Captain', 'Welcome drinks', 'Snacks', 'Music system'],
          el: ['Καπετάνιος', 'Ποτά καλωσορίσματος', 'Σνακ', 'Μουσική'],
        },
      },
      {
        id: 'full-day-cruise',
        name: { en: 'Full Day Cruise', el: 'Ολοήμερη Κρουαζιέρα' },
        duration: '8 hours',
        price: 650,
        depositPercentage: 30,
        maxGuests: 10,
        includes: {
          en: ['Captain', 'Lunch', 'Drinks', 'Swimming stops', 'Music system'],
          el: ['Καπετάνιος', 'Γεύμα', 'Ποτά', 'Στάσεις για κολύμπι', 'Μουσική'],
        },
      },
    ],
    duration: '3-8 hours',
    maxGuests: 10,
    includes: {
      en: ['Professional captain', 'Refreshments', 'Music system'],
      el: ['Επαγγελματίας καπετάνιος', 'Αναψυκτικά', 'Μουσική'],
    },
    featured: true,
  },
  {
    id: 'maintenance',
    type: 'maintenance',
    slug: 'maintenance',
    title: {
      en: 'Boat Maintenance',
      el: 'Συντήρηση Σκαφών',
    },
    shortDescription: {
      en: 'Professional cleaning and maintenance services for your vessel',
      el: 'Επαγγελματικές υπηρεσίες καθαρισμού και συντήρησης',
    },
    fullDescription: {
      en: 'Keep your boat in top condition with our comprehensive maintenance services. From regular cleaning to engine servicing, hull polishing to winterization, we handle it all with expert care.',
      el: 'Διατηρήστε το σκάφος σας σε άριστη κατάσταση με τις ολοκληρωμένες υπηρεσίες συντήρησης. Από τακτικό καθαρισμό μέχρι σέρβις κινητήρα.',
    },
    icon: 'wrench',
    heroImage: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1920&q=80',
    gallery: [],
    pricing: [
      {
        id: 'basic-clean',
        name: { en: 'Basic Cleaning', el: 'Βασικός Καθαρισμός' },
        duration: '2-3 hours',
        price: 80,
        depositPercentage: 0,
        maxGuests: 0,
        includes: {
          en: ['Exterior wash', 'Deck cleaning', 'Window cleaning'],
          el: ['Εξωτερικό πλύσιμο', 'Καθαρισμός καταστρώματος', 'Καθαρισμός παραθύρων'],
        },
      },
      {
        id: 'full-detail',
        name: { en: 'Full Detail', el: 'Πλήρης Καθαρισμός' },
        duration: '4-6 hours',
        price: 180,
        depositPercentage: 0,
        maxGuests: 0,
        includes: {
          en: ['Full exterior wash', 'Interior cleaning', 'Hull polish', 'Metal polishing'],
          el: ['Πλήρες εξωτερικό πλύσιμο', 'Εσωτερικός καθαρισμός', 'Γυάλισμα γάστρας'],
        },
      },
    ],
    duration: 'Varies',
    maxGuests: 0,
    includes: {
      en: ['Professional products', 'Experienced staff'],
      el: ['Επαγγελματικά προϊόντα', 'Έμπειρο προσωπικό'],
    },
    featured: false,
  },
  {
    id: 'fishing-lessons',
    type: 'fishing-lessons',
    slug: 'fishing-lessons',
    title: {
      en: 'Fishing Lessons',
      el: 'Μαθήματα Ψαρέματος',
    },
    shortDescription: {
      en: 'Learn fishing techniques from experienced local fishermen',
      el: 'Μάθετε τεχνικές ψαρέματος από έμπειρους ψαράδες',
    },
    fullDescription: {
      en: 'Whether you\'re a complete beginner or looking to improve your skills, our fishing lessons cover everything from basic techniques to advanced methods. Learn from local experts who know these waters inside out.',
      el: 'Είτε είστε αρχάριος είτε θέλετε να βελτιώσετε τις δεξιότητές σας, τα μαθήματά μας καλύπτουν τα πάντα από βασικές τεχνικές έως προχωρημένες μεθόδους.',
    },
    icon: 'graduation-cap',
    heroImage: 'https://images.unsplash.com/photo-1500463959177-e0869687df26?w=1920&q=80',
    gallery: [],
    pricing: [
      {
        id: 'beginner',
        name: { en: 'Beginner Course', el: 'Μάθημα Αρχαρίων' },
        duration: '3 hours',
        price: 100,
        depositPercentage: 20,
        maxGuests: 4,
        includes: {
          en: ['Equipment provided', 'Theory session', 'Practical training', 'Certificate'],
          el: ['Παροχή εξοπλισμού', 'Θεωρία', 'Πρακτική εξάσκηση', 'Πιστοποιητικό'],
        },
      },
    ],
    duration: '3 hours',
    maxGuests: 4,
    includes: {
      en: ['All equipment', 'Expert instruction', 'Certificate'],
      el: ['Όλος ο εξοπλισμός', 'Εκπαίδευση από ειδικό', 'Πιστοποιητικό'],
    },
    featured: false,
  },
  {
    id: 'spearfishing',
    type: 'spearfishing',
    slug: 'spearfishing',
    title: {
      en: 'Spearfishing Trips',
      el: 'Υποβρύχιο Ψάρεμα',
    },
    shortDescription: {
      en: 'Guided spearfishing adventures for all skill levels',
      el: 'Καθοδηγούμενες περιπέτειες υποβρύχιου ψαρέματος',
    },
    fullDescription: {
      en: 'Discover the thrill of spearfishing in Cyprus\'s pristine waters. Our experienced guides will take you to the best spots and teach you proper techniques. Equipment available for rent.',
      el: 'Ανακαλύψτε τη συγκίνηση του υποβρύχιου ψαρέματος στα παρθένα νερά της Κύπρου. Οι οδηγοί μας θα σας πάνε στα καλύτερα σημεία.',
    },
    icon: 'waves',
    heroImage: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=1920&q=80',
    gallery: [],
    pricing: [
      {
        id: 'guided-trip',
        name: { en: 'Guided Trip', el: 'Καθοδηγούμενη Εκδρομή' },
        duration: '4 hours',
        price: 180,
        depositPercentage: 20,
        maxGuests: 4,
        includes: {
          en: ['Expert guide', 'Equipment rental', 'Boat transport', 'Safety briefing'],
          el: ['Έμπειρος οδηγός', 'Ενοικίαση εξοπλισμού', 'Μεταφορά με σκάφος', 'Ενημέρωση ασφαλείας'],
        },
      },
    ],
    duration: '4 hours',
    maxGuests: 4,
    includes: {
      en: ['Expert guide', 'Equipment available', 'Boat transport'],
      el: ['Έμπειρος οδηγός', 'Διαθέσιμος εξοπλισμός', 'Μεταφορά με σκάφος'],
    },
    featured: true,
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured)
}
