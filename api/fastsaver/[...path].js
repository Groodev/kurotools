export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const apiKey = process.env.FASTSAVER_API_KEY || process.env.VITE_FASTSAVER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      ok: false,
      detail: 'FASTSAVER_API_KEY belum disetel di Vercel Environment Variables.'
    });
  }

  try {
    // Ambil path yang dituju dari query param 'path'
    const { path, ...queryParams } = req.query;
    
    // Normalisasi sub-path
    let targetSubPath = '';
    if (Array.isArray(path)) {
      targetSubPath = '/' + path.join('/');
    } else if (path) {
      targetSubPath = path.startsWith('/') ? path : '/' + path;
    }

    // Bangun URL target ke FastSaver API
    const queryString = new URLSearchParams(queryParams).toString();
    const targetUrl = `https://api.fastsaver.io/v1${targetSubPath}${queryString ? '?' + queryString : ''}`;

    const fetchOptions = {
      method: req.method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    };

    if (req.method === 'POST' && req.body) {
      fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      detail: error.message || 'Terjadi kesalahan pada Serverless Proxy'
    });
  }
}
