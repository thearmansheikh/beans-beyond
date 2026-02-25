/* ── Menu page loading skeleton ── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-2.5">
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-5/6" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-gray-200 rounded-full w-16" />
          <div className="h-8 bg-gray-200 rounded-xl w-16" />
        </div>
      </div>
    </div>
  );
}

export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-[#2C1A0E] via-[#1A0E07] to-[#0D0805] py-20 text-center">
        <div className="animate-pulse flex flex-col items-center gap-4 px-4">
          <div className="h-4 bg-white/10 rounded-full w-40" />
          <div className="h-12 bg-white/10 rounded-full w-64" />
          <div className="h-5 bg-white/10 rounded-full w-80" />
          <div className="flex gap-3 mt-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-9 bg-white/10 rounded-full w-24" />
            ))}
          </div>
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 flex gap-3 animate-pulse">
          <div className="h-10 bg-gray-200 rounded-xl w-56" />
          <div className="flex gap-2 flex-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-9 bg-gray-100 rounded-full w-24" />
            ))}
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
