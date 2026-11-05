import { Link } from 'react-router-dom'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

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
  heightClassName = 'h-[560px] sm:h-[640px] lg:h-[720px]',
}: ProjectCardProps) {
  return (
    <Link
      to={project.projectUrl}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden select-none w-full bg-greyon-dark border-b lg:border-b-0 lg:border-r border-greyon-stone/30 last:border-b-0 last:border-r-0',
        heightClassName,
        className
      )}
    >
      {/* ── Background Photographic Canvas (Aspect 4/5 vertical framing) ── */}
      <img
        src={project.coverImage}
        alt={project.name}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* ── Editorial Gradient Overlays ── */}
      <div className="absolute inset-0 bg-greyon-dark/35 group-hover:bg-greyon-dark/55 transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark/95 via-greyon-dark/30 to-greyon-dark/65 pointer-events-none" />

      {/* ── Top Architectural Meta & Title Block ── */}
      <div className="relative z-10 pt-10 sm:pt-14 md:pt-16 px-6 sm:px-8 text-center flex flex-col items-center">
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-greyon-gold mb-2 block">
          {project.location || 'BANGKOK · PRIVATE ESTATE'}
        </span>

        <h3 className="text-2xl sm:text-3xl font-light tracking-wide text-white">
          {project.name}
        </h3>

        <p className="text-xs text-greyon-sand/80 font-light tracking-wide mt-2 max-w-xs line-clamp-1">
          {project.tagline}
        </p>

        {project.priceLabel && (
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-greyon-gold-deep mt-3 bg-greyon-dark/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            {project.priceLabel}
          </span>
        )}
      </div>

      {/* ── Bottom Editorial Action Anchor ── */}
      <div className="relative z-10 pb-10 sm:pb-14 md:pb-16 px-6 sm:px-8 flex flex-col items-center w-full">
        <div className="inline-flex items-center gap-2.5 px-7 py-3 rounded-lg bg-white/10 group-hover:bg-greyon-primary text-white border border-white/25 group-hover:border-greyon-primary backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase transition-all duration-400 shadow-xl group-hover:shadow-2xl">
          <span>Explore Plate</span>
          <ArrowUpRight size={15} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
