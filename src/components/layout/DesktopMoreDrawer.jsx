import React from 'react';
import { 
  X, 
  User, 
  DownloadCloud, 
  Link as LinkIcon, 
  QrCode, 
  Glasses, 
  Gamepad2, 
  Home, 
  ExternalLink, 
  Sun, 
  Moon, 
  Globe, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function DesktopMoreDrawer({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab 
}) {
  if (!isOpen) return null;

  const { t, lang, toggleLang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    onClose();
  };

  const quickTools = [
    { id: 'downloader', name: 'Media Downloader', icon: <DownloadCloud className="w-4 h-4 text-purple-500" />, badge: 'MP4/MP3' },
    { id: 'shortener', name: 'Link Shortener', icon: <LinkIcon className="w-4 h-4 text-emerald-500" />, badge: 'Short URL' },
    { id: 'barcode', name: 'Barcode & QR', icon: <QrCode className="w-4 h-4 text-orange-500" />, badge: 'PNG/SVG' },
    { id: 'meta-glasses', name: 'Meta Glasses EIF', icon: <Glasses className="w-4 h-4 text-cyan-500" />, badge: '3D Story' },
    { id: 'secretdexx', name: 'SecretDexx Hub', icon: <Gamepad2 className="w-4 h-4 text-emerald-500" />, badge: 'Roblox' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/50 dark:bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#131B2E] h-full shadow-2xl z-10 p-6 overflow-y-auto flex flex-col justify-between border-l border-claySlate-200 dark:border-white/10 transition-transform">
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-claySlate-100 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-clayPurple-light/60 dark:bg-purple-950/60 text-clayPurple flex items-center justify-center font-black">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-claySlate-900 dark:text-white">
                  {t('drawerTitle')}
                </h3>
                <p className="text-[11px] font-semibold text-claySlate-400 dark:text-slate-400">
                  {t('drawerSubtitle')}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-claySlate-100 dark:hover:bg-slate-800 text-claySlate-400 hover:text-claySlate-800 dark:hover:text-white transition-colors"
              title={t('drawerClose')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Special Section: Author LinkTree (Page 7) */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-claySlate-400 dark:text-slate-400">
              {t('drawerMoreTools')}
            </span>
            
            <div 
              onClick={() => handleNavigate('author')}
              className={`p-4 rounded-2xl cursor-pointer transition-all border group ${
                activeTab === 'author'
                  ? 'bg-clayPurple-light/40 dark:bg-purple-950/50 border-clayPurple shadow-sm'
                  : 'bg-claySlate-50/80 dark:bg-[#0F1626] border-claySlate-200 dark:border-white/5 hover:border-clayPurple/40'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-claySlate-900 dark:text-white group-hover:text-clayPurple transition-colors">
                      {t('drawerAuthorTitle')}
                    </h4>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300">
                      Portfolio
                    </span>
                  </div>
                  <p className="text-[11px] text-claySlate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    {t('drawerAuthorDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Directory of All Other Modules */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-claySlate-400 dark:text-slate-400">
              Semua Modul Tools
            </span>

            <div className="space-y-1.5">
              {quickTools.map((tool) => {
                const isActive = activeTab === tool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => handleNavigate(tool.id)}
                    className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-all border ${
                      isActive
                        ? 'bg-clayPurple-light/30 dark:bg-purple-950/40 border-clayPurple/60 text-clayPurple-dark dark:text-purple-300 font-bold'
                        : 'bg-white dark:bg-[#0F1626] border-transparent hover:bg-claySlate-50 dark:hover:bg-slate-800/60 text-claySlate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-claySlate-100 dark:bg-slate-800 flex items-center justify-center">
                        {tool.icon}
                      </div>
                      <span className="text-xs font-bold">{tool.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-claySlate-100 dark:bg-slate-800 text-claySlate-500 dark:text-slate-400">
                        {tool.badge}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-claySlate-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* External Shortcut: SecretDexx Netlify */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black text-emerald-950 dark:text-emerald-300">
                  SecretDexx Official
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                  secretdexx.netlify.app
                </div>
              </div>
            </div>

            <a
              href="https://secretdexx.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:scale-105 transition-transform shadow-sm"
              title="Buka Website Resmi SecretDexx"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Footer Settings: Theme & Language */}
        <div className="pt-6 border-t border-claySlate-100 dark:border-white/10 space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-claySlate-400 dark:text-slate-400">
            {t('drawerSystem')}
          </span>

          <div className="grid grid-cols-2 gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-claySlate-50 dark:bg-[#0F1626] border border-claySlate-200 dark:border-white/5 flex items-center justify-center gap-2 text-xs font-black text-claySlate-700 dark:text-slate-200 hover:border-clayPurple transition-all"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>{t('themeLight')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-500" />
                  <span>{t('themeDark')}</span>
                </>
              )}
            </button>

            {/* Language Switch */}
            <button
              type="button"
              onClick={toggleLang}
              className="p-3 rounded-xl bg-claySlate-50 dark:bg-[#0F1626] border border-claySlate-200 dark:border-white/5 flex items-center justify-center gap-2 text-xs font-black text-claySlate-700 dark:text-slate-200 hover:border-clayPurple transition-all"
            >
              <Globe className="w-4 h-4 text-clayPurple" />
              <span>{lang === 'id' ? 'English (EN)' : 'Indonesia (ID)'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
