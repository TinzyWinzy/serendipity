const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best Neighborhoods in Harare for Tourists",
};

export default function NeighborhoodsGuide() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <h1 className="text-3xl font-bold mb-4">Best Neighborhoods in Harare for Tourists — Where to Stay</h1>
      <p className="text-gray-700 mb-6">Harare’s top neighbourhoods for visitors include Borrowdale (luxury, safety), Avondale (dining and nightlife), and Marlborough (business convenience). Choose based on budget and travel goals—each listing links to nearby Serendipity suites.</p>

      <section>
        <h2 className="text-xl font-semibold">Borrowdale</h2>
        <p className="text-gray-600">High-end residential area with secure compounds and premium dining.</p>

        <h2 className="text-xl font-semibold mt-6">Avondale</h2>
        <p className="text-gray-600">Vibrant neighborhood with cafes, nightlife and easy access to central services.</p>
      </section>
    </main>
  );
}
