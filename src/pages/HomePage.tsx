import HeroSection from '@/components/sections/HeroSection'
import ProjectsSlider from '@/components/sections/ProjectsSlider'
import AboutSection from '@/components/sections/AboutSection'
import VideoShowcaseSection from '@/components/sections/VideoShowcaseSection'
import PromotionSection from '@/components/sections/PromotionSection'
import LatestNewsSection from '@/components/sections/LatestNewsSection'

/**
 * HomePage — composes all primary homepage sections tailored strictly
 * to the GREYON contemporary luxury minimalism design system.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-greyon-cream bg-white text-greyon-ink selection:bg-greyon-gold/20 selection:text-greyon-dark font-sans">
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
    </div>
  )
}
