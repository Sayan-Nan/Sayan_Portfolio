import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BarChart3, 
  Database, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight,
  Filter,
  ExternalLink,
  BookOpen,
  Globe,
  Layers
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ViewMode } from '../types';
import { PublishedArticlesSection } from '../components/PublishedArticlesSection';
import { DevelopedWebsitesSection } from '../components/DevelopedWebsitesSection';

interface ProjectsViewProps {
  onNavigate: (view: ViewMode, subId?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Case Studies', count: PROJECTS.length },
    { id: 'web-development', label: 'Web Architecture & UI/UX', count: PROJECTS.filter(p => p.category === 'web-development').length },
    { id: 'b2b-saas', label: 'B2B SaaS Copywriting', count: PROJECTS.filter(p => p.category === 'b2b-saas').length },
    { id: 'analytics', label: 'Big Data & Python Analytics', count: PROJECTS.filter(p => p.category === 'analytics').length },
    { id: 'growth', label: 'Founder & Growth Modeling', count: PROJECTS.filter(p => p.category === 'growth').length },
    { id: 'architecture', label: 'Content Architecture & CRO', count: PROJECTS.filter(p => p.category === 'architecture').length },
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <article id="portfolio-page-root" className="w-full space-y-16 sm:space-y-24 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header Banner */}
      <section className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/25 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Proven Enterprise Track Record, Live Websites & Public Bylines</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] font-display tracking-tight leading-tight">
          Live Developed Websites, <br />
          <span className="text-amber-500">Published Bylines & Case Studies</span>
        </h1>
        
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          Direct, verifiable proof of work ready for recruitment review. Explore <strong>4 live enterprise web platforms</strong> developed end-to-end (Architecture + UI/UX + Copy), <strong>12 live published articles</strong> authored for global industry leaders (<span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">Sprinklr</span>, <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">YU-Pay</span>, <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">BestDoc</span>), and exhaustive quantitative case studies.
        </p>

        {/* Quick Jump Navigation Anchors */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#developed-websites"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-all shadow-xs cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-950" />
            <span>1. Developed Websites (4 Live Platforms)</span>
          </a>
          <a
            href="#live-articles"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>2. Live Bylines (12 Articles)</span>
          </a>
          <a
            href="#case-studies"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-all cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
            <span>3. Strategic Case Studies</span>
          </a>
        </div>
      </section>

      {/* 2. Priority Section 1: Live Developed Websites (Architecture + UI/UX Design + Content & Copy) */}
      <section id="developed-websites" className="scroll-mt-24 pt-4 border-t border-[var(--border-subtle)]">
        <DevelopedWebsitesSection onSelectProject={(id) => onNavigate('project-detail', id)} />
      </section>

      {/* 3. Priority Section 2: Live Published Articles & Bylines */}
      <section id="live-articles" className="scroll-mt-24 pt-12 border-t border-[var(--border-subtle)]">
        <PublishedArticlesSection showFilters={true} />
      </section>

      {/* 4. Transition Divider & Case Studies Header */}
      <section id="case-studies" className="scroll-mt-24 pt-12 border-t border-[var(--border-subtle)] space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Full-Funnel Strategy & Attribution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-display tracking-tight">
              In-Depth Strategic Case Studies
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Discover the engineering rigor, Python SERP telemetry, and pipeline attribution models that powered these results.
            </p>
          </div>

          <div className="text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] shrink-0">
            Showing {filteredProjects.length} of {PROJECTS.length} Case Studies
          </div>
        </div>

        {/* Interactive Category Filter Bar */}
        <div className="space-y-2 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mr-2 flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-amber-500" />
              <span>Filter By:</span>
            </span>
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === opt.id
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                    : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-400 hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{opt.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeFilter === opt.id ? 'bg-neutral-950/20 text-neutral-950' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                }`}>
                  {opt.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Vertical Card Layout for Projects */}
      <section className="space-y-8">
        {filteredProjects.map((proj) => (
          <article 
            key={proj.id}
            className="p-6 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-amber-400/50 transition-all shadow-sm group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Project Overview, Tags & Story */}
              <div className="lg:col-span-8 space-y-4">
                
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300">
                    {proj.categoryLabel}
                  </span>
                  {proj.scope && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      Scope: {proj.scope}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-[var(--text-muted)]">
                    Client: <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-semibold">{proj.client}</span>
                  </span>
                  <span className="text-xs text-[var(--text-muted)] hidden sm:inline">&bull;</span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">{proj.duration}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-display group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {proj.title}
                </h2>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {proj.summary}
                </p>

                {/* Tags including Big Data, Python, B2B SaaS */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
                        tag.toLowerCase().includes('python') || tag.toLowerCase().includes('data') || tag.toLowerCase().includes('power bi')
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300'
                          : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Challenge & Solution Summary Preview */}
                <div className="pt-4 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
                  <div className="space-y-1">
                    <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider text-[10px] block text-amber-600 dark:text-amber-400">
                      The Challenge
                    </span>
                    <p className="line-clamp-2 leading-relaxed">
                      {proj.challenge}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider text-[10px] block text-amber-600 dark:text-amber-400">
                      The Impact
                    </span>
                    <p className="line-clamp-2 leading-relaxed">
                      {proj.impact}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate('project-detail', proj.id)}
                    className="group/study inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-xs hover:shadow-md hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                  >
                    <span>Read Full Case Study (Challenge, Solution & Impact)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-950 transition-all duration-300 ease-out group-hover/study:translate-x-1.5 group-hover/study:scale-110" aria-hidden="true" />
                  </button>

                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/ext inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/20 shadow-xs hover:shadow-md hover:shadow-amber-500/15 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                    >
                      <span>{proj.category === 'web-development' ? 'Visit Live Website' : 'Read Live Publication'}</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-all duration-300 ease-out group-hover/ext:translate-x-1 group-hover/ext:-translate-y-1 group-hover/ext:scale-110" aria-hidden="true" />
                    </a>
                  )}
                </div>

                {proj.publishedArticleUrls && proj.publishedArticleUrls.length > 0 && (
                  <div className="pt-3 pb-1">
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Includes {proj.publishedArticleUrls.length} Live Published Bylines:</span>
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-card)] px-2 py-0.5 rounded-full border border-[var(--border-subtle)]">
                          Verified Public URLs
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {proj.publishedArticleUrls.map((art, aIdx) => (
                          <a
                            key={aIdx}
                            href={art.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/bylinelink inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-[var(--bg-card)] hover:bg-amber-500 hover:text-neutral-950 text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-amber-400/60 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 font-medium shadow-xs hover:shadow-sm hover:shadow-amber-500/20 cursor-pointer"
                          >
                            <span className="truncate max-w-[220px] sm:max-w-[280px]">{art.title}</span>
                            <ExternalLink className="w-3 h-3 shrink-0 text-amber-500 group-hover/bylinelink:text-neutral-950 transition-all duration-300 ease-out group-hover/bylinelink:translate-x-0.5 group-hover/bylinelink:-translate-y-0.5 group-hover/bylinelink:scale-110" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Key Quantitative Metrics Bento Box */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block border-b border-[var(--border-subtle)] pb-2">
                  Audited Project Metrics
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {proj.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-0.5">
                      <span className="block text-[11px] text-[var(--text-muted)] font-medium leading-tight">
                        {m.label}
                      </span>
                      <span className="block text-xl font-extrabold text-[var(--text-primary)] font-display text-amber-600 dark:text-amber-400">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-xs space-y-1 text-[var(--text-muted)]">
                  <span className="block font-semibold text-[var(--text-secondary)] text-[11px]">Key Tech Used:</span>
                  <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                    {proj.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] text-[10px]">
                        +{proj.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </article>
        ))}
      </section>

      {/* 5. Bottom Project Inquiries Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-display">
            Have a Similar Growth Challenge?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl">
            Let's evaluate your marketing analytics and organic content architecture against these enterprise case studies.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="group/inquiry inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <span>Discuss Your Project Scope</span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-950 transition-all duration-300 ease-out group-hover/inquiry:translate-x-1.5 group-hover/inquiry:scale-110" aria-hidden="true" />
        </button>
      </section>

    </article>
  );
};
