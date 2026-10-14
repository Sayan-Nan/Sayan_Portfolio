import { doc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { PERSONAL_INFO } from '../data/portfolioData';

export interface InquirySubmission {
  fullName: string;
  workEmail: string;
  companyUrl?: string;
  selectedService: string;
  budgetRange: string;
  timeline: string;
  message: string;
}

export interface InquiryResult {
  id: string;
  createdAt: string;
  mailtoUrl: string;
  firestoreSaved: boolean;
  permissionNotice?: string | null;
}

/**
 * Sanitizes input values according to firebase-blueprint.json boundaries
 */
function sanitizeInquiry(data: InquirySubmission) {
  return {
    fullName: data.fullName.trim().slice(0, 100),
    workEmail: data.workEmail.trim().toLowerCase().slice(0, 120),
    companyUrl: data.companyUrl ? data.companyUrl.trim().slice(0, 200) : '',
    selectedService: data.selectedService.trim().slice(0, 100),
    budgetRange: data.budgetRange.trim().slice(0, 100),
    timeline: data.timeline.trim().slice(0, 100),
    message: data.message.trim().slice(0, 3000),
    status: 'new' as const,
  };
}

/**
 * Generates an executive mailto transmission link pre-populated with inquiry parameters
 */
export function generateDirectMailto(id: string, data: InquirySubmission): string {
  const subject = encodeURIComponent(
    `[Enterprise Inquiry ${id.slice(-6).toUpperCase()}] ${data.selectedService} — ${data.fullName}`
  );
  
  const bodyText = [
    `Dear Sayan,`,
    ``,
    `I have logged an enterprise engagement inquiry via your portfolio portal. Here are our project parameters:`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `ENTERPRISE PROJECT PARAMETERS`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `• Client Representative: ${data.fullName}`,
    `• Corporate Email: ${data.workEmail}`,
    `• Organization / Product URL: ${data.companyUrl || 'Not specified'}`,
    `• Selected Service Tier: ${data.selectedService}`,
    `• Estimated Budget Bracket: ${data.budgetRange}`,
    `• Target Delivery Timeline: ${data.timeline}`,
    `• Reference Tracking ID: ${id}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `PROJECT SCOPE & BUSINESS BOTTLENECK`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    data.message,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Looking forward to your review within 12 business hours.`,
    ``,
    `Best regards,`,
    data.fullName,
  ].join('\n');

  const encodedBody = encodeURIComponent(bodyText);
  return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${encodedBody}`;
}

/**
 * Persists client inquiry to Firestore collection `/inquiries/{inquiryId}`
 * and falls back seamlessly to local queue and direct email bridge if remote
 * Firebase rules have not yet been published in Firebase Console.
 */
export async function submitEnterpriseInquiry(data: InquirySubmission): Promise<InquiryResult> {
  const sanitized = sanitizeInquiry(data);
  const inquiriesCol = collection(db, 'inquiries');
  const inquiryRef = doc(inquiriesCol);
  const inquiryId = inquiryRef.id;

  const payload: Record<string, any> = {
    fullName: sanitized.fullName,
    workEmail: sanitized.workEmail,
    selectedService: sanitized.selectedService,
    budgetRange: sanitized.budgetRange,
    timeline: sanitized.timeline,
    message: sanitized.message,
    status: sanitized.status,
    createdAt: serverTimestamp(),
  };

  if (sanitized.companyUrl) {
    payload.companyUrl = sanitized.companyUrl;
  }

  // Pre-generate guaranteed email transmission link
  const mailtoUrl = generateDirectMailto(inquiryId, sanitized);

  // Guarantee client-side persistence in local queue
  try {
    const queue = JSON.parse(localStorage.getItem('pending_inquiries') || '[]');
    queue.push({
      id: inquiryId,
      ...sanitized,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('pending_inquiries', JSON.stringify(queue.slice(-50)));
  } catch {
    // Non-fatal if localStorage is restricted
  }

  let firestoreSaved = false;
  let permissionNotice: string | null = null;

  try {
    await setDoc(inquiryRef, payload);
    firestoreSaved = true;
  } catch (err: any) {
    const errMsg = err instanceof Error ? err.message : String(err);
    if (errMsg.includes('insufficient permissions') || errMsg.includes('permission-denied')) {
      permissionNotice = 'Remote Firestore rules allowlist pending on Firebase Console (sayan-nan-portfolio). Parameters safely buffered for direct inbox transmission.';
      console.warn('Inquiry notice:', permissionNotice);
    } else {
      console.warn('Firestore sync status:', errMsg);
    }
  }

  return {
    id: inquiryId,
    createdAt: new Date().toISOString(),
    mailtoUrl,
    firestoreSaved,
    permissionNotice,
  };
}
