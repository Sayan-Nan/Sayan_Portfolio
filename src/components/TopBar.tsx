import React from 'react';
import { Mail, Globe } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const TopBar: React.FC = () => {
  return (
    <aside 
      id="top-utility-bar" 
      aria-label="Utility navigation and availability status"
      className="w-full text-xs border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-2 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Availability & Location */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 font-medium">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[var(--text-primary)] font-semibold">{PERSONAL_INFO.availability}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[var(--text-muted)] border-l border-[var(--border-subtle)] pl-3">
            <Globe className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
            <span>{PERSONAL_INFO.location}</span>
          </div>
        </div>

        {/* Email Direct Contact */}
        <div className="flex items-center gap-4 ml-auto">
          <a
            id="topbar-email-link"
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-1.5 hover:text-[var(--accent-primary)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded px-1"
            title="Send email directly"
          >
            <Mail className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
            <span className="font-mono">{PERSONAL_INFO.email}</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

