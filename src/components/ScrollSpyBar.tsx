import React, { useEffect, useRef } from 'react';
import { Compass, Sparkles, Layers } from 'lucide-react';
import { ViewMode } from '../types';

export interface SpySection {
  id: string;
  label: string;
  shortLabel: string;
  badge?: string;
}

export const ABOUT_SECTIONS: SpySection[] = [
  { id: 'about-overview', label: '01. Narrative Overview', shortLabel: '01. Overview' },
  { id: 'about-founder', label: '02. Founder Leadership', shortLabel: '02. Founder Story' },
  { id: 'about-copywriting', label: '03. B2B Enterprise Copy', shortLabel: '03. Enterprise Copy' },
  { id: 'about-neuromarketing', label: '04. Neuromarketing Framework', shortLabel: '04. Neuromarketing', badge: 'Core Moat' },
  { id: 'about-telemetry', label: '05. MIS & Data Telemetry', shortLabel: '05. MIS & Telemetry' },
  { id: 'about-education', label: '06. Education & Pedigree', shortLabel: '06. Education' },
  { id: 'about-publications', label: '07. Live Published Bylines', shortLabel: '07. Publications' },
  { id: 'about-skills', label: '08. Skills Radar Matrix', shortLabel: '08. Skills Radar' },
];

export const SERVICES_SECTIONS: SpySection[] = [
  { id: 'services-overview', label: '01. Services Overview', shortLabel: '01. Overview' },
  { id: 'service-b2b-seo-copywriting', label: '02. B2B SEO Copywriting', shortLabel: '02. B2B SEO Copy' },
  { id: 'service-marketing-data-analysis', label: '03. Marketing Data Analysis', shortLabel: '03. Data Analysis' },
  { id: 'service-content-architecture-cro', label: '04. Content Architecture & CRO', shortLabel: '04. Content & CRO' },
  { id: 'service-executive-bi-dashboards', label: '05. Executive BI & Dashboards', shortLabel: '05. Power BI & Dashboards' },
];

interface ScrollSpyBarProps {
  currentView: ViewMode;
  activeSectionId: string;
}

export const ScrollSpyBar: React.FC<ScrollSpyBarProps> = ({
  currentView,
  activeSectionId,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  const isSupportedView = currentView === 'about' || currentView === 'services';
  const sections = currentView === 'about' ? ABOUT_SECTIONS : SERVICES_SECTIONS;

  // Auto-scroll the active pill into view within the horizontal sub-bar ONLY when needed
  useEffect(() => {
    if (!isSupportedView) return;
    if (activeBtnRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeBtnRef.current;
      
      const containerLeft = container.scrollLeft;
      const containerRight = containerLeft + container.clientWidth;
      const buttonLeft = button.offsetLeft;
      const buttonRight = buttonLeft + button.offsetWidth;

      // Only scroll horizontally if the pill is actually outside or near edge of view zone
      if (buttonLeft < containerLeft + 24 || buttonRight > containerRight - 24) {
        const targetScrollLeft = buttonLeft - (container.clientWidth / 2) + (button.offsetWidth / 2);
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [activeSectionId, isSupportedView]);

  // Only render for 'about' and 'services' (returned AFTER all hooks have executed)
  if (!isSupportedView) {
    return null;
  }

  const handlePillClick = (sectionId: string) => {
    // If on services page, dispatch custom event to expand the selected accordion
    if (currentView === 'services' && sectionId.startsWith('service-')) {
      const rawServiceId = sectionId.replace('service-', '');
      window.dispatchEvent(new CustomEvent('expand-service-accordion', { detail: { serviceId: rawServiceId } }));
    }

    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      // Calculate position accounting for sticky header (~68px) + scrollspy subbar (~44px)
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - 118;
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside
      id="page-scrollspy-bar"
      aria-label="In-page section navigation"
      className="sticky top-16 sm:top-[68px] z-30 w-full bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-xs transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        
        {/* Left Section Label */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] shrink-0">
          <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" aria-hidden="true" />
          <span className="font-bold text-[var(--text-primary)]">
            {currentView === 'about' ? 'Narrative Index:' : 'Service Index:'}
          </span>
        </div>

        {/* Scrollable Section Pills */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full lg:w-auto"
        >
          {sections.map((section) => {
            const isActive = activeSectionId === section.id;
            const parts = section.shortLabel.split('. ');
            const hasNum = parts.length > 1;
            const num = hasNum ? parts[0] : null;
            const text = hasNum ? parts.slice(1).join('. ') : section.shortLabel;

            return (
              <button
                key={section.id}
                ref={isActive ? activeBtnRef : null}
                onClick={() => handlePillClick(section.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 flex items-center justify-center cursor-pointer shrink-0 border select-none ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-xs'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] border-[var(--border-subtle)]'
                }`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span>
                  {num && (
                    <span className={`font-mono mr-1 text-[11px] ${isActive ? 'text-neutral-950 font-bold opacity-85' : 'text-amber-500 font-semibold'}`}>
                      {num}.
                    </span>
                  )}
                  {text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Active Indicator Pill */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[var(--text-secondary)] font-semibold truncate max-w-[150px]">
            {sections.find(s => s.id === activeSectionId)?.shortLabel || 'Viewing Page'}
          </span>
        </div>

      </div>
    </aside>
  );
};
