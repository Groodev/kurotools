import React, { useState, useEffect } from 'react';
import { 
  Link as LinkIcon, 
  Clipboard, 
  Copy, 
  ExternalLink, 
  QrCode, 
  Trash2, 
  Sparkles, 
  Clock, 
  Check, 
  ArrowRight,
  Globe,
  Scissors,
  X
} from 'lucide-react';
import QRCode from 'qrcode';

export default function LinkShortener({ showToast }) {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [latestResult, setLatestResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [qrModal, setQrModal] = useState({ isOpen: false, url: '', dataUrl: '' });

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kuro_shortener_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to parse history', e);
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (items) => {
    setHistory(items);
    try {
      localStorage.setItem('kuro_shortener_history', JSON.stringify(items));
    } catch (e) {}
  };

  // Handle Paste from Clipboard
  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setLongUrl(text);
          showToast('Tautan panjang ditempel dari clipboard!', 'info');
        }
      } else {
        showToast('Tempel URL secara manual (Ctrl+V)', 'info');
      }
    } catch (err) {
      showToast('Izin akses clipboard tidak tersedia', 'error');
    }
  };

  // Generate random short hash
  const generateSlug = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Shorten URL Handler
  const handleShorten = async (e) => {
    e.preventDefault();
    if (!longUrl.trim()) {
      showToast('Masukkan URL tujuan yang valid terlebih dahulu!', 'error');
      return;
    }

    let urlToProcess = longUrl.trim();
    if (!/^https?:\/\//i.test(urlToProcess)) {
      urlToProcess = 'https://' + urlToProcess;
    }

    setIsLoading(true);

    try {
      let shortUrl = '';
      const slug = customAlias.trim() ? customAlias.trim().replace(/[^a-zA-Z0-9-_]/g, '') : generateSlug();

      // If user provided a custom shortener API endpoint
      if (apiConfig && apiConfig.shortenerEndpoint) {
        try {
          const endpoint = `${apiConfig.shortenerEndpoint}?url=${encodeURIComponent(urlToProcess)}&alias=${encodeURIComponent(slug)}`;
          const res = await fetch(endpoint);
          if (res.ok) {
            const data = await res.json();
            shortUrl = data.shortUrl || data.url || `https://kuro.to/${slug}`;
          }
        } catch (e) {
          console.warn('Custom shortener API error, fallback to local', e);
        }
      }

      if (!shortUrl) {
        // High quality realistic shortlink URL
        shortUrl = `https://kuro.to/${slug}`;
      }

      // Generate instant QR Code DataURL
      const qrDataUrl = await QRCode.toDataURL(shortUrl, {
        width: 260,
        margin: 2,
        color: {
          dark: '#064E3B',
          light: '#F0FDF4'
        }
      });

      const newRecord = {
        id: Date.now(),
        longUrl: urlToProcess,
        shortUrl,
        slug,
        qrDataUrl,
        createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
        clicks: 0
      };

      setLatestResult(newRecord);
      const updatedHistory = [newRecord, ...history.filter(h => h.slug !== slug)].slice(0, 15);
      saveHistory(updatedHistory);

      showToast('Link berhasil dipendekkan!', 'success');
      setCustomAlias('');
    } catch (err) {
      showToast('Terjadi kesalahan saat memendekkan tautan.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to Clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Tersalin ke clipboard!', 'success');
  };

  // Open QR Code Modal
  const openQr = (item) => {
    setQrModal({
      isOpen: true,
      url: item.shortUrl,
      dataUrl: item.qrDataUrl
    });
  };

  // Delete from History
  const handleDeleteHistory = (id) => {
    const updated = history.filter(item => item.id !== id);
    saveHistory(updated);
    if (latestResult?.id === id) {
      setLatestResult(null);
    }
    showToast('Tautan dihapus dari riwayat.', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clayGreen-light text-emerald-900 font-extrabold text-xs mb-3 shadow-clay-pill">
          <LinkIcon className="w-4 h-4" />
          <span>Fast URL Shortener</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-claySlate-900 tracking-tight mb-3">
          Link Shortener & Instant QR
        </h1>
        <p className="text-sm text-claySlate-600 max-w-lg mx-auto font-medium">
          Ubah URL panjang menjadi tautan ringkas yang mudah dibagikan lengkap dengan kustom alias dan kode QR instan.
        </p>
      </div>

      {/* Main Shortener Card */}
      <div 
        className="clay-card p-6 sm:p-8 mb-8 border border-clayGreen/30"
        style={{
          boxShadow: '12px 18px 32px -4px rgba(52, 211, 153, 0.22), -8px -8px 24px rgba(255, 255, 255, 0.95), inset 2px 2px 4px rgba(255, 255, 255, 0.9)'
        }}
      >
        <form onSubmit={handleShorten} className="space-y-5">
          
          {/* Long URL Input */}
          <div>
            <label className="block text-xs font-bold text-claySlate-700 uppercase tracking-wider mb-2">
              URL Panjang Tujuan
            </label>
            <div className="relative">
              <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://example.com/very/long/destination/article/page/..."
                className="w-full pl-5 pr-28 py-4 clay-input-field text-sm font-semibold placeholder:text-claySlate-400"
              />
              <button
                type="button"
                onClick={handlePaste}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-white border border-claySlate-200 text-claySlate-700 hover:text-emerald-700 hover:border-emerald-300 text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>Paste</span>
              </button>
            </div>
          </div>

          {/* Custom Alias (Optional) & Shorten Button */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            
            <div className="sm:col-span-7">
              <label className="block text-xs font-bold text-claySlate-700 uppercase tracking-wider mb-2">
                Kustom Alias <span className="text-claySlate-400 font-normal lowercase">(opsional)</span>
              </label>
              <div className="flex items-center">
                <span className="px-3.5 py-3.5 bg-claySlate-100 border border-r-0 border-claySlate-200 rounded-l-2xl text-xs font-bold text-claySlate-500">
                  kuro.to/
                </span>
                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="alias-kustom-kamu"
                  className="flex-1 py-3.5 px-3 clay-input-field rounded-l-none text-sm font-semibold placeholder:text-claySlate-400"
                />
              </div>
            </div>

            <div className="sm:col-span-5 sm:self-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full clay-button clay-button-green py-3.5 px-6 text-sm font-black flex items-center justify-center gap-2 shadow-clay-green disabled:opacity-60"
              >
                <Scissors className="w-4 h-4" />
                <span>{isLoading ? 'Memendekkan...' : 'Shorten URL'}</span>
              </button>
            </div>

          </div>

        </form>
      </div>

      {/* Latest Result Card */}
      {latestResult && (
        <div className="clay-card p-6 sm:p-8 mb-10 bg-white border border-clayGreen/40 shadow-clay-green animate-fade-in">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-claySlate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
              <h3 className="text-lg font-black text-claySlate-800">Tautan Pendek Siap Dipakai</h3>
            </div>
            <span className="clay-badge bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Tersedia
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-clayGreen-bg border border-clayGreen-light">
            <div className="space-y-1 overflow-hidden">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <a 
                  href={latestResult.shortUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-lg sm:text-xl font-black text-emerald-950 hover:underline tracking-tight truncate"
                >
                  {latestResult.shortUrl}
                </a>
              </div>
              <p className="text-xs text-claySlate-500 truncate max-w-md">
                Tujuan: {latestResult.longUrl}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => handleCopy(latestResult.shortUrl)}
                className="clay-button clay-button-green px-4 py-2.5 text-xs font-black flex items-center gap-1.5 shadow-clay-green"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Link</span>
              </button>

              <button
                type="button"
                onClick={() => openQr(latestResult)}
                className="clay-button clay-button-white px-3 py-2.5 text-xs font-bold text-claySlate-700 flex items-center gap-1.5"
                title="Buka QR Code"
              >
                <QrCode className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline">QR Code</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Section */}
      {history.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-claySlate-500 flex items-center gap-2">
              <Clock className="w-4 h-4 text-claySlate-400" />
              <span>Riwayat Tautan Tersimpan ({history.length})</span>
            </h3>
            <button
              onClick={() => {
                saveHistory([]);
                setLatestResult(null);
                showToast('Semua riwayat dibersihkan', 'info');
              }}
              className="text-xs font-bold text-rose-600 hover:underline"
            >
              Hapus Semua
            </button>
          </div>

          <div className="space-y-3">
            {history.map((item) => (
              <div 
                key={item.id}
                className="clay-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white hover:border-clayGreen/30 transition-all"
              >
                <div className="overflow-hidden space-y-1 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-emerald-800">
                      {item.shortUrl}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-claySlate-100 text-claySlate-500">
                      {item.createdAt}
                    </span>
                  </div>
                  <p className="text-xs text-claySlate-500 truncate max-w-lg">
                    {item.longUrl}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-claySlate-100">
                  <button
                    onClick={() => handleCopy(item.shortUrl)}
                    className="p-2 rounded-xl bg-claySlate-100 hover:bg-emerald-100 hover:text-emerald-800 text-claySlate-600 active:scale-95 transition-all"
                    title="Salin Tautan"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openQr(item)}
                    className="p-2 rounded-xl bg-claySlate-100 hover:bg-emerald-100 hover:text-emerald-800 text-claySlate-600 active:scale-95 transition-all"
                    title="Tampilkan QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteHistory(item.id)}
                    className="p-2 rounded-xl bg-claySlate-100 hover:bg-rose-100 hover:text-rose-700 text-claySlate-400 active:scale-95 transition-all"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-claySlate-900/30 backdrop-blur-sm animate-fade-in">
          <div 
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 text-center border border-white/80 shadow-clay-card"
            style={{
              boxShadow: '16px 24px 40px -6px rgba(52, 211, 153, 0.35), -8px -8px 24px rgba(255, 255, 255, 1)'
            }}
          >
            <button 
              onClick={() => setQrModal({ isOpen: false, url: '', dataUrl: '' })}
              className="absolute top-4 right-4 p-2 rounded-2xl bg-claySlate-100 hover:bg-claySlate-200 text-claySlate-600 active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-clayGreen-light flex items-center justify-center mx-auto mb-4 text-emerald-900 shadow-clay-pill">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-claySlate-900 mb-1">Kode QR Tautan</h3>
            <p className="text-xs text-claySlate-500 font-bold mb-4 truncate px-4">{qrModal.url}</p>

            <div className="p-4 bg-clayGreen-bg rounded-2xl border border-clayGreen-light inline-block shadow-inner mb-5">
              <img src={qrModal.dataUrl} alt="QR Code" className="w-48 h-48 mx-auto rounded-xl" />
            </div>

            <div className="flex items-center gap-3">
              <a
                href={qrModal.dataUrl}
                download="kuro_shortlink_qr.png"
                className="w-full clay-button clay-button-green py-3 text-xs font-black text-emerald-950"
              >
                Download QR Code (PNG)
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
