import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Database, 
  Mail, 
  ExternalLink,
  AlertCircle,
  Globe,
  DollarSign,
  Copy,
  Check,
  CheckCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { modalBackdropVariants, modalCardVariants } from '../animations/modalMotion';
import { submitEnterpriseInquiry, generateDirectMailto, InquiryResult } from '../lib/inquiries';

interface ExecutiveInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

interface BudgetTier {
  id: string;
  range: string;
  name: string;
  description: string;
  badge?: string;
  recommended?: boolean;
}

const BUDGET_TIERS: BudgetTier[] = [
  {
    id: 'sprint',
    range: '< $5,000',
    name: 'Diagnostic Audit & CRO Sprint',
    description: 'Rapid 2-week deep dive into conversion bottlenecks, copy teardown & messaging roadmap.',
    badge: 'Quick Turnaround',
  },
  {
    id: 'core',
    range: '$5,000 - $15,000',
    name: 'Topic Architecture & Copy Engine',
    description: 'High-converting B2B SaaS positioning, 10x pillar content, case studies & sales collateral.',
    badge: 'Recommended',
    recommended: true,
  },
  {
    id: 'scale',
    range: '$15,000 - $30,000',
    name: 'Full Funnel Engine + Power BI Telemetry',
    description: 'End-to-end multi-channel architecture with custom Power BI dashboards & attribution models.',
    badge: 'Full Scale',
  },
  {
    id: 'retainer',
    range: '$30,000+',
    name: 'Enterprise Strategic Retainer',
    description: 'Multi-quarter fractional CMO/copy direction, high-ticket deal enablement & revenue telemetry.',
    badge: 'Enterprise',
  },
];

