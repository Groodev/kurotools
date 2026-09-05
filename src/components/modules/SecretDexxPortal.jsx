import React, { useState } from 'react';
import { 
  Gamepad2, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Code2, 
  Search, 
  CheckCircle2, 
  Terminal, 
  Flame, 
  Layers, 
  Zap, 
  ArrowRight,
  Copy,
  Check,
  Star
} from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal.jsx';

export default function SecretDexxPortal({ showToast }) {
  const [copiedScript, setCopiedScript] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const featuredGames = [
    {
      title: 'Blox Fruits',
      category: 'Anime RPG & Adventure',
      badge: '🔥 Paling Populer',
      scriptsCount: '120+ Scripts',
      desc: 'Auto Farm, Fruit Sniper, Auto Quest, Teleport, ESP & Dungeon Raid support.',
      sampleSnippet: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/secretdex/bloxfruits/main.lua"))()'
    },
    {
      title: 'Da Hood',
      category: 'PVP & City Survival',
      badge: '⚡ Keyless',
      scriptsCount: '85+ Scripts',
      desc: 'Lock Aim, Silent Aim, Auto Stomp, Speed Boost, Anti-Lock, & Money Farm.',
      sampleSnippet: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/secretdex/dahood/aimlock.lua"))()'
    },
    {
      title: 'Blade Ball',
      category: 'Action & Deflection',
      badge: '🛡️ Auto Parry',
      scriptsCount: '60+ Scripts',
      desc: 'Auto Parry Perfect Curve, Fast Attack, Ball ESP, Manual Spam & Custom Curve.',
      sampleSnippet: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/secretdex/bladeball/autoparry.lua"))()'
    },
    {
      title: 'Pet Simulator 99',
      category: 'Tycoon & Collection',
      badge: '💎 Auto Farm',
      scriptsCount: '90+ Scripts',
      desc: 'Fast Breakable Coins, Auto Hatch, Huge Hunter, Auto Fishing & Area Teleport.',
      sampleSnippet: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/secretdex/petsim99/autofarm.lua"))()'
    }
  ];

  const filteredGames = featuredGames.filter(g => 
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (snippet, gameTitle) => {
    navigator.clipboard.writeText(snippet);
    setCopiedScript(gameTitle);
    showToast?.(`Script untuk ${gameTitle} berhasil disalin ke clipboard!`, 'success');
    setTimeout(() => setCopiedScript(null), 2500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Banner Showcase */}
      <div className="clay-card p-6 sm:p-10 bg-gradient-to-br from-emerald-50/70 via-teal-50/50 to-cyan-50/70 border border-emerald-200/60 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-black">
              <Gamepad2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Project Unggulan Komunitas</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-claySlate-900 tracking-tight flex flex-wrap items-center gap-3">
              <span>SecretDexx</span>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold shadow-sm">
                🎮 Roblox Script Hub
              </span>
            </h1>

            <p className="text-sm sm:text-base text-claySlate-700 font-semibold leading-relaxed">
              <strong>Discover and explore the best scripts for your favorite games.</strong>
            </p>

            <p className="text-xs sm:text-sm text-claySlate-500 font-medium leading-relaxed">
              Direktori script game Roblox terlengkap dan selalu terupdate. Menyediakan ribuan script aktif, terverifikasi, keyless, dan aman yang dapat langsung digunakan pada executor favorit Anda.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://secretdexx.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-button clay-button-green py-3.5 px-6 text-xs sm:text-sm font-black flex items-center gap-2 shadow-clay-green"
              >
                <span>Kunjungi Web SecretDexx</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://secretdexx.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-button py-3.5 px-5 text-xs font-black bg-white/90 hover:bg-white text-claySlate-800 border border-claySlate-200 flex items-center gap-2 shadow-sm"
              >
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cari 500+ Script Online</span>
              </a>
            </div>
          </div>

          {/* Quick Stats Pillar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3.5 w-full lg:w-72">
            <div className="clay-card p-4 bg-white/95 border border-emerald-100 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-claySlate-900">500+</div>
                <div className="text-[11px] font-bold text-claySlate-500">Scripts Available</div>
              </div>
            </div>

            <div className="clay-card p-4 bg-white/95 border border-emerald-100 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700 font-black">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-claySlate-900">10k+</div>
                <div className="text-[11px] font-bold text-claySlate-500">Active Users</div>
              </div>
            </div>

            <div className="clay-card p-4 bg-white/95 border border-emerald-100 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-claySlate-900">Trusted</div>
                <div className="text-[11px] font-bold text-claySlate-500">Reliable & Keyless</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Script Showcase Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-claySlate-900 tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span>Koleksi Script Game Populer</span>
            </h2>
            <p className="text-xs sm:text-sm text-claySlate-500 font-medium mt-0.5">
              Pratinjau script game Roblox terpopuler dari SecretDexx yang siap disalin.
            </p>
          </div>

          {/* Search bar inside showcase */}
          <div className="w-full sm:w-72">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter game (Blox Fruits, Da Hood...)"
                className="w-full clay-input-field text-xs py-2.5 pl-9 pr-3"
              />
              <Search className="w-4 h-4 text-claySlate-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGames.map((game, i) => (
            <div
              key={i}
              className="clay-card p-6 sm:p-7 border border-claySlate-200/90 hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                      {game.category}
                    </span>
                    <h3 className="text-xl font-black text-claySlate-900 mt-1.5 group-hover:text-emerald-700 transition-colors">
                      {game.title}
                    </h3>
                  </div>
                  <span className="clay-badge text-[10px] font-black bg-white text-claySlate-700 shadow-sm">
                    {game.badge}
                  </span>
                </div>

                <p className="text-xs text-claySlate-600 font-medium leading-relaxed">
                  {game.desc}
                </p>

                {/* Code container */}
                <div className="relative bg-claySlate-900 rounded-xl p-3 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-claySlate-800">
                  <div className="pr-16 truncate">
                    {game.sampleSnippet}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(game.sampleSnippet, game.title)}
                    className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-[10px] font-extrabold flex items-center gap-1 transition shadow-sm"
                  >
                    {copiedScript === game.title ? (
                      <>
                        <Check className="w-3 h-3 text-white" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-claySlate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-claySlate-400">
                  {game.scriptsCount}
                </span>
                <a
                  href="https://secretdexx.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <span>Buka di SecretDexx</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Highlights of SecretDexx */}
      <div className="clay-card p-6 sm:p-8 border border-claySlate-200">
        <h3 className="text-lg font-black text-claySlate-900 mb-6 text-center">
          Mengapa Menggunakan SecretDexx?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center space-y-2 p-4 rounded-2xl bg-white/60 border border-claySlate-100">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-claySlate-800">Cepat & Keyless</h4>
            <p className="text-xs text-claySlate-500 leading-relaxed font-medium">
              Banyak pilihan script tanpa sistem checkpoint key yang rumit. Langsung salin dan eksekusi.
            </p>
          </div>

          <div className="text-center space-y-2 p-4 rounded-2xl bg-white/60 border border-claySlate-100">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-claySlate-800">Status Terverifikasi</h4>
            <p className="text-xs text-claySlate-500 leading-relaxed font-medium">
              Setiap script dilengkapi tag status <em>Verified</em>, <em>Active</em>, atau <em>Patched</em> agar Anda terhindar dari script usang.
            </p>
          </div>

          <div className="text-center space-y-2 p-4 rounded-2xl bg-white/60 border border-claySlate-100">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-black">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-claySlate-800">Integrasi API Luas</h4>
            <p className="text-xs text-claySlate-500 leading-relaxed font-medium">
              Terhubung langsung dengan database ScriptBlox API untuk memastikan ketersediaan ribuan judul game Roblox.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 pt-6 border-t border-claySlate-200 text-center">
          <a
            href="https://secretdexx.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 clay-button clay-button-green py-3 px-8 text-xs sm:text-sm font-black shadow-clay-green"
          >
            <span>Buka Website Resmi SecretDexx</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
