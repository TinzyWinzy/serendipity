import { useEffect, useState } from 'react';

export default function Hero(): JSX.Element {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () => window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  const onInstallClick = async () => {
    if (!deferredPrompt) return;
    try {
      // @ts-ignore
      deferredPrompt.prompt();
      // @ts-ignore
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return choice;
    } catch (e) {
      console.warn('Install prompt failed', e);
    }
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/images/executive/hero.avif';
    document.head.appendChild(link);
    return () => {
      try {
        document.head.removeChild(link);
      } catch (e) {
        /* ignore */
      }
    };
  }, []);

  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">Find your unexpected sanctuary</h1>
          <p className="mt-4 text-gray-700 max-w-xl">Premium short-term rental suites in Harare — book instantly, save offline, and return to favorites even without a connection.</p>

          <div className="mt-6 flex items-center gap-4">
            <a href="/search" className="inline-flex items-center px-5 py-3 bg-emerald-700 text-white rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">Check Availability</a>
            <a href="/suites" className="text-emerald-700 hover:underline">View Suites</a>
          </div>

          {deferredPrompt && (
            <button onClick={onInstallClick} className="mt-4 text-sm text-gray-600 underline">Add to Home Screen</button>
          )}
        </div>

        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-100">
          <img
            alt="Signature penthouse living room, Harare"
            src="/images/executive/hero-blur.jpg"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-0' : 'opacity-100'} filter blur-2xl scale-105`}
          />

          <picture>
            <source srcSet="/images/executive/hero.avif" type="image/avif" />
            <source srcSet="/images/executive/hero.webp" type="image/webp" />
            <img
              src="/images/executive/hero.jpg"
              alt="Signature penthouse living room, Harare"
              className={`relative w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
