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
  projectName: string
  headline: string
  body: string
  image: string
  ctaLabel: string
  ctaUrl: string
}

export interface NewsItem {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string        // display string e.g. "Oct 24, 2026"
  coverImage: string
  tag?: string
  category?: 'Press' | 'Awards' | 'Construction' | 'Architecture' | 'Lifestyle'
  readTime?: string
  author?: string
  content?: string[]
  quote?: string
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'line'
  url: string
}

export interface NavLink {
  label: string
  href: string
}
