import React, { useState } from 'react';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TeamSection } from './components/TeamSection';
import { CoursesSection } from './components/CoursesSection';
import { CourseModal } from './components/CourseModal';
import { RegistrationSection } from './components/RegistrationSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { SEOHead } from './components/SEOHead';
import { AdminPanel } from './components/AdminPanel';
import { Course } from './types';

function MainApp() {
  const { config } = useSiteConfig();
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [selectedCourseForRegistration, setSelectedCourseForRegistration] = useState<string>('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClick = () => {
    scrollToSection('services');
  };

  const handleRegisterClick = () => {
    scrollToSection('registration');
  };

  const handleExploreCourses = () => {
    scrollToSection('courses');
  };

  const handleProceedToRegisterFromModal = (course: Course) => {
    setSelectedCourseForModal(null);
    setSelectedCourseForRegistration(course.nameEn);
    setTimeout(() => {
      handleRegisterClick();
    }, 100);
  };

  const handleQuickRegisterFromCard = (course: Course) => {
    setSelectedCourseForRegistration(course.nameEn);
    handleRegisterClick();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#17469E] selection:text-white">
      <SEOHead />

      {/* Header: Home, Service, Contact + Language Switcher + Service CTA */}
      <Header onServiceClick={handleServiceClick} />

      <main className="flex-1">
        {/* 1. Home (MD ABDUR RAHMAN Photo & Service Overview) */}
        <HeroSection
          onExploreServices={handleServiceClick}
          onExploreCourses={handleExploreCourses}
        />

        {/* 2. Services First (MD ABDUR RAHMAN - Visible Immediately) */}
        <ServicesSection />

        {/* 3. Our Team (MD ABDUR RAHMAN & NAZMUL) */}
        <TeamSection />

        {/* 4. About RANZ */}
        <AboutSection />

        {/* 5. Course (Nazmul's Preserved Course) */}
        <CoursesSection
          courses={config.courses}
          onSelectCourseForDetails={(course) => setSelectedCourseForModal(course)}
          onQuickRegister={handleQuickRegisterFromCard}
        />

        {/* Course Registration (Nazmul's Course) */}
        <RegistrationSection
          selectedCourseId={selectedCourseForRegistration}
        />

        {/* 6. Contact */}
        <ContactSection />

        {/* 7. FAQ */}
        <FaqSection />
      </main>

      <Footer onServiceClick={handleServiceClick} />

      <CourseModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onProceedToRegister={handleProceedToRegisterFromModal}
      />

      <BackToTop />

      <AdminPanel />
    </div>
  );
}

export default function App() {
  return (
    <SiteConfigProvider>
      <MainApp />
    </SiteConfigProvider>
  );
}
