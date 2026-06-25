import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'icon-192.svg', 'icon-512.svg', 'splash-640.png'],
      devOptions: {
        enabled: command === 'serve',
      },
      manifest: {
        name: 'Serendipity Suites Zim',
        short_name: 'Serendipity',
        description: 'Premium short-term rental suites in Harare, Zimbabwe',
        theme_color: '#152D2B',
        background_color: '#FFFFFF',
        orientation: 'portrait',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        categories: ['travel', 'hospitality'],
        icons: [
          { src: 'icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'maskable' },
          { src: 'icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webp,avif,woff2}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//, /\/admin\//],
        runtimeCaching: [
          {
            // Images: CacheFirst for fast loads and offline gallery
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Fonts: long-lived CacheFirst
            urlPattern: /\.(?:woff2|woff|ttf)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // API calls: prefer network but fallback to cache when offline
            urlPattern: /^https:\/\/(?:api|backend)\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
          {
            // Third-party CDNs (images, assets)
            urlPattern: /^https:\/\/(?:cdn|fonts)\./i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'third-party-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],

  build: {
    target: 'es2020',
    assetsInlineLimit: 4096, // inline assets below 4kb
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('workbox') || id.includes('workbox-window')) return 'vendor-workbox';
            return 'vendor';
          }
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/chunk-[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },

  server: {
    fs: { strict: true },
  },
}));
