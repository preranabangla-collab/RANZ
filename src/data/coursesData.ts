import { Course, FAQItem } from '../types';

export const COURSES: Course[] = [
  {
    id: 'ads-campaign',
    nameEn: 'Ads Campaign',
    nameBn: 'Ads Campaign',
    shortDesc: 'ডিজিটাল বিজ্ঞাপন ও ক্যাম্পেইন পরিচালনা শেখার জন্য আমাদের কোর্স সম্পর্কে বিস্তারিত জানতে রেজিস্ট্রেশন করুন।',
    fullDesc: 'এই কোর্সের বিস্তারিত তথ্য শিগগিরই প্রকাশ করা হবে। আগ্রহী হলে নিচের ফর্ম পূরণ করে রেজিস্ট্রেশন করুন।',
    image: '/assets/aistudio/Rahman_L_ba21fc04.png',
    imagePosition: '45% 25%',
    badge: 'Digital Marketing',
    instructor: {
      name: 'Abdur Rahman',
      title: 'Co-Founder & Mentor',
      image: '/assets/aistudio/Rahman_L_ba21fc04.png',
      phone: '01883423076',
      avatarPosition: '45% 22%'
    },
    price: null,
    duration: null,
    modulesCount: null
  },
  {
    id: 'youtube-automation',
    nameEn: 'YouTube Automation',
    nameBn: 'YouTube Automation',
    shortDesc: 'YouTube কনটেন্ট তৈরি ও চ্যানেল পরিচালনার দক্ষতা শেখার জন্য আমাদের কোর্স সম্পর্কে বিস্তারিত জানতে রেজিস্ট্রেশন করুন।',
    fullDesc: 'এই কোর্সের বিস্তারিত তথ্য শিগগিরই প্রকাশ করা হবে। আগ্রহী হলে নিচের ফর্ম পূরণ করে রেজিস্ট্রেশন করুন।',
    image: '/assets/aistudio/image_18ef3919.png',
    imagePosition: 'center 45%',
    badge: 'Content Creation',
    instructor: {
      name: 'Nazmul',
      title: 'Co-Founder & Mentor',
      image: '/assets/aistudio/image_18ef3919.png',
      phone: '01862877500',
      avatarPosition: 'center 43%'
    },
    price: null,
    duration: null,
    modulesCount: null
  },
  {
    id: 'ai-website',
    nameEn: 'AI Website Creation',
    nameBn: 'AI Website Creation',
    shortDesc: 'AI ও আধুনিক প্রযুক্তির সাহায্যে ওয়েবসাইট তৈরির দক্ষতা শেখার জন্য আমাদের কোর্স সম্পর্কে বিস্তারিত জানতে রেজিস্ট্রেশন করুন।',
    fullDesc: 'এই কোর্সের বিস্তারিত তথ্য শিগগিরই প্রকাশ করা হবে। আগ্রহী হলে নিচের ফর্ম পূরণ করে রেজিস্ট্রেশন করুন।',
    image: '/assets/aistudio/Rahman_L_ba21fc04.png',
    imagePosition: '45% 25%',
    badge: 'Web & AI',
    instructor: {
      name: 'Abdur Rahman',
      title: 'Co-Founder & Mentor',
      image: '/assets/aistudio/Rahman_L_ba21fc04.png',
      phone: '01883423076',
      avatarPosition: '45% 22%'
    },
    price: null,
    duration: null,
    modulesCount: null
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
