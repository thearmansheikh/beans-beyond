/* ── Catering page loading skeleton ── */
export default function CateringLoading() {
  return (
    <div className="min-h-screen bg-[#F8F4EF] animate-pulse">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#2C1A0E] via-[#1A0E07] to-[#0D0805] py-24">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-5 text-center">
          <div className="h-3 bg-white/10 rounded-full w-32" />
          <div className="h-12 bg-white/10 rounded-full w-72" />
          <div className="h-4 bg-white/10 rounded-full w-80 max-w-full" />
          <div className="flex gap-4 mt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 w-28 bg-white/8 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="h-3 bg-gray-200 rounded-full w-24" />
          <div className="h-8 bg-gray-200 rounded-full w-48" />
        </div>
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-52 border border-gray-100" />
          ))}
        </div>

        {/* Packages */}
        <div className="grid sm:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-72 border border-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
