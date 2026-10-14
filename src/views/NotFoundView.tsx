import React from 'react';
import { ArrowLeft, Home, Compass, FileText, HelpCircle, Mail, Sparkles } from 'lucide-react';
import { ViewMode } from '../types';

interface NotFoundViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  return (
    <div id="not-found-page-root" className="w-full min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="w-full text-center p-8 sm:p-14 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-8 shadow-sm">
        
        {/* Error Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/20">
          <span>HTTP 404 &bull; NULL PIPELINE EXCEPTION</span>
        </div>

        {/* Big 404 Number */}
        <div className="space-y-2">
          <div className="text-7xl sm:text-9xl font-black text-amber-500 font-display tracking-tight leading-none select-none">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-display">
            Oops! This Data Node Does Not Exist.
          </h1>
        </div>

        {/* Clever Neuromarketing Error Copy */}
        <div className="max-w-xl mx-auto space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            In neuromarketing, unfulfilled search intent triggers cognitive friction and buyer fatigue. Even the most calibrated Python scrapers occasionally hit an unexpected dead-end URL.
          </p>
          <p className="text-xs text-[var(--text-muted)] italic">
            Don't let cognitive dissonance disrupt your session velocity. Redirect your trajectory to high-converting content below.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            id="not-found-home-cta"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-neutral-950" />
            <span>Go to Home Page</span>
          </button>

          <button
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span>View Case Studies</span>
          </button>
        </div>

        {/* Quick Navigation Pills */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-[var(--text-muted)]">Alternate destinations:</span>
          <button
            onClick={() => onNavigate('about')}
            className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
          >
            Founder Story
          </button>
          <span className="text-[var(--text-muted)]">&bull;</span>
          <button
            onClick={() => onNavigate('services')}
            className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
          >
            Services Hub
          </button>
          <span className="text-[var(--text-muted)]">&bull;</span>
          <button
            onClick={() => onNavigate('faqs')}
            className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
          >
            FAQs
          </button>
          <span className="text-[var(--text-muted)]">&bull;</span>
          <button
            onClick={() => onNavigate('contact')}
            className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
          >
            Let's Talk
          </button>
        </div>

      </div>
    </div>
  );
};
