import React from 'react';
import { Course } from '../types';
import { ArrowRight, Info } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface CoursesSectionProps {
  courses: Course[];
  onSelectCourseForDetails: (course: Course) => void;
  onQuickRegister: (course: Course) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  courses,
  onSelectCourseForDetails,
}) => {
  const { language } = useSiteConfig();
  const isEn = language === 'en';

  return (
    <section
      id="courses"
      className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-200/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-semibold text-[#17469E] tracking-wide uppercase mb-1.5">
            {isEn ? 'RANZ Curriculum · Training' : 'RANZ কারিকুলাম'}
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#101828] tracking-tight">
            {isEn ? 'Featured Training Course' : 'আমাদের কোর্স'}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
            {isEn
              ? 'Practical step-by-step training led by Nazmul.'
              : 'আপনার পছন্দের দক্ষতা বেছে নিন এবং শেখা শুরু করুন।'}
          </p>
        </div>

        {/* Course Cards Grid - Centered nicely for Nazmul's course */}
        <div
          className={
            courses.length === 1
              ? 'max-w-3xl mx-auto'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6'
          }
        >
          {courses.map((course) => (
            <article
              key={course.id}
              className={`bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-sm hover:border-blue-200 transition-all overflow-hidden group text-left ${
                courses.length === 1
                  ? 'grid grid-cols-1 md:grid-cols-12 items-stretch'
                  : 'flex flex-col'
              }`}
            >
              {/* Course Thumbnail Image with Mentor */}
              <div
                className={`relative overflow-hidden bg-slate-100 ${
                  courses.length === 1
                    ? 'md:col-span-5 aspect-[16/10] md:aspect-auto md:h-full'
                    : 'aspect-[16/10] w-full'
                }`}
              >
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
                    {isEn ? `${course.totalClasses} Classes` : `${course.totalClasses}টি ক্লাস`}
                  </div>
                )}
              </div>

              {/* Course Card Body */}
              <div
                className={`p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 ${
                  courses.length === 1 ? 'md:col-span-7' : ''
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono font-medium">Skill Course</span>
                    {course.totalClasses && (
                      <span className="font-semibold text-[#17469E]">
                        {isEn
                          ? `Total ${course.totalClasses} Classes`
                          : `মোট ${course.totalClasses}টি ক্লাস`}
                      </span>
                    )}
                  </div>

                  {/* Course Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#17469E] transition-colors leading-snug font-brand">
                    {course.nameEn}
                  </h3>

                  {/* Mentor Info Row (Nazmul Preserved) */}
                  {course.instructor && (
                    <div className="flex items-center gap-2.5 py-2 px-3 bg-slate-50 rounded-lg border border-slate-100">
                      <img
                        src={course.instructor.image}
                        alt={course.instructor.name}
                        className="w-8 h-8 rounded-full object-cover border border-blue-200 shrink-0"
                        style={{
                          objectPosition: course.instructor.avatarPosition || 'center 43%',
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left leading-tight">
                        <div className="text-xs font-bold text-slate-800 font-brand">
                          Mentor: {course.instructor.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {course.instructor.title}
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-0.5">
                    {course.shortDesc}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectCourseForDetails(course)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#17469E] bg-[#EAF2FF] hover:bg-[#d6e6ff] active:bg-[#c2daff] rounded-lg transition-colors cursor-pointer"
                  >
                    <Info className="w-4 h-4" />
                    <span>{isEn ? 'View Course Curriculum' : 'কোর্স সম্পর্কে জানুন'}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
