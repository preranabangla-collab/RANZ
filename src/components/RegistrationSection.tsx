import React, { useState, useEffect } from 'react';
import { PROFESSION_OPTIONS, COURSES } from '../data/coursesData';
import { RegistrationFormData, RegistrationRecord } from '../types';
import { 
  submitRegistration, 
  isSupabaseConfigured, 
  getLocalRegistrations,
  exportRegistrationsToCSV,
  clearLocalRegistrations
} from '../services/registrationService';
import { 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  Download, 
  RefreshCw, 
  Trash2, 
  Sparkles,
  Phone,
  User,
  Briefcase,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface RegistrationSectionProps {
  selectedCourseId?: string;
  onOpenDeploymentGuide: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  selectedCourseId,
  onOpenDeploymentGuide
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    phone: '',
    profession: '',
    course: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    isLiveDatabase: boolean;
    message: string;
    record?: RegistrationRecord;
  } | null>(null);

  const [showAdminDrawer, setShowAdminDrawer] = useState(false);
  const [storedRecords, setStoredRecords] = useState<RegistrationRecord[]>([]);

  // Pre-select course when passed from hero or course modal
  useEffect(() => {
    if (selectedCourseId) {
      const match = COURSES.find((c) => c.id === selectedCourseId || c.nameEn === selectedCourseId);
      if (match) {
        setFormData((prev) => ({ ...prev, course: match.nameEn }));
      }
    }
  }, [selectedCourseId]);

  // Load local records for testing/admin visibility
  const refreshRecords = () => {
    setStoredRecords(getLocalRegistrations());
  };

  useEffect(() => {
    refreshRecords();
    const handleUpdate = () => refreshRecords();
    window.addEventListener('ranz:new-registration', handleUpdate);
    return () => window.removeEventListener('ranz:new-registration', handleUpdate);
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};

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

    if (!formData.course) {
      newErrors.course = 'কোর্স নির্বাচন করুন।';
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
          course: ''
        });
        setErrors({});
        refreshRecords();
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

  const hasSupabase = isSupabaseConfigured();

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
          
          {/* Status bar */}
          <div className="mb-5 pb-3 border-b border-slate-100 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${hasSupabase ? 'bg-emerald-500' : 'bg-amber-400'}`} />
              <span className="text-[11px] sm:text-xs text-slate-600 font-medium">
                {hasSupabase 
                  ? 'Supabase ডেটাবেস সক্রিয়' 
                  : 'লোকাল ডেমো মোড (সার্ভার সংযুক্ত নয়)'}
              </span>
            </div>
            
            <button
              type="button"
              onClick={onOpenDeploymentGuide}
              className="text-[#17469E] hover:underline font-semibold flex items-center gap-1 text-[11px] sm:text-xs cursor-pointer"
            >
              <Database className="w-3 h-3" />
              <span>সেটআপ গাইড</span>
            </button>
          </div>

          {/* Submission Success Alert */}
          {submissionResult && submissionResult.success && (
            <div className="mb-5 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-left space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ধন্যবাদ! রেজিস্ট্রেশন প্রক্রিয়া সফল হয়েছে।</span>
              </div>
              <p className="text-xs text-emerald-900/90 leading-relaxed">
                {submissionResult.message}
              </p>
              {!submissionResult.isLiveDatabase && (
                <div className="pt-1 text-[11px] text-amber-900 bg-amber-50/80 p-2.5 rounded border border-amber-200/60 leading-relaxed">
                  <strong className="font-semibold">স্বচ্ছতা বার্তা:</strong> বর্তমানে কোনো ক্লাউড ডেটাবেস (Supabase) কি দেওয়া নেই, তাই এটি আপনার ব্রাউজারে সুরক্ষিত রাখা হয়েছে।
                </div>
              )}
            </div>
          )}

          {/* Smart 2-Column Responsive Form */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              {/* Field 4: Course Selection */}
              <div>
                <label htmlFor="course" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  কোন কোর্স করতে চান? <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={(e) => {
                      setFormData({ ...formData, course: e.target.value });
                      if (errors.course) setErrors({ ...errors, course: undefined });
                    }}
                    className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border bg-white transition-colors outline-hidden focus:ring-2 cursor-pointer ${
                      errors.course
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-300 focus:border-[#17469E] focus:ring-blue-100'
                    }`}
                  >
                    <option value="">Select Course</option>
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.nameEn}>
                        {c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.course && (
                  <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.course}</span>
                  </p>
                )}
              </div>
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

          {/* Compact Lead Review Drawer */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>
              সংরক্ষিত আবেদন: <strong className="text-slate-800">{storedRecords.length}</strong> টি
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowAdminDrawer(!showAdminDrawer)}
                className="text-[#17469E] hover:underline font-semibold cursor-pointer"
              >
                {showAdminDrawer ? 'তালিকা লুকান' : 'আবেদনসমূহ দেখুন'}
              </button>
              {storedRecords.length > 0 && (
                <button
                  type="button"
                  onClick={() => exportRegistrationsToCSV(storedRecords)}
                  className="inline-flex items-center gap-1 text-slate-700 hover:text-[#17469E] font-medium cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>CSV</span>
                </button>
              )}
            </div>
          </div>

          {showAdminDrawer && (
            <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-left animate-in fade-in duration-150">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  সংগৃহীত আবেদন ({storedRecords.length})
                </span>
                {storedRecords.length > 0 && (
                  <button
                    onClick={clearLocalRegistrations}
                    className="text-[11px] text-red-600 hover:text-red-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>মুছুন</span>
                  </button>
                )}
              </div>

              {storedRecords.length === 0 ? (
                <p className="text-[11px] text-slate-500 py-2 text-center">
                  এখনো কোনো রেজিস্ট্রেশন জমা হয়নি।
                </p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {storedRecords.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-2.5 bg-white rounded-md border border-slate-200 text-xs flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-bold text-slate-800">{item.fullName}</div>
                        <div className="text-slate-500 font-mono text-[11px]">
                          {item.phone} · {item.profession}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#17469E]">
                          {item.course}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
