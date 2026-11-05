import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NEWS_ITEMS } from '@/data/news'

const CATEGORIES = ['All', 'PROMOTION', 'CSR', 'PROJECT', 'INSPIRATION'] as const
type Category = (typeof CATEGORIES)[number]

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filteredNews = useMemo(() => {
    if (activeCategory === 'All') return NEWS_ITEMS
    return NEWS_ITEMS.filter(
      (item) => item.category?.toUpperCase() === activeCategory.toUpperCase()
    )
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-greyon-cream text-greyon-ink pt-32 sm:pt-40 pb-32 select-none">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* ── Page Header: Editorial Journal ───────────────────── */}
        <header className="border-b border-greyon-stone/40 pb-10 mb-12">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-greyon-gold-deep">
            Chronicle &amp; Dispatches
          </p>
          <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-greyon-ink">
              News &amp; Perspectives
            </h1>
            <p className="font-body italic text-greyon-muted text-sm sm:text-base max-w-md">
              Architectural announcements, social initiatives, and reflections on contemporary habitat design.
            </p>
          </div>
        </header>

        {/* ── Minimalist Category Navigation (No Pills, No Heavy Borders) ── */}
        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-16 pb-4 border-b border-greyon-stone/20">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`font-display text-xs tracking-[0.2em] uppercase transition-all duration-300 relative py-1 focus:outline-none ${
                  isActive
                    ? 'text-greyon-ink font-medium'
                    : 'text-greyon-muted/60 hover:text-greyon-ink'
                }`}
              >
                <span>{category}</span>
                {isActive && (
                  <motion.div
                    layoutId="newsCategoryUnderline"
                    className="absolute -bottom-[17px] left-0 right-0 h-[1.5px] bg-greyon-primary"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* ── 3-Column Editorial Grid (Spacious, No Outer Card Boxes) ── */}
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
                  {/* Clean Photographic Canvas (Sharp, No Heavy Gradients) */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-greyon-sand">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* Decoupled Editorial Typography Below */}
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
                    <h2 className="font-display text-xl sm:text-2xl font-light text-greyon-ink tracking-tight leading-snug transition-colors duration-300 group-hover:text-greyon-primary">
                      {article.title}
                    </h2>

                    {/* Quiet Text Action Link */}
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
  )
}