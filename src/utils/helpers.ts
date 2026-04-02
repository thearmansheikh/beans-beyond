import { HOURS } from "./constants";

// ─── Formatting ───────────────────────────────
export function formatPrice(pence: number): string {
  return `£${pence.toFixed(2)}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// ─── Hours helpers ────────────────────────────
function getLondonParts(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    day:    get("weekday"),
    hour:   parseInt(get("hour"),   10),
    minute: parseInt(get("minute"), 10),
  };
}

export function isRestaurantOpen(): boolean {
  const { day, hour, minute } = getLondonParts(new Date());
  const todayHours = HOURS.find((h) => h.day === day);
  if (!todayHours || todayHours.closed) return false;

  const [openH, openM]   = todayHours.open.split(":").map(Number);
  const [closeH, closeM] = todayHours.close.split(":").map(Number);
  const nowMins   = hour * 60 + minute;
  const openMins  = openH * 60 + openM;
  const closeMins = closeH * 60 + closeM;
  return nowMins >= openMins && nowMins < closeMins;
}

export function getTodayHours(): string {
  const { day } = getLondonParts(new Date());
  const todayHours = HOURS.find((h) => h.day === day);
  if (!todayHours || todayHours.closed) return "Closed today";
  return `${todayHours.open} – ${todayHours.close}`;
}

// ─── Validation ───────────────────────────────
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^(\+44|0)[0-9\s\-]{9,14}$/.test(phone.trim());
}

export function isValidPostcode(postcode: string): boolean {
  return /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(postcode.trim());
}

// ─── Cart helpers ─────────────────────────────
export function generateOrderNumber(): string {
  const prefix = "BB";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
