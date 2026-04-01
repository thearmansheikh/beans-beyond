import Image from "next/image";

const IMAGES = [
  {
    src:  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    alt:  "Café atmosphere",
    cls:  "col-span-2 row-span-2",
    size: "(max-width: 768px) 66vw, 40vw",
    priority: true,
  },
  {
    src:  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80",
    alt:  "Latte art",
    cls:  "",
    size: "(max-width: 768px) 33vw, 20vw",
    priority: true,
  },
  {
    src:  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
    alt:  "Avocado toast",
    cls:  "",
    size: "(max-width: 768px) 33vw, 20vw",
    priority: false,
  },
  {
    src:  "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&q=80",
    alt:  "Full English breakfast",
    cls:  "",
    size: "(max-width: 768px) 33vw, 20vw",
    priority: false,
  },
  {
    src:  "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&q=80",
    alt:  "Chocolate brownie dessert",
    cls:  "",
    size: "(max-width: 768px) 33vw, 20vw",
    priority: false,
  },
];

export default function PhotoCollage() {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 h-[320px] sm:h-[360px] mb-10 rounded-2xl overflow-hidden">
      {IMAGES.map(({ src, alt, cls, size, priority }) => (
        <div key={alt} className={`relative overflow-hidden group ${cls}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={size}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            priority={priority}
          />
          {/* Subtle vignette + hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 opacity-60" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/12 transition-colors duration-500" />
        </div>
      ))}
    </div>
  );
}
