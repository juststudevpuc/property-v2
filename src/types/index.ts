// ============================================================
// Core domain types — The Creators HQ clone
// ============================================================

export interface Project {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  status: 'available' | 'sold-out' | 'upcoming'
  priceLabel: string   // e.g. "STARTS 125 MB*"
  location: string
  coverImage: string
  logoImage: string
  brochureUrl?: string
  projectUrl: string
  tags: string[]
  specs?: {
    unitTypes?: string
    usableArea?: string
    landArea?: string
    totalUnits?: string
    completionYear?: string
    parking?: string
  }
  amenities?: string[]
  gallery?: string[]
  fullStory?: string[]
}

export interface Promotion {
  id: string
  projectTitle: string
  headline: string
  description1: string
  description2: string
  buttonText: string
  buttonUrl?: string
  image: string
  // Optional backward compatibility
  projectName?: string
  body?: string
  ctaLabel?: string
  ctaUrl?: string
}

export interface Offer {
  id: string
  title: string
  tagline: string
  category: string
  description: string
  validity: string       // display string e.g. "VALID THROUGH DEC 2026"
  image: string
  highlights: string[]   // 2-3 short perks shown on the card
  inclusions: string[]   // full package terms shown in the detail drawer
  applicableProperties: string[]
  ctaLabel: string
}

export interface NewsItem {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string        // display string e.g. "Oct 24, 2026"
  coverImage: string
  tag?: string
  category?: string
  readTime?: string
  author?: string
  content?: string[]
  quote?: string
  gallery?: string[]
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'line'
  url: string
}

export interface NavLink {
  label: string
  href: string
}

export type {
  SanctuaryCategory,
  AccommodationItem,
  DiningVenue,
  WellnessHighlight,
  AtAGlanceSection,
  GettingThere,
  HotelSanctuary,
  SanctuaryFilterCategory,
} from '@/data/hotels'

