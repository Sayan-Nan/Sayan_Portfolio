import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  UserCheck, 
  Building2, 
  Layers, 
  Terminal,
  FileCheck,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ViewMode } from '../types';
import { ProjectDetailSkeleton } from '../components/skeletons/ProjectDetailSkeleton';

export { ProjectDetailSkeleton };

interface ProjectDetailViewProps {
  projectId?: string;
  onNavigate: (view: ViewMode, subId?: string) => void;
  isLoading?: boolean;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ projectId, onNavigate, isLoading = false }) => {
  const [selectedId, setSelectedId] = useState<string>(projectId || PROJECTS[0].id);

  // Keep state synchronized whenever the projectId prop changes
  useEffect(() => {
    if (projectId) {
      setSelectedId(projectId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [projectId]);

  const handleSwitchProject = (id: string) => {
    setSelectedId(id);
    onNavigate('project-detail', id);
  };

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  const currentProject = PROJECTS.find(p => p.id === selectedId) || PROJECTS[0];

  return (
    <article id="project-detail-root" className="w-full space-y-16 sm:space-y-24 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
        <button
          onClick={() => onNavigate('portfolio')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)] hover:text-amber-500 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Case Studies</span>
        </button>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
          <span className="text-xs font-semibold text-[var(--text-muted)] mr-1 hidden lg:inline">Switch Case Study:</span>
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSwitchProject(p.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedId === p.id
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-400'
              }`}
            >
              {p.client.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Hero Headline & Meta Info */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300">
            {currentProject.categoryLabel}
          </span>
          {currentProject.scope && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Scope: {currentProject.scope}
            </span>
          )}
          <span className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Client: {currentProject.client}</span>
          </span>
          <span className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Role: {currentProject.role}</span>
          </span>
          <span className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Timeline: {currentProject.duration}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] font-display tracking-tight leading-tight">
          {currentProject.title}
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-4xl">
          {currentProject.summary}
        </p>

        {/* Action Bar with Live Link if present */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          {currentProject.liveUrl && (
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-xs"
            >
              <span>{currentProject.category === 'web-development' ? 'Visit Live Website' : 'Read Live Publication'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {currentProject.publishedArticleUrls && currentProject.publishedArticleUrls.length > 0 && (
            <a
              href="#live-bylines"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-400 border border-amber-500/30 transition-colors shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>View {currentProject.publishedArticleUrls.length} Live Articles</span>
            </a>
          )}
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-amber-400 text-[var(--text-primary)] transition-colors shadow-xs cursor-pointer"
          >
            <span>Commission Similar Scope</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quantified Metrics Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          {currentProject.metrics.map((m, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1 shadow-xs">
              <span className="block text-xs font-medium text-[var(--text-muted)]">
                {m.label}
              </span>
              <span className="block text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-display">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The Challenge, The Solution, The Impact (Three Primary Chapters) */}
      <section className="space-y-10">
        
        {/* Section 1: The Challenge */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 font-bold text-xs flex items-center justify-center font-mono">
              01
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display">
              The Challenge
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pl-0 sm:pl-11">
            {currentProject.challenge}
          </p>
        </div>

        {/* Section 2: The Solution */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 font-bold text-xs flex items-center justify-center font-mono">
              02
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display">
              The Solution & Execution
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pl-0 sm:pl-11">
            {currentProject.solution}
          </p>
        </div>

        {/* Section 3: The Impact */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center font-mono">
              03
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display">
              The Audited Business Impact
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pl-0 sm:pl-11">
            {currentProject.impact}
          </p>
        </div>

      </section>

      {/* 4. Deliverables & Tech Stack */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            <span>Client Deliverables</span>
          </span>
          <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
            {currentProject.deliverables.map((del, dIdx) => (
              <li key={dIdx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>Tools & Data Systems</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {currentProject.technologies.map((tech, tIdx) => (
              <span key={tIdx} className="px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)]">
                {tech}
              </span>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] pt-2 leading-relaxed">
            All code and models were documented for seamless handoff to internal marketing, data science, and engineering teams.
          </p>
        </div>

      </section>

      {/* 4.5. Live Published Bylines & Articles if present */}
      {currentProject.publishedArticleUrls && currentProject.publishedArticleUrls.length > 0 && (
        <section id="live-bylines" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-amber-500/30 space-y-5 shadow-xs">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-display">
                Live Published Articles Authored for {currentProject.client}
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {currentProject.publishedArticleUrls.length} Verified Bylines
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentProject.publishedArticleUrls.map((art, aIdx) => (
              <a
                key={aIdx}
                href={art.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-amber-400 group transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {art.publication} Publication
                  </span>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-amber-500 transition-colors">
                    {art.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
                  <span className="font-mono">Open Official URL</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 5. Bottom Conversion CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-display">
            Interested in achieving similar metrics?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl">
            Book a confidential strategy session to discuss your company's content architecture and analytics pipelines.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-8 py-3.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-md cursor-pointer whitespace-nowrap"
        >
          Book a Strategy Consultation
        </button>
      </section>

    </article>
  );
};
