/* ── Loyalty page loading skeleton ── */
export default function LoyaltyLoading() {
  return (
    <div className="min-h-screen bg-[#1A0E07] animate-pulse">
      {/* Hero */}
      <div className="py-28 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-5">
          <div className="h-7 bg-white/10 rounded-full w-32" />
          <div className="h-14 bg-white/10 rounded-full w-80 max-w-full" />
          <div className="h-4 bg-white/8 rounded-full w-96 max-w-full" />
          <div className="flex gap-3 mt-3">
            <div className="h-12 bg-[#D2691E]/30 rounded-2xl w-44" />
            <div className="h-12 bg-white/8 rounded-2xl w-36" />
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-[#F8F4EF] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="h-3 bg-gray-200 rounded-full w-24" />
            <div className="h-8 bg-gray-200 rounded-full w-48" />
          </div>
          <div className="grid sm:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-36 border border-gray-100" />
            ))}
          </div>
        </div>
      </div>

      {/* Tiers */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/8 rounded-2xl h-64 border border-white/8" />
          ))}
        </div>
      </div>
    </div>
  );
}
