import React, { useState, useEffect, useRef } from 'react';
import { Course } from '../types';
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  UserPlus, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  Pause,
  Play
} from 'lucide-react';

interface HeroSectionProps {
  courses: Course[];
  onExploreCourses: () => void;
  onRegisterClick: () => void;
  onSelectCourseForDetails: (course: Course) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  courses,
  onExploreCourses,
  onRegisterClick,
  onSelectCourseForDetails,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatically cycle through courses on repeat every 3.5 seconds
  useEffect(() => {
    if (!isAutoPlaying || courses.length === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % courses.length);
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, courses.length]);

  const activeCourse = courses[activeIdx] || courses[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % courses.length);
  };

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-white bg-tech-grid border-b border-slate-100">
      {/* Soft ambient lighting gradient behind content */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-0 -mr-40 -mt-20 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 left-0 -ml-40 -mb-20 w-80 h-80 rounded-full bg-amber-50/40 blur-3xl pointer-events-none" 
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline and Value Proposition */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Tagline / Micro-kicker */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EAF2FF] border border-blue-200/60 text-[#17469E] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="font-brand font-bold">RANZ</span>
              <span>·</span>
              <span>Learn Skills. Build Your Future.</span>
            </div>

            {/* Main Headline - Smart & Crisp */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#101828] leading-[1.25] tracking-tight text-balance">
              ডিজিটাল দক্ষতা শিখুন, <br className="hidden sm:inline" />
              <span className="text-[#17469E]">নিজের ভবিষ্যৎ গড়ুন</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl text-pretty font-normal">
              RANZ-এর সঙ্গে শিখুন ডিজিটাল মার্কেটিং, YouTube Automation এবং AI দিয়ে ওয়েবসাইট তৈরি। নিজের দক্ষতা বাড়ানোর যাত্রা শুরু করুন আজই।
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onExploreCourses}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#17469E] hover:bg-[#13377d] active:bg-[#0f2c66] rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                <span>কোর্স দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onRegisterClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#17469E] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs hover:border-[#17469E] transition-all cursor-pointer whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4 text-[#17469E]" />
                <span>রেজিস্ট্রেশন করুন</span>
              </button>
            </div>

            {/* Clean Value Signals */}
            <div className="pt-3 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#17469E] shrink-0" />
                <span>বাস্তবমুখী ডিজিটাল স্কিল</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#17469E] shrink-0" />
                <span>সম্পূর্ণ বাংলায় দিকনির্দেশনা</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#17469E] shrink-0" />
                <span>ভবিষ্যতমুখী ক্যারিয়ার গাইড</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase with AUTO-REPEATING COURSES */}
          <div className="lg:col-span-5 relative">
            <div 
              className="relative mx-auto max-w-sm lg:max-w-none group"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              
              {/* Main Course Showcase Card that rotates automatically */}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md shadow-slate-200/50 relative">
                
                {/* Course Image with Mentor & Badge */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                  <img
                    key={activeCourse.id}
                    src={activeCourse.image}
                    alt={activeCourse.nameEn}
                    className="w-full h-full object-cover transition-all duration-500 animate-in fade-in zoom-in-95"
                    style={{ objectPosition: activeCourse.imagePosition || 'center 40%' }}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Top Pill: Category Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#17469E] text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs border border-blue-100 uppercase tracking-wide">
                    {activeCourse.badge}
                  </div>

                  {/* Top Right: Auto Slide Indicator */}
                  <div className="absolute top-2.5 right-2.5 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{activeIdx + 1}/{courses.length}</span>
                  </div>

                  {/* Manual Arrow Controls */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-slate-700 hover:text-[#17469E] hover:bg-white flex items-center justify-center shadow-xs transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                    title="পূর্ববর্তী কোর্স"
                    aria-label="Previous Course"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-slate-700 hover:text-[#17469E] hover:bg-white flex items-center justify-center shadow-xs transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                    title="পরবর্তী কোর্স"
                    aria-label="Next Course"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Bar Info Overlay on Image */}
                <div className="p-3 bg-white/95 backdrop-blur-xs border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-left truncate">
                    {activeCourse.instructor && (
                      <img
                        src={activeCourse.instructor.image}
                        alt={activeCourse.instructor.name}
                        className="w-7 h-7 rounded-full object-cover border border-blue-200 shrink-0"
                        style={{ objectPosition: activeCourse.instructor.avatarPosition || 'center 35%' }}
                      />
                    )}
                    <div className="truncate">
                      <div className="text-xs font-bold text-[#101828] font-brand truncate">
                        {activeCourse.nameEn}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        Mentor: {activeCourse.instructor?.name}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectCourseForDetails(activeCourse)}
                    className="text-[11px] font-semibold text-[#17469E] bg-[#EAF2FF] hover:bg-blue-100 px-2 py-1 rounded transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3 h-3" />
                    <span>বিস্তারিত</span>
                  </button>
                </div>
              </div>

              {/* DYNAMIC FLOATING ACCENT CARD: Automatically changes along with the course */}
              <div 
                onClick={() => onSelectCourseForDetails(activeCourse)}
                className="cursor-pointer hidden sm:flex absolute -bottom-4 -left-4 bg-white border border-slate-200 rounded-xl p-2.5 shadow-lg shadow-slate-200/80 max-w-[240px] items-center gap-2.5 hover:border-blue-300 transition-all transform hover:-translate-y-0.5"
              >
                <div className="w-8 h-8 rounded-lg bg-[#17469E] text-white flex items-center justify-center font-bold text-xs shrink-0 font-brand">
                  {activeCourse.nameEn.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-left truncate">
                  <div className="text-[11px] font-bold text-slate-900 leading-tight font-brand truncate">
                    {activeCourse.nameEn}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
                    ● অটোমেটিক রোটেটিং
                  </div>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {courses.map((course, idx) => (
                  <button
                    key={course.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeIdx === idx
                        ? 'w-5 bg-[#17469E]'
                        : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to course ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
