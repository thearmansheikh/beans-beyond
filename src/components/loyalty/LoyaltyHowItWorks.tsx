import { FiSmartphone, FiShoppingBag, FiGift, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";

const HOW_IT_WORKS: { Icon: IconType; step: string; title: string; desc: string }[] = [
  { Icon: FiSmartphone,  step: "01", title: "Sign up free",    desc: "Create your Beans & Beyond account online or in-store. No card required." },
  { Icon: FiShoppingBag, step: "02", title: "Earn points",     desc: "Every £1 you spend earns you points. Use our app, website, or just tell us your email." },
  { Icon: FiGift,        step: "03", title: "Redeem rewards",  desc: "Trade points for free drinks, food, discounts, and exclusive experiences." },
  { Icon: FiZap,         step: "04", title: "Level up",        desc: "Hit point milestones to unlock Gold and Reserve tiers with even bigger perks." },
];

export default function LoyaltyHowItWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">Simple &amp; free</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07]">How it works</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map(({ Icon, step, title, desc }) => (
            <div key={step} className="relative text-center group">
              <div className="bg-[#F8F4EF] rounded-3xl p-7 border border-[#EEE6DC] h-full hover:border-[#D2691E]/25 hover:shadow-md transition-all">
                <span className="block text-[10px] font-black text-[#D2691E]/65 tracking-widest mb-3">{step}</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D2691E] to-[#E8944A] flex items-center justify-center mx-auto mb-4 shadow-md shadow-[#D2691E]/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-black text-[#1A0E07] mb-2">{title}</h3>
                <p className="text-[#333]/55 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
