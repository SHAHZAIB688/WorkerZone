import { useContext } from "react";
import { AuthContext } from "./authContext.js";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx) return ctx;

  // Fallback to avoid a hard crash (can happen during dev/HMR if modules duplicate).
  // The app remains usable for public pages, and we still surface a clear signal.
  if (typeof window !== "undefined") {
    console.warn("useAuth() called without an AuthProvider. Falling back to a guest session.");
  }

  return {
    user: null,
    isAuthed: false,
    login: async () => {
      throw new Error("AuthProvider missing: login unavailable.");
    },
    signup: async () => {
      throw new Error("AuthProvider missing: signup unavailable.");
    },
    logout: async () => {},
    requestPasswordReset: async () => {
      throw new Error("AuthProvider missing: reset unavailable.");
    },
    resetPassword: async () => {
      throw new Error("AuthProvider missing: reset unavailable.");
    },
  };
}

