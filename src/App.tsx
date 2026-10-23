import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CoursesSection } from './components/CoursesSection';
import { CourseModal } from './components/CourseModal';
import { RegistrationSection } from './components/RegistrationSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { COURSES } from './data/coursesData';
import { Course } from './types';

export default function App() {
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [selectedCourseForRegistration, setSelectedCourseForRegistration] = useState<string>('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
    // Smooth scroll down to registration section
    setTimeout(() => {
      scrollToSection('registration');
    }, 100);
  };

  const handleQuickRegisterFromCard = (course: Course) => {
    setSelectedCourseForRegistration(course.nameEn);
    scrollToSection('registration');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#17469E] selection:text-white">
      {/* 1. Header with Top Bar Contract */}
      <Header onRegisterClick={handleRegisterClick} />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with dynamic auto-repeating course showcase */}
        <HeroSection
          courses={COURSES}
          onExploreCourses={handleExploreCourses}
          onRegisterClick={handleRegisterClick}
          onSelectCourseForDetails={(course) => setSelectedCourseForModal(course)}
        />

        {/* 3. Courses Section (3 Specific Courses) */}
        <CoursesSection
          courses={COURSES}
          onSelectCourseForDetails={(course) => setSelectedCourseForModal(course)}
          onQuickRegister={handleQuickRegisterFromCard}
        />

        {/* 4. Registration Section */}
        <RegistrationSection
          selectedCourseId={selectedCourseForRegistration}
        />

        {/* 5. About Section (RANZ Philosophy & Founders) */}
        <AboutSection />

        {/* 6. Contact Section (Direct Call, Email, WhatsApp, Telegram) */}
        <ContactSection />

        {/* 7. FAQ Section (Bengali Accordion) */}
        <FaqSection />
      </main>

      {/* 8. Footer (Dark Navy, Copyright, Navigation) */}
      <Footer
        onRegisterClick={handleRegisterClick}
      />

      {/* Course Details Modal */}
      <CourseModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onProceedToRegister={handleProceedToRegisterFromModal}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
