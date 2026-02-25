import Image from "next/image";

const PHOTOS = [
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
  "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
];

export default function AboutPhotoStrip() {
  return (
    <section className="overflow-hidden bg-[#1A0E07]">
      <div className="flex h-56 sm:h-72 lg:h-80">
        {PHOTOS.map((src, i) => (
          <div key={i} className="relative flex-1 overflow-hidden">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
              sizes="25vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
