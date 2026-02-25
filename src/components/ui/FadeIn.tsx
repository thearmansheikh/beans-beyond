"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation triggers (ms) */
  delay?: number;
  /** Direction to slide in from */
  from?: "bottom" | "left" | "right" | "none";
  /** How far to slide (px) */
  distance?: number;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  from = "bottom",
  distance = 28,
}: Props) {
  const ref     = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const translateStart =
    from === "bottom" ? `translateY(${distance}px)` :
    from === "left"   ? `translateX(-${distance}px)` :
    from === "right"  ? `translateX(${distance}px)` :
    "none";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translate(0,0)" : translateStart,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
