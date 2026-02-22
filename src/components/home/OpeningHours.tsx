import { HOURS } from "@/utils/constants";

interface OpeningHoursProps {
  /** "light" = white card (Location page), "dark" = dark footer */
  variant?: "light" | "dark";
}

export default function OpeningHours({ variant = "light" }: OpeningHoursProps) {
  const isDark = variant === "dark";

  return (
    <ul className="space-y-2">
      {HOURS.map(({ day, open, close, closed }) => (
        <li key={day} className="flex justify-between text-sm">
          <span
            className={`font-medium w-28 ${
              isDark ? "text-white/60" : "text-[#333]"
            }`}
          >
            {day}
          </span>
          {closed ? (
            <span
              className={
                isDark ? "text-red-400" : "text-red-500 font-medium"
              }
            >
              Closed
            </span>
          ) : (
            <span className={isDark ? "text-white/80" : "text-[#333]/70"}>
              {open} – {close}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
