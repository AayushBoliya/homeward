'use client';

import React, { useState } from 'react';
import { formatINR } from '@/lib/utils';
import { Plane, TrendingDown, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useHomewardStore } from '@/lib/store';

interface RouteEstimate {
  route: string;
  from: string;
  to: string;
  surgeFare: number;
  homewardRefund: number;
}

const SAMPLE_ROUTES: RouteEstimate[] = [
  { route: 'BLR → UDR', from: 'Bengaluru', to: 'Udaipur', surgeFare: 21500, homewardRefund: 20000 },
  { route: 'BLR → JAI', from: 'Bengaluru', to: 'Jaipur', surgeFare: 19800, homewardRefund: 19800 },
  { route: 'BLR → AMD', from: 'Bengaluru', to: 'Ahmedabad', surgeFare: 16500, homewardRefund: 16500 },
  { route: 'BOM → PAT', from: 'Mumbai', to: 'Patna', surgeFare: 24000, homewardRefund: 20000 },
  { route: 'DEL → GAU', from: 'Delhi', to: 'Guwahati', surgeFare: 22800, homewardRefund: 20000 },
];

export const SavingsCalculator: React.FC = () => {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [customFare, setCustomFare] = useState<number>(21500);
  const [isCustom, setIsCustom] = useState(false);
  const { setActiveView } = useHomewardStore();

  const currentRoute = SAMPLE_ROUTES[selectedRouteIndex];
  const activeFare = isCustom ? customFare : currentRoute.surgeFare;
  const maxCap = 20000;
  const payout = Math.min(activeFare, maxCap);
  const outOfPocket = Math.max(0, activeFare - payout);
  const savings = payout;

  return (
    <section className="py-16 md:py-24 bg-[#f8f5ef] border-b border-[#e6e0d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-800" />
            <span>Emergency Fare Protection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#112920]">
            See how much you save during sudden surge fares
          </h2>
          <p className="text-slate-600 text-base">
            Last-minute flight tickets during emergency hours or festive weekends skyrocket to ₹18,000–₹25,000. Homeward absorbs the shock.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#ded8cf]">
          
          {/* Quick Route Selector Buttons */}
          <div className="mb-8">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Select a popular emergency route:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {SAMPLE_ROUTES.map((item, idx) => (
                <button
                  key={item.route}
                  onClick={() => {
                    setSelectedRouteIndex(idx);
                    setIsCustom(false);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                    !isCustom && selectedRouteIndex === idx
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                      : 'bg-[#faf8f5] text-slate-700 border-[#e2dcd3] hover:bg-[#f0ebe3]'
                  }`}
                >
                  <div className="font-mono">{item.route}</div>
                  <div className="text-[10px] font-normal opacity-80">{item.to}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Ticket Fare Slider / Input */}
          <div className="mb-10 p-5 rounded-2xl bg-[#faf8f5] border border-[#e6e2da]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-sm font-semibold text-slate-800">Last-Minute Flight Ticket Price (Emergency Rate)</span>
                <p className="text-xs text-slate-500">What you would pay on MakeMyTrip / IndiGo at 2 AM</p>
              </div>
              <div className="text-2xl font-bold font-serif text-slate-900">
                {formatINR(activeFare)}
              </div>
            </div>

            <input
              type="range"
              min="5000"
              max="35000"
              step="500"
              value={activeFare}
              onChange={(e) => {
                setCustomFare(Number(e.target.value));
                setIsCustom(true);
              }}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
              <span>₹5,000</span>
              <span>₹20,000 (Max Cap)</span>
              <span>₹35,000</span>
            </div>
          </div>

          {/* Outcome Comparison Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            
            {/* Without Homeward */}
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-800 block mb-1">
                Without Homeward
              </span>
              <div className="text-2xl font-bold text-rose-900 font-serif my-1">
                {formatINR(activeFare)}
              </div>
              <span className="text-xs text-rose-700">100% out of pocket</span>
            </div>

            {/* Homeward Refund */}
            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase">
                Direct Refund
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block mb-1">
                Homeward Reimbursement
              </span>
              <div className="text-2xl font-bold text-emerald-800 font-serif my-1">
                +{formatINR(payout)}
              </div>
              <span className="text-xs text-emerald-700">Disbursed to your UPI</span>
            </div>

            {/* Net Cost */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 block mb-1">
                Your Net Out-of-Pocket
              </span>
              <div className="text-2xl font-bold text-white font-serif my-1">
                {formatINR(outOfPocket)}
              </div>
              <span className="text-xs text-slate-400">You save {formatINR(savings)}!</span>
            </div>

          </div>

          {/* Call to Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-600">
              <strong className="text-slate-900">Pass cost: ₹5,000 for 3 years</strong> (protects you for 36 months across your 3 home routes).
            </div>
            <button
              onClick={() => setActiveView('wizard')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-emerald-800 hover:bg-emerald-900 text-white shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Register My 3 Routes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
