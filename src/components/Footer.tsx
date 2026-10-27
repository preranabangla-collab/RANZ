import React, { useState } from 'react';
import { Phone, Mail, ArrowUp, MessageSquare, Send, Sliders } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface FooterProps {
  onRegisterClick: () => void;
}

// Resilient Logo Component: Displays config.logoUrl, and cleanly falls back to vector SVG if needed
const FooterLogo: React.FC = () => {
  const { config } = useSiteConfig();
  const [hasError, setHasError] = useState(false);

  if (hasError || !config.logoUrl) {
    return (
      <div className="h-12 w-12 rounded-xl bg-white p-1 border border-slate-700 shadow-sm flex items-center justify-center shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="ranzFooterGrad" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#0052FF" />
              <stop offset="50%" stopColor="#0070F3" />
              <stop offset="100%" stopColor="#00C0FF" />
            </linearGradient>
            <linearGradient id="ranzFooterDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B2366" />
              <stop offset="70%" stopColor="#0052FF" />
            </linearGradient>
          </defs>
          <g>
            <path
              d="M26 22C26 18.5 28.5 16 32 16H58C73 16 82 24 82 37C82 48 74 55 62 57L80 82C81.5 84 80.5 87 77.5 87H63C60.5 87 58.5 85.5 57 83.5L42 61H39V83.5C39 85.5 37.5 87 35 87H29C27 87 26 85.5 26 83.5V22Z"
              fill="url(#ranzFooterGrad)"
            />
            <path
              d="M26 40C26 26 31 16 46 16H32C28.5 16 26 18.5 26 22V75C26 80 29 84 34 86C29 83 26 77 26 70V40Z"
              fill="url(#ranzFooterDark)"
            />
            <path
              d="M44 32.5C44 30.5 46.2 29.2 48 30.2L62.5 38.2C64.2 39.1 64.2 41.5 62.5 42.5L48 50.5C46.2 51.5 44 50.2 44 48.2V32.5Z"
              fill="#FFFFFF"
            />
            <path
              d="M48 35.5L57 40.5L48 45.5V35.5Z"
              fill="#0B2366"
            />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={config.logoUrl}
      alt={`${config.brandName} ${config.brandSubtitle}`}
      onError={() => setHasError(true)}
      className="h-12 w-12 rounded-xl object-contain bg-white p-1 border border-slate-700 shadow-sm shrink-0"
    />
  );
};

export const Footer: React.FC<FooterProps> = ({
  onRegisterClick,
}) => {
  const { config, setIsAdminOpen } = useSiteConfig();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const wa1Url = config.helpline1Whatsapp.startsWith('http')
    ? config.helpline1Whatsapp
    : `https://wa.me/${config.helpline1Whatsapp.replace(/[^0-9]/g, '')}`;

  const tg1Url = config.helpline1Telegram.startsWith('http')
    ? config.helpline1Telegram
    : `https://t.me/${config.helpline1Telegram.startsWith('+') ? config.helpline1Telegram : `+${config.helpline1Telegram}`}`;

  const wa2Url = config.helpline2Whatsapp.startsWith('http')
    ? config.helpline2Whatsapp
    : `https://wa.me/${config.helpline2Whatsapp.replace(/[^0-9]/g, '')}`;

  const tg2Url = config.helpline2Telegram.startsWith('http')
    ? config.helpline2Telegram
    : `https://t.me/${config.helpline2Telegram.startsWith('+') ? config.helpline2Telegram : `+${config.helpline2Telegram}`}`;

  return (
    <footer className="bg-[#101828] text-white pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-3 text-left">
            <div className="flex items-center gap-3">
              <FooterLogo />
              <div className="flex flex-col">
                <span className="font-brand font-extrabold text-xl sm:text-2xl tracking-tight text-white leading-none">
                  {config.brandName}
                </span>
                <span className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase mt-1">
                  {config.brandSubtitle}
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              {config.aboutText}
            </p>

            <div className="pt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <span className="font-brand text-slate-300 font-semibold">Tagline:</span>
              <span>{config.tagline}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-2.5 text-left">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              ন্যাভিগেশন
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, '#home')}
                  className="hover:text-blue-400 transition-colors"
                >
                  হোম
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  onClick={(e) => handleNavClick(e, '#courses')}
                  className="hover:text-blue-400 transition-colors"
                >
                  কোর্সসমূহ
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-blue-400 transition-colors"
                >
                  আমাদের সম্পর্কে
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="hover:text-blue-400 transition-colors"
                >
                  যোগাযোগ
                </a>
              </li>
              <li>
                <button
                  onClick={onRegisterClick}
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium cursor-pointer"
                >
                  রেজিস্ট্রেশন
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info with WhatsApp & Telegram for BOTH numbers */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              যোগাযোগ ও সহায়তা
            </h4>
            
            <div className="space-y-2 text-xs text-slate-300">
              {/* Number 1 */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <a href={`tel:${config.helpline1}`} className="font-mono font-bold text-white hover:text-blue-400">
                    {config.helpline1}
                  </a>
                  <span className="text-[10px] text-slate-500">{config.helpline1Label}</span>
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href={wa1Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                  <span className="text-slate-700">·</span>
                  <a
                    href={tg1Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#229ED9] hover:text-sky-300"
                  >
                    <Send className="w-3 h-3" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>

              {/* Number 2 */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <a href={`tel:${config.helpline2}`} className="font-mono font-bold text-white hover:text-blue-400">
                    {config.helpline2}
                  </a>
                  <span className="text-[10px] text-slate-500">{config.helpline2Label}</span>
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href={wa2Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                  <span className="text-slate-700">·</span>
                  <a
                    href={tg2Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#229ED9] hover:text-sky-300"
                  >
                    <Send className="w-3 h-3" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-1.5 pt-1">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`mailto:${config.email}`} className="text-xs hover:text-white transition-colors truncate">
                  {config.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Back to Top & Admin Panel Button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {config.brandName} — সর্বস্বত্ব সংরক্ষিত।</p>

          <div className="flex items-center gap-3">
            {/* Admin Panel Button at the very bottom (Password Protected) */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer text-xs font-medium"
              title="ওয়েবসাইটের লোগো ও তথ্য এডিট করুন (পাসওয়ার্ড: Rahman9082##)"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span>অ্যাডমিন প্যানেল 🔒</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
            >
              <span>উপরে যান</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
