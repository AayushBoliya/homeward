'use client';

import React from 'react';
import { useHomewardStore } from '@/lib/store';
import { ShieldCheck, HeartHandshake, Plane, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { policy, activeView, setActiveView, setClaimModalOpen, resetToMockData } = useHomewardStore();

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e6e2da] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => setActiveView('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:bg-emerald-700 transition-colors">
            <HeartHandshake className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-2xl tracking-tight text-[#143026]">Homeward</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                Emergency Pass
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">When family needs you most</p>
          </div>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#ede8e1]/60 p-1.5 rounded-xl border border-[#e2dcd3]">
          <button
            onClick={() => setActiveView('landing')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeView === 'landing'
                ? 'bg-white text-emerald-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Overview
          </button>
          
          <button
            onClick={() => {
              if (policy) {
                setActiveView('dashboard');
              } else {
                setActiveView('wizard');
              }
            }}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === 'dashboard' || activeView === 'wizard'
                ? 'bg-white text-emerald-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            {policy ? 'My 3-Yr Pass' : 'Get Emergency Pass'}
          </button>

          <button
            onClick={() => setActiveView('admin')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === 'admin'
                ? 'bg-white text-emerald-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <UserCheck className="w-4 h-4 text-slate-500" />
            Claims Desk (Admin)
          </button>
        </nav>

        {/* Right CTA / Action */}
        <div className="flex items-center gap-3">
          {policy ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setClaimModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-rose-700 hover:bg-rose-800 text-white shadow-sm hover:shadow transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>File Claim</span>
              </button>
              
              <button
                onClick={() => setActiveView('dashboard')}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active: {policy.passNumber}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveView('wizard')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-800 hover:bg-emerald-900 text-white shadow-md shadow-emerald-900/15 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Get Pass — ₹5,000 for 3 Yrs</span>
            </button>
          )}

          {/* Quick Demo Reset Utility */}
          <button
            onClick={resetToMockData}
            title="Reset to Demo State (Sample Pass & Claims)"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-[#eae5dd] transition-colors text-xs"
          >
            ↻ Demo
          </button>
        </div>
      </div>
    </header>
  );
};
