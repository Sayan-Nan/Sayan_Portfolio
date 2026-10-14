import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Cpu, 
  BarChart3, 
  FileText, 
  ShieldCheck, 
  ChevronLeft,
  Briefcase,
  Terminal,
  Activity,
  CreditCard,
  Server
} from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { ViewMode } from '../types';
import { ServiceDetailSkeleton } from '../components/skeletons/ServiceDetailSkeleton';

export { ServiceDetailSkeleton };

interface ServiceDetailViewProps {
  serviceId?: string;
  onNavigate: (view: ViewMode, subId?: string) => void;
  isLoading?: boolean;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ serviceId, onNavigate, isLoading = false }) => {
  const [selectedId, setSelectedId] = useState<string>(serviceId || SERVICES[0].id);

  // Keep state synchronized whenever the serviceId prop changes (e.g., from header dropdown)
  useEffect(() => {
    if (serviceId) {
      setSelectedId(serviceId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [serviceId]);

  const handleSwitchService = (id: string) => {
    setSelectedId(id);
    onNavigate('service-detail', id);
  };

  if (isLoading) {
    return <ServiceDetailSkeleton />;
  }

  const currentService = SERVICES.find(s => s.id === selectedId) || SERVICES[0];

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'Server': return <Server className="w-5 h-5 text-amber-500" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-amber-500" />;
      case 'Database': return <BarChart3 className="w-5 h-5 text-amber-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-amber-500" />;
      default: return <Briefcase className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <article id="service-detail-root" className="w-full space-y-16 sm:space-y-24 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Top Navigation Bar to Switch Between Services */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
        <button
          onClick={() => onNavigate('services')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)] hover:text-amber-500 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </button>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
          <span className="text-xs font-semibold text-[var(--text-muted)] mr-1 hidden md:inline">Switch Service:</span>
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSwitchService(s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedId === s.id
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-400'
              }`}
            >
              {s.title.split(' ')[0]} {s.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Hero Header Layout with Graphic Container */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/20">
          <span>Service Deep Dive</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] font-display tracking-tight leading-tight">
          {currentService.title}
        </h1>

        <p className="text-base sm:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed font-medium">
          {currentService.subtitle}
        </p>

        {/* Visual Graphic Header / Banner Box */}
        <div className="w-full rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-amber-500/20 via-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-sm relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <div className="space-y-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Core Methodology & Standard
              </span>
              <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium leading-relaxed">
                {currentService.methodology}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-2 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Tech & Platforms
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentService.tools.map((t, idx) => (
                  <span key={idx} className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. "About this Service" Editorial */}
      <section className="space-y-4 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-display">
          About this Service
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          {currentService.fullDescription}
        </p>
      </section>

      {/* 4. "Services Include" Grid */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Comprehensive Scope
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-display">
            What This Service Includes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentService.features.map((feat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-amber-400/50 transition-all shadow-xs space-y-3"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs font-mono">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] font-display leading-snug">
                {feat}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Executed according to enterprise quality benchmarks, validated through search intent and behavioral data.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. "Top Industries I Cover" Grid */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Domain Specialization
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-display">
            Top Industries I Cover
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentService.industries.map((ind, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-amber-400/50 transition-all shadow-xs space-y-3"
            >
              <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] w-fit">
                {getIndustryIcon(ind.icon)}
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] font-display">
                {ind.name}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Client Deliverables Box & Call to Action */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-strong)] flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Immediate Next Step
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-display">
            Ready to deploy this capability for your product?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            I review your current content assets, database telemetry, and competitor landscape before proposing an exact timeline and deliverables package.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('contact', currentService.id)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-md text-center cursor-pointer"
          >
            Inquire About {currentService.title.split(' ')[0]}
          </button>
        </div>
      </section>

    </article>
  );
};
