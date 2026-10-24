import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const isAvailable = project.status === 'available'

  return (
    <motion.article
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-sm bg-[#161C26] border border-[#1E2633] transition-all duration-500 hover:border-[#405664]',
        'w-full min-w-0 h-[520px] md:h-[560px] select-none',
        className
      )}
    >
      {/* ── Background image with zoom effect ── */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Layered dark gradients for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/60 to-transparent opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/50 via-transparent to-transparent opacity-80" />
      </div>

      {/* ── Card Top: Status & Price ── */}
      <div className="relative z-10 p-6 flex items-start justify-between gap-3">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[#0D1117]/80 backdrop-blur-md border border-[#2A3649] text-xs font-medium tracking-wider uppercase">
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-[#8FA5B3]'
            )}
          />
          <span className={isAvailable ? 'text-[#D4DDE3]' : 'text-[#8FA5B3]'}>
            {isAvailable ? 'Available' : 'Sold Out'}
          </span>
        </div>

        {/* Price tag */}
        <span className="text-xs font-semibold tracking-widest uppercase text-[#EAF3FB] bg-[#0D1117]/70 backdrop-blur-md px-3 py-1 rounded-sm border border-[#2A3649]">
          {project.priceLabel}
        </span>
      </div>

      {/* ── Card Bottom: Details & CTA ── */}
      <div className="relative z-10 p-6 flex flex-col justify-end">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-[#8FA5B3] mb-2 tracking-wide">
          <MapPin size={13} className="text-[#aebfcb] shrink-0" />
          <span>{project.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-light text-[#EAF3FB] tracking-tight mb-2 group-hover:text-white transition-colors">
          {project.name}
        </h3>

        {/* Tagline / Subtitle */}
        <p className="text-sm font-light text-[#D4DDE3]/80 line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] tracking-wider uppercase px-2.5 py-0.5 rounded-sm bg-[#1E2633]/70 text-[#8FA5B3] border border-[#2A3649]/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Link */}
        <Link
          to={project.projectUrl}
          className="inline-flex items-center justify-between w-full pt-4 border-t border-[#1E2633] text-xs font-medium tracking-[0.2em] uppercase text-[#D4DDE3] group-hover:text-[#EAF3FB] group-hover:border-[#405664] transition-all"
        >
          <span>Explore Residence</span>
          <div className="h-8 w-8 rounded-full border border-[#2A3649] flex items-center justify-center group-hover:border-[#D4DDE3] group-hover:bg-[#D4DDE3] group-hover:text-[#0D1117] transition-all">
            <ArrowUpRight size={14} />
          </div>
        </Link>
      </div>
    </motion.article>
  )
}
