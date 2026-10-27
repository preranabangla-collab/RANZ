import { Course, FAQItem } from '../types';

export const COURSES: Course[] = [
  {
    id: 'ads-campaign',
    nameEn: 'Ads Campaign',
    nameBn: 'Ads Campaign Course',
    shortDesc: 'ডিজিটাল বিজ্ঞাপন, সেলস টার্গেটিং ও রিটার্গেটিং ক্যাম্পেইন পরিচালনার পূর্ণাঙ্গ ১০টি প্র্যাকটিক্যাল ক্লাস।',
    fullDesc: '১০টি ক্লাসের মাধ্যমে শিখুন কীভাবে কার্যকর ফেসবুক ও মেটা বিজ্ঞাপন দিয়ে সেলস বাড়ানো যায়, পিক্সেল সেটআপ এবং এ/বি টেস্টিং দিয়ে সঠিক কাস্টমার টার্গেট করা যায়।',
    image: '/assets/aistudio/Rahman_L_ba21fc04.png',
    imagePosition: '45% 25%',
    badge: 'Digital Marketing',
    totalClasses: 10,
    topics: [
      'Environment Setup & Ads Research',
      'Customer Analysis & Loyal Audience Building',
      'Custom Audience & Lookalike Audience Setup',
      'Retargeting Ads Strategy',
      'Powerful Ad Copywriting & Sales-Generating Content',
      'Campaign Structure & Ads Launch',
      'Budget Management & Campaign Optimization',
      'High-Performance Ads & A/B Testing',
      'Meta Pixel & Server-Side Tracking with Google Tag Manager',
      'Ads Metrics Analysis, Performance Optimization & Scaling'
    ],
    instructor: {
      name: 'Abdur Rahman',
      title: 'Co-Founder & Mentor',
      image: '/assets/aistudio/Rahman_L_ba21fc04.png',
      phone: '01883423076',
      avatarPosition: '45% 22%'
    },
    price: null,
    duration: '১০টি ক্লাস',
    modulesCount: 10
  },
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
  },
  {
    id: 'ai-website',
    nameEn: 'AI Website Creation',
    nameBn: 'AI দিয়ে Website তৈরি',
    shortDesc: 'কোডিং ছাড়া আধুনিক এআই টুলস ব্যবহার করে পূর্ণাঙ্গ ওয়েবসাইট তৈরি, ডাটাবেস ও লাইভ ডেপ্লয়মেন্টের ৮টি ক্লাস।',
    fullDesc: '৮টি ক্লাসে এআই দিয়ে আকর্ষণীয় ওয়েবসাইট ডিজাইন, কোডিং ছাড়া বিল্ড, গিটহাব, সুপাবেস ডাটাবেস ও ভার্সেল দিয়ে সরাসরি ডোমেইনে লাইভ করার বাস্তব অভিজ্ঞতা।',
    image: '/assets/aistudio/Rahman_L_ba21fc04.png',
    imagePosition: '45% 25%',
    badge: 'Web & AI',
    totalClasses: 8,
    topics: [
      'AI Research & Website Planning',
      'AI Tools পরিচিতি ও Website Structure তৈরি',
      'AI দিয়ে UI/UX Design ও Website Layout তৈরি',
      'AI দিয়ে Website তৈরি',
      'AI দিয়ে Website Content, Image ও Branding তৈরি',
      'GitHub দিয়ে Code Management ও Version Control',
      'Supabase দিয়ে Database ও Backend Setup',
      'Vercel দিয়ে Website Deploy, Domain Setup ও Live করা'
    ],
    instructor: {
      name: 'Abdur Rahman',
      title: 'Co-Founder & Mentor',
      image: '/assets/aistudio/Rahman_L_ba21fc04.png',
      phone: '01883423076',
      avatarPosition: '45% 22%'
    },
    price: null,
    duration: '৮টি ক্লাস',
    modulesCount: 8
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
    answer: 'RANZ একটি নতুন ও আধুনিক অনলাইন লার্নিং প্ল্যাটফর্ম, যেখানে বাস্তবমুখী ডিজিটাল দক্ষতা শেখার সুযোগ তৈরি করাই আমাদের মূল লক্ষ্য।'
  },
  {
    id: 'faq-2',
    question: 'কী কী কোর্স রয়েছে?',
    answer: 'বর্তমানে আমাদের ৩টি প্রধান কোর্স রয়েছে: Ads Campaign (অ্যাডস ক্যাম্পেইন), YouTube Automation (ইউটিউব অটোমেশন) এবং AI Website Creation (AI দিয়ে ওয়েবসাইট তৈরি)।'
  },
  {
    id: 'faq-3',
    question: 'কীভাবে রেজিস্ট্রেশন করব?',
    answer: 'ওয়েবসাইটের রেজিস্ট্রেশন সেকশনে গিয়ে আপনার পূর্ণ নাম, মোবাইল নম্বর, পেশা এবং পছন্দের কোর্সটি ড্রপডাউন থেকে নির্বাচন করে "রেজিস্ট্রেশন সম্পন্ন করুন" বাটনে ক্লিক করুন।'
  },
  {
    id: 'faq-4',
    question: 'কোর্সের বিস্তারিত কোথায় পাব?',
    answer: 'এই কোর্সের বিস্তারিত তথ্য শিগগিরই প্ল্যাটফর্মে প্রকাশ করা হবে। আপনি রেজিস্ট্রেশন করে রাখলে কোর্স চালুর সাথে সাথে আমাদের টিম আপনার সাথে সরাসরি যোগাযোগ করবে।'
  },
  {
    id: 'faq-5',
    question: 'কীভাবে RANZ-এর সঙ্গে যোগাযোগ করব?',
    answer: 'যেকোনো প্রয়োজনে আমাদের হেল্পলাইনে সরাসরি কল করতে পারেন: 01883423076 অথবা 01862877500 নম্বরে। এছাড়াও ইমেইল করতে পারেন hmabdurrahman9082@gmail.com ঠিকানায় অথবা আমাদের হোয়াটসঅ্যাপে বার্তা পাঠাতে পারেন।'
  }
];
