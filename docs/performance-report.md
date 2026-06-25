# Performance Report & Roadmap (Expected)

## Expected Core Web Vitals
- FCP: < 1.8s
- LCP: < 2.5s
- TTI: < 3.8s
- CLS: < 0.1

## Current Build Targets
- Main bundle: < 150KB gzipped
- Total JS per route: < 300KB gzipped
- SW install: < 1s on 3G

## Analysis Steps
1. Run `npm run build` and analyze `dist` with `source-map-explorer` or `rollup-plugin-visualizer`.
2. Run Lighthouse CI on preview deployments for PR gating.
3. Instrument RUM (e.g., Web Vitals + custom beacon) for 99th percentile monitoring.

## Optimization Roadmap
- Immediate (Sprint 0):
  - Code-split pages, lazy-load heavy components.
  - Replace large images with AVIF/WebP and add `srcset`.
  - Move heavy libs to dynamic imports; vendor chunking via Rollup.
- Short-term (Sprint 1):
  - Implement server-side compression (brotli/gzip) via Vercel edge config.
  - Add HTTP/2 push for critical resources (measure first).
  - Defer non-critical third-party scripts; load after interaction.
- Long-term (Sprint 2):
  - Implement ISR for frequently updated listings.
  - Add smart image CDN with automatic format delivery.
  - Integrate edge caching rules per-country and A/B experiment throttling.

## Checks for CI
- Lighthouse budgets enforced on PRs.
- Bundle size checks (fail if main bundle > 150KB gzipped).
- Playwright visual regression for shell screens and critical user flows.
