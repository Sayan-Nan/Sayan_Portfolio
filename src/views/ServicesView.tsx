import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  FileText, 
  BarChart3, 
  Layout, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight
} from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { ViewMode } from '../types';

interface ServicesViewProps {
  onNavigate: (view: ViewMode, subId?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onNavigate }) => {
  const [expandedServiceId, setExpandedServiceId] = useState<string>(SERVICES[0].id);

  // Auto-expand service accordion when triggered by scroll-spy pill or navigation
  useEffect(() => {
    const handleExpand = (e: Event) => {
      const customEvent = e as CustomEvent<{ serviceId: string }>;
      if (customEvent.detail?.serviceId) {
        setExpandedServiceId(customEvent.detail.serviceId);
      }
    };

    window.addEventListener('expand-service-accordion', handleExpand);
    return () => window.removeEventListener('expand-service-accordion', handleExpand);
  }, []);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'b2b-seo-copywriting': return <FileText className="w-6 h-6 text-amber-500" />;
      case 'marketing-data-analysis': return <BarChart3 className="w-6 h-6 text-amber-500" />;
      case 'content-architecture-cro': return <Layout className="w-6 h-6 text-amber-500" />;
      default: return <Cpu className="w-6 h-6 text-amber-500" />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedServiceId(prev => prev === id ? '' : id);
  };

  return (
    <article id="services-hub-root" className="w-full space-y-16 sm:space-y-24 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header Banner */}
      <section id="services-overview" className="space-y-4 max-w-3xl scroll-mt-36">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/20">
          <span>Comprehensive Service Offerings</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] font-display tracking-tight leading-tight">
          How I Bring Ideas to Life: <br />
          <span className="text-amber-500">Quantitative Marketing & B2B Content</span>
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          I do not offer superficial blog writing or disconnected BI dashboards. Every service below is built to bridge the gap between technical data intelligence and enterprise buyer conversion.
        </p>
      </section>

      {/* 2. Expandable Services List ("How I Bring Ideas to Life" Layout) */}
      <section className="space-y-6">
        {SERVICES.map((srv, idx) => {
          const isExpanded = expandedServiceId === srv.id;

          return (
            <div 
              key={srv.id}
              id={`service-${srv.id}`}
              className={`rounded-3xl border transition-all overflow-hidden scroll-mt-36 ${
                isExpanded 
                  ? 'bg-[var(--bg-card)] border-amber-500/60 shadow-md' 
                  : 'bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-amber-400/50 shadow-xs'
              }`}
            >
              {/* Service Accordion Header Bar */}
              <button
                onClick={() => toggleExpand(srv.id)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                    {getServiceIcon(srv.id)}
                  </div>
                  <div>
                    <span className="block text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      Service 0{idx + 1}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-display mt-0.5">
                      {srv.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-1 mt-1 hidden sm:block">
                      {srv.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 hidden md:inline">
                    {isExpanded ? 'Collapse' : 'Explore Details'}
                  </span>
                  <div className={`p-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] transition-transform duration-200 ${isExpanded ? 'rotate-180 text-amber-500' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Expanded Details Body */}
              {isExpanded && (
                <div className="px-6 pb-8 sm:px-8 sm:pb-8 pt-2 border-t border-[var(--border-subtle)] space-y-8 animate-in fade-in duration-200">
                  
                  {/* Detailed Description */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Strategic Focus & Execution
                    </span>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {srv.fullDescription}
                    </p>
                  </div>

                  {/* Two Column Grid: Scope & Deliverables */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* What is Included */}
                    <div className="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                        Core Capabilities Included
                      </span>
                      <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                        {srv.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What You Receive */}
                    <div className="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                        Tangible Client Deliverables
                      </span>
                      <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                        {srv.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Tools & Methodology Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[var(--text-muted)]">Tech Stack & Tools:</span>
                      {srv.tools.map((t, tIdx) => (
                        <span key={tIdx} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onNavigate('service-detail', srv.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors cursor-pointer"
                      >
                        <span>View Full Service Page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onNavigate('contact', srv.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                      >
                        <span>Request Custom Scope</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* 3. Bottom CTA Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-display">
          Need a Custom Hybrid Engagement?
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Many enterprise clients require both a content overhaul and a Power BI analytics tracking model. We can assemble a tailored sprint package matching your stack.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md transition-all cursor-pointer"
          >
            <span>Book a 30-Minute Architecture Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </article>
  );
};
