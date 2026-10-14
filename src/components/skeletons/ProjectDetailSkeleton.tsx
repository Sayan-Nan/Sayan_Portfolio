import React from 'react';

/**
 * High-Fidelity Content Skeleton Loader for ProjectDetailView.
 * Prevents Layout Shift (CLS = 0) and improves perceived loading speed
 * during asynchronous lazy chunk hydration and route switches.
 */
export const ProjectDetailSkeleton: React.FC = () => {
  return (
    <article
      id="project-detail-skeleton"
      role="status"
      aria-live="polite"
      aria-label="Loading project case study details"
      aria-busy="true"
      className="w-full space-y-16 sm:space-y-24 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* 1. Top Controls Bar Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--border-subtle)] animate-pulse" />
          <div className="w-36 h-3.5 rounded bg-[var(--border-subtle)] animate-pulse" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
          <div className="w-24 h-3.5 rounded bg-[var(--border-subtle)] animate-pulse hidden lg:block mr-1" />
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-7 rounded-full animate-shimmer bg-[var(--border-subtle)] ${
                i === 1 ? 'w-24 bg-amber-500/25' : 'w-20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Hero Headline & Meta Info Skeleton */}
      <section className="space-y-6">
        {/* Badges and metadata pills */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-6 w-28 rounded-full bg-amber-500/20 animate-pulse" />
          <div className="h-6 w-36 rounded-full bg-[var(--border-subtle)] animate-pulse" />
          <div className="h-4 w-28 rounded bg-[var(--border-subtle)] animate-pulse" />
          <div className="h-4 w-32 rounded bg-[var(--border-subtle)] animate-pulse" />
          <div className="h-4 w-24 rounded bg-[var(--border-subtle)] animate-pulse" />
        </div>

        {/* H1 Main Title Skeleton */}
        <div className="space-y-3 pt-1">
          <div className="h-9 sm:h-12 w-11/12 sm:w-4/5 rounded-xl bg-[var(--border-subtle)] animate-shimmer" />
          <div className="h-9 sm:h-12 w-3/4 sm:w-1/2 rounded-xl bg-[var(--border-subtle)] animate-shimmer" />
        </div>

        {/* Summary Description Paragraph Skeleton */}
        <div className="space-y-2.5 max-w-4xl pt-1">
          <div className="h-4 w-full rounded bg-[var(--border-subtle)] animate-pulse" />
          <div className="h-4 w-11/12 rounded bg-[var(--border-subtle)] animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-[var(--border-subtle)] animate-pulse" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <div className="h-10 w-44 rounded-full bg-amber-500/30 animate-shimmer" />
          <div className="h-10 w-48 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] animate-shimmer" />
        </div>

        {/* Bento Metrics 4-Column Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-2.5 shadow-xs animate-shimmer"
            >
              <div className="h-3 w-20 rounded bg-[var(--border-subtle)]" />
              <div className="h-8 w-24 sm:w-28 rounded-lg bg-amber-500/25" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. The Challenge, Solution, and Impact Chapters Skeleton */}
      <section className="space-y-10">
        {/* Chapter 01: The Challenge */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-xs animate-shimmer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <div className="w-4 h-4 rounded bg-red-500/30" />
            </div>
            <div className="h-7 w-44 rounded-lg bg-[var(--border-subtle)]" />
          </div>
          <div className="space-y-2 sm:pl-11 pt-1">
            <div className="h-4 w-full rounded bg-[var(--border-subtle)]" />
            <div className="h-4 w-11/12 rounded bg-[var(--border-subtle)]" />
            <div className="h-4 w-4/5 rounded bg-[var(--border-subtle)]" />
          </div>
        </div>

        {/* Chapter 02: The Solution & Execution */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-xs animate-shimmer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <div className="w-4 h-4 rounded bg-amber-500/30" />
            </div>
            <div className="h-7 w-56 rounded-lg bg-[var(--border-subtle)]" />
          </div>
          <div className="space-y-2 sm:pl-11 pt-1">
            <div className="h-4 w-full rounded bg-[var(--border-subtle)]" />
            <div className="h-4 w-10/12 rounded bg-[var(--border-subtle)]" />
            <div className="h-4 w-9/12 rounded bg-[var(--border-subtle)]" />
          </div>
        </div>

        {/* Chapter 03: Audited Business Impact */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-4 shadow-xs animate-shimmer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <div className="w-4 h-4 rounded bg-emerald-500/30" />
            </div>
            <div className="h-7 w-60 rounded-lg bg-[var(--border-subtle)]" />
          </div>
          <div className="space-y-2 sm:pl-11 pt-1">
            <div className="h-4 w-full rounded bg-[var(--border-subtle)]" />
            <div className="h-4 w-11/12 rounded bg-[var(--border-subtle)]" />
            <div className="h-4 w-3/4 rounded bg-[var(--border-subtle)]" />
          </div>
        </div>
      </section>

      {/* 4. Deliverables & Tech Stack Skeleton */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Deliverables Card */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 animate-shimmer">
          <div className="h-4 w-36 rounded bg-amber-500/25" />
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-amber-500/20 shrink-0" />
                <div className={`h-3.5 rounded bg-[var(--border-subtle)] ${i % 2 === 0 ? 'w-3/4' : 'w-5/6'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Card */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 animate-shimmer">
          <div className="h-4 w-40 rounded bg-amber-500/25" />
          <div className="flex flex-wrap gap-2 pt-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-8 w-20 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]" />
            ))}
          </div>
          <div className="h-3 w-4/5 rounded bg-[var(--border-subtle)] pt-1" />
        </div>
      </section>

      {/* Accessible loading announcement */}
      <span className="sr-only">Loading project case study details, please wait...</span>
    </article>
  );
};
