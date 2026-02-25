/* ── Gallery page loading skeleton ── */
export default function GalleryLoading() {
  const spans = [2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1];
  return (
    <div className="min-h-screen bg-[#1A0E07]">
      {/* Hero skeleton */}
      <div className="py-24 text-center animate-pulse">
        <div className="flex flex-col items-center gap-4 px-4">
          <div className="h-4 bg-white/10 rounded-full w-32" />
          <div className="h-12 bg-white/10 rounded-full w-48" />
          <div className="h-4 bg-white/10 rounded-full w-72" />
        </div>
      </div>

      {/* Masonry skeleton */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-3 auto-rows-[180px] gap-3 animate-pulse">
          {spans.map((span, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-white/8 col-span-${span}`}
              style={{ gridColumnEnd: `span ${span}` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
