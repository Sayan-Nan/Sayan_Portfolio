import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// User-provided Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDeqGXnmSuSSeMN3RVjYbQRCjk4qIN4QFw",
  authDomain: "sayan-nan-portfolio.firebaseapp.com",
  projectId: "sayan-nan-portfolio",
  storageBucket: "sayan-nan-portfolio.firebasestorage.app",
  messagingSenderId: "17146038984",
  appId: "1:17146038984:web:7a3d944f745a4d69da33fd"
};

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore and Authentication
export const db = getFirestore(app);
export const auth = getAuth(app);

// Skill Standardized Error Handling
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown, 
  operationType: OperationType, 
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(p => ({
        providerId: p.providerId,
        email: p.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test on boot per skill instructions
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firestore client is currently offline. Transmissions will queue or use direct mail fallback.");
      return false;
    }
    // Permissions error on 'test/connection' is normal because default rules deny unmapped paths
    return true;
  }
}

// Boot test invocation
testFirestoreConnection().catch(() => {});
