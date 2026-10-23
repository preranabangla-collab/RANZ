import React from 'react';
import { Course } from '../types';
import { ArrowRight, Info } from 'lucide-react';

interface CoursesSectionProps {
  courses: Course[];
  onSelectCourseForDetails: (course: Course) => void;
  onQuickRegister: (course: Course) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  courses,
  onSelectCourseForDetails,
}) => {
  return (
    <section id="courses" className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#EAF2FF] text-[#17469E] text-xs font-semibold mb-2">
            <span>RANZ কারিকুলাম</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#101828] tracking-tight">
            আমাদের কোর্সসমূহ
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
            আপনার পছন্দের দক্ষতা বেছে নিন এবং শেখা শুরু করুন।
          </p>
        </div>

        {/* 3 Course Cards Grid - All 3 shown side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {courses.map((course) => (
            <article
              key={course.id}
              className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm hover:border-blue-200 transition-all flex flex-col overflow-hidden group text-left"
            >
              {/* Course Thumbnail Image with Mentor */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={course.image}
                  alt={course.nameEn}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  style={{ objectPosition: course.imagePosition || 'center 40%' }}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#17469E] text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs border border-blue-100 uppercase tracking-wide">
                  {course.badge}
                </div>
                {course.totalClasses && (
                  <div className="absolute top-2.5 right-2.5 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    {course.totalClasses}টি ক্লাস
                  </div>
                )}
              </div>

              {/* Course Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-medium text-slate-400">
                      Skill Course
                    </span>
                    {course.totalClasses && (
                      <span className="text-[11px] font-semibold text-[#17469E]">
                        মোট {course.totalClasses}টি ক্লাস
                      </span>
                    )}
                  </div>

                  {/* Course Name in English */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#17469E] transition-colors leading-snug font-brand">
                    {course.nameEn}
                  </h3>

                  {/* Mentor Info Row in English */}
                  {course.instructor && (
                    <div className="flex items-center gap-2 py-1.5 px-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <img
                        src={course.instructor.image}
                        alt={course.instructor.name}
                        className="w-7 h-7 rounded-full object-cover border border-blue-200 shrink-0"
                        style={{ objectPosition: course.instructor.avatarPosition || 'center 43%' }}
                      />
                      <div className="text-left leading-tight">
                        <div className="text-xs font-bold text-slate-800 font-brand">
                          Mentor: {course.instructor.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {course.instructor.title}
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed font-normal pt-0.5">
                    {course.shortDesc}
                  </p>
                </div>

                {/* Footer Action of Card */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onSelectCourseForDetails(course)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-[#17469E] bg-[#EAF2FF] hover:bg-[#d6e6ff] active:bg-[#c2daff] rounded-lg transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>কোর্স সম্পর্কে জানুন</span>
                    <ArrowRight className="w-3 h-3 opacity-70" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Informative Note */}
        <div className="mt-8 max-w-lg mx-auto p-3 rounded-lg bg-white border border-slate-200 text-center shadow-2xs">
          <p className="text-xs text-slate-600 leading-relaxed">
            💡 <span className="font-semibold text-slate-800">পরামর্শ:</span> প্রতিটি কোর্সের বিশদ পাঠ্যসূচি চূড়ান্ত হলে নিবন্ধিত শিক্ষার্থীদের সবার আগে জানিয়ে দেওয়া হবে।
          </p>
        </div>

      </div>
    </section>
  );
};
