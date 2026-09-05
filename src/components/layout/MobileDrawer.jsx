import React from 'react';
import { 
  X, 
  Home, 
  DownloadCloud, 
  Link as LinkIcon, 
  QrCode, 
  User, 
  Layers, 
  Server, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function MobileDrawer({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab, 
  onNavigateToCatalog
}) {
  if (!isOpen) return null;

  const tools = [
    {
      id: 'home',
      name: 'Beranda Utama',
      desc: 'Overview dan highlight fitur KuroTools',
      icon: <Home className="w-5 h-5 text-clayPurple" />,
      color: 'bg-clayPurple-light/40 text-clayPurple-dark',
      badge: 'Main',
    },
    {
      id: 'downloader',
      name: 'Media Downloader',
      desc: 'Ekstraksi video & audio TikTok, YouTube, IG, dll',
      icon: <DownloadCloud className="w-5 h-5 text-purple-600" />,
      color: 'bg-purple-100 text-purple-800',
      badge: 'MP4 / MP3',
    },
    {
      id: 'shortener',
      name: 'Link Shortener',
      desc: 'Pemendek URL kilat, custom alias & instant QR',
      icon: <LinkIcon className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-100 text-emerald-800',
      badge: '1-Click Copy',
    },
    {
      id: 'barcode',
      name: 'Barcode & QR Code',
      desc: 'Generator QR 2D & Barcode 1D Code128',
      icon: <QrCode className="w-5 h-5 text-orange-600" />,
      color: 'bg-orange-100 text-orange-800',
      badge: 'PNG / SVG',
    },
    {
      id: 'author',
      name: 'Author LinkTree',
      desc: 'Profil resmi kreator & jaringan media sosial',
      icon: <User className="w-5 h-5 text-sky-600" />,
      color: 'bg-sky-100 text-sky-800',
      badge: 'Kuro Profile',
    }
  ];

  const handleSelect = (tabId) => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-claySlate-900/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div 
        className="relative w-4/5 max-w-sm h-full bg-white flex flex-col p-6 shadow-2xl border-r border-white/80 z-10 overflow-y-auto animate-slide-in"
        style={{
          boxShadow: '16px 0 32px rgba(148, 163, 184, 0.4), inset 2px 2px 4px rgba(255, 255, 255, 0.9)'
        }}
      >
        {/* Header Drawer */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-claySlate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-clayPurple text-white flex items-center justify-center font-black shadow-clay-purple">
              K
            </div>
            <div>
              <span className="text-base font-black text-claySlate-800">
                Kuro<span className="text-clayPurple">Tools</span>
              </span>
              <p className="text-[10px] font-semibold text-claySlate-400">Mobile Navigation Drawer</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-2xl bg-claySlate-100 hover:bg-claySlate-200 text-claySlate-600 active:scale-95 transition-transform"
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
            <span>Katalog Lengkap Tools</span>
          </button>
        </div>

        {/* Tools Items List */}
        <div className="flex-1 space-y-2.5 py-2">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-claySlate-400 px-1">
            Daftar Modul Utilitas
          </p>

          {tools.map((tool) => {
            const isActive = activeTab === tool.id;
            return (
              <div
                key={tool.id}
                onClick={() => handleSelect(tool.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isActive 
                    ? 'bg-claySlate-50 border-clayPurple/40 shadow-clay-card scale-[1.02]' 
                    : 'bg-white border-claySlate-100 hover:bg-claySlate-50'
                }`}
                style={{
                  boxShadow: isActive ? '6px 8px 18px -2px rgba(168, 85, 247, 0.18), inset 1px 1px 2px rgba(255, 255, 255, 0.8)' : ''
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${tool.color}`}>
                    {tool.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-claySlate-800">{tool.name}</h4>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-claySlate-100 text-claySlate-600">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-claySlate-500 line-clamp-1">{tool.desc}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-clayPurple' : 'text-claySlate-300'}`} />
              </div>
            );
          })}
        </div>

        {/* Footer in Drawer: API Status & Creator Attribution */}
        <div className="pt-4 mt-4 border-t border-claySlate-100 space-y-3">
          <div 
            className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between select-none"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-900">API Status: Online</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
              Ready
            </span>
          </div>

          <div className="text-center">
            <p className="text-[11px] text-claySlate-400">
              KuroTools • Claymorphism Edition
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
