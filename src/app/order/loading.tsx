/* ── Order page loading skeleton ── */
export default function OrderLoading() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] animate-pulse">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#2C1A0E] via-[#1A0E07] to-[#0D0805] py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
          <div className="h-3 bg-white/10 rounded-full w-28" />
          <div className="h-10 bg-white/10 rounded-full w-64" />
          <div className="h-4 bg-white/10 rounded-full w-80" />
        </div>
      </div>

      {/* Step indicator */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-9 bg-gray-200 rounded-full w-32" />
              {i < 3 && <div className="h-0.5 bg-gray-100 w-8" />}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Order type cards */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl h-36 border border-gray-100" />
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="h-44 bg-gray-200" />
              <div className="p-4 space-y-2.5">
                <div className="h-4 bg-gray-200 rounded-full w-3/4" />
                <div className="h-3 bg-gray-100 rounded-full w-full" />
                <div className="flex justify-between pt-2">
                  <div className="h-5 bg-gray-200 rounded-full w-14" />
                  <div className="h-8 bg-gray-200 rounded-xl w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
