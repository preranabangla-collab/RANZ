import React, { useState } from 'react';
import {
  Globe,
  Megaphone,
  Video,
  Cpu,
  Check,
  MessageSquare,
  Mail,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { RAHMAN_SERVICES, ServiceCategory } from '../data/servicesData';
import { useSiteConfig } from '../context/SiteConfigContext';

const CategoryIcon: React.FC<{ iconKey: ServiceCategory['iconKey'] }> = ({ iconKey }) => {
  switch (iconKey) {
    case 'globe':
      return <Globe className="w-5 h-5" />;
    case 'megaphone':
      return <Megaphone className="w-5 h-5" />;
    case 'video':
      return <Video className="w-5 h-5" />;
    case 'cpu':
      return <Cpu className="w-5 h-5" />;
  }
};

const BN_CATEGORY_META: Record<string, { title: string; tab: string }> = {
  'web-tracking': {
    title: 'ওয়েবসাইট ডেভেলপমেন্ট ও ট্র্যাকিং',
    tab: 'ওয়েব ও ট্র্যাকিং',
  },
  'meta-ads': {
    title: 'Meta (Facebook ও Instagram) বিজ্ঞাপন',
    tab: 'Meta অ্যাডস',
  },
  'tiktok-ads': {
    title: 'TikTok বিজ্ঞাপন',
    tab: 'TikTok অ্যাডস',
  },
  'ai-automation': {
    title: 'AI ও ডিজিটাল অটোমেশন',
    tab: 'AI ও অটোমেশন',
  },
};

export const ServicesSection: React.FC = () => {
  const { config, language } = useSiteConfig();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const isEn = language === 'en';

  const rahmanWhatsappNumber = config.helpline1Whatsapp.replace(/[^0-9]/g, '') || '8801883423076';
  const rahmanWhatsappUrl = `https://wa.me/${rahmanWhatsappNumber}`;
  const emailAddress = config.email || 'hmabdurrahman9082@gmail.com';

  const visibleServices =
    selectedCategory === 'all'
      ? RAHMAN_SERVICES
      : RAHMAN_SERVICES.filter((cat) => cat.id === selectedCategory);

  return (
    <section
      id="services"
      className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div className="text-left">
            <div className="text-xs font-semibold text-[#17469E] tracking-wide uppercase mb-1">
              MD ABDUR RAHMAN
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101828] tracking-tight font-brand">
              {isEn ? 'Professional Services' : 'প্রফেশনাল সার্ভিসসমূহ'}
            </h2>
          </div>

          {/* Filter Tabs */}
          <div
            className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl overflow-x-auto shrink-0"
            role="tablist"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#17469E] text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {isEn ? 'All' : 'সব'}
            </button>
            {RAHMAN_SERVICES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#17469E] text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {isEn
                  ? cat.title.split('&')[0].trim()
                  : BN_CATEGORY_META[cat.id]?.tab || cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <div
          className={`grid grid-cols-1 ${
            visibleServices.length === 1 ? 'max-w-3xl' : 'lg:grid-cols-2'
          } gap-5`}
        >
          {visibleServices.map((category) => {
            const coreItems = category.items.filter((i) => !i.isLearning);
            const learningItems = category.items.filter((i) => i.isLearning);
            const bnMeta = BN_CATEGORY_META[category.id];

            return (
              <article
                key={category.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between text-left hover:border-blue-300 shadow-2xs transition-all"
              >
                <div>
                  {/* Animated Visual Graphic Header per Service Category */}
                  <div className="bg-gradient-to-r from-[#0F1E3D] via-[#132952] to-[#17469E] px-5 py-3.5 text-white flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 text-sky-300 flex items-center justify-center shrink-0">
                        <CategoryIcon iconKey={category.iconKey} />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white font-brand leading-snug">
                        {isEn ? category.title : bnMeta?.title || category.title}
                      </h3>
                    </div>

                    {/* Category-specific live SVG / CSS graphic */}
                    {category.id === 'web-tracking' && (
                      <div
                        aria-hidden="true"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/15 shrink-0"
                      >
                        <svg viewBox="0 0 76 18" className="w-16 h-4">
                          <rect x="2" y="4" width="12" height="10" rx="2" fill="#38BDF8" />
                          <line x1="16" y1="9" x2="31" y2="9" stroke="#7DD3FC" strokeWidth="1.5" className="animate-dash-flow" />
                          <circle cx="38" cy="9" r="4.5" fill="#60A5FA" />
                          <line x1="44" y1="9" x2="59" y2="9" stroke="#34D399" strokeWidth="1.5" className="animate-dash-flow" />
                          <circle cx="67" cy="9" r="4.5" fill="#34D399" />
                        </svg>
                      </div>
                    )}

                    {category.id === 'meta-ads' && (
                      <div
                        aria-hidden="true"
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/15 shrink-0"
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 overflow-visible">
                          <circle cx="12" cy="12" r="8" fill="none" stroke="#60A5FA" strokeWidth="1.5" className="animate-radar-ping" />
                          <circle cx="12" cy="12" r="5" fill="none" stroke="#93C5FD" strokeWidth="1.5" />
                          <circle cx="12" cy="12" r="2.5" fill="#38BDF8" />
                        </svg>
                        <div className="flex items-end gap-0.5 h-4">
                          {[50, 80, 65, 100].map((h, i) => (
                            <span
                              key={i}
                              style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                              className="w-1 rounded-t-xs bg-sky-300 animate-graphic-bar"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {category.id === 'tiktok-ads' && (
                      <div
                        aria-hidden="true"
                        className="flex items-end gap-1 h-7 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/15 shrink-0"
                      >
                        {[45, 85, 55, 100, 65, 90].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
                            className="w-1 rounded-t-xs bg-cyan-300 animate-graphic-bar"
                          />
                        ))}
                      </div>
                    )}

                    {category.id === 'ai-automation' && (
                      <div
                        aria-hidden="true"
                        className="flex items-center px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/15 shrink-0"
                      >
                        <svg viewBox="0 0 68 20" className="w-16 h-4">
                          <circle cx="8" cy="10" r="3.5" fill="#34D399" />
                          <line x1="13" y1="10" x2="29" y2="10" stroke="#6EE7B7" strokeWidth="1.5" className="animate-dash-flow" />
                          <rect x="31" y="5" width="10" height="10" rx="2.5" fill="#38BDF8" />
                          <line x1="43" y1="10" x2="57" y2="10" stroke="#7DD3FC" strokeWidth="1.5" className="animate-dash-flow" />
                          <circle cx="62" cy="10" r="3.5" fill="#A7F3D0" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6">
                    {/* Service List */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {coreItems.map((item) => (
                        <li
                          key={item.name}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium"
                        >
                          <Check className="w-4 h-4 text-[#17469E] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item.name}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Currently Learning Note */}
                    {learningItems.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <ul className="space-y-1">
                          {learningItems.map((item) => (
                            <li
                              key={item.name}
                              className="flex items-center justify-between gap-2 text-xs sm:text-sm text-slate-600"
                            >
                              <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                                <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                {item.name}
                              </span>
                              <span className="text-xs font-medium text-amber-700 shrink-0">
                                {isEn ? 'Currently Learning' : 'বর্তমানে শেখা হচ্ছে'}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom Action */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex justify-end">
                  <a
                    href={`${rahmanWhatsappUrl}?text=${encodeURIComponent(
                      `Hello MD Abdur Rahman, I need ${category.title} service.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17469E] hover:text-[#13377d] transition-colors whitespace-nowrap"
                  >
                    <span>{isEn ? 'WhatsApp' : 'WhatsApp-এ মেসেজ দিন'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Graphic CTA Strip */}
        <div className="mt-6 bg-gradient-to-r from-[#0F1E3D] via-[#132952] to-[#17469E] rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 text-white shadow-md shadow-blue-950/10">
          <div className="flex items-center gap-3.5 text-left">
            <div
              aria-hidden="true"
              className="hidden sm:flex items-end gap-1 h-9 px-2.5 py-2 rounded-xl bg-white/10 border border-white/15 shrink-0"
            >
              {[45, 70, 55, 95, 75].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%`, animationDelay: `${i * 0.14}s` }}
                  className="w-1 rounded-t-xs bg-emerald-400 animate-graphic-bar"
                />
              ))}
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white font-brand">
                {isEn ? 'Start Your Project' : 'সার্ভিস নিতে সরাসরি যোগাযোগ করুন'}
              </div>
              <div className="text-xs text-blue-200 mt-0.5">
                MD ABDUR RAHMAN · WhatsApp &amp; Email
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={rahmanWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isEn ? 'Contact on WhatsApp' : 'WhatsApp'}</span>
            </a>
            <a
              href={`mailto:${emailAddress}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#101828] bg-white hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5 text-[#17469E]" />
              <span>{isEn ? 'Email Me' : 'ইমেইল'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
