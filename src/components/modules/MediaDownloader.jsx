import React, { useState } from 'react';
import { 
  DownloadCloud, 
  Clipboard, 
  Search, 
  Video, 
  Music, 
  Sparkles, 
  Check, 
  Copy, 
  ExternalLink, 
  Play, 
  Clock, 
  User, 
  HardDrive, 
  AlertCircle,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  fetchFastsaverMedia, 
  downloadYouTubeMedia 
} from '../../services/fastsaverApi.js';

export default function MediaDownloader({ showToast }) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mediaData, setMediaData] = useState(null);
  const [selectedFormatType, setSelectedFormatType] = useState('video'); // 'video' | 'audio'
  const [selectedQuality, setSelectedQuality] = useState(''); // e.g. '1080p', '720p', etc.
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(null);

  // Quick platform detector for the input hint
  const detectPlatform = (inputUrl) => {
    if (!inputUrl) return null;
    const lower = inputUrl.toLowerCase();
    if (lower.includes('tiktok.com')) return { name: 'TikTok', color: 'bg-black text-white', icon: '🎵' };
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) return { name: 'YouTube', color: 'bg-red-600 text-white', icon: '▶️' };
    if (lower.includes('instagram.com')) return { name: 'Instagram', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white', icon: '📸' };
    if (lower.includes('twitter.com') || lower.includes('x.com')) return { name: 'X / Twitter', color: 'bg-slate-900 text-white', icon: '𝕏' };
    if (lower.includes('facebook.com') || lower.includes('fb.watch')) return { name: 'Facebook', color: 'bg-blue-600 text-white', icon: '👥' };
    return { name: 'Web Media', color: 'bg-clayPurple text-white', icon: '🌐' };
  };

  const detectedPlatform = detectPlatform(url);

  // Handle Paste from Clipboard
  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          showToast('Tautan berhasil ditempel dari clipboard!', 'info');
        }
      } else {
        showToast('Tempel URL secara manual (Ctrl+V)', 'info');
      }
    } catch (err) {
      showToast('Izin akses clipboard tidak tersedia', 'error');
    }
  };

  // Handle Fetch & Analyze Media from FastSaver API
  const handleFetch = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) {
      showToast('Silakan masukkan URL media terlebih dahulu!', 'error');
      return;
    }

    setIsLoading(true);
    setMediaData(null);
    setDownloadProgress(null);

    try {
      const result = await fetchFastsaverMedia(url.trim());

      setMediaData(result);

      // Automatically select default format based on API response
      if (result.hasVideo && result.videoFormats.length > 0) {
        setSelectedFormatType('video');
        // Pick highest or 1080p if available
        const defaultQuality = result.videoFormats.find(f => f.format === '1080p') || result.videoFormats[0];
        setSelectedQuality(defaultQuality.format);
      } else if (result.hasAudio) {
        setSelectedFormatType('audio');
        setSelectedQuality('audio');
      }

      showToast(`Media dari ${result.platform} berhasil dianalisa!`, 'success');
    } catch (err) {
      console.error('FastSaver API Error:', err);
      showToast(err.message || 'Gagal menganalisa tautan media. Pastikan URL valid.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Download Trigger
  const handleDownload = async () => {
    if (!mediaData) return;

    setIsDownloading(true);
    setDownloadProgress('Menyiapkan file...');

    try {
      let downloadUrl = '';
      let filename = `${mediaData.title.slice(0, 40).replace(/[^a-zA-Z0-9_-]/g, '_')}`;

      if (mediaData.isYouTube) {
        // YouTube requires requesting the specific format download URL from FastSaver API
        setDownloadProgress('Mengonversi & mengambil stream YouTube...');
        const targetFormat = selectedFormatType === 'audio' ? 'audio' : selectedQuality;

        const downloadData = await downloadYouTubeMedia(mediaData.originalUrl, targetFormat);
        downloadUrl = downloadData.download_url;
        if (downloadData.filename) {
          filename = downloadData.filename;
        } else {
          filename += selectedFormatType === 'audio' ? '.mp3' : `_${selectedQuality}.mp4`;
        }
      } else {
        // Non-YouTube (TikTok, Instagram, Twitter, etc.)
        if (selectedFormatType === 'audio' && mediaData.audioFormat?.downloadUrl) {
          downloadUrl = mediaData.audioFormat.downloadUrl;
          filename += '.mp3';
        } else {
          const selectedVid = mediaData.videoFormats.find(v => v.format === selectedQuality) || mediaData.videoFormats[0];
          downloadUrl = selectedVid?.downloadUrl || mediaData.videoFormats[0]?.downloadUrl;
          filename += '.mp4';
        }
      }

      if (!downloadUrl) {
        throw new Error('Link unduhan tidak ditemukan pada respon API.');
      }

      // Celebrate with confetti
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      showToast(`Memulai pengunduhan ${selectedFormatType.toUpperCase()}...`, 'info');

      // Trigger download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.target = '_blank';
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDownloadProgress('Pengunduhan dimulai!');
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(null);
      }, 1800);

    } catch (err) {
      console.error('Download error:', err);
      showToast(err.message || 'Gagal memulai unduhan file.', 'error');
      setIsDownloading(false);
      setDownloadProgress(null);
    }
  };

  // Copy Direct Link
  const handleCopyLink = () => {
    if (!mediaData) return;
    let urlToCopy = mediaData.originalUrl;
    if (selectedFormatType === 'audio' && mediaData.audioFormat?.downloadUrl) {
      urlToCopy = mediaData.audioFormat.downloadUrl;
    } else if (mediaData.videoFormats[0]?.downloadUrl) {
      urlToCopy = mediaData.videoFormats[0].downloadUrl;
    }
    navigator.clipboard.writeText(urlToCopy);
    showToast('Tautan media disalin ke clipboard!', 'success');
  };

  // Reset to analyze another link
  const handleReset = () => {
    setUrl('');
    setMediaData(null);
    setSelectedQuality('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Module Title & Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clayPurple-light text-clayPurple-dark font-extrabold text-xs mb-3 shadow-clay-pill">
          <Zap className="w-4 h-4 text-clayPurple animate-pulse" />
          <span>Multi-Platform High-Speed Extractor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-claySlate-900 tracking-tight mb-3">
          Media Downloader
        </h1>
        <p className="text-sm text-claySlate-600 max-w-lg mx-auto font-medium">
          Tempel tautan TikTok, YouTube, atau Instagram Anda. Format dan opsi kualitas akan otomatis terdeteksi setelah link dianalisa.
        </p>
      </div>

      {/* Main URL Input Card (No format/quality options here, as requested) */}
      <div 
        className="clay-card p-6 sm:p-8 mb-8 border border-clayPurple/20"
        style={{
          boxShadow: '12px 18px 32px -4px rgba(168, 85, 247, 0.2), -8px -8px 24px rgba(255, 255, 255, 0.95), inset 2px 2px 4px rgba(255, 255, 255, 0.9)'
        }}
      >
        <form onSubmit={handleFetch} className="space-y-4">
          
          <label className="block text-xs font-bold text-claySlate-700 uppercase tracking-wider">
            Tautan Media (TikTok, YouTube, Instagram, X/Twitter, dll)
          </label>

          {/* Thick Claymorphism URL Input Bar */}
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.tiktok.com/@... atau https://youtu.be/..."
                className="w-full pl-5 pr-24 py-4 clay-input-field text-sm font-semibold placeholder:text-claySlate-400"
              />

              {/* Paste Button inside Input */}
              <button
                type="button"
                onClick={handlePaste}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-3.5 py-2 rounded-xl bg-white border border-claySlate-200 text-claySlate-700 hover:text-clayPurple hover:border-clayPurple/40 text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                title="Tempel dari Clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>Paste</span>
              </button>
            </div>

            {/* Fetch & Analyze Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="clay-button clay-button-purple px-8 py-4 text-sm font-black text-white flex items-center justify-center gap-2 shadow-clay-purple whitespace-nowrap disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menganalisa...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Analisa & Fetch Link</span>
                </>
              )}
            </button>
          </div>

          {/* Supported Platforms Hints */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-claySlate-400 font-medium">Platform Didukung:</span>
              <span className="font-bold text-claySlate-600">YouTube, TikTok, Instagram, Twitter/X, Facebook</span>
            </div>
            {detectedPlatform && (
              <div className="flex items-center gap-1.5">
                <span className="text-claySlate-400">Terdeteksi:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${detectedPlatform.color}`}>
                  {detectedPlatform.icon} {detectedPlatform.name}
                </span>
              </div>
            )}
          </div>

        </form>
      </div>

      {/* Loading Skeleton / Animation */}
      {isLoading && (
        <div className="clay-card p-8 text-center bg-white border border-clayPurple/30 shadow-clay-purple animate-pulse space-y-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-clayPurple-light text-clayPurple flex items-center justify-center mx-auto shadow-clay-pill">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="text-lg font-black text-claySlate-800">
            Sedang Menganalisa Tautan Media...
          </h3>
          <p className="text-xs text-claySlate-500 max-w-sm mx-auto font-medium">
            Menghubungkan ke FastSaver API dan mendeteksi semua resolusi video dan audio yang tersedia.
          </p>
        </div>
      )}

      {/* Result Card: ONLY appears after link is analyzed and fetched! */}
      {mediaData && (
        <div 
          className="clay-card p-6 sm:p-8 bg-white border border-clayPurple/30 shadow-clay-purple animate-fade-in space-y-6"
        >
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-claySlate-100 gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-clayPurple animate-pulse" />
              <h3 className="text-lg font-black text-claySlate-900">
                Opsi Media Terdeteksi ({mediaData.platform})
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="clay-badge bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                API Berhasil Merespons
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-xl text-claySlate-500 hover:text-claySlate-800 hover:bg-claySlate-100 text-xs font-bold flex items-center gap-1 active:scale-95"
                title="Analisa Link Baru"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Media Information Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Thumbnail Preview */}
            <div className="md:col-span-4 relative group overflow-hidden rounded-2xl shadow-md border border-claySlate-100">
              <img 
                src={mediaData.thumbnail} 
                alt={mediaData.title}
                className="w-full h-44 sm:h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80';
                }}
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-clayPurple text-white text-[10px] font-black uppercase">
                {mediaData.platform}
              </div>
              {mediaData.duration && (
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-black tracking-wide flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{mediaData.duration}</span>
                </div>
              )}
            </div>

            {/* Title & Creator Details */}
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-claySlate-500">
                <User className="w-3.5 h-3.5 text-clayPurple" />
                <span>{mediaData.author}</span>
              </div>

              <h4 className="text-lg sm:text-xl font-black text-claySlate-900 leading-snug">
                {mediaData.title}
              </h4>

              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-claySlate-600 pt-1">
                {mediaData.duration && (
                  <div className="bg-claySlate-100 px-3 py-1 rounded-xl">
                    Durasi: {mediaData.duration}
                  </div>
                )}
                <div className="bg-clayPurple-light/50 text-clayPurple-dark px-3 py-1 rounded-xl">
                  {mediaData.videoFormats?.length || 0} Format Video Tersedia
                </div>
                {mediaData.hasAudio && (
                  <div className="bg-clayGreen-light/50 text-emerald-900 px-3 py-1 rounded-xl">
                    Audio MP3 Siap
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* DYNAMIC FORMAT & QUALITY SELECTION (Appears strictly from API response) */}
          <div className="p-5 rounded-2xl bg-claySlate-50 border border-claySlate-200/80 space-y-5">
            
            {/* Step 1: Format Switcher (Video MP4 vs Audio MP3) */}
            <div>
              <label className="block text-xs font-bold text-claySlate-700 uppercase tracking-wider mb-2">
                1. Pilih Tipe Format:
              </label>
              
              <div className="flex items-center gap-3">
                {mediaData.hasVideo && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFormatType('video');
                      if (mediaData.videoFormats.length > 0) {
                        setSelectedQuality(mediaData.videoFormats[0].format);
                      }
                    }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all ${
                      selectedFormatType === 'video'
                        ? 'clay-button clay-button-purple text-white shadow-clay-purple'
                        : 'bg-white text-claySlate-700 hover:bg-claySlate-100 border border-claySlate-200'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Video (MP4)</span>
                  </button>
                )}

                {mediaData.hasAudio && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFormatType('audio');
                      setSelectedQuality('audio');
                    }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all ${
                      selectedFormatType === 'audio'
                        ? 'clay-button clay-button-purple text-white shadow-clay-purple'
                        : 'bg-white text-claySlate-700 hover:bg-claySlate-100 border border-claySlate-200'
                    }`}
                  >
                    <Music className="w-4 h-4" />
                    <span>Audio (MP3)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Step 2: Quality Selection based on Format */}
            <div>
              <label className="block text-xs font-bold text-claySlate-700 uppercase tracking-wider mb-2">
                2. Pilih Resolusi & Kualitas:
              </label>

              {selectedFormatType === 'video' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {mediaData.videoFormats.map((item) => {
                    const isSelected = selectedQuality === item.format;
                    return (
                      <button
                        key={item.format}
                        type="button"
                        onClick={() => setSelectedQuality(item.format)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-clayPurple text-white border-clayPurple shadow-clay-purple font-black scale-102'
                            : 'bg-white text-claySlate-800 border-claySlate-200 hover:border-clayPurple/40 font-bold'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs uppercase">{item.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        {item.filesizeText && (
                          <span className={`text-[11px] block ${isSelected ? 'text-purple-100' : 'text-claySlate-400'}`}>
                            {item.filesizeText}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white border border-claySlate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-clayGreen-light flex items-center justify-center text-emerald-800">
                      <Music className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-claySlate-900">
                        {mediaData.audioFormat?.label || 'Audio MP3'}
                      </h5>
                      <p className="text-[11px] text-claySlate-400">
                        Ekstraksi audio kualitas tinggi • {mediaData.audioFormat?.filesizeText || '320kbps'}
                      </p>
                    </div>
                  </div>
                  <span className="clay-badge bg-emerald-100 text-emerald-800 text-[10px]">
                    Siap Unduh
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full sm:flex-1 clay-button clay-button-purple py-4 text-sm font-black text-white flex items-center justify-center gap-2 shadow-clay-purple disabled:opacity-60"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{downloadProgress || 'Memproses Unduhan...'}</span>
                </>
              ) : (
                <>
                  <DownloadCloud className="w-5 h-5" />
                  <span>
                    Download {selectedFormatType === 'video' ? `Video (${selectedQuality.toUpperCase()})` : 'Audio (MP3)'} Sekarang
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full sm:w-auto clay-button clay-button-white px-5 py-4 text-xs font-bold text-claySlate-700 flex items-center justify-center gap-1.5"
              title="Salin Tautan Stream/Media"
            >
              <Copy className="w-4 h-4 text-clayPurple" />
              <span>Salin Link</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
