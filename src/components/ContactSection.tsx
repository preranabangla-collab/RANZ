import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Send, Check, Copy } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const contactList = [
    {
      id: 'num1',
      title: 'হেল্পলাইন ১',
      phone: '01883423076',
      displayPhone: '01883423076',
      whatsappUrl: 'https://wa.me/8801883423076?text=%E0%A6%B9%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A7%8B%20RANZ,%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%95%E0%A7%8B%E0%A6%B0%E0%A7%8D%E0%A6%B8%20%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A7%87%20%E0%A6%9C%E0%A6%BE%E0%A6%A8%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87',
      telegramUrl: 'https://t.me/+8801883423076',
      callUrl: 'tel:01883423076'
    },
    {
      id: 'num2',
      title: 'হেল্পলাইন ২',
      phone: '01862877500',
      displayPhone: '01862877500',
      whatsappUrl: 'https://wa.me/8801862877500?text=%E0%A6%B9%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A7%8B%20RANZ,%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%95%E0%A7%8B%E0%A6%B0%E0%A7%8D%E0%A6%B8%20%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A7%87%20%E0%A6%9C%E0%A6%BE%E0%A6%A8%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87',
      telegramUrl: 'https://t.me/+8801862877500',
      callUrl: 'tel:01862877500'
    }
  ];

  return (
    <section id="contact" className="py-14 sm:py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Smart & Compact */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EAF2FF] text-[#17469E] text-xs font-semibold mb-2.5">
            <span>সরাসরি যোগাযোগ</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#101828] tracking-tight">
            আমাদের সঙ্গে যোগাযোগ করুন
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            যেকোনো নম্বরে ক্লিক করে সরাসরি কল, WhatsApp বা Telegram-এ আমাদের সঙ্গে কথা বলুন।
          </p>
        </div>

        {/* 3 Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1 & 2: The Two Numbers with direct Call, WhatsApp & Telegram */}
          {contactList.map((contact) => (
            <div
              key={contact.id}
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 text-left group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#17469E] flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {contact.title}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={contact.callUrl}
                    className="font-mono text-base font-bold text-[#17469E] hover:underline"
                  >
                    {contact.displayPhone}
                  </a>
                  <button
                    onClick={() => copyToClipboard(contact.phone, contact.id)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors cursor-pointer"
                    title="নম্বর কপি করুন"
                  >
                    {copiedItem === contact.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">কল, হোয়াটসঅ্যাপ বা টেলিগ্রাম এ যুক্ত হন</p>
              </div>

              {/* Direct Action Buttons for this phone number */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {/* 1. Direct WhatsApp */}
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp এ মেসেজ</span>
                </a>

                {/* 2. Direct Telegram */}
                <a
                  href={contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#229ED9] hover:bg-[#1a8bc1] active:bg-[#1579a9] rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram এ মেসেজ</span>
                </a>

                {/* 3. Direct Phone Call */}
                <a
                  href={contact.callUrl}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Phone className="w-3 h-3 text-[#17469E]" />
                  <span>সরাসরি কল করুন</span>
                </a>
              </div>
            </div>
          ))}

          {/* Card 3: Email Desk */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 text-left group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#17469E] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  অফিশিয়াল মেইল
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <a
                  href="mailto:hmabdurrahman9082@gmail.com"
                  className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#17469E] hover:underline truncate mr-1"
                >
                  hmabdurrahman9082@gmail.com
                </a>
                <button
                  onClick={() => copyToClipboard('hmabdurrahman9082@gmail.com', 'email')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors cursor-pointer shrink-0"
                  title="ইমেইল কপি করুন"
                >
                  {copiedItem === 'email' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">যেকোনো প্রাতিষ্ঠানিক বা ব্যক্তিগত অনুসন্ধান</p>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <a
                href="mailto:hmabdurrahman9082@gmail.com"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#17469E] hover:bg-[#123982] rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>ইমেইল পাঠান</span>
              </a>
              <div className="text-[10px] text-slate-400 text-center py-1">
                দ্রুত রিপ্লাই পেতে WhatsApp বা সরাসরি কল করুন
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
