import React, { useEffect } from 'react';
import { Course } from '../types';
import { X, ArrowRight, Clock, AlertCircle } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onProceedToRegister: (course: Course) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onProceedToRegister,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (course) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [course, onClose]);

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden transform animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 text-slate-500 hover:text-slate-800 bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer shadow-2xs"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Media */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          <img
            src={course.image}
            alt={course.nameBn}
            className="w-full h-full object-cover"
            style={{ objectPosition: course.imagePosition || 'center 40%' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex items-end p-4 sm:p-5">
            <div>
              <span className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider">
                {course.nameEn}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 leading-snug">
                {course.nameBn}
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-3.5">
          
          {/* Mentor Tag if available */}
          {course.instructor && (
            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100 text-left">
              <img
                src={course.instructor.image}
                alt={course.instructor.name}
                className="w-8 h-8 rounded-full object-cover border border-blue-200 shrink-0"
                style={{ objectPosition: course.instructor.avatarPosition || 'center 35%' }}
              />
              <div>
                <div className="text-xs font-bold text-slate-900 font-brand">
                  Mentor: {course.instructor.name}
                </div>
                <div className="text-[10px] text-slate-500">
                  {course.instructor.title} · Phone: {course.instructor.phone}
                </div>
              </div>
            </div>
          )}

          <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-100/90 text-left space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#17469E]">
              <Clock className="w-3.5 h-3.5 shrink-0 text-[#17469E]" />
              <span>শীঘ্রই প্রকাশ করা হবে</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              এই কোর্সের বিস্তারিত তথ্য শিগগিরই প্রকাশ করা হবে। আগ্রহী হলে নিচের ফর্ম পূরণ করে রেজিস্ট্রেশন করুন।
            </p>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed text-left flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              রেজিস্ট্রেশন সম্পন্নকারীদের জন্য থাকবে কোর্সের আনুষ্ঠানিক আপডেট এবং বিশেষ অগ্রাধিকার।
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-center"
            >
              ফিরে যান
            </button>
            <button
              onClick={() => onProceedToRegister(course)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#17469E] hover:bg-[#13377d] active:bg-[#0f2c66] rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <span>রেজিস্ট্রেশন করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
