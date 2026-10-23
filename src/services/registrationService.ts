import { RegistrationFormData, RegistrationRecord } from '../types';

const STORAGE_KEY = 'ranz_local_registrations_v1';

export interface SubmissionResponse {
  success: boolean;
  isLiveDatabase: boolean;
  message: string;
  record?: RegistrationRecord;
  error?: string;
}

/**
 * Checks if Supabase client configuration is provided in environment variables
 */
export const isSupabaseConfigured = (): boolean => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return Boolean(url && anonKey && !url.includes('YOUR_') && !anonKey.includes('YOUR_'));
};

/**
 * Submits registration data.
 * If Supabase environment is configured, posts to Supabase REST API.
 * Otherwise, stores locally and notifies the user honestly that it is stored locally
 * because a live database is not connected.
 */
export const submitRegistration = async (
  formData: RegistrationFormData
): Promise<SubmissionResponse> => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const newRecord: RegistrationRecord = {
    ...formData,
    id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    source: isSupabaseConfigured() ? 'supabase' : 'local'
  };

  if (isSupabaseConfigured()) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/ranz_registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          phone: formData.phone,
          profession: formData.profession,
          course_name: formData.course
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Supabase API error');
      }

      // Also save locally as mirror
      saveToLocalStorage(newRecord);

      return {
        success: true,
        isLiveDatabase: true,
        message: 'আপনার রেজিস্ট্রেশন সফলভাবে সার্ভার ও ক্লাউড ডেটাবেসে সংরক্ষিত হয়েছে! আমাদের প্রতিনিধি দ্রুত যোগাযোগ করবেন।',
        record: newRecord
      };
    } catch (err: any) {
      console.warn('Supabase post failed, falling back to local review:', err);
      saveToLocalStorage(newRecord);
      return {
        success: true,
        isLiveDatabase: false,
        message: 'ক্লাউড ডেটাবেসে সরাসরি সংযোগ করা যায়নি, তবে তথ্যটি ব্রাউজার লোকাল স্টোরেজে রাখা হয়েছে।',
        record: newRecord,
        error: err?.message
      };
    }
  }

  // Live database not configured -> store locally and notify clearly
  saveToLocalStorage(newRecord);

  // Trigger custom event so admin/preview listeners update
  window.dispatchEvent(new Event('ranz:new-registration'));

  return {
    success: true,
    isLiveDatabase: false,
    message: 'রেজিস্ট্রেশন জমা হয়েছে (ডেমো মোড)। লাইভ ক্লাউড ডেটাবেস (Supabase) সংযুক্ত না থাকায় ডেটা ব্রাউজার লোকাল স্টোরেজে সংরক্ষিত হয়েছে।',
    record: newRecord
  };
};

/**
 * Saves a record to localStorage
 */
const saveToLocalStorage = (record: RegistrationRecord): void => {
  try {
    const existing = getLocalRegistrations();
    const updated = [record, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('LocalStorage write failed:', err);
  }
};

/**
 * Retrieves all locally saved registrations
 */
export const getLocalRegistrations = (): RegistrationRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('LocalStorage read failed:', err);
    return [];
  }
};

/**
 * Clears local registrations
 */
export const clearLocalRegistrations = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('ranz:new-registration'));
};

/**
 * Exports registrations to CSV file for download
 */
export const exportRegistrationsToCSV = (records: RegistrationRecord[]): void => {
  if (records.length === 0) return;

  const headers = ['ID', 'Full Name', 'Phone', 'Profession', 'Course', 'Date', 'Storage'];
  const rows = records.map((r) => [
    r.id,
    `"${r.fullName.replace(/"/g, '""')}"`,
    `"${r.phone}"`,
    `"${r.profession}"`,
    `"${r.course}"`,
    `"${new Date(r.createdAt).toLocaleString('bn-BD')}"`,
    r.source
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ranz_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
