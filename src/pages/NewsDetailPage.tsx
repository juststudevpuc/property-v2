import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2 } from 'lucide-react'
import { NEWS_ITEMS } from '@/data/news'
import type { NewsItem } from '@/types'

type ContentBlock =
  | { type: 'heading' | 'paragraph'; text: string }
  | { type: 'gallery'; images: string[] }

interface ArticleData {
  title: string
  date: string
  image: string
  content: ContentBlock[]
}

const DEFAULT_GALLERY = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
]

const DEFAULT_ARTICLE: ArticleData = {
  title: 'Above the City: An Exclusive First Look at the Horizon Penthouse',
  date: 'September 9, 2026',
  image:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85',
  content: [
    {
      type: 'paragraph',
      text:
        'Floating high above the Bangkok metropolis, the newly unveiled Horizon Penthouse Collection redefines super luxury vertical living. Every architectural vantage point has been meticulously calibrated to frame uninterrupted panoramic views across the city skyline, where the setting sun bathes monolithic stone finishes and bespoke bronze accents in rich golden tones.',
    },
    {
      type: 'heading',
      text: 'A Private Home Above the City',
    },
    {
      type: 'paragraph',
      text:
        'Conceived as a true single-family estate suspended in the clouds, the residence spans <strong>293.94 sq.m. across three levels</strong> with an impressive <strong>6.2-metre double-volume living space</strong>. Grand gallery hallways open into sweeping entertaining pavilions, while an acoustically insulated master sanctuary offers complete privacy from the vibrant rhythms of the streets below.',
    },
    {
      type: 'paragraph',
      text:
        'Custom Italian marble surfaces, seamless flush joinery, and private elevator vestibules establish an atmosphere of understated, timeless sophistication. Each private outdoor sky deck features a cantilevered plunge pool that merges effortlessly with the open horizon.',
    },
    {
      type: 'gallery',
      images: DEFAULT_GALLERY,
    },
    {
      type: 'heading',
      text: 'Beyond the Penthouse',
    },
    {
      type: 'paragraph',
      text:
        'Residents enjoy dedicated residential concierge services, private sommelier cellars, and discreet subterranean parking bays. As prime transit-oriented luxury assets in central Bangkok continue to attract discerning international collectors, the Horizon Penthouse represents not merely a prestigious address, but a generational legacy sanctuary.',
    },
  ],
}

