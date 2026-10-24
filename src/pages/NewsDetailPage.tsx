import { useParams, Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  ArrowRight,
  Check,
} from 'lucide-react'
import { useState } from 'react'
import { NEWS_ITEMS } from '@/data/news'

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.165, 0.84, 0.44, 1] },
  },
}

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const article = NEWS_ITEMS.find((n) => n.slug === slug)
  const [copied, setCopied] = useState(false)

  if (!article) {
    return (
      <div className="min-h-[70vh] bg-[#0D1117] flex items-center justify-center pt-28 pb-20">
        <div className="container-large text-center max-w-lg">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8FA5B3] mb-3">
            Editorial
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-[#EAF3FB] mb-4">
            Article Not Found
          </h1>
          <p className="text-sm font-light text-[#D4DDE3]/80 leading-relaxed mb-8">
            The news article or press release you requested could not be located.
          </p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 btn-primary px-8 py-3.5 rounded-sm text-xs font-medium tracking-[0.2em] uppercase"
          >
            <ArrowLeft size={14} />
            <span>Return to Newsroom</span>
          </Link>
        </div>
      </div>
    )
  }

  const otherArticles = NEWS_ITEMS.filter((n) => n.slug !== article.slug).slice(0, 2)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <article className="min-h-screen bg-[#0D1117] pt-24 pb-28">
      {/* ── Breadcrumb / Back ── */}
      <div className="container-large py-6">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#8FA5B3] hover:text-[#EAF3FB] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to News &amp; Editorial</span>
        </Link>
      </div>

      {/* ── Article Header ── */}
      <header className="container-large max-w-4xl pt-6 pb-12">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8FA5B3] mb-6">
            <span className="bg-[#1E2633] text-[#D4DDE3] px-3 py-1 rounded-sm uppercase tracking-wider font-sans font-medium">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {article.date}
            </span>
            {article.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {article.readTime}
              </span>
            )}
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User size={13} />
                {article.author}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#EAF3FB] leading-[1.15] tracking-tight mb-8">
            {article.title}
          </h1>

          <p className="text-lg md:text-xl font-light text-[#D4DDE3]/85 leading-relaxed border-l-2 border-[#405664] pl-6 italic font-serif">
            {article.excerpt}
          </p>
        </motion.div>
      </header>

      {/* ── Large Hero Cover Photo ── */}
      <div className="container-large max-w-5xl mb-16">
        <div className="relative h-[360px] sm:h-[480px] md:h-[580px] w-full overflow-hidden rounded-sm border border-[#1E2633]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
      </div>

      {/* ── Reader Content Body ── */}
      <div className="container-large max-w-3xl">
        <div className="space-y-8 text-lg md:text-xl font-light text-[#D4DDE3] leading-[1.8] font-sans">
          {article.content?.map((paragraph, idx) => (
            <p key={idx} className="text-pretty">
              {paragraph}
            </p>
          ))}

          {/* Pull Quote Block */}
          {article.quote && (
            <blockquote className="my-12 p-8 md:p-10 rounded-sm bg-[#161C26]/70 border-l-4 border-[#D4DDE3] border border-[#1E2633]">
              <p className="font-serif italic text-xl md:text-2xl text-[#EAF3FB] leading-relaxed mb-4">
                “{article.quote}”
              </p>
              <cite className="block text-xs font-mono uppercase tracking-widest text-[#8FA5B3] not-italic">
                — {article.author || 'The Creators HQ Directorate'}
              </cite>
            </blockquote>
          )}

          <p className="text-pretty">
            As Bangkok’s architectural demands evolve toward higher standards of sustainable
            engineering, private green spaces, and longevity, The Creators HQ remains steadfast in
            delivering projects that exceed ordinary expectations and redefine what it means to live in luxury.
          </p>
        </div>

        {/* ── Share Bar ── */}
        <div className="mt-16 pt-8 border-t border-[#1E2633] flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-[#8FA5B3] uppercase tracking-widest">
            <Bookmark size={15} />
            <span>Official Press Release</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 btn-secondary px-4 py-2 rounded-sm text-xs font-medium tracking-wider uppercase cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 size={14} />
                <span>Share Article</span>
              </>
            )}
          </button>
        </div>

        {/* ── More from the Newsroom ── */}
        <div className="mt-24 pt-16 border-t border-[#1E2633]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-light text-[#EAF3FB]">
              More from Our Newsroom
            </h2>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#D4DDE3] hover:text-white"
            >
              <span>All News</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {otherArticles.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="group block p-6 rounded-sm bg-[#161C26]/60 border border-[#1E2633] hover:border-[#2A3649] transition-all"
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8FA5B3] block mb-2">
                  {item.category} • {item.date}
                </span>
                <h3 className="text-lg font-normal text-[#EAF3FB] group-hover:text-white leading-snug mb-3">
                  {item.title}
                </h3>
                <p className="text-xs font-light text-[#8FA5B3] line-clamp-2">
                  {item.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
