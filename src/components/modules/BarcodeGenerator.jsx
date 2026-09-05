import React, { useState, useEffect, useRef } from 'react';
import { 
  QrCode, 
  Barcode as BarcodeIcon, 
  Download, 
  Sparkles, 
  Palette, 
  Check, 
  Sliders, 
  RefreshCw,
  Copy,
  Layers
} from 'lucide-react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';

export default function BarcodeGenerator({ showToast }) {
  const [text, setText] = useState('https://kurotools.com');
  const [codeType, setCodeType] = useState('qr'); // 'qr' | 'barcode'
  const [fgColor, setFgColor] = useState('#1E293B');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [errorLevel, setErrorLevel] = useState('M'); // 'L' | 'M' | 'Q' | 'H'
  const [barcodeHeight, setBarcodeHeight] = useState(70);
  const [showBarcodeText, setShowBarcodeText] = useState(true);

  const canvasRef = useRef(null);
  const svgContainerRef = useRef(null);

  // Preset Pastel Colors from KuroTools Design System
  const presetColors = [
    { name: 'Dark Slate', hex: '#1E293B' },
    { name: 'Soft Purple', hex: '#A855F7' },
    { name: 'Mint Green', hex: '#059669' },
    { name: 'Clay Orange', hex: '#EA580C' },
    { name: 'Sky Blue', hex: '#0284C7' },
  ];

  const presetBgColors = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Off-White', hex: '#F8FAFC' },
    { name: 'Light Purple', hex: '#FAF5FF' },
    { name: 'Light Green', hex: '#F0FDF4' },
    { name: 'Light Orange', hex: '#FFF7ED' },
  ];

  // Render Code to Canvas
  useEffect(() => {
    if (!text.trim() || !canvasRef.current) return;

    if (codeType === 'qr') {
      QRCode.toCanvas(
        canvasRef.current,
        text,
        {
          width: 320,
          margin: 2,
          errorCorrectionLevel: errorLevel,
          color: {
            dark: fgColor,
            light: bgColor === 'transparent' ? '#00000000' : bgColor,
          },
        },
        (error) => {
          if (error) console.error('QR code generation error', error);
        }
      );
    } else {
      try {
        JsBarcode(canvasRef.current, text, {
          format: 'CODE128',
          lineColor: fgColor,
          background: bgColor === 'transparent' ? '#ffffff' : bgColor,
          height: barcodeHeight,
          displayValue: showBarcodeText,
          font: 'Plus Jakarta Sans, sans-serif',
          fontSize: 14,
          margin: 15,
          width: 2,
        });
      } catch (err) {
        console.warn('Barcode render error (likely invalid character for standard format)', err);
      }
    }
  }, [text, codeType, fgColor, bgColor, errorLevel, barcodeHeight, showBarcodeText]);

  // Download PNG file
  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `kuro_${codeType}_${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Berhasil mengunduh ${codeType.toUpperCase()} (PNG)!`, 'success');
    } catch (e) {
      showToast('Gagal mengunduh gambar PNG.', 'error');
    }
  };

  // Download SVG file
  const handleDownloadSVG = async () => {
    try {
      if (codeType === 'qr') {
        const svgString = await QRCode.toString(text, {
          type: 'svg',
          margin: 2,
          errorCorrectionLevel: errorLevel,
          color: {
            dark: fgColor,
            light: bgColor === 'transparent' ? '#00000000' : bgColor,
          },
        });
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kuro_qr_${Date.now()}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Generate Barcode SVG
        const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        JsBarcode(svgNode, text, {
          format: 'CODE128',
          lineColor: fgColor,
          background: bgColor === 'transparent' ? '#ffffff' : bgColor,
          height: barcodeHeight,
          displayValue: showBarcodeText,
        });
        const xml = new XMLSerializer().serializeToString(svgNode);
        const blob = new Blob([xml], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kuro_barcode_${Date.now()}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      showToast(`Berhasil mengunduh vektor ${codeType.toUpperCase()} (SVG)!`, 'success');
    } catch (e) {
      showToast('Gagal membuat file SVG vektor.', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clayOrange-light text-orange-900 font-extrabold text-xs mb-3 shadow-clay-pill">
          <QrCode className="w-4 h-4" />
          <span>Real-Time Code Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-claySlate-900 tracking-tight mb-3">
          Barcode & QR Code Generator
        </h1>
        <p className="text-sm text-claySlate-600 max-w-lg mx-auto font-medium">
          Hasilkan kode QR 2D dan Barcode 1D (Code128) resolusi tajam dengan palet warna pastel claymorphism kustom.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Controls & Customization */}
        <div 
          className="lg:col-span-7 clay-card p-6 sm:p-8 space-y-6 border border-clayOrange/20"
          style={{
            boxShadow: '12px 18px 32px -4px rgba(251, 146, 60, 0.22), -8px -8px 24px rgba(255, 255, 255, 0.95), inset 2px 2px 4px rgba(255, 255, 255, 0.9)'
          }}
        >
          {/* Type Toggle: QR Code vs Barcode */}
          <div>
            <label className="block text-xs font-bold text-claySlate-700 uppercase tracking-wider mb-2">
              Pilih Jenis Kode
            </label>
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-claySlate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setCodeType('qr')}
                className={`py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
                  codeType === 'qr'
                    ? 'bg-clayOrange text-white shadow-clay-orange'
                    : 'text-claySlate-600 hover:text-claySlate-900'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>QR Code (2D)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCodeType('barcode');
                  if (text.length > 30) setText('KURO-123456');
                }}
                className={`py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
                  codeType === 'barcode'
                    ? 'bg-clayOrange text-white shadow-clay-orange'
                    : 'text-claySlate-600 hover:text-claySlate-900'
                }`}
              >
                <BarcodeIcon className="w-4 h-4" />
                <span>Barcode 1D (Code128)</span>
              </button>
            </div>
          </div>

          {/* Text / URL Input */}
          <div>
            <label className="block text-xs font-bold text-claySlate-700 uppercase tracking-wider mb-2">
              {codeType === 'qr' ? 'Teks atau Tautan URL' : 'Teks atau Nomor Barcode'}
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={codeType === 'qr' ? 'Ketik teks atau tautan web...' : 'Ketik karakter barcode (misal KURO-8899)...'}
              className="w-full px-4 py-3.5 clay-input-field text-sm font-semibold"
            />
            {codeType === 'barcode' && text.length > 40 && (
              <p className="text-[11px] text-orange-600 mt-1 font-bold">
                ⚠️ Disarankan teks barcode di bawah 30 karakter agar mudah terbaca pemindai optik.
              </p>
            )}
          </div>

          {/* Color Customization: Pastel Palette */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-claySlate-700 uppercase tracking-wider">
                Warna Titik / Garis
              </label>
              <span className="text-[11px] font-mono text-claySlate-500 font-bold">{fgColor}</span>
            </div>

            <div className="flex items-center gap-3">
              {presetColors.map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => setFgColor(color.hex)}
                  title={color.name}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md active:scale-90 transition-transform ${
                    fgColor.toLowerCase() === color.hex.toLowerCase() ? 'ring-3 ring-offset-2 ring-clayOrange' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {fgColor.toLowerCase() === color.hex.toLowerCase() && (
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-9 h-9 p-0.5 rounded-xl border border-claySlate-200 cursor-pointer bg-white"
                title="Warna kustom"
              />
            </div>
          </div>

          {/* Background Color Picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-claySlate-700 uppercase tracking-wider">
                Warna Latar Belakang
              </label>
              <span className="text-[11px] font-mono text-claySlate-500 font-bold">{bgColor}</span>
            </div>

            <div className="flex items-center gap-3">
              {presetBgColors.map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => setBgColor(color.hex)}
                  title={color.name}
                  className={`w-9 h-9 rounded-xl border border-claySlate-200 flex items-center justify-center shadow-sm active:scale-90 transition-transform ${
                    bgColor.toLowerCase() === color.hex.toLowerCase() ? 'ring-3 ring-offset-2 ring-clayOrange' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {bgColor.toLowerCase() === color.hex.toLowerCase() && (
                    <Check className="w-4 h-4 text-claySlate-800" />
                  )}
                </button>
              ))}
              <input
                type="color"
                value={bgColor === 'transparent' ? '#ffffff' : bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-9 h-9 p-0.5 rounded-xl border border-claySlate-200 cursor-pointer bg-white"
                title="Background kustom"
              />
            </div>
          </div>

          {/* Advanced options depending on type */}
          {codeType === 'qr' ? (
            <div>
              <label className="block text-xs font-bold text-claySlate-700 uppercase tracking-wider mb-2">
                Error Correction Level
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['L', 'M', 'Q', 'H'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setErrorLevel(lvl)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      errorLevel === lvl 
                        ? 'bg-clayOrange/10 border-clayOrange text-clayOrange font-black' 
                        : 'bg-claySlate-50 border-claySlate-200 text-claySlate-600'
                    }`}
                  >
                    Level {lvl}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-claySlate-700 mb-1">
                  <span>Tinggi Barcode</span>
                  <span>{barcodeHeight}px</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={barcodeHeight}
                  onChange={(e) => setBarcodeHeight(Number(e.target.value))}
                  className="w-full accent-clayOrange cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-claySlate-50 border border-claySlate-100">
                <span className="text-xs font-bold text-claySlate-700">Tampilkan Teks di Bawah</span>
                <input
                  type="checkbox"
                  checked={showBarcodeText}
                  onChange={(e) => setShowBarcodeText(e.target.checked)}
                  className="w-4 h-4 accent-clayOrange cursor-pointer"
                />
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Real-Time Canvas Preview & Downloads */}
        <div className="lg:col-span-5 space-y-6">
          <div 
            className="clay-card p-6 sm:p-8 text-center bg-white border border-clayOrange/30 shadow-clay-orange"
          >
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-claySlate-100">
              <span className="text-xs font-black uppercase tracking-wider text-claySlate-500">
                Real-Time Preview
              </span>
              <span className="clay-badge bg-clayOrange-light text-orange-900 text-[10px]">
                {codeType === 'qr' ? '2D Matrix' : '1D Barcode'}
              </span>
            </div>

            {/* Live Canvas Area */}
            <div 
              className="p-6 rounded-3xl border border-claySlate-100 inline-block mx-auto max-w-full overflow-hidden transition-all"
              style={{
                backgroundColor: bgColor === 'transparent' ? '#FFFFFF' : bgColor,
                boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.04), 4px 6px 16px rgba(148, 163, 184, 0.15)'
              }}
            >
              <canvas ref={canvasRef} className="mx-auto max-w-full h-auto rounded-xl"></canvas>
            </div>

            <p className="mt-4 text-xs text-claySlate-400 font-medium">
              Pratinjau diperbarui secara langsung saat Anda mengetik
            </p>

            {/* Download Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-6 mt-4 border-t border-claySlate-100">
              <button
                type="button"
                onClick={handleDownloadPNG}
                className="clay-button clay-button-orange py-3.5 px-4 text-xs font-black text-white flex items-center justify-center gap-1.5 shadow-clay-orange"
              >
                <Download className="w-4 h-4" />
                <span>Unduh PNG</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadSVG}
                className="clay-button clay-button-white py-3.5 px-4 text-xs font-bold text-claySlate-700 flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-clayOrange" />
                <span>Unduh SVG</span>
              </button>
            </div>

          </div>

          {/* Quick Tips Pill */}
          <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-100 text-xs text-orange-950 font-medium flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
            <p>
              Gunakan format <strong>SVG</strong> untuk cetakan spanduk atau vektor berukuran besar tanpa pecah, atau <strong>PNG</strong> untuk dibagikan ke media sosial.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
