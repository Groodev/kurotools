// app.js
// ---------------------------------------------------------------------
// KuroTrack Core Fetcher
// Diperbarui untuk fokus pada core feature menggunakan API pihak ketiga.
// Script ini menyesuaikan selector dengan HTML Tailwind desktop & mobile.
// ---------------------------------------------------------------------

// 1. Mengambil elemen input dan tombol dari DOM
const input = document.querySelector('input[placeholder*="URL"]');
const buttons = document.querySelectorAll('button');
const processBtn = Array.from(buttons).find(btn => btn.textContent.includes('Process URL'));

// 2. Mengambil elemen UI Music Player untuk menampilkan hasil
const musicPlayer = document.getElementById('music-player');
const trackTitleUI = musicPlayer ? musicPlayer.querySelector('.text-white.truncate') : null;
const trackArtistUI = musicPlayer ? musicPlayer.querySelector('.text-primary.truncate') : null;

// 3. Event Listeners
if (processBtn) {
    processBtn.addEventListener('click', handleProcess);
}

if (input) {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleProcess(e);
    });
}

// 4. Logika Core Feature
async function handleProcess(event) {
    if (event) event.preventDefault();

    const query = input.value.trim();
    if (!query) {
        setState('error', 'Masukkan URL Spotify terlebih dahulu.');
        return;
    }

    // Validasi URL sederhana
    if (!query.includes('spotify.com')) {
        setState('error', 'URL tidak valid. Pastikan itu adalah link dari Spotify.');
        return;
    }

    setState('loading');

    try {
        // Integrasi API Pihak Ketiga
        const encodedUrl = encodeURIComponent(query);
        const apiUrl = `https://api.synoxcloud.xyz/download/spotify?url=${encodedUrl}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Request failed (status ${response.status})`);
        }

        const data = await response.json();
        
        // Memastikan data tidak kosong
        if (!data) {
            setState('error', 'Track tidak ditemukan atau gagal diproses.');
            return;
        }

        setState('success', data);
    } catch (err) {
        setState('error', err.message || 'Terjadi kesalahan saat mengambil data dari server.');
    }
}

// 5. State Management UI
function setState(state, payload) {
    if (state === 'loading') {
        if (processBtn) {
            processBtn.disabled = true;
            processBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span><span>Processing...</span>';
            processBtn.classList.add('opacity-75', 'cursor-not-allowed');
        }
        return;
    }

    // Reset tombol ke bentuk semula
    if (processBtn) {
        processBtn.disabled = false;
        processBtn.innerHTML = '<span class="material-symbols-outlined">settings</span><span>Process URL</span>';
        processBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    }

    if (state === 'success') {
        bindTrack(payload);
        
        // Menampilkan floating player jika kondisinya sedang tersembunyi
        if (musicPlayer && musicPlayer.classList.contains('opacity-0')) {
            musicPlayer.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4', 'hidden');
            musicPlayer.classList.add('opacity-100', 'translate-y-0');
        }
    }

    if (state === 'error') {
        // Karena UI error belum ada di HTML, fallback sementara menggunakan alert 
        // (UI/UX detail bisa dikembangkan nanti)
        console.error('KuroTrack Error:', payload);
        alert(`Error: ${payload}`); 
    }
}

// 6. Bind Data ke HTML
function bindTrack(track) {
    // Menyesuaikan dengan struktur kembalian (response) dari API Synoxcloud
    // Ganti 'track.title' atau 'track.artist' dengan key JSON yang sebenarnya dari API tersebut
    
    if (trackTitleUI) {
        trackTitleUI.textContent = track.title || track.name || 'Unknown Track';
    }
    
    if (trackArtistUI) {
        trackArtistUI.textContent = track.artist || track.author || 'KuroTrack Extraction';
    }

    // Log URL audio/download ke console agar bisa digunakan oleh logika Audio Player nantinya
    const downloadUrl = track.url || track.download || track.link;
    if (downloadUrl) {
        console.log('🔗 Audio Source Ready:', downloadUrl);
        // Persiapan untuk sistem play/pause audio di masa depan
        // window.currentAudio = new Audio(downloadUrl);
    }
}
