import React from 'react';
import { 
  X, 
  Home, 
  DownloadCloud, 
  Link as LinkIcon, 
  QrCode, 
  User, 
  Glasses,
  Gamepad2,
  Layers, 
  Server, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function MobileDrawer({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab, 
  onNavigateToCatalog
}) {
  if (!isOpen) return null;

  const { t, lang, toggleLang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const tools = [
    {
      id: 'home',
      name: t('navHome'),
      desc: 'Overview dan highlight fitur KuroTools',
      icon: <Home className="w-5 h-5 text-clayPurple" />,
      color: 'bg-clayPurple-light/40 dark:bg-purple-950/60 text-clayPurple-dark dark:text-purple-300',
      badge: 'Main',
    },
    {
      id: 'downloader',
      name: t('navDownloader'),
      desc: 'Ekstraksi video & audio TikTok, YouTube, IG, dll',
      icon: <DownloadCloud className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300',
      badge: 'MP4 / MP3',
    },
    {
      id: 'shortener',
      name: t('navShortener'),
      desc: 'Pemendek URL kilat Short.io & instant QR',
      icon: <LinkIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300',
      badge: '1-Click Copy',
    },
    {
      id: 'barcode',
      name: t('navBarcode'),
      desc: 'Generator QR 2D & Barcode 1D Code128',
      icon: <QrCode className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
      color: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300',
      badge: 'PNG / SVG',
    },
    {
      id: 'meta-glasses',
      name: t('navMetaGlasses'),
      desc: 'Suntik EXIF Ray-Ban Meta untuk Instagram Story 3D',
      icon: <Glasses className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      color: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300',
      badge: '👓 3D Story',
    },
    {
      id: 'secretdexx',
      name: t('navSecretDexx'),
      desc: 'Direktori ribuan script Roblox game terverifikasi',
      icon: <Gamepad2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300',
      badge: '🎮 Roblox Hub',
    },
    {
      id: 'author',
      name: t('navAuthor'),
      desc: 'Profil resmi kreator & portofolio',
      icon: <User className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      color: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300',
      badge: 'Kuro Profile',
    }
  ];

  const handleSelect = (tabId) => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 xl:hidden flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/50 dark:bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div 
        className="relative w-4/5 max-w-sm h-full bg-white dark:bg-[#131B2E] flex flex-col p-6 shadow-2xl border-r border-claySlate-200 dark:border-white/10 z-10 overflow-y-auto animate-slide-in text-claySlate-800 dark:text-white"
      >
        {/* Header Drawer */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-claySlate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-clayPurple text-white flex items-center justify-center font-black shadow-clay-purple">
              K
            </div>
            <div>
              <span className="text-base font-black text-claySlate-900 dark:text-white">
                Kuro<span className="text-clayPurple">Tools</span>
              </span>
              <p className="text-[10px] font-semibold text-claySlate-400 dark:text-slate-400">Mobile Navigation Drawer</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-2xl bg-claySlate-100 dark:bg-slate-800 hover:bg-claySlate-200 text-claySlate-600 dark:text-slate-300 active:scale-95 transition-transform"
            aria-label="Tutup menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tools Catalogue Header & Quick CTA */}
        <div className="mb-4">
          <button
            onClick={() => {
              onNavigateToCatalog();
              onClose();
            }}
            className="w-full clay-button clay-button-purple py-3 text-xs text-white flex items-center justify-center gap-2 shadow-clay-purple"
          >
            <Layers className="w-4 h-4" />
            <span>{t('navCatalogBtn')}</span>
          </button>
        </div>

        {/* Quick Settings: Theme & Language Toggle */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-claySlate-50 dark:bg-[#0B1120] border border-claySlate-200 dark:border-white/10 flex items-center justify-center gap-1.5 text-xs font-bold text-claySlate-700 dark:text-slate-200"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Night</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleLang}
            className="p-2.5 rounded-xl bg-claySlate-50 dark:bg-[#0B1120] border border-claySlate-200 dark:border-white/10 flex items-center justify-center gap-1.5 text-xs font-bold text-claySlate-700 dark:text-slate-200"
          >
            <Globe className="w-3.5 h-3.5 text-clayPurple" />
            <span>{lang === 'id' ? 'ID (Bhs)' : 'EN (Eng)'}</span>
          </button>
        </div>

        {/* Tools Items List */}
        <div className="flex-1 space-y-2 py-1">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-claySlate-400 dark:text-slate-400 px-1">
            {t('catModulesAvailable')}
          </p>

          {tools.map((tool) => {
            const isActive = activeTab === tool.id;
            return (
              <div
                key={tool.id}
                onClick={() => handleSelect(tool.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isActive 
                    ? 'bg-claySlate-50 dark:bg-[#1A243B] border-clayPurple/50 shadow-clay-card scale-[1.01]' 
                    : 'bg-white dark:bg-[#0F1626] border-claySlate-100 dark:border-white/5 hover:bg-claySlate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${tool.color}`}>
                    {tool.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-claySlate-800 dark:text-white">{tool.name}</h4>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-claySlate-100 dark:bg-slate-800 text-claySlate-600 dark:text-slate-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-claySlate-500 dark:text-slate-400 line-clamp-1">{tool.desc}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-clayPurple' : 'text-claySlate-300 dark:text-slate-600'}`} />
              </div>
            );
          })}
        </div>

        {/* Footer in Drawer: API Status */}
        <div className="pt-4 mt-3 border-t border-claySlate-100 dark:border-white/10 space-y-2">
          <div 
            className="p-2.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/30 flex items-center justify-between select-none"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">{t('navApiOnline')}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              Ready
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
