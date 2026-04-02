import { FiPhone, FiMail, FiInstagram, FiFacebook, FiArrowRight } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

const QUICK_LINKS = [
  {
    Icon: FiPhone,
    label: "Call Us",
    value: RESTAURANT.phone,
    sub: "Mon–Fri, 8am–10pm",
    href: `tel:${RESTAURANT.phone}`,
    gradient: "from-[#D2691E] to-[#E8944A]",
    shadow: "shadow-[#D2691E]/25",
  },
  {
    Icon: FiMail,
    label: "Email Us",
    value: RESTAURANT.email,
    sub: "We reply within 2 hours",
    href: `mailto:${RESTAURANT.email}`,
    gradient: "from-[#6F4E37] to-[#D2691E]",
    shadow: "shadow-[#6F4E37]/20",
  },
  {
    Icon: FiInstagram,
    label: "Instagram",
    value: "@beansbeyondcafe",
    sub: "Follow for daily updates",
    href: RESTAURANT.social.instagram,
    gradient: "from-[#E8944A] to-[#C1440E]",
    shadow: "shadow-[#E8944A]/20",
  },
  {
    Icon: FiFacebook,
    label: "Facebook",
    value: "Beans & Beyond",
    sub: "Like our page",
    href: RESTAURANT.social.facebook,
    gradient: "from-[#4267B2] to-[#5B7FD4]",
    shadow: "shadow-[#4267B2]/20",
  },
];

export default function ContactQuickLinks() {
  return (
    <section className="bg-[#1A0E07] pb-14">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_LINKS.map(({ Icon, label, value, sub, href, gradient, shadow }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:-translate-y-1 hover:border-white/20 transition-all duration-200 overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`} />

              <div className="relative">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg ${shadow}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-white font-black text-sm leading-snug truncate">{value}</p>
                <p className="text-white/35 text-xs mt-0.5">{sub}</p>
                <div className="flex items-center gap-1 mt-3 text-[#E8944A] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Connect <FiArrowRight className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
