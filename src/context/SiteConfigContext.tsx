import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_RANZ_LOGO_BASE64 } from '../data/defaultLogo';
import { COURSES } from '../data/coursesData';
import { Course } from '../types';

export type SiteLanguage = 'bn' | 'en';

export interface SiteConfig {
  logoUrl: string;
  brandName: string;
  brandSubtitle: string;
  tagline: string;
  aboutText: string;
  websiteUrl: string;
  helpline1: string;
  helpline1Label: string;
  helpline1Whatsapp: string;
  helpline1Telegram: string;
  helpline2: string;
  helpline2Label: string;
  helpline2Whatsapp: string;
  helpline2Telegram: string;
  email: string;
  announcement: string;
  courses: Course[];
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  logoUrl: DEFAULT_RANZ_LOGO_BASE64,
  brandName: 'RANZ',
  brandSubtitle: 'Digital Skills',
  tagline: 'Learn Skills. Build Your Future.',
  aboutText:
    'ডিজিটাল দক্ষতা ও ব্যবসায়িক গ্রোথের আধুনিক প্ল্যাটফর্ম। প্রফেশনাল ওয়েবসাইট ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং ও ট্র্যাকিং সার্ভিস এবং ইউটিউব অটোমেশন প্রশিক্ষণ।',
  websiteUrl: 'https://ranz.com',
  helpline1: '01883423076',
  helpline1Label: 'হেল্পলাইন ১',
  helpline1Whatsapp: '8801883423076',
  helpline1Telegram: '+8801883423076',
  helpline2: '01862877500',
  helpline2Label: 'হেল্পলাইন ২',
  helpline2Whatsapp: '8801862877500',
  helpline2Telegram: '+8801862877500',
  email: 'hmabdurrahman9082@gmail.com',
  announcement: '',
  courses: COURSES,
};

const STORAGE_KEY = 'ranz_site_config_v1';
const LANG_STORAGE_KEY = 'ranz_site_lang_v1';

const filterActiveCourses = (savedCourses?: Course[]): Course[] => {
  if (!Array.isArray(savedCourses)) return COURSES;
  // Remove Rahman's legacy courses if present in old localStorage, preserve Nazmul's course
  const kept = savedCourses.filter(
    (c) => c.id !== 'ads-campaign' && c.id !== 'ai-website'
  );
  return kept.length > 0 ? kept : COURSES;
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (partial: Partial<SiteConfig>) => void;
  uploadLogoFile: (file: File) => Promise<string>;
  resetToDefaults: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonStr: string) => boolean;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  language: SiteLanguage;
  setLanguage: (lang: SiteLanguage) => void;
  toggleLanguage: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          logoUrl: parsed.logoUrl || DEFAULT_RANZ_LOGO_BASE64,
          courses: filterActiveCourses(parsed.courses),
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved site config from localStorage:', e);
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [language, setLanguageState] = useState<SiteLanguage>(() => {
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
      if (savedLang === 'en' || savedLang === 'bn') return savedLang;
    } catch {
      // ignore
    }
    return 'bn';
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang: SiteLanguage) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const updateConfig = (partial: Partial<SiteConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
      return updated;
    });
  };

  const uploadLogoFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('দয়া করে একটি সঠিক ইমেজ ফাইল (.png, .jpg, .svg, .webp) নির্বাচন করুন।'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          updateConfig({ logoUrl: result });
          resolve(result);
        } else {
          reject(new Error('ইমেজ রিড করতে ব্যর্থ হয়েছে'));
        }
      };
      reader.onerror = () => reject(new Error('ফাইল পড়তে ত্রুটি হয়েছে'));
      reader.readAsDataURL(file);
    });
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear localStorage:', e);
    }
    setConfig(DEFAULT_SITE_CONFIG);
  };

  const exportConfigJson = () => {
    return JSON.stringify(config, null, 2);
  };

  const importConfigJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed === 'object' && parsed !== null) {
        const merged = {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          logoUrl: parsed.logoUrl || DEFAULT_RANZ_LOGO_BASE64,
          courses: filterActiveCourses(parsed.courses),
        };
        setConfig(merged);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateConfig,
        uploadLogoFile,
        resetToDefaults,
        exportConfigJson,
        importConfigJson,
        isAdminOpen,
        setIsAdminOpen,
        language,
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = (): SiteConfigContextType => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
