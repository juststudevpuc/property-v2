import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { ArrowRight } from 'lucide-react'

/* ─── Footer data ────────────────────────────────────────── */
const COMPANY_LINKS = [
  { label: 'About Us',  href: '/about' },
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
  { label: 'Contact', href: '/contact' },
  { label: 'Agent',   href: '/contact/agent' },
  { label: 'Affiliate', href: '/contact/affiliate' },
]

const SOCIAL_LINKS = [
  { icon: FaFacebook,  href: 'https://web.facebook.com/thecreatorshqth', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/thecreatorshqth', label: 'Instagram' },
  { icon: FaXTwitter,  href: 'https://twitter.com/thecreatorshq',        label: 'X (Twitter)' },
  { icon: FaYoutube,   href: 'https://www.youtube.com/channel/UCmU9h0ymxOn-eVvFaIT0zZA', label: 'YouTube' },
  { icon: FaLinkedin,  href: 'https://www.linkedin.com/company/thecreatorshq', label: 'LinkedIn' },
]

/* ─── Sub-components ─────────────────────────────────────── */
function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#D4DDE3] tracking-wider uppercase mb-4">
        {title}
      </p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith('http')
  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-[#8FA5B3] hover:text-[#D4DDE3] transition-colors duration-300"
    >
      {label}
    </a>
  ) : (
    <Link
      to={href}
      className="text-sm text-[#8FA5B3] hover:text-[#D4DDE3] transition-colors duration-300"
    >
      {label}
    </Link>
  )
}

/* ─── Footer ─────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0D1117] border-t border-[#1E2633]">

      {/* ── CTA Band ── */}
      <div className="bg-[#161C26]">
        <div className="container-large py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="heading-h2 text-[#D4DDE3] mb-4">
                Schedule Your<br className="hidden md:block" /> Private Preview
              </h2>
              <p className="text-sm text-[#8FA5B3] max-w-sm leading-relaxed">
                The Creators HQ Co, Ltd.<br />
                65/218 26th Floor, Chamnan Phenjati Business Center,<br />
                Rama 9 Road, Huaykwang, Bangkok 10310
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 btn-glass px-8 py-4 rounded-sm text-sm font-medium tracking-widest uppercase shrink-0"
            >
              Submit an Inquiry
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="container-large py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <FooterColumn title="Company">
            {COMPANY_LINKS.map(l => <FooterLink key={l.href} {...l} />)}
          </FooterColumn>
          <FooterColumn title="Projects">
            {PROJECT_LINKS.map(l => <FooterLink key={l.href} {...l} />)}
          </FooterColumn>
          <FooterColumn title="Connect">
            {CONNECT_LINKS.map(l => <FooterLink key={l.href} {...l} />)}
          </FooterColumn>
          <FooterColumn title="Legal">
            <FooterLink href="/privacy-policy" label="Privacy Policy" />
          </FooterColumn>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#1E2633]">
          <p className="text-xs text-[#405664] text-center md:text-left">
            © {year}{' '}
            <Link to="/" className="hover:text-[#8FA5B3] transition-colors">
              The Creators HQ
            </Link>{' '}
            Co., Ltd. All Rights Reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#405664] hover:text-[#D4DDE3] transition-colors duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
