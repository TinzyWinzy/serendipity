const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Short-Term Rentals in Harare",
  "description": "Curated short-term rental suites in Harare with instant booking and offline access.",
};

export default function ListingsHarare() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <h1 className="text-3xl font-bold mb-4">Short‑Term Rentals in Harare — Available Suites & Instant Booking</h1>
      <p className="text-gray-700 mb-6">Find vetted short‑term rental suites across Harare with instant booking, transparent pricing, and offline access. Filter by neighbourhood, amenities, and price — book securely in two taps and save favourites to view offline.</p>

      <section className="space-y-6">
        <article>
          <h2 className="text-xl font-semibold">How to use this page</h2>
          <p className="text-gray-600">Use the filters to narrow results by neighbourhood or amenity. Click a suite card to view photos, pricing and to start booking.</p>
        </article>

        <article>
          <h3 className="text-lg font-semibold">Featured Suites</h3>
          <p className="text-gray-600">Handpicked premium suites with fast Wi‑Fi, solar backup and free cancellation on selected dates.</p>
        </article>

        <article>
          <h3 className="text-lg font-semibold">FAQ</h3>
          <div>
            <strong>Q:</strong> What is your cancellation policy?<br />
            <strong>A:</strong> Flexible cancellation varies by listing — check the offer on each suite card.
          </div>
        </article>
      </section>
    </main>
  );
}
