/* ── Contact page loading skeleton ── */
export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-[#F8F4EF] animate-pulse">
      {/* Hero */}
      <div className="bg-[#1A0E07] py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4 text-center">
          <div className="h-3 bg-white/10 rounded-full w-28" />
          <div className="h-10 bg-white/10 rounded-full w-56" />
          <div className="h-4 bg-white/10 rounded-full w-80 max-w-full" />
        </div>
      </div>

      {/* Quick contact cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-28 border border-gray-100" />
          ))}
        </div>

        {/* Form + map */}
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-3xl h-[500px] border border-gray-100" />
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl h-52 border border-gray-100" />
            <div className="bg-white rounded-2xl h-48 border border-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
