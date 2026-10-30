import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { NEWS_ITEMS } from '@/data/news'

export default function LatestNewsSection() {
  const latestArticles = NEWS_ITEMS.slice(0, 4)

  return (
    <section
      className="relative bg-greyon-cream py-24 md:py-28 overflow-hidden"
      aria-label="Latest News"
    >
      <div className="container-large">
        {/* ── Header Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
          className="flex items-end justify-between mb-10 md:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight leading-[1.2]">
            Latest News from SCHNEITEC PROPERTY
          </h2>

          <Link
            to="/news"
            className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-greyon-stone text-greyon-ink hover:bg-greyon-primary hover:border-greyon-primary hover:text-white transition-all duration-300 shrink-0"
            aria-label="View all news"
          >
            <ChevronRight size={20} />
          </Link>
        </motion.div>

        {/* ── 4-Column Card Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {latestArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.165, 0.84, 0.44, 1],
              }}
            >
              <Link
                to={`/news/${article.slug}`}
                className="block aspect-[3/5] rounded-2xl overflow-hidden relative group"
              >
                {/* Background Image */}
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                {/* Category / Tag Pill (top-right) */}
                {(article.category || article.tag) && (
                  <span className="absolute top-4 right-4 z-10 text-[10px] font-medium tracking-[0.15em] uppercase text-white/90 bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-3 py-1">
                    {article.category || article.tag}
                  </span>
                )}

                {/* Text Content (bottom) */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
                  <h3 className="text-sm sm:text-base font-medium text-white leading-snug line-clamp-3 mb-2">
                    {article.title}
                  </h3>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                    {article.date}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile "View All" fallback */}
        <div className="flex sm:hidden justify-center mt-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-greyon-muted hover:text-greyon-ink transition-colors"
          >
            <span>View All News</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
