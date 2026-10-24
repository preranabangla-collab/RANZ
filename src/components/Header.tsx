import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

// High-res embedded RANZ official logo (WebP Base64) - Works everywhere without external file dependency
const RANZ_OFFICIAL_LOGO = "data:image/webp;base64,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";

interface HeaderProps {
  onRegisterClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterClick }) => {
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
            <img
              src={RANZ_OFFICIAL_LOGO}
              alt="RANZ Digital Skills"
              className="h-10 w-10 sm:h-11 sm:w-11 object-contain rounded-xl border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform bg-white"
            />
            <div className="flex flex-col">
              <span className="font-brand font-extrabold text-lg sm:text-xl tracking-tight text-[#101828] leading-none">
                RANZ
              </span>
              <span className="text-[9px] text-[#17469E] font-bold tracking-wider uppercase mt-0.5">
                Digital Skills
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
  );
};
