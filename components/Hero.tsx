'use client';

import React from 'react';
import { useHomewardStore } from '@/lib/store';
import { ShieldCheck, HeartHandshake, Plane, Clock, CheckCircle2, ArrowRight, Activity, Users } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export const Hero: React.FC = () => {
  const { setActiveView, policy, setClaimModalOpen } = useHomewardStore();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#e9e4dc]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/40 via-emerald-50/20 to-transparent pointer-events-none -z-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Pitch */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Peace of mind badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/5 border border-emerald-800/15 text-emerald-900 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>3-Year Emergency Travel Protection for Migrants & Techies</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#112920] tracking-tight leading-[1.15]">
              When family calls in an emergency, money shouldn't delay your flight home.
            </h1>

            {/* Empathetic copy */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Pay <strong className="text-slate-900 font-semibold">₹5,000 once</strong> for a <strong className="text-slate-900 font-semibold">3-year pass</strong>. Register your 3 emergency home routes and family members. If a medical emergency or bereavement occurs, book any flight immediately — we reimburse you <strong className="text-emerald-800 font-semibold">up to ₹20,000</strong>.
            </p>

            {/* Quick Benefits Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">
                  <strong>3 Pre-selected routes</strong> (e.g. BLR → AMD, JAI, UDR)
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">
                  <strong>Up to ₹20,000 payout</strong> for surge & tatkal flight fares
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">
                  <strong>Covers Health & Bereavement</strong> of registered parents/spouse
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">
                  <strong>Zero-hassle refund</strong>: book flight first, claim after reaching
                </span>
              </div>
            </div>

            {/* Action CTA Group */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {policy ? (
                <>
                  <button
                    onClick={() => setActiveView('dashboard')}
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold bg-emerald-800 hover:bg-emerald-900 text-white shadow-lg shadow-emerald-950/10 hover:shadow-xl transition-all"
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-200" />
                    <span>View Active 3-Year Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setClaimModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 shadow-sm transition-all"
                  >
                    <span>Emergency! File a Claim</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveView('wizard')}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold bg-emerald-800 hover:bg-emerald-900 text-white shadow-lg shadow-emerald-950/15 hover:shadow-xl transition-all group"
                  >
                    <span>Get 3-Year Pass (₹5,000)</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white border border-[#ded8cf] shadow-sm transition-all"
                  >
                    See How It Works
                  </a>
                </>
              )}
            </div>

            {/* Trust reassurance note */}
            <p className="text-xs text-slate-500 flex items-center gap-2 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Transparent terms. Strict verification. No hidden cancellation penalties.</span>
            </p>

          </div>

          {/* Right Column: Physical-style Pass Certificate Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-gradient-to-br from-[#0c392b] via-[#094132] to-[#04281e] text-white rounded-3xl p-7 shadow-2xl shadow-emerald-950/30 border border-emerald-600/30 overflow-hidden">
              
              {/* Decorative background watermark */}
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
              <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-teal-400/10 blur-2xl pointer-events-none" />

              {/* Pass Header */}
              <div className="flex items-center justify-between border-b border-emerald-700/50 pb-5">
                <div>
                  <div className="text-[10px] tracking-widest uppercase font-semibold text-emerald-300">
                    Official Guarantee
                  </div>
                  <div className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
                    Homeward Pass
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-200 text-xs font-semibold">
                  3 Years Validity
                </div>
              </div>

              {/* Coverage Highlight */}
              <div className="py-5 grid grid-cols-2 gap-4 border-b border-emerald-700/40">
                <div>
                  <div className="text-xs text-emerald-300/80 font-medium">One-Time Fee</div>
                  <div className="text-2xl font-bold text-white mt-0.5">₹5,000</div>
                  <div className="text-[11px] text-emerald-300/60">₹138 / month equiv.</div>
                </div>
                <div>
                  <div className="text-xs text-emerald-300/80 font-medium">Max Reimbursement</div>
                  <div className="text-2xl font-bold text-emerald-300 mt-0.5">₹20,000</div>
                  <div className="text-[11px] text-emerald-300/60">Per valid emergency flight</div>
                </div>
              </div>

              {/* Sample 3 Routes */}
              <div className="py-4 space-y-2 border-b border-emerald-700/40">
                <div className="text-[11px] font-semibold tracking-wide uppercase text-emerald-300/80 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3 Predefined Emergency Routes</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-lg p-2">
                    <span className="text-white font-bold">BLR → AMD</span>
                    <span className="block text-[10px] text-emerald-300/70">Ahmedabad</span>
                  </div>
                  <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-lg p-2">
                    <span className="text-white font-bold">BLR → JAI</span>
                    <span className="block text-[10px] text-emerald-300/70">Jaipur</span>
                  </div>
                  <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-lg p-2">
                    <span className="text-white font-bold">BLR → UDR</span>
                    <span className="block text-[10px] text-emerald-300/70">Udaipur</span>
                  </div>
                </div>
              </div>

              {/* Covered Emergency Scope */}
              <div className="pt-4 space-y-2">
                <div className="text-[11px] font-semibold tracking-wide uppercase text-emerald-300/80 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Strict Emergency Coverage</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-100/90 bg-emerald-900/40 rounded-xl p-3 border border-emerald-700/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Hospitalization / ICU</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Demise / Bereavement</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Microcopy */}
              <div className="mt-5 pt-3 text-center border-t border-emerald-800/40 text-[11px] text-emerald-300/70">
                Book cheapest & fastest flight at the moment • Submit claim after reaching
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
