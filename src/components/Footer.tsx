import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Mail, 
  ArrowUp, 
  Linkedin, 
  ExternalLink, 
  CheckCircle2, 
  Phone, 
  ShieldCheck, 
  Globe, 
  Award,
  MapPin,
  Clock,
  GraduationCap,
  Scale,
  FileText
} from 'lucide-react';
import { PERSONAL_INFO, DEVELOPED_WEBSITES } from '../data/portfolioData';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode, subId?: string) => void;
  onOpenInquiryModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiryModal }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal button as soon as viewer has scrolled past a few lines (~250px)
      setShowScrollTop(window.scrollY > 250);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="site-footer" 
      role="contentinfo"
      aria-label="Website Footer"
      className="w-full bg-[var(--bg-footer)] text-[var(--text-footer)] border-t border-neutral-800 transition-colors"
    >
      {/* "Let's Talk for Your Next Project" High-Converting Hero CTA Banner */}
      <section 
        id="footer-cta-banner"
        aria-label="Work With Sayan Nan - Call To Action"
        className="relative overflow-hidden border-b border-neutral-800/80 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/25 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PERSONAL_INFO.availability}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display leading-tight">
            Got an Enterprise SaaS, FinTech, or Digital Platform? <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              Let's Turn Complex Capabilities into High-Converting Pipeline.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 leading-relaxed">
            Stop losing enterprise pipeline to generic marketing buzzwords and blind guesswork. Combine enterprise B2B SaaS copywriting proven across market leaders like <span className="bg-amber-400/15 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/25 font-semibold">Sprinklr</span> with Python data mining and Power BI closed-loop attribution to convert discerning technical and executive buyers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              id="footer-banner-talk-cta"
              onClick={() => {
                if (onOpenInquiryModal) {
                  onOpenInquiryModal();
                } else {
                  onNavigate('contact');
                }
              }}
              aria-haspopup="dialog"
              className="group/banner-cta inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
              title="Schedule an Executive Consultation for your next project"
            >
              <span>Let's Talk For Your Next Project</span>
              <span className="sr-only"> - Open inquiry form for project scoping</span>
              <ArrowRight className="w-5 h-5 text-neutral-950 transition-all duration-300 ease-out group-hover/banner-cta:translate-x-1.5 group-hover/banner-cta:scale-110" aria-hidden="true" />
            </button>

            <a
              id="footer-banner-phone-btn"
              href={PERSONAL_INFO.phoneHref}
              className="group/phone-btn inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-sm bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 hover:border-amber-400/60 shadow-sm hover:shadow-md hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400 cursor-pointer"
              aria-label={`Call Sayan Nan directly at ${PERSONAL_INFO.phoneDisplay}`}
            >
              <Phone className="w-4 h-4 text-emerald-400 transition-all duration-300 ease-out group-hover/phone-btn:scale-115 group-hover/phone-btn:-rotate-12" />
              <span>{PERSONAL_INFO.phoneDisplay}</span>
            </a>

            <a
              id="footer-banner-email-btn"
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group/email-btn inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-sm bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 hover:border-amber-400/60 shadow-sm hover:shadow-md hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400 cursor-pointer"
              aria-label={`Email Sayan Nan directly at ${PERSONAL_INFO.email}`}
            >
              <Mail className="w-4 h-4 text-amber-400 transition-all duration-300 ease-out group-hover/email-btn:scale-115 group-hover/email-btn:-translate-y-0.5" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Direct Strategy with Sayan (Zero Agency Junior Hand-offs)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Enterprise NDA & Strict IP Governance</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Rapid 2–4 Week Agile Sprint Delivery</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Footer Links & Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Bio & Verified Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-neutral-950 font-bold flex items-center justify-center font-display text-base shadow-sm">
                SN
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-display block leading-none">
                  {PERSONAL_INFO.name}
                </span>
                <div className="mt-1.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-neutral-900 text-amber-300 border border-amber-400/40 shadow-xs">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    MCA • MSc Computer Science
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[var(--text-footer-muted)] leading-relaxed">
              Master of Computer Applications (MCA) with 6+ years architecting full digital ecosystems and conversion frameworks for global SaaS/PaaS platforms (<span className="bg-amber-400/15 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/20 font-medium">YU-Pay</span>, <span className="bg-amber-400/15 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/20 font-medium">BestDoc</span>, <span className="bg-amber-400/15 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/20 font-medium">YsecIT</span>), backed by 7 years of bootstrap founder grit.
            </p>

            {/* Social & Portfolio Profiles */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sayan Nan on LinkedIn (opens in a new tab)"
                className="group/linkedin-icon p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-neutral-800 hover:border-amber-400/50 shadow-xs hover:shadow-sm hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400 cursor-pointer"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 transition-all duration-300 ease-out group-hover/linkedin-icon:scale-115 group-hover/linkedin-icon:-translate-y-0.5" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label={`Email Sayan Nan at ${PERSONAL_INFO.email}`}
                className="group/mail-icon p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-neutral-800 hover:border-amber-400/50 shadow-xs hover:shadow-sm hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-400 cursor-pointer"
                title="Send Direct Email"
              >
                <Mail className="w-4 h-4 transition-all duration-300 ease-out group-hover/mail-icon:scale-115 group-hover/mail-icon:-translate-y-0.5" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-neutral-400">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </p>
            </div>
          </div>

          {/* Col 2: Site Architecture & Navigation */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-amber-400 font-display">
              Navigation
            </span>
            <nav aria-label="Footer Site Navigation">
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => onNavigate('home')} 
                    className="text-[var(--text-footer-muted)] hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-amber-400 rounded-sm"
                  >
                    Home (Executive Overview)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('about')} 
                    className="text-[var(--text-footer-muted)] hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-amber-400 rounded-sm"
                  >
                    About Sayan (Journey & P&L)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('services')} 
                    className="text-[var(--text-footer-muted)] hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-amber-400 rounded-sm"
                  >
                    Services & Capabilities
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('portfolio')} 
                    className="text-[var(--text-footer-muted)] hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-amber-400 rounded-sm"
                  >
                    Case Studies & Artifacts
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('testimonials')} 
                    className="text-[var(--text-footer-muted)] hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-amber-400 rounded-sm"
                  >
                    Client Endorsements
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('faqs')} 
                    className="text-[var(--text-footer-muted)] hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-amber-400 rounded-sm"
                  >
                    Client FAQs
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('contact')} 
                    className="group/nav-call text-amber-400 font-medium hover:text-amber-300 transition-all duration-200 cursor-pointer text-left inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-amber-400 rounded-sm"
                  >
                    <span>Schedule Discovery Call</span>
                    <ArrowRight className="w-3 h-3 transition-all duration-300 ease-out group-hover/nav-call:translate-x-1.5 group-hover/nav-call:scale-115" />
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Col 3: 4 Live Production Platforms Engineered by Sayan */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="block text-xs font-bold uppercase tracking-wider text-amber-400 font-display">
                Live Developed Websites
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-medium">
                4 Live
              </span>
            </div>
            
            <p className="text-[11px] text-neutral-400">
              Complete architecture, UI/UX design, and conversion copy authored by Sayan:
            </p>

            <ul className="space-y-2.5 text-xs">
              {DEVELOPED_WEBSITES.map((site) => (
                <li key={site.id}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/site block p-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800/90 border border-neutral-800/80 hover:border-amber-400/50 shadow-xs hover:shadow-sm hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-amber-400 cursor-pointer"
                    aria-label={`Visit live website ${site.brandName || site.title} (${site.domain}) in a new tab`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-200 group-hover/site:text-amber-300 transition-colors text-[12px]">
                        {site.brandName || site.title.split(':')[0]}
                      </span>
                      <ExternalLink className="w-3 h-3 text-neutral-500 group-hover/site:text-amber-400 transition-all duration-300 ease-out group-hover/site:translate-x-0.5 group-hover/site:-translate-y-0.5 group-hover/site:scale-115" />
                    </div>
                    <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                      {site.domain} &bull; {site.industry.split(',')[0]}
                    </p>
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-1">
              <button
                onClick={() => onNavigate('portfolio')}
                className="group/case-btn inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer transition-all duration-200"
              >
                <span className="underline">View Detailed Case Studies</span>
                <ArrowRight className="w-3 h-3 transition-all duration-300 ease-out group-hover/case-btn:translate-x-1.5 group-hover/case-btn:scale-115" />
              </button>
            </div>
          </div>

          {/* Col 4: Direct Retainer Hub & Interactive Utilities */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-amber-400 font-display">
              Direct Retainer Hub
            </span>
            <div className="space-y-2.5 text-xs text-[var(--text-footer-muted)]">
              <div>
                <span className="text-[11px] text-neutral-400 block">Direct Inquiry:</span>
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`} 
                  className="text-white hover:text-amber-400 font-medium break-all hover:underline transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 rounded-sm"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <div>
                <span className="text-[11px] text-neutral-400 block">Phone / WhatsApp:</span>
                <a 
                  href={PERSONAL_INFO.phoneHref} 
                  className="text-white hover:text-amber-400 font-medium hover:underline transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 rounded-sm"
                >
                  {PERSONAL_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium pt-1">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Typical Response Time: &lt; 12 Hours</span>
              </div>
              
              <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                <button
                  id="footer-schedule-discovery-btn"
                  onClick={() => {
                    if (onOpenInquiryModal) {
                      onOpenInquiryModal();
                    } else {
                      onNavigate('contact');
                    }
                  }}
                  className="group/strategy-btn w-full px-3 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-sm hover:shadow-md hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-amber-400"
                  title="Open Executive Consultation Modal (Showcase: Option 3 Soft Depth Aperture)"
                >
                  <span>Book Strategy Call</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-all duration-300 ease-out group-hover/strategy-btn:translate-x-1.5 group-hover/strategy-btn:scale-110" />
                </button>
                <p className="text-[11px] text-neutral-400 text-center">
                  Direct retainers &amp; high-priority project inquiries
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Statutory Clauses & Intellectual Property Governance */}
        <div 
          id="footer-statutory-governance"
          aria-label="Statutory Clauses & Intellectual Property Rights"
          className="mt-14 pt-10 border-t border-neutral-800"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-display tracking-tight">
                  Intellectual Property & Statutory Governance
                </h3>
                <p className="text-[11px] text-neutral-400">
                  Legal declarations, trade mark attributions, and statutory safe harbor notices
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300">
                IT Act 2000 (India) &bull; GDPR Safe Harbor
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Clause 1: Intellectual Property Rights */}
            <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 font-display flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  Intellectual Property Rights
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  IP Notice
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                All third-party brand trademarks, registered corporate names, and product emblems referenced throughout this platform—including <span className="bg-amber-400/15 text-amber-300 px-1 py-0.5 rounded border border-amber-400/20 font-medium">Sprinklr (NYSE: CXM)</span>, <span className="bg-amber-400/15 text-amber-300 px-1 py-0.5 rounded border border-amber-400/20 font-medium">YU-Pay</span>, <span className="bg-amber-400/15 text-amber-300 px-1 py-0.5 rounded border border-amber-400/20 font-medium">BestDoc</span>, <span className="bg-amber-400/15 text-amber-300 px-1 py-0.5 rounded border border-amber-400/20 font-medium">YsecIT Softwares</span>, <span className="bg-amber-400/15 text-amber-300 px-1 py-0.5 rounded border border-amber-400/20 font-medium">VASTARA Trading</span>, <span className="bg-amber-400/15 text-amber-300 px-1 py-0.5 rounded border border-amber-400/20 font-medium">YOGH Hospitality</span>, and <span className="bg-amber-400/15 text-amber-300 px-1 py-0.5 rounded border border-amber-400/20 font-medium">Veritas Bullion</span>—belong exclusively to their respective owners. Citation constitutes truthful professional demonstration of executed work. Original narrative architectures, data telemetry models, and UI/UX assets are the protected intellectual property of Sayan Nan under Indian and international copyright treaties.
              </p>
            </div>

            {/* Clause 2: NDA & Confidentiality */}
            <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 font-display flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Confidentiality & NDA Terms
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                  NDA Clearance
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                All quantitative metrics, conversion percentages, and architectural summaries presented across this portfolio adhere strictly to executed bilateral Non-Disclosure Agreements (NDAs), trade secrets safeguards, and commercial clearance protocols. No proprietary source code, internal client databases, confidential customer records, or unpublished financial data are disclosed or accessible.
              </p>
            </div>

            {/* Clause 3: Statutory & Jurisdiction Disclaimers */}
            <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 font-display flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  Statutory & Jurisdictional Notice
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/20">
                  Statutory Safe Harbor
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Published pursuant to Section 79 of the Information Technology Act, 2000 (India) and international safe harbor frameworks for truthful commercial representation of past professional deliverables. Documented pipeline lifts and attribution figures represent historical project milestones; prospective results vary by execution cadence and distribution. Commercial retainers are governed under the Indian Contract Act, 1872, subject to the jurisdiction of courts in Bengaluru, Karnataka, India.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal, Compliance & Back-To-Top */}
        <div className="mt-10 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-footer-muted)]">
          <div className="space-y-1 text-center sm:text-left">
            <p>
              &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All Rights Reserved.
            </p>
            <p className="text-[11px] text-neutral-400">
              Crafted with Semantic HTML5, Tailwind CSS, TypeScript & WCAG 2.1 AA Accessibility Standards.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Enterprise NDA Protected</span>
            </span>

            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 p-2.5 sm:px-4 sm:py-2.5 rounded-full text-xs font-bold bg-neutral-900/95 hover:bg-neutral-800 text-neutral-200 hover:text-amber-400 border border-neutral-700/80 hover:border-amber-400/80 shadow-2xl hover:shadow-amber-500/20 backdrop-blur-md transition-all duration-300 transform cursor-pointer group focus-visible:outline-2 focus-visible:outline-amber-400 hover:scale-105 active:scale-95 ${
                showScrollTop 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
              title="Return to top of page"
              aria-label="Back to top of page"
            >
              <span className="hidden sm:inline">Back to Top</span>
              <ArrowUp className="w-4 h-4 text-amber-400 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

