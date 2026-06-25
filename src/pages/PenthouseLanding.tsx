const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Penthouse Suites in Harare",
};

export default function PenthouseLanding() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <h1 className="text-3xl font-bold mb-4">Penthouse Suites for Rent in Harare — Luxury Short‑Term Stays</h1>
      <p className="text-gray-700 mb-6">Browse curated penthouse suites in Harare offering panoramic views, private terraces, and premium amenities. Book instantly or request concierge services for extended stays.</p>

      <section>
        <h2 className="text-xl font-semibold">Why choose a penthouse?</h2>
        <p className="text-gray-600">Penthouse suites offer privacy, space, and premium finishes — ideal for celebrations, business visits, and longer stays.</p>
      </section>
    </main>
  );
}
