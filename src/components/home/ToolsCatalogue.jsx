import React, { useState, useMemo } from 'react';
import { 
  DownloadCloud, 
  Link as LinkIcon, 
  QrCode, 
  User, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Glasses,
  Gamepad2,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal.jsx';

export default function ToolsCatalogue({ setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const fullCatalog = [
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
      desc: 'Perpendek tautan panjang dalam sekejap dengan domain kurolink.s.gy, satu klik salin, dan pembuatan kode QR otomatis.',
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
    },
    {
      id: 'meta-glasses',
      title: 'Meta Glasses EIF',
      category: 'Instagram 3D Story Motion',
      accent: 'cyan',
      colorBadge: 'bg-cyan-100 text-cyan-900',
      btnClass: 'clay-button-purple',
      shadowClass: 'hover:shadow-clay-purple',
      borderAccent: 'border-cyan-400/40',
      icon: <Glasses className="w-8 h-8 text-cyan-600" />,
      desc: 'Suntikkan metadata EXIF otentik Ray-Ban Meta Smart Glasses ke foto apapun untuk mengaktifkan efek interaktif 3D motion/gyro di Instagram Story.',
      features: [
        '100% Client-Side APP1 segment injection (Tanpa upload)',
        'Simulasi gerakan 3D gyro tilt interaktif saat digerakkan',
        'Kompatibel Instagram Story & Web Share API langsung'
      ],
      tag: '👓 Viral IG Story'
    },
    {
      id: 'secretdexx',
      title: 'SecretDexx Hub',
      category: 'Roblox Game Script Directory',
      accent: 'emerald',
      colorBadge: 'bg-emerald-100 text-emerald-900',
      btnClass: 'clay-button-green',
      shadowClass: 'hover:shadow-clay-green',
      borderAccent: 'border-emerald-400/40',
      icon: <Gamepad2 className="w-8 h-8 text-emerald-600" />,
      desc: 'Discover and explore the best scripts for your favorite games. Direktori ribuan script Roblox game terverifikasi, keyless, dan selalu update.',
      features: [
        '500+ Scripts Roblox game aktif, teruji & keyless',
        'Pencarian instan script Blox Fruits, Da Hood, dll',
        'Tautan resmi & showcase langsung ke secretdexx.netlify.app'
      ],
      tag: '🎮 Roblox Hub'
    }
  ];

  // Filter based on search query
  const filteredCatalog = useMemo(() => {
    if (!searchQuery.trim()) return fullCatalog;
    const q = searchQuery.toLowerCase().trim();
    return fullCatalog.filter(tool => 
      tool.title.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.desc.toLowerCase().includes(q) ||
      tool.tag.toLowerCase().includes(q) ||
      tool.features.some(f => f.toLowerCase().includes(q))
    );
  }, [searchQuery, fullCatalog]);

  // Handle displayed items:
  // If searching: show all filtered results.
  // If not searching and not expanded: show first 4 items.
  // If not searching and expanded: show all items.
  const displayedCatalog = useMemo(() => {
    if (searchQuery.trim() !== '') {
      return filteredCatalog;
    }
    return isExpanded ? fullCatalog : fullCatalog.slice(0, 4);
  }, [searchQuery, isExpanded, filteredCatalog, fullCatalog]);

  const hasExtraCards = !searchQuery.trim() && fullCatalog.length > 4;

  return (
    <section id="catalogue-section" className="py-16 px-4 max-w-7xl mx-auto scroll-mt-24">
      {/* Header Section */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
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

          <div className="flex items-center gap-2 text-xs font-bold text-claySlate-500">
            <span>{fullCatalog.length} Modul Tersedia</span>
            <span className="w-1.5 h-1.5 rounded-full bg-claySlate-300"></span>
            <span className="text-emerald-600 font-extrabold">Semua Modul Aktif</span>
          </div>
        </div>

        {/* Search Bar (Directly below "Pilih Alat yang Anda Butuhkan") */}
        <div className="mb-10 max-w-2xl">
          <div className="relative flex items-center bg-white/95 rounded-2xl border border-claySlate-200/80 shadow-clay-card px-4 py-3 focus-within:border-clayPurple focus-within:ring-2 focus-within:ring-clayPurple/20 transition-all">
            <Search className="w-5 h-5 text-claySlate-400 flex-shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari alat yang Anda butuhkan (cth: meta glasses, roblox, shortener, barcode)..."
              className="w-full bg-transparent text-sm font-bold text-claySlate-800 placeholder-claySlate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full hover:bg-claySlate-100 text-claySlate-400 hover:text-claySlate-600 transition-colors ml-2"
                title="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="flex items-center justify-between text-xs font-semibold text-claySlate-500 mt-2 px-2">
              <span>
                Menampilkan <strong className="text-clayPurple">{filteredCatalog.length}</strong> alat cocok untuk "{searchQuery}"
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-clayPurple hover:underline font-bold"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* Grid Cards */}
      {displayedCatalog.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedCatalog.map((tool, idx) => (
            <ScrollReveal
              key={tool.id}
              animation="fade-up"
              delay={idx * 100}
              className="h-full"
            >
              <div
                onClick={() => setActiveTab(tool.id)}
                className={`clay-card p-7 sm:p-8 h-full flex flex-col justify-between group cursor-pointer transition-all duration-300 ${tool.shadowClass} border ${tool.borderAccent}`}
              >
                <div>
                  {/* Card Top: Icon & Tag */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-16 h-16 rounded-3xl bg-white shadow-clay-pill flex items-center justify-center group-hover:scale-105 transition-transform">
                      {tool.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="clay-badge text-[10px] font-black bg-white text-claySlate-700 shadow-sm">
                        {tool.tag}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${tool.colorBadge}`}>
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-2xl font-black text-claySlate-900 mb-2 group-hover:text-clayPurple transition-colors flex items-center gap-2">
                    <span>{tool.title}</span>
                    {tool.id === 'secretdexx' && (
                      <ExternalLink className="w-4 h-4 text-emerald-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-claySlate-600 font-medium leading-relaxed mb-6">
                    {tool.desc}
                  </p>

                  {/* Key Features Bullet List */}
                  <div className="space-y-2 mb-8 bg-claySlate-50/80 p-4 rounded-2xl border border-claySlate-100">
                    {tool.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-claySlate-700">
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
            </ScrollReveal>
          ))}
        </div>
      ) : (
        /* Empty Search Results State */
        <div className="clay-card p-12 text-center max-w-lg mx-auto space-y-4 border border-claySlate-200">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-claySlate-100 flex items-center justify-center text-claySlate-400">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-claySlate-800">Tidak ada alat yang cocok</h3>
            <p className="text-xs text-claySlate-500">
              Tidak ditemukan alat dengan kata kunci "{searchQuery}". Coba kata kunci lain atau reset pencarian.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="clay-button clay-button-purple py-2.5 px-5 text-xs font-bold"
          >
            Tampilkan Semua Alat
          </button>
        </div>
      )}

      {/* "Lihat Selengkapnya" (Load More / Expand) Button */}
      {hasExtraCards && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2.5 clay-button py-4 px-8 text-xs sm:text-sm font-black text-claySlate-700 bg-white hover:bg-claySlate-50 border border-claySlate-200/90 shadow-clay-card group transition-all"
          >
            <span>{isExpanded ? 'Tampilkan Lebih Sedikit' : 'Lihat Selengkapnya'}</span>
            {!isExpanded ? (
              <>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-clayPurple-light text-clayPurple-dark">
                  +{fullCatalog.length - 4} Alat Lainnya
                </span>
                <ChevronDown className="w-4 h-4 text-clayPurple transition-transform group-hover:translate-y-0.5" />
              </>
            ) : (
              <ChevronUp className="w-4 h-4 text-clayPurple transition-transform group-hover:-translate-y-0.5" />
            )}
          </button>
        </div>
      )}
    </section>
  );
}
