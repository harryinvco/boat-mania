# Boat Mania

Modern, bilingual (EN/GR) website for Boat Mania - a boat parking and marine services business in Larnaca, Cyprus.

## Features

- **Services**: Fishing Charters, Boat Rentals, Private Cruises, Boat Maintenance, Fishing Lessons, Spearfishing Trips
- **Booking System**: Multi-step wizard with demo payment processing
- **Marketplace**: Buy/sell boats, fishing gear, and marine accessories
- **Bilingual**: English and Greek language support
- **WhatsApp Integration**: Click-to-chat for instant communication
- **Weather Widget**: Real-time conditions and "best time to book" recommendations
- **Photo Gallery**: Lightbox gallery with category filters
- **Responsive Design**: Mobile-first, modern Mediterranean theme

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # i18n dynamic routing (en/el)
│   │   ├── services/      # Service pages
│   │   ├── marketplace/   # Marketplace pages
│   │   ├── booking/       # Booking system
│   │   ├── gallery/       # Photo gallery
│   │   ├── about/         # About page
│   │   └── contact/       # Contact page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Header, Footer, Navigation
│   ├── sections/         # Homepage sections
│   └── booking/          # Booking wizard
├── lib/                  # Utilities and i18n
├── data/                 # Mock data
└── types/                # TypeScript types
```

## Configuration

- **WhatsApp**: Update number in `src/components/common/WhatsAppButton.tsx`
- **Content**: Edit `src/lib/i18n/dictionaries/en.json` and `el.json`
- **Services**: Edit `src/data/services.ts`
- **Marketplace**: Edit `src/data/marketplace.ts`

## Deployment

Recommended: Deploy to [Vercel](https://vercel.com)