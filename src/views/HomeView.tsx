import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BarChart3, 
  Database, 
  TrendingUp, 
  CheckCircle2, 
  Star, 
  Terminal, 
  ShieldCheck, 
  ArrowUpRight, 
  ChevronRight, 
  Code2, 
  Layers, 
  Award, 
  Cpu, 
  FileText, 
  MapPin, 
  ExternalLink, 
  BookOpen,
  Globe,
  GraduationCap
} from 'lucide-react';
import { PERSONAL_INFO, WORK_PROCESS_STEPS, CAREER_MILESTONES, PROJECTS, TESTIMONIALS, SERVICES } from '../data/portfolioData';
import { ViewMode } from '../types';
import { PublishedArticlesSection } from '../components/PublishedArticlesSection';
import { DevelopedWebsitesSection } from '../components/DevelopedWebsitesSection';

interface HomeViewProps {
  onNavigate: (view: ViewMode, subId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [activeProcessTab, setActiveProcessTab] = useState(0);
  const [telemetryMode, setTelemetryMode] = useState<'python' | 'dax'>('python');

  const selectedProcess = WORK_PROCESS_STEPS[activeProcessTab] || WORK_PROCESS_STEPS[0];

  return (
    <div id="homepage-root" className="w-full space-y-20 sm:space-y-28 pb-16">
      
      {/* ========================================================
          1. HERO SECTION (Replicating "I'm Jenny Scott" layout)
          ======================================================== */}
      <section 
        id="hero-section" 
        aria-label="Introduction & Value Proposition"
        className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between pt-6 sm:pt-10 lg:pt-12 pb-8 px-4 sm:px-6 lg:px-8 xl:px-12"
      >
        <div className="w-full flex-1 flex flex-col lg:flex-row lg:items-start justify-between gap-12 relative max-w-7xl mx-auto lg:max-w-none">
          
          {/* Left Column: Headline, Bio & CRO Microcopy */}
          <div className="w-full lg:max-w-2xl xl:max-w-3xl space-y-6 z-10">
            
            {/* Persona Micro Badge & Location */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide bg-[var(--badge-bg)] border border-[var(--tag-border)] text-[var(--text-secondary)] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Senior Content Writer &bull; Enterprise SEO Strategist &bull; B2B Copywriter</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] shadow-xs">
                <MapPin className="w-3 h-3 text-amber-500" />
                <span>Remote/Bengaluru</span>
              </div>
            </div>

            {/* Main Greeting & Headline */}
            <div className="space-y-3">
              <span className="block text-lg sm:text-xl font-bold text-amber-700 dark:text-amber-400 font-display">
                Hello, I'm Sayan Nan
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12] font-display">
                I Turn Complex SaaS, FinTech & Emerging Tech into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500">
                  High-Converting Pipeline.
                </span>
              </h1>
            </div>

            {/* Neuromarketing Subheadline */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl font-normal">
              6+ years architecting high-impact B2B SaaS copy grounded in <span className="text-[var(--text-primary)] font-semibold underline decoration-amber-500/50 decoration-2 underline-offset-4">neuromarketing principles</span> and cognitive persuasion for enterprise market leaders including <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-medium">Sprinklr</span> (NYSE: CXM), <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-medium">YU-Pay</span>, <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-medium">BestDoc</span>, and <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-medium">YsecIT</span>. Bridging full-funnel digital architecture, UI/UX systems, technical SEO, and closed-loop data telemetry with an <span className="font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">MCA • MSc Computer Science</span> and 7-year founder background.
            </p>

            {/* Value Proposition Pills */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                <span>4 Live Websites Developed (Arch + UX + Copy)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">Sprinklr</span> (NYSE: CXM), <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">YU-Pay</span> & <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">BestDoc</span> Bylines
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Python & Power BI Telemetry</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                <span>7-Year Bootstrapped Founder Grit</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 dark:border-amber-400/30 shadow-xs">
                <GraduationCap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>MCA • MSc Computer Science</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                id="hero-talk-cta"
                onClick={() => onNavigate('contact')}
                className="group/talk inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-base bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-amber-500"
                title="Initiate engagement and project scope inquiry"
              >
                <span>Let's Talk For Your Project</span>
                <span className="sr-only"> - Open inquiry form for project scoping</span>
                <ArrowRight className="w-4 h-4 text-neutral-950 transition-all duration-300 ease-out group-hover/talk:translate-x-1.5 group-hover/talk:scale-110" aria-hidden="true" />
              </button>

              <button
                id="hero-portfolio-btn"
                onClick={() => onNavigate('portfolio')}
                className="group/port inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-amber-400/80 hover:shadow-md hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer shadow-xs"
              >
                <span>Explore Case Studies</span>
                <ArrowUpRight className="w-4 h-4 text-amber-500 transition-all duration-300 ease-out group-hover/port:translate-x-1 group-hover/port:-translate-y-1 group-hover/port:scale-115" />
              </button>
            </div>

            {/* Quick trust metric bar */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center gap-6 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-[var(--text-primary)] font-bold">5.0 / 5.0</span>
              </div>
              <span className="hidden sm:inline">&bull;</span>
              <span className="font-semibold text-[var(--text-secondary)]">250+ Verified B2B Engagements</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Card (Data + Copy Hybrid Dashboard Visual anchored over bottom-right quadrant) */}
          <div className="w-full lg:w-auto lg:absolute lg:bottom-4 lg:right-4 xl:bottom-6 xl:right-8 z-30 mt-10 lg:mt-0">
            <div className="relative mx-auto w-full max-w-md xl:max-w-lg rounded-3xl p-1 bg-gradient-to-b from-amber-400/50 via-[var(--border-strong)] to-amber-500/20 shadow-2xl">
              <div className="rounded-[22px] bg-[var(--bg-card)]/98 backdrop-blur-2xl p-5 sm:p-6 border border-[var(--border-strong)] space-y-5 shadow-2xl">
                
                {/* Visual Header with Tab Switcher */}
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 font-mono text-[11px] font-bold text-[var(--text-muted)]">
                      {telemetryMode === 'python' ? 'sayan_growth_model.py' : 'attribution_model.dax'}
                    </span>
                  </div>

                  {/* Interactive Toggle for Python vs DAX */}
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[10px] font-mono">
                    <button
                      onClick={() => setTelemetryMode('python')}
                      className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        telemetryMode === 'python'
                          ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      Python
                    </button>
                    <button
                      onClick={() => setTelemetryMode('dax')}
                      className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        telemetryMode === 'dax'
                          ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      DAX / BI
                    </button>
                  </div>
                </div>

                {/* Simulated Telemetry Stats Card */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                    <span className="block text-[11px] text-[var(--text-muted)] font-medium">Attributed Pipeline</span>
                    <span className="block text-xl font-extrabold text-[var(--text-primary)] font-display mt-0.5">
                      {telemetryMode === 'python' ? '$2,840,000' : '$3,420,000'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                      <TrendingUp className="w-3 h-3" /> +240% YoY Lift
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                    <span className="block text-[11px] text-[var(--text-muted)] font-medium">Search Intent Nodes</span>
                    <span className="block text-xl font-extrabold text-[var(--text-primary)] font-display mt-0.5">
                      {telemetryMode === 'python' ? '38 #1 Ranks' : '100% Attributed'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 dark:text-amber-300 font-bold mt-1">
                      <Sparkles className="w-3 h-3" /> <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">Sprinklr</span> Ecosystem
                    </span>
                  </div>
                </div>

                {/* Simulated Code / Logic Snippet */}
                {telemetryMode === 'python' ? (
                  <div className="p-3.5 rounded-2xl bg-neutral-950 text-neutral-200 text-xs font-mono space-y-1.5 border border-neutral-800">
                    <div className="text-neutral-400 text-[11px]"># Python Intent Scraper & CRO Attribution</div>
                    <div>
                      <span className="text-amber-400">def</span> <span className="text-blue-400">attribute_pipeline</span>(intent_nodes, da):
                    </div>
                    <div className="pl-4 text-neutral-300">
                      weights = model.predict(da.features)
                    </div>
                    <div className="pl-4 text-emerald-400">
                      return optimize_cro_copy(intent_nodes, weights)
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-neutral-950 text-neutral-200 text-xs font-mono space-y-1.5 border border-neutral-800">
                    <div className="text-neutral-400 text-[11px]">// Power BI DAX Closed-Loop Measure</div>
                    <div>
                      <span className="text-amber-400">VAR</span> <span className="text-blue-400">FirstTouchRev</span> = CALCULATE(SUM(Deals[ARR]))
                    </div>
                    <div>
                      <span className="text-amber-400">VAR</span> <span className="text-blue-400">ContentWeight</span> = DIVIDE(Sessions[HighIntent], Total)
                    </div>
                    <div className="text-emerald-400">
                      RETURN FirstTouchRev * ContentWeight
                    </div>
                  </div>
                )}

                {/* Featured Quote Card */}
                <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border-l-4 border-amber-500 text-xs space-y-1">
                  <p className="italic text-[var(--text-secondary)]">
                    "Sayan is the rare copywriter who requested our SQL schemas and Power BI models before drafting a single word."
                  </p>
                  <span className="block text-[11px] font-bold text-[var(--text-primary)]">
                    — VP of Marketing, <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">NexusCX (Sprinklr Partner)</span>
                  </span>
                </div>

                {/* Interactive Action inside Card */}
                <button
                  onClick={() => onNavigate('service-detail', 'marketing-data-analysis')}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-center bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Inspect Power BI & Python Architecture</span>
                </button>

              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          2. "WHO IS SAYAN" STATS COUNTER SECTION
          ======================================================== */}
      <section 
        id="who-is-sayan-stats" 
        data-who-is-sayan-section="true"
        aria-label="Key statistics and career numbers"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Verified Quantitative Benchmarks
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-display">
              Who is Sayan Nan? <br />
              <span className="font-normal text-[var(--text-secondary)] text-lg sm:text-xl">
                The Numbers Behind The Craft
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="pt-6 sm:pt-0 sm:px-6 first:pl-0 text-center sm:text-left space-y-1.5 group hover:bg-[var(--bg-secondary)] p-3 rounded-2xl transition-colors"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-amber-700 dark:text-amber-400 font-display tracking-tight group-hover:scale-105 transition-transform origin-left">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-base sm:text-lg font-bold text-[var(--text-primary)] font-display">
                  {stat.label}
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================
          2.4. LIVE DEVELOPED WEBSITES (ARCHITECTURE + UI/UX + COPY)
          ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DevelopedWebsitesSection 
          className="py-6" 
          onSelectProject={(id) => onNavigate('project-detail', id)}
        />
      </div>


      {/* ========================================================
          2.5. LIVE PUBLISHED ARTICLES & BYLINES
          ======================================================== */}
      <PublishedArticlesSection className="py-4" />


      {/* ========================================================
          3. "THE WAY I WORK" (4-PHASE CONVERSION PROCESS)
          ======================================================== */}
      <section 
        id="the-way-i-work" 
        aria-label="Working Methodology"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Methodology & Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-display">
              The Way I Work: <br />
              <span className="text-amber-500">From Raw Telemetry to Enterprise Deals</span>
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
            Click any phase to inspect the exact diagnostic procedures, toolchain, and tangible client deliverables.
          </p>
        </div>

        {/* Phase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORK_PROCESS_STEPS.map((step, idx) => {
            const isSelected = activeProcessTab === idx;
            return (
              <article 
                key={step.step}
                onClick={() => setActiveProcessTab(idx)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-[var(--bg-card)] border-amber-500 ring-2 ring-amber-500/20 shadow-md' 
                    : 'bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-amber-400/60 shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold font-display text-amber-500">
                      {step.step}
                    </span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${isSelected ? 'bg-amber-500 text-neutral-950 font-bold' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'}`}>
                      Phase {step.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] font-display leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border-subtle)]">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Primary Output:
                  </span>
                  <span className="block text-xs font-semibold text-[var(--text-primary)] mt-0.5">
                    {step.deliverable}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Phase Inspector Deep Dive Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[var(--bg-secondary)] border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs animate-in fade-in duration-200">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500 text-neutral-950">
                Active Phase: 0{selectedProcess.step}
              </span>
              <h4 className="text-lg font-bold text-[var(--text-primary)] font-display">
                {selectedProcess.title}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {selectedProcess.description}
            </p>
            <div className="text-xs text-amber-700 dark:text-amber-300 font-medium pt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Deliverable: <strong>{selectedProcess.deliverable}</strong></span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Deploy This Framework For Your Product
          </button>
        </div>
      </section>


      {/* ========================================================
          4. "AWARD-WINNING JOURNEY" / CAREER TIMELINE
          ======================================================== */}
      <section 
        id="career-journey" 
        aria-label="Career Milestones and Founder History"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-8 sm:p-12 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Career Milestones & Pedigree
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-display">
                My Career Journey: <br />
                <span className="text-amber-500">7-Year Founder Grit into Enterprise Big Data</span>
              </h2>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
            >
              <span>Read Full Founder Narrative</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

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

        </div>
      </section>


      {/* ========================================================
          5. FEATURED PROJECTS PREVIEW (Vertical Card Layout)
          ======================================================== */}
      <section 
        id="featured-projects" 
        aria-label="Featured Case Studies"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Proven Business Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-display">
              Featured Case Studies & <br />
              <span className="text-amber-500">Commercial Pipeline Results</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[var(--bg-card)] border border-[var(--border-strong)] hover:border-amber-400 text-[var(--text-primary)] transition-all cursor-pointer shadow-xs"
          >
            <span>View All 5 Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-8">
          {PROJECTS.filter(p => p.featured).map((proj) => (
            <article 
              key={proj.id}
              className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-amber-400/50 transition-all shadow-sm group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Summary, Tags & Challenge */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300">
                      {proj.categoryLabel}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-medium">
                      Client: <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-semibold">{proj.client}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-display group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {proj.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] px-2.5 py-0.5 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onNavigate('project-detail', proj.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      <span>Read Challenge, Solution & Impact Metrics</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/20 transition-colors shadow-xs"
                      >
                        <span>Live Article</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {proj.publishedArticleUrls && proj.publishedArticleUrls.length > 0 && (
                    <div className="pt-2 border-t border-[var(--border-subtle)] space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-amber-500" />
                        <span>Included Live Bylines ({proj.publishedArticleUrls.length}):</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.publishedArticleUrls.map((art, aIdx) => (
                          <a
                            key={aIdx}
                            href={art.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] hover:bg-amber-500/15 text-[var(--text-secondary)] hover:text-amber-500 border border-[var(--border-subtle)] transition-colors"
                          >
                            <span className="truncate max-w-[220px]">{art.title}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0 text-amber-500" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Key Metrics Bento Box */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                  {proj.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-0.5">
                      <span className="block text-[11px] text-[var(--text-muted)] font-medium leading-tight">
                        {m.label}
                      </span>
                      <span className="block text-xl font-extrabold text-amber-700 dark:text-amber-400 font-display">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </article>
          ))}
        </div>
      </section>


      {/* ========================================================
          6. "WHAT CLIENTS SAY" SNIPPET
          ======================================================== */}
      <section 
        id="client-testimonials-snippet" 
        aria-label="Client testimonials snippet"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-8 sm:p-12 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Endorsements & Peer Reviews
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-display mt-1">
                What Clients Say About My Work
              </h2>
            </div>

            <button
              onClick={() => onNavigate('testimonials')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
            >
              <span>View All 6 Client Testimonials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.slice(0, 2).map((test) => (
              <div 
                key={test.id} 
                className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] italic leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-[var(--text-primary)]">
                      {test.clientName}
                    </span>
                    <span className="block text-[11px] text-[var(--text-muted)]">
                      {test.clientRole}, {test.company}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/15 text-amber-700 dark:text-amber-300 font-semibold">
                    {test.highlightTag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
