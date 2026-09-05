import React from 'react';
import { Zap, ShieldCheck, Gift, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal.jsx';

export default function FeatureHighlights() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-clayPurple-dark" />,
      bgIcon: 'bg-clayPurple-light/70',
      shadow: 'hover:shadow-clay-purple',
      title: 'Ultra Cepat & Ringan',
      desc: 'Pemrosesan instan di sisi browser dan arsitektur serverless modern. Tanpa buffering atau waktu tunggu yang membosankan.',
      highlights: ['Ekstraksi kilat', 'Real-time preview', 'Tanpa bloatware']
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-800" />,
      bgIcon: 'bg-clayGreen-light/70',
      shadow: 'hover:shadow-clay-green',
      title: '100% Tanpa Iklan',
      desc: 'Fokus penuh pada fungsionalitas murni. Pengalaman bebas gangguan dari banner iklan berbahaya, pop-up, atau pelacak.',
      highlights: ['Bebas pop-up', 'Privasi terlindungi', 'Antarmuka bersih']
    },
    {
      icon: <Gift className="w-6 h-6 text-orange-800" />,
      bgIcon: 'bg-clayOrange-light/70',
      shadow: 'hover:shadow-clay-orange',
      title: 'Gratis & Terbuka',
      desc: 'Semua alat dan modul utilitas dapat digunakan secara cuma-cuma tanpa perlu registrasi berbayar atau batasan kuota harian.',
      highlights: ['Akses tak terbatas', 'Download kualitas tinggi', 'Siap pakai']
    }
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <ScrollReveal animation="fade-up">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-claySlate-900 tracking-tight mb-3">
            Kenapa Memilih <span className="text-clayPurple">KuroTools</span>?
          </h2>
          <p className="text-sm text-claySlate-500 font-medium">
            Dirancang khusus untuk menghadirkan kenyamanan dan kecepatan dalam rutinitas digital harian Anda.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item, idx) => (
          <ScrollReveal 
            key={idx} 
            animation="clay-pop" 
            delay={idx * 150}
            className="h-full"
          >
            <div 
              className={`clay-card p-8 h-full flex flex-col justify-between group hover:-translate-y-2 cursor-pointer transition-all duration-300 ${item.shadow}`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl ${item.bgIcon} flex items-center justify-center mb-6 shadow-clay-pill group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>

                <h3 className="text-xl font-black text-claySlate-800 mb-3 group-hover:text-clayPurple transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-claySlate-600 leading-relaxed mb-6 font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-claySlate-100">
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-claySlate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

