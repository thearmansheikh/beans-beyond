export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#1A0E07] py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#D2691E]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#6F4E37]/25 blur-3xl" />

      <div className="container-site relative text-center">
        <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest text-[#D2691E] border border-[#D2691E]/30 rounded-full bg-[#D2691E]/10">
          We&rsquo;d love to hear from you
        </span>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-5">
          Get in{" "}
          <span className="text-gradient-warm">Touch</span>
        </h1>
        <p className="text-white/55 max-w-lg mx-auto text-lg leading-relaxed">
          Questions, feedback, catering enquiries — or just want to say hello. We&rsquo;re always happy to chat.
        </p>
      </div>
    </section>
  );
}
