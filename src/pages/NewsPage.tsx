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
    <div className="min-h-screen bg-white text-[#050810] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Page Headline ── */}
        <h1 className="text-5xl md:text-[64px] font-light mb-8 uppercase text-[#050810] tracking-tight">
          NEWS
        </h1>

        {/* ── Category Filter Bar ── */}
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
                  isActive
                    ? 'bg-[#0B1D3A] text-white shadow-sm'
                    : 'bg-white border border-[#0B1D3A] text-[#0B1D3A] hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* ── 4-Column News Card Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((article) => (
              <motion.div
                layout
                key={article.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.165, 0.84, 0.44, 1] }}
              >
                <Link
                  to={`/news/${article.slug}`}
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden group block shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Card Image */}
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Top Right Badge */}
                  {article.category && (
                    <span className="absolute top-4 right-4 border border-white/60 text-white text-[10px] uppercase px-3 py-1 rounded-full backdrop-blur-sm font-medium tracking-wider">
                      {article.category}
                    </span>
                  )}

                  {/* Bottom Text Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h2 className="text-white text-sm md:text-base font-medium line-clamp-3 mb-2 leading-snug">
                      {article.title}
                    </h2>
                    <span className="text-white/70 text-xs block">
                      {article.date}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredNews.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500 font-light">
              No news articles found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
