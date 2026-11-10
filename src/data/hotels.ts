export type SanctuaryCategory = 'Coastal & Island' | 'Urban Sanctuary' | 'Culture & Heritage'

export interface AccommodationItem {
  id: string
  name: string
  category: 'Pavilion' | 'Villa' | 'Suite'
  size: string
  bedrooms: string
  view: string
  description: string
  image: string
  features: string[]
}

export interface DiningVenue {
  id: string
  name: string
  cuisine: string
  setting: string
  description: string
  image: string
  hours?: string
}

export interface WellnessHighlight {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  therapies: string[]
}

export interface AtAGlanceSection {
  accommodation: string[]
  diningAndWellness: string[]
  includedInEveryStay: string[]
}

export interface GettingThere {
  nearestAirport: string
  distance: string
  transferDetails: string
}

export interface HotelSanctuary {
  id: string
  slug: string
  name: string
  shortName: string
  tagline: string
  category: SanctuaryCategory
  location: {
    area: string
    city: string
    country: string
    formatted: string
  }
  heroImage: string
  gallery: string[]
  editorialIntro: string
  editorialDescription: string
  summarySpecs: string
  accommodationSummary: {
    pavilionsCount: number
    pavilionsSizeRange: string
    villasCount: number
    villasBedroomsRange: string
  }
  pavilions: AccommodationItem[]
  villas: AccommodationItem[]
  dining: DiningVenue[]
  wellness: WellnessHighlight[]
  atAGlance: AtAGlanceSection
  gettingThere: GettingThere
  reservationUrl?: string
}

/* ─── Experience Categories ───────────────────────────────── */
export const SANCTUARY_CATEGORIES = [
  'All Sanctuaries',
  'Coastal & Island',
  'Urban Sanctuary',
  'Culture & Heritage',
] as const

export type SanctuaryFilterCategory = (typeof SANCTUARY_CATEGORIES)[number]

