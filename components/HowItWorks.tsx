'use client';

import React from 'react';
import { ShieldCheck, HeartPulse, Plane, Wallet, ArrowRight } from 'lucide-react';
import { useHomewardStore } from '@/lib/store';

export const HowItWorks: React.FC = () => {
  const { setActiveView } = useHomewardStore();

  const steps = [
    {
      number: '01',
      icon: ShieldCheck,
      title: 'Get 3-Year Pass & Add 3 Corridors',
      description: 'Pay ₹5,000 once. Set your primary origin (e.g. Bangalore) and 3 destination airports (e.g. Ahmedabad, Jaipur, Udaipur). List your parents, spouse, and in-laws.',
    },
    {
      number: '02',
      icon: HeartPulse,
      title: 'Emergency Strikes',
      description: 'If a covered medical emergency or bereavement occurs, your only focus is reaching your loved ones immediately without worrying about ticket costs.',
    },
    {
      number: '03',
      icon: Plane,
      title: 'Book the Fastest Flight',
      description: 'Hop onto any airline or booking portal (IndiGo, Air India, MakeMyTrip). Book the earliest departure ticket on your registered corridor.',
    },
    {
      number: '04',
      icon: Wallet,
      title: 'Claim & Get Up to ₹20,000 Reimbursed',
      description: 'After reaching home, submit a quick claim on Homeward. Upload hospital IPD/discharge summary or death certificate + ticket. We transfer money to your UPI.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-b border-[#e9e4dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#143026]">
            Built to be effortless during your most stressful moments
          </h2>
          <p className="text-slate-600 text-base">
            No complex pre-approvals or phone lines at 3 AM. Book your ticket first, file documents peacefully after arriving.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="relative bg-[#faf8f5] rounded-3xl p-7 border border-[#e6e2da] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-bold text-emerald-800/30 group-hover:text-emerald-800/60 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-serif">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#eee8df] text-xs font-semibold text-emerald-800 flex items-center gap-1">
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Ready to secure 3 years of travel peace of mind?
            </h4>
            <p className="text-emerald-200/80 text-sm">
              One-time payment of ₹5,000 • Up to ₹20,000 reimbursement • Instant digital pass activation.
            </p>
          </div>
          <button
            onClick={() => setActiveView('wizard')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-white text-emerald-950 hover:bg-emerald-50 shadow-md hover:shadow-lg transition-all shrink-0"
          >
            <span>Activate 3-Year Pass</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
