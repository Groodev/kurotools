import React from 'react';
import { Heart, ShieldCheck, Sparkles, Activity, Wrench } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="w-full mt-24 border-t border-claySlate-200/80 bg-white/95 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-clayPurple text-white flex items-center justify-center font-black text-sm shadow-clay-purple">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-claySlate-800">
                Kuro<span className="text-clayPurple">Tools</span>
              </span>
            </div>
            <p className="text-xs text-claySlate-500 max-w-md leading-relaxed">
              Platform <em>all-in-one web utility</em> modern berkinerja tinggi dengan pengalaman visual interaktif yang lembut, estetis, dan responsif.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="clay-badge bg-clayPurple-light/50 text-clayPurple-dark text-[10px]">
                Modern UI
              </span>
              <span className="clay-badge bg-clayGreen-light/50 text-emerald-800 text-[10px]">
                100% Gratis
              </span>
              <span className="clay-badge bg-clayOrange-light/50 text-orange-800 text-[10px]">
                Tanpa Iklan
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-claySlate-700">
              Modul Utilitas
            </h4>
            <ul className="space-y-1.5 text-xs font-medium text-claySlate-500">
              <li>
                <button 
                  onClick={() => setActiveTab('downloader')} 
                  className="hover:text-clayPurple transition-colors"
                >
                  Media Downloader (MP4 / MP3)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('shortener')} 
                  className="hover:text-clayGreen-dark transition-colors"
                >
                  Link Shortener & Instant QR
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('barcode')} 
                  className="hover:text-clayOrange-dark transition-colors"
                >
                  Link to Barcode & QR Code
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('author')} 
                  className="hover:text-clayBlue-dark transition-colors"
                >
                  Author LinkTree & Portofolio
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: System Status & API */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-claySlate-700">
              Status Sistem
            </h4>
            <div 
              className="p-3 rounded-2xl bg-white border border-claySlate-100 shadow-clay-card select-none"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-claySlate-600">Layanan Kuro Engine</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-claySlate-400">
                <span>Latensi: ~24ms</span>
                <span className="text-emerald-600 font-bold">100% Operational</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & author attribution */}
        <div className="pt-6 border-t border-claySlate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-claySlate-400">
          <p>© 2026 <strong>KuroTools</strong>. Dibuat untuk produktivitas dan pengalaman web yang menyenangkan.</p>
          <div className="flex items-center gap-2">
            <span>Didesain dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>oleh</span>
            <button 
              onClick={() => setActiveTab('author')}
              className="clay-badge bg-white text-clayPurple-dark font-extrabold text-[11px] hover:scale-105"
            >
              @Kuro
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
