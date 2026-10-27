import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface HeaderProps {
  onRegisterClick: () => void;
}

// Resilient Logo Component: Displays config.logoUrl (defaults to base64 embedded official logo), cleanly falls back to vector SVG if needed
const HeaderLogo: React.FC = () => {
  const { config } = useSiteConfig();
  const [hasError, setHasError] = useState(false);

  // If the image fails or no URL is set, render crisp vector SVG
  if (hasError || !config.logoUrl) {
    return (
      <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border border-slate-200 shadow-2xs bg-white flex items-center justify-center p-1 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="ranzHeaderGrad" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#0052FF" />
              <stop offset="50%" stopColor="#0070F3" />
              <stop offset="100%" stopColor="#00C0FF" />
            </linearGradient>
            <linearGradient id="ranzHeaderDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B2366" />
              <stop offset="70%" stopColor="#0052FF" />
            </linearGradient>
          </defs>
          <g>
            <path
              d="M26 22C26 18.5 28.5 16 32 16H58C73 16 82 24 82 37C82 48 74 55 62 57L80 82C81.5 84 80.5 87 77.5 87H63C60.5 87 58.5 85.5 57 83.5L42 61H39V83.5C39 85.5 37.5 87 35 87H29C27 87 26 85.5 26 83.5V22Z"
              fill="url(#ranzHeaderGrad)"
            />
            <path
              d="M26 40C26 26 31 16 46 16H32C28.5 16 26 18.5 26 22V75C26 80 29 84 34 86C29 83 26 77 26 70V40Z"
              fill="url(#ranzHeaderDark)"
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
      className="h-10 w-10 sm:h-11 sm:w-11 object-contain rounded-xl border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform bg-white shrink-0"
    />
  );
};

export const Header: React.FC<HeaderProps> = ({ onRegisterClick }) => {
  const { config } = useSiteConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'হোম', href: '#home' },
    { label: 'কোর্সসমূহ', href: '#courses' },
    { label: 'আমাদের সম্পর্কে', href: '#about' },
    { label: 'যোগাযোগ', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {config.announcement && (
        <div className="bg-[#17469E] text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide">
          {config.announcement}
        </div>
      )}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
            : 'bg-white/80 backdrop-blur-xs border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            
            {/* Zone 1: Brand Wordmark with Official Logo */}
            <a
              href="#home"
              className="flex items-center gap-3 text-decoration-none group whitespace-nowrap shrink-0"
            >
              <HeaderLogo />
              <div className="flex flex-col">
                <span className="font-brand font-extrabold text-lg sm:text-xl tracking-tight text-[#101828] leading-none">
                  {config.brandName}
                </span>
                <span className="text-[9px] text-[#17469E] font-bold tracking-wider uppercase mt-0.5">
                  {config.brandSubtitle}
                </span>
              </div>
            </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#17469E] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#17469E] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onRegisterClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-[#17469E] hover:bg-[#13377d] active:bg-[#0f2c66] rounded-lg shadow-2xs hover:shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>রেজিস্ট্রেশন</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-[#17469E] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 rounded-md text-base font-medium text-slate-700 hover:text-[#17469E] hover:bg-blue-50/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRegisterClick();
                }}
                className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#17469E] hover:bg-[#13377d] rounded-lg transition-colors cursor-pointer"
              >
                রেজিস্ট্রেশন করুন
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
    </>
  );
};

