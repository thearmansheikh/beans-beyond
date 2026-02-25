import { FiClipboard, FiMessageSquare, FiCheck, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";

const STEPS: { n: string; Icon: IconType; title: string; desc: string }[] = [
  { n: "01", Icon: FiClipboard,    title: "Tell us your vision", desc: "Fill in the enquiry form with your event details — we'll get back to you within 24 hours." },
  { n: "02", Icon: FiMessageSquare,title: "We tailor your menu", desc: "Our team will craft a personalised menu and quote based on your guest count and preferences." },
  { n: "03", Icon: FiCheck,        title: "Confirm & book",      desc: "Approve the proposal, pay a small deposit, and lock in your date. Simple as that." },
  { n: "04", Icon: FiZap,          title: "Sit back and enjoy",  desc: "We handle setup, service, and cleanup. You focus on your guests — we'll take care of the rest." },
];

export default function CateringProcess() {
  return (
    <section className="section-padding bg-[#F8F4EF]">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">Simple process</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07]">How it works</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ n, Icon, title, desc }) => (
            <div key={n} className="relative">
              {/* Connector line (hidden on last) */}
              <div className="hidden lg:block absolute top-8 left-[calc(50%+28px)] right-0 h-px bg-[#D2691E]/20" />
              <div className="bg-white rounded-3xl p-7 border border-[#EEE6DC] text-center relative hover:shadow-md hover:-translate-y-0.5 transition-all">
                <span className="absolute top-5 left-5 text-[10px] font-black text-[#D2691E]/40 tracking-widest">{n}</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center mx-auto mb-4 mt-2 shadow-md shadow-[#D2691E]/20">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-black text-[#1A0E07] mb-2 text-base">{title}</h3>
                <p className="text-[#333]/55 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
