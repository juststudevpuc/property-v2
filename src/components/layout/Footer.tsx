import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

/* ─── Navigation Data ─────────────────────────────────────── */
const COMPANY_LINKS = [
  { label: 'About us',  href: '/about' },
  { label: 'Services',  href: '/services' },
  { label: 'News',      href: '/news' },
]

const PROJECT_LINKS = [
  { label: 'CIRA Residences',    href: '/project/cira-residences' },
  { label: 'Corner Ratchathewi', href: '/project/corner-ratchathewi' },
  { label: 'Common TU',          href: '/project/common-tu' },
  { label: 'C Ekkamai',          href: '/project/c-ekkamai' },
  { label: 'Curva Ekkamai',      href: '/project/curva-ekkamai' },
]

const CONNECT_LINKS = [
  { label: 'Contact',   href: '/contact' },
  { label: 'Agent',     href: '/contact/agent' },
  { label: 'Affiliate', href: '/contact/affiliate' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

const SOCIAL_LINKS = [
  { icon: FaFacebook,  href: 'https://web.facebook.com/thecreatorshqth', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/thecreatorshqth', label: 'Instagram' },
  { icon: FaXTwitter,  href: 'https://twitter.com/thecreatorshq',        label: 'X (Twitter)' },
  { icon: FaYoutube,   href: 'https://www.youtube.com/channel/UCmU9h0ymxOn-eVvFaIT0zZA', label: 'YouTube' },
  { icon: FaLinkedin,  href: 'https://www.linkedin.com/company/thecreatorshq', label: 'LinkedIn' },
]

/* ─── Logo Component ─────────────────────────────────────── */
function CreatorsLogo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Home"
      className={cn('inline-flex flex-col tracking-wider select-none group', className)}
    >
      <span className="text-xl md:text-2xl font-semibold tracking-[0.2em] uppercase leading-none text-white group-hover:text-white/85 transition-colors">
        Schneitec
      </span>
      <span className="text-[10px] tracking-[0.42em] uppercase text-greyon-sand/75 mt-1 group-hover:text-white/85 transition-colors">
        Property
      </span>
    </Link>
  )
}

/* ─── Nav Column Helper ──────────────────────────────────── */
function NavColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.22em] text-white/90 font-medium mb-4 sm:mb-5">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => {
          const isExternal = link.href.startsWith('http')
          return (
            <li key={link.href}>
              {isExternal ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-greyon-sand hover:text-white transition-colors duration-200 block font-light leading-relaxed"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className="text-xs sm:text-sm text-greyon-sand hover:text-white transition-colors duration-200 block font-light leading-relaxed"
                >
                  {link.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ─── Redesigned Footer ──────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-greyon-dark text-greyon-sand">
      {/* ── Mesh Gradient Background Layer ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Glow 1: Top left aurora blob */}
        <div className="absolute -top-32 -left-24 w-[480px] sm:w-[620px] h-[480px] sm:h-[620px] rounded-full bg-greyon-primary opacity-65 blur-[120px]" />
        {/* Glow 2: Center-right glowing blue sphere */}
        <div className="absolute top-1/8 -right-28 w-[520px] sm:w-[680px] h-[520px] sm:h-[680px] rounded-full bg-greyon-gold-deep opacity-55 blur-[130px]" />
        {/* Glow 3: Bottom ambient glow */}
        <div className="absolute -bottom-28 left-1/3 w-[440px] sm:w-[560px] h-[440px] sm:h-[560px] rounded-full bg-greyon-primary opacity-45 blur-[120px]" />
      </div>

      {/* ── Top CTA Block ── */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container-large py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start justify-between">
            {/* Left side: Large, lightweight headline */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.15]">
                Schedule Your<br className="hidden sm:inline" /> Private Preview
              </h2>
            </div>

            {/* Right side: Header, address, and inquiry button */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <h3 className="text-xs uppercase tracking-[0.25em] text-white/70 font-medium mb-3">
                Make an appointment
              </h3>
              <p className="text-xs sm:text-sm text-greyon-sand leading-relaxed font-light mb-6 max-w-sm">
                Schneitec Property Co., Ltd.
                <br />
                65/218 26th Floor, Chamnan Phenjati Business Center,
                <br />
                Rama 9 Road, Huaykwang, Bangkok 10310
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white text-white text-xs sm:text-sm font-light tracking-wide bg-transparent hover:bg-white hover:text-greyon-dark transition-all duration-300 group"
              >
                <span>Submit an inquiry</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &gt;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation Grid (5 Columns) ── */}
      <div className="relative z-10">
        <div className="container-large py-14 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Column 1: Logo */}
            <div className="col-span-2 md:col-span-1">
              <CreatorsLogo />
            </div>

            {/* Column 2: Company */}
            <NavColumn title="Company" links={COMPANY_LINKS} />

            {/* Column 3: Projects */}
            <NavColumn title="Projects" links={PROJECT_LINKS} />

            {/* Column 4: Connect */}
            <NavColumn title="Connect" links={CONNECT_LINKS} />

            {/* Column 5: Legal */}
            <NavColumn title="Legal" links={LEGAL_LINKS} />
          </div>

          {/* ── Bottom Bar ── */}
          <div className="mt-14 md:mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-greyon-sand/60 font-light">
            {/* Copyright on far left */}
            <p className="text-center sm:text-left">
              © {year} Schneitec Property Co., Ltd. All Rights Reserved.
            </p>

            {/* Social media icons on far right */}
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-greyon-sand/70 hover:text-white transition-colors duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
