import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { X, Menu, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useScrollPosition } from '@/hooks/useScrollPosition'

/* ─── Nav links data ─────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'News',     href: '/news' },
]

/* ─── Logo Component (Text placeholder for safe rendering) ─── */
function CreatorsLogo({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col tracking-wider select-none', className)}>
      <span className="text-lg md:text-xl font-semibold tracking-[0.2em] uppercase leading-none text-current">
        THE CREATORS
      </span>
      <span className="text-[10px] tracking-[0.4em] uppercase opacity-75 mt-0.5 text-current">
        HQ
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
  const scrollY    = useScrollPosition()
  const scrollDir  = useScrollDirection()

  const isScrolled  = scrollY > 60
  const isHidden    = scrollDir === 'down' && scrollY > 120 && !isMenuOpen

  return (
    <>
      {/* ── Fixed navbar wrapper ── */}
      <motion.nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-[999]"
        animate={{ y: isHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
      >
        <div
          className={cn(
            'transition-all duration-400 ease-in-out',
            isScrolled && 'nav-scrolled'
          )}
        >
          <div className="container-site">
            <div className="flex items-center justify-between h-16 md:h-20">

              {/* Logo */}
              <Link to="/" aria-label="The Creators HQ — Home">
                <CreatorsLogo
                  className={cn(
                    'transition-colors duration-400',
                    isScrolled ? 'text-[#D4DDE3]' : 'text-[#D4DDE3]'
                  )}
                />
              </Link>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map(({ label, href }) => (
                  <NavLink
                    key={href}
                    to={href}
                    end={href === '/'}
                    className={({ isActive }) =>
                      cn(
                        'text-sm font-light tracking-wide transition-colors duration-300',
                        isScrolled ? 'text-[#D4DDE3]' : 'text-[#D4DDE3]',
                        isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                      )
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>

              {/* Right side — language + CTA + burger */}
              <div className="flex items-center gap-4">

                {/* Language toggle */}
                <div className="hidden md:flex items-center gap-1 text-[#D4DDE3] text-sm font-light opacity-70 cursor-pointer hover:opacity-100 transition-opacity">
                  <span>EN</span>
                  <ChevronDown size={14} />
                </div>

                {/* Contact CTA */}
                <Link
                  to="/contact"
                  className="hidden md:inline-flex items-center gap-2 btn-secondary text-xs font-medium tracking-widest uppercase px-5 py-2.5 rounded-sm"
                >
                  Contact
                </Link>

                {/* Hamburger */}
                <button
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open menu"
                  className={cn(
                    'p-2 transition-colors duration-300',
                    isScrolled ? 'text-[#D4DDE3]' : 'text-[#D4DDE3]'
                  )}
                >
                  <Menu size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

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
                  className="inline-flex items-center gap-2 btn-secondary text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-sm"
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
