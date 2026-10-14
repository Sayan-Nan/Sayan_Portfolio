import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Clock, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  CreditCard, 
  Activity, 
  Quote, 
  Bookmark,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { PublishedArticle } from '../types';
import { modalBackdropVariants, modalCardVariants } from '../animations/modalMotion';

interface ArticlePreviewModalProps {
  article: PublishedArticle | null;
  onClose: () => void;
  onSelectTopic?: (topic: string) => void;
}

export const ArticlePreviewModal: React.FC<ArticlePreviewModalProps> = ({
  article,
  onClose,
  onSelectTopic
}) => {
  const [copied, setCopied] = React.useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (article) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [article, onClose]);

  if (!article) return null;

  const isSprinklr = article.publication === 'Sprinklr';
  const isYuPay = article.publication === 'YU-Pay';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(article.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {article && (
        <motion.div 
          key="article-preview-backdrop"
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 bg-neutral-950/70 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-article-title"
        >
          <motion.div 
            key="article-preview-card"
            ref={modalRef}
            variants={modalCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Utility Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                isSprinklr
                  ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                  : isYuPay
                  ? 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30'
                  : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {isSprinklr ? (
                <Sparkles className="w-3.5 h-3.5" />
              ) : isYuPay ? (
                <CreditCard className="w-3.5 h-3.5" />
              ) : (
                <Activity className="w-3.5 h-3.5" />
              )}
              <span>{article.publication}</span>
            </span>

            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Live on {article.publicationDomain}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-card)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
              ESC to close
            </span>
            <button
              onClick={onClose}
              aria-label="Close article preview"
              className="p-1.5 rounded-xl hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-subtle)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
          {/* Category & Read Time */}
          <div className="flex items-center justify-between gap-3 text-xs text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-3">
            <span className="font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[11px]">
              {article.category}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Article Title */}
          <h3 
            id="preview-article-title" 
            className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] leading-snug font-display"
          >
            {article.title}
          </h3>

          {/* Article Summary Snippet */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              <span>Executive Summary & Abstract</span>
            </h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-secondary)] p-4 rounded-2xl border border-[var(--border-subtle)]">
              {article.description}
            </p>
          </div>

          {/* Direct Editorial Quote / Snippet */}
          {article.snippetQuote && (
            <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Quote className="w-4 h-4" />
                <span>Featured Excerpt from Publication</span>
              </div>
              <blockquote className="text-sm sm:text-base font-medium text-[var(--text-primary)] italic leading-relaxed">
                "{article.snippetQuote}"
              </blockquote>
              <div className="text-[11px] text-[var(--text-muted)] font-mono">
                &mdash; Sayan Nan, Author & Bylined Strategist
              </div>
            </div>
          )}

          {/* Key Executive Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Strategic Insights & Data Findings</span>
              </h4>
              <ul className="space-y-2">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Target Audience Persona */}
          <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--bg-card)] text-amber-500 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="block font-bold text-[var(--text-primary)]">Intended Readership:</span>
              <span className="text-[var(--text-muted)]">{article.targetAudience}</span>
            </div>
          </div>

          {/* Key Topics Tags */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
              Core Taxonomies & Keywords
            </span>
            <div className="flex flex-wrap gap-1.5">
              {article.keyTopics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (onSelectTopic) onSelectTopic(topic);
                    onClose();
                  }}
                  title={`Filter portfolio articles by #${topic}`}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-secondary)] hover:bg-amber-500/15 text-[var(--text-secondary)] hover:text-amber-600 dark:hover:text-amber-400 border border-[var(--border-subtle)] transition-colors cursor-pointer"
                >
                  #{topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Row */}
        <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Article URL</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="sm:hidden px-3.5 py-2 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Read Live on {article.publicationDomain}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
