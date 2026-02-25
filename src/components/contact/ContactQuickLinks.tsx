import { FiPhone, FiMail, FiInstagram, FiFacebook } from "react-icons/fi";
import { RESTAURANT } from "@/utils/constants";

const QUICK_LINKS = [
  {
    Icon: FiPhone,
    label: "Call us",
    value: RESTAURANT.phone,
    href: `tel:${RESTAURANT.phone}`,
    colour: "from-[#D2691E] to-[#E8944A]",
  },
  {
    Icon: FiMail,
    label: "Email us",
    value: RESTAURANT.email,
    href: `mailto:${RESTAURANT.email}`,
    colour: "from-[#6F4E37] to-[#D2691E]",
  },
  {
    Icon: FiInstagram,
    label: "Instagram",
    value: "@bbcafe",
    href: RESTAURANT.social.instagram,
    colour: "from-[#E8944A] to-[#6F4E37]",
  },
  {
    Icon: FiFacebook,
    label: "Facebook",
    value: "/bbcafe",
    href: RESTAURANT.social.facebook,
    colour: "from-[#6F4E37] to-[#4A3425]",
  },
];

export default function ContactQuickLinks() {
  return (
    <section className="bg-[#F8F4EF] border-b border-[#E8DDD4]">
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E8DDD4] divide-y lg:divide-y-0">
          {QUICK_LINKS.map(({ Icon, label, value, href, colour }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 px-6 py-5 hover:bg-white transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colour} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#333]/50 font-semibold uppercase tracking-wide">{label}</p>
                <p className="text-sm font-bold text-[#1A0E07] truncate">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
