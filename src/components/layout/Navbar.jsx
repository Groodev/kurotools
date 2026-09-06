import React, { useState } from 'react';
import { 
  Wrench, 
  Home,
  DownloadCloud, 
  Link as LinkIcon, 
  QrCode, 
  Glasses,
  Gamepad2,
  Menu, 
  Sun,
  Moon,
  Globe,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import DesktopMoreDrawer from './DesktopMoreDrawer.jsx';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenMobileDrawer, 
  onNavigateToCatalog
}) {
  const { t, lang, toggleLang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);

  // Left modules (3 items)
  const leftNavItems = [
    { id: 'downloader', label: t('navDownloader'), icon: <DownloadCloud className="w-3.5 h-3.5" />, accent: 'purple' },
    { id: 'shortener', label: t('navShortener'), icon: <LinkIcon className="w-3.5 h-3.5" />, accent: 'green' },
    { id: 'barcode', label: t('navBarcode'), icon: <QrCode className="w-3.5 h-3.5" />, accent: 'orange' },
  ];

  // Right modules (2 items)
  const rightNavItems = [
    { id: 'meta-glasses', label: t('navMetaGlasses'), icon: <Glasses className="w-3.5 h-3.5" />, accent: 'cyan' },
    { id: 'secretdexx', label: t('navSecretDexx'), icon: <Gamepad2 className="w-3.5 h-3.5" />, accent: 'emerald' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3 bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-xl border-b border-claySlate-200/80 dark:border-slate-800/90 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* 1. Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group flex-shrink-0"
          >
            <div 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-clayPurple to-purple-700 flex items-center justify-center text-white font-black shadow-clay-purple group-hover:scale-105 active:scale-95 transition-all"
              style={{
                boxShadow: '6px 8px 18px -3px rgba(168, 85, 247, 0.45), inset 2px 2px 4px rgba(255, 255, 255, 0.6)'
              }}
            >
              <Wrench className="w-5 h-5 transition-transform group-hover:rotate-12" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-claySlate-900 dark:text-white">
                  Kuro<span className="text-clayPurple">Tools</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-clayPurple-light/70 dark:bg-purple-950/80 text-clayPurple-dark dark:text-purple-300 border border-clayPurple/20">
                  v1.0
                </span>
              </div>
              <p className="text-[10px] font-semibold text-claySlate-400 dark:text-slate-400 hidden sm:block">
                All-in-One Web Utility Suite
              </p>
            </div>
          </div>

          {/* 2. Desktop Page Navigation Buttons */}
          {/* Layout: [Left 3: Downloader, Shortener, Barcode] | [Center: 🏠 Beranda] | [Right 2: Meta Glasses, SecretDexx] + [Button 7: Lainnya ▾] */}
          <nav className="hidden xl:flex items-center bg-claySlate-100/90 dark:bg-[#111927] p-1.5 rounded-3xl border border-claySlate-200/80 dark:border-slate-800 shadow-inner">
            
            {/* Left 3 Page Buttons */}
            <div className="flex items-center gap-1">
              {leftNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all duration-200 select-none flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white dark:bg-[#1E293B] text-clayPurple-dark dark:text-purple-300 shadow-clay-card scale-100 font-extrabold'
                        : 'text-claySlate-600 dark:text-slate-300 hover:text-claySlate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className={isActive ? 'text-clayPurple' : 'text-claySlate-400 dark:text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Center Divider & "Beranda" Button (Tengah) */}
            <div className="mx-2 px-1 py-0.5 flex items-center">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all duration-200 select-none flex items-center gap-1.5 ${
                  activeTab === 'home'
                    ? 'bg-gradient-to-r from-clayPurple to-purple-600 text-white shadow-clay-purple scale-105'
                    : 'bg-white/90 dark:bg-[#1A2333] text-clayPurple-dark dark:text-purple-300 hover:bg-white dark:hover:bg-[#222E42] shadow-sm border border-clayPurple/30 dark:border-purple-500/30'
                }`}
                title={t('navHome')}
              >
                <Home className="w-4 h-4" />
                <span>{t('navHome')}</span>
              </button>
            </div>

            {/* Right 2 Page Buttons + 7th Button (Lainnya / Drawer) */}
            <div className="flex items-center gap-1">
              {rightNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all duration-200 select-none flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white dark:bg-[#1E293B] text-clayPurple-dark dark:text-purple-300 shadow-clay-card scale-100 font-extrabold'
                        : 'text-claySlate-600 dark:text-slate-300 hover:text-claySlate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className={isActive ? 'text-clayPurple' : 'text-claySlate-400 dark:text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* 7th Button: Drawer / "Lainnya ▾" */}
              <button
                onClick={() => setIsMoreDrawerOpen(true)}
                className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all duration-200 select-none flex items-center gap-1.5 ${
                  activeTab === 'author' || isMoreDrawerOpen
                    ? 'bg-clayPurple-light/70 dark:bg-purple-950/80 text-clayPurple-dark dark:text-purple-300 shadow-sm border border-clayPurple/40'
                    : 'text-claySlate-600 dark:text-slate-300 hover:text-claySlate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5'
                }`}
                title={t('navMore')}
              >
                <MoreHorizontal className="w-3.5 h-3.5 text-clayPurple" />
                <span>{t('navMore')}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            </div>

          </nav>

          {/* 3. Right Section: Switch Lang, Night Mode Switch & API Status */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Language Switcher Pill (ID | EN) */}
            <button
              onClick={toggleLang}
              className="clay-badge bg-white/95 dark:bg-[#161F30] border border-claySlate-200 dark:border-slate-700/80 text-claySlate-700 dark:text-slate-200 text-xs font-black py-1.5 px-3 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm flex-shrink-0"
              title={t('langToggle')}
              aria-label={t('langToggle')}
            >
              <Globe className="w-3.5 h-3.5 text-clayPurple" />
              <span>{lang === 'id' ? 'ID' : 'EN'}</span>
            </button>

            {/* Night Mode Toggle Switch (Directly beside API Online) */}
            <button 
              type="button"
              onClick={toggleTheme}
              className="relative w-[52px] h-[28px] flex-shrink-0 bg-claySlate-200 dark:bg-[#131A29] rounded-full p-[3px] cursor-pointer select-none transition-colors border border-claySlate-300/80 dark:border-slate-700/80 shadow-inner flex items-center justify-between"
              title={isDark ? t('themeLight') : t('themeDark')}
              role="switch"
              aria-checked={isDark}
            >
              {/* Background track icons for reference */}
              <Sun className="w-3 h-3 text-amber-500 ml-1 opacity-70 flex-shrink-0" />
              <Moon className="w-3 h-3 text-purple-400 mr-1 opacity-70 flex-shrink-0" />

              {/* Sliding thumb */}
              <span
                className={`absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full flex items-center justify-center transition-transform duration-250 ease-out shadow-sm ${
                  isDark
                    ? 'translate-x-[24px] bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-purple-500/40'
                    : 'translate-x-0 bg-white text-amber-500 shadow-sm'
                }`}
              >
                {isDark ? (
                  <Moon className="w-3 h-3" />
                ) : (
                  <Sun className="w-3 h-3" />
                )}
              </span>
            </button>

            {/* API Status Live Indicator */}
            <div 
              title={t('navApiConnected')}
              className="clay-badge bg-white/95 dark:bg-[#131F2A] border border-emerald-200/80 dark:border-emerald-700/50 select-none text-emerald-700 dark:text-emerald-300 py-1.5 px-3 shadow-sm hidden sm:inline-flex flex-shrink-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-extrabold">{t('navApiOnline')}</span>
            </div>

            {/* Mobile / Tablet Drawer Toggle */}
            <button
              onClick={onOpenMobileDrawer}
              className="xl:hidden clay-button clay-button-white dark:bg-[#131B2E] dark:text-white dark:border-white/10 w-9 h-9 p-0 text-claySlate-700"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

        </div>
      </header>

      {/* Desktop More Drawer (Slide-in drawer for button ke-7) */}
      <DesktopMoreDrawer
        isOpen={isMoreDrawerOpen}
        onClose={() => setIsMoreDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
}
