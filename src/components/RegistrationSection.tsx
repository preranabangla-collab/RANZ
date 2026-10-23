import React, { useState, useEffect } from 'react';
import { PROFESSION_OPTIONS, COURSES } from '../data/coursesData';
import { RegistrationFormData, RegistrationRecord } from '../types';
import { submitRegistration } from '../services/registrationService';
import { 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Sparkles,
  Phone,
  User,
  Briefcase,
  BookOpen,
  ArrowRight,
  Check
} from 'lucide-react';

interface RegistrationSectionProps {
  selectedCourseId?: string;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  selectedCourseId,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    phone: '',
    profession: '',
    courses: [],
    course: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData | 'courses', string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    isLiveDatabase: boolean;
    message: string;
    record?: RegistrationRecord;
  } | null>(null);

  // Pre-select course when passed from hero or course modal
  useEffect(() => {
    if (selectedCourseId) {
      const match = COURSES.find(
        (c) => c.id === selectedCourseId || c.nameEn === selectedCourseId || c.nameBn === selectedCourseId
      );
      if (match) {
        setFormData((prev) => {
          const courseIdentifier = match.nameBn;
          if (!prev.courses.includes(courseIdentifier)) {
            const updated = [...prev.courses, courseIdentifier];
            return {
              ...prev,
              courses: updated,
              course: updated.join(', ')
            };
          }
          return prev;
        });
      }
    }
  }, [selectedCourseId]);

  const toggleCourse = (courseTitle: string) => {
    setFormData((prev) => {
      const exists = prev.courses.includes(courseTitle);
      const updated = exists
        ? prev.courses.filter((c) => c !== courseTitle)
        : [...prev.courses, courseTitle];
      return {
        ...prev,
        courses: updated,
        course: updated.join(', ')
      };
    });
    if (errors.courses) {
      setErrors((prev) => ({ ...prev, courses: undefined }));
    }
  };

  const handleSelectAllCourses = () => {
    if (formData.courses.length === COURSES.length) {
      // Unselect all
      setFormData((prev) => ({ ...prev, courses: [], course: '' }));
    } else {
      // Select all 3
      const allCourses = COURSES.map((c) => c.nameBn);
      setFormData((prev) => ({
        ...prev,
        courses: allCourses,
        course: allCourses.join(', ')
      }));
      if (errors.courses) {
        setErrors((prev) => ({ ...prev, courses: undefined }));
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationFormData | 'courses', string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'আপনার পূর্ণ নাম লিখুন।';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'নাম কমপক্ষে ২ অক্ষরের হতে হবে।';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'আপনার মোবাইল নম্বর দিন।';
    } else if (!/^(\+?8801|01)[3-9]\d{8}$/.test(cleanPhone)) {
      newErrors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01883423076)।';
    }

    if (!formData.profession) {
      newErrors.profession = 'পেশা নির্বাচন করুন।';
    }

    if (!formData.courses || formData.courses.length === 0) {
      newErrors.courses = 'কমপক্ষে একটি কোর্স নির্বাচন করুন।';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const result = await submitRegistration(formData);
      setSubmissionResult(result);
      if (result.success) {
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          profession: '',
          courses: [],
          course: ''
        });
        setErrors({});
      }
    } catch (err: any) {
      setSubmissionResult({
        success: false,
        isLiveDatabase: false,
        message: 'রেজিস্ট্রেশন জমাদানে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration" className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Compact & Smart Heading */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#EAF2FF] text-[#17469E] text-xs font-semibold mb-2">
            <Sparkles className="w-3 h-3 text-[#F59E0B]" />
            <span>অগ্রিম আসন নিবন্ধন</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#101828] tracking-tight">
            কোর্সে আগ্রহী? রেজিস্ট্রেশন করুন
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
            আপনার তথ্য দিয়ে ফর্মটি পূরণ করুন। আমাদের টিম আপনার সঙ্গে যোগাযোগ করবে।
          </p>
        </div>

        {/* Compact Smart Form Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-7 relative">
          
          {/* Submission Success Alert */}
          {submissionResult && submissionResult.success && (
            <div className="mb-5 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-left space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ধন্যবাদ! আপনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে।</span>
              </div>
              {submissionResult.record?.course && (
                <div className="text-xs text-emerald-950 font-semibold bg-white/80 p-2 rounded border border-emerald-200">
                  <span className="text-emerald-700">নির্বাচিত কোর্স:</span> {submissionResult.record.course}
                </div>
              )}
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন এবং কোর্সের সকল আপডেট জানিয়ে দেবেন।
              </p>
            </div>
          )}

          {/* Smart Responsive Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 1: Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  পূর্ণ নাম <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder="আপনার নাম (যেমন: আব্দুর রহমান)"
                    className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border transition-colors outline-hidden focus:ring-2 ${
                      errors.fullName
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-300 focus:border-[#17469E] focus:ring-blue-100'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Field 2: Mobile Number */}
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="যেমন: 01883423076"
                    className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border transition-colors outline-hidden focus:ring-2 ${
                      errors.phone
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-300 focus:border-[#17469E] focus:ring-blue-100'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Field 3: Profession */}
            <div>
              <label htmlFor="profession" className="block text-xs font-semibold text-slate-700 mb-1.5">
                আপনার পেশা <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <select
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={(e) => {
                    setFormData({ ...formData, profession: e.target.value as any });
                    if (errors.profession) setErrors({ ...errors, profession: undefined });
                  }}
                  className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border bg-white transition-colors outline-hidden focus:ring-2 cursor-pointer ${
                    errors.profession
                      ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-100'
                      : 'border-slate-300 focus:border-[#17469E] focus:ring-blue-100'
                  }`}
                >
                  <option value="">পেশা নির্বাচন করুন</option>
                  {PROFESSION_OPTIONS.map((prof) => (
                    <option key={prof} value={prof}>
                      {prof}
                    </option>
                  ))}
                </select>
              </div>
              {errors.profession && (
                <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.profession}</span>
                </p>
              )}
            </div>

            {/* Field 4: Multi-Course Selection Cards */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <label className="block text-xs font-semibold text-slate-700">
                  কোন কোন কোর্স করতে চান? <span className="text-red-500">*</span>
                  <span className="text-slate-400 font-normal ml-1.5">(একাধিক কোর্স সিলেক্ট করতে পারেন)</span>
                </label>
                <div className="flex items-center gap-2">
                  {formData.courses.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#17469E] text-[11px] font-bold border border-blue-200">
                      {formData.courses.length}টি নির্বাচিত
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleSelectAllCourses}
                    className="text-[11px] font-semibold text-[#17469E] hover:underline cursor-pointer"
                  >
                    {formData.courses.length === COURSES.length ? 'সব মুছুন' : 'সবগুলো নির্বাচন করুন'}
                  </button>
                </div>
              </div>

              {/* Course Selection Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {COURSES.map((course) => {
                  const isSelected = formData.courses.includes(course.nameBn);
                  return (
                    <div
                      key={course.id}
                      onClick={() => toggleCourse(course.nameBn)}
                      className={`relative p-3 rounded-xl border text-left cursor-pointer transition-all duration-150 select-none ${
                        isSelected
                          ? 'border-[#17469E] bg-[#EAF2FF]/60 shadow-xs ring-1 ring-[#17469E]'
                          : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-100/50'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                            isSelected
                              ? 'bg-[#17469E] border-[#17469E] text-white'
                              : 'bg-white border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-900 leading-tight">
                            {course.nameBn}
                          </div>
                          <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                            {course.totalClasses && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-200 text-[#17469E]">
                                {course.totalClasses}টি ক্লাস
                              </span>
                            )}
                            {course.instructor && (
                              <span className="text-[10px] text-slate-500 truncate">
                                {course.instructor.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {errors.courses && (
                <p className="mt-1.5 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.courses}</span>
                </p>
              )}
            </div>

            {/* Smart Compact Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 text-sm font-semibold text-white bg-[#17469E] hover:bg-[#13377d] active:bg-[#0f2c66] rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>যাচাই করা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <span>রেজিস্ট্রেশন সম্পন্ন করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-500">
              🔒 আপনার মোবাইল নম্বর ও তথ্যের গোপনীয়তা রক্ষা করা হবে।
            </p>
          </form>

        </div>

      </div>
    </section>
  );
};
