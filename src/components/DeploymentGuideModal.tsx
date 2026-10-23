import React, { useState } from 'react';
import { X, Check, Copy, Database, GitBranch, Globe, ShieldCheck, Terminal } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlSchema = `-- ১. RANZ রেজিস্ট্রেশন টেবিল তৈরি
CREATE TABLE IF NOT EXISTS ranz_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  profession TEXT NOT NULL,
  course_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ২. Row Level Security (RLS) সক্রিয়করণ (নিরাপত্তা নিশ্চিত করতে)
ALTER TABLE ranz_registrations ENABLE ROW LEVEL SECURITY;

-- ৩. শুধুমাত্র নতুন রেজিস্ট্রেশন ডাটা ইনসার্ট করার অনুমতি (Public Anon)
CREATE POLICY "Allow public insert for registrations"
ON ranz_registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- ৪. শুধুমাত্র অথেনটিকেটেড অ্যাডমিন ডাটা দেখতে পারবেন
CREATE POLICY "Allow authenticated view only"
ON ranz_registrations
FOR SELECT
TO authenticated
USING (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 text-left animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#17469E] flex items-center justify-center text-white">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold">RANZ ডিপ্লয়মেন্ট ও ডেটাবেস গাইড</h3>
              <p className="text-xs text-slate-400">GitHub, Supabase ও Vercel ফ্রি-টিয়ার ইন্টিগ্রেশন</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Step 1: GitHub */}
          <div className="space-y-2 border-l-2 border-slate-300 pl-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <GitBranch className="w-4 h-4 text-[#17469E]" />
              <span>ধাপ ১: GitHub রিপোজিটরিতে কোড আপলোড</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Google AI Studio থেকে কোড ডাউনলোড করে একটি নতুন GitHub রিপোজিটরিতে (যেমন: <code>ranz-learning-platform</code>) পুশ করুন।
            </p>
          </div>

          {/* Step 2: Supabase */}
          <div className="space-y-3 border-l-2 border-[#17469E] pl-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Database className="w-4 h-4 text-[#17469E]" />
              <span>ধাপ ২: Supabase ডেটাবেস ও টেবিল তৈরি</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[#17469E] font-semibold underline">supabase.com</a>-এ একটি ফ্রি প্রোজেক্ট খুলুন। এরপর <strong>SQL Editor</strong>-এ গিয়ে নিচের কোডটি পেস্ট করে <code>Run</code> চাপুন:
            </p>

            <div className="relative">
              <pre className="bg-slate-950 text-slate-200 text-xs p-3.5 rounded-lg overflow-x-auto font-mono leading-relaxed border border-slate-800">
                {sqlSchema}
              </pre>
              <button
                onClick={copySql}
                className="absolute top-2 right-2 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'কপি হয়েছে' : 'SQL কপি করুন'}</span>
              </button>
            </div>
          </div>

          {/* Step 3: Vercel */}
          <div className="space-y-2 border-l-2 border-emerald-500 pl-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>ধাপ ৩: Vercel-এ ডিপ্লয় এবং Environment Variables</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-semibold underline">vercel.com</a>-এ GitHub অ্যাকাউন্ট কানেক্ট করে প্রজেক্টটি ইমপোর্ট করুন। Vercel Project Settings &gt; <strong>Environment Variables</strong>-এ নিচের দুটি কী যুক্ত করুন:
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono space-y-1.5">
              <div><strong className="text-slate-800">VITE_SUPABASE_URL</strong> = https://your-project.supabase.co</div>
              <div><strong className="text-slate-800">VITE_SUPABASE_ANON_KEY</strong> = eyJhbGci... (আপনার Anon Public Key)</div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">গুরুত্বপূর্ণ নিরাপত্তা সতর্কতা:</strong>
              <p className="mt-0.5 leading-relaxed">
                কখনোই Supabase-এর <code>service_role_key</code> ফ্রন্টএন্ডে বা গিটহাবে যুক্ত করবেন না। শুধুমাত্র <code>anon_key</code> ব্যবহার করবেন এবং Row Level Security (RLS) কার্যকর রাখবেন যাতে শিক্ষার্থীরা নিরাপদে ফর্ম সাবমিট করতে পারে কিন্তু অন্যের তথ্য পড়তে না পারে।
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#17469E] hover:bg-[#13377d] rounded-lg transition-colors cursor-pointer"
          >
            বুঝেছি ও বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
