import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Briefcase,
  MessageSquare,
  Globe,
  Megaphone,
  Video,
  Cpu,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { RAHMAN_SERVICES } from '../data/servicesData';

interface HeroSectionProps {
  onExploreServices: () => void;
  onExploreCourses: () => void;
}

const BN_SHORT_TITLES: Record<string, string> = {
  'web-tracking': 'ওয়েবসাইট ও ট্র্যাকিং',
  'meta-ads': 'Meta (FB/IG) অ্যাডস',
  'tiktok-ads': 'TikTok অ্যাডস',
  'ai-automation': 'AI ও অটোমেশন',
};

const EN_SHORT_TITLES: Record<string, string> = {
  'web-tracking': 'Website & Tracking',
  'meta-ads': 'Meta (FB & IG) Ads',
  'tiktok-ads': 'TikTok Advertising',
  'ai-automation': 'AI & Automation',
};

interface GraphicSlide {
  id: string;
  tag: string;
  titleEn: string;
  titleBn: string;
  tags: string[];
  accentBg: string;
  accentBar: string;
  barHeights: number[];
}

const GRAPHIC_SLIDES: GraphicSlide[] = [
  {
    id: 'web-tracking',
    tag: 'WEB & TRACKING',
    titleEn: 'Website Development & Tracking',
    titleBn: 'ওয়েবসাইট ডেভেলপমেন্ট ও ট্র্যাকিং',
    tags: ['E-commerce', 'GTM & GA4', 'Meta Pixel', 'Server-Side'],
    accentBg: 'from-[#0F1E3D] via-[#132952] to-[#17469E]',
    accentBar: 'bg-sky-400',
    barHeights: [45, 72, 58, 88, 68, 96, 80],
  },
  {
    id: 'meta-ads',
    tag: 'META ADVERTISING',
    titleEn: 'Facebook & Instagram Ads',
    titleBn: 'Facebook ও Instagram বিজ্ঞাপন',
    tags: ['Campaign Setup', 'Lookalike', 'Retargeting', 'A/B Testing'],
    accentBg: 'from-[#101828] via-[#172B54] to-[#1D4ED8]',
    accentBar: 'bg-blue-400',
    barHeights: [55, 82, 66, 94, 76, 90, 98],
  },
  {
    id: 'tiktok-ads',
    tag: 'TIKTOK ADVERTISING',
    titleEn: 'TikTok Ads & Optimization',
    titleBn: 'TikTok অ্যাডস ক্যাম্পেইন',
    tags: ['Ads Setup', 'Audience Research', 'Performance', 'Optimization'],
    accentBg: 'from-[#0B172A] via-[#112A46] to-[#0E7490]',
    accentBar: 'bg-cyan-400',
    barHeights: [50, 68, 86, 62, 92, 78, 95],
  },
  {
    id: 'ai-automation',
    tag: 'AI & AUTOMATION',
    titleEn: 'AI & Digital Automation',
    titleBn: 'AI ও ডিজিটাল অটোমেশন',
    tags: ['AI Business', 'AI Website', 'YT Automation'],
    accentBg: 'from-[#0F172A] via-[#162C46] to-[#047857]',
    accentBar: 'bg-emerald-400',
    barHeights: [60, 74, 84, 70, 95, 82, 90],
  },
];

