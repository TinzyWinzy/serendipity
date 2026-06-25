import { Workbox } from 'workbox-window';

export function registerServiceWorker(onUpdate?: () => void, onSuccess?: () => void) {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    const wb = new Workbox('/sw.js');

    wb.addEventListener('controlling', () => {
      window.location.reload();
    });

    wb.addEventListener('waiting', () => {
      // New SW waiting to activate
      if (confirm('A new version is available. Update now?')) {
        wb.addEventListener('activated', () => onUpdate && onUpdate());
        wb.messageSW({ type: 'SKIP_WAITING' });
      }
    });

    wb.register().then(reg => {
      onSuccess && onSuccess();
      return reg;
    }).catch(err => {
      console.error('SW registration failed:', err);
    });
  }
}
