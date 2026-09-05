import React, { useState } from 'react';
import { 
  User, 
  GitBranch, 
  Globe, 
  Mail, 
  Coffee, 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  Sparkles, 
  ExternalLink,
  MessageCircle,
  Code2,
  Palette,
  Heart,
  X
} from 'lucide-react';
import QRCode from 'qrcode';

export default function AuthorLinkTree({ showToast }) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');

  const authorData = {
    name: 'Kuro',
    handle: '@kurodev',
    role: 'Full-Stack Developer & UI/UX Craftsman',
    bio: 'Pecinta antarmuka bertekstur Claymorphism, membangun perangkat lunak web modern yang cepat, tanpa iklan, dan mudah diakses oleh siapa saja.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    location: 'Indonesia',
    status: 'Tersedia untuk Kolaborasi & Proyek Baru',
    links: [
      {
        id: 'github',
        title: 'GitHub Projects',
        subtitle: 'Jelajahi repositori open source & source code KuroTools',
        url: 'https://github.com',
        icon: (
          <svg className="w-5 h-5 text-claySlate-800 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        ),
        badge: 'Open Source',
        color: 'hover:border-slate-400'
      },
      {
        id: 'portfolio',
        title: 'Website Portofolio',
        subtitle: 'Koleksi studi kasus desain & karya aplikasi web interaktif',
        url: 'https://portfolio.example.com',
        icon: <Globe className="w-5 h-5 text-sky-600" />,
        badge: 'Portfolio',
        color: 'hover:border-sky-400'
      },
      {
        id: 'twitter',
        title: 'X / Twitter Updates',
        subtitle: 'Tips coding, desain antarmuka, dan pembaruan terkini',
        url: 'https://x.com',
        icon: (
          <svg className="w-5 h-5 text-sky-500 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        ),
        badge: 'Tech Tweets',
        color: 'hover:border-sky-300'
      },
      {
        id: 'instagram',
        title: 'Instagram Creative Log',
        subtitle: 'Cuplikan visual UI/UX motion & proses di balik layar',
        url: 'https://instagram.com',
        icon: (
          <svg className="w-5 h-5 text-rose-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        ),
        badge: 'Visuals',
        color: 'hover:border-rose-300'
      },
      {
        id: 'linkedin',
        title: 'LinkedIn Network',
        subtitle: 'Terhubung secara profesional untuk kemitraan bisnis',
        url: 'https://linkedin.com',
        icon: (
          <svg className="w-5 h-5 text-blue-700 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        ),
        badge: 'Career',
        color: 'hover:border-blue-400'
      },
      {
        id: 'email',
        title: 'Hubungi via Email',
        subtitle: 'Kirimkan penawaran kerja sama, konsultasi, atau masukan',
        url: 'mailto:kuro@example.com',
        icon: <Mail className="w-5 h-5 text-amber-600" />,
        badge: 'Inquiry',
        color: 'hover:border-amber-300'
      },
      {
        id: 'kofi',
        title: 'Dukung Kreator di Ko-fi',
        subtitle: 'Beli secangkir kopi untuk mendukung keberlanjutan KuroTools',
        url: 'https://ko-fi.com',
        icon: <Coffee className="w-5 h-5 text-orange-500" />,
        badge: 'Support ☕',
        color: 'hover:border-orange-300'
      }
    ]
  };

  // Generate Profile QR
  const handleOpenQr = async () => {
    try {
      const url = window.location.href;
      const dataUrl = await QRCode.toDataURL(url, {
        width: 260,
        margin: 2,
        color: {
          dark: '#0369A1',
          light: '#F0F9FF'
        }
      });
      setQrDataUrl(dataUrl);
      setShowQr(true);
    } catch (e) {
      showToast('Gagal memuat QR profile.', 'error');
    }
  };

  // Share Profile
  const handleShare = async () => {
    const shareData = {
      title: 'Kuro - Creator of KuroTools',
      text: 'Kunjungi profil interaktif author KuroTools!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('Profil berhasil dibagikan!', 'success');
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast('Tautan profil disalin ke clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Floating Clay Profile Card */}
      <div 
        className="clay-card p-8 sm:p-10 mb-8 text-center bg-white border border-clayBlue/30 relative overflow-hidden"
        style={{
          boxShadow: '16px 24px 44px -6px rgba(56, 189, 248, 0.28), -8px -8px 24px rgba(255, 255, 255, 1), inset 2px 2px 4px rgba(255, 255, 255, 0.9)'
        }}
      >
        {/* Subtle Decorative Background Blob */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-clayBlue-light/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-clayPurple-light/40 rounded-full blur-2xl pointer-events-none"></div>

        {/* Top Actions: Share & QR */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleOpenQr}
            className="p-2.5 rounded-2xl bg-claySlate-100 hover:bg-clayBlue-light/40 text-claySlate-600 hover:text-clayBlue-dark active:scale-95 transition-all shadow-sm"
            title="Tampilkan Kode QR Profil"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="clay-badge bg-clayBlue-light/60 text-sky-900 border border-sky-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            title="Bagikan Profil"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : 'Bagikan Profil'}</span>
          </button>
        </div>

        {/* 3D Animated Avatar Container */}
        <div className="relative inline-block mb-4">
          <div 
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-tr from-clayPurple via-clayBlue to-clayGreen shadow-clay-card animate-squish mx-auto"
            style={{
              boxShadow: '8px 12px 24px -2px rgba(56, 189, 248, 0.4), inset 2px 2px 4px rgba(255, 255, 255, 0.8)'
            }}
          >
            <img 
              src={authorData.avatarUrl} 
              alt={authorData.name}
              className="w-full h-full object-cover rounded-[22px]"
            />
          </div>

          {/* Online Active Status Ring */}
          <div 
            className="absolute bottom-1 right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md"
            title="Status: Aktif"
          >
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
          </div>
        </div>

        {/* Name & Handle */}
        <h1 className="text-2xl sm:text-3xl font-black text-claySlate-900 tracking-tight flex items-center justify-center gap-2">
          <span>{authorData.name}</span>
          <span className="text-clayBlue font-normal">✨</span>
        </h1>
        <p className="text-xs font-bold text-claySlate-400 mb-2">{authorData.handle}</p>

        {/* Role Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clayBlue-light/40 text-sky-900 text-xs font-bold mb-4 border border-sky-100">
          <Code2 className="w-3.5 h-3.5 text-sky-600" />
          <span>{authorData.role}</span>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-sm text-claySlate-600 max-w-lg mx-auto leading-relaxed mb-6 font-medium">
          {authorData.bio}
        </p>

        {/* Specialization Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="clay-badge bg-white text-clayPurple-dark text-[11px]">
            ⚛️ React & Next.js
          </span>
          <span className="clay-badge bg-white text-emerald-800 text-[11px]">
            🎨 Claymorphism UI
          </span>
          <span className="clay-badge bg-white text-orange-800 text-[11px]">
            ⚡ API Architecture
          </span>
          <span className="clay-badge bg-white text-sky-800 text-[11px]">
            🚀 Open Source
          </span>
        </div>

        {/* Social Links List with Bouncy Micro-Interactions */}
        <div className="space-y-3.5 text-left">
          {authorData.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`clay-card p-4 sm:p-4.5 rounded-2xl flex items-center justify-between bg-white border border-claySlate-100 transition-all duration-200 group active:scale-[0.97] hover:-translate-y-1 ${link.color}`}
              style={{
                boxShadow: '6px 8px 18px -2px rgba(148, 163, 184, 0.2), inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.9)'
              }}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-claySlate-50 border border-claySlate-100 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  {link.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-claySlate-800 group-hover:text-clayBlue-dark transition-colors">
                      {link.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-claySlate-100 text-claySlate-600">
                      {link.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-claySlate-500 line-clamp-1">
                    {link.subtitle}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-xl bg-claySlate-50 flex items-center justify-center text-claySlate-400 group-hover:text-clayBlue-dark group-hover:bg-clayBlue-light/30 transition-all flex-shrink-0">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>

      </div>

      {/* QR Code Profile Modal */}
      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-claySlate-900/30 backdrop-blur-sm animate-fade-in">
          <div 
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 text-center border border-white/80 shadow-clay-card"
            style={{
              boxShadow: '16px 24px 40px -6px rgba(56, 189, 248, 0.35), -8px -8px 24px rgba(255, 255, 255, 1)'
            }}
          >
            <button 
              onClick={() => setShowQr(false)}
              className="absolute top-4 right-4 p-2 rounded-2xl bg-claySlate-100 hover:bg-claySlate-200 text-claySlate-600 active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-clayBlue-light flex items-center justify-center mx-auto mb-4 text-sky-900 shadow-clay-pill">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-claySlate-900 mb-1">Kode QR Profil</h3>
            <p className="text-xs text-claySlate-500 font-medium mb-4">Pindai untuk membuka profil kreator Kuro</p>

            <div className="p-4 bg-clayBlue-bg rounded-2xl border border-clayBlue-light inline-block shadow-inner mb-5">
              <img src={qrDataUrl} alt="Author QR Code" className="w-48 h-48 mx-auto rounded-xl" />
            </div>

            <button
              onClick={() => {
                const a = document.createElement('a');
                a.href = qrDataUrl;
                a.download = 'kuro_author_qr.png';
                a.click();
              }}
              className="w-full clay-button clay-button-blue py-3 text-xs font-black text-sky-950"
            >
              Download Kode QR Profil (PNG)
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
