"use client";

import { useEffect } from "react";

interface Props {
  error:  Error & { digest?: string };
  reset: () => void;
}

/* global-error wraps the root layout, so it must include <html> and <body> */
export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("[Beans & Beyond] Global layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#F8F4EF", fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "480px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #D2691E, #E8944A)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "2rem",
              }}
            >
              ☕
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#1A0E07", marginBottom: "0.75rem" }}>
              Beans &amp; Beyond
            </h1>
            <p style={{ color: "#D2691E", fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Critical error
            </p>
            <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "2rem" }}>
              Something went seriously wrong. Please try refreshing the page.
              If the issue persists, contact us at{" "}
              <a href="mailto:hello@bbcafe.co.uk" style={{ color: "#D2691E" }}>
                hello@bbcafe.co.uk
              </a>
            </p>
            {error.digest && (
              <p style={{ fontSize: "0.75rem", color: "#aaa", fontFamily: "monospace", marginBottom: "1.5rem" }}>
                Ref: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              style={{
                padding: "0.75rem 2rem",
                background: "#D2691E",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
