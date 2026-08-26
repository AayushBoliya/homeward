export interface Airport {
  code: string;
  name: string;
  city: string;
  state: string;
}

export interface EmergencyRoute {
  id: string;
  origin: Airport;
  destination: Airport;
}

export type RelationType = 
  | 'Father'
  | 'Mother'
  | 'Spouse'
  | 'Son'
  | 'Daughter'
  | 'Brother'
  | 'Sister'
  | 'Father-in-law'
  | 'Mother-in-law';

export interface FamilyMember {
  id: string;
  fullName: string;
  relationship: RelationType;
  age: number;
  phone?: string;
  idProofNumber?: string; // Aadhaar / Voter ID last 4 digits
}

export interface PassPolicy {
  id: string;
  passNumber: string; // e.g. "HW-2024-8842"
  holderName: string;
  holderPhone: string;
  holderEmail: string;
  holderCity: string;
  registeredRoutes: EmergencyRoute[]; // Exactly 3 routes
  coveredFamilyMembers: FamilyMember[];
  validFrom: string; // ISO date
  validUntil: string; // ISO date (3 years from validFrom)
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  costPaidInr: number; // 5000
  maxReimbursementPerClaimInr: number; // 20000
  claimsRemaining: number;
}

export type EmergencyType = 'HOSPITALIZATION' | 'BEREAVEMENT_DEATH';

export type ClaimStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'DISBURSED';

export interface ClaimDocument {
  id: string;
  type: 'FLIGHT_TICKET' | 'BOARDING_PASS' | 'HOSPITAL_DISCHARGE_SUMMARY' | 'DEATH_CERTIFICATE' | 'DOCTOR_PRESCRIPTION';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  previewUrl?: string;
}

export interface Claim {
  id: string;
  claimNumber: string; // e.g. "CLM-9031"
  policyId: string;
  policyNumber: string;
  applicantName: string;
  applicantPhone: string;
  
  // Incident details
  emergencyType: EmergencyType;
  affectedFamilyMemberId: string;
  affectedFamilyMemberName: string;
  relationship: RelationType;
  incidentDate: string;
  hospitalOrPlaceDetails: string;
  
  // Route and travel details
  routeId: string;
  originCode: string;
  destinationCode: string;
  flightDate: string;
  flightPnr: string;
  airlineName: string;
  actualTicketCostInr: number; // e.g. 21,500
  
  // Payout calculation
  eligibleReimbursementInr: number; // capped at 20,000
  payoutStatus: ClaimStatus;
  
  // Settlement info
  payoutMethod: 'UPI' | 'BANK_TRANSFER';
  upiId?: string;
  bankAccount?: string;
  bankIfsc?: string;
  
  // Documents
  documents: ClaimDocument[];
  
  // Timestamps & review notes
  createdAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
  rejectionReason?: string;
}
