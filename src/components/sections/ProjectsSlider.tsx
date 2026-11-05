import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '@/data/projects'

interface ProjectsSliderProps {
  /**
   * Easily customize or preserve height settings if passed dynamically.
   */
  heightClassName?: string
}

// Curated architectural locations for the monograph index
const DEFAULT_LOCATIONS: Record<string, string> = {
  'cira-residences': 'Bangkok · Thong Lor',
  'corner-ratchathewi': 'Bangkok · Ratchathewi',
  'curva-ekkamai': 'Bangkok · Ekkamai',
  'common-tu': 'Pathum Thani · Rangsit',
  'c-ekkamai': 'Bangkok · Sukhumvit 63',
}

export default function ProjectsSlider({
  // Preserve prop compatibility
  heightClassName: _heightClassName,
}: ProjectsSliderProps) {
  // Base set of projects for the exhibition reel
  const baseProjects = PROJECTS.slice(0, 4)
  // Duplicate to create an uninterrupted infinite marquee
  const reelProjects = [...baseProjects, ...baseProjects]

  return (
    <section
      className="relative w-full bg-greyon-cream py-24 sm:py-28 md:py-32 overflow-hidden "
      aria-label="Architectural Living"
    >
      {/* ── CSS Animation Styles for Infinite Reel with Instant Pause on Hover ── */}
      <style>{`
        @keyframes infiniteMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: infiniteMarquee 30s linear infinite;
          will-change: transform;
        }
        .marquee-container:hover .marquee-track,
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Minimalist Editorial Header with View More Projects Button ── */}
      <div className="container-site mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 ">
          <div>
            <span className="font-display font-sans text-xs tracking-[0.25em] uppercase text-greyon-gold-deep font-medium mb-3 block">
              02 — SELECTED WORKS
            </span>
            <h2 className="font-display font-sans text-3xl sm:text-4xl lg:text-5xl font-light text-greyon-ink tracking-tight">
              Architectural Living
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2.5 px-6 py-3 border border-greyon-stone text-greyon-ink hover:border-greyon-primary hover:text-greyon-primary text-xs uppercase tracking-widest font-medium transition-all shrink-0 bg-white/60 hover:bg-white"
          >
            <span>View More Projects</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── Infinite Continuous Marquee Reel with Pause on Hover ── */}
      <div className="relative w-full overflow-hidden marquee-container">
        <div className="marquee-track flex gap-6 sm:gap-8 md:gap-10">
          {reelProjects.map((project, idx) => {
            const projectIndex = (idx % baseProjects.length) + 1
            const slideNumber = String(projectIndex).padStart(2, '0')
            const location = project.location || DEFAULT_LOCATIONS[project.id] || 'Bangkok'
            const specInfo = project.specs?.unitTypes
              ? `${project.specs.unitTypes}${project.specs.usableArea ? ` · ${project.specs.usableArea}` : ''}`
              : project.tagline
            const targetUrl = project.projectUrl || `/project/${project.slug || project.id}`

            return (
              <Link
                key={`${project.id}-${idx}`}
                to={targetUrl}
                className="group block shrink-0 w-[80vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] max-w-[420px] select-none rounded-none"
              >
                {/* Sharp Architectural Portrait Image (aspect-[3/4], crisp sharp edges) */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-greyon-sand rounded-none">
                  <img
                    src={project.coverImage}
                    alt={project.name}
                    className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out rounded-none"
                    loading="lazy"
                  />

                  {/* Corner Badge: View Detail */}
                  <span className="absolute top-4 right-4 bg-greyon-dark/75 backdrop-blur-md text-white text-[10px] tracking-widest uppercase px-3 py-1 font-mono border border-white/20 pointer-events-none">
                    View Detail
                  </span>

                  {/* Discrete "View Detail ↗" hover badge */}
                  <div className="absolute inset-0 bg-greyon-dark/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5 pointer-events-none">
                    <div className="bg-white/95 text-greyon-ink px-4 py-2 text-xs font-medium tracking-wider uppercase border border-white/50 shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 rounded-none">
                      <span>View Detail</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Meta Block with Sharp Geometry & View Detail Action */}
                <div className="pt-5 rounded-none">
                  {/* Top line: Project number + Location */}
                  <span className="font-display font-sans text-xs tracking-[0.25em] uppercase text-greyon-gold-deep font-medium block">
                    {slideNumber} — {location}
                  </span>

                  {/* Main line: Residence Title */}
                  <h3 className="font-display font-sans text-2xl font-light text-greyon-ink tracking-tight mt-1.5 group-hover:text-greyon-primary transition-colors">
                    {project.name}
                  </h3>

                  {/* Bottom line: Specs + Explicit View Detail Trigger */}
                  <div className="border-t border-greyon-stone/40 pt-3 mt-4 text-xs text-greyon-muted flex items-center justify-between font-light">
                    <span className="line-clamp-1">{specInfo}</span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-greyon-primary text-white text-[11px] uppercase tracking-wider font-medium group-hover:bg-greyon-primary-hover transition-colors shrink-0 ml-3">
                      <span>View Detail</span>
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Bottom Section Banner CTA: View More Projects ── */}
      {/* <div className="container-site mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-greyon-stone/40">
        <p className="text-xs sm:text-sm text-greyon-muted font-light tracking-wide text-center sm:text-left">
          Discover our full archive of super luxury detached villas, condominiums, and sky sanctuaries.
        </p>

        <Link
          to="/projects"
          className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-greyon-primary hover:bg-greyon-primary-hover text-white text-xs sm:text-sm uppercase tracking-wider font-medium transition-all shadow-sm shrink-0"
        >
          <span>View More Projects</span>
          <ArrowRight size={15} />
        </Link>
      </div> */}
    </section>
  )
}
