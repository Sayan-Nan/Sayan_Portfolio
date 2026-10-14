import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Sparkles,
  Filter
} from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import { ViewMode } from '../types';

interface TestimonialsViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const TestimonialsView: React.FC<TestimonialsViewProps> = ({ onNavigate }) => {
  const [filterTag, setFilterTag] = useState<string>('all');

  const filterTags = ['all', 'Sprinklr Ecosystem Partner', 'Series B Tech Platform', 'EduTech Advisory Board', 'DevOps Platform Leader', 'FinTech Growth Team'];

  const filteredTestimonials = filterTag === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.highlightTag === filterTag);

  return (
    <article id="testimonials-page-root" className="w-full space-y-16 sm:space-y-24 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header Banner */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/20">
          <span>Executive Testimonials & Social Proof</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] font-display tracking-tight leading-tight">
          What Clients Say <br />
          <span className="text-amber-500">About My Work & Impact</span>
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          Verifiable feedback from VPs of Marketing, Heads of Growth Analytics, and Technical Founders who have deployed my copywriting and data models.
        </p>
      </section>

      {/* 2. Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[var(--border-subtle)]">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mr-2 flex items-center gap-1.5 shrink-0">
          <Filter className="w-3.5 h-3.5 text-amber-500" />
          <span>Category:</span>
        </span>
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterTag === tag
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-400'
            }`}
          >
            {tag === 'all' ? 'All Endorsements' : tag}
          </button>
        ))}
      </div>

      {/* 3. Masonry / Responsive Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((t) => (
          <div 
            key={t.id}
            className="p-6 sm:p-7 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-amber-400/50 transition-all shadow-xs flex flex-col justify-between space-y-6 group"
          >
            {/* Top: Stars, Tag & Quote */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-700 dark:text-amber-300 border border-amber-400/20">
                  {t.highlightTag}
                </span>
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-amber-500/15 absolute -top-3 -left-2 -z-0 pointer-events-none" />
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic relative z-10">
                  "{t.quote}"
                </p>
              </div>
            </div>

            {/* Bottom: Client Profile & Verified Project */}
            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-amber-400/40 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center text-xs font-mono">
                  {t.avatarText}
                </div>
                <div>
                  <span className="block text-sm font-bold text-[var(--text-primary)] font-display">
                    {t.clientName}
                  </span>
                  <span className="block text-[11px] text-[var(--text-muted)]">
                    {t.clientRole}, <strong>{t.company}</strong>
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5 bg-[var(--bg-secondary)] p-2 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">Engagement: {t.verifiedProject}</span>
              </div>
            </div>

          </div>
        ))}
      </section>

      {/* 4. Bottom Call To Action */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-display">
          Ready to Add Your Team's Success Story?
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          I provide dedicated capacity to a maximum of three enterprise clients per quarter to ensure deep immersion into your product and analytics.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md transition-all cursor-pointer"
          >
            <span>Initiate Project Discussion</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </article>
  );
};
