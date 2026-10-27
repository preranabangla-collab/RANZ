import React, { useEffect } from 'react';
import { COURSES, FAQ_DATA } from '../data/coursesData';

export const SEOHead: React.FC = () => {
  useEffect(() => {
    // 1. Dynamic Canonical URL & og:url management
    const currentOrigin = window.location.origin;
    const currentPath = window.location.pathname;
    const canonicalHref = `${currentOrigin}${currentPath}`;

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalHref);

    // og:url
    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalHref);

    // 2. Structured Data (JSON-LD)
    const structuredDataId = 'ranz-structured-data';
    let scriptTag = document.getElementById(structuredDataId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = structuredDataId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        // Educational Organization
        {
          '@type': 'EducationalOrganization',
          '@id': `${currentOrigin}/#organization`,
          name: 'RANZ Digital Skills',
          alternateName: 'RANZ',
          url: currentOrigin,
          logo: `${currentOrigin}/assets/aistudio/image_833c97c0.png`,
          description: 'ডিজিটাল দক্ষতা শিক্ষা ও ক্যারিয়ার গঠনের আধুনিক অনলাইন লার্নিং প্ল্যাটফর্ম।',
          sameAs: [
            'https://wa.me/8801883423076',
            'https://wa.me/8801862877500'
          ],
          founder: [
            {
              '@type': 'Person',
              name: 'Abdur Rahman',
              jobTitle: 'Co-Founder & Mentor',
              telephone: '+8801883423076'
            },
            {
              '@type': 'Person',
              name: 'Nazmul',
              jobTitle: 'Co-Founder & Mentor',
              telephone: '+8801862877500'
            }
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+8801883423076',
            contactType: 'Customer Support',
            email: 'hmabdurrahman9082@gmail.com',
            availableLanguage: ['bn', 'en']
          }
        },

        // WebSite metadata
        {
          '@type': 'WebSite',
          '@id': `${currentOrigin}/#website`,
          url: currentOrigin,
          name: 'RANZ',
          description: 'ডিজিটাল দক্ষতা শিখুন, নিজের ভবিষ্যৎ গড়ুন — Ads Campaign, YouTube Automation এবং AI Website Creation.',
          inLanguage: 'bn'
        },

        // Courses ItemList
        {
          '@type': 'ItemList',
          '@id': `${currentOrigin}/#courses`,
          name: 'RANZ কোর্সসমূহ',
          description: 'RANZ-এর ৩টি বিশেষায়িত ডিজিটাল দক্ষতা কোর্স',
          itemListElement: COURSES.map((course, idx) => ({
            '@type': 'Course',
            position: idx + 1,
            name: `${course.nameBn} (${course.nameEn})`,
            description: course.fullDesc || course.shortDesc,
            provider: {
              '@type': 'Organization',
              name: 'RANZ',
              sameAs: currentOrigin
            },
            instructor: {
              '@type': 'Person',
              name: course.instructor?.name || 'RANZ Mentor',
              jobTitle: course.instructor?.title || 'Mentor'
            },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Online',
              inLanguage: 'bn',
              description: course.duration || `${course.totalClasses || 10}টি ক্লাস`
            },
            educationalCredentialAwarded: 'কোর্স সমাপ্তি সনদ ও সাপোর্ট'
          }))
        },

        // FAQPage Schema
        {
          '@type': 'FAQPage',
          '@id': `${currentOrigin}/#faq`,
          mainEntity: FAQ_DATA.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        }
      ]
    };

    scriptTag.text = JSON.stringify(structuredData);
  }, []);

  return null;
};
