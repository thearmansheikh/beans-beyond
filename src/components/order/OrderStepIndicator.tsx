import { FiCheck, FiChevronRight, FiShoppingBag, FiGrid, FiCreditCard } from "react-icons/fi";
import type { IconType } from "react-icons";

const STEPS: { label: string; Icon: IconType }[] = [
  { label: "Order Type", Icon: FiShoppingBag },
  { label: "Your Menu",  Icon: FiGrid        },
  { label: "Checkout",   Icon: FiCreditCard  },
];

export default function OrderStepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map(({ label, Icon }, i) => {
        const idx    = i + 1;
        const done   = step > idx;
        const active = step === idx;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  done   ? "bg-green-500 text-white shadow-md shadow-green-500/25" :
                  active ? "bg-gradient-to-r from-[#D2691E] to-[#E8944A] text-white shadow-lg shadow-[#D2691E]/30" :
                           "bg-[#F8F4EF] text-[#333]/40 border border-[#EEE6DC]"
                }`}
              >
                {done
                  ? <FiCheck className="w-3.5 h-3.5" />
                  : <Icon className="w-3.5 h-3.5" />
                }
                <span className="hidden sm:inline whitespace-nowrap">{label}</span>
                <span className="sm:hidden text-xs font-black">{idx}</span>
              </div>
            </div>

            {i < STEPS.length - 1 && (
              <div className="w-8 sm:w-16 mx-1 flex items-center">
                <div className={`h-0.5 w-full transition-all duration-500 ${step > idx ? "bg-green-400" : "bg-[#EEE6DC]"}`} />
                <FiChevronRight className={`w-3 h-3 shrink-0 -ml-1 transition-all ${step > idx ? "text-green-400" : "text-[#DDD]"}`} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
