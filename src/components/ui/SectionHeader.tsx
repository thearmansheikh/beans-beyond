import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Extra content rendered below the title/subtitle (e.g. a rating badge) */
  children?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  children,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"} ${className}`}>
      <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-sm mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#6F4E37] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#333]/55 max-w-xl mx-auto">{subtitle}</p>
      )}
      {children}
    </div>
  );
}
