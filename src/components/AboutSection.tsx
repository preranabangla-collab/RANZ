import React from 'react';
import { Target, Lightbulb, Compass, Phone, MessageSquare, Send } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const founders = [
    {
      name: 'Abdur Rahman',
      role: 'Co-Founder, RANZ',
      expertise: 'Ads Campaign & AI Website',
      phone: '01883423076',
      image: '/assets/aistudio/Rahman_L_ba21fc04.png',
      avatarPosition: '45% 22%',
      callUrl: 'tel:01883423076',
      whatsappUrl: 'https://wa.me/8801883423076?text=Hello%20Abdur%20Rahman,%20I%20am%20interested%20in%20RANZ%20courses',
      telegramUrl: 'https://t.me/+8801883423076'
    },
    {
      name: 'Nazmul',
      role: 'Co-Founder, RANZ',
      expertise: 'YouTube Automation',
      phone: '01862877500',
      image: '/assets/aistudio/image_18ef3919.png',
      avatarPosition: 'center 43%',
      callUrl: 'tel:01862877500',
      whatsappUrl: 'https://wa.me/8801862877500?text=Hello%20Nazmul,%20I%20am%20interested%20in%20RANZ%20courses',
      telegramUrl: 'https://t.me/+8801862877500'
    }
  ];

  return (
    <section id="about" className="py-10 sm:py-14 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#EAF2FF] text-[#17469E] text-[11px] font-semibold mb-1.5">
            <span>আমাদের পরিচয়</span>
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#101828] tracking-tight">
            RANZ সম্পর্কে
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            RANZ একটি নতুন অনলাইন লার্নিং প্ল্যাটফর্ম, যেখানে ডিজিটাল দক্ষতা শেখার সুযোগ তৈরি করাই আমাদের লক্ষ্য। আমরা Ads Campaign, YouTube Automation এবং AI দিয়ে ওয়েবসাইট তৈরির মতো দক্ষতাভিত্তিক বিষয় নিয়ে কাজ করছি।
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs text-left space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#17469E] flex items-center justify-center">
              <Target className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">লক্ষ্যভিত্তিক শিক্ষা</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              অনলাইন মার্কেট ও ডিজিটাল ব্যবসায় যে দক্ষতাগুলো বাস্তব প্রয়োজন, সেগুলো শেখানো।
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs text-left space-y-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">আধুনিক প্রযুক্তি ও AI</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI টুলস এবং অটোমেশন কীভাবে মানুষের কাজের গতি বহুগুণ বাড়াতে পারে, সেই কৌশলগুলোকে সহজবোধ্য করা।
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs text-left space-y-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">সততা ও স্বচ্ছতা</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              কোনো বাড়াবাড়ি বা অলীক প্রতিশ্রুতি নয়। সঠিক পরিশ্রম ও নির্দেশনার মাধ্যমে বাস্তব দক্ষতা অর্জনের পথ তৈরি।
            </p>
          </div>
        </div>

        {/* Founders / Leadership Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-2xs">
          <div className="text-center max-w-md mx-auto mb-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">নেতৃত্ব ও উদ্যোক্তা</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              RANZ প্ল্যাটফর্মের পেছনের মূল ভাবনা ও মেন্টরশিপ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {founders.map((founder) => (
              <div 
                key={founder.name}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col items-center text-center space-y-3 hover:border-blue-200 transition-colors"
              >
                {/* Photo */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-200">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: founder.avatarPosition || 'center 35%' }}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Identity in English */}
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 font-brand">{founder.name}</h4>
                  <p className="text-xs text-[#17469E] font-semibold mt-0.5">{founder.role}</p>
                  <span className="inline-block mt-1 text-[10px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Area: {founder.expertise}
                  </span>
                </div>

                {/* Direct Phone & Channels */}
                <div className="w-full pt-2 border-t border-slate-200/70 space-y-1.5">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-slate-800">
                    <Phone className="w-3 h-3 text-[#17469E]" />
                    <a href={founder.callUrl} className="hover:text-[#17469E] hover:underline">
                      {founder.phone}
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 pt-0.5">
                    <a
                      href={founder.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors shadow-2xs cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={founder.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#229ED9] hover:bg-[#1a8bc1] rounded-md transition-colors shadow-2xs cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
