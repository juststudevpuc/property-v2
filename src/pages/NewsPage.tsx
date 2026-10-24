import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Calendar, Clock, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { NEWS_ITEMS } from '@/data/news'

type CategoryFilter = 'All' | 'Awards' | 'Construction' | 'Press' | 'Architecture' | 'Lifestyle'

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] },
  },
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'All') return NEWS_ITEMS
    return NEWS_ITEMS.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  const featured = NEWS_ITEMS[0]

  return (
    <div className="min-h-screen bg-[#0D1117] pt-28 md:pt-36 pb-24">
      {/* ── Page Header ── */}
      <section className="container-large mb-16 md:mb-20">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#8FA5B3]" />
            <span className="text-xs font-medium tracking-[0.35em] uppercase text-[#8FA5B3]">
              News &amp; Editorial
            </span>
          </div>

          <h1 className="heading-h1 text-[#EAF3FB] mb-6">
            Press Releases, Awards &amp;<br />
            Architectural Updates
          </h1>

          <p className="text-base sm:text-lg font-light text-[#D4DDE3]/80 leading-relaxed max-w-2xl">
            Explore company milestones, construction progress reports, awards, and thought
            leadership on luxury space design across Thailand.
          </p>
        </motion.div>

        {/* ── Category Filter Tabs ── */}
        <div className="mt-12 pt-8 border-t border-[#1E2633] flex items-center gap-2 overflow-x-auto pb-2">
          {(
            ['All', 'Awards', 'Construction', 'Press', 'Architecture', 'Lifestyle'] as const
          ).map((cat) => {
            const active = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-sm text-xs font-medium tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#D4DDE3] text-[#0D1117]'
                    : 'bg-[#161C26] text-[#8FA5B3] hover:text-[#D4DDE3] border border-[#1E2633]'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Featured Story (Shown when 'All' is active) ── */}
      {selectedCategory === 'All' && (
        <section className="container-large mb-16">
          <Link
            to={`/news/${featured.slug}`}
            className="group block relative overflow-hidden rounded-sm bg-[#161C26] border border-[#1E2633] hover:border-[#405664] transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              <div className="lg:col-span-7 h-[360px] sm:h-[440px] overflow-hidden relative">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161C26] via-transparent to-transparent lg:hidden" />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#0D1117] bg-[#D4DDE3] px-2.5 py-0.5 rounded-sm">
                    {featured.category}
                  </span>
                  <span className="text-xs text-[#8FA5B3] flex items-center gap-1.5 font-mono">
                    <Calendar size={13} />
                    {featured.date}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-light text-[#EAF3FB] group-hover:text-white transition-colors leading-snug mb-4">
                  {featured.title}
                </h2>

                <p className="text-sm font-light text-[#D4DDE3]/80 leading-relaxed mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-[#D4DDE3] group-hover:text-white pt-2 border-t border-[#1E2633]">
                  <span>Read Full Article</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── Articles Responsive Grid Layout ── */}
      <section className="container-large">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col justify-between overflow-hidden rounded-sm bg-[#161C26]/70 border border-[#1E2633] hover:border-[#2A3649] transition-all"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161C26] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-4 left-4">
                      <span className="text-[11px] font-medium tracking-wider uppercase bg-[#0D1117]/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-[#2A3649] text-[#D4DDE3]">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-[#8FA5B3] mb-3 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {item.date}
                      </span>
                      {item.readTime && (
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} />
                          {item.readTime}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-normal text-[#EAF3FB] leading-snug mb-3 group-hover:text-white transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-light text-[#D4DDE3]/80 leading-relaxed line-clamp-3 mb-6">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/news/${item.slug}`}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-[#1E2633] text-xs font-medium tracking-[0.2em] uppercase text-[#D4DDE3] group-hover:text-white transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  )
}
