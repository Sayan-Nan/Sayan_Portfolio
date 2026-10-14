import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  ExternalLink, 
  Layers, 
  Palette, 
  PenTool, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowUpRight, 
  Sparkles, 
  Building2, 
  CreditCard, 
  Hotel, 
  Coins, 
  ChevronRight,
  Code2
} from 'lucide-react';
import { DEVELOPED_WEBSITES } from '../data/portfolioData';
import { DevelopedWebsite } from '../types';

interface DevelopedWebsitesSectionProps {
  className?: string;
  onSelectProject?: (projectId: string) => void;
  showSectionHeader?: boolean;
}

export const DevelopedWebsitesSection: React.FC<DevelopedWebsitesSectionProps> = ({
  className = '',
  onSelectProject,
  showSectionHeader = true,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedDivisions, setExpandedDivisions] = useState<Record<string, number>>({
    'vastara-trading-dubai': 0,
    'yu-pay-fintech-product': 0,
    'yogh-hospitality-suriname': 0,
    'veritas-bullion-trading': 0,
  });

  const handleCopyUrl = async (site: DevelopedWebsite, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(site.url);
      setCopiedId(site.id);
      setTimeout(() => setCopiedId(null), 2200);
    } catch {
      // Fallback
      setCopiedId(null);
    }
  };

  const filteredWebsites = useMemo(() => {
    if (activeFilter === 'all') return DEVELOPED_WEBSITES;
    return DEVELOPED_WEBSITES.filter(site => site.id === activeFilter);
  }, [activeFilter]);

  const getSiteIcon = (id: string) => {
    switch (id) {
      case 'vastara-trading-dubai':
        return <Building2 className="w-5 h-5 text-amber-500" />;
      case 'yu-pay-fintech-product':
        return <CreditCard className="w-5 h-5 text-emerald-500" />;
      case 'yogh-hospitality-suriname':
        return <Hotel className="w-5 h-5 text-amber-400" />;
      case 'veritas-bullion-trading':
        return <Coins className="w-5 h-5 text-amber-500" />;
      default:
        return <Globe className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section 
      id="developed-websites" 
      aria-label="Websites Developed: Architecture + UI/UX Design + Content & Copy"
      className={`scroll-mt-28 ${className}`}
    >
      {showSectionHeader && (
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Production Deliverables</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-display tracking-tight leading-tight">
            Websites Developed: Architecture + UI/UX Design + Content & Copy
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Four live, production-grade international digital properties engineered from initial concept to deployment—integrating comprehensive information architecture, bespoke UI/UX wireframes, and high-conversion B2B copy.
          </p>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-amber-700 text-white shadow-md shadow-amber-700/20 dark:bg-amber-600'
              : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)]'
          }`}
        >
          All Developed Websites ({DEVELOPED_WEBSITES.length})
        </button>

        {DEVELOPED_WEBSITES.map(site => (
          <button
            key={site.id}
            type="button"
            onClick={() => setActiveFilter(site.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeFilter === site.id
                ? 'bg-amber-700 text-white shadow-md shadow-amber-700/20 dark:bg-amber-600'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)]'
            }`}
          >
            {getSiteIcon(site.id)}
            <span>{site.brandName || site.title.split(':')[0]}</span>
          </button>
        ))}
      </div>

      {/* Website Cards Grid */}
      <div className="space-y-8">
        {filteredWebsites.map((site, index) => {
          const activeDivisionIdx = expandedDivisions[site.id] ?? 0;

          return (
            <article 
              key={site.id}
              className="group relative rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-amber-500/40 dark:hover:border-amber-500/30 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700" />

              <div className="p-6 sm:p-8 lg:p-10 space-y-8">
                
                {/* Header: Domain, Status & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {site.status}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-subtle)] px-2.5 py-1 rounded-lg border border-[var(--border-subtle)]">
                      <Globe className="w-3.5 h-3.5 text-amber-500" />
                      {site.domain}
                    </span>

                    <span className="text-xs font-medium text-[var(--text-secondary)] bg-amber-500/10 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {site.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleCopyUrl(site, e)}
                      aria-label={`Copy URL for ${site.title}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                    >
                      {copiedId === site.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Copied URL</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/visit inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-md hover:shadow-amber-900/20 active:scale-95 transition-all duration-300 shadow-xs cursor-pointer"
                    >
                      <span>Visit Live Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/visit:translate-x-1 group-hover/visit:-translate-y-1 group-hover/visit:scale-110 transition-all duration-300 ease-out" />
                    </a>
                  </div>
                </div>

                {/* Title & Core Meta */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      Project 0{index + 1} • {site.industry}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">•</span>
                    <span className="text-xs font-semibold text-[var(--text-primary)]">
                      {site.client}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-display tracking-tight">
                    {site.title}
                  </h3>

                  {/* Scope Badge Ribbon */}
                  <div className="inline-flex flex-wrap items-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                      <Layers className="w-3.5 h-3.5" />
                      Scope: {site.scope}
                    </span>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">
                      Role: {site.role}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pt-2">
                    {site.description}
                  </p>
                </div>

                {/* Interactive Divisions / Verticals Breakdown */}
                {site.divisionsOrFeatures && site.divisionsOrFeatures.length > 0 && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
                          Core Divisions & Product Features Unified
                        </span>
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">
                        Click tabs to inspect vertical architecture
                      </span>
                    </div>

                    {/* Division Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {site.divisionsOrFeatures.map((div, dIdx) => (
                        <button
                          key={div.name}
                          type="button"
                          onClick={() => setExpandedDivisions(prev => ({ ...prev, [site.id]: dIdx }))}
                          className={`p-3 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                            activeDivisionIdx === dIdx
                              ? 'bg-[var(--bg-card)] border-amber-500 shadow-sm ring-1 ring-amber-500/30'
                              : 'bg-[var(--bg-card)]/50 hover:bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                              0{dIdx + 1}
                            </span>
                            {activeDivisionIdx === dIdx && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            )}
                          </div>
                          <p className={`text-xs font-semibold leading-tight line-clamp-1 ${
                            activeDivisionIdx === dIdx ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                          }`}>
                            {div.name}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Active Division Description Detail */}
                    <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[var(--text-primary)] font-semibold">
                          {site.divisionsOrFeatures[activeDivisionIdx]?.name}:
                        </strong>{' '}
                        {site.divisionsOrFeatures[activeDivisionIdx]?.description}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3 Pillar Execution Matrix: Architecture, UI/UX, Content & Copy */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  
                  {/* Pillar 1: Information Architecture */}
                  <div className="p-5 rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <Layers className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-mono">
                        1. Architecture (IA)
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                      {site.architectureHighlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pillar 2: UI/UX Design Systems */}
                  <div className="p-5 rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <Palette className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-mono">
                        2. UI/UX Design
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                      {site.uxDesignHighlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pillar 3: Content & Copywriting */}
                  <div className="p-5 rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <PenTool className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-mono">
                        3. Content & Copy
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                      {site.copyHighlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech & Disciplines Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1 mr-1">
                    <Code2 className="w-3.5 h-3.5" />
                    Deliverables:
                  </span>
                  {site.techStack.map(tag => (
                    <span 
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics Bar & Direct Launch CTA */}
                <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  {/* Metrics Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-auto">
                    {site.metrics.map(metric => (
                      <div key={metric.label} className="space-y-0.5">
                        <span className="block text-xs text-[var(--text-muted)] font-mono">
                          {metric.label}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-display">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    {onSelectProject && (
                      <button
                        type="button"
                        onClick={() => onSelectProject(site.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-[var(--text-primary)] bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                      >
                        Inspect Case Study
                      </button>
                    )}

                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Launch ${site.brandName || site.domain} (opens live website in new tab)`}
                      className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 transition-all duration-300 active:scale-[0.98] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
                    >
                      <span>Launch {site.brandName || site.domain}</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-all duration-300 ease-out group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 group-hover/btn:scale-110" />
                    </a>
                  </div>
                </div>

              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
