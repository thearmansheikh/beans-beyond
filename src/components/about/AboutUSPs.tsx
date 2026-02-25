import { USPS } from "@/utils/constants";

export default function AboutUSPs() {
  return (
    <section className="section-padding bg-[#1A0E07]">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D2691E] mb-3">Why choose us</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">What makes us different</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USPS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="glass-dark rounded-2xl p-6 hover:bg-white/10 transition-all"
            >
              <span className="text-3xl block mb-4">{icon}</span>
              <h3 className="font-black text-white mb-2">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
