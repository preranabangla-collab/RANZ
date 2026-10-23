import React from 'react';
import { Phone, Mail, ArrowUp, MessageSquare, Send } from 'lucide-react';

interface FooterProps {
  onRegisterClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onRegisterClick,
}) => {
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

  return (
    <footer className="bg-[#101828] text-white pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-3 text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#17469E] flex items-center justify-center text-white font-brand font-bold text-base">
                R
              </div>
              <span className="font-brand font-extrabold text-xl tracking-tight text-white">
                RANZ
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              ডিজিটাল দক্ষতা শিখুন, নিজের ভবিষ্যৎ গড়ুন। আধুনিক যুগে Ads Campaign, YouTube Automation এবং AI দিয়ে ওয়েবসাইট তৈরির নির্ভরযোগ্য প্ল্যাটফর্ম।
            </p>

            <div className="pt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <span className="font-brand text-slate-300 font-semibold">Tagline:</span>
              <span>Learn Skills. Build Your Future.</span>
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
                  <a href="tel:01883423076" className="font-mono font-bold text-white hover:text-blue-400">
                    01883423076
                  </a>
                  <span className="text-[10px] text-slate-500">হেল্পলাইন ১</span>
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href="https://wa.me/8801883423076"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                  <span className="text-slate-700">·</span>
                  <a
                    href="https://t.me/+8801883423076"
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
                  <a href="tel:01862877500" className="font-mono font-bold text-white hover:text-blue-400">
                    01862877500
                  </a>
                  <span className="text-[10px] text-slate-500">হেল্পলাইন ২</span>
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href="https://wa.me/8801862877500"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                  <span className="text-slate-700">·</span>
                  <a
                    href="https://t.me/+8801862877500"
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
                <a href="mailto:hmabdurrahman9082@gmail.com" className="text-xs hover:text-white transition-colors truncate">
                  hmabdurrahman9082@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© RANZ — সর্বস্বত্ব সংরক্ষিত।</p>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <span>উপরে যান</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
