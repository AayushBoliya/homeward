'use client';

import React from 'react';
import { HeartHandshake, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { useHomewardStore } from '@/lib/store';

export const Footer: React.FC = () => {
  const { setActiveView } = useHomewardStore();

  return (
    <footer className="bg-[#14231d] text-slate-300 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-800 flex items-center justify-center text-white">
                <HeartHandshake className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="font-serif font-bold text-2xl text-white">Homeward</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Homeward provides 3-year emergency travel protection for professionals living away from their families. In times of medical emergency or sudden loss, reach home without the burden of extortionate last-minute airfares.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>₹5,000 one-time • 36 months validity • Up to ₹20,000 payout</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-xs">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveView('landing')} className="hover:text-white transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('wizard')} className="hover:text-white transition-colors">
                  Get 3-Year Pass
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-white transition-colors">
                  Member Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('admin')} className="hover:text-white transition-colors">
                  Claims Review Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Support */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-xs">Emergency Support</h4>
            <p className="text-slate-400">
              Claims desk operates 24/7 for urgent verification and UPI reimbursements.
            </p>
            <div className="space-y-1.5 text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@homeward.travel</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>1800-HOMEWARD (Toll Free)</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-emerald-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Homeward Emergency Ticket. All rights reserved. Zero-cost serverless architecture.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Emergency Terms & Conditions</a>
            <a href="#" className="hover:text-slate-300">Coverage Exclusions</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
