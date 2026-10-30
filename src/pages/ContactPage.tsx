import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Train,
  ArrowUpRight,
  CheckCircle2,
  UploadCloud,
  RefreshCw,
  Building2,
} from 'lucide-react'

const TABS = ['GENERAL', 'LAND PROPOSAL', 'PRODUCT PROPOSAL', 'CAREERS'] as const
type TabType = (typeof TABS)[number]

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<TabType>('GENERAL')

  // Form states per tab
  const [generalForm, setGeneralForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })

  const [landForm, setLandForm] = useState({
    location: '',
    landSize: '',
    price: '',
    cadastral: '',
    contactName: '',
    phone: '',
    email: '',
  })

  const [productForm, setProductForm] = useState({
    companyName: '',
    mainProduct: '',
    phone: '',
    email: '',
    lineId: '',
    message: '',
  })

  const [careerForm, setCareerForm] = useState({
    name: '',
    phone: '',
    email: '',
    position: '',
    resumeLink: '',
    fileName: '',
  })

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedTabs, setSubmittedTabs] = useState<Record<string, boolean>>({})

  const handleGeneralSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedTabs((prev) => ({ ...prev, [activeTab]: true }))
    }, 600)
  }

  const handleLandSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedTabs((prev) => ({ ...prev, [activeTab]: true }))
    }, 600)
  }

  const handleProductSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedTabs((prev) => ({ ...prev, [activeTab]: true }))
    }, 600)
  }

  const handleCareerSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedTabs((prev) => ({ ...prev, [activeTab]: true }))
    }, 600)
  }

  const resetActiveTabSubmission = () => {
    setSubmittedTabs((prev) => ({ ...prev, [activeTab]: false }))
  }

  const handleResumeFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCareerForm((prev) => ({
        ...prev,
        fileName: e.target.files![0].name,
      }))
    }
  }

  const inputClass =
    'w-full bg-transparent border-b border-greyon-stone py-3 text-sm md:text-base focus:outline-none focus:border-greyon-primary transition-colors mb-6 placeholder-greyon-muted text-greyon-ink'

  return (
    <main className="min-h-screen bg-greyon-cream text-greyon-ink pt-32 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ── Top Section: Headline ── */}
        <h1 className="text-5xl md:text-[72px] lg:text-[80px] font-light leading-[1.05] tracking-tight mb-16">
          CONNECT WITH<br />
          OUR TEAM
        </h1>

        {/* ── Tabs Row ── */}
        <div className="flex flex-wrap gap-8 md:gap-12 border-b border-greyon-stone w-full mb-12">
          {TABS.map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-xs md:text-sm font-semibold tracking-widest uppercase pb-4 relative cursor-pointer transition-colors ${
                  isActive ? 'text-greyon-ink' : 'text-greyon-muted hover:text-greyon-ink'
                }`}
              >
                {tab}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-greyon-primary"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* ── Split Layout (Forms vs. Info) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* ── Left Column: Dynamic Forms (col-span-7) ── */}
          <div className="col-span-1 lg:col-span-7">
            <AnimatePresence mode="wait">
              {submittedTabs[activeTab] ? (
                <motion.div
                  key={`${activeTab}-success`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="py-12 px-8 rounded-2xl bg-white border border-greyon-stone flex flex-col items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-greyon-sand text-greyon-success flex items-center justify-center">
                    <CheckCircle2 size={26} />
                  </div>
                  <h3 className="text-2xl font-light text-greyon-ink">
                    THANK YOU!
                  </h3>
                  <p className="text-greyon-muted font-light text-sm md:text-base leading-relaxed max-w-lg">
                    {activeTab === 'GENERAL' &&
                      'For reaching out to The Creators HQ. We have received your inquiry regarding our real estate projects and services. Our representative will be in touch with you shortly.'}
                    {activeTab === 'LAND PROPOSAL' &&
                      'For your land proposal submission. Our development advisory team will carefully review the site parameters and contact you to explore potential collaboration.'}
                    {activeTab === 'PRODUCT PROPOSAL' &&
                      'For sharing your product proposal. We appreciate your submission and our procurement specialists will contact you if there is an architectural alignment.'}
                    {activeTab === 'CAREERS' &&
                      'For your interest in joining The Creators HQ. Your application has been received and our HR department will review your profile.'}
                  </p>
                  <button
                    type="button"
                    onClick={resetActiveTabSubmission}
                    className="mt-4 inline-flex items-center gap-2 bg-greyon-primary text-white px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider hover:bg-greyon-primary-hover transition-colors cursor-pointer"
                  >
                    <RefreshCw size={14} />
                    <span>Submit Another Inquiry</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* ── 1. GENERAL TAB FORM ── */}
                  {activeTab === 'GENERAL' && (
                    <form onSubmit={handleGeneralSubmit} className="flex flex-col">
                      <input
                        type="text"
                        required
                        placeholder="Full name *"
                        value={generalForm.name}
                        onChange={(e) =>
                          setGeneralForm({ ...generalForm, name: e.target.value })
                        }
                        className={inputClass}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
                        <input
                          type="tel"
                          required
                          placeholder="Mobile phone *"
                          value={generalForm.phone}
                          onChange={(e) =>
                            setGeneralForm({ ...generalForm, phone: e.target.value })
                          }
                          className={inputClass}
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email *"
                          value={generalForm.email}
                          onChange={(e) =>
                            setGeneralForm({ ...generalForm, email: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>

                      <input
                        type="text"
                        required
                        placeholder="Subject *"
                        value={generalForm.subject}
                        onChange={(e) =>
                          setGeneralForm({ ...generalForm, subject: e.target.value })
                        }
                        className={inputClass}
                      />

                      <textarea
                        required
                        rows={4}
                        placeholder="Message *"
                        value={generalForm.message}
                        onChange={(e) =>
                          setGeneralForm({ ...generalForm, message: e.target.value })
                        }
                        className={`${inputClass} resize-none`}
                      />

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-greyon-primary text-white px-8 py-3 rounded-full text-sm hover:bg-greyon-primary-hover transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* ── 2. LAND PROPOSAL TAB FORM ── */}
                  {activeTab === 'LAND PROPOSAL' && (
                    <div>
                      <div className="mb-8">
                        <h2 className="text-xl md:text-2xl font-light text-greyon-ink mb-2">
                          Present Your Land Opportunity
                        </h2>
                        <p className="text-greyon-muted font-light text-sm leading-relaxed max-w-xl">
                          We welcome submissions for potential development sites that align with our vision for high-quality residential and mixed-use projects.
                        </p>
                      </div>

                      <form onSubmit={handleLandSubmit} className="flex flex-col">
                        <input
                          type="text"
                          required
                          placeholder="Address / Location *"
                          value={landForm.location}
                          onChange={(e) =>
                            setLandForm({ ...landForm, location: e.target.value })
                          }
                          className={inputClass}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
                          <input
                            type="text"
                            required
                            placeholder="Land size (e.g. Rai, sq.m.) *"
                            value={landForm.landSize}
                            onChange={(e) =>
                              setLandForm({ ...landForm, landSize: e.target.value })
                            }
                            className={inputClass}
                          />
                          <input
                            type="text"
                            required
                            placeholder="Price (THB) *"
                            value={landForm.price}
                            onChange={(e) =>
                              setLandForm({ ...landForm, price: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>

                        <input
                          type="text"
                          required
                          placeholder="Position – Cadastral number *"
                          value={landForm.cadastral}
                          onChange={(e) =>
                            setLandForm({ ...landForm, cadastral: e.target.value })
                          }
                          className={inputClass}
                        />

                        <input
                          type="text"
                          required
                          placeholder="Name of contact person *"
                          value={landForm.contactName}
                          onChange={(e) =>
                            setLandForm({ ...landForm, contactName: e.target.value })
                          }
                          className={inputClass}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
                          <input
                            type="tel"
                            required
                            placeholder="Mobile phone *"
                            value={landForm.phone}
                            onChange={(e) =>
                              setLandForm({ ...landForm, phone: e.target.value })
                            }
                            className={inputClass}
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email *"
                            value={landForm.email}
                            onChange={(e) =>
                              setLandForm({ ...landForm, email: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-greyon-primary text-white px-8 py-3 rounded-full text-sm hover:bg-greyon-primary-hover transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* ── 3. PRODUCT PROPOSAL TAB FORM ── */}
                  {activeTab === 'PRODUCT PROPOSAL' && (
                    <div>
                      <div className="mb-8">
                        <h2 className="text-xl md:text-2xl font-light text-greyon-ink mb-2">
                          Introduce Your Product Innovation
                        </h2>
                        <p className="text-greyon-muted font-light text-sm leading-relaxed max-w-xl">
                          Suppliers may propose materials, products, or solutions that support our commitment to exceptional quality and innovation.
                        </p>
                      </div>

                      <form onSubmit={handleProductSubmit} className="flex flex-col">
                        <input
                          type="text"
                          required
                          placeholder="Company name *"
                          value={productForm.companyName}
                          onChange={(e) =>
                            setProductForm({ ...productForm, companyName: e.target.value })
                          }
                          className={inputClass}
                        />

                        <div className="relative mb-6">
                          <select
                            required
                            value={productForm.mainProduct}
                            onChange={(e) =>
                              setProductForm({ ...productForm, mainProduct: e.target.value })
                            }
                            className="w-full bg-transparent border-b border-greyon-stone py-3 text-sm md:text-base focus:outline-none focus:border-greyon-primary transition-colors text-greyon-ink cursor-pointer appearance-none"
                          >
                            <option value="" disabled className="text-greyon-muted">
                              Main product *
                            </option>
                            <option value="Product Supply Only" className="text-greyon-ink">
                              Supply Only
                            </option>
                            <option value="Supply & Installation" className="text-greyon-ink">
                              Supply &amp; Installation
                            </option>
                            <option value="Installation Only" className="text-greyon-ink">
                              Installation Only
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-greyon-muted">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
                          <input
                            type="tel"
                            required
                            placeholder="Mobile phone *"
                            value={productForm.phone}
                            onChange={(e) =>
                              setProductForm({ ...productForm, phone: e.target.value })
                            }
                            className={inputClass}
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email *"
                            value={productForm.email}
                            onChange={(e) =>
                              setProductForm({ ...productForm, email: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>

                        <input
                          type="text"
                          required
                          placeholder="Line ID *"
                          value={productForm.lineId}
                          onChange={(e) =>
                            setProductForm({ ...productForm, lineId: e.target.value })
                          }
                          className={inputClass}
                        />

                        <textarea
                          rows={3}
                          placeholder="Brief description of proposed materials or solutions (optional)"
                          value={productForm.message}
                          onChange={(e) =>
                            setProductForm({ ...productForm, message: e.target.value })
                          }
                          className={`${inputClass} resize-none`}
                        />

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-greyon-primary text-white px-8 py-3 rounded-full text-sm hover:bg-greyon-primary-hover transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* ── 4. CAREERS TAB FORM ── */}
                  {activeTab === 'CAREERS' && (
                    <div>
                      <div className="mb-8">
                        <h2 className="text-xl md:text-2xl font-light text-greyon-ink mb-2">
                          Create spaces that inspire
                        </h2>
                        <p className="text-greyon-muted font-light text-sm leading-relaxed max-w-xl">
                          Join The Creators HQ and be part of a culture that celebrates innovation, individuality, and the art of refined living.
                        </p>
                      </div>

                      <form onSubmit={handleCareerSubmit} className="flex flex-col">
                        <input
                          type="text"
                          required
                          placeholder="Full name *"
                          value={careerForm.name}
                          onChange={(e) =>
                            setCareerForm({ ...careerForm, name: e.target.value })
                          }
                          className={inputClass}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
                          <input
                            type="tel"
                            required
                            placeholder="Mobile phone *"
                            value={careerForm.phone}
                            onChange={(e) =>
                              setCareerForm({ ...careerForm, phone: e.target.value })
                            }
                            className={inputClass}
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email *"
                            value={careerForm.email}
                            onChange={(e) =>
                              setCareerForm({ ...careerForm, email: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>

                        <input
                          type="text"
                          required
                          placeholder="Interested position and department *"
                          value={careerForm.position}
                          onChange={(e) =>
                            setCareerForm({ ...careerForm, position: e.target.value })
                          }
                          className={inputClass}
                        />

                        {/* Resume upload or link */}
                        <div className="mb-8">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-greyon-muted mb-3">
                            Resume / CV (Upload File or Document Link) *
                          </label>

                          <div className="relative border border-dashed border-greyon-stone rounded-lg p-5 text-center hover:border-greyon-primary transition-colors bg-white/50">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleResumeFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center justify-center gap-1.5">
                              <UploadCloud size={24} className="text-greyon-muted" />
                              <p className="text-xs text-greyon-ink font-medium">
                                {careerForm.fileName ? (
                                  <span className="text-greyon-ink font-semibold">
                                    Selected: {careerForm.fileName}
                                  </span>
                                ) : (
                                  'Click or drag your Resume/CV here (PDF or DOC)'
                                )}
                              </p>
                              <p className="text-[11px] text-greyon-muted">Max file size 10MB</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 my-3">
                            <div className="h-px bg-greyon-stone flex-1" />
                            <span className="text-[11px] uppercase tracking-wider text-greyon-muted font-medium">
                              Or paste link
                            </span>
                            <div className="h-px bg-greyon-stone flex-1" />
                          </div>

                          <input
                            type="url"
                            placeholder="Resume / CV Link (e.g. Google Drive, LinkedIn) *"
                            value={careerForm.resumeLink}
                            onChange={(e) =>
                              setCareerForm({ ...careerForm, resumeLink: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-greyon-primary text-white px-8 py-3 rounded-full text-sm hover:bg-greyon-primary-hover transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {isSubmitting ? 'Submitting Application...' : 'Submit'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right Column: Contact Info & Cards (col-span-5) ── */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Address Details */}
              <div className="space-y-6 text-greyon-ink/80 font-light leading-relaxed">
                <div>
                  <h3 className="text-base font-medium text-greyon-ink mb-1">
                    The Creators HQ Co, Ltd.
                  </h3>
                  <p className="text-sm">
                    65/218 Floor 26, Chamnan Phenjati Business Center, Rama 9 Road, Huaykwang Sub-district, Huaykwang District, Bangkok, 10310
                  </p>
                </div>

                <div className="pt-2 border-t border-greyon-stone/40 flex items-start gap-3 text-sm">
                  <Train size={18} className="text-greyon-muted shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-greyon-ink block">
                      Public Transportation
                    </span>
                    <span>MRT Rama 9 Station, Exit 1</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-greyon-stone/40 flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone size={15} className="text-greyon-muted shrink-0" />
                    <span>T :</span>
                    <a
                      href="tel:022462195"
                      className="text-greyon-ink hover:underline underline-offset-4 font-normal"
                    >
                      (+66) 02 246 2195
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail size={15} className="text-greyon-muted shrink-0" />
                    <span>E :</span>
                    <a
                      href="mailto:info@thecreatorshq.com?subject=Contact%20The%20Creators%20HQ"
                      className="text-greyon-ink hover:underline underline-offset-4 font-normal"
                    >
                      info@thecreatorshq.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full aspect-video bg-greyon-sand mt-8 mb-12 rounded-xl border border-greyon-stone/60 shadow-sm overflow-hidden relative group">
                <img
                  src="https://cdn.prod.website-files.com/692e90b31f7640dcffe64cf6/69883028dc4a1440775dad60_decoration.webp"
                  alt="Chamnan Phenjati Business Center - The Creators HQ"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:scale-105 group-hover:filter-none transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-greyon-sand mb-1">
                    <Building2 size={14} />
                    <span>Headquarters &amp; Executive Office</span>
                  </div>
                  <p className="text-sm font-light text-white/95">
                    Chamnan Phenjati Business Center, Rama 9
                  </p>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-greyon-ink flex items-center gap-1.5 shadow-sm">
                  <MapPin size={12} className="text-greyon-danger" />
                  <span>Bangkok 10310</span>
                </div>
              </div>
            </div>

            {/* Agent & Affiliate Cards */}
            <div className="space-y-4">
              {/* Creators Agent Card */}
              <div className="bg-white p-6 rounded-lg border border-greyon-stone hover:border-greyon-gold/50 transition-all flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-greyon-ink mb-2">
                    Creators Agent
                  </h3>
                  <p className="text-xs md:text-sm text-greyon-muted font-light leading-relaxed mb-4">
                    Become a Creators HQ Agent and expand your portfolio with premium creative properties. Refer customers, secure bookings, and earn commission on every successful sales.
                  </p>
                </div>
                <div>
                  <a
                    href="#agent"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab('GENERAL')
                      setGeneralForm((prev) => ({
                        ...prev,
                        subject: 'Application: Creators Agent Network',
                      }))
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-greyon-primary hover:text-greyon-primary-hover transition-colors cursor-pointer group"
                  >
                    <span>Join Our Network</span>
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                </div>
              </div>

              {/* Creators Affiliate Card */}
              <div className="bg-white p-6 rounded-lg border border-greyon-stone hover:border-greyon-gold/50 transition-all flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-greyon-ink mb-2">
                    Creators Affiliate
                  </h3>
                  <p className="text-xs md:text-sm text-greyon-muted font-light leading-relaxed mb-4">
                    Become a Creators HQ affiliate and earn from your referral. Share our creative living spaces with your audience and turn your network into passive income.
                  </p>
                </div>
                <div>
                  <a
                    href="#affiliate"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab('GENERAL')
                      setGeneralForm((prev) => ({
                        ...prev,
                        subject: 'Application: Creators Affiliate Program',
                      }))
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-greyon-primary hover:text-greyon-primary-hover transition-colors cursor-pointer group"
                  >
                    <span>Apply as Affiliate</span>
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
