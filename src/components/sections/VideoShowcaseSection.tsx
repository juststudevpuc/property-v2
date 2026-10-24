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
  ariaLabel = 'Video Showcase',
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
      className={cn('relative w-full bg-[#0D1117] overflow-hidden', className)}
      aria-label={ariaLabel}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto object-cover block"
      >
        <source src={src} type="video/mp4" />
        {fallbackSrc && <source src={fallbackSrc} type="video/mp4" />}
        {src === '/staying.mp4' && <source src="/statying.mp4" type="video/mp4" />}
        {src === '/Blueprint.mp4' && <source src="/Blueprint-blueprint.mp4" type="video/mp4" />}
        Your browser does not support HTML5 video playback.
      </video>
    </section>
  )
}
