const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Serendipity Suites",
  "url": "https://yourdomain.example",
  "address": { "@type": "PostalAddress", "addressLocality": "Harare", "addressCountry": "ZW" }
};

export default function BrandLanding() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <h1 className="text-3xl font-bold mb-4">Serendipity Suites — Premium Short‑Term Stays in Harare</h1>
      <p className="text-gray-700 mb-6">Serendipity offers premium short‑term suites across Harare with instant booking, verified hosts, and offline features for travellers on the move.</p>

      <section>
        <h2 className="text-xl font-semibold">Why Serendipity?</h2>
        <ul className="list-disc ml-6 text-gray-600">
          <li>Verified listings and host support</li>
          <li>Reliable connectivity and solar backup</li>
          <li>Offline access and installable PWA</li>
        </ul>
      </section>
    </main>
  );
}
