import type { Offer } from '@/types'

/* ─── Category filters ───────────────────────────────────── */
export const OFFER_CATEGORIES = [
  'All Offers',
  'Seasonal Stays',
  'Residence Privileges',
  'Dining & Wellness',
  'Private Events',
] as const

/* ─── Flagship spotlight package ─────────────────────────── */
export const FEATURED_OFFER: Offer = {
  id: 'signature-residency',
  title: 'The Signature Residency Privilege',
  tagline: 'Private Villa & Concierge Package',
  category: 'Seasonal Stays',
  description:
    'A fourteen-night private residency within a fully staffed villa, orchestrated end to end by our hospitality desk. Reserved for a limited number of households each season.',
  validity: '01 NOV 2026 — 28 FEB 2027',
  image:
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85',
  highlights: [
    'Private villa with dedicated house manager and daily housekeeping',
    'Airport transfer in a chauffeured executive sedan, both directions',
    'Priority access to residence dining, thermal wellness, and grounds',
  ],
  inclusions: [
    'Fourteen consecutive nights in a detached private villa',
    'Dedicated house manager, daily housekeeping, and evening turndown',
    'Chauffeured airport transfers in both directions',
    'Daily breakfast prepared in residence by the estate kitchen',
    'Full access to thermal wellness suites and residents-only grounds',
    'One private dining evening for up to six guests',
    'Complimentary late checkout, subject to occupancy',
  ],
  applicableProperties: ['CIRA Residences', 'Curva Ekkamai', 'Corner Ratchathewi'],
  ctaLabel: 'Inquire Privilege',
}

/* ─── Collection of curated offers ───────────────────────── */
export const OFFERS: Offer[] = [
  {
    id: 'monsoon-sanctuary',
    title: 'Monsoon Sanctuary Residency',
    tagline: 'Green season, unhurried',
    category: 'Seasonal Stays',
    description:
      'A quiet fortnight shaped for the green season, when the estate gardens are at their fullest and the city feels further away than it is.',
    validity: 'VALID 01 MAY — 31 OCT 2026',
    image:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85',
    highlights: [
      'Fourteen nights, with a complimentary fifteenth',
      'Daily breakfast and one private dinner',
      'Seasonal rates on residence dining and wellness',
    ],
    inclusions: [
      'Fourteen consecutive nights in a garden-facing residence',
      'Daily breakfast prepared in residence',
      'One private dinner for two at the estate kitchen',
      'Seasonal rates across dining and thermal wellness',
      'Grounds access and scheduled garden walks',
      'Housekeeping every second day',
    ],
    applicableProperties: ['CIRA Residences', 'Curva Ekkamai'],
    ctaLabel: 'Request Privilege',
  },
  {
    id: 'founders-ownership',
    title: "Founders' Ownership Privilege",
    tagline: 'Early reservation, enduring terms',
    category: 'Residence Privileges',
    description:
      'Reserved for households committing ahead of completion, pairing a fixed acquisition schedule with an interior allowance and lifetime stewardship benefits.',
    validity: 'VALID THROUGH DEC 2026',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    highlights: [
      'Fixed acquisition schedule held through completion',
      'Interior allowance applied at handover',
      'Lifetime priority on residence care services',
    ],
    inclusions: [
      'Fixed payment schedule locked at reservation',
      'Interior finishing allowance credited at handover',
      'Two complimentary years of residence care',
      'Priority allocation on future releases',
      'Dedicated ownership advisor for the full term',
      'Private preview of the completed residence before handover',
    ],
    applicableProperties: ['CIRA Residences', 'Corner Ratchathewi', 'Curva Ekkamai'],
    ctaLabel: 'Request Privilege',
  },
  {
    id: 'moss-table',
    title: "The Moss Table — Chef's Series",
    tagline: 'Twelve seats, one evening',
    category: 'Dining & Wellness',
    description:
      'A seasonal tasting menu served at a single communal table, with each course introduced by the kitchen and paired from a private cellar.',
    validity: 'VALID THROUGH DEC 2026',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85',
    highlights: [
      'Nine-course seasonal tasting menu',
      'Pairing from the estate cellar',
      'Reserved seating for residents and guests',
    ],
    inclusions: [
      'Nine-course seasonal tasting menu',
      'Wine pairing selected by the estate sommelier',
      'Seating for up to four guests per reservation',
      'Priority booking window two weeks ahead of public release',
      'Complimentary digestif at the close of service',
    ],
    applicableProperties: ['CIRA Residences', 'Common TU', 'C Ekkamai'],
    ctaLabel: 'Request Privilege',
  },
  {
    id: 'courtyard-celebrations',
    title: 'Private Courtyard Celebrations',
    tagline: 'Occasions, quietly held',
    category: 'Private Events',
    description:
      'The estate courtyards opened for private gatherings, with staffing, catering, and setup managed entirely by our events desk.',
    validity: 'VALID THROUGH JUN 2027',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85',
    highlights: [
      'Exclusive use of the courtyard for one evening',
      'Events staffing and catering coordinated in house',
      'Setup, service, and clearing included',
    ],
    inclusions: [
      'Exclusive courtyard access for a single evening',
      'Event coordination from planning through close',
      'Catering and beverage service arranged in house',
      'Furniture, lighting, and table styling included',
      'Guest capacity of up to eighty seated',
      'Dedicated point of contact for the full booking',
    ],
    applicableProperties: ['CIRA Residences', 'Curva Ekkamai'],
    ctaLabel: 'Request Privilege',
  },
  {
    id: 'ninety-night-retreat',
    title: 'Ninety-Night Extended Retreat',
    tagline: 'For the unhurried stay',
    category: 'Seasonal Stays',
    description:
      'An extended residency for households between homes, or for those who simply prefer to remain. Fully serviced throughout, with monthly terms.',
    validity: 'VALID THROUGH MAR 2027',
    image:
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=85',
    highlights: [
      'Ninety nights on a single monthly term',
      'Full servicing and utilities included',
      'One mid-term residence change permitted',
    ],
    inclusions: [
      'Ninety consecutive nights, billed monthly',
      'All utilities, servicing, and housekeeping included',
      'Weekly linen and laundry service',
      'One permitted residence change mid-term',
      'Resident access to wellness and dining',
      'Concierge support for the full duration',
    ],
    applicableProperties: ['Corner Ratchathewi', 'C Ekkamai', 'Common TU'],
    ctaLabel: 'Request Privilege',
  },
  {
    id: 'thermal-wellness',
    title: 'Thermal Wellness Membership',
    tagline: 'A standing invitation',
    category: 'Dining & Wellness',
    description:
      'Annual membership to the thermal suites and treatment rooms, with recurring appointments held in advance of the general calendar.',
    validity: 'VALID THROUGH DEC 2026',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85',
    highlights: [
      'Twelve months of thermal suite access',
      'Two treatments held each month',
      'Priority booking ahead of public release',
    ],
    inclusions: [
      'Twelve months of unlimited thermal suite access',
      'Two signature treatments per month',
      'Priority booking for seasonal therapies',
      'One guest pass per visit',
      'Complimentary access to scheduled wellness sessions',
    ],
    applicableProperties: ['CIRA Residences', 'Common TU'],
    ctaLabel: 'Request Privilege',
  },
]
