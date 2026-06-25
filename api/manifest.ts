import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const baseManifest = {
    name: 'Serendipity Suites Zim',
    short_name: 'Serendipity',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#152D2B',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
    ]
  };

  // Example personalization: prefer dark theme icons for users from certain geos
  const country = req.headers['x-vercel-country'] || 'ZZ';
  if (country === 'ZW') {
    baseManifest.name = 'Serendipity (ZW)';
  }

  res.setHeader('Content-Type', 'application/manifest+json');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.status(200).send(JSON.stringify(baseManifest));
}
