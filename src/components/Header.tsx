import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

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
    src="/assets/aistudio/image_833c97c0.png"
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
          
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-decoration-none group whitespace-nowrap shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-[#17469E] flex items-center justify-center text-white font-brand font-bold text-lg shadow-sm group-hover:bg-[#12367b] transition-colors">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-brand font-extrabold text-lg sm:text-xl tracking-tight text-[#101828] leading-none">
                RANZ
              </span>
              <span className="text-[9px] text-slate-500 font-medium tracking-wide">
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
