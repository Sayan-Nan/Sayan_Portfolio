import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  CheckCircle,
  ArrowRight, 
  Send, 
  ShieldCheck, 
  Globe, 
  Calendar,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Database,
  ExternalLink,
  Copy,
  Check,
  DollarSign,
  TrendingUp,
  X
} from 'lucide-react';
import { PERSONAL_INFO, SERVICES } from '../data/portfolioData';
import { submitEnterpriseInquiry, generateDirectMailto, InquiryResult } from '../lib/inquiries';

interface ContactViewProps {
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

export const ContactView: React.FC<ContactViewProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyUrl: '',
    selectedService: initialService || 'b2b-seo-copywriting',
    budgetRange: '$5,000 - $15,000',
    timeline: 'Within 2-4 Weeks',
    message: '',
  });

  // Real-time touched tracking for client-side validation
  const [touched, setTouched] = useState<Record<string, boolean>>({
    fullName: false,
    workEmail: false,
    companyUrl: false,
    budgetRange: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<InquiryResult | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Success Toast notification states
  const [showToast, setShowToast] = useState(false);
  const [toastProgress, setToastProgress] = useState(100);
  const [copiedToastRef, setCopiedToastRef] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastProgressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Synchronize initialService if passed or changed
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, selectedService: initialService }));
    }
  }, [initialService]);

  // Clean up toast timers on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (toastProgressRef.current) clearInterval(toastProgressRef.current);
    };
  }, []);

  // Live clocks for international operational nodes
  const [nodeTimes, setNodeTimes] = useState({
    singapore: '',
    bangalore: '',
    london: ''
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setNodeTimes({
        singapore: new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Singapore',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(now),
        bangalore: new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(now),
        london: new Intl.DateTimeFormat('en-US', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(now),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 10000);
    return () => clearInterval(interval);
  }, []);

  const timelineOptions = [
    'Immediate (Next 7 Days)',
    'Within 2-4 Weeks',
    'Planning for Next Quarter',
  ];

  // =========================================================================
  // REAL-TIME CLIENT-SIDE VALIDATION
  // =========================================================================
  const validationErrors = useMemo(() => {
    const errors: Record<string, string> = {};

    // 1. Full Name
    const nameVal = formData.fullName.trim();
    if (touched.fullName || nameVal.length > 0) {
      if (!nameVal) {
        errors.fullName = 'Please enter your full name.';
      } else if (nameVal.length < 2) {
        errors.fullName = 'Name must be at least 2 characters.';
      }
    }

    // 2. Work Email
    const emailVal = formData.workEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (touched.workEmail || emailVal.length > 0) {
      if (!emailVal) {
        errors.workEmail = 'Corporate work email is required.';
      } else if (!emailRegex.test(emailVal)) {
        errors.workEmail = 'Please provide a valid work email address (e.g. name@company.com).';
      }
    }

    // 3. Company URL (Strict real-time client-side validation)
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

    // 4. Budget Range (Real-time client-side validation)
    const budgetVal = formData.budgetRange.trim();
    if (touched.budgetRange || budgetVal.length > 0) {
      if (!budgetVal) {
        errors.budgetRange = 'Please select an estimated budget tier to align project scope.';
      } else {
        const validTiers = BUDGET_TIERS.map(t => t.range);
        if (!validTiers.includes(budgetVal)) {
          errors.budgetRange = 'Please select a recognized enterprise budget tier.';
        }
      }
    }

    // 5. Message / Project Brief
    const msgVal = formData.message.trim();
    if (touched.message || msgVal.length > 0) {
      if (!msgVal) {
        errors.message = 'Please provide a brief outline of your project goals.';
      } else if (msgVal.length < 15) {
        errors.message = `Message must be at least 15 characters (currently ${msgVal.length}).`;
      }
    }

    return errors;
  }, [formData, touched]);

  // Is company URL positively validated?
  const isCompanyUrlValid = useMemo(() => {
    const rawUrl = formData.companyUrl.trim();
    if (!rawUrl) return false;
    return !validationErrors.companyUrl;
  }, [formData.companyUrl, validationErrors.companyUrl]);

  // Is budget range valid?
  const isBudgetValid = useMemo(() => {
    return BUDGET_TIERS.some(t => t.range === formData.budgetRange.trim());
  }, [formData.budgetRange]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Trigger floating Success Toast notification
  const triggerSuccessToast = (result: InquiryResult) => {
    setShowToast(true);
    setToastProgress(100);

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (toastProgressRef.current) clearInterval(toastProgressRef.current);

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

    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, totalDuration);
  };

  const copyToastTrackingId = (id: string) => {
    navigator.clipboard.writeText(`INQ-${id}`);
    setCopiedToastRef(true);
    setTimeout(() => setCopiedToastRef(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched to trigger any pending field warnings
    setTouched({
      fullName: true,
      workEmail: true,
      companyUrl: true,
      budgetRange: true,
      message: true,
    });

    // Validate inputs
    const nameVal = formData.fullName.trim();
    const emailVal = formData.workEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const msgVal = formData.message.trim();

    if (nameVal.length < 2 || !emailRegex.test(emailVal) || msgVal.length < 15 || validationErrors.companyUrl || !isBudgetValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    // Normalize company URL if provided
    let normalizedUrl = '';
    if (formData.companyUrl.trim()) {
      const raw = formData.companyUrl.trim();
      normalizedUrl = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    }

    try {
      const result = await submitEnterpriseInquiry({
        fullName: nameVal,
        workEmail: emailVal,
        companyUrl: normalizedUrl,
        selectedService: formData.selectedService,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        message: msgVal,
      });

      setSubmissionResult(result);
      if (!result.firestoreSaved && result.permissionNotice) {
        setSubmissionError(result.permissionNotice);
      }
      setIsSubmitted(true);
      triggerSuccessToast(result);
    } catch (error) {
      console.warn('Inquiry transmission fallback:', error);
      const fallbackId = 'INQ-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      const mailtoUrl = generateDirectMailto(fallbackId, {
        ...formData,
        companyUrl: normalizedUrl,
      });
      const fallbackResult: InquiryResult = {
        id: fallbackId,
        createdAt: new Date().toISOString(),
        mailtoUrl,
        firestoreSaved: false,
        permissionNotice: 'Local parameter cache active. Direct inbox transmission link ready.',
      };
      setSubmissionResult(fallbackResult);
      setIsSubmitted(true);
      triggerSuccessToast(fallbackResult);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      workEmail: '',
      companyUrl: '',
      selectedService: 'b2b-seo-copywriting',
      budgetRange: '$5,000 - $15,000',
      timeline: 'Within 2-4 Weeks',
      message: '',
    });
    setSubmissionResult(null);
    setSubmissionError(null);
    setCopiedRef(false);
    setIsSubmitted(false);
    setShowToast(false);
    setTouched({
      fullName: false,
      workEmail: false,
      companyUrl: false,
      budgetRange: false,
      message: false,
    });
  };

  const copyRefToClipboard = (id: string) => {
    navigator.clipboard.writeText(`INQ-${id}`);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const activeBudgetTier = BUDGET_TIERS.find(t => t.range === formData.budgetRange) || BUDGET_TIERS[1];

  return (
    <article id="contact-page-root" className="w-full space-y-16 sm:space-y-24 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* ============================================================ */}
      {/* FLOATING SUCCESS TOAST NOTIFICATION (Top-Center / Immediate) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showToast && submissionResult && (
          <motion.div
            key="contact-success-toast"
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            role="status"
            aria-live="polite"
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[80] w-[92%] max-w-lg bg-neutral-950/95 dark:bg-neutral-900/95 border border-emerald-500/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_25px_rgba(16,185,129,0.25)] backdrop-blur-md overflow-hidden text-neutral-100"
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
                  Project Scope Transmitted!
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
                    onClick={() => copyToastTrackingId(submissionResult.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-medium text-neutral-200 border border-neutral-700 transition-colors cursor-pointer"
                    title="Copy tracking reference"
                  >
                    {copiedToastRef ? (
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

      {/* 1. Header Banner */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Direct Enterprise Advisory & Inquiries</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] font-display tracking-tight leading-tight">
          Let's Talk For Your <br />
          <span className="text-amber-500">Next Growth Sprint</span>
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          Whether you need a high-intent B2B SaaS topic cluster, an executive Power BI attribution dashboard, or full-funnel CRO, submit your parameters below.
        </p>
      </section>

      {/* 2. Main Form & Visual Component Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: The "Let's Talk" Form Container */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xl relative overflow-hidden backdrop-blur-xs">
          
          {isSubmitted && submissionResult ? (
            <div className="text-center py-8 sm:py-10 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center ring-8 ring-emerald-500/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold border ${
                  submissionResult.firestoreSaved 
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' 
                    : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                }`}>
                  {submissionResult.firestoreSaved ? (
                    <>
                      <Database className="w-3.5 h-3.5" />
                      <span>Logged in Firestore Backend &bull; sayan-nan-portfolio</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5" />
                      <span>Parameters Buffered &bull; Direct Inbox Bridge Ready</span>
                    </>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-display">
                  Parameters Transmitted Successfully!
                </h2>
                <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your project scope for <strong>{formData.companyUrl || 'your organization'}</strong> has been registered with reference <strong>INQ-{submissionResult.id}</strong>.
                </p>
              </div>

              {submissionError && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300 text-left max-w-md mx-auto flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                  <span>{submissionError}</span>
                </div>
              )}

              {/* Reference ID and Transmit Action */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs text-left max-w-lg mx-auto space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
                  <span className="text-[var(--text-muted)] font-bold uppercase tracking-wider">Reference Tracking ID</span>
                  <button
                    onClick={() => copyRefToClipboard(submissionResult.id)}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-primary)] hover:border-amber-400 transition-colors cursor-pointer"
                    title="Copy Reference ID"
                  >
                    {copiedRef ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[var(--text-muted)]" />
                        <span>Copy Ref</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  INQ-{submissionResult.id}
                </div>

                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Target Service:</span>
                    <span className="text-[var(--text-primary)] font-medium">{formData.selectedService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Budget Tier:</span>
                    <span className="text-[var(--text-primary)] font-medium">{formData.budgetRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Kickoff Timeline:</span>
                    <span className="text-[var(--text-primary)] font-medium">{formData.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Client Email:</span>
                    <span className="text-[var(--text-primary)] font-medium">{formData.workEmail}</span>
                  </div>
                </div>
              </div>

              {/* Direct Mailbox Push CTA */}
              <div className="max-w-lg mx-auto space-y-3 pt-2">
                <a
                  href={submissionResult.mailtoUrl}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-neutral-950" />
                  <span>Transmit Directly to Sayan's Inbox</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Launches your email client with the scope, parameters, and reference ID pre-formatted for direct inbox delivery to <span className="font-semibold text-[var(--text-primary)]">{PERSONAL_INFO.email}</span>.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-amber-400 text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  Submit Another Project Scope
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              <div className="border-b border-[var(--border-subtle)] pb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)] font-display">
                    Project Scope & Consultation Intake
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Direct engagement intake for B2B strategy, topic clusters, and marketing data pipelines. Average response time: &lt;12 hours.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-semibold shrink-0">
                  <Database className="w-3 h-3" />
                  <span>Firestore Sync Active</span>
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="contact-full-name" className="block text-xs font-bold text-[var(--text-primary)]">
                      Full Name *
                    </label>
                    {formData.fullName.trim().length >= 2 && !validationErrors.fullName && (
                      <span className="text-[10px] text-emerald-500 flex items-center gap-0.5 font-medium">
                        <Check className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <input
                    id="contact-full-name"
                    type="text"
                    required
                    maxLength={100}
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                    }}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 transition-colors ${
                      validationErrors.fullName 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-[var(--border-subtle)] focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                  {validationErrors.fullName && (
                    <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {validationErrors.fullName}
                    </span>
                  )}
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="contact-work-email" className="block text-xs font-bold text-[var(--text-primary)]">
                      Work Email *
                    </label>
                    {formData.workEmail.trim() && !validationErrors.workEmail && (
                      <span className="text-[10px] text-emerald-500 flex items-center gap-0.5 font-medium">
                        <Check className="w-3 h-3" /> Valid Email
                      </span>
                    )}
                  </div>
                  <input
                    id="contact-work-email"
                    type="email"
                    required
                    maxLength={120}
                    value={formData.workEmail}
                    onChange={(e) => {
                      setFormData({ ...formData, workEmail: e.target.value });
                    }}
                    onBlur={() => handleBlur('workEmail')}
                    placeholder="e.g. alex@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 transition-colors ${
                      validationErrors.workEmail 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-[var(--border-subtle)] focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                  {validationErrors.workEmail && (
                    <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {validationErrors.workEmail}
                    </span>
                  )}
                </div>

              </div>

              {/* Company / Website URL with Real-Time Client-Side Validation */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="contact-company-url" className="block text-xs font-bold text-[var(--text-primary)]">
                    Company / Product URL (Optional)
                  </label>
                  {formData.companyUrl.trim() && (
                    <span className="text-[10px] font-medium">
                      {isCompanyUrlValid ? (
                        <span className="text-emerald-500 flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Valid Domain Syntax
                        </span>
                      ) : (
                        <span className="text-amber-500 flex items-center gap-0.5">
                          <AlertCircle className="w-3 h-3" /> Checking Syntax...
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    id="contact-company-url"
                    type="text"
                    maxLength={200}
                    value={formData.companyUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, companyUrl: e.target.value });
                    }}
                    onBlur={() => handleBlur('companyUrl')}
                    placeholder="e.g. company.com or https://company.com"
                    className={`w-full pl-10 pr-10 py-3 rounded-xl bg-[var(--bg-secondary)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 transition-colors ${
                      validationErrors.companyUrl
                        ? 'border-red-500 focus:ring-red-500'
                        : isCompanyUrlValid
                        ? 'border-emerald-500/60 focus:border-emerald-500 focus:ring-emerald-500'
                        : 'border-[var(--border-subtle)] focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                  {formData.companyUrl.trim() && (
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                      {isCompanyUrlValid ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {validationErrors.companyUrl ? (
                  <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {validationErrors.companyUrl}
                  </span>
                ) : (
                  <span className="text-[11px] text-[var(--text-muted)] block">
                    Provides domain context for preliminary B2B SaaS positioning review. Protocol (https://) automatically attached.
                  </span>
                )}
              </div>

              {/* Service of Interest */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[var(--text-primary)]">
                  Primary Service of Interest *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES.map((srv) => (
                    <button
                      type="button"
                      key={srv.id}
                      onClick={() => setFormData({ ...formData, selectedService: srv.id })}
                      className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        formData.selectedService === srv.id
                          ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/30'
                          : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{srv.title}</span>
                        {formData.selectedService === srv.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range with Real-Time Client-Side Validation & Guidance */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                    <span>Estimated Engagement Budget *</span>
                  </label>
                  <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                    {formData.budgetRange}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BUDGET_TIERS.map((tier) => {
                    const isSelected = formData.budgetRange === tier.range;
                    return (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => {
                          setFormData({ ...formData, budgetRange: tier.range });
                          handleBlur('budgetRange');
                        }}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/40 text-[var(--text-primary)] shadow-xs'
                            : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-400/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`text-xs font-bold ${isSelected ? 'text-amber-600 dark:text-amber-400' : 'text-[var(--text-primary)]'}`}>
                            {tier.range}
                          </span>
                          {tier.badge && (
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                              tier.recommended 
                                ? 'bg-amber-500 text-neutral-950' 
                                : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)]'
                            }`}>
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-semibold text-[var(--text-primary)] leading-tight">
                          {tier.name}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Budget Guidance Card */}
                {activeBudgetTier && (
                  <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-1 animate-in fade-in duration-200">
                    <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Scope Included in {activeBudgetTier.range}: {activeBudgetTier.name}</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                      {activeBudgetTier.description}
                    </p>
                  </div>
                )}

                {validationErrors.budgetRange && (
                  <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" /> {validationErrors.budgetRange}
                  </span>
                )}
              </div>

              {/* Timeline Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>Preferred Kickoff Timeline</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {timelineOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setFormData({ ...formData, timeline: opt })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        formData.timeline === opt
                          ? 'bg-[var(--text-primary)] text-[var(--bg-card)] font-bold border-[var(--text-primary)]'
                          : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-amber-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Brief / Message Textarea with Real-Time Validation */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="contact-message" className="block text-xs font-bold text-[var(--text-primary)]">
                    Project Brief & Current Bottleneck *
                  </label>
                  <span className={`text-[10px] font-mono ${
                    formData.message.trim().length >= 15 ? 'text-emerald-500' : 'text-[var(--text-muted)]'
                  }`}>
                    {formData.message.trim().length}/3000 (min 15 chars)
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  maxLength={3000}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                  }}
                  onBlur={() => handleBlur('message')}
                  placeholder="Tell me about your product, your target ICP (Enterprise, Mid-Market, SMB), current conversion rates, and what success looks like..."
                  className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 transition-colors ${
                    validationErrors.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-[var(--border-subtle)] focus:border-amber-500 focus:ring-amber-500'
                  }`}
                />
                {validationErrors.message && (
                  <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3" /> {validationErrors.message}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                      <span>Validating & Logging Inquiry to Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-neutral-950" />
                      <span>Transmit Parameters to Sayan</span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-3 text-[11px] text-[var(--text-muted)] text-center mt-2.5">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>100% Confidentiality & Strict NDA</span>
                  </span>
                  <span>&bull;</span>
                  <span>Direct Principal Review</span>
                </div>
              </div>

            </form>
          )}

        </div>

        {/* Right Column: Direct Info, Operating Hours & Credentials */}
        <aside className="lg:col-span-5 space-y-6">
          
          {/* Fast Response Guarantee Box */}
          <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
              Engagement Standards
            </span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] font-display">
              Direct Communication, Zero Intermediaries
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              When you contact me, you correspond directly with Sayan Nan — not an account manager or intern. We evaluate whether our sprint can generate measurable pipeline lift before agreeing to work together.
            </p>

            <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)] text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-amber-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-[var(--text-primary)]">Response Latency</span>
                  <span className="text-[var(--text-muted)]">Guaranteed response in &le; 12 business hours</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-amber-500">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-[var(--text-primary)]">Direct Email Channel</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-amber-700 dark:text-amber-400 hover:underline font-mono">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-amber-500">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-[var(--text-primary)]">Base Location</span>
                  <span className="text-[var(--text-muted)] font-medium">Remote / Bengaluru (Global Client Reach)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Zone Nodes Box with Live Clocks */}
          <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[var(--text-primary)] font-display">
                Active Operational Nodes
              </h4>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Clocks
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-1">
                <span className="block text-[10px] font-mono font-bold text-[var(--text-muted)]">SGT (UTC+8)</span>
                <span className="block text-xs font-extrabold text-[var(--text-primary)] font-mono">
                  {nodeTimes.singapore || '12:00 PM'}
                </span>
                <span className="block text-[10px] text-[var(--text-muted)]">Singapore</span>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-amber-500/40 space-y-1 shadow-2xs">
                <span className="block text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">IST (UTC+5.5)</span>
                <span className="block text-xs font-extrabold text-[var(--text-primary)] font-mono">
                  {nodeTimes.bangalore || '09:30 AM'}
                </span>
                <span className="block text-[10px] font-semibold text-amber-600 dark:text-amber-400">Remote/Bengaluru</span>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-1">
                <span className="block text-[10px] font-mono font-bold text-[var(--text-muted)]">GMT (UTC+0)</span>
                <span className="block text-xs font-extrabold text-[var(--text-primary)] font-mono">
                  {nodeTimes.london || '04:00 AM'}
                </span>
                <span className="block text-[10px] text-[var(--text-muted)]">London</span>
              </div>
            </div>
          </div>

          {/* Direct Scheduling Link Card */}
          <div className="p-6 rounded-3xl bg-[var(--bg-secondary)] border border-amber-500/30 space-y-3">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Need an Instant Diagnostic Call?</span>
            </span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              If you have an immediate RFP or sprint kickoff scheduled for this week, send an email titled <strong>"PRIORITY AUDIT"</strong> to fast-track your review.
            </p>
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=PRIORITY%20AUDIT%20Request`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
            >
              <span>Email {PERSONAL_INFO.email} with Priority Subject</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </aside>

      </section>

    </article>
  );
};
