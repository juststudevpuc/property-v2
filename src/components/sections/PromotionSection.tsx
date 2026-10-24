import { motion, type Variants } from 'framer-motion'
import { PROMOTIONS } from '@/data/promotions'
import PromotionCard from '@/components/shared/PromotionCard'

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.165, 0.84, 0.44, 1] },
  },
}

export default function PromotionSection() {
  return (
    <section
      className="relative bg-[#0D1117] py-28 md:py-36 border-b border-[#1E2633] overflow-hidden"
      aria-label="Exclusive Privileges & Promotions"
    >
      <div className="container-large">
        {/* ── Section Header ── */}
        <motion.div
          className="max-w-2xl mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headerVariants}
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#8FA5B3] mb-3">
            Privileges &amp; Opportunities
          </p>
          <h2 className="heading-h2 text-[#EAF3FB] mb-5">
            Curated Inclusions for Discerning Homeowners
          </h2>
          <p className="text-base font-light text-[#D4DDE3]/80 leading-relaxed">
            Discover bespoke interior designer packages, exclusive private preview appointments,
            and tailored financing opportunities across our landmark residences.
          </p>
        </motion.div>

        {/* ── Alternating Cards List ── */}
        <div className="flex flex-col gap-12 md:gap-16">
          {PROMOTIONS.map((promo, idx) => (
            <PromotionCard
              key={promo.id}
              promotion={promo}
              reverse={idx % 2 === 1}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
