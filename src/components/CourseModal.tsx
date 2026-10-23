import React, { useEffect } from 'react';
import { Course } from '../types';
import { X, ArrowRight } from 'lucide-react';

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
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* Mentor Tag if available */}
          {course.instructor && (
            <div className="flex items-center justify-between gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-left">
              <div className="flex items-center gap-2.5">
                <img
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="w-9 h-9 rounded-full object-cover border border-blue-200 shrink-0"
                  style={{ objectPosition: course.instructor.avatarPosition || 'center 35%' }}
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 font-brand">
                    Mentor: {course.instructor.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {course.instructor.title} · {course.instructor.phone}
                  </div>
                </div>
              </div>
              {course.totalClasses && (
                <div className="px-2.5 py-1 rounded bg-[#17469E] text-white text-xs font-semibold shrink-0">
                  {course.totalClasses}টি ক্লাস
                </div>
              )}
            </div>
          )}

          {/* Course Overview */}
          <div className="text-left text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {course.fullDesc || course.shortDesc}
          </div>

          {/* Class Topics List */}
          {course.topics && course.topics.length > 0 && (
            <div className="text-left space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                <span>ক্লাস কারিকুলাম ও টপিকসমূহ:</span>
                <span className="text-[#17469E] font-semibold">{course.topics.length}টি ক্লাস</span>
              </div>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {course.topics.map((topic, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 p-2 rounded-md bg-slate-50/80 hover:bg-blue-50/50 border border-slate-100 transition-colors text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#17469E] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-slate-800 font-medium leading-snug">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}


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
