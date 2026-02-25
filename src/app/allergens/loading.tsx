/* ── Allergens page loading skeleton ── */
export default function AllergensLoading() {
  return (
    <div className="min-h-screen bg-amber-50 animate-pulse">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-700 to-amber-900 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4 text-center">
          <div className="h-10 w-10 bg-white/20 rounded-full mb-1" />
          <div className="h-10 bg-white/20 rounded-full w-64" />
          <div className="h-4 bg-white/15 rounded-full w-80 max-w-full" />
        </div>
      </div>

      {/* Dietary key strip */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-9 bg-white rounded-full w-28 border border-amber-100" />
          ))}
        </div>

        {/* Tables */}
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-56 border border-amber-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
