import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { X, Menu, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Nav links data ─────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'News',     href: '/news' },
]

/* ─── Logo Component ─────────────────────────────────────── */
function CreatorsLogo({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col tracking-wider select-none', className)}>
      <span className="text-lg md:text-xl font-semibold tracking-[0.2em] uppercase leading-none text-current">
        Schneitec
      </span>
      <span className="text-[10px] tracking-[0.4em] uppercase opacity-75 mt-0.5 text-current">
        Property
      </span>
    </div>
  )
}

/* ─── Mobile Overlay Menu ────────────────────────────────── */
const mobileMenuVariants: Variants = {
  hidden:  { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: '0%', transition: { duration: 0.4, ease: [0.165, 0.84, 0.44, 1] } },
  exit:    { opacity: 0, x: '100%', transition: { duration: 0.3, ease: 'easeIn' } },
}

const linkStagger: Variants = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

const linkVariant: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

/* ─── Navbar ─────────────────────────────────────────────── */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const location = useLocation()

  // Detect whether current route or page has a light/white background
  const isWhiteRoute = ['/news', '/projects', '/contact'].includes(location.pathname.replace(/\/$/, '')) || location.pathname.startsWith('/news/')
  const [hasWhiteBg, setHasWhiteBg] = useState(isWhiteRoute)

  useEffect(() => {
    const isRouteMatch = ['/news', '/projects', '/contact'].includes(location.pathname.replace(/\/$/, '')) || location.pathname.startsWith('/news/')
    if (isRouteMatch) {
      setHasWhiteBg(true)
      return
    }

    // Fallback: check if main or its first child contains bg-white
    const mainEl = document.querySelector('main')
    const firstChild = mainEl?.firstElementChild
    if (firstChild?.classList.contains('bg-white') || mainEl?.classList.contains('bg-white')) {
      setHasWhiteBg(true)
    } else {
      setHasWhiteBg(false)
    }
  }, [location.pathname])

  const isLight = isWhiteRoute || hasWhiteBg

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Morphing into pill shape state (> 20px)
      if (currentScrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Smart navbar visibility based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down past the top section: hide navbar
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up: reveal navbar
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    // Initial check on mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ── Outer Wrapper (Smart hide / show on scroll) ── */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out flex justify-center ${
          isScrolled ? 'pt-4' : 'pt-0'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* ── Inner Nav Element (The Pill) ── */}
        <nav
          aria-label="Main navigation"
          className={`transition-all duration-500 ease-in-out flex items-center justify-between ${
            isScrolled
              ? isLight
                ? 'w-[95%] max-w-7xl px-6 md:px-8 py-3 bg-white/80 md:bg-white/85 backdrop-blur-md rounded-full border border-black/10 shadow-xl'
                : 'w-[95%] max-w-7xl px-6 md:px-8 py-3 bg-white/10 md:bg-[#050810]/60 backdrop-blur-md rounded-full border border-white/10 shadow-xl'
              : 'w-full max-w-none px-6 md:px-12 py-6 bg-transparent rounded-none border-transparent'
          }`}
        >
          {/* Logo */}
          <Link to="/" aria-label="Schneitec Property — Home" className="flex items-center">
            <CreatorsLogo
              className={cn(
                'transition-colors duration-300',
                isLight
                  ? 'text-[#050810] hover:text-black'
                  : 'text-[#D4DDE3] hover:text-white'
              )}
            />
          </Link>

          {/* Centered navigation links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink
                key={href}
                to={href}
                end={href === '/'}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-light tracking-wide transition-colors duration-300',
                    isLight
                      ? isActive
                        ? 'text-[#050810] font-normal opacity-100'
                        : 'text-[#050810]/70 hover:opacity-100 hover:text-[#050810]'
                      : isActive
                        ? 'text-white opacity-100 font-normal'
                        : 'text-[#D4DDE3] opacity-80 hover:opacity-100 hover:text-white'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right side — English / Contact button group */}
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <div
              className={cn(
                'hidden md:flex items-center gap-1 text-sm font-light cursor-pointer transition-colors',
                isLight
                  ? 'text-[#050810]/75 hover:text-[#050810]'
                  : 'text-[#D4DDE3] opacity-80 hover:opacity-100 hover:text-white'
              )}
            >
              <span>EN</span>
              <ChevronDown size={14} />
            </div>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className={cn(
                'hidden md:inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-md',
                isLight
                  ? 'border border-[#050810] text-[#050810] hover:bg-[#050810] hover:text-white'
                  : 'btn-secondary'
              )}
            >
              Contact
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className={cn(
                'p-2 transition-colors duration-300 md:hidden',
                isLight
                  ? 'text-[#050810] hover:text-black'
                  : 'text-[#D4DDE3] hover:text-white'
              )}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[1000] flex flex-col bg-[#0D1117]"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="text-[#D4DDE3] hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <motion.div
              className="flex flex-col justify-center flex-1 px-8 gap-2 pb-12"
              variants={linkStagger}
              initial="hidden"
              animate="visible"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <motion.div key={href} variants={linkVariant}>
                  <NavLink
                    to={href}
                    end={href === '/'}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block text-4xl font-light text-[#D4DDE3] py-3 border-b border-[#1E2633] transition-colors hover:text-white',
                        isActive && 'opacity-100',
                        !isActive && 'opacity-60'
                      )
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}

              {/* Mobile contact CTA */}
              <motion.div variants={linkVariant} className="pt-8">
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center gap-2 btn-secondary text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full"
                >
                  Contact Us
                  <ArrowRight size={14} />
                </Link>
              </motion.div>

              {/* Language */}
              <motion.div variants={linkVariant} className="pt-4 flex gap-4 text-[#8FA5B3] text-sm">
                <span className="cursor-pointer hover:text-[#D4DDE3] transition-colors font-medium text-[#D4DDE3]">EN</span>
                <span className="opacity-30">|</span>
                <span className="cursor-pointer hover:text-[#D4DDE3] transition-colors">TH</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
