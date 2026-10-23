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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto transform animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-1.5 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer shadow-md backdrop-blur-xs"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Media (Fixed at top) */}
        <div className="shrink-0 relative h-40 sm:h-44 w-full overflow-hidden bg-slate-900">
          <img
            src={course.image}
            alt={course.nameBn}
            className="w-full h-full object-cover"
            style={{ objectPosition: course.imagePosition || 'center 28%' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-4 sm:p-5">
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

        {/* Modal Body - Single Unified Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain">
          
          {/* Mentor Tag if available */}
          {course.instructor && (
            <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-left">
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 shrink-0 shadow-2xs"
                  style={{ objectPosition: course.instructor.avatarPosition || 'center 28%' }}
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 font-brand">
                    Mentor: {course.instructor.name}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {course.instructor.title} · {course.instructor.phone}
                  </div>
                </div>
              </div>
              {course.totalClasses && (
                <div className="px-3 py-1 rounded-full bg-[#17469E] text-white text-xs font-semibold shrink-0 shadow-2xs">
                  {course.totalClasses}টি ক্লাস
                </div>
              )}
            </div>
          )}

          {/* Course Overview */}
          <div className="text-left text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-blue-50/40 p-3.5 rounded-xl border border-blue-100/60">
            {course.fullDesc || course.shortDesc}
          </div>

          {/* Class Topics List */}
          {course.topics && course.topics.length > 0 && (
            <div className="text-left space-y-2.5">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 border-b border-slate-200/80 pb-2">
                <span>ক্লাস কারিকুলাম ও টপিকসমূহ:</span>
                <span className="text-[#17469E] font-bold bg-blue-50 px-2 py-0.5 rounded text-xs">{course.topics.length}টি ক্লাস</span>
              </div>
              <div className="space-y-1.5">
                {course.topics.map((topic, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50/90 hover:bg-blue-50/60 border border-slate-100 transition-colors text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#17469E] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      {index + 1}
                    </span>
                    <span className="text-slate-800 font-medium leading-snug pt-0.5">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Fixed Action Footer */}
        <div className="shrink-0 p-3.5 sm:p-4 bg-slate-50/90 border-t border-slate-200 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer text-center"
          >
            ফিরে যান
          </button>
          <button
            onClick={() => onProceedToRegister(course)}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#17469E] hover:bg-[#13377d] active:bg-[#0f2c66] rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>রেজিস্ট্রেশন করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
