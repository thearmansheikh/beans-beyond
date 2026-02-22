"use client";

import { useState, useEffect, useCallback } from "react";
import { authApi } from "@/services/api";
import { authService } from "@/services/auth";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// ─────────────────────────────────────────────
// useAuth — Authentication hook
// ─────────────────────────────────────────────
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user:    null,
    token:   null,
    loading: true,
    error:   null,
  });

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = authService.getToken();
    const user  = authService.getUser<User>();
    setState({ user, token, loading: false, error: null });
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const res = await authApi.login({ email, password }) as {
          token: string; user: User;
        };
        authService.saveToken(res.token);
        authService.saveUser(res.user);
        setState({ user: res.user, token: res.token, loading: false, error: null });
      } catch (err: unknown) {
        setState((s) => ({
          ...s, loading: false,
          error: (err as Error).message ?? "Login failed",
        }));
        throw err;
      }
    },
    []
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const res = await authApi.register({ name, email, password }) as {
          token: string; user: User;
        };
        authService.saveToken(res.token);
        authService.saveUser(res.user);
        setState({ user: res.user, token: res.token, loading: false, error: null });
      } catch (err: unknown) {
        setState((s) => ({
          ...s, loading: false,
          error: (err as Error).message ?? "Registration failed",
        }));
        throw err;
      }
    },
    []
  );

  const logout = useCallback(() => {
    authService.logout();
    setState({ user: null, token: null, loading: false, error: null });
  }, []);

  return {
    user:      state.user,
    token:     state.token,
    loading:   state.loading,
    error:     state.error,
    isLoggedIn: !!state.token,
    isAdmin:   state.user?.role === "admin",
    login,
    register,
    logout,
  };
}
