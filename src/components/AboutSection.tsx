import React from 'react';
import { Target, Lightbulb, Compass } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const AboutSection: React.FC = () => {
  const { language } = useSiteConfig();
  const isEn = language === 'en';

  return (
    <section
      id="about"
      className="py-10 sm:py-14 bg-white border-b border-slate-200/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="text-xs font-semibold text-[#17469E] tracking-wide uppercase mb-1">
            {isEn ? 'About RANZ' : 'RANZ সম্পর্কে'}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#101828] tracking-tight">
            {isEn ? 'Skills, Marketing & Web Solutions' : 'দক্ষতা, মার্কেটিং ও ওয়েব সমাধান'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Digital Marketing & Ads */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors text-left space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EAF2FF] text-[#17469E] flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              {/* Mini animated targeting wave graphic */}
              <div className="flex items-end gap-1 h-7 px-2.5 py-1.5 rounded-lg bg-[#101828] shrink-0" aria-hidden="true">
                {[45, 75, 55, 95, 70].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%`, animationDelay: `${i * 0.16}s` }}
                    className="w-1 rounded-t-xs bg-sky-400 animate-graphic-bar"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">
                {isEn ? 'Digital Marketing & Ads' : 'ডিজিটাল মার্কেটিং ও অ্যাডস'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEn
                  ? 'Meta & TikTok ad management focused on targeting and conversions.'
                  : 'সঠিক অডিয়েন্স ও কনভার্সন-কেন্দ্রিক Meta ও TikTok অ্যাডস ম্যানেজমেন্ট।'}
              </p>
            </div>
          </div>

          {/* Card 2: Websites & Tracking */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors text-left space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center shrink-0">
                <Lightbulb className="w-4 h-4" />
              </div>
              {/* Mini animated tracking data flow SVG */}
              <div className="flex items-center px-2.5 h-7 rounded-lg bg-[#101828] shrink-0" aria-hidden="true">
                <svg viewBox="0 0 64 16" className="w-14 h-3.5">
                  <circle cx="6" cy="8" r="3" fill="#38BDF8" />
                  <line x1="11" y1="8" x2="27" y2="8" stroke="#60A5FA" strokeWidth="1.5" className="animate-dash-flow" />
                  <circle cx="32" cy="8" r="3.5" fill="#F59E0B" />
                  <line x1="37" y1="8" x2="53" y2="8" stroke="#34D399" strokeWidth="1.5" className="animate-dash-flow" />
                  <circle cx="58" cy="8" r="3" fill="#34D399" />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">
                {isEn ? 'Websites & Tracking' : 'ওয়েবসাইট ও ট্র্যাকিং'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEn
                  ? 'Business, e-commerce, and landing pages with GTM, GA4, Pixel & Server-Side tracking.'
                  : 'বিজনেস ও ই-কমার্স ওয়েবসাইট এবং GTM, GA4 ও সার্ভার-সাইড ট্র্যাকিং।'}
              </p>
            </div>
          </div>

          {/* Card 3: YouTube Automation (Nazmul) */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors text-left space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              {/* Mini animated channel growth bars */}
              <div className="flex items-end gap-1 h-7 px-2.5 py-1.5 rounded-lg bg-[#101828] shrink-0" aria-hidden="true">
                {[38, 52, 68, 84, 100].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%`, animationDelay: `${i * 0.18}s` }}
                    className="w-1 rounded-t-xs bg-indigo-400 animate-graphic-bar"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">
                {isEn ? 'YouTube Automation' : 'YouTube অটোমেশন'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEn
                  ? 'USA content and channel monetization training led by Nazmul.'
                  : 'Nazmul-এর পরিচালনায় USA কনটেন্ট ও ইউটিউব অটোমেশন প্রশিক্ষণ।'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
