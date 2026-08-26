-- ==========================================================
-- HOMEWARD: EMERGENCY TRAVEL PASS DATABASE SCHEMA (SUPABASE)
-- Free tier compatible PostgreSQL Schema with RLS
-- ==========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. POLICIES TABLE
create table public.policies (
    id uuid primary key default uuid_generate_v4(),
    pass_number text unique not null,
    user_id uuid references auth.users(id) on delete cascade,
    holder_name text not null,
    holder_phone text not null,
    holder_email text not null,
    holder_city text not null,
    valid_from timestamp with time zone default now() not null,
    valid_until timestamp with time zone not null, -- 3 years from valid_from
    status text check (status in ('ACTIVE', 'EXPIRED', 'SUSPENDED')) default 'ACTIVE',
    cost_paid_inr integer default 5000 not null,
    max_reimbursement_inr integer default 20000 not null,
    claims_remaining integer default 3 not null,
    created_at timestamp with time zone default now() not null
);

-- 2. REGISTERED EMERGENCY CORRIDORS (3 per pass)
create table public.emergency_routes (
    id uuid primary key default uuid_generate_v4(),
    policy_id uuid references public.policies(id) on delete cascade not null,
    origin_code varchar(3) not null,
    origin_city text not null,
    destination_code varchar(3) not null,
    destination_city text not null,
    created_at timestamp with time zone default now() not null
);

-- 3. COVERED FAMILY MEMBERS / BENEFICIARIES
create table public.beneficiaries (
    id uuid primary key default uuid_generate_v4(),
    policy_id uuid references public.policies(id) on delete cascade not null,
    full_name text not null,
    relationship text not null check (relationship in (
        'Father', 'Mother', 'Spouse', 'Son', 'Daughter', 
        'Brother', 'Sister', 'Father-in-law', 'Mother-in-law'
    )),
    age integer not null,
    id_proof_last4 varchar(4),
    created_at timestamp with time zone default now() not null
);

-- 4. EMERGENCY CLAIMS TABLE
create table public.claims (
    id uuid primary key default uuid_generate_v4(),
    claim_number text unique not null,
    policy_id uuid references public.policies(id) on delete cascade not null,
    applicant_name text not null,
    applicant_phone text not null,
    
    -- Emergency details (Strictly Hospitalization or Demise)
    emergency_type text check (emergency_type in ('HOSPITALIZATION', 'BEREAVEMENT_DEATH')) not null,
    affected_family_member_name text not null,
    relationship text not null,
    incident_date date not null,
    hospital_or_place_details text not null,
    
    -- Flight route & ticket
    route_origin_code varchar(3) not null,
    route_dest_code varchar(3) not null,
    flight_date date not null,
    flight_pnr text not null,
    airline_name text not null,
    actual_ticket_cost_inr numeric(10, 2) not null,
    
    -- Payout & Settlement
    eligible_reimbursement_inr numeric(10, 2) default 20000.00 not null,
    payout_status text check (payout_status in ('SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'DISBURSED')) default 'SUBMITTED',
    payout_method text default 'UPI' not null,
    upi_id text,
    bank_account_number text,
    bank_ifsc text,
    
    -- Review notes
    reviewed_by uuid references auth.users(id),
    reviewed_at timestamp with time zone,
    review_notes text,
    rejection_reason text,
    created_at timestamp with time zone default now() not null
);

-- 5. CLAIM VERIFICATION DOCUMENTS
create table public.claim_documents (
    id uuid primary key default uuid_generate_v4(),
    claim_id uuid references public.claims(id) on delete cascade not null,
    document_type text check (document_type in (
        'FLIGHT_TICKET', 'BOARDING_PASS', 'HOSPITAL_DISCHARGE_SUMMARY', 
        'DEATH_CERTIFICATE', 'DOCTOR_PRESCRIPTION'
    )) not null,
    file_name text not null,
    file_url text not null,
    file_size_bytes bigint,
    uploaded_at timestamp with time zone default now() not null
);

-- Enable Row-Level Security
alter table public.policies enable row level security;
alter table public.emergency_routes enable row level security;
alter table public.beneficiaries enable row level security;
alter table public.claims enable row level security;
alter table public.claim_documents enable row level security;

-- Policy RLS Rules
create policy "Users can view their own policies"
    on public.policies for select
    using (auth.uid() = user_id);

create policy "Users can view their own claims"
    on public.claims for select
    using (policy_id in (select id from public.policies where user_id = auth.uid()));

create policy "Users can insert claims for their own policy"
    on public.claims for insert
    with check (policy_id in (select id from public.policies where user_id = auth.uid()));
