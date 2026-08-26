'use client';

import React from 'react';
import { Check, X, ShieldAlert, Heart, FileText, Clock, AlertTriangle } from 'lucide-react';

export const CoverageExplainer: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#e9e4dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-emerald-700" />
            <span>Honest & Transparent Protection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#143026]">
            Strictly built for real family emergencies.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We keep the 3-year pass affordable at ₹5,000 by strictly protecting against real emergencies only. Here is exactly how coverage works.
          </p>
        </div>

        {/* Covered vs Not Covered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* What is Covered */}
          <div className="rounded-3xl p-8 bg-[#f5fbf7] border-2 border-emerald-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-950 font-serif">What is Covered (100% Eligible)</h3>
                <p className="text-xs text-emerald-700 font-medium">Reimbursed up to ₹20,000 per valid incident</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <strong className="text-slate-900 font-semibold block">Critical Hospitalization & ICU Admissions</strong>
                  Sudden emergency hospital admission, cardiac events, surgeries, or critical trauma of registered family members.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <strong className="text-slate-900 font-semibold block">Sudden Demise & Bereavement</strong>
                  Passing away of a registered parent, spouse, child, sibling, or parent-in-law.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <strong className="text-slate-900 font-semibold block">Any Commercial Airline on Registered Corridors</strong>
                  IndiGo, Air India, Akasa, SpiceJet, Vistara — book whatever gets you home fastest, regardless of price surge.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <div>
                  <strong className="text-slate-900 font-semibold block">Post-Travel Claim Filing (Up to 14 Days)</strong>
                  Focus on family first. File the claim calmly after you arrive home with hospital / municipal paperwork.
                </div>
              </li>
            </ul>
          </div>

          {/* What is NOT Covered */}
          <div className="rounded-3xl p-8 bg-[#fdf8f6] border border-rose-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-700 text-white flex items-center justify-center font-bold">
                <X className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-rose-950 font-serif">What is NOT Covered</h3>
                <p className="text-xs text-rose-700 font-medium">To avoid fraud and preserve low cost for all</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <div>
                  <strong className="text-slate-900 font-semibold block">Vacations, Festivals & Planned Leisure</strong>
                  Diwali trips, weddings, or holiday visits without a certified medical emergency are strictly excluded.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <div>
                  <strong className="text-slate-900 font-semibold block">Unregistered Individuals</strong>
                  Friends, distant cousins, or relatives not registered in your policy roster prior to the incident.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <div>
                  <strong className="text-slate-900 font-semibold block">Unregistered Travel Routes</strong>
                  Flights taken on city corridors other than the 3 registered emergency routes locked in your pass.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <div>
                  <strong className="text-slate-900 font-semibold block">General Airline Delays or Missed Flights</strong>
                  Airline operational cancellations (handled by airline customer service).
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Verification Requirements Note */}
        <div className="mt-10 max-w-4xl mx-auto p-5 rounded-2xl bg-[#f4efe8] border border-[#ded5c6] flex items-start gap-4 text-sm text-slate-700">
          <FileText className="w-6 h-6 text-emerald-800 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900">Simple Verification Checklist for Payout:</span>
            <span className="text-slate-600 block mt-1">
              When filing a claim, you only need to upload: (1) <strong>Flight Ticket & Boarding Pass</strong>, (2) <strong>Hospital Discharge/Admission Summary OR Death Certificate</strong>, and (3) <strong>UPI ID or Bank Account</strong>. Verification takes 12–24 hours.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
