import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  ArrowRight, 
  BarChart3, 
  FileText, 
  Layout, 
  Cpu,
  Sparkles,
  Search
} from 'lucide-react';
import { ViewMode } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SERVICES, PERSONAL_INFO } from '../data/portfolioData';
import { ReadingProgressBar } from './ReadingProgressBar';

interface HeaderProps {
  currentView: ViewMode;
  activeSectionId?: string;
  onNavigate: (view: ViewMode, subId?: string) => void;
  onOpenSearch?: () => void;
  onOpenInquiryModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onNavigate,
  onOpenSearch,
  onOpenInquiryModal
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on view change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesExpanded(false);
  }, [currentView]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  // Primary desktop nav links - streamlined for spacious, airy hierarchy
  const desktopNavLinks = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services', hasDropdown: true },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faqs', label: 'FAQs' },
  ];

  // Mobile drawer links
  const mobileNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'services', label: 'Services', hasDropdown: true },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId as ViewMode);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'b2b-seo-copywriting':
        return (
          <FileText className="w-4 h-4 text-amber-500 animate-service-sway group-hover:animate-none group-hover:-translate-y-1 group-hover:-rotate-8 group-hover:scale-115 group-hover:text-amber-400 transition-all duration-300 ease-out" />
        );
      case 'marketing-data-analysis':
        return (
          <BarChart3 className="w-4 h-4 text-amber-500 animate-service-pulse group-hover:animate-none group-hover:-translate-y-1 group-hover:scale-120 group-hover:text-amber-400 transition-all duration-300 ease-out" />
        );
      case 'content-architecture-cro':
        return (
          <Layout className="w-4 h-4 text-amber-500 animate-service-float group-hover:animate-none group-hover:-translate-y-1 group-hover:rotate-8 group-hover:scale-115 group-hover:text-amber-400 transition-all duration-300 ease-out" />
        );
      default:
        return (
          <Cpu className="w-4 h-4 text-amber-500 animate-service-pulse group-hover:animate-none group-hover:rotate-90 group-hover:scale-115 group-hover:text-amber-400 transition-all duration-300 ease-out" />
        );
    }
  };

  return (
    <header 
      id="main-site-header"
      className="sticky top-0 z-40 w-full bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center">
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="group text-left flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl p-1 cursor-pointer select-none"
            aria-label="Sayan Nan Homepage"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-neutral-950 font-extrabold text-sm sm:text-base tracking-wider shadow-sm font-display group-hover:scale-105 transition-transform shrink-0">
              SN
            </div>
            <div>
              <span className="block text-base sm:text-lg font-extrabold tracking-tight text-[var(--text-primary)] font-display group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-none">
                Sayan Nan
              </span>
              <span className="block text-[10px] sm:text-[11px] font-medium text-[var(--text-muted)] tracking-wide mt-1 leading-none">
                B2B Copywriter &middot; Data Analyst
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links - Clean, spacious typography without cramped pill clusters */}
        <nav 
          id="desktop-navigation" 
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {desktopNavLinks.map((item) => {
            const isActive = currentView === item.id || 
              (item.id === 'services' && currentView === 'service-detail') ||
              (item.id === 'portfolio' && currentView === 'project-detail');

            if (item.hasDropdown) {
              return (
                <div 
                  key={item.id} 
                  className="relative py-2" 
                  ref={dropdownRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    id="nav-services-dropdown-btn"
                    onClick={() => setServicesDropdownOpen((prev) => !prev)}
                    className={`relative py-1 text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isActive 
                        ? 'text-amber-600 dark:text-amber-400 font-bold' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                    aria-expanded={servicesDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-amber-500' : 'text-[var(--text-muted)]'}`} />
                    
                    {/* Subtle, elegant active indicator */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                    )}
                  </button>

                  {/* Services Megamenu */}
                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                        <motion.div 
                          id="services-mega-dropdown"
                          initial={{ opacity: 0, y: -8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ 
                            duration: 0.22, 
                            ease: [0.16, 1, 0.3, 1] 
                          }}
                          className={`w-92 border rounded-2xl shadow-2xl overflow-hidden transition-colors ${
                            isDark 
                              ? 'bg-[#181615] border-neutral-800 shadow-black/80 ring-1 ring-white/10' 
                              : 'bg-white border-neutral-200/90 shadow-neutral-900/15 ring-1 ring-black/5'
                          }`}
                          role="menu"
                        >
                          <div 
                            className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider border-b flex items-center justify-between ${
                              isDark 
                                ? 'bg-[#201E1B] border-neutral-800 text-neutral-400' 
                                : 'bg-[#F9F7F4] border-neutral-200/90 text-neutral-600'
                            }`}
                          >
                            <span>Core Competencies & Services</span>
                            <Sparkles className="w-3 h-3 text-amber-500" />
                          </div>
                          <div className={`p-2 space-y-1 ${isDark ? 'bg-[#181615]' : 'bg-white'}`}>
                            {SERVICES.map((srv) => (
                              <button
                                key={srv.id}
                                onClick={() => {
                                  onNavigate('service-detail', srv.id);
                                  setServicesDropdownOpen(false);
                                }}
                                className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 group cursor-pointer border transform hover:scale-[1.018] hover:translate-x-1 ${
                                  isDark 
                                    ? 'border-transparent hover:border-amber-500/30 hover:bg-amber-500/15 hover:shadow-md hover:shadow-black/40' 
                                    : 'border-transparent hover:border-amber-400/40 hover:bg-amber-500/[0.08] hover:shadow-xs hover:shadow-amber-950/5'
                                }`}
                                role="menuitem"
                              >
                                <div 
                                  className={`relative p-2 rounded-lg border transition-all duration-300 shrink-0 transform group-hover:scale-110 group-hover:-rotate-2 ${
                                    isDark 
                                      ? 'bg-neutral-800 border-neutral-700 group-hover:border-amber-400/60 group-hover:bg-amber-500/25 group-hover:shadow-md group-hover:shadow-amber-500/10' 
                                      : 'bg-[#F5F2EB] border-neutral-200 group-hover:border-amber-400/70 group-hover:bg-amber-100/90 group-hover:shadow-sm group-hover:shadow-amber-900/5'
                                  }`}
                                >
                                  {/* Ambient backlight glow on hover */}
                                  <span 
                                    className="absolute inset-0 rounded-lg bg-amber-400/0 group-hover:bg-amber-400/25 blur-[3px] transition-all duration-300 pointer-events-none -z-10" 
                                    aria-hidden="true" 
                                  />
                                  {getServiceIcon(srv.id)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span 
                                    className={`block text-xs font-bold transition-colors truncate ${
                                      isDark 
                                        ? 'text-neutral-100 group-hover:text-amber-400' 
                                        : 'text-neutral-900 group-hover:text-amber-600'
                                    }`}
                                  >
                                    {srv.title}
                                  </span>
                                  <span 
                                    className={`block text-[11px] line-clamp-1 mt-0.5 transition-colors ${
                                      isDark ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-neutral-600 group-hover:text-neutral-700'
                                    }`}
                                  >
                                    {srv.summary}
                                  </span>
                                </div>
                                <ChevronRight 
                                  className="w-3.5 h-3.5 text-amber-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" 
                                  aria-hidden="true"
                                />
                              </button>
                            ))}
                          </div>
                          <div 
                            className={`p-3 border-t flex items-center justify-between ${
                              isDark 
                                ? 'bg-[#201E1B] border-neutral-800 text-neutral-400' 
                                : 'bg-[#F9F7F4] border-neutral-200/90 text-neutral-600'
                            }`}
                          >
                            <span className="text-[11px] font-medium">Looking for all offerings?</span>
                            <button
                              onClick={() => {
                                onNavigate('services');
                                setServicesDropdownOpen(false);
                              }}
                              className={`text-xs font-bold hover:underline flex items-center gap-1.5 cursor-pointer group transition-transform duration-150 hover:translate-x-0.5 ${
                                isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'
                              }`}
                            >
                              <span>Explore Hub</span>
                              <ArrowRight className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5" />
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Clean, uncluttered Search + Theme + Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger Button */}
          {onOpenSearch && (
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              aria-label="Search case studies and articles (Cmd+K)"
              className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/80 hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-amber-400 transition-all text-xs cursor-pointer group"
              title="Search case studies & articles (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline text-xs font-medium">Search</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            id="header-theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Toggle to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/80 hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 transition-all cursor-pointer"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-amber-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Primary Let's Talk CTA (Opens Executive Consultation Modal) */}
          <button
            id="header-lets-talk-cta"
            onClick={() => {
              if (onOpenInquiryModal) {
                onOpenInquiryModal();
              } else {
                handleNavClick('contact');
              }
            }}
            aria-haspopup="dialog"
            className="group/cta hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-500"
            title="Schedule Executive Strategy & Architecture Consultation"
          >
            <span>Let's Talk</span>
            <span className="sr-only"> - Open inquiry form for project scoping</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-950 transition-all duration-300 ease-out group-hover/cta:translate-x-1 group-hover/cta:scale-110" aria-hidden="true" />
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-amber-400 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Spring Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className={`md:hidden border-b px-4 pt-3 pb-6 space-y-3 shadow-2xl overflow-hidden ${
              isDark 
                ? 'bg-[#181615] border-neutral-800 text-neutral-100' 
                : 'bg-white border-neutral-200 text-neutral-900'
            }`}
          >
            {/* Mobile Search Button */}
          {onOpenSearch && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full py-2.5 px-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-amber-400 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer mb-2"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-500" />
                <span>Search case studies & articles...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-[10px] text-[var(--text-muted)]">
                ⌘K
              </kbd>
            </button>
          )}

          <div className="space-y-1">
            {mobileNavLinks.map((item) => {
              const isActive = currentView === item.id || 
                (item.id === 'services' && currentView === 'service-detail') ||
                (item.id === 'portfolio' && currentView === 'project-detail');

              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={() => setMobileServicesExpanded((prev) => !prev)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesExpanded ? 'rotate-180 text-amber-500' : 'text-[var(--text-muted)]'}`} />
                    </button>

                    {mobileServicesExpanded && (
                      <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-amber-500/30 ml-4 animate-in fade-in duration-150">
                        <button
                          onClick={() => handleNavClick('services')}
                          className="w-full text-left p-2 rounded-lg text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-[var(--bg-secondary)] flex items-center justify-between"
                        >
                          <span>Explore All Services</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        {SERVICES.map((srv) => (
                          <button
                            key={srv.id}
                            onClick={() => {
                              onNavigate('service-detail', srv.id);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full text-left p-2 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span className="truncate">{srv.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenInquiryModal) {
                  onOpenInquiryModal();
                } else {
                  handleNavClick('contact');
                }
              }}
              aria-haspopup="dialog"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-500"
            >
              <span>Let's Talk For Your Project</span>
              <span className="sr-only"> - Open inquiry form for project scoping</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <div className="text-center text-xs text-[var(--text-muted)] font-mono">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-amber-500 transition-colors">
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

      {/* Dynamic Reading Progress Bar pinned at the bottom edge */}
      <ReadingProgressBar currentView={currentView} />
    </header>
  );
};