const HERO_SERVICE_ICONS: Record<string, React.ReactNode> = {
  globe: <Globe className="w-4 h-4 text-sky-300" />,
  megaphone: <Megaphone className="w-4 h-4 text-sky-300" />,
  video: <Video className="w-4 h-4 text-cyan-300" />,
  cpu: <Cpu className="w-4 h-4 text-emerald-300" />,
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreServices,
  onExploreCourses,
}) => {
  const { config, language } = useSiteConfig();
  const isEn = language === 'en';
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % GRAPHIC_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = GRAPHIC_SLIDES[activeSlideIdx];
  const rahmanWhatsappNumber = config.helpline1Whatsapp.replace(/[^0-9]/g, '') || '8801883423076';
  const rahmanWhatsappUrl = `https://wa.me/${rahmanWhatsappNumber}`;

  const handlePrevSlide = () => {
    setActiveSlideIdx((prev) => (prev - 1 + GRAPHIC_SLIDES.length) % GRAPHIC_SLIDES.length);
  };

  const handleNextSlide = () => {
    setActiveSlideIdx((prev) => (prev + 1) % GRAPHIC_SLIDES.length);
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-4 pb-8 sm:pt-8 sm:pb-12 bg-white bg-tech-grid border-b border-slate-200/80"
    >
      {/* Subtle architectural ambient glow graphics */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-500/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
          {/* Left Column: Visual Intro, CTAs & Graphic Service Cards */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-3.5 sm:space-y-4 text-left">
            {/* Visual Graphic Identity Strip */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#0F1E3D] to-[#17469E] text-white text-xs shadow-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-brand font-bold tracking-wide">MD ABDUR RAHMAN</span>
              <span className="text-blue-200" aria-hidden="true">·</span>
              <span className="text-sky-200 font-medium">
                {isEn
                  ? 'Digital Marketing & Web Solutions Specialist'
                  : 'ডিজিটাল মার্কেটিং ও ওয়েব সলিউশনস স্পেশালিস্ট'}
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#101828] leading-[1.22] tracking-tight text-balance">
              {isEn ? (
                <>
                  Digital Marketing, Websites <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-[#17469E] to-[#0EA5E9] bg-clip-text text-transparent">
                    &amp; Conversion Tracking
                  </span>
                </>
              ) : (
                <>
                  ডিজিটাল মার্কেটিং, ওয়েবসাইট <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-[#17469E] to-[#0EA5E9] bg-clip-text text-transparent">
                    ও ট্র্যাকিং সার্ভিস
                  </span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
              {isEn
                ? 'I help businesses grow through strategic digital marketing, professional website development, and data-driven advertising solutions.'
                : 'কৌশলগত ডিজিটাল মার্কেটিং, প্রফেশনাল ওয়েবসাইট ডেভেলপমেন্ট ও ডেটা-ড্রিভেন বিজ্ঞাপনের মাধ্যমে ব্যবসার প্রবৃদ্ধিতে সহায়তা করি।'}
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#102654] to-[#17469E] hover:from-[#17469E] hover:to-[#1E56C5] rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{isEn ? 'All Services' : 'সব সার্ভিস দেখুন'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={rahmanWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onExploreCourses}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#17469E] bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{isEn ? 'Course' : 'কোর্স'}</span>
              </button>
            </div>

            {/* 4 Visual Graphic Service Cards (Synced with Live Showcase) */}
            <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2.5">
              {RAHMAN_SERVICES.map((svc, idx) => {
                const isActive = idx === activeSlideIdx;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onMouseEnter={() => setActiveSlideIdx(idx)}
                    onClick={onExploreServices}
                    className={`relative overflow-hidden flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl border transition-all text-left cursor-pointer group ${
                      isActive
                        ? 'bg-gradient-to-br from-[#0F1E3D] via-[#132952] to-[#17469E] border-[#17469E] text-white shadow-md shadow-blue-950/15'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/90 text-slate-900 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-white/15 border border-white/20'
                            : 'bg-[#0F1E3D] shadow-2xs'
                        }`}
                      >
                        {HERO_SERVICE_ICONS[svc.iconKey]}
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`text-[11px] sm:text-xs font-bold leading-snug truncate ${
                            isActive ? 'text-white' : 'text-slate-900 group-hover:text-[#17469E]'
                          }`}
                        >
                          {isEn
                            ? EN_SHORT_TITLES[svc.id] || svc.title
                            : BN_SHORT_TITLES[svc.id] || svc.title}
                        </div>
                        <div
                          className={`text-[10px] sm:text-[11px] truncate ${
                            isActive ? 'text-sky-200' : 'text-slate-500'
                          }`}
                        >
                          {svc.items.length} {isEn ? 'Services' : 'টি সার্ভিস'}
                        </div>
                      </div>
                    </div>

                    {/* Mini Live Graphic Signal Bars on Each Service Card */}
                    <div
                      aria-hidden="true"
                      className={`hidden sm:flex items-end gap-0.5 h-5 px-1.5 py-1 rounded-md shrink-0 ${
                        isActive ? 'bg-white/15' : 'bg-slate-100'
                      }`}
                    >
                      {[45, 85, 65].map((h, barIdx) => (
                        <span
                          key={barIdx}
                          style={{
                            height: `${h}%`,
                            animationDelay: `${(idx + barIdx) * 0.15}s`,
                          }}
                          className={`w-1 rounded-t-xs animate-graphic-bar ${
                            isActive ? 'bg-sky-300' : 'bg-[#17469E]/70'
                          }`}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: MD ABDUR RAHMAN Natural Portrait + Auto-Changing Graphic Showcase */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/70 overflow-hidden">
              {/* Crisp Studio Portrait (Natural Colors, Zero Fog/White Wash) */}
              <div className="relative h-56 sm:h-72 lg:h-[310px] w-full overflow-hidden bg-slate-900">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-26_at_8.09.25_AM_87d0e778.jpeg"
                  alt="MD ABDUR RAHMAN"
                  className="w-full h-full object-cover object-[50%_18%] animate-portrait-breath"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Clean Identity Bar (No Name Truncation) */}
              <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white border-b border-slate-100 flex items-center justify-between gap-2">
                <div className="text-left min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-[#101828] font-brand leading-tight">
                    MD ABDUR RAHMAN
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#17469E] font-medium leading-tight mt-0.5">
                    {isEn
                      ? 'Digital Marketing & Web Solutions'
                      : 'ডিজিটাল মার্কেটিং ও ওয়েব সলিউশনস'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onExploreServices}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-white bg-[#17469E] hover:bg-[#13377d] px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Get Service' : 'সার্ভিস নিন'}</span>
                </button>
              </div>

              {/* Auto-Changing Animated Service Graphic Panel */}
              <div
                className={`relative bg-gradient-to-r ${currentSlide.accentBg} text-white px-3.5 py-3 sm:px-4 sm:py-3.5 transition-colors duration-700`}
              >
                <div
                  key={currentSlide.id}
                  className="animate-graphic-enter flex items-center justify-between gap-3"
                >
                  {/* Left: Service Slide Info */}
                  <div className="min-w-0 flex-1 text-left">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-wider uppercase text-sky-300 font-brand">
                        {currentSlide.tag}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-snug truncate">
                      {isEn ? currentSlide.titleEn : currentSlide.titleBn}
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {currentSlide.tags.map((item) => (
                        <span
                          key={item}
                          className="text-[10px] font-medium text-slate-100 bg-white/12 px-1.5 py-0.5 rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Live Animated Graphic Bars */}
                  <div
                    aria-hidden="true"
                    className="flex items-end gap-1 h-11 sm:h-12 px-2.5 py-2 rounded-xl bg-white/10 border border-white/15 shrink-0"
                  >
                    {currentSlide.barHeights.map((h, i) => (
                      <span
                        key={i}
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 0.14}s`,
                        }}
                        className={`w-1.5 rounded-t-sm ${currentSlide.accentBar} animate-graphic-bar`}
                      />
                    ))}
                  </div>
                </div>

                {/* Slide Controls & Auto-Progress Bar */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {GRAPHIC_SLIDES.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveSlideIdx(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          idx === activeSlideIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      aria-label="Previous graphic"
                      className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextSlide}
                      aria-label="Next graphic"
                      className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Smooth Auto-Cycle Progress Line */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10 overflow-hidden">
                  <div
                    key={activeSlideIdx}
                    className="h-full w-full bg-sky-300 animate-graphic-progress"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
