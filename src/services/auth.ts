// ─────────────────────────────────────────────
// Beans & Beyond — Auth Service
// Handles token storage & session management
// ─────────────────────────────────────────────

const TOKEN_KEY = "bb_auth_token";
const USER_KEY  = "bb_auth_user";

export const authService = {
  saveToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  saveUser(user: unknown): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getUser<T>(): T | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },

  isLoggedIn(): boolean {
    return !!this.getToken();
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  isAdmin(): boolean {
    const user = this.getUser<{ role: string }>();
    return user?.role === "admin";
  },
};
