import React, { useState } from 'react';
import { FAQ_DATA, FAQ_DATA_EN } from '../data/coursesData';
import { ChevronDown } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const FaqSection: React.FC = () => {
  const { language } = useSiteConfig();
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const isEn = language === 'en';
  const items = isEn ? FAQ_DATA_EN : FAQ_DATA;

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/80"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-semibold text-[#17469E] tracking-wide uppercase mb-2">
            {isEn ? 'Frequently Asked Questions' : 'প্রশ্ন ও উত্তর'}
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#101828] tracking-tight">
            {isEn ? 'Common Questions (FAQ)' : 'সাধারণ প্রশ্নসমূহ (FAQ)'}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
            {isEn
              ? 'Clear answers about RANZ services and training.'
              : 'RANZ সার্ভিস এবং কোর্স সম্পর্কিত সাধারণ তথ্যের স্পষ্ট উত্তর'}
          </p>
        </div>

        <div className="space-y-2.5">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-4 sm:px-5 py-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 text-left">
                    {item.question}
                  </span>
                  <div
                    className={`p-1 rounded bg-slate-100 text-slate-600 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-[#17469E]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    <p className="text-left font-normal">{item.answer}</p>
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
