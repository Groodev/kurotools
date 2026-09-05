export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const apiKey = process.env.SHORTIO_API_KEY || process.env.VITE_SHORTIO_API_KEY;
  const domain = process.env.SHORTIO_DOMAIN || 'kurolink.s.gy';

  if (!apiKey) {
    return res.status(500).json({
      ok: false,
      error: 'SHORTIO_API_KEY belum disetel di Vercel Environment Variables.'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { originalURL } = body || {};

    if (!originalURL) {
      return res.status(400).json({ ok: false, error: 'URL tujuan diperlukan.' });
    }

    const response = await fetch('https://api.short.io/links', {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        originalURL,
        domain
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        error: data.message || data.error || 'Gagal memendekkan tautan di Short.io'
      });
    }

    return res.status(200).json({
      ok: true,
      shortURL: data.secureShortURL || data.shortURL,
      id: data.id,
      originalURL: data.originalURL,
      path: data.path
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message || 'Internal Server Error'
    });
  }
}
