import { PassPolicy, Claim } from "@/types";
import { getAirportByCode } from "./airports";

export const INITIAL_POLICY: PassPolicy = {
  id: "pol_blr_rajasthan_01",
  passNumber: "HW-2024-9421",
  holderName: "Aayush Sharma",
  holderPhone: "+91 98765 43210",
  holderEmail: "aayush.sharma@example.com",
  holderCity: "Bengaluru, Karnataka",
  validFrom: "2024-04-15T10:00:00.000Z",
  validUntil: "2027-04-15T23:59:59.000Z", // 3 years validity
  status: "ACTIVE",
  costPaidInr: 5000,
  maxReimbursementPerClaimInr: 20000,
  claimsRemaining: 3,
  registeredRoutes: [
    {
      id: "rt_1",
      origin: getAirportByCode("BLR")!,
      destination: getAirportByCode("AMD")!,
    },
    {
      id: "rt_2",
      origin: getAirportByCode("BLR")!,
      destination: getAirportByCode("JAI")!,
    },
    {
      id: "rt_3",
      origin: getAirportByCode("BLR")!,
      destination: getAirportByCode("UDR")!,
    },
  ],
  coveredFamilyMembers: [
    {
      id: "fm_1",
      fullName: "Ramesh Sharma",
      relationship: "Father",
      age: 64,
      idProofNumber: "XXXX-XXXX-4812",
    },
    {
      id: "fm_2",
      fullName: "Sunita Sharma",
      relationship: "Mother",
      age: 60,
      idProofNumber: "XXXX-XXXX-9934",
    },
    {
      id: "fm_3",
      fullName: "Priya Sharma",
      relationship: "Spouse",
      age: 30,
      idProofNumber: "XXXX-XXXX-1120",
    },
  ],
};

export const INITIAL_CLAIMS: Claim[] = [
  {
    id: "clm_88291",
    claimNumber: "CLM-8829",
    policyId: "pol_blr_rajasthan_01",
    policyNumber: "HW-2024-9421",
    applicantName: "Aayush Sharma",
    applicantPhone: "+91 98765 43210",
    emergencyType: "HOSPITALIZATION",
    affectedFamilyMemberId: "fm_1",
    affectedFamilyMemberName: "Ramesh Sharma",
    relationship: "Father",
    incidentDate: "2024-07-12",
    hospitalOrPlaceDetails: "Apex Heart & Critical Care Hospital, Jaipur",
    routeId: "rt_2",
    originCode: "BLR",
    destinationCode: "JAI",
    flightDate: "2024-07-12",
    flightPnr: "6E-5821",
    airlineName: "IndiGo 6E-5821 (Emergency Tatkal Booking)",
    actualTicketCostInr: 21500,
    eligibleReimbursementInr: 20000,
    payoutStatus: "APPROVED",
    payoutMethod: "UPI",
    upiId: "aayush@okhdfcbank",
    documents: [
      {
        id: "doc_1",
        type: "FLIGHT_TICKET",
        fileName: "IndiGo_BLR_JAI_Emergency_Ticket.pdf",
        fileSize: "420 KB",
        uploadedAt: "2024-07-14T09:30:00.000Z",
      },
      {
        id: "doc_2",
        type: "BOARDING_PASS",
        fileName: "BoardingPass_Seat12B_BLR_JAI.pdf",
        fileSize: "185 KB",
        uploadedAt: "2024-07-14T09:30:00.000Z",
      },
      {
        id: "doc_3",
        type: "HOSPITAL_DISCHARGE_SUMMARY",
        fileName: "ApexHospital_ICU_Admission_Summary.pdf",
        fileSize: "1.2 MB",
        uploadedAt: "2024-07-14T09:32:00.000Z",
      },
    ],
    createdAt: "2024-07-14T09:35:00.000Z",
    reviewedAt: "2024-07-14T15:20:00.000Z",
    reviewNotes: "Emergency admission verified with Apex Hospital IPD records. Flight boarding pass verified. Maximum cap ₹20,000 disbursed via UPI.",
  },
];
