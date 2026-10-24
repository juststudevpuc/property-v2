import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { PROJECTS } from '@/data/projects'
import ProjectCard from '@/components/shared/ProjectCard'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.165, 0.84, 0.44, 1] },
  },
}

export default function ProjectsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  // Update button states on scroll
  const handleScroll = () => {
    if (!sliderRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    // Calculate approximate active card index
    const cardWidth = 380
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(Math.min(Math.max(index, 0), PROJECTS.length - 1))
  }

  useEffect(() => {
    handleScroll()
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return
    const cardWidth = sliderRef.current.clientWidth > 768 ? 440 : 320
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <motion.section
      className="relative bg-[#0D1117] py-24 md:py-32 border-b border-[#1E2633] overflow-hidden"
      aria-label="Projects Portfolio Slider"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={sectionVariants}
    >
      <div className="container-site mb-12">
        {/* ── Top Header Bar ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#8FA5B3] mb-3">
              Prime Developments
            </p>
            <h2 className="heading-h2 text-[#EAF3FB]">
              Signature Spaces &amp;<br className="hidden sm:block" /> Iconic Landmarks
            </h2>
          </div>

          <div className="flex items-center gap-6 self-start md:self-end">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-[#D4DDE3] hover:text-white transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight size={14} />
            </Link>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll projects left"
                className="h-11 w-11 rounded-full border border-[#2A3649] flex items-center justify-center text-[#D4DDE3] transition-all hover:border-[#D4DDE3] hover:bg-[#161C26] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll projects right"
                className="h-11 w-11 rounded-full border border-[#2A3649] flex items-center justify-center text-[#D4DDE3] transition-all hover:border-[#D4DDE3] hover:bg-[#161C26] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Touch-Friendly Slider Track ── */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 md:px-12 py-4 no-scrollbar cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {PROJECTS.map((project) => (
          <div key={project.id} className="snap-start shrink-0 w-[300px] sm:w-[360px] md:w-[420px]">
            <ProjectCard project={project} />
          </div>
        ))}
        {/* Trailing spacing block for comfortable over-scroll */}
        <div className="w-6 shrink-0" aria-hidden="true" />
      </div>

      {/* ── Bottom Progress Bar & Counter ── */}
      <div className="container-site mt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#D4DDE3] tracking-widest">
            0{activeIndex + 1}
          </span>
          <div className="w-24 md:w-36 h-[2px] bg-[#1E2633] overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-[#D4DDE3]"
              animate={{
                width: `${((activeIndex + 1) / PROJECTS.length) * 100}%`,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <span className="text-xs font-mono text-[#8FA5B3] tracking-widest">
            0{PROJECTS.length}
          </span>
        </div>

        <p className="hidden md:block text-xs text-[#8FA5B3]/70 tracking-widest uppercase">
          Drag or swipe to explore
        </p>
      </div>
    </motion.section>
  )
}
