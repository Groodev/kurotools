import React from 'react';
import { Heart, ShieldCheck, Sparkles, Activity, Wrench } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function Footer({ setActiveTab }) {
  const { t } = useLanguage();

  return (
    <footer className="w-full mt-24 border-t border-claySlate-200/80 dark:border-slate-800/90 bg-white/95 dark:bg-[#070B16] py-14 px-4 sm:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Tagline */}
          <ScrollReveal animation="fade-up" delay={0} className="md:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-clayPurple text-white flex items-center justify-center font-black text-sm shadow-clay-purple">
                  <Wrench className="w-4 h-4" />
                </div>
                <span className="text-lg font-black text-claySlate-900 dark:text-white">
                  Kuro<span className="text-clayPurple">Tools</span>
                </span>
              </div>
              <p className="text-xs text-claySlate-500 dark:text-slate-300 max-w-md leading-relaxed">
                {t('footerDesc')}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="clay-badge bg-clayPurple-light/50 dark:bg-purple-950/60 text-clayPurple-dark dark:text-purple-300 text-[10px]">
                  Modern UI
                </span>
                <span className="clay-badge bg-clayGreen-light/50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px]">
                  {t('footerFree')}
                </span>
                <span className="clay-badge bg-clayOrange-light/50 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-[10px]">
                  {t('footerNoAds')}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Col 2: Quick Links */}
          <ScrollReveal animation="fade-up" delay={120}>
            <div className="space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-claySlate-700 dark:text-slate-200">
                {t('footerModules')}
              </h4>
              <ul className="space-y-1.5 text-xs font-medium text-claySlate-500 dark:text-slate-300">
                <li>
                  <button 
                    onClick={() => setActiveTab('downloader')} 
                    className="hover:text-clayPurple dark:hover:text-purple-300 transition-colors"
                  >
                    Media Downloader (MP4 / MP3)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('shortener')} 
                    className="hover:text-clayGreen-dark dark:hover:text-emerald-300 transition-colors"
                  >
                    Link Shortener & Instant QR
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('barcode')} 
                    className="hover:text-clayOrange-dark dark:hover:text-orange-300 transition-colors"
                  >
                    Link to Barcode & QR Code
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('meta-glasses')} 
                    className="hover:text-clayPurple dark:hover:text-purple-300 transition-colors"
                  >
                    Meta Glasses EIF (3D IG Story)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('secretdexx')} 
                    className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    SecretDexx Roblox Script Hub
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('author')} 
                    className="hover:text-clayBlue-dark dark:hover:text-sky-300 transition-colors"
                  >
                    Author LinkTree & Portofolio
                  </button>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Col 3: System Status & API */}
          <ScrollReveal animation="fade-up" delay={240}>
            <div className="space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-claySlate-700 dark:text-slate-200">
                {t('footerStatus')}
              </h4>
              <div 
                className="p-3 rounded-2xl bg-white dark:bg-[#111927] border border-claySlate-100 dark:border-slate-800 shadow-clay-card select-none"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-claySlate-600 dark:text-slate-200">{t('footerOnline')}</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-claySlate-400 dark:text-slate-300">
                  <span>Latensi: ~24ms</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Operational</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Bottom copyright & author attribution */}
        <ScrollReveal animation="fade" delay={300}>
          <div className="pt-6 border-t border-claySlate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-claySlate-400 dark:text-slate-400">
            <p>© 2026 <strong>KuroTools</strong>. {t('footerCopyright')}</p>
            <div className="flex items-center gap-2">
              <span>Didesain dengan</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span>oleh</span>
              <button 
                onClick={() => setActiveTab('author')}
                className="clay-badge bg-white dark:bg-[#161F30] text-clayPurple-dark dark:text-purple-300 font-extrabold text-[11px] hover:scale-105"
              >
                @Kuro
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
}
