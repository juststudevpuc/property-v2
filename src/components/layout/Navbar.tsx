import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { X, Menu, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

/* ─── Navigation Data Structure ───────────────────────────── */
interface NavSubItem {
  title?: string
  label?: string
  href: string
  description: string
}

interface NavGroup {
  label: string
  href?: string
  items?: NavSubItem[]
}

const DROPDOWN_GROUPS: NavGroup[] = [
  {
    label: 'Company',
    items: [
      {
        title: 'About Us',
        label: 'About Us',
        href: '/about',
        description: 'Our philosophy & leadership',
      },
      {
        title: 'Careers',
        label: 'Careers',
        href: '/careers',
        description: 'Architectural & hospitality opportunities',
      },
      {
        title: 'Guest Feedback',
        label: 'Guest Feedback',
        href: '/feedback',
        description: 'Post-stay feedback & guestbook archive',
      },
    ],
  },
  {
    label: 'Hotels & Stays',
    items: [
      {
        title: 'Hotels & Resorts',
        label: 'Hotels & Resorts',
        href: '/hotels',
        description: 'Coastal, urban & forest sanctuaries',
      },
      {
        title: 'Reserve a Sanctuary',
        label: 'Reserve a Sanctuary',
        href: '/booking',
        description: 'Private stays & bespoke arrangements',
      },
      {
        title: 'Experience',
        label: 'Experience',
        href: '/experience',
        description: 'Holistic wellness, dining & rituals',
      },
      {
        title: 'Offers',
        label: 'Offers',
        href: '/offers',
        description: 'Seasonal stays & private privileges',
      },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  {
    label: 'News',
    items: [
      {
        title: 'News',
        label: 'News',
        href: '/news',
        description: 'News & Updates',
      },
      {
        title: 'Media',
        label: 'Media',
        href: '/media',
        description: 'Press Kits, Monographs & Archival Imagery',
      },
    ],
  },
]

function isGroupActive(items?: NavSubItem[], currentPath: string = ''): boolean {
  if (!items) return false
  const normalized = currentPath.replace(/\/$/, '')
  return items.some((item) => {
    const itemNorm = item.href.replace(/\/$/, '')
    if (normalized === itemNorm) return true
    if (itemNorm !== '' && normalized.startsWith(itemNorm + '/')) return true
    if (itemNorm === '/projects' && normalized.startsWith('/project/')) return true
    return false
  })
}

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

/* ─── Mobile Overlay Menu Variants ────────────────────────── */
const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: '0%', transition: { duration: 0.4, ease: [0.165, 0.84, 0.44, 1] } },
  exit: { opacity: 0, x: '100%', transition: { duration: 0.3, ease: 'easeIn' } },
}

const linkStagger: Variants = {
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}

const linkVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

/* ─── Navbar ─────────────────────────────────────────────── */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const location = useLocation()

  // Detect whether current route or page has a light/white background
  const isWhiteRoute =
    ['/news', '/projects', '/contact', '/offers', '/hotels', '/media', '/terms', '/booking', '/careers', '/feedback'].includes(
      location.pathname.replace(/\/$/, '')
    ) ||
    location.pathname.startsWith('/news/') ||
    location.pathname.startsWith('/hotels') ||
    location.pathname.startsWith('/projects/') ||
    location.pathname.startsWith('/project/') ||
    location.pathname.startsWith('/media') ||
    location.pathname.startsWith('/terms') ||
    location.pathname.startsWith('/booking') ||
    location.pathname.startsWith('/careers') ||
    location.pathname.startsWith('/feedback')

  const [hasWhiteBg, setHasWhiteBg] = useState(false)
  const [prevPath, setPrevPath] = useState(location.pathname)

  // Synchronize state when location changes without cascading renders in effect
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isWhiteRoute) return

    // Fallback: check if main or its first child contains bg-white
    const mainEl = document.querySelector('main')
    const firstChild = mainEl?.firstElementChild
    const isBgWhite =
      Boolean(firstChild?.classList.contains('bg-white') || mainEl?.classList.contains('bg-white'))
    setHasWhiteBg(isBgWhite)
  }, [location.pathname, isWhiteRoute])

  const isLight = isWhiteRoute || hasWhiteBg
  const isHomeActive = location.pathname === '/'

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
        // Scrolling down past top: hide navbar
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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out flex justify-center ${isScrolled ? 'pt-4' : 'pt-0'
          } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* ── Inner Nav Element (The Pill) ── */}
        <nav
          aria-label="Main navigation"
          className={`transition-all duration-500 ease-in-out flex items-center justify-between ${isScrolled
            ? isLight
              ? 'w-[95%] max-w-7xl px-6 md:px-8 py-3 bg-white/85 md:bg-white/90 backdrop-blur-md rounded-full border border-greyon-stone shadow-xl'
              : 'w-[95%] max-w-7xl px-6 md:px-8 py-3 bg-greyon-dark/60 md:bg-greyon-dark/80 backdrop-blur-md rounded-full border border-white/10 shadow-xl'
            : 'w-full max-w-none px-6 md:px-12 py-6 bg-transparent rounded-none border-transparent'
            }`}
        >
          {/* Logo */}
          <Link to="/" aria-label="Schneitec Property — Home" className="flex items-center">
            <CreatorsLogo
              className={cn(
                'transition-colors duration-300',
                isLight
                  ? 'text-greyon-ink hover:text-black'
                  : 'text-greyon-sand hover:text-white'
              )}
            />
          </Link>

          {/* Centered navigation menu (Desktop) */}
          <div className="hidden md:flex items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {/* 1. Home Direct Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'py-2 px-1 transition-colors cursor-pointer select-none',
                        isHomeActive
                          ? '!text-[#c4a35a]'
                          : isLight
                            ? 'text-greyon-ink hover:!text-[#c4a35a]'
                            : 'text-greyon-sand hover:!text-white'
                      )}
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* 2. Grouped Dropdowns & Direct Links */}
                {DROPDOWN_GROUPS.map((group) => {
                  // Direct Link (e.g., Projects, Services)
                  if (group.href) {
                    const normalizedPath = location.pathname.replace(/\/$/, '')
                    const itemNorm = group.href.replace(/\/$/, '')
                    const isDirectActive =
                      normalizedPath === itemNorm ||
                      (itemNorm !== '' && normalizedPath.startsWith(itemNorm + '/')) ||
                      (itemNorm === '/projects' && normalizedPath.startsWith('/project/'))

                    return (
                      <NavigationMenuItem key={group.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={group.href}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              'py-2 px-1 transition-colors cursor-pointer select-none',
                              isDirectActive
                                ? '!text-[#c4a35a]'
                                : isLight
                                  ? 'text-greyon-ink hover:!text-[#c4a35a]'
                                  : 'text-greyon-sand hover:!text-white'
                            )}
                          >
                            {group.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  }

                  // Dropdown Group (e.g., Hotels & Stays, About)
                  const isActive = isGroupActive(group.items, location.pathname)

                  // Content alignment per group
                  let dropdownClasses =
                    '!absolute top-full left-0 mt-2 w-[320px] rounded-none border border-stone-200/80 bg-[#faf8f6] p-5 shadow-none'
                  if (group.label.toLowerCase() === 'hotels & stays') {
                    dropdownClasses =
                      '!absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] rounded-none border border-stone-200/80 bg-[#faf8f6] p-5 shadow-none'
                  } else if (group.label.toLowerCase() === 'news') {
                    dropdownClasses =
                      '!absolute top-full right-0 mt-2 w-[320px] rounded-none border border-stone-200/80 bg-[#faf8f6] p-5 shadow-none'
                  }

                  return (
                    <NavigationMenuItem key={group.label} className="relative">
                      <NavigationMenuTrigger
                        className={cn(
                          'py-2 px-1 transition-colors cursor-pointer select-none',
                          isActive
                            ? '!text-[#c4a35a]'
                            : isLight
                              ? 'text-greyon-ink hover:!text-[#c4a35a] data-[state=open]:!text-[#c4a35a]'
                              : 'text-greyon-sand hover:!text-white data-[state=open]:!text-white'
                        )}
                      >
                        {group.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className={dropdownClasses}>
                        <ul className="w-full divide-y divide-stone-200/60 list-none m-0 p-0">
                          {group.items?.map((item) => {
                            const normalizedPath = location.pathname.replace(/\/$/, '')
                            const itemNorm = item.href.replace(/\/$/, '')
                            const isItemActive =
                              normalizedPath === itemNorm ||
                              (itemNorm !== '' && normalizedPath.startsWith(itemNorm + '/')) ||
                              (itemNorm === '/projects' && normalizedPath.startsWith('/project/'))

                            return (
                              <li key={item.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={item.href}
                                    className="group/navitem block py-3.5 first:pt-0 last:pb-0 text-left transition-colors"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span
                                        className={cn(
                                          'text-xs uppercase tracking-[0.18em] transition-colors font-medium',
                                          isItemActive
                                            ? 'text-[#c4a35a]'
                                            : 'text-greyon-ink group-hover/navitem:text-[#c4a35a]'
                                        )}
                                      >
                                        {item.title || item.label}
                                      </span>
                                      <span
                                        className={cn(
                                          'text-xs transition-all duration-200',
                                          isItemActive
                                            ? 'text-[#c4a35a] opacity-100 translate-x-0'
                                            : 'text-stone-400 group-hover/navitem:text-[#c4a35a] opacity-0 -translate-x-1 group-hover/navitem:opacity-100 group-hover/navitem:translate-x-0'
                                        )}
                                      >
                                        →
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-stone-500 font-light mt-1 leading-relaxed">
                                      {item.description}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            )
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side — English / Contact button group */}
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <div
              className={cn(
                'hidden md:flex items-center gap-1 text-sm font-light cursor-pointer transition-colors select-none',
                isLight
                  ? 'text-greyon-muted hover:text-greyon-ink'
                  : 'text-greyon-sand opacity-80 hover:opacity-100 hover:text-white'
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
                  ? 'border border-greyon-primary text-greyon-primary hover:bg-greyon-primary hover:text-white'
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
                  ? 'text-greyon-ink hover:text-black'
                  : 'text-greyon-sand hover:text-white'
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
            className="fixed inset-0 z-[1000] flex flex-col bg-greyon-dark text-greyon-sand"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header: Logo & Close */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/10 shrink-0">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-white"
              >
                <CreatorsLogo />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 text-greyon-sand hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Grouped links container (Scrollable) */}
            <motion.div
              className="flex-1 overflow-y-auto px-6 py-8 space-y-7"
              variants={linkStagger}
              initial="hidden"
              animate="visible"
            >
              {/* Home Direct Link */}
              <motion.div variants={linkVariant} className="pb-3 border-b border-white/10">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'text-xl uppercase tracking-[0.2em] font-light transition-colors',
                    isHomeActive ? 'text-[#c4a35a]' : 'text-white hover:text-[#c4a35a]'
                  )}
                >
                  Home
                </Link>
              </motion.div>

              {/* Grouped Dropdowns & Direct Links */}
              {DROPDOWN_GROUPS.map((group) => {
                // Direct Link (e.g., Projects, Services)
                if (group.href) {
                  const normalizedPath = location.pathname.replace(/\/$/, '')
                  const itemNorm = group.href.replace(/\/$/, '')
                  const isDirectActive =
                    normalizedPath === itemNorm ||
                    (itemNorm !== '' && normalizedPath.startsWith(itemNorm + '/')) ||
                    (itemNorm === '/projects' && normalizedPath.startsWith('/project/'))

                  return (
                    <motion.div key={group.label} variants={linkVariant} className="pb-3 border-b border-white/10">
                      <Link
                        to={group.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          'text-xl uppercase tracking-[0.2em] font-light transition-colors',
                          isDirectActive ? 'text-[#c4a35a]' : 'text-white hover:text-[#c4a35a]'
                        )}
                      >
                        {group.label}
                      </Link>
                    </motion.div>
                  )
                }

                // Dropdown Group (e.g., Hotels & Stays, About)
                const isGroupCurrentlyActive = isGroupActive(group.items, location.pathname)

                return (
                  <motion.div key={group.label} variants={linkVariant} className="space-y-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-[1px] bg-greyon-gold/60" />
                      <h3
                        className={cn(
                          'text-[10px] uppercase tracking-[0.25em] font-medium',
                          isGroupCurrentlyActive ? 'text-[#c4a35a]' : 'text-greyon-gold/80'
                        )}
                      >
                        {group.label}
                      </h3>
                    </div>

                    <div className="space-y-3 pl-4 border-l border-white/10">
                      {group.items?.map((item) => {
                        const normalizedPath = location.pathname.replace(/\/$/, '')
                        const itemNorm = item.href.replace(/\/$/, '')
                        const isItemActive =
                          normalizedPath === itemNorm ||
                          (itemNorm !== '' && normalizedPath.startsWith(itemNorm + '/')) ||
                          (itemNorm === '/projects' && normalizedPath.startsWith('/project/'))

                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="group/mob block py-1 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={cn(
                                  'text-sm tracking-[0.14em] uppercase font-light transition-colors',
                                  isItemActive
                                    ? 'text-[#c4a35a] font-normal'
                                    : 'text-stone-200 group-hover/mob:text-[#c4a35a]'
                                )}
                              >
                                {item.title || item.label}
                              </span>
                              <ArrowRight
                                size={13}
                                className={cn(
                                  'transition-transform duration-200',
                                  isItemActive
                                    ? 'text-[#c4a35a] translate-x-0 opacity-100'
                                    : 'text-stone-500 group-hover/mob:text-[#c4a35a] group-hover/mob:translate-x-1 opacity-60'
                                )}
                              />
                            </div>
                            <p className="text-[11px] text-stone-400 font-light mt-0.5 leading-relaxed">
                              {item.description}
                            </p>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )
              })}

              {/* Mobile Contact CTA */}
              <motion.div variants={linkVariant} className="pt-4 border-t border-white/10 space-y-4">
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 btn-secondary text-xs font-medium tracking-widest uppercase px-6 py-3 rounded-full"
                >
                  Contact Us
                  <ArrowRight size={14} />
                </Link>

                {/* Language selector */}
                <div className="flex justify-center items-center gap-4 text-xs tracking-widest uppercase text-greyon-muted pt-1">
                  <span className="font-medium text-greyon-sand cursor-pointer">EN</span>
                  <span className="opacity-30">|</span>
                  <span className="cursor-pointer hover:text-greyon-sand transition-colors">TH</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
