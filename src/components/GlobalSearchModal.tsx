import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  BookOpen, 
  Briefcase, 
  Cpu, 
  ExternalLink, 
  ArrowRight, 
  Command, 
  CornerDownLeft,
  Sparkles,
  Tag
} from 'lucide-react';
import { PROJECTS, PUBLISHED_ARTICLES, SERVICES } from '../data/portfolioData';
import { ViewMode } from '../types';
import { highlightText, matchesSearch } from '../utils/searchUtils';
import { modalBackdropVariants, modalCardVariants } from '../animations/modalMotion';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode, subId?: string) => void;
}

type SearchTab = 'all' | 'projects' | 'articles' | 'services';

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTab>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Close on Escape & handle global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Compute matching results across Projects, Articles, Services
  const matchingProjects = useMemo(() => {
    if (!query.trim() && activeTab !== 'projects') return [];
    return PROJECTS.filter(proj => {
      const fields = [
        proj.title,
        proj.client,
        proj.summary,
        proj.challenge,
        proj.solution,
        proj.impact,
        ...proj.technologies,
        ...proj.tags
      ];
      return matchesSearch(fields, query);
    });
  }, [query, activeTab]);

  const matchingArticles = useMemo(() => {
    if (!query.trim() && activeTab !== 'articles') return [];
    return PUBLISHED_ARTICLES.filter(art => {
      const fields = [
        art.title,
        art.description,
        art.publication,
        art.category,
        art.targetAudience,
        ...art.keyTopics
      ];
      return matchesSearch(fields, query);
    });
  }, [query, activeTab]);

  const matchingServices = useMemo(() => {
    if (!query.trim() && activeTab !== 'services') return [];
    return SERVICES.filter(srv => {
      const fields = [
        srv.title,
        srv.subtitle,
        srv.summary,
        srv.fullDescription,
        ...srv.deliverables,
        ...srv.tools,
        ...srv.features
      ];
      return matchesSearch(fields, query);
    });
  }, [query, activeTab]);

  // Combined active results list for keyboard navigation
  const results = useMemo(() => {
    const list: Array<{
      type: 'project' | 'article' | 'service';
      id: string;
      title: string;
      subtitle: string;
      badge: string;
      url?: string;
      viewMode?: ViewMode;
      subId?: string;
    }> = [];

    if (activeTab === 'all' || activeTab === 'projects') {
      matchingProjects.forEach(p => {
        list.push({
          type: 'project',
          id: `proj-${p.id}`,
          title: p.title,
          subtitle: `${p.client} • ${p.categoryLabel}`,
          badge: 'Case Study',
          viewMode: 'project-detail',
          subId: p.id
        });
      });
    }

    if (activeTab === 'all' || activeTab === 'articles') {
      matchingArticles.forEach(a => {
        list.push({
          type: 'article',
          id: `art-${a.id}`,
          title: a.title,
          subtitle: `${a.publication} • ${a.category} (${a.readTime})`,
          badge: 'Blog / Publication',
          url: a.url
        });
      });
    }

    if (activeTab === 'all' || activeTab === 'services') {
      matchingServices.forEach(s => {
        list.push({
          type: 'service',
          id: `srv-${s.id}`,
          title: s.title,
          subtitle: s.subtitle || s.summary,
          badge: 'Service',
          viewMode: 'service-detail',
          subId: s.id
        });
      });
    }

    return list;
  }, [matchingProjects, matchingArticles, matchingServices, activeTab]);

  // Handle arrow key navigation & Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  const handleSelect = (item: typeof results[0]) => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.viewMode) {
      onNavigate(item.viewMode, item.subId);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="global-search-backdrop"
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-neutral-950/80 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div 
            key="global-search-card"
            variants={modalCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] my-auto"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Top Search Input Bar */}
        <div className="relative flex items-center border-b border-[var(--border-subtle)] px-4 py-3.5 bg-[var(--bg-card)]">
          <Search className="w-5 h-5 text-amber-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            maxLength={100}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value.slice(0, 100));
              setSelectedIndex(0);
            }}
            placeholder="Type keywords (e.g. 'Python', 'Sprinklr', 'Payments', 'AI', 'DAX')..."
            className="w-full bg-transparent text-sm sm:text-base text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
            aria-label="Omni search input"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
              }}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-md cursor-pointer mr-2"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Tab Filters Inside Modal */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            All Content
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'projects'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            <span>Case Studies ({PROJECTS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'articles'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Blog & Bylines ({PUBLISHED_ARTICLES.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'services'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Cpu className="w-3 h-3" />
            <span>Services ({SERVICES.length})</span>
          </button>
        </div>

        {/* Search Results List */}
        <div 
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-[var(--border-subtle)]"
        >
          {results.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-[var(--text-muted)] mx-auto opacity-50" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {query ? `No results found for "${query}"` : 'Type a query to search across all case studies & articles'}
              </p>
              <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
                Try searching for "Sprinklr", "Python", "Power BI", "Instant Payments", or "Healthcare".
              </p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-amber-500/15 border border-amber-500/30' 
                      : 'hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      item.type === 'project' 
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                        : item.type === 'article' 
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    }`}>
                      {item.type === 'project' ? (
                        <Briefcase className="w-4 h-4" />
                      ) : item.type === 'article' ? (
                        <BookOpen className="w-4 h-4" />
                      ) : (
                        <Cpu className="w-4 h-4" />
                      )}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                          {item.badge}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">
                          {highlightText(item.title, query)}
                        </h4>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] truncate">
                        {highlightText(item.subtitle, query)}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                    {item.url ? (
                      <ExternalLink className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer with Keyboard Shortcuts */}
        <div className="px-4 py-2.5 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-[10px]">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-[10px]">↵</kbd>
              <span>to open</span>
            </span>
          </div>
          <span>
            {results.length} result{results.length === 1 ? '' : 's'} found
          </span>
        </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
