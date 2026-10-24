import type { Promotion } from '@/types'

export const PROMOTIONS: Promotion[] = [
  {
    id: 'cira-vip-preview',
    projectName: 'CIRA Residences',
    headline: 'Private VIP Preview: Bespoke Luxury Living',
    body: 'Be among the privileged few to experience the completed master show villa in central Bangkok. Schedule a private walkthrough accompanied by our architectural consultants and unlock exclusive pre-launch acquisition privileges.',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ctaLabel: 'Schedule Private Preview',
    ctaUrl: '/contact',
  },
  {
    id: 'corner-ready-to-move',
    projectName: 'Corner Ratchathewi',
    headline: 'Move-In Ready Sanctuary with 0% Financing',
    body: 'Step into immediate luxury in prime Ratchathewi. Selected units include tailored interior design packages by renowned interior studios, 2-year waived sinking fund fees, and flexible installment arrangements.',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ctaLabel: 'View Available Units',
    ctaUrl: '/project/corner-ratchathewi',
  },
  {
    id: 'curva-collectors-release',
    projectName: 'Curva Ekkamai',
    headline: 'The Collector’s Edition: Exclusive 12-Unit Release',
    body: 'A rare sanctuary for discerning homeowners seeking low-density exclusivity. Featuring private elevator foyers, double-volume ceilings, private courtyard terraces, and dedicated smart EV parking bays.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ctaLabel: 'Request Residence Portfolio',
    ctaUrl: '/contact',
  },
]
