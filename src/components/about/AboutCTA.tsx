import { RESTAURANT } from "@/utils/constants";

export default function AboutCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-[#D2691E] to-[#E8944A] text-center relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(45deg,#fff_0,#fff_1px,transparent_0,transparent_50%)] [background-size:12px_12px]" />
      <div className="container-site relative">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
          Come and say hello
        </h2>
        <p className="text-white/80 max-w-md mx-auto mb-10 text-lg">
          We&rsquo;re at {RESTAURANT.address}. Pop in for a coffee — we&rsquo;d love to meet you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/order"
            className="px-8 py-4 bg-[#1A0E07] text-white font-black rounded-2xl hover:bg-[#2C1A0E] transition-all shadow-lg text-base"
          >
            Order Online
          </a>
          <a
            href="/contact"
            className="px-8 py-4 bg-white/20 border-2 border-white/40 text-white font-black rounded-2xl hover:bg-white/30 transition-all text-base"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