/* ─── 4 Flagship Hotel Sanctuaries ────────────────────────── */
export const HOTEL_SANCTUARIES: HotelSanctuary[] = [
  {
    id: 'phuket-sanctuary',
    slug: 'greyon-phuket-sanctuary',
    name: 'GREYON Phuket Sanctuary',
    shortName: 'GREYON Phuket',
    tagline: 'A secluded coconut grove sanctuary upon Pansea Beach',
    category: 'Coastal & Island',
    location: {
      area: 'Pansea Beach',
      city: 'Phuket',
      country: 'Thailand',
      formatted: 'Pansea Beach, Phuket, Thailand',
    },
    heroImage:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85',
    ],
    editorialIntro:
      'Resting within a verdant coconut grove on Phuket’s secluded west coast, GREYON Phuket Sanctuary cascades gently down to the white crescent sands of Pansea Beach.',
    editorialDescription:
      'Conceived as a tribute to ancient Ayutthayan architecture, standalone pavilions and oceanfront pool villas echo the timeless grace of Siamese timber craft. Private stepped walkways lead to secluded turquoise shores, sustained by restorative Thai holistic therapies, six bespoke culinary pavilions, and unhurried coastal seclusion.',
    summarySpecs: '40 Pavilions • 44 Villas • Holistic Wellness Centre',
    accommodationSummary: {
      pavilionsCount: 40,
      pavilionsSizeRange: '115–262 sqm',
      villasCount: 44,
      villasBedroomsRange: '3–9 Bedrooms',
    },
    pavilions: [
      {
        id: 'phuket-ocean-pavilion',
        name: 'Ocean Pavilion',
        category: 'Pavilion',
        size: '162 sqm',
        bedrooms: '1 Bedroom',
        view: 'Ocean & Coconut Grove View',
        description:
          'Elevated high above the Andaman Sea with an expansive private sun terrace, sunken terrazzo bathtub, and an open-air timber dining sala.',
        image:
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85',
        features: [
          'King-sized Siamese teak bed',
          'Outdoor covered dining sala',
          'Sunken marble soaking tub & dual rain shower',
          'Personalized bar and tea selection',
        ],
      },
      {
        id: 'phuket-garden-pool-pavilion',
        name: 'Garden Pool Pavilion',
        category: 'Pavilion',
        size: '180 sqm',
        bedrooms: '1 Bedroom',
        view: 'Tropical Garden & Private Pool',
        description:
          'Enclosed within walled private flora, featuring a private 10-metre freshwater plunge pool and secluded sunbathing deck.',
        image:
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Private 10m freshwater swimming pool',
          'Walled tropical courtyard garden',
          'Alfresco rainforest shower',
          'Dedicated butler on call',
        ],
      },
      {
        id: 'phuket-pansea-ocean-pool-pavilion',
        name: 'Pansea Ocean Pool Pavilion',
        category: 'Pavilion',
        size: '262 sqm',
        bedrooms: '1 Bedroom',
        view: 'Panoramic Pansea Bay Sunset View',
        description:
          'The sanctuary’s premier pavilion, offering unmatched sunset horizons over Pansea Bay from an infinity-edge swimming pool.',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Private infinity-edge plunge pool',
          'Wraparound sunset terrace with daybeds',
          'Direct steps toward private beach access',
          'Complimentary evening champagne ritual',
        ],
      },
    ],
    villas: [
      {
        id: 'phuket-three-bedroom-villa',
        name: 'Three-Bedroom Ocean Pool Villa',
        category: 'Villa',
        size: '850 sqm',
        bedrooms: '3 Bedrooms',
        view: 'Unobstructed Andaman Sea Frontage',
        description:
          'Arranged around a private central swimming pool and lotus pond, fully staffed with a dedicated live-in private chef and personal butler.',
        image:
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Dedicated private chef and butler team',
          'Central black-tiled swimming pool (15m)',
          'Independent guest pavilions for total privacy',
          'Open-air living and dining sala for 10 guests',
        ],
      },
      {
        id: 'phuket-six-bedroom-grand-villa',
        name: 'Six-Bedroom Ocean Grand Villa',
        category: 'Villa',
        size: '1,450 sqm',
        bedrooms: '6 Bedrooms',
        view: 'Promontory Headland & Oceanfront',
        description:
          'A majestic multi-tiered private residence perched upon the granite headland with dual infinity pools and dedicated wellness treatment pavilion.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Dual infinity-edge swimming pools',
          'Private wellness treatment sala & sauna',
          'Professional live-in chef kitchen',
          'Expansive entertainment deck with ocean views',
        ],
      },
    ],
    dining: [
      {
        id: 'phuket-buabok',
        name: 'Buabok',
        cuisine: 'Southern Thai Heritage',
        setting: 'Open-air pavilion surrounded by lotus ponds',
        description:
          'Authentic Southern Siamese recipes passed down through generations, utilizing wild coastal herbs, organic royal project produce, and morning Andaman seafood catches.',
        image:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
        hours: 'Breakfast 07:00 – 11:00 | Dinner 18:30 – 22:30',
      },
      {
        id: 'phuket-arva',
        name: 'Arva',
        cuisine: 'Seaside Italian Cucina',
        setting: 'Oceanview terrace overlooking Pansea Bay',
        description:
          'Honest, heart-warming coastal Italian dishes honoring the culinary traditions of Liguria and the Amalfi coast, prepared with seasonal imported truffles and handmade pasta.',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
        hours: 'Lunch 12:00 – 15:30 | Dinner 18:30 – 23:00',
      },
      {
        id: 'phuket-nama',
        name: 'Nama',
        cuisine: 'Japanese Washoku & Robata',
        setting: 'Minimalist granite poolside pavilion',
        description:
          'Masterful sashimi and omakase courses crafted with seafood air-flown directly from Toyosu Market, finished over binchotan white oak charcoal grills.',
        image:
          'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1600&q=85',
        hours: 'Dinner 18:30 – 22:30',
      },
      {
        id: 'phuket-nura',
        name: 'Nura',
        cuisine: 'Levantine & Mediterranean',
        setting: 'Beachside deck under the stars',
        description:
          'Aromatic charcoal meats, vibrant mezze, and spiced coastal flatbreads served with sea-breeze ease as the sun sinks beneath the Andaman horizon.',
        image:
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
        hours: 'Dinner 18:00 – 22:30',
      },
    ],
    wellness: [
      {
        id: 'phuket-holistic-centre',
        title: 'Holistic Wellness Centre',
        subtitle: 'Integrative Medical & Ancient Healing',
        description:
          'Set amidst tranquil hillside rainforest, the multidisciplinary centre brings together certified medical doctors, traditional Thai herbalists, and international wellness practitioners for deeply restorative 3 to 14-night immersions.',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
        therapies: [
          'Integrative medical diagnostic consultations',
          'Traditional Thai herbal compresses & Nuad Thai',
          'Acupuncture, cupping & TCM therapies',
          'Custom botanical steam and hydrotherapy circuits',
        ],
      },
      {
        id: 'phuket-banya',
        title: 'Hydrotherapy & Banya Pavilion',
        subtitle: 'Thermal Contrast Rituals',
        description:
          'Secluded thermal suites equipped with wood-fired cedar banyas, ice plunge pools, and open-air herbal steam caverns surrounded by bamboo groves.',
        image:
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85',
        therapies: [
          'Cedarwood banya thermal contrast therapy',
          'Sub-10°C cold plunge therapy',
          'Himalayan salt inhalation chamber',
          'Sunset ocean meditation & sound bath',
        ],
      },
    ],
    atAGlance: {
      accommodation: [
        '40 Standalone Ayutthaya-inspired Pavilions (115–262 sqm)',
        '44 Oceanfront & Coconut Grove Pool Villas (3 to 9 Bedrooms)',
        'Private outdoor salas, sun terraces, and plunge pools',
        'Dedicated live-in personal chef and butler in all villas',
      ],
      diningAndWellness: [
        '6 Signature restaurants and ocean lounges',
        'Holistic Wellness Centre with resident naturopaths & doctors',
        'Thermal hydrotherapy pavilion with hot/cold plunge and cedar banya',
        '27m midnight-black swimming pool overlooking Pansea Beach',
      ],
      includedInEveryStay: [
        'Daily curated estate breakfast at Buabok or in residence',
        'Private airport round-trip transfers in chauffeured executive vehicle',
        'Non-motorized water sports (stand-up paddle, sea kayaking, snorkeling)',
        'Daily sunset movement ritual (yoga, sound healing, or meditation)',
        'Unpacking and pressing service upon arrival',
      ],
    },
    gettingThere: {
      nearestAirport: 'Phuket International Airport (HKT)',
      distance: '30 minutes by private vehicle',
      transferDetails:
        'Complimentary private VIP airport concierge and chauffeured executive vehicle transfer included with every reservation.',
    },
    reservationUrl: '/offers',
  },
  {
    id: 'bangkok-sanctuary',
    slug: 'greyon-bangkok-sanctuary',
    name: 'GREYON Bangkok Sanctuary',
    shortName: 'GREYON Bangkok',
    tagline: 'An unhurried metropolitan haven rising within the historic embassy quarter',
    category: 'Urban Sanctuary',
    location: {
      area: 'Wireless Road',
      city: 'Bangkok',
      country: 'Thailand',
      formatted: 'Wireless Road, Bangkok, Thailand',
    },
    heroImage:
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85',
    ],
    editorialIntro:
      'Rising serenely amid century-old rain trees on Wireless Road, GREYON Bangkok Sanctuary brings an oasis of absolute calm to the capital’s diplomatic quarter.',
    editorialDescription:
      'Designed as an antidote to the city’s kinetic tempo, high-ceilinged suites and private sky residences overlook the verdant canopy of Lumphini Park. Featuring an extensive multi-level wellness sanctuary, Japanese omakase counter, Italian cucina, and intimate courtyard tea rooms.',
    summarySpecs: '52 Suites • 38 Sky Residences • 1,500 sqm Urban Spa',
    accommodationSummary: {
      pavilionsCount: 52,
      pavilionsSizeRange: '95–185 sqm',
      villasCount: 38,
      villasBedroomsRange: '2–5 Bedrooms',
    },
    pavilions: [
      {
        id: 'bangkok-deluxe-suite',
        name: 'Park Suite',
        category: 'Suite',
        size: '110 sqm',
        bedrooms: '1 Bedroom',
        view: 'Canopy View of Lumphini Park',
        description:
          'Spacious living salon with natural oak paneling, private dressing room, and floor-to-ceiling glass framing the historic rain trees.',
        image:
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
        features: [
          'High ceilings (3.4m) with acoustic attenuation',
          'Custom silk wall treatments & Belgian linen',
          'Deep soaking volcanic stone bathtub',
          'Private butler bar with sommelier pairings',
        ],
      },
      {
        id: 'bangkok-presidential-sky-suite',
        name: 'The Embassy Suite',
        category: 'Suite',
        size: '185 sqm',
        bedrooms: '1 Bedroom',
        view: 'Skyline & Park Panoramas',
        description:
          'Corner sanctuary with expansive dining salon, private study, walk-in humidor, and dedicated wellness treatment chamber.',
        image:
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Corner panoramic aspect overlooking park & skyline',
          'In-suite infrared sauna and treatment room',
          'Dining table for up to 8 guests',
          '24-hour dedicated butler service',
        ],
      },
    ],
    villas: [
      {
        id: 'bangkok-three-bedroom-sky-residence',
        name: 'Three-Bedroom Sky Residence',
        category: 'Villa',
        size: '420 sqm',
        bedrooms: '3 Bedrooms',
        view: 'Panoramic City & River Horizon',
        description:
          'A multi-level sky penthouse boasting an open-air cantilevered terrace, private heated pool, and bespoke Italian furnishings.',
        image:
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Private cantilevered swimming pool',
          'Private elevator entrance with security vestibule',
          'Full gourmet kitchen with private chef on request',
          'Chauffeured town car on standby throughout stay',
        ],
      },
    ],
    dining: [
      {
        id: 'bangkok-rain-tree',
        name: 'The Rain Tree Room',
        cuisine: 'Modern Royal Thai',
        setting: 'Historic glass pavilion within century-old parkland',
        description:
          'Deconstructed Royal Thai recipes presented with contemporary finesse, honoring ancient palace court manuscripts and heritage cooking techniques.',
        image:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
      },
      {
        id: 'bangkok-arva',
        name: 'Arva Bangkok',
        cuisine: 'Contemporary Italian Cucina',
        setting: 'Double-height library salon with garden terrace',
        description:
          'Venetian and Piedmontese seasonal specialties, house-cured salumi, and an extraordinary 1,200-bottle cellar of rare Italian vintages.',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
      },
    ],
    wellness: [
      {
        id: 'bangkok-urban-spa',
        title: 'The Urban Wellness Sanctuary',
        subtitle: 'Circadian Reset & Longevity Medicine',
        description:
          'Spanning three dedicated levels, this urban sanctuary integrates sleep science, hyperbaric oxygen therapy, cryotherapy, and restorative herbal baths.',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
        therapies: [
          'Circadian light & sleep recalibration',
          'Mild hyperbaric oxygen chambers',
          'Acoustic sound wave immersion therapy',
          'Private thermal hydrotherapy suites',
        ],
      },
    ],
    atAGlance: {
      accommodation: [
        '52 Expansive Suites overlooking Lumphini Park (95–185 sqm)',
        '38 Duplex & Triplex Sky Residences (2 to 5 Bedrooms)',
        'Acoustically isolated floor plates for total metropolitan silence',
        '24-Hour dedicated private butler and concierge team',
      ],
      diningAndWellness: [
        '4 Signature restaurants, omakase counter, and salon lounges',
        '1,500 sqm Urban Spa across 3 private wellness levels',
        '25m indoor cantilevered lap pool with park views',
        'Private movement and Pilates reformer studio',
      ],
      includedInEveryStay: [
        'A la carte breakfast in The Rain Tree Room or in suite',
        'Chauffeured airport VIP round-trip transfer (BKK/DMK)',
        'Fast-track immigration service at Suvarnabhumi Airport',
        'Daily evening sunset apéritif in the Embassy Lounge',
        'Unpacking, pressing, and shoe care service',
      ],
    },
    gettingThere: {
      nearestAirport: 'Suvarnabhumi Airport (BKK) / Don Mueang (DMK)',
      distance: '35 minutes by private executive vehicle',
      transferDetails:
        'Complimentary VIP tarmac greeting and chauffeured limousine transfer arranged with all bookings.',
    },
    reservationUrl: '/offers',
  },
  {
    id: 'siemreap-sanctuary',
    slug: 'greyon-siemreap-sanctuary',
    name: 'GREYON Siem Reap Sanctuary',
    shortName: 'GREYON Siem Reap',
    tagline: 'A peaceful French-colonial retreat beside the temples of Angkor',
    category: 'Culture & Heritage',
    location: {
      area: 'French Quarter',
      city: 'Siem Reap',
      country: 'Cambodia',
      formatted: 'French Quarter, Siem Reap, Cambodia',
    },
    heroImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85',
    ],
    editorialIntro:
      'Set within a manicured estate formerly favored by the royal court, GREYON Siem Reap Sanctuary stands moments from the ancient stone monuments of Angkor Wat.',
    editorialDescription:
      'Echoing 1960s New Khmer Architecture, low-rise suites encircle tranquil reflecting ponds and shaded frangipani courtyards. Private temple explorations at dawn, traditional Khmer herbal therapies, and unhurried afternoons beside the emerald-tiled swimming pool.',
    summarySpecs: '24 Courtyard Suites • 8 Heritage Pool Villas • Khmer Spa',
    accommodationSummary: {
      pavilionsCount: 24,
      pavilionsSizeRange: '105–170 sqm',
      villasCount: 8,
      villasBedroomsRange: '2–4 Bedrooms',
    },
    pavilions: [
      {
        id: 'siemreap-courtyard-suite',
        name: 'Courtyard Suite',
        category: 'Suite',
        size: '115 sqm',
        bedrooms: '1 Bedroom',
        view: 'Private Frangipani Garden Courtyard',
        description:
          'Minimalist terrazzo and sandstone finishes with an open-plan sleeping pavilion, private garden courtyard, and freestanding soaking tub.',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Private walled sandstone courtyard garden',
          'Custom terrazzo sunken soaking tub',
          'Monochrome 1960s New Khmer detailing',
          'Dedicated remork (tuk-tuk) and driver for stay',
        ],
      },
      {
        id: 'siemreap-pool-suite',
        name: 'Heritage Pool Suite',
        category: 'Suite',
        size: '170 sqm',
        bedrooms: '1 Bedroom',
        view: 'Private Swimming Pool & Lotus Courtyard',
        description:
          'Featuring a private 6-metre sandstone plunge pool surrounded by indigenous bamboo and frangipani blossoms.',
        image:
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Private plunge pool with shaded daybed',
          'Outdoor rain shower beneath stone carvings',
          'Curated library of Khmer archaeological texts',
          'Daily temple excursion picnic basket',
        ],
      },
    ],
    villas: [
      {
        id: 'siemreap-royal-residence',
        name: 'Four-Bedroom Royal Heritage Villa',
        category: 'Villa',
        size: '680 sqm',
        bedrooms: '4 Bedrooms',
        view: 'Private Estate Grounds & Lotus Lagoon',
        description:
          'An exclusive private sanctuary enclosed within high stone walls, featuring an expansive private lap pool, dining sala, and live-in Khmer chef.',
        image:
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Private 18m slate-lined swimming pool',
          'Dedicated live-in private chef and remork drivers',
          'Outdoor dining pavilion seating 12 guests',
          'Private blessing ceremony by senior Buddhist monks',
        ],
      },
    ],
    dining: [
      {
        id: 'siemreap-circular-room',
        name: 'The Circular Dining Room',
        cuisine: 'Refined Khmer Cuisine',
        setting: 'Circular 1960s heritage rotunda overlooking gardens',
        description:
          'Authentic Cambodian recipes celebrating Tonle Sap freshwater fish, Kampot green pepper, wild forest honey, and seasonal organic herbs.',
        image:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
      },
      {
        id: 'siemreap-village-house',
        name: 'The Khmer Village House',
        cuisine: 'Traditional Claypot & Charcoal Feast',
        setting: 'Traditional stilted wooden house inside Angkor archaeological park',
        description:
          'An exclusive off-property culinary experience cooked over open charcoal embers alongside peaceful rice paddies at twilight.',
        image:
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
      },
    ],
    wellness: [
      {
        id: 'siemreap-khmer-spa',
        title: 'The Khmer Healing Spa',
        subtitle: 'Ancient Monastic Herbology',
        description:
          'Four tranquil treatment suites wrapped around reflecting ponds, offering therapies rooted in centuries of traditional Cambodian natural medicine.',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
        therapies: [
          'Traditional Kroma herbal body polishes',
          'Warm ginger and lemongrass compress rituals',
          'Champa flower therapeutic scalp massage',
          'Private meditation sessions with resident monks',
        ],
      },
    ],
    atAGlance: {
      accommodation: [
        '24 Serene Courtyard Suites (105–170 sqm)',
        '8 Walled Heritage Pool Villas (2 to 4 Bedrooms)',
        'Private courtyards with terrazzo soaking tubs',
        'Dedicated custom remork and chauffeur for each party',
      ],
      diningAndWellness: [
        'The Circular Dining Room & private off-property Village House',
        'Khmer Healing Spa with natural organic botanical formulations',
        'Curved 25m swimming pool and tranquil reflecting ponds',
        'Private temple access arranged with specialist archaeologists',
      ],
      includedInEveryStay: [
        'Daily estate breakfast and afternoon tea ritual',
        'Private airport round-trip transfers in executive vehicle',
        'Dedicated remork driver for local Siem Reap excursions',
        'Daily temple laundry and shoe cleaning service',
        'Angkor dawn tour picnic basket and chilled refreshments',
      ],
    },
    gettingThere: {
      nearestAirport: 'Siem Reap–Angkor International Airport (SAI)',
      distance: '45 minutes by private vehicle',
      transferDetails:
        'Complimentary private VIP airport greeting and vehicle transfer included with all reservations.',
    },
    reservationUrl: '/offers',
  },
  {
    id: 'krabi-cove',
    slug: 'greyon-krabi-cove',
    name: 'GREYON Krabi Cove',
    shortName: 'GREYON Krabi',
    tagline: 'Dramatic limestone karst topography and pristine marine solitude',
    category: 'Coastal & Island',
    location: {
      area: 'Phang Nga Bay',
      city: 'Krabi',
      country: 'Thailand',
      formatted: 'Phang Nga Bay, Krabi, Thailand',
    },
    heroImage:
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=85',
    ],
    editorialIntro:
      'Sheltered beneath soaring limestone sea-karsts in a secluded private cove, GREYON Krabi Cove is accessible only by private maritime transfer across Phang Nga Bay.',
    editorialDescription:
      'Open-timber living pavilions perch high on the jungle ridge, offering uninterrupted panoramas of the emerald Andaman Sea. Days unfold with private yacht charters through uninhabited islands, coral reef stewardship, and secluded cliffside dinners beneath the stars.',
    summarySpecs: '32 Ocean Pavilions • 16 Cliffside Villas • Marine Reserve Center',
    accommodationSummary: {
      pavilionsCount: 32,
      pavilionsSizeRange: '120–210 sqm',
      villasCount: 16,
      villasBedroomsRange: '2–6 Bedrooms',
    },
    pavilions: [
      {
        id: 'krabi-ocean-cliff-pavilion',
        name: 'Ocean Cliff Pavilion',
        category: 'Pavilion',
        size: '145 sqm',
        bedrooms: '1 Bedroom',
        view: 'Limestone Karsts & Phang Nga Bay Panorama',
        description:
          'Perched upon the cliff edge with timber deck, outdoor shower, and sunken lounge opening completely to sea breezes.',
        image:
          'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Panoramic views of limestone marine karsts',
          'Cantilevered timber viewing platform with daybed',
          'Freestanding oval bathtub framing the bay',
          'Direct jungle trail to secluded private cove',
        ],
      },
      {
        id: 'krabi-cove-pool-pavilion',
        name: 'Cove Pool Pavilion',
        category: 'Pavilion',
        size: '210 sqm',
        bedrooms: '1 Bedroom',
        view: 'Direct Beachfront & Turquoise Lagoon',
        description:
          'Steps from the calm waters of the cove, featuring a private 12m lap pool, outdoor dining sala, and private beach loungers.',
        image:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Direct private beach access',
          'Private 12m swimming pool',
          'Outdoor rain shower surrounded by granite rock',
          'In-pavilion afternoon tea service',
        ],
      },
    ],
    villas: [
      {
        id: 'krabi-cliffside-villa',
        name: 'Three-Bedroom Cliffside Villa',
        category: 'Villa',
        size: '720 sqm',
        bedrooms: '3 Bedrooms',
        view: '270° Panoramic Phang Nga Bay Sea View',
        description:
          'An architectural masterpiece with multi-level cedar decks, private infinity pool, dedicated skipper, and resident private chef.',
        image:
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85',
        features: [
          'Private infinity swimming pool overlooking sea-karsts',
          'Dedicated live-in chef and private butler',
          'Private boat dock access and daily private charter boat',
          'Sunset cocktail deck with fire pit',
        ],
      },
    ],
    dining: [
      {
        id: 'krabi-karst-pavilion',
        name: 'The Karst Pavilion',
        cuisine: 'Coastal Andaman & Thai Seafood',
        setting: 'Open-air cliffside pavilion over Phang Nga Bay',
        description:
          'Wood-fired and sea-salt roasted local catches, wild island herbs, and fragrant coconut curries served above the water.',
        image:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
      },
      {
        id: 'krabi-cliff-sunset-bar',
        name: 'Cliff Sunset Bar',
        cuisine: 'Botanical Infusions & Raw Bar',
        setting: 'Suspended deck high above the cove',
        description:
          'Oysters, crudo, and tailored botanicals as the sun casts deep amber shadows across the towering limestone cliffs.',
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
      },
    ],
    wellness: [
      {
        id: 'krabi-marine-wellness',
        title: 'Marine Hydrotherapy & Cave Spa',
        subtitle: 'Ocean Minerals & Sea Cave Sanctuary',
        description:
          'Natural sea-cave treatment salas utilizing mineral-rich sea salts, spirulina wraps, and open-air hydrotherapy circuits.',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
        therapies: [
          'Thalassotherapy & sea-mineral body immersions',
          'Natural limestone sea-cave sound baths',
          'Cold ocean plunge & thermal rock sauna',
          'Sunrise paddleboard yoga sessions',
        ],
      },
    ],
    atAGlance: {
      accommodation: [
        '32 Ocean Cliff & Beachfront Pavilions (120–210 sqm)',
        '16 Cliffside Pool Villas (2 to 6 Bedrooms)',
        'Private swimming pools, expansive sun decks, and salas',
        'Private maritime boat dock access for every villa',
      ],
      diningAndWellness: [
        '3 Coastal dining venues and cliffside sunset bar',
        'Marine Hydrotherapy & Cave Spa with mineral treatments',
        'Infinity swimming pool cantilevered over Phang Nga Bay',
        'Marine conservation center with marine biologist on site',
      ],
      includedInEveryStay: [
        'Daily curated champagne breakfast overlooking the bay',
        'Private airport transfers via executive vehicle & luxury catamaran',
        'Daily scheduled private island excursions and snorkeling trips',
        'Non-motorized water sports (kayaks, stand-up paddleboards)',
        'Unpacking and pressing service upon arrival',
      ],
    },
    gettingThere: {
      nearestAirport: 'Krabi International Airport (KBV) / Phuket (HKT)',
      distance: '45 mins vehicle + 20 mins private boat transfer',
      transferDetails:
        'Complimentary private VIP airport greeting, private vehicle, and executive catamaran maritime transfer included.',
    },
    reservationUrl: '/offers',
  },
]

