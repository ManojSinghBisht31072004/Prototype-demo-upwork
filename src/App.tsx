import React, { useState, useEffect } from 'react';
import { PageId, ServiceType, PropertyCategory, CleaningFrequency, QuoteFormData } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [quotePrefill, setQuotePrefill] = useState<Partial<QuoteFormData>>({});

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'services', 'about', 'service-areas', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Preset service from Services page or Home cards
  const handleSelectServiceForQuote = (serviceType: ServiceType) => {
    const isCommercial = serviceType === 'office' || serviceType === 'commercial';
    setQuotePrefill((prev) => ({
      ...prev,
      serviceType,
      category: isCommercial ? 'commercial' : 'residential',
    }));
    navigateTo('contact');
  };

  // Preset data from interactive QuickEstimator
  const handleApplyEstimatorData = (data: {
    category: PropertyCategory;
    serviceType: ServiceType;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
    squareFootage: string;
  }) => {
    setQuotePrefill((prev) => ({
      ...prev,
      ...data,
    }));
    navigateTo('contact');
  };

  // Preset ZIP from ServiceAreas page
  const handleSelectZipCode = (zip: string) => {
    setQuotePrefill((prev) => ({
      ...prev,
      zipCode: zip,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* 3-Zone Top Navigation Contract */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectServiceForQuote={handleSelectServiceForQuote}
            onApplyEstimatorData={handleApplyEstimatorData}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentPage === 'service-areas' && (
          <ServiceAreasPage
            onNavigate={navigateTo}
            onSelectZipCode={handleSelectZipCode}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            initialData={quotePrefill}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
