import { Link } from 'react-router-dom'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
  /**
   * Easily customize the height of the card.
   * Examples: 'h-[85vh]', 'h-[90vh]', 'h-[750px]', 'h-screen'
   */
  heightClassName?: string
}

export default function ProjectCard({
  project,
  className,
  // Matches the tall 120vh card height: h-[650px] sm:h-[750px] lg:h-[120vh]
  heightClassName = 'h-[650px] sm:h-[750px] lg:h-[120vh]',
}: ProjectCardProps) {
  return (
    <Link
      to={project.projectUrl}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden select-none w-full bg-[#0D1117]',
        heightClassName,
        className
      )}
    >
      {/* ── Background Image filling entire card ── */}
      <img
        src={project.coverImage}
        alt={project.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      {/* ── Dark Overlays (Dim on hover) ── */}
      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/60 transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/65 pointer-events-none" />

      {/* ── Center project title / details near the top ── */}
      <div className="relative z-10 pt-12 sm:pt-16 md:pt-20 px-6 text-center flex flex-col items-center">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4DDE3]/80 mb-2">
          {project.location}
        </span>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-wider text-[#EAF3FB] uppercase">
          {project.name}
        </h3>

        {project.priceLabel && (
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8FA5B3] mt-2 opacity-80">
            {project.priceLabel}
          </span>
        )}
      </div>

      {/* ── Reveal 'Explore >' Pill Button near the bottom on hover ── */}
      <div className="relative z-10 pb-12 sm:pb-16 md:pb-20 px-6 flex justify-center w-full">
        <div className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black border border-white/40 backdrop-blur-md text-xs sm:text-sm font-medium tracking-[0.25em] uppercase transition-all duration-500 transform translate-y-2 opacity-90 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 shadow-2xl hover:scale-105 active:scale-95">
          <span>Explore</span>
          <span className="text-sm font-semibold">&gt;</span>
        </div>
      </div>
    </Link>
  )
}
