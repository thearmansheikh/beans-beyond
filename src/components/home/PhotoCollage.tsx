import Image from "next/image";

const COLLAGE = [
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    alt: "Café atmosphere",
    cls: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
    alt: "Latte art",
    cls: "",
  },
  {
    src: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80",
    alt: "Full breakfast",
    cls: "",
  },
];

export default function PhotoCollage() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[280px] sm:h-[320px] mb-10 rounded-2xl overflow-hidden">
      {COLLAGE.map(({ src, alt, cls }) => (
        <div key={alt} className={`relative overflow-hidden ${cls}`}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 33vw, 20vw"
          />
        </div>
      ))}
    </div>
  );
}
