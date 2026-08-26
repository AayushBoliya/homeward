'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PassPolicy, Claim, ClaimStatus, FamilyMember, EmergencyRoute } from '@/types';
import { INITIAL_POLICY, INITIAL_CLAIMS } from './mockData';

interface HomewardContextType {
  policy: PassPolicy | null;
  claims: Claim[];
  activeView: 'landing' | 'wizard' | 'dashboard' | 'admin';
  claimModalOpen: boolean;
  activeClaimForReview: Claim | null;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  
  // Actions
  setActiveView: (view: 'landing' | 'wizard' | 'dashboard' | 'admin') => void;
  setClaimModalOpen: (open: boolean) => void;
  setActiveClaimForReview: (claim: Claim | null) => void;
  createPolicy: (data: {
    holderName: string;
    holderPhone: string;
    holderEmail: string;
    holderCity: string;
    registeredRoutes: EmergencyRoute[];
    coveredFamilyMembers: FamilyMember[];
  }) => PassPolicy;
  submitClaim: (data: Omit<Claim, 'id' | 'claimNumber' | 'createdAt' | 'payoutStatus'>) => Claim;
  updateClaimStatus: (claimId: string, status: ClaimStatus, reviewNotes?: string) => void;
  resetToMockData: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const HomewardContext = createContext<HomewardContextType | undefined>(undefined);

const STORAGE_KEY_POLICY = 'homeward_policy_v1';
const STORAGE_KEY_CLAIMS = 'homeward_claims_v1';

export const HomewardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [policy, setPolicy] = useState<PassPolicy | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [activeView, setActiveView] = useState<'landing' | 'wizard' | 'dashboard' | 'admin'>('landing');
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [activeClaimForReview, setActiveClaimForReview] = useState<Claim | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from LocalStorage or default to INITIAL_POLICY for rich demo experience
  useEffect(() => {
    try {
      const savedPolicy = localStorage.getItem(STORAGE_KEY_POLICY);
      const savedClaims = localStorage.getItem(STORAGE_KEY_CLAIMS);

      if (savedPolicy) {
        setPolicy(JSON.parse(savedPolicy));
      } else {
        setPolicy(INITIAL_POLICY);
      }

      if (savedClaims) {
        setClaims(JSON.parse(savedClaims));
      } else {
        setClaims(INITIAL_CLAIMS);
      }
    } catch {
      setPolicy(INITIAL_POLICY);
      setClaims(INITIAL_CLAIMS);
    }
    setIsHydrated(true);
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (!isHydrated) return;
    if (policy) {
      localStorage.setItem(STORAGE_KEY_POLICY, JSON.stringify(policy));
    } else {
      localStorage.removeItem(STORAGE_KEY_POLICY);
    }
  }, [policy, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY_CLAIMS, JSON.stringify(claims));
  }, [claims, isHydrated]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const createPolicy = (data: {
    holderName: string;
    holderPhone: string;
    holderEmail: string;
    holderCity: string;
    registeredRoutes: EmergencyRoute[];
    coveredFamilyMembers: FamilyMember[];
  }): PassPolicy => {
    const now = new Date();
    const threeYearsLater = new Date(now);
    threeYearsLater.setFullYear(now.getFullYear() + 3);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newPolicy: PassPolicy = {
      id: `pol_${Date.now()}`,
      passNumber: `HW-${now.getFullYear()}-${randomSuffix}`,
      holderName: data.holderName,
      holderPhone: data.holderPhone,
      holderEmail: data.holderEmail,
      holderCity: data.holderCity,
      registeredRoutes: data.registeredRoutes,
      coveredFamilyMembers: data.coveredFamilyMembers,
      validFrom: now.toISOString(),
      validUntil: threeYearsLater.toISOString(),
      status: 'ACTIVE',
      costPaidInr: 5000,
      maxReimbursementPerClaimInr: 20000,
      claimsRemaining: 3,
    };

    setPolicy(newPolicy);
    showToast(`Emergency Pass ${newPolicy.passNumber} activated for 3 years!`, 'success');
    return newPolicy;
  };

  const submitClaim = (data: Omit<Claim, 'id' | 'claimNumber' | 'createdAt' | 'payoutStatus'>): Claim => {
    const randomClaimNum = Math.floor(1000 + Math.random() * 9000);
    const newClaim: Claim = {
      ...data,
      id: `clm_${Date.now()}`,
      claimNumber: `CLM-${randomClaimNum}`,
      payoutStatus: 'SUBMITTED',
      createdAt: new Date().toISOString(),
    };

    setClaims(prev => [newClaim, ...prev]);
    showToast(`Claim ${newClaim.claimNumber} registered. Verification team notified.`, 'success');
    return newClaim;
  };

  const updateClaimStatus = (claimId: string, status: ClaimStatus, reviewNotes?: string) => {
    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return {
          ...c,
          payoutStatus: status,
          reviewedAt: new Date().toISOString(),
          reviewNotes: reviewNotes || c.reviewNotes,
        };
      }
      return c;
    }));

    const statusLabel = status === 'APPROVED' ? 'Approved & Disbursed' : status === 'REJECTED' ? 'Rejected' : status;
    showToast(`Claim updated to ${statusLabel}`, status === 'APPROVED' ? 'success' : 'info');
  };

  const resetToMockData = () => {
    setPolicy(INITIAL_POLICY);
    setClaims(INITIAL_CLAIMS);
    showToast('Reset data to demo sample pass & claims', 'info');
  };

  return (
    <HomewardContext.Provider
      value={{
        policy,
        claims,
        activeView,
        claimModalOpen,
        activeClaimForReview,
        toast,
        setActiveView,
        setClaimModalOpen,
        setActiveClaimForReview,
        createPolicy,
        submitClaim,
        updateClaimStatus,
        resetToMockData,
        showToast,
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`px-5 py-3.5 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-emerald-950 text-emerald-100 border-emerald-700/50 shadow-emerald-950/20'
                : toast.type === 'error'
                ? 'bg-rose-950 text-rose-100 border-rose-700/50 shadow-rose-950/20'
                : 'bg-slate-900 text-slate-100 border-slate-700 shadow-slate-950/20'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </HomewardContext.Provider>
  );
};

export const useHomewardStore = () => {
  const context = useContext(HomewardContext);
  if (!context) {
    throw new Error('useHomewardStore must be used within a HomewardProvider');
  }
  return context;
};
