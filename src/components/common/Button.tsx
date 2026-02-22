"use client";

import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#D2691E] text-white hover:bg-[#B5571A] focus-visible:ring-[#D2691E] shadow-md hover:shadow-lg",
  secondary:
    "bg-[#6F4E37] text-white hover:bg-[#4A3425] focus-visible:ring-[#6F4E37] shadow-md hover:shadow-lg",
  outline:
    "border-2 border-[#6F4E37] text-[#6F4E37] hover:bg-[#6F4E37] hover:text-white focus-visible:ring-[#6F4E37]",
  ghost:
    "text-[#6F4E37] hover:bg-[#F5F5DC] focus-visible:ring-[#6F4E37]",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
};

const sizeClasses: Record<Size, string> = {
  sm:  "px-4  py-2    text-sm  gap-1.5",
  md:  "px-6  py-3    text-base gap-2",
  lg:  "px-8  py-4    text-lg  gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl " +
    "transition-all duration-200 ease-in-out " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const classes = [
    base,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  const content = (
    <>
      {loading ? (
        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (href) {
    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}
