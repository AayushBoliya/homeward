# Homeward (Emergency Ticket) 🕊️

> **Peace of mind when it matters most.**
> A 3-year emergency travel pass (₹5,000 one-time) providing up to ₹20,000 reimbursement for last-minute flights in case of medical emergencies or bereavement of registered family members.

---

## ✨ Features

- 🌿 **Tranquil, High-Trust Design**: Forest teal, soft bone/sand, warm accents designed to build trust and calm anxiety.
- 🛫 **3 Pre-Configured Emergency Corridors**: Lock 1 base origin (e.g., BLR) and 3 destination airports (e.g., AMD, JAI, UDR) with Indian airport IATA search.
- 👨‍👩‍👧‍👦 **Registered Family Directory**: Parents, spouse, children, siblings, and in-laws protected under a single pass.
- ⚡ **Strict Emergency Coverage Scope**:
  - Covered: Emergency hospitalization, ICU admission, or sudden demise of registered members.
  - Excluded: Vacation/leisure travel, general flight delays, and unregistered relatives.
- 💰 **Emergency Surge Savings Calculator**: Interactive tool showing savings against surge flight pricing.
- 📋 **Seamless Post-Travel Claim Filing**: Book flight first, upload boarding pass + hospital/death certificate after reaching home.
- 🛡️ **Built-in Admin Verification Desk**: Review uploaded proofs, cross-check routes and family relations, approve ₹20,000 payouts.
- 🏷️ **100% Zero-Cost Stack**: Built to run entirely on free tiers (Vercel + Supabase + Client-Side Fallback).

---

## Tech Stack

| Layer | Technology | Free Tier Details |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) + TypeScript | Open Source |
| **Styling** | Tailwind CSS + Lucide Icons | Open Source |
| **Hosting** | **Vercel** | Free Hobby Plan (Free `*.vercel.app` domain & SSL) |
| **Database (Optional)** | **Supabase** (PostgreSQL + RLS) | Free 500MB DB, 50k MAU, 1GB File Storage |
| **Payments (Optional)** | **Razorpay** | Free test & standard INR UPI/Card integration |

---


## Project Structure

```
homeward/
├── app/
│   ├── globals.css         # Soothing color themes & glassmorphism
│   ├── layout.tsx          # Root HTML layout with context provider
│   └── page.tsx            # Multi-view main controller
├── components/
│   ├── Navbar.tsx          # Header with status pills & demo reset
│   ├── Hero.tsx            # Value proposition & 3D pass certificate
│   ├── SavingsCalculator.tsx # Interactive surge fare vs refund tool
│   ├── CoverageExplainer.tsx # Strict health/bereavement rules
│   ├── HowItWorks.tsx      # 4-step process guide
│   ├── PolicyWizard.tsx    # 4-step 3-year pass setup wizard
│   ├── Dashboard.tsx       # Active pass card, 3 routes, family list, claims
│   ├── ClaimModal.tsx      # Claim submission form with refund calculator
│   ├── AdminConsole.tsx    # Document review & payout authorization desk
│   ├── FAQ.tsx             # Essential Q&A
│   └── Footer.tsx          # Brand footer & emergency contact info
├── lib/
│   ├── airports.ts         # Indian airports IATA database
│   ├── mockData.ts         # Sample BLR -> AMD/JAI/UDR seed data
│   ├── store.tsx           # Context provider & localStorage persistence
│   └── utils.ts            # INR formatter, date tools, Tailwind helpers
├── supabase/
│   └── schema.sql          # PostgreSQL schema with Row-Level Security
└── types/
    └── index.ts            # TypeScript interfaces
```
