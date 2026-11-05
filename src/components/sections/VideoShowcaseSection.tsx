import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface VideoShowcaseSectionProps {
  src?: string
  fallbackSrc?: string
  ariaLabel?: string
  className?: string
}

export default function VideoShowcaseSection({
  src = '/Blueprint.mp4',
  fallbackSrc,
  ariaLabel = 'Architectural Atmosphere Film',
  className,
}: VideoShowcaseSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.play().catch(() => {
      // Browser autoplay policy fallback
    })
  }, [src])

  return (
    <section
      className={cn('relative w-full bg-greyon-cream py-16 sm:py-20 md:py-24 ', className)}
      aria-label={ariaLabel}
    >
      <div className="container-site">
        {/* Editorial Film Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="w-8 h-[1px] bg-greyon-gold-deep" />
            <span className="text-xs uppercase tracking-[0.25em] text-greyon-gold-deep font-medium">
              CINEMATIC ESSAY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-greyon-ink tracking-tight">
            {ariaLabel}
          </h2>
        </div>

        {/* Framed Architectural Video Player */}
        <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden border border-greyon-stone/50 bg-greyon-dark shadow-xl">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover block"
          >
            <source src={src} type="video/mp4" />
            {fallbackSrc && <source src={fallbackSrc} type="video/mp4" />}
            {src === '/staying.mp4' && <source src="/statying.mp4" type="video/mp4" />}
            {src === '/Blueprint.mp4' && <source src="/Blueprint-blueprint.mp4" type="video/mp4" />}
            Your browser does not support HTML5 video playback.
          </video>

          {/* Subtle Ambient Contrast Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-greyon-dark/60 via-transparent to-transparent pointer-events-none" />

          {/* Clean Play Indicator Badge in corner */}
          <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-10 flex items-center gap-3 backdrop-blur-md bg-greyon-dark/50 px-4 py-2 rounded-lg border border-white/15 text-white/90 text-xs tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-greyon-gold animate-pulse" />
            <span>4K CINEMATIC ATMOSPHERE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
