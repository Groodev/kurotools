import React from 'react';
import { 
  Wrench, 
  DownloadCloud, 
  Link as LinkIcon, 
  QrCode, 
  User, 
  Menu, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenMobileDrawer, 
  onNavigateToCatalog
}) {
  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'downloader', label: 'Media Downloader', color: 'clayPurple' },
    { id: 'shortener', label: 'Link Shortener', color: 'clayGreen' },
    { id: 'barcode', label: 'Barcode & QR', color: 'clayOrange' },
    { id: 'author', label: 'Author LinkTree', color: 'clayBlue' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 bg-white/80 backdrop-blur-md border-b border-white/60 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div 
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-clayPurple to-clayPurple-dark flex items-center justify-center text-white font-black shadow-clay-purple group-hover:scale-105 active:scale-95 transition-all"
            style={{
              boxShadow: '6px 8px 18px -3px rgba(168, 85, 247, 0.45), inset 2px 2px 4px rgba(255, 255, 255, 0.6)'
            }}
          >
            <Wrench className="w-5 h-5 transition-transform group-hover:rotate-12" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-claySlate-800">
                Kuro<span className="text-clayPurple">Tools</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-clayPurple-light/70 text-clayPurple-dark border border-clayPurple/20">
                v1.0
              </span>
            </div>
            <p className="text-[11px] font-semibold text-claySlate-400 hidden sm:block">
              Claymorphism Web Utility Suite
            </p>
          </div>
        </div>

        {/* Desktop Quick Nav Links (No Sidenav on desktop as per PRD) */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-claySlate-100/80 p-1.5 rounded-3xl border border-white/80 shadow-inner">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-white text-clayPurple-dark shadow-clay-card scale-100'
                    : 'text-claySlate-600 hover:text-claySlate-900 hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Tools Catalogue Button & API Indicator */}
        <div className="flex items-center gap-3">
          
          {/* Tools Catalogue Action Button */}
          <button
            onClick={onNavigateToCatalog}
            className="hidden sm:inline-flex clay-button clay-button-purple px-4 py-2 text-xs font-bold text-white shadow-clay-purple gap-1.5"
            title="Langsung menuju katalog modul tools"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tools Catalogue</span>
          </button>

          {/* API Status Live Indicator */}
          <div 
            title="Kuro Engine API: Terkoneksi & Aktif"
            className="clay-badge bg-white/90 border border-emerald-100 select-none text-emerald-800"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold">API Online</span>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={onOpenMobileDrawer}
            className="lg:hidden clay-button clay-button-white w-10 h-10 p-0 text-claySlate-700"
            aria-label="Buka menu navigasi mobile"
          >
            <Menu className="w-5 h-5" />
          </button>

        </div>

      </div>
    </header>
  );
}
