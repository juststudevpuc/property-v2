import HeroSection from '@/components/sections/HeroSection'
import ProjectsSlider from '@/components/sections/ProjectsSlider'
import AboutSection from '@/components/sections/AboutSection'
import PromotionSection from '@/components/sections/PromotionSection'

/**
 * HomePage — composes all primary homepage sections.
 *
 * Current composition:
 *  ✅ HeroSection — full-viewport parallax entrance
 *  ✅ ProjectsSlider — touch-friendly luxury project cards
 *  ✅ AboutSection — typography-focused philosophy & milestones
 *  ✅ PromotionSection — alternating media/text exclusive privileges
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSlider />
      <AboutSection />
      <PromotionSection />
    </>
  )
}
