const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Book Short-term Apartment Harare",
  "description": "Instant booking flow for short-term apartments in Harare.",
};

export default function BookHarare() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <h1 className="text-3xl font-bold mb-4">Book a Short‑Term Apartment in Harare — Fast, Secure, Confirmed</h1>
      <p className="text-gray-700 mb-6">Select dates, compare available suites with transparent pricing, and complete a secure booking in under two minutes. Free cancellation windows available on selected listings.</p>

      <section>
        <h2 className="text-xl font-semibold">Booking form (sample)</h2>
        <p className="text-gray-600">This page demonstrates the booking flow and the type of information collected before confirmation.</p>
      </section>
    </main>
  );
}
