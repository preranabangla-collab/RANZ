export interface Course {
  id: string;
  nameEn: string;
  nameBn: string;
  shortDesc: string;
  fullDesc?: string;
  image: string;
  imagePosition?: string;
  badge?: string;
  highlights?: string[];
  instructor?: {
    name: string;
    title: string;
    image: string;
    phone: string;
    avatarPosition?: string;
  };
  // Fields reserved for future expansion
  price?: number | null;
  duration?: string | null;
  modulesCount?: number | null;
}

export type ProfessionOption = 
  | 'শিক্ষার্থী'
  | 'চাকরিজীবী'
  | 'ফ্রিল্যান্সার'
  | 'ব্যবসায়ী'
  | 'কনটেন্ট ক্রিয়েটর'
  | 'অন্যান্য';

export interface RegistrationFormData {
  fullName: string;
  phone: string;
  profession: ProfessionOption | '';
  course: string;
}

export interface RegistrationRecord extends RegistrationFormData {
  id: string;
  createdAt: string;
  source: 'local' | 'supabase';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
