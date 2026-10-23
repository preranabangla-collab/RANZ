# RANZ — Online Learning & Digital Skills Platform

**Tagline:** Learn Skills. Build Your Future.  
**Website Framework:** React 19 + TypeScript + Vite + Tailwind CSS

---

## 🚀 ডিপ্লয়মেন্ট গাইড (GitHub + Supabase + Vercel)

### ধাপ ১: GitHub-এ আপলোড
1. আপনার লোকাল কম্পিউটারে প্রজেক্ট ফোল্ডারটি ওপেন করুন।
2. গিট ইনিশিয়ালাইজ করুন এবং গিটহাবে পুশ করুন:
```bash
git init
git add .
git commit -m "Initial commit for RANZ platform"
git branch -M main
git remote add origin https://github.com/<your-username>/ranz.git
git push -u origin main
```

---

### ধাপ ২: Supabase-এ ফ্রি ডেটাবেস সেটআপ
1. [supabase.com](https://supabase.com)-এ যান এবং সম্পূর্ণ বিনামূল্যে একটি নতুন প্রজেক্ট তৈরি করুন।
2. প্রজেক্টের **SQL Editor** ট্যাবে গিয়ে নিচের স্ক্রিপ্টটি রান করুন:

```sql
-- ১. রেজিস্ট্রেশন টেবিল তৈরি
CREATE TABLE IF NOT EXISTS ranz_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  profession TEXT NOT NULL,
  course_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ২. Row Level Security (RLS) সক্রিয় করা
ALTER TABLE ranz_registrations ENABLE ROW LEVEL SECURITY;

-- ৩. পাবলিক শিক্ষার্থীদের রেজিস্ট্রেশন জমা দেওয়ার অনুমতি (Insert only)
CREATE POLICY "Allow public insert for registrations"
ON ranz_registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- ৪. শুধুমাত্র অ্যাডমিনদের ডাটা দেখার অনুমতি (Select authenticated)
CREATE POLICY "Allow authenticated view only"
ON ranz_registrations
FOR SELECT
TO authenticated
USING (true);
```

3. Supabase-এর **Project Settings** > **API** সেকশন থেকে নিচের তথ্য দুটি কপি করে রাখুন:
   - **Project URL**
   - **Project API Keys (anon / public)**

---

### ধাপ ৩: Vercel-এ ১-ক্লিকে ফ্রি হোস্টিং
1. [vercel.com](https://vercel.com)-এ যান এবং আপনার GitHub অ্যাকাউন্ট দিয়ে লগইন করুন।
2. **Add New Project** ক্লিক করে আপনার `ranz` গিটহাব রিপোজিটরিটি সিলেক্ট করুন।
3. **Environment Variables** অপশনে গিয়ে নিচের ভেরিয়েবল দুটি যুক্ত করুন:
   - `VITE_SUPABASE_URL` = `https://your-project-ref.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `আপনার anon public key`
4. **Deploy** বাটনে ক্লিক করুন। ২ মিনিটের মধ্যে আপনার ওয়েবসাইট লাইভ হয়ে যাবে!
5. পরবর্তীতে আপনার কাস্টম ডোমেইন (যেমন: `ranz.com` বা `ranz.edu.bd`) Vercel Settings > Domains থেকে ফ্রিতে যুক্ত করতে পারবেন।

---

## 🛠 টেকনোলজি স্ট্যাক
- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS (Modern SaaS Minimal & Responsive)
- **Icons:** Lucide React
- **Database:** Supabase PostgreSQL (বা লোকাল ব্রাউজার স্টোরেজ ফলব্যাক)
- **Deployment:** Vercel / Netlify / Cloudflare Pages
