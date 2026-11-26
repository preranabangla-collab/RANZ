import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Send, Check, Copy, Globe } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const ContactSection: React.FC = () => {
  const { config, language } = useSiteConfig();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const isEn = language === 'en';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const wa1Number = config.helpline1Whatsapp.replace(/[^0-9]/g, '') || '8801883423076';
  const wa1Url = `https://wa.me/${wa1Number}`;

  const tg1Url = config.helpline1Telegram.startsWith('http')
    ? config.helpline1Telegram
    : `https://t.me/${config.helpline1Telegram.startsWith('+') ? config.helpline1Telegram : `+${config.helpline1Telegram}`}`;

  const wa2Url = config.helpline2Whatsapp.startsWith('http')
    ? config.helpline2Whatsapp
    : `https://wa.me/${config.helpline2Whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('হ্যালো RANZ, আমি কোর্স সম্পর্কে জানতে চাই')}`;

  const tg2Url = config.helpline2Telegram.startsWith('http')
    ? config.helpline2Telegram
    : `https://t.me/${config.helpline2Telegram.startsWith('+') ? config.helpline2Telegram : `+${config.helpline2Telegram}`}`;

  const websiteUrl = config.websiteUrl || 'https://ranz.com';

  return (
    <section id="contact" className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="text-xs font-semibold text-[#17469E] tracking-wide uppercase mb-1">
            {isEn ? 'Contact' : 'যোগাযোগ'}
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#101828] tracking-tight">
            {isEn ? 'Direct Contact' : 'সরাসরি যোগাযোগ'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: MD ABDUR RAHMAN */}
          <div className="bg-slate-50/50 p-5 sm:p-6 rounded-xl border border-slate-200/90 hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 text-left">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-200/70">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#17469E] text-white flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#17469E]">
                    {isEn ? 'Services' : 'সার্ভিস'}
                  </span>
                </div>
                <div className="flex items-end gap-0.5 h-6 px-2 py-1 rounded-md bg-[#101828]" aria-hidden="true">
                  {[50, 85, 65, 95].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%`, animationDelay: `${i * 0.16}s` }}
                      className="w-1 rounded-t-xs bg-emerald-400 animate-graphic-bar"
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-base font-bold text-[#101828] font-brand">
                MD ABDUR RAHMAN
              </h3>
              <p className="text-xs font-medium text-[#17469E] mt-0.5">
                {isEn
                  ? 'Digital Marketing & Web Solutions Specialist'
                  : 'ডিজিটাল মার্কেটিং ও ওয়েব সলিউশনস স্পেশালিস্ট'}
              </p>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200/70">
                <a
                  href={`tel:+${wa1Number}`}
                  className="font-mono tabular-nums text-sm sm:text-base font-bold text-[#101828] hover:text-[#17469E] hover:underline"
                >
                  +{wa1Number}
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(`+${wa1Number}`, 'rahman-phone')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors cursor-pointer"
                  title="Copy"
                >
                  {copiedItem === 'rahman-phone' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                WhatsApp &amp; Telegram: +{wa1Number}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200/70">
              <a
                href={wa1Url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isEn ? 'Contact on WhatsApp' : 'WhatsApp'}</span>
              </a>

              <a
                href={tg1Url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#229ED9] hover:bg-[#1a8bc1] rounded-lg transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>

              <a
                href={`tel:+${wa1Number}`}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              >
                <Phone className="w-3 h-3 text-[#17469E]" />
                <span>{isEn ? 'Call Directly' : 'সরাসরি কল করুন'}</span>
              </a>
            </div>
          </div>

          {/* Card 2: NAZMUL (Preserved Unchanged) */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 text-left group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#17469E] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {config.helpline2Label || 'হেল্পলাইন ২'} · Nazmul
                </span>
              </div>

              <h3 className="text-base font-bold text-[#101828] font-brand">Nazmul</h3>
              <p className="text-xs font-medium text-[#17469E] mt-0.5">
                Co-Founder, RANZ · YouTube Automation
              </p>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                <a
                  href={`tel:${config.helpline2}`}
                  className="font-mono tabular-nums text-base font-bold text-[#17469E] hover:underline"
                >
                  {config.helpline2}
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(config.helpline2, 'num2')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors cursor-pointer"
                  title="নম্বর কপি করুন"
                >
                  {copiedItem === 'num2' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                কল, হোয়াটসঅ্যাপ বা টেলিগ্রাম এ যুক্ত হন
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100">
              <a
                href={wa2Url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp এ মেসেজ</span>
              </a>

              <a
                href={tg2Url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#229ED9] hover:bg-[#1a8bc1] rounded-lg transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram এ মেসেজ</span>
              </a>

              <a
                href={`tel:${config.helpline2}`}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              >
                <Phone className="w-3 h-3 text-[#17469E]" />
                <span>সরাসরি কল করুন</span>
              </a>
            </div>
          </div>

          {/* Card 3: Email & Website */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 text-left">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#17469E] text-white flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#17469E]">Email &amp; Web</span>
                </div>
                <div className="flex items-center px-2 h-6 rounded-md bg-[#101828]" aria-hidden="true">
                  <svg viewBox="0 0 46 14" className="w-10 h-3">
                    <circle cx="5" cy="7" r="2.5" fill="#38BDF8" />
                    <line x1="9" y1="7" x2="37" y2="7" stroke="#60A5FA" strokeWidth="1.5" className="animate-dash-flow" />
                    <circle cx="41" cy="7" r="2.5" fill="#34D399" />
                  </svg>
                </div>
              </div>

              <h3 className="text-base font-bold text-[#101828] font-brand">
                {isEn ? 'Email & Website' : 'ইমেইল ও ওয়েবসাইট'}
              </h3>

              <div className="space-y-2.5 pt-3 mt-3 border-t border-slate-100">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${config.email}`}
                    className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#17469E] hover:underline truncate"
                  >
                    {config.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(config.email, 'email')}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors cursor-pointer shrink-0"
                    title="Copy"
                  >
                    {copiedItem === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Globe className="w-3.5 h-3.5 text-[#17469E] shrink-0" />
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-[#17469E] hover:underline truncate"
                  >
                    {websiteUrl}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href={`mailto:${config.email}`}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#17469E] hover:bg-[#123982] rounded-lg transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{isEn ? 'Email Me' : 'ইমেইল করুন'}</span>
              </a>
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#17469E]" />
                <span>{websiteUrl.replace(/^https?:\/\//, '')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
