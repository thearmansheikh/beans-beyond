/* ── About page loading skeleton ── */
export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Hero */}
      <div className="bg-[#1A0E07] py-24">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4 text-center">
          <div className="h-3 bg-white/10 rounded-full w-24" />
          <div className="h-12 bg-white/10 rounded-full w-64" />
          <div className="h-4 bg-white/10 rounded-full w-96 max-w-full" />
        </div>
      </div>

      {/* Stats row */}
      <div className="bg-[#6F4E37] py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-8 bg-white/20 rounded-full w-20" />
              <div className="h-3 bg-white/10 rounded-full w-28" />
            </div>
          ))}
        </div>
      </div>

      {/* Story section */}
      <div className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div className="space-y-4">
          <div className="h-3 bg-gray-200 rounded-full w-20" />
          <div className="h-10 bg-gray-200 rounded-full w-56" />
          <div className="space-y-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 bg-gray-100 rounded-full" style={{ width: `${85 + (i % 3) * 5}%` }} />
            ))}
          </div>
        </div>
        <div className="h-80 bg-gray-200 rounded-3xl" />
      </div>

      {/* Values grid */}
      <div className="bg-[#F8F4EF] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-3 mb-12">
            <div className="h-3 bg-gray-200 rounded-full w-24" />
            <div className="h-10 bg-gray-200 rounded-full w-48" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-44 border border-gray-100" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