function buildArticleContent(found: NewsItem): ContentBlock[] {
  if (found.slug === 'above-the-city-horizon-penthouse') {
    return DEFAULT_ARTICLE.content
  }

  const galleryImages =
    found.gallery && found.gallery.length > 0 ? found.gallery : DEFAULT_GALLERY
  const paragraphs = found.content && found.content.length > 0 ? found.content : [found.excerpt]

  const heading1 =
    found.category === 'CSR'
      ? 'Community Empowerment & Sustainable Urban Stewardship'
      : found.category === 'PROMOTION'
        ? 'Curated Privileges & Tailored Ownership Packages'
        : found.category === 'INSPIRATION'
          ? 'Spatial Philosophy & Human-Centric Mastercraft'
          : 'A Private Home Above the City'

  const heading2 =
    found.category === 'CSR'
      ? 'Building Tomorrow: Long-Term Social Value'
      : found.category === 'PROMOTION'
        ? 'VIP Preview Appointments & Space Management Services'
        : 'Beyond the Penthouse'

  const blocks: ContentBlock[] = []

  // Paragraph 1: Intro
  blocks.push({
    type: 'paragraph',
    text: paragraphs[0],
  })

  // Heading 1
  blocks.push({
    type: 'heading',
    text: heading1,
  })

  // Paragraph 2
  if (paragraphs.length > 1) {
    blocks.push({
      type: 'paragraph',
      text: paragraphs[1],
    })
  } else {
    blocks.push({
      type: 'paragraph',
      text:
        'Every spatial dimension has been calibrated to optimize natural daylight and cross-ventilation, pairing acoustic insulation with handcrafted Italian finishes to create a serene retreat in the heart of Bangkok.',
    })
  }

  // Gallery: Vertical Image Stack
  blocks.push({
    type: 'gallery',
    images: galleryImages,
  })

  // Heading 2
  blocks.push({
    type: 'heading',
    text: heading2,
  })

  // Paragraph 3 / Concluding Paragraphs
  if (paragraphs.length > 2) {
    for (let i = 2; i < paragraphs.length; i++) {
      blocks.push({
        type: 'paragraph',
        text: paragraphs[i],
      })
    }
  } else {
    blocks.push({
      type: 'paragraph',
      text: found.quote
        ? `“${found.quote}” As Bangkok’s urban fabric continues to mature, The Creators HQ remains steadfast in creating enduring sanctuaries designed to withstand the test of time.`
        : 'As Bangkok’s urban fabric continues to mature, The Creators HQ remains steadfast in creating enduring sanctuaries designed to withstand the test of time.',
    })
  }

  return blocks
}

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [copied, setCopied] = useState(false)

  const foundArticle = NEWS_ITEMS.find((n) => n.slug === slug)

  // Use found article data or fall back to the Horizon Penthouse editorial mock
  const article: ArticleData = foundArticle
    ? {
        title: foundArticle.title,
        date: foundArticle.date,
        image: foundArticle.coverImage,
        content: buildArticleContent(foundArticle),
      }
    : DEFAULT_ARTICLE

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          url: window.location.href,
        })
        return
      } catch {
        // Fallback to clipboard if share cancelled
      }
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <main className="min-h-screen bg-greyon-cream text-greyon-ink pt-32 md:pt-40 pb-24">
      {/* Top Header Section (Constrained Width) */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mb-12">
        {/* Meta Row */}
        <div className="flex items-center justify-between mb-8">
          {/* Left: The Date */}
          <span className="text-sm font-medium tracking-widest uppercase text-greyon-muted">
            {article.date}
          </span>

          {/* Right: A 'Share' button */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 text-sm font-medium text-greyon-ink border border-greyon-stone rounded-full px-5 py-2 hover:bg-greyon-primary hover:border-greyon-primary hover:text-white transition-colors cursor-pointer"
            aria-label="Share article"
          >
            <Share2 size={15} />
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-[56px] lg:text-[64px] font-light leading-[1.1] text-greyon-ink"
        >
          {article.title}
        </motion.h1>
      </section>

      {/* Hero Image Section */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-greyon-sand shadow-sm"
        >
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Article Body (Reading Column) */}
      <article className="max-w-3xl mx-auto px-6 md:px-12">
        <div>
          {article.content.map((block, index) => {
            if (block.type === 'heading') {
              return (
                <h2
                  key={index}
                  className="text-2xl md:text-3xl text-greyon-ink font-light mt-16 mb-6"
                >
                  {block.text}
                </h2>
              )
            }

            if (block.type === 'gallery') {
              return (
                <div key={index} className="flex flex-col gap-6 md:gap-10 my-12 md:my-16 w-full">
                  {block.images.map((src, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={src}
                      alt="Article gallery"
                      className="w-full h-auto object-cover rounded-sm shadow-sm"
                    />
                  ))}
                </div>
              )
            }

            return (
              <p
                key={index}
                className="text-base md:text-lg text-greyon-ink/85 font-light leading-[1.8] mb-8 [&_strong]:font-semibold [&_strong]:text-greyon-ink"
                dangerouslySetInnerHTML={{ __html: block.text }}
              />
            )
          })}
        </div>

        {/* Back to News Button */}
        <div className="pt-4 border-t border-greyon-stone">
          <Link
            className="inline-flex items-center gap-2 text-greyon-ink font-medium mt-12 hover:opacity-70 transition-opacity"
            to="/news"
          >
            <ArrowLeft size={16} />
            <span>Back to News</span>
          </Link>
        </div>
      </article>
    </main>
  )
}
