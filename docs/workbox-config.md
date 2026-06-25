# Workbox Configuration Snippet

Use the following Workbox options via `vite-plugin-pwa` (already applied in `vite.config.ts`):

```js
workbox: {
  cleanupOutdatedCaches: true,
  globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webp,avif,woff2}'],
  navigateFallback: '/index.html',
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: /\.(?:woff2|woff|ttf)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'fonts-cache',
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /^https:\/\/(?:api|backend)\./i,
      handler: 'NetworkFirst',
      options: { cacheName: 'api-cache', networkTimeoutSeconds: 3 },
    },
  ],
}
```

Notes:
- Keep the SW small; avoid heavy runtime computation during install.
- Test SW install time on a 3G throttled connection; target <1s.
