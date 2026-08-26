'use client';

import React, { useState } from 'react';
import { useHomewardStore } from '@/lib/store';
import { INDIAN_AIRPORTS, searchAirports, getAirportByCode } from '@/lib/airports';
import { Airport, EmergencyRoute, FamilyMember, RelationType } from '@/types';
import { formatINR } from '@/lib/utils';
import { 
  ShieldCheck, 
  Plane, 
  Users, 
  CreditCard, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles,
  MapPin,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

const RELATION_OPTIONS: RelationType[] = [
  'Father',
  'Mother',
  'Spouse',
  'Son',
  'Daughter',
  'Brother',
  'Sister',
  'Father-in-law',
  'Mother-in-law'
];

export const PolicyWizard: React.FC = () => {
  const { createPolicy, setActiveView } = useHomewardStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Holder Details
  const [holderName, setHolderName] = useState('Aayush Sharma');
  const [holderPhone, setHolderPhone] = useState('+91 98765 43210');
  const [holderEmail, setHolderEmail] = useState('aayush.sharma@example.com');
  const [holderCity, setHolderCity] = useState('Bengaluru, Karnataka');

  // Step 2: Origin & 3 Destination Airports
  const [originCode, setOriginCode] = useState('BLR');
  const [dest1Code, setDest1Code] = useState('AMD'); // Ahmedabad
  const [dest2Code, setDest2Code] = useState('JAI'); // Jaipur
  const [dest3Code, setDest3Code] = useState('UDR'); // Udaipur

  // Search filter terms for dropdowns
  const [originSearch, setOriginSearch] = useState('');
  const [dest1Search, setDest1Search] = useState('');
  const [dest2Search, setDest2Search] = useState('');
  const [dest3Search, setDest3Search] = useState('');

  // Step 3: Family Members
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', fullName: 'Ramesh Sharma', relationship: 'Father', age: 64, idProofNumber: '4812' },
    { id: '2', fullName: 'Sunita Sharma', relationship: 'Mother', age: 60, idProofNumber: '9934' },
    { id: '3', fullName: 'Priya Sharma', relationship: 'Spouse', age: 30, idProofNumber: '1120' },
  ]);

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState<RelationType>('Father-in-law');
  const [newMemberAge, setNewMemberAge] = useState('58');
  const [newMemberId, setNewMemberId] = useState('');

  // Step 4: Checkout
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const addFamilyMember = () => {
    if (!newMemberName.trim()) return;
    const newMember: FamilyMember = {
      id: `fm_${Date.now()}`,
      fullName: newMemberName.trim(),
      relationship: newMemberRelation,
      age: Number(newMemberAge) || 50,
      idProofNumber: newMemberId ? newMemberId.slice(-4) : '0000',
    };
    setFamilyMembers(prev => [...prev, newMember]);
    setNewMemberName('');
    setNewMemberId('');
  };

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleFinishAndPay = () => {
    setIsProcessingPayment(true);
    
    // Assemble the 3 routes
    const originAirport = getAirportByCode(originCode) || INDIAN_AIRPORTS[0];
    const dest1 = getAirportByCode(dest1Code) || INDIAN_AIRPORTS[1];
    const dest2 = getAirportByCode(dest2Code) || INDIAN_AIRPORTS[2];
    const dest3 = getAirportByCode(dest3Code) || INDIAN_AIRPORTS[3];

    const routes: EmergencyRoute[] = [
      { id: `rt_${Date.now()}_1`, origin: originAirport, destination: dest1 },
      { id: `rt_${Date.now()}_2`, origin: originAirport, destination: dest2 },
      { id: `rt_${Date.now()}_3`, origin: originAirport, destination: dest3 },
    ];

    setTimeout(() => {
      createPolicy({
        holderName,
        holderPhone,
        holderEmail,
        holderCity,
        registeredRoutes: routes,
        coveredFamilyMembers: familyMembers,
      });

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if not supported
      }

      setIsProcessingPayment(false);
      setActiveView('dashboard');
    }, 1200);
  };

  return (
    <div className="py-12 md:py-16 bg-[#faf8f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>3-Year Pass Registration</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#143026]">
            Configure your 3-Year Emergency Pass
          </h1>
          <p className="text-sm text-slate-600">
            ₹5,000 one-time fee • Valid for 3 years • Up to ₹20,000 reimbursement per emergency
          </p>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="mb-10 grid grid-cols-4 gap-2">
          {[
            { num: 1, label: 'Personal Info' },
            { num: 2, label: '3 Home Routes' },
            { num: 3, label: 'Family Roster' },
            { num: 4, label: 'Pay & Activate' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => {
                if (s.num < step) setStep(s.num as any);
              }}
              className={`p-3 rounded-2xl border text-center transition-all ${
                s.num < step ? 'cursor-pointer' : ''
              } ${
                step === s.num
                  ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm font-semibold'
                  : s.num < step
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200 font-medium'
                  : 'bg-white text-slate-400 border-slate-200'
              }`}
            >
              <div className="text-xs font-mono opacity-80">0{s.num}</div>
              <div className="text-xs font-medium truncate">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e2ded6] shadow-xl">
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-serif mb-1">
                  1. Your Profile & Base City
                </h2>
                <p className="text-xs text-slate-500">
                  Where do you currently reside? (Your emergency flights will originate from here)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name (as per Govt ID)
                  </label>
                  <input
                    type="text"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none text-sm"
                    placeholder="e.g. Aayush Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Current Residing City
                  </label>
                  <input
                    type="text"
                    value={holderCity}
                    onChange={(e) => setHolderCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none text-sm"
                    placeholder="e.g. Bengaluru, Karnataka"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone Number (for instant SMS/WhatsApp claim updates)
                  </label>
                  <input
                    type="tel"
                    value={holderPhone}
                    onChange={(e) => setHolderPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none text-sm font-mono"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={holderEmail}
                    onChange={(e) => setHolderEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none text-sm"
                    placeholder="aayush@example.com"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md transition-all"
                >
                  <span>Continue to 3 Home Routes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: 3 Emergency Routes */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-serif mb-1">
                  2. Select Origin & Your 3 Emergency Routes
                </h2>
                <p className="text-xs text-slate-500">
                  Select your current home base airport (Origin) and up to 3 hometown/family destination airports where your family lives.
                </p>
              </div>

              {/* Origin Airport */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Primary Departure Airport (Where you live)</span>
                </label>
                <select
                  value={originCode}
                  onChange={(e) => setOriginCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-300 font-medium text-sm text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  {INDIAN_AIRPORTS.map(a => (
                    <option key={a.code} value={a.code}>
                      {a.code} — {a.city} ({a.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* 3 Destination Airports */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  3 Registered Emergency Corridors:
                </div>

                {/* Route 1 */}
                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Route 1: {originCode} ➔ Destination</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                      Corridor A
                    </span>
                  </div>
                  <select
                    value={dest1Code}
                    onChange={(e) => setDest1Code(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-600"
                  >
                    {INDIAN_AIRPORTS.filter(a => a.code !== originCode).map(a => (
                      <option key={a.code} value={a.code}>
                        {a.code} — {a.city} ({a.name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Route 2 */}
                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Route 2: {originCode} ➔ Destination</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                      Corridor B
                    </span>
                  </div>
                  <select
                    value={dest2Code}
                    onChange={(e) => setDest2Code(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-600"
                  >
                    {INDIAN_AIRPORTS.filter(a => a.code !== originCode).map(a => (
                      <option key={a.code} value={a.code}>
                        {a.code} — {a.city} ({a.name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Route 3 */}
                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Route 3: {originCode} ➔ Destination</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                      Corridor C
                    </span>
                  </div>
                  <select
                    value={dest3Code}
                    onChange={(e) => setDest3Code(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-600"
                  >
                    {INDIAN_AIRPORTS.filter(a => a.code !== originCode).map(a => (
                      <option key={a.code} value={a.code}>
                        {a.code} — {a.city} ({a.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md transition-all"
                >
                  <span>Continue to Family Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Family Members */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-serif mb-1">
                  3. Register Covered Family Members
                </h2>
                <p className="text-xs text-slate-500">
                  Add parents, spouse, children, siblings, or in-laws. Only claims for registered members will be verified and paid.
                </p>
              </div>

              {/* Existing List */}
              <div className="space-y-3">
                {familyMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-[#faf8f5] border border-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                        {member.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{member.fullName}</div>
                        <div className="text-xs text-slate-500">
                          {member.relationship} • {member.age} yrs • ID: •••• {member.idProofNumber}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFamilyMember(member.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Member Input Box */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-4">
                <div className="text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>Add Another Family Member</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="Full Name (e.g. Suresh Patel)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <select
                      value={newMemberRelation}
                      onChange={(e) => setNewMemberRelation(e.target.value as RelationType)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600"
                    >
                      {RELATION_OPTIONS.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={newMemberAge}
                      onChange={(e) => setNewMemberAge(e.target.value)}
                      placeholder="Age (yrs)"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addFamilyMember}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Policy</span>
                </button>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md transition-all"
                >
                  <span>Review & Activate Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Payment Checkout */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-serif mb-1">
                  4. Review & Activate 3-Year Protection
                </h2>
                <p className="text-xs text-slate-500">
                  Instant activation upon payment confirmation. Valid for 36 months.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950 to-teal-950 text-white space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
                  <div>
                    <span className="text-xs text-emerald-300 uppercase tracking-wider font-semibold">Pass Holder</span>
                    <div className="text-lg font-serif font-bold text-white">{holderName}</div>
                    <div className="text-xs text-emerald-200/70">{holderCity} • {holderPhone}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-300 uppercase tracking-wider font-semibold">Validity</span>
                    <div className="text-sm font-bold text-emerald-300">3 Years (36 Months)</div>
                  </div>
                </div>

                {/* 3 Routes Summary */}
                <div className="space-y-1.5">
                  <span className="text-xs text-emerald-300 uppercase tracking-wider font-semibold">
                    3 Covered Emergency Corridors:
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2 bg-emerald-900/60 rounded-xl border border-emerald-700/40">
                      <strong>{originCode} ➔ {dest1Code}</strong>
                    </div>
                    <div className="p-2 bg-emerald-900/60 rounded-xl border border-emerald-700/40">
                      <strong>{originCode} ➔ {dest2Code}</strong>
                    </div>
                    <div className="p-2 bg-emerald-900/60 rounded-xl border border-emerald-700/40">
                      <strong>{originCode} ➔ {dest3Code}</strong>
                    </div>
                  </div>
                </div>

                {/* Covered Members Summary */}
                <div className="pt-2 border-t border-emerald-800 flex items-center justify-between text-xs text-emerald-200">
                  <span>Covered Family Members:</span>
                  <span className="font-semibold text-white">
                    {familyMembers.map(m => `${m.fullName} (${m.relationship})`).join(', ')}
                  </span>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-slate-200 space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Homeward 3-Year Emergency Pass</span>
                  <span className="font-semibold text-slate-900">₹5,000</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Reimbursement Coverage Limit</span>
                  <span className="font-semibold text-emerald-800">Up to ₹20,000 / claim</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Platform Fee & Zero-Cost Cloud Hosting</span>
                  <span className="font-semibold text-emerald-700">₹0 (Free)</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold text-slate-900">
                  <span>Total Amount Payable:</span>
                  <span className="text-xl font-serif text-emerald-900">₹5,000</span>
                </div>
              </div>

              {/* Payment Methods Simulation */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
                <span>Instant simulation enabled for zero-cost testing (Supports UPI QR & Razorpay in live production).</span>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={isProcessingPayment}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinishAndPay}
                  disabled={isProcessingPayment}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base shadow-xl shadow-emerald-950/20 transition-all transform hover:-translate-y-0.5"
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Activating 3-Year Pass...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-emerald-200" />
                      <span>Pay ₹5,000 & Activate Pass</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
