import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  DownloadCloud, 
  Link as LinkIcon, 
  QrCode, 
  Video, 
  Music, 
  Zap, 
  Layers 
} from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function HeroSection({ setActiveTab, onScrollToCatalog }) {
  const { t } = useLanguage();
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      
      {/* Decorative Floating 3D Badges (Desktop & Tablet) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-6xl mx-auto">
        {/* Floating Badge 1: Video MP4 (Top Left) */}
        <ScrollReveal 
          animation="zoom-in" 
          delay={400}
          className="absolute top-4 left-4 sm:left-12 pointer-events-auto hidden sm:block"
        >
          <div 
            className="clay-badge bg-white/90 dark:bg-[#131B2E] text-clayPurple-dark dark:text-purple-300 border border-purple-100 dark:border-purple-900/40 shadow-clay-card animate-float-slow flex items-center gap-2 px-4 py-2 cursor-pointer hover:scale-110"
            onClick={() => setActiveTab('downloader')}
            title="Buka Media Downloader"
          >
            <div className="w-6 h-6 rounded-full bg-clayPurple-light dark:bg-purple-950/80 flex items-center justify-center text-clayPurple-dark dark:text-purple-300">
              <Video className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-black">Video MP4 1080p</span>
          </div>
        </ScrollReveal>

        {/* Floating Badge 2: Audio MP3 (Top Right) */}
        <ScrollReveal 
          animation="zoom-in" 
          delay={500}
          className="absolute top-10 right-4 sm:right-16 pointer-events-auto hidden sm:block"
        >
          <div 
            className="clay-badge bg-white/90 dark:bg-[#131B2E] text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900/40 shadow-clay-card animate-float-medium flex items-center gap-2 px-4 py-2 cursor-pointer hover:scale-110"
            onClick={() => setActiveTab('downloader')}
            title="Buka Media Downloader"
          >
            <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center text-purple-700 dark:text-purple-300">
              <Music className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-black">Audio MP3 320kbps</span>
          </div>
        </ScrollReveal>

        {/* Floating Badge 3: Instant Shortlink (Bottom Left) */}
        <ScrollReveal 
          animation="zoom-in" 
          delay={600}
          className="absolute bottom-6 left-8 sm:left-20 pointer-events-auto hidden md:block"
        >
          <div 
            className="clay-badge bg-white/90 dark:bg-[#131B2E] text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/40 shadow-clay-card animate-float-fast flex items-center gap-2 px-4 py-2 cursor-pointer hover:scale-110"
            onClick={() => setActiveTab('shortener')}
            title="Buka Link Shortener"
          >
            <div className="w-6 h-6 rounded-full bg-clayGreen-light dark:bg-emerald-950/80 flex items-center justify-center text-emerald-800 dark:text-emerald-300">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-black">⚡ Instant Shortlink</span>
          </div>
        </ScrollReveal>

        {/* Floating Badge 4: Barcode & QR Code (Bottom Right) */}
        <ScrollReveal 
          animation="zoom-in" 
          delay={700}
          className="absolute bottom-8 right-6 sm:right-24 pointer-events-auto hidden md:block"
        >
          <div 
            className="clay-badge bg-white/90 dark:bg-[#131B2E] text-orange-800 dark:text-orange-300 border border-orange-100 dark:border-orange-900/40 shadow-clay-card animate-float-slow flex items-center gap-2 px-4 py-2 cursor-pointer hover:scale-110"
            onClick={() => setActiveTab('barcode')}
            title="Buka Barcode & QR Generator"
          >
            <div className="w-6 h-6 rounded-full bg-clayOrange-light dark:bg-orange-950/80 flex items-center justify-center text-orange-800 dark:text-orange-300">
              <QrCode className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-black">Custom Barcode & QR</span>
          </div>
        </ScrollReveal>
      </div>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto text-center px-4">
        
        {/* Top Tag Pill */}
        <ScrollReveal animation="fade-down" delay={100}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#131B2E] border border-clayPurple/30 shadow-clay-pill mb-6 text-clayPurple-dark dark:text-purple-300">
            <Sparkles className="w-4 h-4 text-clayPurple animate-pulse" />
            <span className="text-xs font-black tracking-wide uppercase">
              {t('heroBadge')}
            </span>
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal animation="fade-up" delay={200}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-claySlate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
            {t('heroTitlePrefix')}{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-clayPurple via-purple-600 to-clayBlue">
                {t('heroTitleGradient')}
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-2 bg-clayPurple-light/60 dark:bg-purple-900/60 rounded-full -z-10 transform -rotate-1"></div>
            </span>
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal animation="fade-up" delay={300}>
          <p className="text-base sm:text-lg text-claySlate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {t('heroDesc')}
          </p>
        </ScrollReveal>

        {/* Call to Actions */}
        <ScrollReveal animation="fade-up" delay={400}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onScrollToCatalog}
              className="clay-button clay-button-purple px-8 py-4 text-sm sm:text-base text-white flex items-center gap-2.5 shadow-clay-purple"
            >
              <Layers className="w-5 h-5" />
              <span>{t('heroExploreBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('downloader')}
              className="clay-button clay-button-white dark:bg-[#131B2E] dark:text-white dark:border-white/10 px-7 py-4 text-sm sm:text-base text-claySlate-800 flex items-center gap-2.5"
            >
              <DownloadCloud className="w-5 h-5 text-clayPurple" />
              <span>{t('heroDownloaderBtn')}</span>
            </button>
          </div>
        </ScrollReveal>

      </div>

    </section>
  );
}

