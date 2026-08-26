'use client';

import React, { useState } from 'react';
import { useHomewardStore } from '@/lib/store';
import { Claim, ClaimStatus } from '@/types';
import { formatINR, formatDate, formatDateTime } from '@/lib/utils';
import { 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Plane, 
  Eye,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';

export const AdminConsole: React.FC = () => {
  const { claims, policy, updateClaimStatus, setActiveView } = useHomewardStore();
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(claims[0] || null);
  const [reviewNote, setReviewNote] = useState('');

  const handleApprove = (claim: Claim) => {
    updateClaimStatus(
      claim.id, 
      'APPROVED', 
      reviewNote.trim() || `Verified hospital admission / death certificate records and flight boarding pass. ₹${claim.eligibleReimbursementInr.toLocaleString('en-IN')} approved for payout.`
    );
    setReviewNote('');
  };

  const handleReject = (claim: Claim) => {
    updateClaimStatus(
      claim.id, 
      'REJECTED', 
      reviewNote.trim() || 'Claim rejected: Submitted flight ticket does not match the 3 registered policy corridors or document mismatch.'
    );
    setReviewNote('');
  };

  return (
    <div className="py-10 md:py-14 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <UserCheck className="w-4 h-4" />
              <span>Back-Office Claims Verification Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Emergency Claims Review Console
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Inspect medical proofs, verify flight boarding passes, and authorize UPI reimbursements.
            </p>
          </div>

          <button
            onClick={() => setActiveView('dashboard')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Switch to Member View</span>
          </button>
        </div>

        {/* Claims Table / List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Claims Queue (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#ded8cf] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-sm text-slate-900">
                Incoming Claims ({claims.length})
              </span>
              <span className="text-xs text-slate-400">Select to review details</span>
            </div>

            <div className="space-y-3">
              {claims.map((claim) => {
                const isSelected = selectedClaim?.id === claim.id;
                return (
                  <div
                    key={claim.id}
                    onClick={() => setSelectedClaim(claim)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-300'
                        : 'bg-[#faf8f5] border-slate-200 hover:bg-[#f3ede4]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-xs text-slate-900">{claim.claimNumber}</span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          claim.payoutStatus === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : claim.payoutStatus === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {claim.payoutStatus}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-slate-800 truncate">
                      {claim.applicantName} ➔ {claim.affectedFamilyMemberName}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                      <span>{claim.emergencyType === 'HOSPITALIZATION' ? '🏥 Hospitalization' : '🕊️ Bereavement'}</span>
                      <span className="font-bold text-emerald-900">{formatINR(claim.eligibleReimbursementInr)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Inspection & Approval Actions (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#ded8cf] shadow-sm space-y-6">
            {selectedClaim ? (
              <>
                {/* Claim Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-lg text-slate-900">{selectedClaim.claimNumber}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          selectedClaim.payoutStatus === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : selectedClaim.payoutStatus === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {selectedClaim.payoutStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Filed on {formatDateTime(selectedClaim.createdAt)} • Policy: {selectedClaim.policyNumber}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400">Reimbursement Target</div>
                    <div className="text-2xl font-serif font-bold text-emerald-800">
                      {formatINR(selectedClaim.eligibleReimbursementInr)}
                    </div>
                  </div>
                </div>

                {/* Verification Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Family Member & Incident */}
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-bold text-slate-700 uppercase block">Registered Family Member</span>
                    <div className="text-sm font-semibold text-slate-900">
                      {selectedClaim.affectedFamilyMemberName} ({selectedClaim.relationship})
                    </div>
                    <div className="text-slate-500">
                      <strong>Incident:</strong> {selectedClaim.emergencyType}
                    </div>
                    <div className="text-slate-500">
                      <strong>Location:</strong> {selectedClaim.hospitalOrPlaceDetails}
                    </div>
                  </div>

                  {/* Flight & Ticket Info */}
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-bold text-slate-700 uppercase block">Emergency Flight Details</span>
                    <div className="text-sm font-semibold font-mono text-slate-900">
                      {selectedClaim.originCode} ➔ {selectedClaim.destinationCode} (PNR: {selectedClaim.flightPnr})
                    </div>
                    <div className="text-slate-500">
                      <strong>Actual Ticket Cost:</strong> {formatINR(selectedClaim.actualTicketCostInr)}
                    </div>
                    <div className="text-slate-500">
                      <strong>Payout Method:</strong> {selectedClaim.payoutMethod} ({selectedClaim.upiId})
                    </div>
                  </div>

                </div>

                {/* Document Proofs Inspector */}
                <div className="space-y-3">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-700 block">
                    Uploaded Verification Proofs ({selectedClaim.documents.length}):
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedClaim.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-emerald-800 shrink-0" />
                          <div className="truncate">
                            <span className="font-semibold text-slate-900 block truncate">{doc.fileName}</span>
                            <span className="text-slate-400 text-[10px]">{doc.type}</span>
                          </div>
                        </div>
                        <span className="text-emerald-700 bg-white border border-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">
                          View
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Notes Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Admin Verification Notes & Justification
                  </label>
                  <textarea
                    rows={2}
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    placeholder="Enter audit notes (e.g. Hospital IPD verified with hospital desk, boarding pass confirmed with airline)..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => handleApprove(selectedClaim)}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve & Disburse {formatINR(selectedClaim.eligibleReimbursementInr)}</span>
                  </button>

                  <button
                    onClick={() => handleReject(selectedClaim)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 text-sm font-semibold transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="py-20 text-center text-slate-400 text-sm">
                Select a claim from the left panel to inspect documents and authorize payouts.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
