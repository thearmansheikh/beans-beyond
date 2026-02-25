/* ── Book page loading skeleton ── */
export default function BookLoading() {
  return (
    <div className="min-h-screen bg-[#F8F4EF] animate-pulse">
      {/* Hero */}
      <div className="bg-[#1A0E07] py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-4">
          <div className="h-8 bg-white/10 rounded-full w-56" />
          <div className="h-12 bg-white/10 rounded-full w-80" />
          <div className="h-5 bg-white/10 rounded-full w-96" />
        </div>
      </div>
      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-3xl h-64" />
          <div className="bg-white rounded-3xl h-72" />
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl h-[600px]" />
        </div>
      </div>
    </div>
  );
}
