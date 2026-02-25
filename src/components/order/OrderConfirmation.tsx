import { FiCheck } from "react-icons/fi";

const NEXT_STEPS = [
  { icon: "📱", text: "We'll confirm your order via email" },
  { icon: "👨‍🍳", text: "Our kitchen starts preparing your food" },
  { icon: "🔔", text: "You'll get a notification when it's ready" },
];

export default function OrderConfirmation({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="max-w-lg mx-auto text-center py-8">
      {/* Animated tick */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-green-500/30">
          <FiCheck className="w-11 h-11 text-white" />
        </div>
      </div>

      <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07] mb-2">Order Confirmed!</h2>
      <p className="text-[#333]/55 mb-6">Sit back and relax — your feast is on its way ☕</p>

      {/* Order number card */}
      <div className="bg-[#FDFAF7] border border-[#EEE6DC] rounded-2xl px-6 py-5 mb-8 inline-block w-full">
        <p className="text-xs text-[#333]/45 uppercase tracking-widest font-bold mb-1">Order Reference</p>
        <p className="text-2xl font-black text-[#D2691E] tracking-wider">{orderNumber}</p>
        <p className="text-xs text-[#333]/40 mt-1">Save this for your records</p>
      </div>

      {/* Next steps */}
      <div className="bg-white border border-[#EEE6DC] rounded-2xl p-5 mb-8 text-left space-y-4">
        <p className="text-sm font-black text-[#1A0E07] uppercase tracking-wide">What happens next</p>
        {NEXT_STEPS.map(({ icon, text }, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D2691E]/10 flex items-center justify-center shrink-0">
              <span className="text-lg">{icon}</span>
            </div>
            <p className="text-sm text-[#333]/70">{text}</p>
          </div>
        ))}
      </div>

      <a
        href="/"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-[#D2691E]/25 text-base"
      >
        Back to Home
      </a>
    </div>
  );
}
