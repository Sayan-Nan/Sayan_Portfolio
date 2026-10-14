import React from 'react';

/**
 * High-Fidelity Content Skeleton Loader for ServiceDetailView.
 * Mirrors the exact layout geometry, typography, and card grids to eliminate
 * Cumulative Layout Shift (CLS = 0) during lazy loading and client-side view switches.
 */
export const ServiceDetailSkeleton: React.FC = () => {
  return (
    <article
      id="service-detail-skeleton"
      role="status"
      aria-live="polite"
      aria-label="Loading service deep dive details"
      aria-busy="true"
      className="w-full space-y-16 sm:space-y-24 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* 1. Top Navigation Bar to Switch Between Services Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--border-subtle)] animate-pulse" />
          <div className="w-32 h-3.5 rounded bg-[var(--border-subtle)] animate-pulse" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
          <div className="w-24 h-3.5 rounded bg-[var(--border-subtle)] animate-pulse hidden md:block mr-1" />
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`h-7 rounded-full animate-shimmer bg-[var(--border-subtle)] ${
                i === 1 ? 'w-28 bg-amber-500/25' : 'w-24'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Hero Header Layout with Graphic Container Skeleton */}
      <section className="space-y-6">
        {/* Deep Dive Badge */}
        <div className="h-6 w-36 rounded-full bg-amber-500/20 animate-pulse" />

        {/* H1 Title Skeleton */}
        <div className="space-y-3 pt-1">
          <div className="h-9 sm:h-12 lg:h-14 w-11/12 sm:w-4/5 rounded-xl bg-[var(--border-subtle)] animate-shimmer" />
          <div className="h-9 sm:h-12 lg:h-14 w-3/4 sm:w-1/2 rounded-xl bg-[var(--border-subtle)] animate-shimmer" />
        </div>

        {/* Subtitle Skeleton */}
        <div className="space-y-2 max-w-3xl pt-1">
          <div className="h-5 sm:h-6 w-full rounded-md bg-[var(--border-subtle)] animate-pulse" />
          <div className="h-5 sm:h-6 w-4/5 rounded-md bg-[var(--border-subtle)] animate-pulse" />
        </div>

        {/* Visual Graphic Header / Banner Box Skeleton */}
        <div className="w-full rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-amber-500/10 via-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-xs animate-shimmer">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-3 md:col-span-2">
              <div className="h-3.5 w-44 rounded bg-amber-500/25" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-[var(--border-subtle)]" />
                <div className="h-4 w-11/12 rounded bg-[var(--border-subtle)]" />
                <div className="h-4 w-3/4 rounded bg-[var(--border-subtle)]" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs">
              <div className="h-3 w-28 rounded bg-[var(--border-subtle)]" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div key={idx} className="h-6 w-16 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)]" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About this Service Editorial Skeleton */}
      <section className="space-y-4 max-w-4xl">
        <div className="h-8 w-52 rounded-lg bg-[var(--border-subtle)] animate-pulse" />
        <div className="space-y-2.5 pt-1">
          <div className="h-4.5 w-full rounded bg-[var(--border-subtle)] animate-pulse" />
          <div className="h-4.5 w-11/12 rounded bg-[var(--border-subtle)] animate-pulse" />
          <div className="h-4.5 w-4/5 rounded bg-[var(--border-subtle)] animate-pulse" />
        </div>
      </section>

      {/* 4. "Services Include" Grid Skeleton */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="h-3.5 w-36 rounded bg-amber-500/25 animate-pulse" />
          <div className="h-8 w-64 rounded-lg bg-[var(--border-subtle)] animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3.5 shadow-xs animate-shimmer"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <div className="w-4 h-4 rounded bg-amber-500/30" />
              </div>
              <div className="h-5 w-4/5 rounded-md bg-[var(--border-subtle)]" />
              <div className="space-y-1.5 pt-1">
                <div className="h-3.5 w-full rounded bg-[var(--border-subtle)]" />
                <div className="h-3.5 w-3/4 rounded bg-[var(--border-subtle)]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. "Top Industries I Cover" Grid Skeleton */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="h-3.5 w-40 rounded bg-amber-500/25 animate-pulse" />
          <div className="h-8 w-56 rounded-lg bg-[var(--border-subtle)] animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3.5 shadow-xs animate-shimmer"
            >
              <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] w-fit">
                <div className="w-5 h-5 rounded bg-amber-500/25" />
              </div>
              <div className="h-5 w-3/4 rounded-md bg-[var(--border-subtle)]" />
              <div className="space-y-1.5 pt-1">
                <div className="h-3.5 w-full rounded bg-[var(--border-subtle)]" />
                <div className="h-3.5 w-4/5 rounded bg-[var(--border-subtle)]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Client Deliverables Box & Call to Action Skeleton */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-strong)] flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm animate-shimmer">
        <div className="space-y-3 max-w-xl w-full">
          <div className="h-3.5 w-36 rounded bg-amber-500/25" />
          <div className="h-8 w-4/5 rounded-lg bg-[var(--border-subtle)]" />
          <div className="h-4 w-11/12 rounded bg-[var(--border-subtle)]" />
        </div>

        <div className="w-full sm:w-auto">
          <div className="h-12 w-full sm:w-56 rounded-full bg-amber-500/30" />
        </div>
      </section>

      {/* Accessible loading announcement */}
      <span className="sr-only">Loading service deep dive details, please wait...</span>
    </article>
  );
};
