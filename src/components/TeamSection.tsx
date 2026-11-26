import React from 'react';
import {
  Phone,
  MessageSquare,
  Send,
  Mail,
  Globe,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const TeamSection: React.FC = () => {
  const { config, language } = useSiteConfig();
  const isEn = language === 'en';

  const rahmanWhatsappNumber = config.helpline1Whatsapp.replace(/[^0-9]/g, '') || '8801883423076';
  const rahmanWhatsappUrl = `https://wa.me/${rahmanWhatsappNumber}`;
  const rahmanTelegramUrl = `https://t.me/+${rahmanWhatsappNumber}`;
  const emailAddress = config.email || 'hmabdurrahman9082@gmail.com';
  const websiteUrl = config.websiteUrl || 'https://ranz.com';

  // Nazmul's original information preserved unchanged
  const nazmul = {
    name: 'Nazmul',
    role: 'Co-Founder, RANZ',
    expertise: 'YouTube Automation',
    phone: '01862877500',
    image: '/assets/aistudio/image_1a9f5736.png',
    avatarPosition: 'center 28%',
    callUrl: 'tel:01862877500',
    whatsappUrl:
      'https://wa.me/8801862877500?text=Hello%20Nazmul,%20I%20am%20interested%20in%20RANZ%20courses',
    telegramUrl: 'https://t.me/+8801862877500',
  };

  return (
    <section
      id="team"
      className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-200/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="text-xs font-semibold text-[#17469E] tracking-wide uppercase mb-1">
            {isEn ? 'Our Team' : 'আমাদের টিম'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#101828] tracking-tight font-brand">
            {isEn ? 'RANZ Team' : 'RANZ নেতৃত্ব'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* MD ABDUR RAHMAN */}
          <article className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between text-left hover:border-blue-300 shadow-2xs transition-colors">
            <div>
              {/* Visual Graphic Profile Banner */}
              <div className="bg-gradient-to-r from-[#0F1E3D] via-[#132952] to-[#17469E] p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/25 bg-slate-900 shrink-0 shadow-md">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-11-26_at_8.09.25_AM_87d0e778.jpeg"
                      alt="MD ABDUR RAHMAN"
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h3 className="text-lg sm:text-2xl font-bold text-white font-brand tracking-tight leading-snug">
                      MD ABDUR RAHMAN
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-sky-300 leading-snug">
                      {isEn
                        ? 'Digital Marketing & Web Solutions Specialist'
                        : 'ডিজিটাল মার্কেটিং ও ওয়েব সলিউশনস স্পেশালিস্ট'}
                    </p>
                  </div>
                </div>

                {/* Live Service Signal Graphic */}
                <div
                  aria-hidden="true"
                  className="hidden sm:flex items-end gap-1 h-10 px-3 py-2 rounded-xl bg-white/10 border border-white/15 shrink-0"
                >
                  {[45, 78, 60, 95, 72, 88].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%`, animationDelay: `${i * 0.14}s` }}
                      className="w-1.5 rounded-t-xs bg-sky-300 animate-graphic-bar"
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
                  {isEn ? (
                    <>
                      <p>
                        I help businesses grow through strategic digital marketing, professional website development, and data-driven advertising solutions.
                      </p>
                      <p>
                        My goal is to help businesses establish a strong online presence, reach the right audience, improve conversions, and achieve sustainable growth.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        কৌশলগত ডিজিটাল মার্কেটিং, প্রফেশনাল ওয়েবসাইট ডেভেলপমেন্ট ও ডেটা-ড্রিভেন বিজ্ঞাপনের মাধ্যমে ব্যবসাকে এগিয়ে নিতে সহায়তা করি।
                      </p>
                      <p>
                        আমার লক্ষ্য হলো ব্যবসাগুলোকে শক্তিশালী অনলাইন উপস্থিতি তৈরি করতে, সঠিক অডিয়েন্সে পৌঁছাতে এবং কনভার্সন বাড়াতে সাহায্য করা।
                      </p>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  <a
                    href={`tel:+${rahmanWhatsappNumber}`}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#17469E] shrink-0" />
                    <span className="font-mono tabular-nums font-semibold truncate">
                      +{rahmanWhatsappNumber}
                    </span>
                  </a>

                  <a
                    href={`mailto:${emailAddress}`}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#17469E] shrink-0" />
                    <span className="font-medium truncate">{emailAddress}</span>
                  </a>

                  <a
                    href={rahmanTelegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300"
                  >
                    <Send className="w-3.5 h-3.5 text-[#229ED9] shrink-0" />
                    <span className="font-mono tabular-nums font-medium truncate">
                      +{rahmanWhatsappNumber}
                    </span>
                  </a>

                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#17469E] shrink-0" />
                    <span className="font-medium truncate">{websiteUrl}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
              <a
                href={rahmanWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isEn ? 'Contact on WhatsApp' : 'WhatsApp'}</span>
              </a>

              <a
                href={`mailto:${emailAddress}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#17469E] hover:bg-[#13377d] rounded-lg transition-colors whitespace-nowrap"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{isEn ? 'Email Me' : 'ইমেইল'}</span>
              </a>
            </div>
          </article>

          {/* NAZMUL - Preserved Unchanged */}
          <article className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-between text-center hover:border-blue-200 transition-colors">
            <div className="flex flex-col items-center space-y-3 w-full">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-200">
                <img
                  src={nazmul.image}
                  alt={nazmul.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: nazmul.avatarPosition || 'center 35%' }}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="font-bold text-lg sm:text-xl text-slate-900 font-brand">
                  {nazmul.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#17469E] font-semibold mt-0.5">
                  {nazmul.role}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-600">
                  Area: {nazmul.expertise}
                </p>
              </div>
            </div>

            <div className="w-full pt-4 mt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-sm font-mono tabular-nums font-bold text-slate-800">
                <Phone className="w-3.5 h-3.5 text-[#17469E]" />
                <a href={nazmul.callUrl} className="hover:text-[#17469E] hover:underline">
                  {nazmul.phone}
                </a>
              </div>

              <div className="flex items-center justify-center gap-2">
                <a
                  href={nazmul.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={nazmul.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#229ED9] hover:bg-[#1a8bc1] rounded-lg transition-colors whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
