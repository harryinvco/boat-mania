import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'greek'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Boat Mania | Fishing Charters & Boat Rentals in Larnaca, Cyprus',
  description: 'Experience the best fishing charters, boat rentals, and marine adventures in Larnaca, Cyprus. Book your unforgettable trip today!',
  keywords: ['fishing charters', 'boat rentals', 'Larnaca', 'Cyprus', 'spearfishing', 'boat maintenance', 'private cruises'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
