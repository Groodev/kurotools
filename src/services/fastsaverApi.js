/**
 * FastSaver API Service Integration
 * Documentation: https://api.fastsaver.io/docs#fetch
 */

export const FASTSAVER_DEFAULT_KEY = import.meta.env?.VITE_FASTSAVER_API_KEY || "";
export const FASTSAVER_BASE_URL = "https://api.fastsaver.io/v1";

/**
 * Format bytes to human readable format (MB, KB)
 */
export function formatBytes(bytes) {
  if (!bytes || isNaN(bytes)) return null;
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) {
    return `${mb.toFixed(1)} MB`;
  }
  const kb = bytes / 1024;
  return `${kb.toFixed(0)} KB`;
}

/**
 * Format seconds to MM:SS
 */
export function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return null;
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Helper to execute API requests with automatic fallback
 * The proxy route (/api/fastsaver/...) securely attaches credentials on the server.
 */
async function apiRequest(path, options = {}, apiKey = FASTSAVER_DEFAULT_KEY) {
  const key = apiKey || FASTSAVER_DEFAULT_KEY;
  const headers = {
    ...(key ? { "Authorization": `Bearer ${key}`, "x-api-key": key } : {}),
    ...(options.headers || {})
  };

  // Try 1: Local Vite proxy / Netlify rewrite route (/api/fastsaver/...)
  try {
    const proxyUrl = `/api/fastsaver${path}`;
    const res = await fetch(proxyUrl, {
      ...options,
      headers
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Continue to direct URL
  }

  // Try 2: Direct API URL (https://api.fastsaver.io/v1/...)
  try {
    const directUrl = `${FASTSAVER_BASE_URL}${path}`;
    const res = await fetch(directUrl, {
      ...options,
      headers
    });
    if (res.ok) {
      return await res.json();
    }
    const errText = await res.text();
    let parsedErr = {};
    try { parsedErr = JSON.parse(errText); } catch (_) {}
    throw new Error(parsedErr.detail || parsedErr.message || `API Error (${res.status})`);
  } catch (err) {
    // If TypeError (CORS blocked in standalone browser), try via CORS proxy
    if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
      try {
        const targetUrl = `${FASTSAVER_BASE_URL}${path}`;
        const corsGateway = `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`;
        const res = await fetch(corsGateway, {
          ...options,
          headers
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (corsErr) {
        console.warn('CORS gateway fallback failed', corsErr);
      }
    }
    throw err;
  }
}

/**
 * Fetch and analyze media info from FastSaver API
 * Supports YouTube, TikTok, Instagram, Twitter, etc.
 */
export async function fetchFastsaverMedia(url, customApiKey) {
  if (!url) throw new Error("URL tidak boleh kosong");
  const trimmedUrl = url.trim();
  const lower = trimmedUrl.toLowerCase();
  const isYouTube = lower.includes('youtube.com') || lower.includes('youtu.be');

  if (isYouTube) {
    // 1. YouTube info endpoint
    const data = await apiRequest(`/youtube/info?url=${encodeURIComponent(trimmedUrl)}`, {
      method: "GET"
    }, customApiKey);

    if (!data.ok) {
      throw new Error(data.detail || "Gagal menganalisa video YouTube");
    }

    // Process available formats from API
    const rawFormats = data.formats || [];
    const videoFormats = [];
    let audioFormat = null;

    rawFormats.forEach((fmt) => {
      if (fmt.type === 'video') {
        videoFormats.push({
          format: fmt.format, // e.g. "1080p", "720p", "480p", "360p"
          label: fmt.format.toUpperCase(),
          type: 'video',
          extension: 'mp4',
          filesize: fmt.filesize,
          filesizeText: formatBytes(fmt.filesize)
        });
      } else if (fmt.type === 'audio') {
        audioFormat = {
          format: fmt.format, // "audio"
          label: 'MP3 Audio (HQ)',
          type: 'audio',
          extension: 'mp3',
          filesize: fmt.filesize,
          filesizeText: formatBytes(fmt.filesize)
        };
      }
    });

    // Sort video formats highest quality first
    const qualityWeight = (f) => parseInt(f.replace(/\D/g, '')) || 0;
    videoFormats.sort((a, b) => qualityWeight(b.format) - qualityWeight(a.format));

    return {
      platform: 'YouTube',
      title: data.title || 'YouTube Video',
      author: data.author || 'YouTube Creator',
      duration: formatDuration(data.duration) || '03:00',
      durationSeconds: data.duration,
      thumbnail: data.thumbnails?.max || data.thumbnails?.low || data.thumbnail,
      originalUrl: trimmedUrl,
      isYouTube: true,
      hasVideo: videoFormats.length > 0,
      hasAudio: !!audioFormat,
      videoFormats,
      audioFormat,
      raw: data
    };

  } else {
    // 2. Generic media fetch endpoint (TikTok, Instagram, etc.)
    const data = await apiRequest(`/fetch?url=${encodeURIComponent(trimmedUrl)}`, {
      method: "GET"
    }, customApiKey);

    if (!data.ok) {
      throw new Error(data.detail || "Gagal menganalisa tautan media");
    }

    // Determine platform name
    let platformName = 'Media';
    if (data.source?.includes('tiktok')) platformName = 'TikTok';
    else if (data.source?.includes('instagram')) platformName = 'Instagram';
    else if (data.source?.includes('twitter') || data.source?.includes('x.com')) platformName = 'X / Twitter';
    else if (data.source?.includes('facebook')) platformName = 'Facebook';

    const videoFormats = [];
    let audioFormat = null;

    if (data.download_url) {
      const resLabel = data.width && data.height ? `${data.width}x${data.height} HD` : 'No-Watermark HD';
      videoFormats.push({
        format: 'original',
        label: `Video MP4 (${resLabel})`,
        type: 'video',
        extension: 'mp4',
        downloadUrl: data.download_url,
        filesizeText: 'Optimal Quality'
      });
    }

    const audioUrl = data.music_url || data.music?.download_url;
    if (audioUrl) {
      audioFormat = {
        format: 'audio',
        label: data.music?.title ? `Audio MP3 (${data.music.title})` : 'Audio MP3 (Soundtrack Original)',
        type: 'audio',
        extension: 'mp3',
        downloadUrl: audioUrl,
        filesizeText: formatDuration(data.music?.duration || data.duration)
      };
    }

    return {
      platform: platformName,
      title: data.caption || `${platformName} Content (${data.id || 'Media'})`,
      author: data.music?.author || `@${platformName.toLowerCase()}_user`,
      duration: formatDuration(data.duration) || '00:30',
      durationSeconds: data.duration,
      thumbnail: data.thumbnail_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      originalUrl: trimmedUrl,
      isYouTube: false,
      hasVideo: videoFormats.length > 0,
      hasAudio: !!audioFormat,
      videoFormats,
      audioFormat,
      raw: data
    };
  }
}

/**
 * Request YouTube download URL for specific format
 */
export async function downloadYouTubeMedia(url, format = '1080p', customApiKey) {
  const data = await apiRequest('/youtube/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url,
      format
    })
  }, customApiKey);

  if (!data.ok || !data.download_url) {
    throw new Error(data.detail || "Gagal memproses link unduhan YouTube");
  }

  return data;
}
