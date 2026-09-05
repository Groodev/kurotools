/**
 * Short.io API Service Integration
 * Documentation: https://developers.short.io/reference/
 */

export const SHORTIO_DEFAULT_DOMAIN = import.meta.env?.VITE_SHORTIO_DOMAIN || "kurolink.s.gy";

/**
 * Shortens a URL using Short.io
 * Attempts Vercel serverless function (/api/shorten), then Vite proxy (/api/shortio/links), then direct API.
 * @param {string} originalURL - The long URL to shorten
 * @returns {Promise<{ shortURL: string, id: string, originalURL: string }>}
 */
export async function shortenUrl(originalURL) {
  if (!originalURL || !originalURL.trim()) {
    throw new Error("URL tujuan tidak boleh kosong");
  }

  let formattedUrl = originalURL.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = 'https://' + formattedUrl;
  }

  // Strategy 1: Call Vercel Serverless Function (/api/shorten)
  // This keeps the API key 100% hidden on the server side.
  try {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ originalURL: formattedUrl })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.ok && data.shortURL) {
        return {
          shortURL: data.shortURL,
          id: data.id,
          originalURL: data.originalURL || formattedUrl
        };
      }
    } else if (res.status !== 404) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Gagal memendekkan tautan (${res.status})`);
    }
  } catch (err) {
    // If it's a specific error thrown from server, rethrow unless it's a network/404 fallback
    if (err.message && !err.message.includes('Failed to fetch') && !err.message.includes('404')) {
      throw err;
    }
  }

  // Strategy 2: Call Vite dev proxy (/api/shortio/links)
  try {
    const res = await fetch('/api/shortio/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        originalURL: formattedUrl,
        domain: SHORTIO_DEFAULT_DOMAIN
      })
    });

    if (res.ok) {
      const data = await res.json();
      const shortURL = data.secureShortURL || data.shortURL;
      if (shortURL) {
        return {
          shortURL,
          id: data.id || data.idString,
          originalURL: data.originalURL || formattedUrl
        };
      }
    } else {
      const errData = await res.json().catch(() => ({}));
      if (errData.message || errData.error) {
        throw new Error(errData.message || errData.error);
      }
    }
  } catch (err) {
    if (err.message && !err.message.includes('Failed to fetch')) {
      throw err;
    }
  }

  // Strategy 3: Fallback direct API if client-side env key is available
  const clientKey = import.meta.env?.VITE_SHORTIO_API_KEY;
  if (clientKey) {
    try {
      const res = await fetch('https://api.short.io/links', {
        method: 'POST',
        headers: {
          'authorization': clientKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          originalURL: formattedUrl,
          domain: SHORTIO_DEFAULT_DOMAIN
        })
      });

      const data = await res.json();
      if (res.ok) {
        return {
          shortURL: data.secureShortURL || data.shortURL,
          id: data.id || data.idString,
          originalURL: data.originalURL || formattedUrl
        };
      } else {
        throw new Error(data.message || data.error || 'Gagal memproses tautan di Short.io');
      }
    } catch (err) {
      throw new Error(err.message || 'Gagal menghubungi server Short.io');
    }
  }

  throw new Error('Gagal memendekkan tautan. Pastikan SHORTIO_API_KEY telah disetel di Vercel.');
}
