# Service Worker Strategy

- Precache: App shell and critical assets via Workbox precache manifest.
- Runtime caching:
  - Images: CacheFirst, 30 days, 200 entries.
  - Fonts: CacheFirst, 1 year.
  - API: NetworkFirst with 3s timeout and IndexedDB snapshot fallback.
  - Third-party CDN: StaleWhileRevalidate.
- Navigation fallback: `/index.html` with denylist for `/api` and `/admin`.
- Update flow: `workbox-window` for `waiting` -> `skipWaiting()` lifecycle and broadcast to clients.
- SW served with `Cache-Control: no-store` from edge to ensure controlled updates.

