import HeroSection from '@/components/sections/HeroSection'
import ProjectsSlider from '@/components/sections/ProjectsSlider'
import AboutSection from '@/components/sections/AboutSection'
import VideoShowcaseSection from '@/components/sections/VideoShowcaseSection'
import PromotionSection from '@/components/sections/PromotionSection'
import LatestNewsSection from '@/components/sections/LatestNewsSection'

/**
 * HomePage — composes all primary homepage sections.
 *
 * Current composition:
 *  ✅ HeroSection — full-viewport parallax entrance
 *  ✅ ProjectsSlider — touch-friendly luxury project cards
 *  ✅ AboutSection — typography-focused philosophy & milestones
 *  ✅ VideoShowcaseSection — deep navy architectural film modal
 *  ✅ PromotionSection — split-screen slider showcase
 *  ✅ LatestNewsSection — 4-column latest news grid
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VideoShowcaseSection />
      <ProjectsSlider />
      <AboutSection />
      <PromotionSection />
      <VideoShowcaseSection
        src="/staying.mp4"
        fallbackSrc="/statying.mp4"
        ariaLabel="Staying Showcase"
      />
      <LatestNewsSection />
    </>
  )
}
