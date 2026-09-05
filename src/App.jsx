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
import Toast from './components/common/Toast.jsx';

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
    <div className="min-h-screen flex flex-col justify-between selection:bg-clayPurple-light selection:text-clayPurple-dark">
      
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
          <MediaDownloader 
            showToast={showToast} 
          />
        )}

        {activeTab === 'shortener' && (
          <LinkShortener 
            showToast={showToast} 
          />
        )}

        {activeTab === 'barcode' && (
          <BarcodeGenerator 
            showToast={showToast} 
          />
        )}

        {activeTab === 'author' && (
          <AuthorLinkTree 
            showToast={showToast} 
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
      />

      {/* Global Toast Notification */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={closeToast} 
      />
    </div>
  );
}
