import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import type { Promotion } from '@/types'
import { cn } from '@/lib/utils'

interface PromotionCardProps {
  promotion: Promotion
  reverse?: boolean
  index: number
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] },
  },
}

export default function PromotionCard({
  promotion,
  reverse = false,
  index,
}: PromotionCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(
        'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center p-6 sm:p-10 md:p-12 rounded-sm bg-[#161C26]/50 border border-[#1E2633] hover:border-[#2A3649] transition-all',
        reverse && 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
      )}
    >
      {/* ── Media Side ── */}
      <div className="lg:col-span-6 relative overflow-hidden rounded-sm group h-[320px] sm:h-[400px] w-full">
        <img
          src={promotion.image}
          alt={promotion.headline}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 via-transparent to-transparent pointer-events-none" />

        {/* Index indicator */}
        <span className="absolute bottom-4 left-4 font-mono text-xs text-[#EAF3FB] bg-[#0D1117]/80 backdrop-blur-md px-3 py-1 rounded-sm border border-[#2A3649]">
          0{index + 1}
        </span>
      </div>

      {/* ── Text Content Side ── */}
      <div className="lg:col-span-6 flex flex-col justify-center">
        {/* Project Tag */}
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] uppercase text-[#8FA5B3] mb-4">
          <Calendar size={13} className="text-[#aebfcb]" />
          <span>{promotion.projectName || promotion.projectTitle}</span>
        </div>

        {/* Headline */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#EAF3FB] leading-snug tracking-tight mb-5">
          {promotion.headline}
        </h3>

        {/* Body */}
        <p className="text-sm sm:text-base font-light text-[#D4DDE3]/80 leading-relaxed mb-8">
          {promotion.body || promotion.description1}
        </p>

        {/* CTA */}
        <div>
          <Link
            to={promotion.ctaUrl || promotion.buttonUrl || '/contact'}
            className="inline-flex items-center gap-3 btn-primary px-8 py-3.5 rounded-sm text-xs font-medium tracking-[0.2em] uppercase transition-all"
          >
            <span>{promotion.ctaLabel || promotion.buttonText}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
