import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import MobileDrawer from './components/layout/MobileDrawer.jsx';
import Footer from './components/layout/Footer.jsx';
import HeroSection from './components/home/HeroSection.jsx';
import FeatureHighlights from './components/home/FeatureHighlights.jsx';
import ToolsCatalogue from './components/home/ToolsCatalogue.jsx';
import MediaDownloader from './components/modules/MediaDownloader.jsx';
import LinkShortener from './components/modules/LinkShortener.jsx';
import BarcodeGenerator from './components/modules/BarcodeGenerator.jsx';
import AuthorLinkTree from './components/modules/AuthorLinkTree.jsx';
import MetaGlassesConverter from './components/modules/MetaGlassesConverter.jsx';
import SecretDexxPortal from './components/modules/SecretDexxPortal.jsx';
import Toast from './components/common/Toast.jsx';
import ScrollProgressBar from './components/common/ScrollProgressBar.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import ScrollReveal from './components/common/ScrollReveal.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: '', type: 'success' });
  };

  // Scroll to catalog handler
  const handleNavigateToCatalog = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('catalogue-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('catalogue-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-clayPurple-light selection:text-clayPurple-dark relative">
      
      {/* Scroll Progress Bar at the top */}
      <ScrollProgressBar />

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMobileDrawer={() => setIsDrawerOpen(true)}
        onNavigateToCatalog={handleNavigateToCatalog}
      />

      {/* Mobile Slide-in Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigateToCatalog={handleNavigateToCatalog}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <HeroSection 
              setActiveTab={setActiveTab} 
              onScrollToCatalog={handleNavigateToCatalog} 
            />
            <FeatureHighlights />
            <ToolsCatalogue setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'downloader' && (
          <ScrollReveal animation="fade-up" duration={500}>
            <MediaDownloader 
              showToast={showToast} 
            />
          </ScrollReveal>
        )}

        {activeTab === 'shortener' && (
          <ScrollReveal animation="fade-up" duration={500}>
            <LinkShortener 
              showToast={showToast} 
            />
          </ScrollReveal>
        )}

        {activeTab === 'barcode' && (
          <ScrollReveal animation="fade-up" duration={500}>
            <BarcodeGenerator 
              showToast={showToast} 
            />
          </ScrollReveal>
        )}

        {activeTab === 'author' && (
          <ScrollReveal animation="fade-up" duration={500}>
            <AuthorLinkTree 
              showToast={showToast} 
            />
          </ScrollReveal>
        )}

        {activeTab === 'meta-glasses' && (
          <ScrollReveal animation="fade-up" duration={500}>
            <MetaGlassesConverter 
              showToast={showToast} 
            />
          </ScrollReveal>
        )}

        {activeTab === 'secretdexx' && (
          <ScrollReveal animation="fade-up" duration={500}>
            <SecretDexxPortal 
              showToast={showToast} 
            />
          </ScrollReveal>
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Global Toast Notification */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={closeToast} 
      />
    </div>
  );
}

