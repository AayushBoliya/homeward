import type { Metadata } from 'next';
import './globals.css';
import { HomewardProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Homeward — 3-Year Emergency Travel Pass for Migrant Professionals & Families',
  description: 'Peace of mind when it matters most. ₹5,000 for 3 years covers up to ₹20,000 emergency flight reimbursement for sudden medical emergencies or bereavement of registered family members.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf8f5] text-[#1c2421] selection:bg-emerald-100 selection:text-emerald-900">
        <HomewardProvider>
          {children}
        </HomewardProvider>
      </body>
    </html>
  );
}
