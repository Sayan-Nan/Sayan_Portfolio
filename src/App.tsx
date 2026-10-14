import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ViewMode } from './types';
import { SEO_METADATA_MAP, SERVICES, PROJECTS } from './data/portfolioData';

import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollSpyBar, ABOUT_SECTIONS, SERVICES_SECTIONS } from './components/ScrollSpyBar';
import { Breadcrumb } from './components/Breadcrumb';
import { useScrollSpy } from './hooks/useScrollSpy';
import { ChunkErrorBoundary } from './components/ChunkErrorBoundary';
import { ScrollBackgroundAnimation } from './components/ScrollBackgroundAnimation';

// Eagerly loaded landing view for instantaneous, zero-delay First Contentful Paint (FCP)
import { HomeView } from './views/HomeView';

// Sitewide Lazy-Loaded Route Views (Split into on-demand asynchronous chunks)
const AboutView = lazy(() => import('./views/AboutView').then(m => ({ default: m.AboutView })));
const ServicesView = lazy(() => import('./views/ServicesView').then(m => ({ default: m.ServicesView })));
const ServiceDetailView = lazy(() => import('./views/ServiceDetailView').then(m => ({ default: m.ServiceDetailView })));
const ProjectsView = lazy(() => import('./views/ProjectsView').then(m => ({ default: m.ProjectsView })));
const ProjectDetailView = lazy(() => import('./views/ProjectDetailView').then(m => ({ default: m.ProjectDetailView })));
const TestimonialsView = lazy(() => import('./views/TestimonialsView').then(m => ({ default: m.TestimonialsView })));
const FaqView = lazy(() => import('./views/FaqView').then(m => ({ default: m.FaqView })));
const ContactView = lazy(() => import('./views/ContactView').then(m => ({ default: m.ContactView })));
const NotFoundView = lazy(() => import('./views/NotFoundView').then(m => ({ default: m.NotFoundView })));

// Content Skeleton Loaders for High Perceived Performance
import { ProjectDetailSkeleton, ServiceDetailSkeleton } from './components/skeletons';

// Sitewide Lazy-Loaded Heavy Modals (Deferred until user triggers them via shortcuts or CTAs)
const GlobalSearchModal = lazy(() => import('./components/GlobalSearchModal').then(m => ({ default: m.GlobalSearchModal })));
const ExecutiveInquiryModal = lazy(() => import('./components/ExecutiveInquiryModal').then(m => ({ default: m.ExecutiveInquiryModal })));

