# Offline & Push Architecture

## Overview
- Use IndexedDB to store offline write actions (favorites, bookings, forms).
- Queue entries are retried with exponential backoff when connectivity returns.
- On supported browsers, use Background Sync API to flush queue; on iOS, fall back to foreground retry on next app open.

## Push Notifications
- Use VAPID keys and a backend push gateway.
- Request `beforeinstallprompt` and only show `Notification` permission prompt after user installs or completes a high-value task.
- Maintain subscription lifecycle on server; send targeted notifications for bookings and price alerts.

## Permission Etiquette
- Never request notifications on first load.
- Display contextual explanation before prompting.

## Flow
1. User subscribes → client sends subscription to server.
2. Server stores subscription and sends verification push.
3. On events, server sends push via Web Push with TTL and urgency headers.
4. Client shows notification with deep-link.

