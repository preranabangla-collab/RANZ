export interface ServiceItem {
  name: string;
  isLearning?: boolean;
  note?: string;
}

export interface ServiceCategory {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  iconKey: 'globe' | 'megaphone' | 'video' | 'cpu';
  items: ServiceItem[];
}

export const RAHMAN_SERVICES: ServiceCategory[] = [
  {
    id: 'web-tracking',
    code: '01',
    title: 'Website Development & Tracking',
    subtitle:
      'Conversion-ready websites paired with accurate client-side and server-side analytics tracking.',
    iconKey: 'globe',
    items: [
      { name: 'E-commerce Website Development' },
      { name: 'Business & Corporate Website' },
      { name: 'Landing Page Development' },
      { name: 'Portfolio Website' },
      { name: 'Service-Based Website' },
      { name: 'Google Tag Manager (GTM)' },
      { name: 'Google Analytics 4 (GA4)' },
      { name: 'Meta Pixel Integration' },
      { name: 'Conversion Tracking' },
      { name: 'Server-Side Tracking' },
    ],
  },
  {
    id: 'meta-ads',
    code: '02',
    title: 'Meta Advertising',
    subtitle:
      'Structured Facebook and Instagram ad campaigns built on audience research, creative testing, and clear reporting.',
    iconKey: 'megaphone',
    items: [
      { name: 'Facebook Ads Campaign Management' },
      { name: 'Instagram Advertising' },
      { name: 'Advertising Strategy & Research' },
      { name: 'Customer & Audience Analysis' },
      { name: 'Custom & Lookalike Audiences' },
      { name: 'Retargeting Campaigns' },
      { name: 'Ad Copywriting' },
      { name: 'A/B Testing' },
      { name: 'Campaign Optimization' },
      { name: 'Performance Reporting' },
    ],
  },
  {
    id: 'tiktok-ads',
    code: '03',
    title: 'TikTok Advertising',
    subtitle:
      'Targeted TikTok campaign setup, audience segmentation, and continuous performance refinement.',
    iconKey: 'video',
    items: [
      { name: 'TikTok Ads Campaign Setup' },
      { name: 'Audience Research & Targeting' },
      { name: 'Campaign Management' },
      { name: 'Performance Analysis' },
      { name: 'Campaign Optimization' },
    ],
  },
  {
    id: 'ai-automation',
    code: '04',
    title: 'AI & Digital Automation',
    subtitle:
      'Practical AI-assisted workflows and digital automation tools designed for modern online businesses.',
    iconKey: 'cpu',
    items: [
      { name: 'AI-Powered Business Solutions' },
      { name: 'AI-Assisted Website Development' },
      { name: 'YouTube Automation Solutions' },
      {
        name: 'ChatGPT Advertising',
        isLearning: true,
        note: 'Currently Learning',
      },
    ],
  },
];
