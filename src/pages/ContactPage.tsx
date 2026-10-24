import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { PROJECTS } from '@/data/projects'

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] },
  },
}

const SOCIAL_LINKS = [
  { icon: FaFacebook, href: 'https://web.facebook.com/thecreatorshqth', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/thecreatorshqth', label: 'Instagram' },
  { icon: FaXTwitter, href: 'https://twitter.com/thecreatorshq', label: 'X (Twitter)' },
  { icon: FaYoutube, href: 'https://www.youtube.com/channel/UCmU9h0ymxOn-eVvFaIT0zZA', label: 'YouTube' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/company/thecreatorshq', label: 'LinkedIn' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: 'General Inquiry',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate mock submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        project: 'General Inquiry',
        message: '',
      })
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[#0D1117] pt-28 md:pt-36 pb-24">
      {/* ── Page Header ── */}
      <section className="container-large mb-16 md:mb-20">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#8FA5B3]" />
            <span className="text-xs font-medium tracking-[0.35em] uppercase text-[#8FA5B3]">
              Private Inquiries &amp; Preview Appointments
            </span>
          </div>

          <h1 className="heading-h1 text-[#EAF3FB] mb-6">
            Connect With Our<br />
            Architectural Advisory
          </h1>

          <p className="text-base sm:text-lg font-light text-[#D4DDE3]/80 leading-relaxed max-w-2xl">
            Whether scheduling a private walkthrough of our completed show residences,
            requesting project dossiers, or exploring partnership opportunities, our dedicated team is at your disposal.
          </p>
        </motion.div>
      </section>

      {/* ── Main Two-Column Contact Section ── */}
      <section className="container-large">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── Left Column: Office & Contact Info ── */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Headquarters Card */}
            <div className="p-8 rounded-sm bg-[#161C26]/70 border border-[#1E2633]">
              <div className="h-10 w-10 rounded-sm bg-[#1E2633] flex items-center justify-center text-[#D4DDE3] mb-6">
                <MapPin size={20} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-normal text-[#EAF3FB] mb-3">
                Bangkok Headquarters
              </h2>
              <p className="text-sm font-light text-[#D4DDE3]/80 leading-relaxed mb-6">
                <strong className="text-[#EAF3FB] font-medium">The Creators HQ Co., Ltd.</strong><br />
                65/218 26th Floor, Chamnan Phenjati Business Center<br />
                Rama 9 Road, Huaykwang, Bangkok 10310
              </p>

              <div className="pt-6 border-t border-[#1E2633] flex flex-col gap-4 text-sm font-light text-[#D4DDE3]/80">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#8FA5B3] shrink-0" />
                  <a
                    href="tel:+6620266555"
                    className="hover:text-white transition-colors"
                  >
                    +66 (0) 2 026 6555
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#8FA5B3] shrink-0" />
                  <a
                    href="mailto:contact@thecreatorshq.com"
                    className="hover:text-white transition-colors"
                  >
                    contact@thecreatorshq.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-[#8FA5B3] shrink-0" />
                  <span>Monday – Saturday: 09:00 – 18:00 (ICT)</span>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="p-8 rounded-sm bg-[#161C26]/70 border border-[#1E2633]">
              <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4DDE3] mb-4">
                Follow Our Developments
              </h3>
              <p className="text-xs font-light text-[#8FA5B3] mb-6 leading-relaxed">
                Stay updated with behind-the-scenes architectural photography, construction milestones, and event invitations.
              </p>

              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="h-10 w-10 rounded-sm bg-[#1E2633] border border-[#2A3649] flex items-center justify-center text-[#8FA5B3] hover:text-white hover:bg-[#2A3649] transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: Modern Contact Form ── */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-sm bg-[#161C26]/90 border border-[#1E2633]">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-6">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-2xl font-light text-[#EAF3FB] mb-3">
                    Inquiry Received
                  </h3>
                  <p className="text-sm font-light text-[#D4DDE3]/80 max-w-md mx-auto leading-relaxed mb-8">
                    Thank you for reaching out. One of our private client advisors will contact
                    you within 24 hours with the requested information.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary px-8 py-3.5 rounded-sm text-xs font-medium tracking-widest uppercase cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl font-light text-[#EAF3FB] mb-1">
                      Private Preview Request
                    </h2>
                    <p className="text-xs text-[#8FA5B3] tracking-wider uppercase">
                      Please provide your details below
                    </p>
                  </div>

                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium tracking-wider uppercase text-[#D4DDE3] mb-2"
                    >
                      Full Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Robert Vance"
                      className="w-full px-4 py-3.5 rounded-sm bg-[#0D1117] border border-[#1E2633] text-sm text-[#EAF3FB] placeholder-[#405664] focus:outline-none focus:border-[#D4DDE3] transition-colors"
                    />
                  </div>

                  {/* Email & Phone fields in grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium tracking-wider uppercase text-[#D4DDE3] mb-2"
                      >
                        Email Address <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3.5 rounded-sm bg-[#0D1117] border border-[#1E2633] text-sm text-[#EAF3FB] placeholder-[#405664] focus:outline-none focus:border-[#D4DDE3] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-medium tracking-wider uppercase text-[#D4DDE3] mb-2"
                      >
                        Phone Number <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+66 81 234 5678"
                        className="w-full px-4 py-3.5 rounded-sm bg-[#0D1117] border border-[#1E2633] text-sm text-[#EAF3FB] placeholder-[#405664] focus:outline-none focus:border-[#D4DDE3] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project of Interest */}
                  <div>
                    <label
                      htmlFor="project"
                      className="block text-xs font-medium tracking-wider uppercase text-[#D4DDE3] mb-2"
                    >
                      Project of Interest
                    </label>
                    <select
                      id="project"
                      value={formData.project}
                      onChange={(e) =>
                        setFormData({ ...formData, project: e.target.value })
                      }
                      className="w-full px-4 py-3.5 rounded-sm bg-[#0D1117] border border-[#1E2633] text-sm text-[#EAF3FB] focus:outline-none focus:border-[#D4DDE3] transition-colors cursor-pointer"
                    >
                      <option value="General Inquiry">General Company Inquiry</option>
                      {PROJECTS.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} ({p.location})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium tracking-wider uppercase text-[#D4DDE3] mb-2"
                    >
                      Message or Preferred Viewing Schedule <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please let us know your requirements or preferred appointment time..."
                      className="w-full px-4 py-3.5 rounded-sm bg-[#0D1117] border border-[#1E2633] text-sm text-[#EAF3FB] placeholder-[#405664] focus:outline-none focus:border-[#D4DDE3] transition-colors resize-none"
                    />
                  </div>

                  {/* Consent notice */}
                  <p className="text-[11px] text-[#8FA5B3] leading-relaxed">
                    By submitting this form, you agree to receive communications regarding your inquiry in accordance with our Privacy Policy. Your information remains strictly confidential.
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-3 btn-primary w-full py-4 rounded-sm text-xs font-medium tracking-[0.2em] uppercase transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Inquiry…</span>
                    ) : (
                      <>
                        <span>Submit Private Inquiry</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
