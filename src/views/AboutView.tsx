import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  BarChart3, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Layers, 
  Compass,
  FileText,
  GraduationCap,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Check,
  Brain,
  Target,
  Zap,
  ShieldAlert,
  ArrowUpRight,
  Eye,
  Activity,
  Cpu
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  CORE_SKILLS, 
  CAREER_MILESTONES, 
  EDUCATION_DATA,
  PUBLISHED_ARTICLES 
} from '../data/portfolioData';
import { ViewMode } from '../types';
import { SkillsRadarChart } from '../components/SkillsRadarChart';
import { PublishedArticlesSection } from '../components/PublishedArticlesSection';

interface AboutViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const [activeTeardownTab, setActiveTeardownTab] = useState<'fintech' | 'healthcare' | 'cxm'>('fintech');

  return (
    <article id="about-page-root" className="w-full space-y-16 sm:space-y-24 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header Banner */}
      <section id="about-overview" className="space-y-6 max-w-4xl scroll-mt-36">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Senior Content Writer & Enterprise Strategist</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
            <MapPin className="w-3 h-3 text-amber-500" />
            <span>{PERSONAL_INFO.location}</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] font-display tracking-tight leading-tight">
          Where Quantitative Telemetry Meets <br />
          <span className="text-amber-500">High-Stakes B2B Persuasion.</span>
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          6+ years architecting high-impact B2B SaaS copy grounded in <span className="text-[var(--text-primary)] font-semibold underline decoration-amber-500/50 decoration-2 underline-offset-4">neuromarketing principles</span> and cognitive persuasion for enterprise market leaders including <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-medium">Sprinklr</span> (NYSE: CXM), <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-medium">YU-Pay</span>, <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-medium">BestDoc</span>, and <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-medium">YsecIT</span>. Bridging full-funnel digital architecture, UI/UX systems, technical SEO, and closed-loop data telemetry with an <span className="font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">MCA • MSc Computer Science</span> and 7-year founder background.
        </p>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="block text-2xl font-extrabold text-amber-500 font-display">6+ Yrs</span>
            <span className="block text-sm sm:text-base text-[var(--text-muted)] font-medium leading-snug mt-1">B2B SaaS / PaaS Experience</span>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="block text-2xl font-extrabold text-amber-500 font-display">7+ Yrs</span>
            <span className="block text-sm sm:text-base text-[var(--text-muted)] font-medium leading-snug mt-1">Founder P&L Ownership</span>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="block font-mono text-xl font-extrabold text-amber-500">MCA • MSc</span>
            <span className="block text-sm sm:text-base text-[var(--text-muted)] font-medium leading-snug mt-1">Computer Science Degrees</span>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="block text-2xl font-extrabold text-amber-500 font-display">37+ Nodes</span>
            <span className="block text-sm sm:text-base text-[var(--text-muted)] font-medium leading-snug mt-1">Customer Pain Points Mapped</span>
          </div>
        </div>
      </section>

      {/* 2. Core Narrative Chapters & Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Narrative Column */}
        <div className="lg:col-span-8 space-y-8 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          
          {/* Chapter 1: The 7-Year Founder Crucible */}
          <div id="about-founder" className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-xs scroll-mt-36">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Chapter 01: The Founder Mindset
            </span>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display">
              7+ Years Bootstrapped Entrepreneurial Leadership
            </h2>
            <p>
              From October 2011 to January 2019 (7 years 4 months), I set up, bootstrapped, and directed an after-school coaching academy for school children up to class 10 in Lucknow, India. I led the development and execution of the academy's vision, managed daily operations, hired and mentored teaching staff, and maintained strict regulatory compliance.
            </p>
            <p>
              Operating without outside institutional capital taught me an indelible lesson: vanity metrics don't fund payroll. Impressions and pageviews mean nothing unless they deliver tangible outcomes. Every communication framework, parent meeting, and marketing initiative had to demonstrate measurable trust and sustainable unit economics.
            </p>
          </div>

          {/* Chapter 2: The Enterprise B2B SaaS, YU-Pay & BestDoc */}
          <div id="about-copywriting" className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-xs scroll-mt-36">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Chapter 02: B2B Enterprise Copywriting & Architecture
            </span>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display">
              6+ Years Creating High-Impact Content for Global SaaS & PaaS Brands
            </h2>
            <p>
              I have written high-performing enterprise copy, solution briefs, and bylined thought leadership for global CXM leader <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">Sprinklr</span> (NYSE: CXM), as well as led full-funnel content architecture for flagship payment facilitator <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">YU-Pay</span> (<span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">YsecIT Softwares</span> India Pvt Ltd) and healthcare automation innovator <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">BestDoc</span>.
            </p>
            <p>
              Selling complex B2B products—whether instant payment rails (RTP, FedNow) to risk-averse CFOs or automated communication and 5G telemedicine to hospital Chief Medical Officers—requires speaking the precise technical vernacular of multiple decision-makers simultaneously. Grounded in proven <strong className="text-[var(--text-primary)] font-semibold">neuromarketing principles</strong> (cognitive ease, loss aversion framing, and friction elimination), I have authored 12+ published bylined articles on emerging tech, crafted 50+ product marketing collateral assets, and built structured matrices connecting complex technical capabilities directly to 37+ documented customer pain points.
            </p>
            <p>
              Additionally, I draft technical standard operating procedures (SOPs), privacy policies, API documentation, and GDPR/CCPA compliance manuals referenced by 10+ developer engineering teams as implementation guides.
            </p>
          </div>

          {/* Special Strategic Focus: The Neuromarketing Conversion Engine */}
          <div 
            id="about-neuromarketing" 
            className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border-2 border-amber-500/35 space-y-7 shadow-sm scroll-mt-36 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25">
                <Brain className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Strategic Focus &bull; Neuromarketing &amp; Behavioral Economics</span>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                Kahneman &bull; Tversky &bull; Cialdini Models
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-display tracking-tight">
                The Neuromarketing Conversion Engine: How Neuroscience Converts Technical &amp; Executive SaaS Buyers
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
                Enterprise software purchasing is rarely an objective mathematical exercise. Neuroeconomic studies demonstrate that over <strong className="text-[var(--text-primary)] font-semibold">95% of human decision processing occurs in the subconscious mind</strong>. In high-stakes B2B sales, buying committees (CFOs, CTOs, CISOs, CMOs) are predominantly governed by <strong className="text-amber-700 dark:text-amber-300 font-semibold">career risk mitigation and cognitive fatigue</strong>. My copywriting methodology synthesizes behavioral economics with deep enterprise architecture to systematically de-risk high-ticket decisions and convert discerning evaluators into enthusiastic champions.
              </p>
            </div>

            {/* 4 Cognitive Pillars of High-Converting B2B Copy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* Pillar 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold block">
                      Pillar 01 &bull; Cognitive Fluency
                    </span>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] font-display">
                      Processing Ease = Perceived Safety
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Kahneman’s System 1 equates cognitive strain with existential risk. When SaaS copy is bloated with abstract buzzwords, the buyer’s subconscious assumes the software itself will be brittle, slow to deploy, and user-hostile. I engineer high-fluency prose, active verbs, and scannable 3-tier capability hierarchies that accelerate buying committee consensus.
                </p>
                <div className="text-[11px] font-medium text-amber-800 dark:text-amber-300 pt-1 border-t border-[var(--border-subtle)]">
                  <span>Application: </span>
                  <span className="text-[var(--text-muted)]">Applied across <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">Sprinklr</span> bylines and <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">YU-Pay</span> developer portals.</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold block">
                      Pillar 02 &bull; Prospect Theory
                    </span>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] font-display">
                      Loss Aversion &amp; Career De-Risking
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Prospect Theory establishes that the psychological pain of losing is 2x to 2.5x more intense than the pleasure of winning. Enterprise decision-makers buy downside defense, not marginal gains. I reframe features into existential loss barriers—demonstrating how inaction leads to missed compliance deadlines, customer churn, and liquidity lockup.
                </p>
                <div className="text-[11px] font-medium text-amber-800 dark:text-amber-300 pt-1 border-t border-[var(--border-subtle)]">
                  <span>Application: </span>
                  <span className="text-[var(--text-muted)]">Instant payment rails (FedNow/RTP) and <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">BestDoc</span> patient triage.</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold block">
                      Pillar 03 &bull; Choice Architecture
                    </span>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] font-display">
                      Decoy Effect &amp; Elimination of Inaction
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Excessive, unstructured choice produces decision paralysis (Hick’s Law), triggering the subconscious default: maintaining the status quo. I design structured contrast battlecards, clear 'Us vs. Legacy' comparison grids, and progressive disclosures that guide buyers effortlessly toward the high-conviction tier without decision fatigue.
                </p>
                <div className="text-[11px] font-medium text-amber-800 dark:text-amber-300 pt-1 border-t border-[var(--border-subtle)]">
                  <span>Application: </span>
                  <span className="text-[var(--text-muted)]">Live digital platforms for <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">VASTARA</span>, <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">YU-Pay</span>, and <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">Veritas</span>.</span>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold block">
                      Pillar 04 &bull; Authority Anchoring
                    </span>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] font-display">
                      Empirical Validation &amp; Institutional Proof
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Cialdini’s Authority heuristic confirms that high-stakes evaluators seek hard, peer-level institutional proof to validate emotional conviction to their executive board. I embed verifiable operational tokens—NYSE: CXM validation, live API specs, and quantitative metrics—into copy hooks, eliminating unsubstantiated hype.
                </p>
                <div className="text-[11px] font-medium text-amber-800 dark:text-amber-300 pt-1 border-t border-[var(--border-subtle)]">
                  <span>Application: </span>
                  <span className="text-[var(--text-muted)]">12+ live published articles and 50+ enterprise sales collateral assets.</span>
                </div>
              </div>

            </div>

            {/* Tactical Teardown: Neuromarketing in Action */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-display flex items-center gap-2">
                    <Eye className="w-4 h-4 text-amber-500" />
                    <span>Neuromarketing in Action: Tactical B2B Copy Transformations</span>
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Select an industry domain to inspect how cognitive restructuring converts lazy marketing copy into high-velocity pipeline:
                  </p>
                </div>

                {/* Domain Selector Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] self-start sm:self-auto">
                  <button
                    onClick={() => setActiveTeardownTab('fintech')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTeardownTab === 'fintech'
                        ? 'bg-amber-500 text-neutral-950 shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    FinTech (YU-Pay)
                  </button>
                  <button
                    onClick={() => setActiveTeardownTab('healthcare')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTeardownTab === 'healthcare'
                        ? 'bg-amber-500 text-neutral-950 shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    HealthTech (BestDoc)
                  </button>
                  <button
                    onClick={() => setActiveTeardownTab('cxm')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTeardownTab === 'cxm'
                        ? 'bg-amber-500 text-neutral-950 shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Enterprise CXM (Sprinklr)
                  </button>
                </div>
              </div>

              {/* Dynamic Teardown Content */}
              {activeTeardownTab === 'fintech' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-red-600 dark:text-red-400 block">
                        Standard Feature-Centric Copy (High Cognitive Drag)
                      </span>
                      <p className="text-[var(--text-muted)] italic leading-relaxed">
                        &ldquo;Our cutting-edge omnichannel payment orchestration platform provides high velocity, multi-currency support, and flexible APIs to boost business efficiency.&rdquo;
                      </p>
                      <span className="text-[11px] text-red-600 dark:text-red-400 flex items-start gap-1.5 pt-1.5 border-t border-red-500/15">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-semibold text-red-700 dark:text-red-300">Cognitive Friction:</strong>{' '}
                          Fluffy buzzwords &bull; Zero emotional stake &bull; No pain point identified
                        </span>
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                        Sayan's Neuromarketing-Engineered Copy (High Conversion)
                      </span>
                      <p className="text-xs leading-relaxed">
                        <span className="font-semibold text-[var(--text-primary)]">
                          &ldquo;Stop letting legacy 3-day settlement cycles trap working capital in transit.&rdquo;
                        </span>{' '}
                        <span className="text-[var(--text-secondary)] font-normal">
                          Sayan&apos;s copy frames sub-second RTP and FedNow rails as an automated treasury hedge—empowering CFOs to eliminate overnight liquidity drag, neutralize FX volatility, and protect trading margins.
                        </span>
                      </p>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-start gap-1.5 pt-1.5 border-t border-emerald-500/15">
                        <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-semibold text-emerald-800 dark:text-emerald-300">Conversion Catalysts:</strong>{' '}
                          Loss Aversion (trapped capital) &bull; Concrete Persona (CFO Treasury) &bull; Cognitive Ease
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--bg-card)] text-[11px] text-[var(--text-secondary)] border border-[var(--border-subtle)] flex items-center gap-2">
                    <Brain className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span><strong>Cognitive Mechanism:</strong> Activates the acute pain of liquidity drag before presenting instant settlement as the immediate, frictionless relief mechanism.</span>
                  </div>
                </div>
              )}

              {activeTeardownTab === 'healthcare' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-red-600 dark:text-red-400 block">
                        Standard Feature-Centric Copy (High Cognitive Drag)
                      </span>
                      <p className="text-[var(--text-muted)] italic leading-relaxed">
                        &ldquo;An intuitive, cloud-based patient communication platform leveraging intelligent automation to modernize hospital operations.&rdquo;
                      </p>
                      <span className="text-[11px] text-red-600 dark:text-red-400 flex items-start gap-1.5 pt-1.5 border-t border-red-500/15">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-semibold text-red-700 dark:text-red-300">Cognitive Friction:</strong>{' '}
                          Abstract &bull; Fails to address CMO/COO career liabilities &bull; Easily dismissed
                        </span>
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                        Sayan's Neuromarketing-Engineered Copy (High Conversion)
                      </span>
                      <p className="text-xs leading-relaxed">
                        <span className="font-semibold text-[var(--text-primary)]">
                          &ldquo;When front-desk staff waste 4.2 hours daily managing appointment phone-tag, patient leakage costs hospitals over $1.4M annually.&rdquo;
                        </span>{' '}
                        <span className="text-[var(--text-secondary)] font-normal">
                          Sayan&apos;s copy activates acute loss aversion, positioning automated WhatsApp triage and 5G telemedicine as an indispensable defense against clinician burnout and lost revenue.
                        </span>
                      </p>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-start gap-1.5 pt-1.5 border-t border-emerald-500/15">
                        <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-semibold text-emerald-800 dark:text-emerald-300">Conversion Catalysts:</strong>{' '}
                          Quantified Pain ($1.4M Leakage) &bull; Burnout Mitigation &bull; Urgent Relief
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--bg-card)] text-[11px] text-[var(--text-secondary)] border border-[var(--border-subtle)] flex items-center gap-2">
                    <Brain className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span><strong>Cognitive Mechanism:</strong> Converts an unbudgeted "nice-to-have" digital upgrade into an existential fiscal and clinician-retention necessity.</span>
                  </div>
                </div>
              )}

              {activeTeardownTab === 'cxm' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-red-600 dark:text-red-400 block">
                        Standard Feature-Centric Copy (High Cognitive Drag)
                      </span>
                      <p className="text-[var(--text-muted)] italic leading-relaxed">
                        &ldquo;Harness social listening and unified omnichannel customer analytics to improve your brand presence and marketing ROI.&rdquo;
                      </p>
                      <span className="text-[11px] text-red-600 dark:text-red-400 flex items-start gap-1.5 pt-1.5 border-t border-red-500/15">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-semibold text-red-700 dark:text-red-300">Cognitive Friction:</strong>{' '}
                          Generic SaaS boilerplate &bull; Zero enterprise resonance &bull; No board-level imperative
                        </span>
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                        Sayan's Neuromarketing-Engineered Copy (High Conversion)
                      </span>
                      <p className="text-xs leading-relaxed">
                        <span className="font-semibold text-[var(--text-primary)]">
                          &ldquo;Fragmented social telemetry blinds enterprise CMOs to brand reputation crises until customer churn spikes on quarterly earnings calls.&rdquo;
                        </span>{' '}
                        <span className="text-[var(--text-secondary)] font-normal">
                          Sayan&apos;s thought leadership reframes unified AI listening as real-time enterprise insurance—turning multi-channel consumer chatter into board-level strategic foresight.
                        </span>
                      </p>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-start gap-1.5 pt-1.5 border-t border-emerald-500/15">
                        <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-semibold text-emerald-800 dark:text-emerald-300">Conversion Catalysts:</strong>{' '}
                          Executive Reputation Stakes &bull; Insurance Framing &bull; Boardroom Authority
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--bg-card)] text-[11px] text-[var(--text-secondary)] border border-[var(--border-subtle)] flex items-center gap-2">
                    <Brain className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span><strong>Cognitive Mechanism:</strong> Aligns software capability directly with executive reputation protection and quarterly financial risk avoidance.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Scientific Verification Bridge into Chapter 3 */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--text-secondary)] border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong>Empirical Verification:</strong> My neuromarketing hypotheses are not speculative creative opinions—they are tested and validated via Python click-stream analysis and Power BI attribution telemetry (detailed in Chapter 03 below).
                </span>
              </div>
            </div>

          </div>

          {/* Chapter 3: MIS, Relational Databases & Data Telemetry */}
          <div id="about-telemetry" className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-xs scroll-mt-36">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Chapter 03: MIS Systems & Quantitative Telemetry
            </span>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display">
              Rooted in Computer Science & Government Scheme Telemetry
            </h2>
            <p>
              My foundation in technical precision began with my Master of Computer Applications (MCA) and Master of Science (MS) in Computer Science, followed by serving as Management Information System (MIS) Officer for the <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-medium">Ministry of Rural Development, Government of India</span>. There, I monitored the national MGNREGA scheme, maintaining relational databases and providing data analysis and reporting for government administrators.
            </p>
            <p>
              Today, I merge that database discipline with modern growth analytics: using Python for search intent scraping and cohort modeling, and Power BI for custom DAX attribution dashboards. I don't guess what converts; I let quantitative telemetry reveal the exact levers of executive persuasion.
            </p>
          </div>

        </div>

        {/* Right Sidebar: Contact, Principles & Arsenal */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Direct Contact Card */}
          <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[var(--text-primary)] font-display border-b border-[var(--border-subtle)] pb-3">
              Direct Contact & Channels
            </h3>

            <div className="space-y-3 text-xs">
              <a 
                href="mailto:sayan.contentwriter@gmail.com"
                className="group/contact-mail flex items-center gap-2.5 p-2 rounded-xl hover:bg-[var(--bg-secondary)] transition-all duration-300 text-[var(--text-secondary)] hover:text-amber-500 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-amber-500 shrink-0 transition-transform duration-300 ease-out group-hover/contact-mail:scale-115 group-hover/contact-mail:-translate-y-0.5" />
                <span className="font-mono break-all">sayan.contentwriter@gmail.com</span>
              </a>

              <a 
                href={PERSONAL_INFO.phoneHref}
                className="group/contact-phone flex items-center gap-2.5 p-2 rounded-xl hover:bg-[var(--bg-secondary)] transition-all duration-300 text-[var(--text-secondary)] hover:text-amber-500 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-500 shrink-0 transition-transform duration-300 ease-out group-hover/contact-phone:scale-115 group-hover/contact-phone:-rotate-12" />
                <span className="font-mono font-semibold">{PERSONAL_INFO.phoneDisplay}</span>
              </a>

              <div className="group/contact-loc flex items-center gap-2.5 p-2 rounded-xl hover:bg-[var(--bg-secondary)] transition-all duration-300 text-[var(--text-secondary)] hover:text-amber-500 cursor-default">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 transition-transform duration-300 ease-out group-hover/contact-loc:scale-115 group-hover/contact-loc:-translate-y-0.5" />
                <span>{PERSONAL_INFO.location}</span>
              </div>

              <a 
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group/linkedin flex items-center justify-between p-2 rounded-xl hover:bg-[var(--bg-secondary)] transition-all duration-300 text-[var(--text-secondary)] hover:text-amber-500 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-amber-500 shrink-0 transition-transform duration-300 ease-out group-hover/linkedin:scale-115 group-hover/linkedin:-translate-y-0.5" />
                  <span className="font-semibold">LinkedIn Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-amber-500 transition-all duration-300 ease-out group-hover/linkedin:translate-x-0.5 group-hover/linkedin:-translate-y-0.5 group-hover/linkedin:scale-115" />
              </a>
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => onNavigate('contact')}
                className="group/strategy-cta w-full py-3 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-sm hover:shadow-md hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Initiate Direct Strategy Session</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-950 transition-all duration-300 ease-out group-hover/strategy-cta:translate-x-1.5 group-hover/strategy-cta:scale-110" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Guiding Principles Card */}
          <div id="about-principles" className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-5 shadow-xs scroll-mt-36">
            <h3 className="text-base font-bold text-[var(--text-primary)] font-display border-b border-[var(--border-subtle)] pb-3">
              Why I Stand Out
            </h3>

            <div className="space-y-4 text-xs">
              {PERSONAL_INFO.whyIStandOut.map((point, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-bold text-[var(--text-primary)] flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Stack Pills */}
          <div className="p-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Verified Technical Arsenal
            </h3>

            {CORE_SKILLS.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <span className="block text-xs font-bold text-[var(--text-primary)]">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </aside>

      </section>

      {/* 3. Education & Academic Pedigree Section */}
      <section id="about-education" className="scroll-mt-36 space-y-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-amber-500" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-display">
            Education & Computer Science Foundation
          </h2>
        </div>
        <p className="text-sm text-[var(--text-secondary)] max-w-3xl">
          Formal academic training in computer science and software systems that allows me to write with effortless technical fluency when interfacing with engineers, CTOs, and technical founders.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION_DATA.map((edu, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-700 dark:text-amber-300">
                  {edu.period}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-medium">Maharshi Dayanand University</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-display">
                {edu.degree}
              </h3>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                Focus: {edu.focus}
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Live Published Articles & Thought Leadership Section */}
      <section id="about-publications" className="scroll-mt-36">
        <PublishedArticlesSection showFilters={true} />
      </section>

      {/* 5. Complete Chronological Career Experience */}
      <section id="about-experience" className="space-y-8 scroll-mt-36">
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-amber-500" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-display">
            Chronological Professional Experience
          </h2>
        </div>
        <p className="text-sm text-[var(--text-secondary)] max-w-3xl">
          Complete career history spanning enterprise B2B SaaS, payment facilitators, HealthTech, 7 years of founder leadership, and government telemetry systems.
        </p>

        <div className="space-y-6">
          {CAREER_MILESTONES.map((item, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-amber-400/50 transition-all shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-700 dark:text-amber-300">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] font-display">
                    {item.title}
                  </h3>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold tracking-tight bg-amber-500/10 dark:bg-amber-400/10 text-amber-800 dark:text-amber-300 border border-amber-500/25 dark:border-amber-400/25 shadow-2xs shrink-0 self-start sm:self-auto">
                  {item.companyOrVenture}
                </span>
              </div>

              <div className="text-xs font-medium text-amber-700 dark:text-amber-400">
                {item.tagline}
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
                <div className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{item.metrics}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="text-[11px] px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Recharts Competency Radar Chart Section */}
      <section id="about-skills" className="scroll-mt-36">
        <SkillsRadarChart />
      </section>

      {/* 7. Bottom CTA Bar */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-display">
            Ready to review specific case studies?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Explore verified numbers from <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">Sprinklr</span> (NYSE: CXM), <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">YU-Pay</span> FinTech, <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">BestDoc</span> HealthTech, and enterprise data telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('portfolio')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors cursor-pointer"
          >
            View Portfolio & Case Studies
          </button>
        </div>
      </section>

    </article>
  );
};
