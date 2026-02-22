import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import "dotenv/config";

import { connectDB } from "./config/database.js";
import authRoutes    from "./routes/auth.js";
import menuRoutes    from "./routes/menu.js";
import orderRoutes   from "./routes/orders.js";
import contactRoutes from "./routes/contact.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app  = express();
const PORT = process.env.PORT ?? 5000;

// ── Security / CORS ─────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  credentials: true,
}));

// ── Global rate limiter ──────────────────────
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ── Body parsing ─────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── Health check ─────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── API Routes ───────────────────────────────
app.use("/api/auth",    authRoutes);
app.use("/api/menu",    menuRoutes);
app.use("/api/orders",  orderRoutes);
app.use("/api/contact", contactRoutes);

// ── 404 + error handlers ─────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start ────────────────────────────────────
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`  Environment: ${process.env.NODE_ENV ?? "development"}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

export default app;
