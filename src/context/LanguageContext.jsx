import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  id: {
    // Navigation
    navHome: 'Beranda',
    navDownloader: 'Downloader',
    navShortener: 'Shortener',
    navBarcode: 'Barcode & QR',
    navMetaGlasses: 'Meta Glasses',
    navSecretDexx: 'SecretDexx',
    navAuthor: 'Author',
    navMore: 'Lainnya',
    navCatalogBtn: 'Tools Catalogue',
    navApiOnline: 'API Online',
    navApiConnected: 'Kuro Engine API: Terkoneksi & Aktif',
    themeLight: 'Mode Terang',
    themeDark: 'Mode Malam',
    themeToggle: 'Ganti Tema (Malam/Terang)',
    langToggle: 'Ganti Bahasa (ID/EN)',

    // Drawer Desktop & Mobile
    drawerTitle: 'Menu & Navigasi Cepat',
    drawerSubtitle: 'Akses modul lengkap dan preferensi aplikasi',
    drawerMoreTools: 'Alat Lainnya & Ekosistem',
    drawerAuthorTitle: 'Author LinkTree & Profil',
    drawerAuthorDesc: 'Profil resmi pembuat, portofolio & jejaring media sosial',
    drawerClose: 'Tutup',
    drawerSystem: 'Pengaturan Tampilan & Sistem',

    // Hero Section
    heroBadge: 'All-in-One Web Utility Suite',
    heroTitlePrefix: 'Solusi Utilitas Web',
    heroTitleGradient: 'Serbaguna & Cepat',
    heroDesc: 'Unduh video atau audio tanpa watermark, perpendek tautan kilat, hasilkan barcode & QR code, suntikkan EXIF Meta Glasses 3D Instagram Story, dan jelajahi ribuan script Roblox terverifikasi.',
    heroExploreBtn: 'Jelajahi Semua Modul',
    heroDownloaderBtn: 'Media Downloader (MP4 / MP3)',
    statModulesCount: '6+ Modul',
    statModulesDesc: 'Utilitas Aktif Siap Pakai',
    statSpeed: 'Kilat & Instan',
    statSpeedDesc: '100% Berjalan di Browser',
    statFree: '100% Gratis',
    statFreeDesc: 'Tanpa Iklan Mengganggu',

    // Highlights
    hlTitle: 'Keunggulan KuroTools',
    hlFastTitle: 'Kinerja Super Cepat',
    hlFastDesc: 'Semua pemrosesan media dan tautan diproses secara instan dan efisien.',
    hlSecureTitle: 'Privasi & Keamanan',
    hlSecureDesc: 'Tanpa pencatatan data pribadi. Pengolahan EXIF dan QR 100% di browser Anda.',
    hlClayTitle: 'Desain Claymorphism Menawan',
    hlClayDesc: 'Pengalaman visual 3D lembut yang memanjakan mata dengan mode malam yang nyaman.',

    // Catalogue
    catBadge: 'Katalog Lengkap Modul',
    catTitle: 'Pilih Alat yang Anda Butuhkan',
    catDesc: 'Klik pada kartu modul untuk langsung membuka dan mulai menggunakan fiturnya.',
    catSearchPlaceholder: 'Cari alat yang Anda butuhkan (cth: meta glasses, roblox, shortener, barcode)...',
    catModulesAvailable: 'Modul Tersedia',
    catAllActive: 'Semua Modul Aktif',
    catShowing: 'Menampilkan',
    catMatchesFor: 'alat cocok untuk',
    catReset: 'Reset',
    catNoMatch: 'Tidak ada alat yang cocok',
    catNoMatchDesc: 'Coba kata kunci lain atau reset pencarian.',
    catShowAll: 'Tampilkan Semua Alat',
    catViewMore: 'Lihat Selengkapnya',
    catViewLess: 'Tampilkan Lebih Sedikit',
    catExtraTools: 'Alat Lainnya',
    catOpenModule: 'Buka Modul',

    // Meta Glasses EIF
    mgBadge: 'Instagram Story 3D Motion EIF',
    mgTitle: 'Image to Meta Glasses EIF',
    mgSubtitle: 'Suntikkan metadata EXIF otentik Ray-Ban Meta Smart Glasses ke dalam foto apapun. Saat diunggah ke Instagram Story, Instagram akan mengenali metadata kamera kacamata pintar ini dan mengaktifkan fitur Glasses Tools interaktif dengan efek gerak 3D!',
    mgStep1: '1. Unggah Foto Target',
    mgStep2: '2. Konfigurasi Metadata Ray-Ban Meta',
    mgSimTitle: 'Simulasi Gerak 3D Instagram Story',
    mgSimHint: 'Gerakkan kursor atau miringkan smartphone Anda',
    mgOverlayBadge: 'Badge Overlay IG',
    mgTagsTitle: 'EXIF Segment yang Disuntikkan',
    mgConvertBtn: 'Mulai Injeksi EXIF Meta Glasses',
    mgConvertingBtn: 'Menyuntikkan Metadata Otentik...',
    mgConvertAgainBtn: 'Suntikkan / Konversi Ulang EXIF',
    mgDownloadBtn: 'Download Foto (.jpg)',
    mgShareBtn: 'Share ke Instagram Story',
    mgFaqTitle: 'Cara Memakai Hasil Injeksi di Instagram Story',

    // SecretDexx
    sdBadge: 'Project Unggulan Komunitas',
    sdTitle: 'SecretDexx',
    sdSubtitle: 'Discover and explore the best scripts for your favorite games.',
    sdDesc: 'Direktori script game Roblox terlengkap dan selalu terupdate. Menyediakan ribuan script aktif, terverifikasi, keyless, dan aman yang dapat langsung digunakan.',
    sdVisitBtn: 'Kunjungi Web SecretDexx',
    sdSearchBtn: 'Cari 500+ Script Online',
    sdCollectionTitle: 'Koleksi Script Game Populer',
    sdCollectionDesc: 'Pratinjau script game Roblox terpopuler dari SecretDexx yang siap disalin.',
    sdFilterPlaceholder: 'Filter game (Blox Fruits, Da Hood...)',
    sdCopyBtn: 'Salin',
    sdCopiedBtn: 'Tersalin!',
    sdOpenWebBtn: 'Buka di SecretDexx',

    // Footer
    footerDesc: 'Platform all-in-one web utility modern berkinerja tinggi dengan pengalaman visual interaktif yang lembut, estetis, dan responsif.',
    footerFree: '100% Gratis',
    footerNoAds: 'Tanpa Iklan',
    footerModules: 'Modul Utilitas',
    footerStatus: 'Status Sistem',
    footerOnline: 'Kuro Engine: Aktif',
    footerCopyright: 'Hak cipta dilindungi undang-undang.',
  },
  en: {
    // Navigation
    navHome: 'Home',
    navDownloader: 'Downloader',
    navShortener: 'Shortener',
    navBarcode: 'Barcode & QR',
    navMetaGlasses: 'Meta Glasses',
    navSecretDexx: 'SecretDexx',
    navAuthor: 'Author',
    navMore: 'More',
    navCatalogBtn: 'Tools Catalogue',
    navApiOnline: 'API Online',
    navApiConnected: 'Kuro Engine API: Connected & Active',
    themeLight: 'Light Mode',
    themeDark: 'Night Mode',
    themeToggle: 'Toggle Theme (Night/Light)',
    langToggle: 'Switch Language (ID/EN)',

    // Drawer Desktop & Mobile
    drawerTitle: 'Menu & Quick Navigation',
    drawerSubtitle: 'Access full modules and application preferences',
    drawerMoreTools: 'More Tools & Ecosystem',
    drawerAuthorTitle: 'Author LinkTree & Profile',
    drawerAuthorDesc: 'Official creator profile, portfolio & social media links',
    drawerClose: 'Close',
    drawerSystem: 'Display & System Preferences',

    // Hero Section
    heroBadge: 'All-in-One Web Utility Suite',
    heroTitlePrefix: 'Web Utility Solution',
    heroTitleGradient: 'Versatile & Lightning Fast',
    heroDesc: 'Download videos and audio without watermark, shorten links in a flash, generate barcode & QR codes, convert Meta Glasses 3D Instagram Stories, and explore thousands of verified Roblox scripts.',
    heroExploreBtn: 'Explore All Modules',
    heroDownloaderBtn: 'Media Downloader (MP4 / MP3)',
    statModulesCount: '6+ Modules',
    statModulesDesc: 'Active Ready-to-Use Utilities',
    statSpeed: 'Lightning Fast',
    statSpeedDesc: '100% Client-Side in Browser',
    statFree: '100% Free',
    statFreeDesc: 'Zero Distracting Ads',

    // Highlights
    hlTitle: 'KuroTools Highlights',
    hlFastTitle: 'Super Fast Performance',
    hlFastDesc: 'All media and link processing runs instantly and efficiently in-memory.',
    hlSecureTitle: 'Privacy & Security',
    hlSecureDesc: 'Zero tracking or data logging. EXIF and QR generation is 100% browser-based.',
    hlClayTitle: 'Stunning Claymorphism UI',
    hlClayDesc: 'Soft 3D aesthetic delighting the eye with a soothing night mode.',

    // Catalogue
    catBadge: 'Full Module Catalogue',
    catTitle: 'Choose the Tool You Need',
    catDesc: 'Click on any module card to directly open and start using its features.',
    catSearchPlaceholder: 'Search tools you need (e.g. meta glasses, roblox, shortener, barcode)...',
    catModulesAvailable: 'Modules Available',
    catAllActive: 'All Modules Active',
    catShowing: 'Showing',
    catMatchesFor: 'tools matching',
    catReset: 'Reset',
    catNoMatch: 'No matching tools found',
    catNoMatchDesc: 'Try different search keywords or reset filter.',
    catShowAll: 'Show All Tools',
    catViewMore: 'Show More Tools',
    catViewLess: 'Show Less',
    catExtraTools: 'More Tools',
    catOpenModule: 'Open Module',

    // Meta Glasses EIF
    mgBadge: 'Instagram Story 3D Motion EIF',
    mgTitle: 'Image to Meta Glasses EIF',
    mgSubtitle: 'Inject authentic Ray-Ban Meta Smart Glasses EXIF metadata into any photo. When uploaded to Instagram Story, Instagram detects this smart glasses camera metadata and enables the interactive 3D motion Glasses Tools!',
    mgStep1: '1. Upload Target Photo',
    mgStep2: '2. Configure Ray-Ban Meta Metadata',
    mgSimTitle: 'Instagram Story 3D Motion Simulation',
    mgSimHint: 'Move your cursor or tilt your smartphone',
    mgOverlayBadge: 'IG Overlay Badge',
    mgTagsTitle: 'Injected EXIF Segment',
    mgConvertBtn: 'Start Meta Glasses EXIF Injection',
    mgConvertingBtn: 'Injecting Authentic Metadata...',
    mgConvertAgainBtn: 'Inject / Reconvert EXIF',
    mgDownloadBtn: 'Download Photo (.jpg)',
    mgShareBtn: 'Share to Instagram Story',
    mgFaqTitle: 'How to Use the Result in Instagram Story',

    // SecretDexx
    sdBadge: 'Featured Community Project',
    sdTitle: 'SecretDexx',
    sdSubtitle: 'Discover and explore the best scripts for your favorite games.',
    sdDesc: 'The most comprehensive and up-to-date Roblox script directory. Offering thousands of active, verified, keyless, and safe scripts ready to execute.',
    sdVisitBtn: 'Visit SecretDexx Website',
    sdSearchBtn: 'Search 500+ Scripts Online',
    sdCollectionTitle: 'Popular Game Script Collection',
    sdCollectionDesc: 'Preview popular Roblox game scripts from SecretDexx ready to copy.',
    sdFilterPlaceholder: 'Filter game (Blox Fruits, Da Hood...)',
    sdCopyBtn: 'Copy',
    sdCopiedBtn: 'Copied!',
    sdOpenWebBtn: 'Open on SecretDexx',

    // Footer
    footerDesc: 'Modern high-performance all-in-one web utility platform with a smooth, aesthetic, and responsive interactive experience.',
    footerFree: '100% Free',
    footerNoAds: 'Zero Ads',
    footerModules: 'Utility Modules',
    footerStatus: 'System Status',
    footerOnline: 'Kuro Engine: Online',
    footerCopyright: 'All rights reserved.',
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('kurotools_lang');
    if (saved === 'id' || saved === 'en') return saved;
    return 'id'; // default Indonesian
  });

  useEffect(() => {
    localStorage.setItem('kurotools_lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'id' ? 'en' : 'id'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['id']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
