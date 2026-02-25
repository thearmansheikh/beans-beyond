import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const size        = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2C1A0E 0%, #1A0E07 100%)",
          borderRadius: 120,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Warm glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(210,105,30,0.35) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* Monogram */}
        <div
          style={{
            fontSize: 220,
            fontWeight: 900,
            color: "#D2691E",
            lineHeight: 1,
            letterSpacing: "-8px",
          }}
        >
          B
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            fontSize: 60,
            fontWeight: 700,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "12px",
            textTransform: "uppercase",
          }}
        >
          CAFÉ
        </div>
      </div>
    ),
    { ...size }
  );
}
