'use client';

import React, { useState } from 'react';
import { useHomewardStore } from '@/lib/store';
import { EmergencyType, ClaimDocument } from '@/types';
import { formatINR } from '@/lib/utils';
import { 
  X, 
  ShieldAlert, 
  Upload, 
  CheckCircle2, 
  FileText, 
  Plane, 
  HeartHandshake, 
  ArrowRight, 
  Sparkles,
  AlertCircle,
  Building2
} from 'lucide-react';

export const ClaimModal: React.FC = () => {
  const { policy, claimModalOpen, setClaimModalOpen, submitClaim } = useHomewardStore();

  if (!claimModalOpen || !policy) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Emergency & Family Member
  const [emergencyType, setEmergencyType] = useState<EmergencyType>('HOSPITALIZATION');
  const [selectedMemberId, setSelectedMemberId] = useState(policy.coveredFamilyMembers[0]?.id || '');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [hospitalDetails, setHospitalDetails] = useState('Apex Multi-Speciality Hospital, ICU Ward 4B');

  // Step 2: Flight & Ticket
  const [selectedRouteId, setSelectedRouteId] = useState(policy.registeredRoutes[0]?.id || '');
  const [flightDate, setFlightDate] = useState(new Date().toISOString().split('T')[0]);
  const [flightPnr, setFlightPnr] = useState('6E-9921');
  const [airlineName, setAirlineName] = useState('IndiGo Airlines');
  const [ticketCost, setTicketCost] = useState<number>(21500);

  // Step 3: Documents & Payout
  const [upiId, setUpiId] = useState('aayush@okhdfcbank');
  const [documents, setDocuments] = useState<ClaimDocument[]>([
    {
      id: 'doc_1',
      type: 'FLIGHT_TICKET',
      fileName: 'Emergency_Flight_Invoice_BLR.pdf',
      fileSize: '410 KB',
      uploadedAt: new Date().toISOString(),
    },
    {
      id: 'doc_2',
      type: 'HOSPITAL_DISCHARGE_SUMMARY',
      fileName: 'Hospital_ICU_Admission_Report.pdf',
      fileSize: '1.4 MB',
      uploadedAt: new Date().toISOString(),
    },
  ]);

  const selectedMember = policy.coveredFamilyMembers.find(m => m.id === selectedMemberId) || policy.coveredFamilyMembers[0];
  const selectedRoute = policy.registeredRoutes.find(r => r.id === selectedRouteId) || policy.registeredRoutes[0];
  
  const maxCap = policy.maxReimbursementPerClaimInr;
  const calculatedPayout = Math.min(ticketCost, maxCap);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitClaim({
      policyId: policy.id,
      policyNumber: policy.passNumber,
      applicantName: policy.holderName,
      applicantPhone: policy.holderPhone,
      emergencyType,
      affectedFamilyMemberId: selectedMember.id,
      affectedFamilyMemberName: selectedMember.fullName,
      relationship: selectedMember.relationship,
      incidentDate,
      hospitalOrPlaceDetails: hospitalDetails,
      routeId: selectedRoute.id,
      originCode: selectedRoute.origin.code,
      destinationCode: selectedRoute.destination.code,
      flightDate,
      flightPnr,
      airlineName,
      actualTicketCostInr: ticketCost,
      eligibleReimbursementInr: calculatedPayout,
      payoutMethod: 'UPI',
      upiId,
      documents,
    });

    setClaimModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#ded8cf] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-900 to-rose-950 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-rose-200" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold">Register Emergency Flight Claim</h2>
              <p className="text-xs text-rose-200">
                Homeward Pass: <span className="font-mono font-semibold">{policy.passNumber}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setClaimModalOpen(false)}
            className="p-2 rounded-xl text-rose-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Steps */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Incident & Family Member */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Step 1 of 3: Incident & Registered Family Member
              </div>

              {/* Emergency Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Emergency Incident Type (Strictly Covered Only)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEmergencyType('HOSPITALIZATION')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      emergencyType === 'HOSPITALIZATION'
                        ? 'bg-rose-50 border-rose-400 text-rose-950 font-semibold ring-1 ring-rose-400'
                        : 'bg-[#faf8f5] border-slate-200 text-slate-700 hover:bg-[#f2ece3]'
                    }`}
                  >
                    <div className="text-base mb-1">🏥 Hospitalization / ICU</div>
                    <div className="text-xs text-slate-500 font-normal">
                      Critical surgery, emergency IPD admission
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEmergencyType('BEREAVEMENT_DEATH')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      emergencyType === 'BEREAVEMENT_DEATH'
                        ? 'bg-rose-50 border-rose-400 text-rose-950 font-semibold ring-1 ring-rose-400'
                        : 'bg-[#faf8f5] border-slate-200 text-slate-700 hover:bg-[#f2ece3]'
                    }`}
                  >
                    <div className="text-base mb-1">🕊️ Demise / Bereavement</div>
                    <div className="text-xs text-slate-500 font-normal">
                      Passing of a registered family member
                    </div>
                  </button>
                </div>
              </div>

              {/* Select Registered Member */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Affected Family Member (Must be in your policy)
                </label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                >
                  {policy.coveredFamilyMembers.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.fullName} — {m.relationship} (Age: {m.age}, ID: •••• {m.idProofNumber})
                    </option>
                  ))}
                </select>
              </div>

              {/* Hospital or Place Details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Hospital Name & Location / Details
                </label>
                <input
                  type="text"
                  value={hospitalDetails}
                  onChange={(e) => setHospitalDetails(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  placeholder="e.g. Apex Heart Institute, Jaipur"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-semibold text-sm shadow-md transition-all"
                >
                  <span>Next: Flight & Fare Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Route & Flight Details */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Step 2 of 3: Flight Route & Cost
              </div>

              {/* Route Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Emergency Flight Corridor Taken
                </label>
                <select
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 font-mono text-sm font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                >
                  {policy.registeredRoutes.map((r, i) => (
                    <option key={r.id} value={r.id}>
                      Corridor {i + 1}: {r.origin.code} ({r.origin.city}) ➔ {r.destination.code} ({r.destination.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Flight Ticket Cost & PNR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Actual Ticket Amount Paid (INR)
                  </label>
                  <input
                    type="number"
                    value={ticketCost}
                    onChange={(e) => setTicketCost(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-base font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                    placeholder="21500"
                  />
                  <span className="text-[11px] text-slate-500">As shown on your flight booking receipt</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Flight PNR / Booking ID
                  </label>
                  <input
                    type="text"
                    value={flightPnr}
                    onChange={(e) => setFlightPnr(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-mono uppercase"
                    placeholder="6E-5821"
                  />
                </div>
              </div>

              {/* Live Calculated Reimbursement Box */}
              <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 uppercase">
                    Calculated Homeward Reimbursement:
                  </span>
                  <span className="text-2xl font-serif font-bold text-emerald-900">
                    {formatINR(calculatedPayout)}
                  </span>
                </div>
                <div className="text-xs text-emerald-800">
                  {ticketCost > maxCap
                    ? `Ticket price (${formatINR(ticketCost)}) exceeds policy cap of ₹20,000. We will reimburse the full maximum ₹20,000.`
                    : `Ticket price is within your ₹20,000 cap. 100% reimbursed.`}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-semibold text-sm shadow-md transition-all"
                >
                  <span>Next: Verification Documents & UPI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Documents & Settlement */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Step 3 of 3: Verification Proofs & Payout Destination
              </div>

              {/* Attached documents list */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Required Documents (Simulated Upload):
                </label>

                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl bg-[#faf8f5] border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      <div>
                        <span className="font-semibold text-slate-800">{doc.fileName}</span>
                        <span className="text-slate-400 block text-[10px]">{doc.fileSize} • Verified format</span>
                      </div>
                    </div>
                    <span className="text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-md text-[10px]">
                      Attached
                    </span>
                  </div>
                ))}
              </div>

              {/* UPI ID Payout Input */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase">
                  Your UPI ID for Reimbursement Payout
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 font-mono text-sm focus:ring-2 focus:ring-emerald-600"
                  placeholder="e.g. username@okhdfcbank"
                />
                <span className="text-[11px] text-slate-500 block">
                  Disbursements are sent directly via UPI IMPS upon verification (usually 12–24h).
                </span>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm shadow-xl shadow-rose-950/20 transition-all"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Submit Claim for ₹{calculatedPayout.toLocaleString('en-IN')}</span>
                </button>
              </div>
            </div>
          )}

        </form>

      </div>
    </div>
  );
};
