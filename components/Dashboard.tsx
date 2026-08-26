'use client';

import React from 'react';
import { useHomewardStore } from '@/lib/store';
import { 
  ShieldCheck, 
  Plane, 
  Users, 
  Calendar, 
  FileText, 
  ShieldAlert, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  PlusCircle
} from 'lucide-react';
import { formatINR, formatDate, calculateDaysRemaining } from '@/lib/utils';

export const Dashboard: React.FC = () => {
  const { policy, claims, setClaimModalOpen, setActiveView, setActiveClaimForReview } = useHomewardStore();

  if (!policy) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-slate-800">No Active Pass Found</h2>
        <p className="text-slate-600 text-sm">Register your 3 emergency routes to activate your 3-year protection.</p>
        <button
          onClick={() => setActiveView('wizard')}
          className="px-6 py-3 rounded-xl bg-emerald-800 text-white font-semibold text-sm shadow-md"
        >
          Get 3-Year Pass (₹5,000)
        </button>
      </div>
    );
  }

  const daysLeft = calculateDaysRemaining(policy.validUntil);

  return (
    <div className="py-10 md:py-14 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Bar / Greeting & Emergency Trigger */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#ded8cf] shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-800">
                Active 3-Year Membership
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Welcome back, {policy.holderName}
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Pass ID: {policy.passNumber} • Origin: {policy.holderCity}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setClaimModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm shadow-lg shadow-rose-950/15 hover:shadow-xl transition-all"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>File Emergency Flight Claim</span>
            </button>
          </div>
        </div>

        {/* 3 Main Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Validity Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#ded8cf] shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span>Pass Validity</span>
              <Calendar className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-3xl font-serif font-bold text-emerald-950">
              {daysLeft} <span className="text-sm font-sans font-normal text-slate-500">days left</span>
            </div>
            <div className="text-xs text-slate-600">
              Valid until: <strong className="text-slate-900">{formatDate(policy.validUntil)}</strong> (36 months total)
            </div>
          </div>

          {/* Reimbursement Cap */}
          <div className="bg-white p-6 rounded-3xl border border-[#ded8cf] shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span>Max Reimbursement</span>
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-3xl font-serif font-bold text-emerald-950">
              {formatINR(policy.maxReimbursementPerClaimInr)}
            </div>
            <div className="text-xs text-slate-600">
              Per eligible medical/bereavement emergency flight
            </div>
          </div>

          {/* Registered Routes Count */}
          <div className="bg-white p-6 rounded-3xl border border-[#ded8cf] shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span>Protected Corridors</span>
              <Plane className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-3xl font-serif font-bold text-emerald-950">
              {policy.registeredRoutes.length} <span className="text-sm font-sans font-normal text-slate-500">routes locked</span>
            </div>
            <div className="text-xs text-slate-600">
              {policy.coveredFamilyMembers.length} registered family members covered
            </div>
          </div>

        </div>

        {/* 2-Column Split: Registered Routes & Covered Family */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Registered 3 Corridors (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#ded8cf] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-emerald-700" />
                  <span>3 Locked Emergency Corridors</span>
                </h2>
                <p className="text-xs text-slate-500">Only flights on these pre-set routes are eligible for refund</p>
              </div>
              <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full">
                Active 3-Yr Lock
              </span>
            </div>

            <div className="space-y-3">
              {policy.registeredRoutes.map((route, idx) => (
                <div 
                  key={route.id}
                  className="p-4 rounded-2xl bg-[#faf8f5] border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-mono font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 font-mono flex items-center gap-2">
                        <span>{route.origin.code}</span>
                        <span className="text-slate-400">➔</span>
                        <span className="text-emerald-800">{route.destination.code}</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {route.origin.city} to {route.destination.city} ({route.destination.name})
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    Protected
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Covered Family Directory (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#ded8cf] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-700" />
                  <span>Covered Family Members</span>
                </h2>
                <p className="text-xs text-slate-500">Eligible for health & bereavement claims</p>
              </div>
            </div>

            <div className="space-y-3">
              {policy.coveredFamilyMembers.map((member) => (
                <div 
                  key={member.id}
                  className="p-3.5 rounded-2xl bg-[#faf8f5] border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">
                      {member.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900">{member.fullName}</div>
                      <div className="text-xs text-slate-500">
                        {member.relationship} • {member.age} yrs
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    ••• {member.idProofNumber}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Claim History Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ded8cf] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <span>Claims History & Reimbursements</span>
              </h2>
              <p className="text-xs text-slate-500">Track claim verification status and UPI disbursements</p>
            </div>
            
            <button
              onClick={() => setClaimModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-all self-start"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit New Claim</span>
            </button>
          </div>

          {claims.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No claims registered yet. If an emergency occurs, click "File Emergency Flight Claim".
            </div>
          ) : (
            <div className="space-y-4">
              {claims.map((claim) => (
                <div
                  key={claim.id}
                  className="p-5 rounded-2xl bg-[#faf8f5] border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-sm text-slate-900">{claim.claimNumber}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          claim.payoutStatus === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : claim.payoutStatus === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {claim.payoutStatus === 'APPROVED' ? 'Approved & Disbursed' : claim.payoutStatus}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {formatDate(claim.createdAt)}
                      </span>
                    </div>

                    <div className="text-sm font-medium text-slate-800">
                      <strong>{claim.emergencyType === 'HOSPITALIZATION' ? '🏥 Hospitalization' : '🕊️ Bereavement'}</strong>: {claim.affectedFamilyMemberName} ({claim.relationship})
                    </div>

                    <div className="text-xs text-slate-600 flex items-center gap-3">
                      <span>Corridor: <strong className="font-mono">{claim.originCode} ➔ {claim.destinationCode}</strong></span>
                      <span>•</span>
                      <span>Flight PNR: <strong className="font-mono">{claim.flightPnr}</strong></span>
                      <span>•</span>
                      <span>Ticket: {formatINR(claim.actualTicketCostInr)}</span>
                    </div>

                    {claim.reviewNotes && (
                      <div className="text-xs bg-white p-2.5 rounded-xl border border-slate-200 text-slate-600 mt-2">
                        <strong className="text-slate-800">Admin Review Note: </strong>
                        {claim.reviewNotes}
                      </div>
                    )}
                  </div>

                  <div className="text-right flex flex-col items-end justify-between self-start md:self-auto gap-2">
                    <div>
                      <div className="text-xs text-slate-500">Refund Amount</div>
                      <div className="text-xl font-serif font-bold text-emerald-800">
                        {formatINR(claim.eligibleReimbursementInr)}
                      </div>
                      <div className="text-[11px] text-slate-400">Via UPI: {claim.upiId || 'Bank Transfer'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
