import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NEWS_ITEMS } from '@/data/news'

const CATEGORIES = ['All', 'PROMOTION', 'CSR', 'PROJECT', 'INSPIRATION'] as const
type Category = (typeof CATEGORIES)[number]

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  // Identify featured article (CSR community story or fallback to first item)
  const featuredArticle = useMemo(() => {
    return (
      NEWS_ITEMS.find((item) => item.id === 'caring-for-our-community-beyond-the-handover') ||
      NEWS_ITEMS[0]
    )
  }, [])

  // Filtered collection based on active pill
  const filteredNews = useMemo(() => {
    if (activeCategory === 'All') return NEWS_ITEMS
    return NEWS_ITEMS.filter(
      (item) => item.category?.toUpperCase() === activeCategory.toUpperCase()
    )
  }, [activeCategory])

  // Handle "EXPLORE [CATEGORY]" button action
  const handleExploreCategory = (cat?: string) => {
    if (!cat) return
    const matchedCategory = CATEGORIES.find(
      (c) => c.toUpperCase() === cat.toUpperCase()
    )
    if (matchedCategory) {
      setActiveCategory(matchedCategory)
    }
    const collectionEl = document.getElementById('collection-section')
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-greyon-cream text-greyon-ink pt-32 sm:pt-40 pb-32 select-none">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* ── 1. Featured Headline Section (Top) ─────────────────── */}
        {featuredArticle && (
          <section
            aria-label="Featured Headline Story"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16 sm:mb-20 pb-16 border-b border-greyon-stone/40"
          >
            {/* Left Column: Text Content (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Eyebrow */}
              <p className="font-display text-[11px] sm:text-xs tracking-[0.25em] uppercase text-greyon-gold-deep mb-3 font-medium">
                NEWS / FEATURED STORY
              </p>

              {/* Headline */}
              <Link
                to={`/news/${featuredArticle.slug || featuredArticle.id}`}
                className="group focus:outline-none"
              >
                <h1 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl tracking-tight text-greyon-ink leading-tight mb-4 group-hover:text-greyon-primary transition-colors">
                  {featuredArticle.title}
                </h1>
              </Link>

              {/* Metadata: Date & Category separated by middle dot */}
              <p className="font-body text-xs sm:text-sm text-greyon-muted font-light mb-6">
                {featuredArticle.date} · {featuredArticle.category || 'FEATURED'}
              </p>

              {/* Dual Button Group */}
              <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-4">
                {/* Primary Button: Read Full Story */}
                <Link
                  to={`/news/${featuredArticle.slug || featuredArticle.id}`}
                  className="rounded-full bg-greyon-dark px-6 py-2.5 text-xs uppercase font-medium text-white hover:bg-greyon-primary transition-colors tracking-wider shadow-sm"
                >
                  READ FULL STORY
                </Link>

                {/* Secondary Button: Explore Category */}
                <button
                  type="button"
                  onClick={() => handleExploreCategory(featuredArticle.category)}
                  className="rounded-full border border-greyon-stone px-6 py-2.5 text-xs uppercase font-medium text-greyon-ink hover:bg-greyon-sand transition-colors tracking-wider cursor-pointer"
                >
                  EXPLORE {featuredArticle.category?.toUpperCase() || 'CATEGORY'}
                </button>
              </div>
            </div>

            {/* Right Column: Featured Visual (5 cols on lg) */}
            <div className="lg:col-span-5">
              <Link
                to={`/news/${featuredArticle.slug || featuredArticle.id}`}
                className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-sm block bg-greyon-sand focus:outline-none"
              >
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Bottom-left Category Badge */}
                {featuredArticle.category && (
                  <span className="absolute bottom-4 left-4 bg-white/95 text-greyon-ink text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full shadow-sm">
                    {featuredArticle.category}
                  </span>
                )}
              </Link>
            </div>
          </section>
        )}

        {/* ── 2. Collection Section (Preserved Archive) ──────────── */}
        <div id="collection-section" className="scroll-mt-32">
          {/* Section Title & Total Counter Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-greyon-stone/40 mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-greyon-ink">
              Browse the collection
            </h2>
            <span className="font-display text-xs tracking-[0.25em] uppercase text-greyon-muted/80 font-medium">
              {NEWS_ITEMS.length} STORIES
            </span>
          </div>

          {/* Filter Navigation Bar (Pill buttons matching design reference) */}
          <nav
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-12 sm:mb-16"
            aria-label="Filter news by category"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-1.5 text-xs font-medium uppercase tracking-wider border transition-colors duration-200 cursor-pointer focus:outline-none ${
                    isActive
                      ? 'bg-greyon-dark text-white border-greyon-dark shadow-sm'
                      : 'bg-transparent border-greyon-stone text-greyon-ink hover:bg-greyon-sand hover:border-greyon-muted'
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              )
            })}
          </nav>

          {/* 3-Column Editorial Grid (All 18 articles preserved) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((article) => (
                <motion.article
                  layout
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col"
                >
                  <Link
                    to={`/news/${article.slug || article.id}`}
                    className="flex flex-col h-full focus:outline-none"
                  >
                    {/* Clean Photographic Canvas */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-greyon-sand rounded-xl">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>

                    {/* Editorial Typography Below */}
                    <div className="mt-6 flex flex-col flex-1">
                      {/* Meta Row: Category & Date */}
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-display text-[11px] tracking-[0.25em] uppercase text-greyon-gold-deep">
                          {article.category || 'Article'}
                        </span>
                        <time className="font-body text-xs text-greyon-muted font-light">
                          {article.date}
                        </time>
                      </div>

                      {/* Headline */}
                      <h3 className="font-display text-xl sm:text-2xl font-light text-greyon-ink tracking-tight leading-snug transition-colors duration-300 group-hover:text-greyon-primary">
                        {article.title}
                      </h3>

                      {/* Text Action Link */}
                      <div className="mt-5 pt-3 border-t border-greyon-stone/30 flex items-center justify-between">
                        <span className="font-display text-[11px] tracking-widest uppercase text-greyon-muted group-hover:text-greyon-ink transition-colors duration-200">
                          Read Story
                        </span>
                        <span className="text-greyon-ink text-sm transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>

            {filteredNews.length === 0 && (
              <div className="col-span-full py-28 text-center">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-greyon-muted">
                  No articles filed under this classification.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
