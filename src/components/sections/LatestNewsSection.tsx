import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowUpRight } from 'lucide-react'
import { NEWS_ITEMS } from '@/data/news'

export default function LatestNewsSection() {
  const latestArticles = NEWS_ITEMS.slice(0, 4)

  return (
    <section
      className="relative bg-greyon-cream py-10 md:py-20 overflow-hidden"
      aria-label="Latest News"
    >
      <div className="container-large">
        {/* ── Editorial Header Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-greyon-gold-deep" />
              <span className="text-xs uppercase tracking-[0.25em] text-greyon-gold-deep font-medium">
                EDITORIAL JOURNAL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight leading-[1.2]">
              Latest News & Perspectives
            </h2>
          </div>

          <Link
            to="/news"
            className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-wider text-greyon-ink hover:text-greyon-gold-deep font-medium pb-1 border-b border-greyon-stone/80 hover:border-greyon-gold-deep transition-colors shrink-0"
            aria-label="View all chronicles"
          >
            <span>View All Articles</span>
            <ChevronRight size={15} />
          </Link>
        </motion.div>

        {/* ── Editorial Journal Card Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {latestArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.165, 0.84, 0.44, 1],
              }}
            >
              <Link
                to={`/news/${article.slug}`}
                className="group flex flex-col justify-between h-full bg-white rounded-2xl overflow-hidden border border-greyon-stone/40 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Image Atop with Clear Aspect Ratio */}
                <div className="aspect-[16/10] overflow-hidden relative bg-greyon-sand">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {(article.category || article.tag) && (
                    <span className="absolute top-3 left-3 z-10 text-[10px] font-medium tracking-[0.2em] uppercase text-greyon-ink bg-white/90 backdrop-blur-md px-3 py-1 rounded-md border border-greyon-stone/30">
                      {article.category || article.tag}
                    </span>
                  )}
                </div>

                {/* Editorial Content Below Image */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Category Label in Champagne Gold & Date */}
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="uppercase tracking-[0.2em] text-greyon-gold-deep font-medium">
                        {article.category || 'PRESS'}
                      </span>
                      <span className="text-greyon-muted/80 font-mono text-[11px]">
                        {article.date}
                      </span>
                    </div>

                    {/* Title in Deep Ink */}
                    <h3 className="text-base font-light text-greyon-ink group-hover:text-greyon-primary transition-colors leading-snug line-clamp-2 mb-3">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-greyon-muted font-light leading-relaxed line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Hairline Separator & Action */}
                  <div className="pt-3 border-t border-greyon-stone/30 flex items-center justify-between text-xs uppercase tracking-wider text-greyon-ink/80 group-hover:text-greyon-gold-deep transition-colors">
                    <span>Read Chronicle</span>
                    <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="flex sm:hidden justify-center mt-10">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-greyon-ink hover:text-greyon-gold-deep transition-colors pb-1 border-b border-greyon-stone"
          >
            <span>View All Articles</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
