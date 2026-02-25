import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt     = "Beans & Beyond — Halal Café & Restaurant, Commercial Road, East London";
export const size    = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2C1A0E 0%, #1A0E07 50%, #0D0805 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Warm glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "30%",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(210,105,30,0.18) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #D2691E, #6F4E37)",
            marginBottom: 24,
            fontSize: 36,
          }}
        >
          ☕
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Beans &amp; Beyond
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Halal Café &amp; Restaurant · Commercial Road, E14
        </div>

        {/* Trust pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { emoji: "✓", text: "100% Halal" },
            { emoji: "☕", text: "Open from 7am" },
            { emoji: "📍", text: "East London" },
          ].map(({ emoji, text }) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                color: "rgba(255,255,255,0.75)",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: 20 }}>{emoji}</span>
              {text}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            color: "rgba(255,255,255,0.25)",
            fontSize: 16,
            letterSpacing: "0.08em",
          }}
        >
          bbcafe.co.uk
        </div>
      </div>
    ),
    { ...size }
  );
}