// Branded Minimalist Suspense Loading Skeleton
const ViewLoadingFallback: React.FC = () => (
  <div 
    role="status" 
    aria-live="polite" 
    aria-label="Loading page architecture"
    className="min-h-[55vh] flex flex-col items-center justify-center gap-3 py-20 px-4"
  >
    <div className="relative flex items-center justify-center">
      <div className="w-9 h-9 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
      <div className="absolute w-2 h-2 rounded-full bg-amber-500 animate-ping" />
    </div>
    <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--text-muted)] animate-pulse">
      Loading Architecture...
    </span>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [subId, setSubId] = useState<string | undefined>(undefined);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Global keyboard shortcut for Omni Search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Dynamic Scroll Spy Section Tracking for 'about' and 'services'
  const sectionIds = useMemo(() => {
    if (currentView === 'about') return ABOUT_SECTIONS.map(s => s.id);
    if (currentView === 'services') return SERVICES_SECTIONS.map(s => s.id);
    return [];
  }, [currentView]);

  const activeSectionId = useScrollSpy(sectionIds, 140);

  const activeSectionTitle = useMemo(() => {
    if (currentView === 'about') {
      const found = ABOUT_SECTIONS.find(s => s.id === activeSectionId);
      return found ? found.label : '';
    }
    if (currentView === 'services') {
      const found = SERVICES_SECTIONS.find(s => s.id === activeSectionId);
      return found ? found.label : '';
    }
    return '';
  }, [currentView, activeSectionId]);

  // Always ensure Home page comes first on site refresh and initial load
  useEffect(() => {
    // If a hash was retained from a previous navigation or reload, clear it
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setCurrentView('home');
    setSubId(undefined);
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Handle subsequent in-session hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      if (!hash) {
        setCurrentView('home');
        setSubId(undefined);
        return;
      }

      const parts = hash.split('/');
      const primaryView = parts[0] as ViewMode;

      if (['home', 'about', 'services', 'service-detail', 'portfolio', 'project-detail', 'testimonials', 'faqs', 'contact', '404'].includes(primaryView)) {
        setCurrentView(primaryView);
        setSubId(parts[1] || undefined);
      } else {
        setCurrentView('404');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync document head SEO tags dynamically when view changes
  useEffect(() => {
    let meta = SEO_METADATA_MAP[currentView] || SEO_METADATA_MAP.home;

    if (currentView === 'service-detail' && subId) {
      const srv = SERVICES.find(s => s.id === subId);
      if (srv) {
        meta = {
          ...meta,
          title: `${srv.title} | Sayan Nan`,
          description: srv.summary,
          ogTitle: `${srv.title} - Sayan Nan`,
          ogDescription: srv.subtitle,
          canonicalPath: `/services/${srv.slug || srv.id}`,
        };
      }
    } else if (currentView === 'project-detail' && subId) {
      const proj = PROJECTS.find(p => p.id === subId);
      if (proj) {
        meta = {
          ...meta,
          title: `${proj.title} | Sayan Nan`,
          description: proj.summary,
          ogTitle: `${proj.title} - Sayan Nan`,
          ogDescription: proj.client,
          canonicalPath: `/portfolio/${proj.slug || proj.id}`,
        };
      }
    }

    document.title = meta.title;

    // Update Meta Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    // Update OpenGraph Title & Description
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (!ogTitleTag) {
      ogTitleTag = document.createElement('meta');
      ogTitleTag.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleTag);
    }
    ogTitleTag.setAttribute('content', meta.ogTitle);

    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (!ogDescTag) {
      ogDescTag = document.createElement('meta');
      ogDescTag.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescTag);
    }
    ogDescTag.setAttribute('content', meta.ogDescription);

    // Update Twitter Tags
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', meta.ogTitle);
    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', meta.ogDescription);

    // Update or inject Schema.org JSON-LD
    let scriptTag = document.getElementById('seo-jsonld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': meta.schemaType,
      'name': 'Sayan Nan',
      'jobTitle': 'Marketing Data Analyst & Senior Copywriter',
      'url': `https://sayannan.com${meta.canonicalPath}`,
      'email': 'sayan.contentwriter@gmail.com',
      'description': meta.description,
    });
  }, [currentView, subId]);

  const handleNavigate = (view: ViewMode, id?: string) => {
    setCurrentView(view);
    setSubId(id);
    const hash = id ? `#/${view}/${id}` : `#/${view}`;
    if (view === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = hash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesView onNavigate={handleNavigate} />;
      case 'service-detail':
        return (
          <Suspense fallback={<ServiceDetailSkeleton />}>
            <ServiceDetailView key={subId || 'default-service'} serviceId={subId} onNavigate={handleNavigate} />
          </Suspense>
        );
      case 'portfolio':
        return <ProjectsView onNavigate={handleNavigate} />;
      case 'project-detail':
        return (
          <Suspense fallback={<ProjectDetailSkeleton />}>
            <ProjectDetailView key={subId || 'default-project'} projectId={subId} onNavigate={handleNavigate} />
          </Suspense>
        );
      case 'testimonials':
        return <TestimonialsView onNavigate={handleNavigate} />;
      case 'faqs':
        return <FaqView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView initialService={subId} />;
      case '404':
        return <NotFoundView onNavigate={handleNavigate} />;
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col relative text-[var(--text-primary)] transition-colors antialiased selection:bg-amber-400 selection:text-neutral-900">
        
        {/* Dynamic Fluid Scroll-Based Animated Background Engine */}
        <ScrollBackgroundAnimation frameDir="/frames" />

        {/* Primary Content Layer */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Top-Bar Utility Nav */}
          <TopBar />

          {/* Main Sticky Header */}
          <Header 
            currentView={currentView} 
            activeSectionId={activeSectionId}
            onNavigate={handleNavigate}
            onOpenSearch={() => setSearchModalOpen(true)}
            onOpenInquiryModal={() => setInquiryModalOpen(true)}
          />

          {/* Dynamic Scroll Spy Sub-Nav Bar (Active on 'About' and 'Services') */}
          {(currentView === 'about' || currentView === 'services') && (
            <ScrollSpyBar 
              currentView={currentView} 
              activeSectionId={activeSectionId} 
            />
          )}

          {/* Global Semantic Breadcrumb Bar */}
          <Breadcrumb
            currentView={currentView}
            subId={subId}
            activeSectionTitle={activeSectionTitle}
            onNavigate={handleNavigate}
          />

          {/* Primary Main Content Stage with Asynchronous Suspense & Error Boundaries */}
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            <ChunkErrorBoundary>
              <Suspense fallback={<ViewLoadingFallback />}>
                {renderActiveView()}
              </Suspense>
            </ChunkErrorBoundary>
          </main>

          {/* Unified Semantic Footer with "Let's Talk" Banner */}
          <Footer 
            onNavigate={handleNavigate} 
            onOpenInquiryModal={() => setInquiryModalOpen(true)}
          />
        </div>

        {/* Global Omni-Search Modal (Cmd+K) - Lazy Loaded On-Demand */}
        {searchModalOpen && (
          <Suspense fallback={null}>
            <GlobalSearchModal
              isOpen={searchModalOpen}
              onClose={() => setSearchModalOpen(false)}
              onNavigate={handleNavigate}
            />
          </Suspense>
        )}

        {/* Executive Consultation & Project Scope Modal - Lazy Loaded On-Demand */}
        {inquiryModalOpen && (
          <Suspense fallback={null}>
            <ExecutiveInquiryModal
              isOpen={inquiryModalOpen}
              onClose={() => setInquiryModalOpen(false)}
            />
          </Suspense>
        )}

      </div>
    </ThemeProvider>
  );
}
