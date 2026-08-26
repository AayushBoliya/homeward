'use client';

import React from 'react';
import { useHomewardStore } from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SavingsCalculator } from '@/components/SavingsCalculator';
import { CoverageExplainer } from '@/components/CoverageExplainer';
import { HowItWorks } from '@/components/HowItWorks';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { PolicyWizard } from '@/components/PolicyWizard';
import { Dashboard } from '@/components/Dashboard';
import { AdminConsole } from '@/components/AdminConsole';
import { ClaimModal } from '@/components/ClaimModal';

export default function HomePage() {
  const { activeView } = useHomewardStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'landing' && (
          <>
            <Hero />
            <SavingsCalculator />
            <CoverageExplainer />
            <HowItWorks />
            <FAQ />
          </>
        )}

        {activeView === 'wizard' && <PolicyWizard />}
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'admin' && <AdminConsole />}
      </main>

      {/* Global Modals */}
      <ClaimModal />

      {/* Peaceful Footer */}
      <Footer />
    </div>
  );
}
