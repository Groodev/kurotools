import React from 'react';
import { 
  DownloadCloud, 
  Link as LinkIcon, 
  QrCode, 
  User, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Video,
  Music,
  Share2
} from 'lucide-react';

export default function ToolsCatalogue({ setActiveTab }) {
  const catalog = [
    {
      id: 'downloader',
      title: 'Media Downloader',
      category: 'Video & Audio Extractor',
      accent: 'purple',
      colorBadge: 'bg-clayPurple-light text-clayPurple-dark',
      btnClass: 'clay-button-purple',
      shadowClass: 'hover:shadow-clay-purple',
      borderAccent: 'border-clayPurple/30',
      icon: <DownloadCloud className="w-8 h-8 text-clayPurple" />,
      desc: 'Unduh video atau audio dari TikTok, YouTube, Instagram, Twitter/X, Spotify, dan lainnya tanpa watermark.',
      features: [
        'Pilihan Format MP4 (Video) & MP3 (Audio)',
        'Resolusi hingga 1080p Full HD & 320kbps Audio',
        'Pratinjau media real-time sebelum mengunduh'
      ],
      tag: '🔥 Paling Populer'
    },
    {
      id: 'shortener',
      title: 'Link Shortener',
      category: 'URL Utility & Tracking',
      accent: 'green',
      colorBadge: 'bg-clayGreen-light text-emerald-900',
      btnClass: 'clay-button-green',
      shadowClass: 'hover:shadow-clay-green',
      borderAccent: 'border-clayGreen/30',
      icon: <LinkIcon className="w-8 h-8 text-emerald-600" />,
      desc: 'Perpendek tautan panjang dalam sekejap dengan kustom alias, satu klik salin, dan pembuatan kode QR otomatis.',
      features: [
        'One-click copy dengan notifikasi toast',
        'Generator QR Code otomatis untuk setiap tautan',
        'Riwayat link tersimpan aman di browser Anda'
      ],
      tag: '⚡ Kilat'
    },
    {
      id: 'barcode',
      title: 'Barcode & QR Generator',
      category: 'Code Generator 1D & 2D',
      accent: 'orange',
      colorBadge: 'bg-clayOrange-light text-orange-900',
      btnClass: 'clay-button-orange',
      shadowClass: 'hover:shadow-clay-orange',
      borderAccent: 'border-clayOrange/30',
      icon: <QrCode className="w-8 h-8 text-orange-600" />,
      desc: 'Hasilkan kode QR interaktif dan Barcode 1D (Code128) beresolusi tinggi dengan palet warna clay kustom.',
      features: [
        'Real-time Canvas Preview saat mengetik',
        'Pilihan warna pastel clay & background',
        'Unduh instan dalam format PNG atau SVG vektor'
      ],
      tag: '🎨 Kustomisasi'
    },
    {
      id: 'author',
      title: 'Author LinkTree',
      category: 'Creator & Portfolio Profile',
      accent: 'blue',
      colorBadge: 'bg-clayBlue-light text-sky-900',
      btnClass: 'clay-button-blue',
      shadowClass: 'hover:shadow-clay-blue',
      borderAccent: 'border-clayBlue/30',
      icon: <User className="w-8 h-8 text-sky-600" />,
      desc: 'Halaman profil interaktif bergaya clay melayang dengan avatar 3D, daftar sosial media, dan portofolio creator.',
      features: [
        'Profil interaktif dengan avatar 3D membal',
        'Tautan media sosial & GitHub creator',
        'Fitur bagikan profil & kode QR profil instan'
      ],
      tag: '✨ Personal'
    }
  ];

  return (
    <section id="catalogue-section" className="py-16 px-4 max-w-7xl mx-auto scroll-mt-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clayPurple-light/60 text-clayPurple-dark text-xs font-black mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Katalog Lengkap Modul</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-claySlate-900 tracking-tight">
            Pilih Alat yang Anda Butuhkan
          </h2>
          <p className="text-sm text-claySlate-500 font-medium mt-1">
            Klik pada kartu modul untuk langsung membuka dan mulai menggunakan fiturnya.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-claySlate-500">
          <span>4 Modul Tersedia</span>
          <span className="w-1.5 h-1.5 rounded-full bg-claySlate-300"></span>
          <span className="text-emerald-600 font-extrabold">Semua Modul Aktif</span>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {catalog.map((tool) => (
          <div
            key={tool.id}
            onClick={() => setActiveTab(tool.id)}
            className={`clay-card p-7 sm:p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 ${tool.shadowClass} border ${tool.borderAccent}`}
          >
            <div>
              {/* Card Top: Icon & Tag */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-16 h-16 rounded-3xl bg-white shadow-clay-pill flex items-center justify-center group-hover:scale-105 transition-transform">
                  {tool.icon}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="clay-badge text-[10px] font-black bg-white text-claySlate-700">
                    {tool.tag}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${tool.colorBadge}`}>
                    {tool.category}
                  </span>
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-2xl font-black text-claySlate-900 mb-2 group-hover:text-clayPurple transition-colors">
                {tool.title}
              </h3>
              <p className="text-xs sm:text-sm text-claySlate-600 font-medium leading-relaxed mb-6">
                {tool.desc}
              </p>

              {/* Key Features Bullet List */}
              <div className="space-y-2 mb-8 bg-claySlate-50/80 p-4 rounded-2xl border border-claySlate-100">
                {tool.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-claySlate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-clayPurple flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Launch Button */}
            <div className="pt-2">
              <button
                type="button"
                className={`w-full clay-button ${tool.btnClass} py-3.5 text-xs sm:text-sm font-black flex items-center justify-center gap-2`}
              >
                <span>Buka Modul {tool.title}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
