import React, { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Filter,
  X,
  ChevronsUpDown
} from 'lucide-react';
import { FAQS } from '../data/portfolioData';
import { ViewMode } from '../types';

interface FaqViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'faq-1': true, // first one open by default
  });

  const categories = ['all', 'General', 'Services', 'Work Process', 'Analytics & Python'];

  const toggleFaq = (id: string) => {
    setOpenFaqIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const allFilteredOpen = filteredFaqs.length > 0 && filteredFaqs.every(f => openFaqIds[f.id]);

  const toggleExpandAll = () => {
    if (allFilteredOpen) {
      setOpenFaqIds({});
    } else {
      const newOpen: Record<string, boolean> = {};
      filteredFaqs.forEach(f => {
        newOpen[f.id] = true;
      });
      setOpenFaqIds(newOpen);
    }
  };

  return (
    <article id="faqs-page-root" className="w-full space-y-16 sm:space-y-24 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* 1. Header with exact design text styling: "Question? Look here" */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/20">
          <span>Clarity & Engagement Terms</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] font-display tracking-tight leading-tight">
          Questions? <br />
          <span className="text-amber-500 underline decoration-amber-400/60 decoration-wavy decoration-2">
            Look here.
          </span>
        </h1>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
          Transparent answers on the hybrid data analyst and enterprise B2B copywriting workflow, timelines, technical tooling, and revision standards.
        </p>
      </section>

      {/* 2. Interactive Search & Category Filter Controls */}
      <div className="space-y-4">
        {/* Search Input Bar with Clear Button */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            id="faq-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., Python, Sprinklr, timeline, Power BI, retainers)..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-amber-500 focus:outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] shadow-xs transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills & Expand/Collapse All Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mr-1 shrink-0">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                    : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-400'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-[var(--text-muted)]">
            <span>Showing {filteredFaqs.length} of {FAQS.length} FAQs</span>
            {filteredFaqs.length > 0 && (
              <button
                onClick={toggleExpandAll}
                className="inline-flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
              >
                <ChevronsUpDown className="w-3.5 h-3.5" />
                <span>{allFilteredOpen ? 'Collapse All' : 'Expand All'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Accordion List */}
      <section className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
            <HelpCircle className="w-8 h-8 text-[var(--text-muted)] mx-auto" />
            <h3 className="text-base font-bold text-[var(--text-primary)] font-display">No matching questions found</h3>
            <p className="text-xs text-[var(--text-secondary)]">Try another keyword or reach out directly.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="text-xs text-amber-500 font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openFaqIds[faq.id];

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen 
                    ? 'bg-[var(--bg-card)] border-amber-500/60 shadow-md ring-1 ring-amber-500/10' 
                    : 'bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-amber-400/50 shadow-xs'
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] font-display leading-snug">
                      {faq.question}
                    </h2>
                  </div>

                  <div className={`p-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shrink-0 transition-transform duration-200 mt-1 ${
                    isOpen ? 'rotate-180 text-amber-500' : 'text-[var(--text-muted)]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Collapsible Content */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-[var(--border-subtle)] space-y-4 animate-in fade-in duration-200">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {faq.answer}
                    </p>

                    {faq.keyTakeaway && (
                      <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border-l-4 border-amber-500 flex items-start gap-2.5 text-xs text-[var(--text-primary)]">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Key Takeaway: </strong>
                          <span>{faq.keyTakeaway}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* 4. Bottom Support Card */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-xl font-bold text-[var(--text-primary)] font-display">
            Have a question not answered here?
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Send me a direct message and I’ll get back to you with candid answers within 12 hours.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
        >
          Ask Sayan Directly
        </button>
      </section>

    </article>
  );
};
