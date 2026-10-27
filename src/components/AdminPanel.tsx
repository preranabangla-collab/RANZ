import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Phone,
  Mail,
  RotateCcw,
  Save,
  CheckCircle2,
  FileText,
  Layers,
  Download,
  AlertCircle,
  ExternalLink,
  Sliders,
  Sparkles,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useSiteConfig, DEFAULT_SITE_CONFIG } from '../context/SiteConfigContext';
import { DEFAULT_RANZ_LOGO_BASE64 } from '../data/defaultLogo';

const ADMIN_PASSWORD = 'Rahman9082##';
const AUTH_STORAGE_KEY = 'ranz_admin_session_auth_v1';

export const AdminPanel: React.FC = () => {
  const {
    config,
    updateConfig,
    uploadLogoFile,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
    isAdminOpen,
    setIsAdminOpen,
  } = useSiteConfig();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'logo' | 'contacts' | 'branding' | 'courses' | 'backup'>('logo');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [logoInputUrl, setLogoInputUrl] = useState(config.logoUrl);
  const [formConfig, setFormConfig] = useState(config);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync form config if external config changes
  useEffect(() => {
    setFormConfig(config);
    setLogoInputUrl(config.logoUrl);
  }, [config, isAdminOpen]);

  // Focus password input when modal opens while not authenticated
  useEffect(() => {
    if (isAdminOpen && !isAuthenticated) {
      setAuthError(null);
      setPasswordInput('');
      const timer = setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAdminOpen, isAuthenticated]);

  if (!isAdminOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (err) {
        console.warn('Session storage write error', err);
      }
      setAuthError(null);
      setPasswordInput('');
    } else {
      setAuthError('ভুল পাসওয়ার্ড! দয়া করে সঠিক পাসওয়ার্ড দিয়ে চেষ্টা করুন।');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      passwordInputRef.current?.focus();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.warn('Session storage remove error', err);
    }
    setPasswordInput('');
    setAuthError(null);
  };

  // If not authenticated, display the Password Verification Modal
  if (!isAuthenticated) {
    return (
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        onClick={() => setIsAdminOpen(false)}
      >
        <div
          className={`bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden text-left animate-in zoom-in-95 duration-150 ${
            isShaking ? 'animate-shake' : ''
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#101828] text-white p-6 relative border-b border-slate-800">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-brand font-bold text-lg text-white flex items-center gap-2">
                  <span>অ্যাডমিন ভেরিফিকেশন</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full font-sans">
                    সুরক্ষিত
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  RANZ অ্যাডমিন প্যানেলে প্রবেশ করতে পাসওয়ার্ড দিন
                </p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                <span>অ্যাডমিন পাসওয়ার্ড (Admin Password):</span>
                <span className="text-[10px] text-slate-400 font-normal">Rahman9082##</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  placeholder="পাসওয়ার্ড লিখুন..."
                  autoComplete="current-password"
                  className={`w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border transition-all outline-none font-sans ${
                    authError
                      ? 'border-red-500 ring-2 ring-red-200 bg-red-50/30'
                      : 'border-slate-300 focus:border-[#17469E] focus:ring-2 focus:ring-blue-100 bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors cursor-pointer text-center"
              >
                বাতিল করুন
              </button>
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#17469E] hover:bg-[#13377d] active:bg-[#0f2c66] text-white font-semibold text-xs shadow-md shadow-blue-900/10 transition-all cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>আনলক করুন</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center pt-2">
              অননুমোদিত অ্যাক্সেস সম্পূর্ণ নিষিদ্ধ। কেবলমাত্র অ্যাডমিনিস্ট্রেটরদের জন্য।
            </p>
          </form>
        </div>
      </div>
    );
  }

  const handleSaveAll = () => {
    updateConfig(formConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file: File) => {
    setUploadError(null);
    try {
      const dataUrl = await uploadLogoFile(file);
      setFormConfig((prev) => ({ ...prev, logoUrl: dataUrl }));
      setLogoInputUrl(dataUrl);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setUploadError(err.message || 'ইমেজ আপলোড করতে ব্যর্থ হয়েছে।');
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplyLogoUrl = () => {
    if (!logoInputUrl.trim()) return;
    setFormConfig((prev) => ({ ...prev, logoUrl: logoInputUrl.trim() }));
    updateConfig({ logoUrl: logoInputUrl.trim() });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSetOfficialLogo = () => {
    setFormConfig((prev) => ({ ...prev, logoUrl: DEFAULT_RANZ_LOGO_BASE64 }));
    updateConfig({ logoUrl: DEFAULT_RANZ_LOGO_BASE64 });
    setLogoInputUrl(DEFAULT_RANZ_LOGO_BASE64);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে সমস্ত সেটিংস ডিফল্ট মানে ফিরিয়ে আনতে চান?')) {
      resetToDefaults();
      setFormConfig(DEFAULT_SITE_CONFIG);
      setLogoInputUrl(DEFAULT_SITE_CONFIG.logoUrl);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ranz-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      if (content && importConfigJson(content)) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert('ভুল ফরম্যাটের ব্যাকআপ ফাইল!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150"
      onClick={() => setIsAdminOpen(false)}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-left animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#101828] text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-brand font-bold text-base sm:text-lg text-white">
                  RANZ অ্যাডমিন কন্ট্রোল প্যানেল
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>লগইন সক্রিয়</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                লোগো, ফোন নম্বর, যোগাযোগ লিংক ও সাইটের তথ্য এডিট করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>সেভ করুন</span>
            </button>

            {/* Logout / Lock Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950/50 hover:text-red-300 text-slate-300 border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
              title="অ্যাডমিন প্যানেল লক / লগআউট করুন"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">লগআউট</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2.5 flex items-center gap-2 text-emerald-800 text-xs font-medium animate-in slide-in-from-top-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে! ওয়েবসাইটে সাথে সাথে লাইভ দেখা যাচ্ছে।</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-5 sm:px-7 flex items-center gap-2 overflow-x-auto shrink-0 py-2">
          <button
            onClick={() => setActiveTab('logo')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'logo'
                ? 'bg-white text-[#17469E] shadow-2xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>লোগো সেটিংস (Logo)</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'contacts'
                ? 'bg-white text-[#17469E] shadow-2xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>হেল্পলাইন ও যোগাযোগ</span>
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'branding'
                ? 'bg-white text-[#17469E] shadow-2xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>সাইট তথ্য ও টেক্সট</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-white text-[#17469E] shadow-2xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>কোর্স ম্যানেজমেন্ট</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-white text-[#17469E] shadow-2xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ব্যাকআপ ও রিসেট</span>
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* TAB 1: LOGO SETTINGS */}
          {activeTab === 'logo' && (
            <div className="space-y-6">
              
              {/* Notification Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#17469E] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-[#17469E]">
                    সরাসরি ফাইল আপলোড করে লোগো পরিবর্তন করুন
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    আপনার কম্পিউটার বা মোবাইল থেকে লোগোর ছবি (.PNG, .JPG বা .SVG) সিলেক্ট করলে তা সাথে সাথেই ওয়েবসাইটের হেডার ও ফুটারে সেট হয়ে যাবে। কোনো গিটহাব বা সার্ভার রিলোডের প্রয়োজন নেই।
                  </p>
                </div>
              </div>

              {uploadError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Upload Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                  isDragging
                    ? 'border-[#17469E] bg-blue-50/50'
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100/80 text-[#17469E] flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>

                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  লোগো ছবি নির্বাচন করুন
                </h4>
                <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                  কম্পিউটার বা মোবাইল থেকে আপনার RANZ লোগো ফাইলটি সিলেক্ট করুন (PNG, JPG, SVG, WebP)
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#17469E] hover:bg-[#13377d] active:bg-[#0f2c66] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>ফাইল বাছাই করুন (Choose File)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSetOfficialLogo}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-800 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#17469E]" />
                    <span>অফিসিয়াল RANZ লোগো সেট করুন</span>
                  </button>
                </div>
              </div>

              {/* URL Alternative */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                <label className="block text-xs font-semibold text-slate-700">
                  অথবা লোগোর সরাসরি লিংক (Image URL):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={logoInputUrl.startsWith('data:') ? '(Base64 কাস্টম ইমেজ আপলোড করা আছে)' : logoInputUrl}
                    onChange={(e) => setLogoInputUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    disabled={logoInputUrl.startsWith('data:')}
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-500"
                  />
                  {logoInputUrl.startsWith('data:') ? (
                    <button
                      type="button"
                      onClick={() => setLogoInputUrl('')}
                      className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer transition-colors"
                    >
                      URL ইনপুট সক্রিয় করুন
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApplyLogoUrl}
                      className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
                    >
                      প্রয়োগ করুন
                    </button>
                  )}
                </div>
              </div>

              {/* Live Preview Cards (Header & Footer) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  লাইভ প্রিভিউ (ওয়েবসাইটে কেমন দেখাবে):
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Navbar / Light Background Preview */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                    <span className="text-[11px] font-semibold text-slate-500">
                      ১. হেডার প্রিভিউ (হোয়াইট ব্যাকগ্রাউন্ড):
                    </span>
                    <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-3">
                      <img
                        src={formConfig.logoUrl}
                        alt="Logo Preview"
                        className="h-11 w-11 object-contain rounded-xl border border-slate-200 p-0.5 bg-white shrink-0 shadow-2xs"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div>
                        <div className="font-brand font-extrabold text-lg text-[#101828] leading-none">
                          {formConfig.brandName}
                        </div>
                        <div className="text-[9px] text-[#17469E] font-bold tracking-wider uppercase mt-0.5">
                          {formConfig.brandSubtitle}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer / Dark Background Preview */}
                  <div className="p-4 rounded-xl border border-slate-700 bg-[#101828] text-white shadow-2xs space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400">
                      ২. ফুটার প্রিভিউ (ডার্ক ব্যাকগ্রাউন্ড):
                    </span>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-3">
                      <img
                        src={formConfig.logoUrl}
                        alt="Logo Preview"
                        className="h-12 w-12 object-contain rounded-xl border border-slate-700 p-1 bg-white shrink-0 shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div>
                        <div className="font-brand font-extrabold text-xl text-white leading-none">
                          {formConfig.brandName}
                        </div>
                        <div className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase mt-1">
                          {formConfig.brandSubtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CONTACTS */}
          {activeTab === 'contacts' && (
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-600">
                এখানে ফোন নম্বর পরিবর্তন করলে যোগাযোগ সেকশন, ফুটার এবং হেডার-এর সংশ্লিষ্ট লিংকে সরাসরি আপডেট হবে।
              </div>

              {/* Helpline 1 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Phone className="w-4 h-4 text-[#17469E]" />
                  <span>হেল্পলাইন ১ (আবদুর রহমান)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      মোবাইল নম্বর:
                    </label>
                    <input
                      type="text"
                      value={formConfig.helpline1}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, helpline1: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      WhatsApp নম্বর (880...):
                    </label>
                    <input
                      type="text"
                      value={formConfig.helpline1Whatsapp}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, helpline1Whatsapp: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Telegram নম্বর / ইউজারনেম:
                    </label>
                    <input
                      type="text"
                      value={formConfig.helpline1Telegram}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, helpline1Telegram: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Helpline 2 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>হেল্পলাইন ২ (নাজমুল)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      মোবাইল নম্বর:
                    </label>
                    <input
                      type="text"
                      value={formConfig.helpline2}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, helpline2: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      WhatsApp নম্বর (880...):
                    </label>
                    <input
                      type="text"
                      value={formConfig.helpline2Whatsapp}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, helpline2Whatsapp: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Telegram নম্বর / ইউজারনেম:
                    </label>
                    <input
                      type="text"
                      value={formConfig.helpline2Telegram}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, helpline2Telegram: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>অফিশিয়াল সাপোর্ট ইমেইল</span>
                </div>
                <input
                  type="email"
                  value={formConfig.email}
                  onChange={(e) =>
                    setFormConfig({ ...formConfig, email: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>
          )}

          {/* TAB 3: BRANDING & TEXTS */}
          {activeTab === 'branding' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ব্র্যান্ডের নাম (Site Name):
                  </label>
                  <input
                    type="text"
                    value={formConfig.brandName}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, brandName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    সাব-টাইটেল (Subtitle):
                  </label>
                  <input
                    type="text"
                    value={formConfig.brandSubtitle}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, brandSubtitle: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ট্যাগলাইন (Tagline):
                </label>
                <input
                  type="text"
                  value={formConfig.tagline}
                  onChange={(e) =>
                    setFormConfig({ ...formConfig, tagline: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  সংক্ষিপ্ত বিবরণ (About/Footer Description):
                </label>
                <textarea
                  rows={3}
                  value={formConfig.aboutText}
                  onChange={(e) =>
                    setFormConfig({ ...formConfig, aboutText: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  বিশেষ নোটিশ / অ্যানাউন্সমেন্ট (ঐচ্ছিক):
                </label>
                <input
                  type="text"
                  value={formConfig.announcement}
                  onChange={(e) =>
                    setFormConfig({ ...formConfig, announcement: e.target.value })
                  }
                  placeholder="যেমন: নতুন ব্যাচের রেজিস্ট্রেশন চলছে! সীমিত আসন।"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* TAB 4: COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 p-3 rounded-lg">
                ৩টি প্রধান কোর্সের শিরোনাম, মোট ক্লাস এবং মেন্টর ফোন নম্বর এডিট করতে পারেন:
              </div>

              {formConfig.courses.map((course, idx) => (
                <div
                  key={course.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-xs text-[#17469E]">
                      কোর্স #{idx + 1}: {course.nameEn}
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                      {course.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">
                        কোর্সের বাংলা নাম:
                      </label>
                      <input
                        type="text"
                        value={course.nameBn}
                        onChange={(e) => {
                          const updated = [...formConfig.courses];
                          updated[idx] = { ...updated[idx], nameBn: e.target.value };
                          setFormConfig({ ...formConfig, courses: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">
                        মোট ক্লাস (Duration):
                      </label>
                      <input
                        type="text"
                        value={course.duration || `${course.totalClasses}টি ক্লাস`}
                        onChange={(e) => {
                          const updated = [...formConfig.courses];
                          updated[idx] = { ...updated[idx], duration: e.target.value };
                          setFormConfig({ ...formConfig, courses: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">
                        মেন্টরের নাম:
                      </label>
                      <input
                        type="text"
                        value={course.instructor?.name || ''}
                        onChange={(e) => {
                          const updated = [...formConfig.courses];
                          if (updated[idx].instructor) {
                            updated[idx].instructor = {
                              ...updated[idx].instructor!,
                              name: e.target.value,
                            };
                          }
                          setFormConfig({ ...formConfig, courses: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">
                        মেন্টরের ফোন নম্বর:
                      </label>
                      <input
                        type="text"
                        value={course.instructor?.phone || ''}
                        onChange={(e) => {
                          const updated = [...formConfig.courses];
                          if (updated[idx].instructor) {
                            updated[idx].instructor = {
                              ...updated[idx].instructor!,
                              phone: e.target.value,
                            };
                          }
                          setFormConfig({ ...formConfig, courses: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: BACKUP & RESET */}
          {activeTab === 'backup' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  কনফিগারেশন ব্যাকআপ ডাউনলোড ও রিস্টোর
                </h4>
                <p className="text-xs text-slate-600">
                  আপনার সম্পূর্ণ সেটিংস ও আপলোড করা লোগো একটি JSON ফাইলে সেভ করে রাখতে পারেন অথবা যেকোনো ডিভাইস থেকে ইমপোর্ট করতে পারেন।
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleDownloadBackup}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>ব্যাকআপ JSON ডাউনলোড</span>
                  </button>

                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#17469E] text-xs font-semibold border border-blue-200 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>ব্যাকআপ JSON আপলোড</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Reset to Default */}
              <div className="p-4 rounded-xl border border-red-200 bg-red-50/50 space-y-3">
                <h4 className="text-sm font-bold text-red-900 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-red-600" />
                  <span>আগের আসল ডিফল্ট অবস্থায় ফিরে যান</span>
                </h4>
                <p className="text-xs text-red-700">
                  ওয়েবসাইটটিকে এর মূল ডিফল্ট লোগো এবং মূল কনফিগারেশনে ফেরত নিতে চাইলে এই বাটনে ক্লিক করুন।
                </p>
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  সবকিছু ডিফল্ট অবস্থায় রিসেট করুন
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-7 py-3 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            পরিবর্তন সংরক্ষণ করতে "সেভ করুন" বাটনে ক্লিক করুন
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              বন্ধ করুন
            </button>
            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#17469E] hover:bg-[#13377d] active:bg-[#0f2c66] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>সেভ ও প্রয়োগ করুন</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
