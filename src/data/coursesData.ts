import { Course, FAQItem } from '../types';

export const COURSES: Course[] = [
  {
    id: 'youtube-automation',
    nameEn: 'USA Content & Automation',
    nameBn: 'USA Content & Automation Course',
    shortDesc: 'ইউটিউব অটোমেশন, হাই আরপিএম ইউএসএ কনটেন্ট ও এআই দিয়ে ভাইরাল চ্যানেল তৈরির ১৫টি স্পেশাল ক্লাস।',
    fullDesc: '১৫টি ক্লাসের মাধ্যমে ফেসলেস ভিডিও তৈরি, ইলেভেনল্যাবস এআই ভয়েস, ইউএসএ ভাইরাল কনটেন্ট তৈরি ও ইউটিউব মনিটাইজেশন স্ট্র্যাটেজির পূর্ণাঙ্গ গাইডলাইন।',
    image: '/assets/aistudio/image_1a9f5736.png',
    imagePosition: 'center 28%',
    badge: 'Content Creation',
    totalClasses: 15,
    topics: [
      'YouTube Channel Setup, Branding & SEO',
      'YouTube Shorts Upload & Subscriber Growth',
      'Keyword Research, Thumbnail Design & Video SEO',
      'YouTube Watch Time Growth Strategy',
      'Copyright Policy & Content Monetization',
      'Viral Video Strategy & Audience Growth',
      'Voice-over Video Creation & Editing',
      'USA YouTube Channel Management',
      'GTA 5 Gameplay & Video Editing',
      'Japanese Content Creation & High RPM Strategy',
      'USA Viral Content Creation',
      'USA AI Video Creation & Monetization',
      'ElevenLabs AI Voice Generation',
      'USA Facebook Reels & YouTube Shorts',
      'YouTube Monetization & AdSense Approval'
    ],
    instructor: {
      name: 'Nazmul',
      title: 'Co-Founder & Mentor',
      image: '/assets/aistudio/image_1a9f5736.png',
      phone: '01862877500',
      avatarPosition: 'center 28%'
    },
    price: null,
    duration: '১৫টি ক্লাস',
    modulesCount: 15
  }
];

export const PROFESSION_OPTIONS = [
  'শিক্ষার্থী',
  'চাকরিজীবী',
  'ফ্রিল্যান্সার',
  'ব্যবসায়ী',
  'কনটেন্ট ক্রিয়েটর',
  'অন্যান্য'
] as const;

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'RANZ কী?',
    answer: 'RANZ একটি আধুনিক ডিজিটাল স্কিলস ও সার্ভিস প্ল্যাটফর্ম, যেখানে একদিকে Nazmul-এর তত্ত্বাবধানে YouTube Automation ও USA Content প্রশিক্ষণ এবং অন্যদিকে MD ABDUR RAHMAN-এর নেতৃত্বে ডিজিটাল মার্কেটিং, ওয়েব ডেভেলপমেন্ট ও ট্র্যাকিং সার্ভিস প্রদান করা হয়।'
  },
  {
    id: 'faq-2',
    question: 'এখানে কী কী কোর্স ও সার্ভিস রয়েছে?',
    answer: 'কোর্স হিসেবে রয়েছে Nazmul-এর পরিচালিত ১৫টি ক্লাসের "USA Content & Automation Course"। পাশাপাশি ব্যবসায়িক গ্রোথের জন্য MD ABDUR RAHMAN-এর প্রফেশনাল সার্ভিসের মধ্যে রয়েছে Website Development & Tracking (GTM, GA4, Meta Pixel, Server-Side Tracking), Meta Advertising, TikTok Advertising এবং AI & Digital Automation।'
  },
  {
    id: 'faq-3',
    question: 'কীভাবে কোর্সে রেজিস্ট্রেশন বা সার্ভিস নেব?',
    answer: 'কোর্সের জন্য রেজিস্ট্রেশন সেকশনে গিয়ে আপনার তথ্য জমা দিন। আর ওয়েবসাইট তৈরি, ট্র্যাকিং সেটআপ বা বিজ্ঞাপন ক্যাম্পেইনের সার্ভিস নিতে চাইলে সরাসরি WhatsApp (+8801883423076) বা ইমেইলে (hmabdurrahman9082@gmail.com) যোগাযোগ করুন।'
  },
  {
    id: 'faq-5',
    question: 'কীভাবে RANZ-এর সঙ্গে যোগাযোগ করব?',
    answer: 'সার্ভিস ও ডিজিটাল মার্কেটিং সংক্রান্ত তথ্যের জন্য MD ABDUR RAHMAN (+8801883423076, hmabdurrahman9082@gmail.com) এবং YouTube Automation কোর্স সংক্রান্ত তথ্যের জন্য Nazmul (01862877500) নম্বরে কল, WhatsApp বা Telegram-এ যোগাযোগ করতে পারেন।'
  }
];

export const FAQ_DATA_EN: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is RANZ?',
    answer: 'RANZ is a modern Digital Skills and Marketing Services platform. Nazmul leads YouTube Automation & USA Content training, while MD ABDUR RAHMAN provides strategic digital marketing, website development, advertising, and analytics tracking services.'
  },
  {
    id: 'faq-2',
    question: 'What courses and services are available?',
    answer: 'Training includes Nazmul’s 15-class "USA Content & Automation Course". For businesses, MD ABDUR RAHMAN offers Website Development & Tracking (GTM, GA4, Meta Pixel, Server-Side Tracking), Meta Advertising, TikTok Advertising, and AI & Digital Automation solutions.'
  },
  {
    id: 'faq-3',
    question: 'How do I register for a course or request a service?',
    answer: 'To join the USA Content & Automation course, complete the registration form on the page. For website development, tracking, or ad management services, reach out directly via WhatsApp (+8801883423076) or email (hmabdurrahman9082@gmail.com).'
  },
  {
    id: 'faq-5',
    question: 'How can I contact the RANZ team?',
    answer: 'Contact MD ABDUR RAHMAN at +8801883423076 (WhatsApp / Telegram) or hmabdurrahman9082@gmail.com for marketing and web solutions, and contact Nazmul at 01862877500 for YouTube Automation training.'
  }
];