export const ExecutiveInquiryModal: React.FC<ExecutiveInquiryModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyUrl: '',
    projectScope: initialService || 'B2B SaaS Enterprise SEO Copywriting',
    budgetRange: '$5,000 - $15,000',
    notes: '',
  });

  // Real-time validation touched tracking
  const [touched, setTouched] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    companyUrl: false,
    budgetRange: false,
    notes: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<InquiryResult | null>(null);

  // Success Toast notification states
  const [showToast, setShowToast] = useState(false);
  const [toastProgress, setToastProgress] = useState(100);
  const [copiedTrackingId, setCopiedTrackingId] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastProgressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, projectScope: initialService }));
    }
  }, [initialService]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Clean up toast timers on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (toastProgressRef.current) clearInterval(toastProgressRef.current);
    };
  }, []);

  // Real-time client-side validation logic
  const validationErrors = useMemo(() => {
    const errors: Record<string, string> = {};

    // 1. Full Name
    const nameVal = formData.name.trim();
    if (touched.name || nameVal.length > 0) {
      if (!nameVal) {
        errors.name = 'Full name is required.';
      } else if (nameVal.length < 2) {
        errors.name = 'Name must be at least 2 characters.';
      }
    }

    // 2. Corporate Email
    const emailVal = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (touched.email || emailVal.length > 0) {
      if (!emailVal) {
        errors.email = 'Corporate email is required.';
      } else if (!emailRegex.test(emailVal)) {
        errors.email = 'Please provide a valid corporate email address (e.g. name@company.com).';
      }
    }

    // 3. Company URL (Strict real-time validation)
    const rawUrl = formData.companyUrl.trim();
    if (rawUrl.length > 0 || touched.companyUrl) {
      if (rawUrl.length > 0) {
        const pseudoProtocolRegex = /^(javascript|data|vbscript|file):/i;
        if (pseudoProtocolRegex.test(rawUrl)) {
          errors.companyUrl = 'Disallowed URL protocol. Only http:// or https:// addresses are accepted.';
        } else if (/\s/.test(rawUrl)) {
          errors.companyUrl = 'Website address cannot contain spaces.';
        } else {
          try {
            const candidate = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
            const parsed = new URL(candidate);
            if (!['http:', 'https:'].includes(parsed.protocol)) {
              errors.companyUrl = 'Only standard http:// and https:// URLs are supported.';
            } else if (!parsed.hostname.includes('.') || parsed.hostname.endsWith('.')) {
              errors.companyUrl = 'Please enter a valid domain with extension (e.g. acme.com or https://acme.com).';
            }
          } catch {
            errors.companyUrl = 'Please provide a valid website address (e.g. acme.com).';
          }
        }
      }
    }

    // 4. Budget Range (Real-time validation)
    const budgetVal = formData.budgetRange.trim();
    if (touched.budgetRange || budgetVal.length > 0) {
      if (!budgetVal) {
        errors.budgetRange = 'Please select an enterprise budget bracket to align project scope.';
      } else {
        const validTiers = BUDGET_TIERS.map(t => t.range);
        if (!validTiers.includes(budgetVal)) {
          errors.budgetRange = 'Please select a valid budget bracket.';
        }
      }
    }

    // 5. Notes / Brief
    const notesVal = formData.notes.trim();
    if (notesVal.length > 0 && notesVal.length < 15) {
      errors.notes = 'Please provide at least 15 characters to help Sayan evaluate your requirements.';
    }

    return errors;
  }, [formData, touched]);

  // Is form valid for submission?
  const isFormValid = useMemo(() => {
    const hasName = formData.name.trim().length >= 2;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = emailRegex.test(formData.email.trim());
    const hasValidBudget = BUDGET_TIERS.some(t => t.range === formData.budgetRange.trim());
    const hasValidUrl = !validationErrors.companyUrl;
    const hasValidNotes = !validationErrors.notes;

    return hasName && hasValidEmail && hasValidBudget && hasValidUrl && hasValidNotes;
  }, [formData, validationErrors]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const triggerSuccessToast = (result: InquiryResult) => {
    setShowToast(true);
    setToastProgress(100);

    // Reset previous timers
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (toastProgressRef.current) clearInterval(toastProgressRef.current);

    // Smoothly animate progress bar down over 6 seconds
    const intervalTime = 60;
    const totalDuration = 6000;
    const step = (intervalTime / totalDuration) * 100;

    toastProgressRef.current = setInterval(() => {
      setToastProgress(prev => {
        const next = prev - step;
        if (next <= 0) {
          if (toastProgressRef.current) clearInterval(toastProgressRef.current);
          return 0;
        }
        return next;
      });
    }, intervalTime);

    // Auto-dismiss toast after 6 seconds
    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, totalDuration);
  };

  const handleCopyTrackingId = (id: string) => {
    navigator.clipboard.writeText(`INQ-${id}`);
    setCopiedTrackingId(true);
    setTimeout(() => setCopiedTrackingId(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched for full validation audit
    setTouched({
      name: true,
      email: true,
      companyUrl: true,
      budgetRange: true,
      notes: true,
    });

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    // Normalize URL with https:// if valid domain provided
    let normalizedUrl = formData.companyUrl.trim();
    if (normalizedUrl && !/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const payloadScope = formData.notes.trim() 
      ? formData.notes.trim() 
      : `Consultation intake initiated via executive modal for ${formData.projectScope}.`;

    try {
      const result = await submitEnterpriseInquiry({
        fullName: formData.name.trim(),
        workEmail: formData.email.trim(),
        companyUrl: normalizedUrl,
        selectedService: formData.projectScope,
        budgetRange: formData.budgetRange,
        timeline: 'Within 2-4 Weeks',
        message: payloadScope,
      });

      setSubmissionResult(result);
      setSubmitted(true);
      triggerSuccessToast(result);
    } catch (err) {
      console.warn('Executive modal inquiry error:', err);
      const fallbackId = 'INQ-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      const mailtoUrl = generateDirectMailto(fallbackId, {
        fullName: formData.name.trim(),
        workEmail: formData.email.trim(),
        companyUrl: normalizedUrl,
        selectedService: formData.projectScope,
        budgetRange: formData.budgetRange,
        timeline: 'Within 2-4 Weeks',
        message: payloadScope,
      });
      const fallbackResult: InquiryResult = {
        id: fallbackId,
        createdAt: new Date().toISOString(),
        mailtoUrl,
        firestoreSaved: false,
      };
      setSubmissionResult(fallbackResult);
      setSubmitted(true);
      triggerSuccessToast(fallbackResult);
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeBudgetTier = BUDGET_TIERS.find(t => t.range === formData.budgetRange);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="executive-inquiry-backdrop"
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="executive-inquiry-title"
        >
          {/* ============================================================ */}
          {/* FLOATING SUCCESS TOAST NOTIFICATION (Top-Center / Immediate) */}
          {/* ============================================================ */}
          <AnimatePresence>
            {showToast && submissionResult && (
              <motion.div
                key="executive-success-toast"
                initial={{ opacity: 0, y: -40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                role="status"
                aria-live="polite"
                className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] w-[92%] max-w-lg bg-neutral-950/95 dark:bg-neutral-900/95 border border-emerald-500/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_25px_rgba(16,185,129,0.2)] backdrop-blur-md overflow-hidden text-neutral-100"
              >
                <div className="p-4 sm:p-5 flex items-start gap-3.5">
                  <div className="relative shrink-0 mt-0.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md border border-emerald-500/30">
                        {submissionResult.firestoreSaved ? 'Firestore Persisted' : 'Queued & Buffered'}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        Instant Telemetry
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white font-display mt-1 tracking-tight">
                      Project Parameters Transmitted!
                    </h4>

                    <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                      {submissionResult.firestoreSaved
                        ? 'Successfully recorded in Cloud Firestore database (sayan-nan-portfolio).'
                        : 'Parameters securely captured in local queue for direct inbox transmission.'}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-amber-300">
                        <span>Ref:</span>
                        <span className="font-bold">INQ-{submissionResult.id}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyTrackingId(submissionResult.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-medium text-neutral-200 border border-neutral-700 transition-colors cursor-pointer"
                        title="Copy tracking reference"
                      >
                        {copiedTrackingId ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-neutral-400" />
                            <span>Copy Ref</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowToast(false)}
                    className="w-7 h-7 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    aria-label="Dismiss toast"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Animated auto-dismiss countdown bar */}
                <div className="h-1 w-full bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-75 ease-linear"
                    style={{ width: `${toastProgress}%` }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ============================================================ */}
          {/* MODAL CARD */}
          {/* ============================================================ */}
          <motion.div
            key="executive-inquiry-card"
            variants={modalCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 mb-2">
                  <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>Direct Executive Channel &bull; Typical Response &lt; 12 Hours</span>
                </div>
                <h2 id="executive-inquiry-title" className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] font-display tracking-tight">
                  Schedule Architecture &amp; Strategy Consultation
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  Connect directly with Sayan Nan for high-ticket B2B SaaS copywriting, neuromarketing audits, or Power BI marketing telemetry models.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-amber-500 text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {submitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 animate-ping opacity-75" />
                  </div>

                  <div className="space-y-1">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                      submissionResult?.firestoreSaved 
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' 
                        : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                    }`}>
                      {submissionResult?.firestoreSaved ? (
                        <>
                          <Database className="w-3.5 h-3.5" />
                          <span>Logged in Firestore: sayan-nan-portfolio</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-3.5 h-3.5" />
                          <span>Scope Buffered &bull; Direct Inbox Bridge Ready</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-display tracking-tight">
                      Consultation Request Logged
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto">
                      Sayan will review your scope requirements and respond to <strong>{formData.email}</strong> within 12 business hours.
                    </p>
                  </div>

                  {submissionResult && (
                    <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-mono max-w-md mx-auto text-left space-y-2.5 shadow-inner">
                      <div className="flex justify-between items-center text-xs pb-2 border-b border-[var(--border-subtle)]">
                        <span className="text-[var(--text-muted)] font-sans uppercase font-bold text-[10px] tracking-wider">
                          Tracking Reference:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-amber-500 text-sm">INQ-{submissionResult.id}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyTrackingId(submissionResult.id)}
                            className="p-1 rounded hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-amber-500 transition-colors"
                            title="Copy tracking code"
                          >
                            {copiedTrackingId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-[var(--text-secondary)]">
                        <div>
                          <span className="text-[var(--text-muted)] block text-[10px]">SERVICE:</span>
                          <span className="font-medium truncate block">{formData.projectScope}</span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)] block text-[10px]">BUDGET BRACKET:</span>
                          <span className="font-bold text-amber-600 dark:text-amber-400 block">{formData.budgetRange}</span>
                        </div>
                        {formData.companyUrl && (
                          <div className="col-span-2">
                            <span className="text-[var(--text-muted)] block text-[10px]">COMPANY DOMAIN:</span>
                            <span className="font-medium text-emerald-600 dark:text-emerald-400 truncate block">
                              {formData.companyUrl}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {submissionResult && (
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={submissionResult.mailtoUrl}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold shadow-md transition-all cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Transmit Directly to Inbox</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                      <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] text-xs font-semibold text-[var(--text-secondary)] transition-colors cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Field Row 1: Full Name & Corporate Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-[var(--text-secondary)]">
                          Your Full Name <span className="text-rose-500">*</span>
                        </label>
                        {touched.name && !validationErrors.name && formData.name.trim().length >= 2 && (
                          <span className="text-[10px] text-emerald-500 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (!touched.name) setTouched(prev => ({ ...prev, name: true }));
                        }}
                        onBlur={() => handleBlur('name')}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors ${
                          touched.name && validationErrors.name 
                            ? 'border-rose-500/80 focus:border-rose-500 bg-rose-500/5' 
                            : touched.name && !validationErrors.name && formData.name.trim() 
                              ? 'border-emerald-500/60 focus:border-emerald-500' 
                              : 'border-[var(--border-subtle)] focus:border-amber-500'
                        }`}
                      />
                      {touched.name && validationErrors.name && (
                        <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{validationErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-[var(--text-secondary)]">
                          Corporate Email <span className="text-rose-500">*</span>
                        </label>
                        {touched.email && !validationErrors.email && formData.email.trim() && (
                          <span className="text-[10px] text-emerald-500 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        required
                        maxLength={120}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (!touched.email) setTouched(prev => ({ ...prev, email: true }));
                        }}
                        onBlur={() => handleBlur('email')}
                        placeholder="s.jenkins@enterprise.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors ${
                          touched.email && validationErrors.email 
                            ? 'border-rose-500/80 focus:border-rose-500 bg-rose-500/5' 
                            : touched.email && !validationErrors.email && formData.email.trim() 
                              ? 'border-emerald-500/60 focus:border-emerald-500' 
                              : 'border-[var(--border-subtle)] focus:border-amber-500'
                        }`}
                      />
                      {touched.email && validationErrors.email && (
                        <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{validationErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Field Row 2: Company Website URL (REAL-TIME VALIDATION) & Primary Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* ENHANCED COMPANY URL WITH REAL-TIME CLIENT-SIDE VALIDATION */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-[var(--text-secondary)] flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-amber-500" />
                          <span>Company Website / URL</span>
                        </label>
                        {formData.companyUrl.trim() && !validationErrors.companyUrl && (
                          <span className="text-[10px] text-emerald-500 flex items-center gap-0.5 font-medium">
                            <CheckCircle2 className="w-3 h-3" /> Valid format
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          maxLength={200}
                          value={formData.companyUrl}
                          onChange={(e) => {
                            setFormData({ ...formData, companyUrl: e.target.value });
                            if (!touched.companyUrl) setTouched(prev => ({ ...prev, companyUrl: true }));
                          }}
                          onBlur={() => handleBlur('companyUrl')}
                          placeholder="e.g. acme.io or https://nexusflow.com"
                          className={`w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-[var(--bg-secondary)] border text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors font-mono ${
                            touched.companyUrl && validationErrors.companyUrl 
                              ? 'border-rose-500/80 focus:border-rose-500 bg-rose-500/5' 
                              : formData.companyUrl.trim() && !validationErrors.companyUrl 
                                ? 'border-emerald-500/60 focus:border-emerald-500' 
                                : 'border-[var(--border-subtle)] focus:border-amber-500'
                          }`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          {touched.companyUrl && validationErrors.companyUrl ? (
                            <AlertCircle className="w-4 h-4 text-rose-500" />
                          ) : formData.companyUrl.trim() && !validationErrors.companyUrl ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : null}
                        </div>
                      </div>

                      {/* Real-time inline feedback */}
                      {touched.companyUrl && validationErrors.companyUrl ? (
                        <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{validationErrors.companyUrl}</span>
                        </p>
                      ) : formData.companyUrl.trim() && !validationErrors.companyUrl ? (
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                          <Check className="w-3 h-3 shrink-0" />
                          <span>Normalized as {formData.companyUrl.startsWith('http') ? formData.companyUrl : `https://${formData.companyUrl}`}</span>
                        </p>
                      ) : (
                        <p className="text-[10px] text-[var(--text-muted)] mt-1">
                          Optional: Enterprise domain or landing page to audit before consultation.
                        </p>
                      )}
                    </div>

                    {/* Service Focus */}
                    <div>
                      <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">
                        Primary Service Focus
                      </label>
                      <select
                        value={formData.projectScope}
                        onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-amber-500 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none transition-colors cursor-pointer"
                      >
                        <option>B2B SaaS Enterprise SEO Copywriting</option>
                        <option>Marketing Data Analysis (Power BI &amp; Python)</option>
                        <option>Content Architecture &amp; CRO Optimization</option>
                        <option>Predictive Content Intelligence &amp; Competitor Defense</option>
                        <option>Full-Stack Web Architecture &amp; Copy Hybrid</option>
                      </select>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1">
                        Sayan prepares relevant SaaS case studies based on this choice.
                      </p>
                    </div>
                  </div>

                  {/* ============================================================ */}
                  {/* ENHANCED BUDGET RANGE SELECTION WITH REAL-TIME VALIDATION */}
                  {/* ============================================================ */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[var(--text-secondary)] flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                        <span>Enterprise Budget Bracket <span className="text-rose-500">*</span></span>
                      </label>
                      <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                        Selected: {formData.budgetRange}
                      </span>
                    </div>

                    {/* Interactive 4-Tier Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {BUDGET_TIERS.map((tier) => {
                        const isSelected = formData.budgetRange === tier.range;
                        return (
                          <div
                            key={tier.id}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, budgetRange: tier.range }));
                              setTouched(prev => ({ ...prev, budgetRange: true }));
                            }}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative flex flex-col justify-between ${
                              isSelected
                                ? 'bg-amber-500/10 border-amber-500 dark:border-amber-400 ring-1 ring-amber-500/30 shadow-sm'
                                : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] hover:border-amber-500/40 hover:bg-[var(--bg-secondary)]/80'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] font-display tracking-tight flex items-center gap-1.5">
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  isSelected 
                                    ? 'border-amber-500 bg-amber-500 text-neutral-950' 
                                    : 'border-[var(--border-subtle)] bg-[var(--bg-card)]'
                                }`}>
                                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                                <span>{tier.range}</span>
                              </span>

                              {tier.badge && (
                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                                  tier.recommended
                                    ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                                }`}>
                                  {tier.badge}
                                </span>
                              )}
                            </div>

                            <p className="text-[11px] font-semibold text-[var(--text-secondary)] line-clamp-1">
                              {tier.name}
                            </p>
                            <p className="text-[10px] text-[var(--text-muted)] line-clamp-2 mt-0.5 leading-snug">
                              {tier.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Real-time Budget Validation Feedback / Scope context */}
                    {touched.budgetRange && validationErrors.budgetRange ? (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{validationErrors.budgetRange}</span>
                      </p>
                    ) : activeBudgetTier ? (
                      <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-2 text-[11px] text-[var(--text-secondary)]">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-700 dark:text-amber-300 font-semibold">{activeBudgetTier.range} Alignment:</strong>{' '}
                          <span>{activeBudgetTier.description}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Project Objectives & Brief */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-[var(--text-secondary)]">
                        Project Brief or Strategic Objectives
                      </label>
                      <span className={`text-[10px] font-mono ${
                        formData.notes.trim().length > 0 && formData.notes.trim().length < 15
                          ? 'text-rose-500 font-bold'
                          : formData.notes.trim().length >= 15
                            ? 'text-emerald-500'
                            : 'text-[var(--text-muted)]'
                      }`}>
                        {formData.notes.trim().length}/1500 chars {formData.notes.trim().length > 0 && formData.notes.trim().length < 15 && '(min 15 chars)'}
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      maxLength={1500}
                      value={formData.notes}
                      onChange={(e) => {
                        setFormData({ ...formData, notes: e.target.value });
                        if (!touched.notes) setTouched(prev => ({ ...prev, notes: true }));
                      }}
                      onBlur={() => handleBlur('notes')}
                      placeholder="Outline upcoming product launch, conversion bottlenecks, or telemetry dashboard requirements..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors resize-none ${
                        validationErrors.notes
                          ? 'border-rose-500/80 focus:border-rose-500 bg-rose-500/5'
                          : formData.notes.trim().length >= 15
                            ? 'border-emerald-500/60 focus:border-emerald-500'
                            : 'border-[var(--border-subtle)] focus:border-amber-500'
                      }`}
                    />
                    {validationErrors.notes && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{validationErrors.notes}</span>
                      </p>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Strict NDA &amp; enterprise confidentiality honored</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] text-xs font-semibold text-[var(--text-secondary)] transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !isFormValid}
                        className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-neutral-950 text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer ${
                          isFormValid && !isSubmitting
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-amber-500/20'
                            : 'bg-neutral-600 text-neutral-400 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                            <span>Logging to Firestore...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Transmit Project Parameters</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Contact Footer Strip */}
            <div className="px-5 py-3 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Timezone: GMT+5:30 (India Standard Time) &bull; Active overlap with US &amp; EU cycles</span>
              </div>
              <div>
                Direct Inbox:{' '}
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`} 
                  className="font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
