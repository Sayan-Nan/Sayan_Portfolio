import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { ViewMode } from '../types';
import { SERVICES, PROJECTS } from '../data/portfolioData';

interface BreadcrumbProps {
  currentView: ViewMode;
  subId?: string;
  activeSectionTitle?: string;
  onNavigate: (view: ViewMode, subId?: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentView,
  subId,
  activeSectionTitle,
  onNavigate
}) => {
  // Never show breadcrumbs on homepage
  if (currentView === 'home') {
    return null;
  }

  // Resolve titles for deep detail views
  let currentDetailTitle = '';
  if (currentView === 'service-detail' && subId) {
    const srv = SERVICES.find(s => s.id === subId);
    currentDetailTitle = srv ? srv.title : 'Service Detail';
  } else if (currentView === 'project-detail' && subId) {
    const proj = PROJECTS.find(p => p.id === subId);
    currentDetailTitle = proj ? proj.title : 'Project Detail';
  }

  return (
    <nav
      id="site-breadcrumbs"
      aria-label="Breadcrumb navigation"
      className="w-full bg-[var(--bg-secondary)]/60 border-b border-[var(--border-subtle)] text-xs transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-1.5 flex-wrap font-medium">
        
        {/* Crumb 1: Home */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
          title="Return to Homepage"
        >
          <Home className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Home</span>
        </button>

        <ChevronRight className="w-3 h-3 text-[var(--text-muted)] shrink-0" aria-hidden="true" />

        {/* Crumb 2: Primary View */}
        {currentView === 'service-detail' ? (
          <>
            <button
              onClick={() => onNavigate('services')}
              className="text-[var(--text-muted)] hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Services
            </button>
            <ChevronRight className="w-3 h-3 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
            <span 
              className="text-amber-700 dark:text-amber-400 font-semibold truncate max-w-[220px] sm:max-w-md"
              aria-current="page"
            >
              {currentDetailTitle}
            </span>
          </>
        ) : currentView === 'project-detail' ? (
          <>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-[var(--text-muted)] hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <ChevronRight className="w-3 h-3 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
            <span 
              className="text-amber-700 dark:text-amber-400 font-semibold truncate max-w-[220px] sm:max-w-md"
              aria-current="page"
            >
              {currentDetailTitle}
            </span>
          </>
        ) : currentView === 'about' ? (
          <>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`${activeSectionTitle ? 'text-[var(--text-muted)] hover:text-amber-600 dark:hover:text-amber-400' : 'text-amber-700 dark:text-amber-400 font-semibold'} transition-colors cursor-pointer`}
              aria-current={!activeSectionTitle ? 'page' : undefined}
            >
              About Me
            </button>
            {activeSectionTitle && (
              <>
                <ChevronRight className="w-3 h-3 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
                <span 
                  className="text-amber-700 dark:text-amber-400 font-semibold truncate max-w-[220px] sm:max-w-md animate-in fade-in duration-150"
                  aria-current="page"
                >
                  {activeSectionTitle}
                </span>
              </>
            )}
          </>
        ) : currentView === 'services' ? (
          <>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`${activeSectionTitle ? 'text-[var(--text-muted)] hover:text-amber-600 dark:hover:text-amber-400' : 'text-amber-700 dark:text-amber-400 font-semibold'} transition-colors cursor-pointer`}
              aria-current={!activeSectionTitle ? 'page' : undefined}
            >
              Services
            </button>
            {activeSectionTitle && (
              <>
                <ChevronRight className="w-3 h-3 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
                <span 
                  className="text-amber-700 dark:text-amber-400 font-semibold truncate max-w-[220px] sm:max-w-md animate-in fade-in duration-150"
                  aria-current="page"
                >
                  {activeSectionTitle}
                </span>
              </>
            )}
          </>
        ) : (
          <span className="text-amber-700 dark:text-amber-400 font-semibold" aria-current="page">
            {currentView === 'portfolio' ? 'Case Studies & Portfolio' :
             currentView === 'testimonials' ? 'Executive Testimonials' :
             currentView === 'faqs' ? 'Frequently Asked Questions' :
             currentView === 'contact' ? 'Contact & Schedule Audit' :
             currentView === '404' ? '404 - Page Not Found' : currentView}
          </span>
        )}

      </div>
    </nav>
  );
};
