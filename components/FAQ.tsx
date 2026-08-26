'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What emergencies qualify for reimbursement?',
    answer: 'Only two emergency types qualify: (1) Sudden emergency hospitalization / ICU admission of a registered family member, and (2) Sudden demise / bereavement of a registered family member. Leisure vacations, general flight cancellations, or non-registered relatives are not covered.',
  },
  {
    question: 'How do the 3 emergency routes work?',
    answer: 'When you activate your pass, you set your base departure airport (e.g. Bengaluru BLR) and up to 3 destination hometown airports (e.g. Ahmedabad AMD, Jaipur JAI, Udaipur UDR). When an emergency strikes, any flight ticket booked on one of these 3 routes is eligible for reimbursement.',
  },
  {
    question: 'How is the ₹20,000 reimbursement calculated?',
    answer: 'We reimburse up to ₹20,000 per valid emergency ticket. If your emergency flight costs ₹21,500, we reimburse you the maximum ₹20,000. If your flight costs ₹14,200, we reimburse you the full ₹14,200. You never pay a deductible.',
  },
  {
    question: 'Do I have to call or get pre-approval before booking my flight?',
    answer: 'No! In an emergency, every minute counts. Open any booking app (MakeMyTrip, IndiGo, Air India) and book the fastest flight immediately. After you reach home safely, log into your Homeward dashboard, upload your boarding pass and hospital/death certificate, and request your payout.',
  },
  {
    question: 'How fast is the refund transferred to my account?',
    answer: 'Once you upload your flight ticket, boarding pass, and medical/demise proof, our verification desk validates the documents within 12 to 24 hours. The payout is disbursed instantly to your UPI ID or direct bank transfer via IMPS.',
  },
  {
    question: 'Who can be added to my registered family member list?',
    answer: 'You can register your parents (Father, Mother), spouse, children (Son, Daughter), siblings (Brother, Sister), and parents-in-law (Father-in-law, Mother-in-law).',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-[#faf8f5] border-b border-[#e6e2da]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-800" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#143026]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about your 3-year emergency pass.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'transform rotate-180 text-emerald-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
