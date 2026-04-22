import React, { useMemo, useState } from "react";
import {
  getCurrentUser,
  login as storageLogin,
  logout as storageLogout,
  requestPasswordReset,
  resetPassword,
  signup as storageSignup,
} from "./authStorage.js";
import { AuthContext } from "./authContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  const value = useMemo(() => {
    return {
      user,
      isAuthed: Boolean(user),
      login: async ({ email, password }) => {
        const u = storageLogin({ email, password });
        setUser(u);
        return u;
      },
      signup: async ({ name, email, password }) => {
        const u = storageSignup({ name, email, password });
        setUser(u);
        return u;
      },
      logout: async () => {
        storageLogout();
        setUser(null);
      },
      requestPasswordReset: async (email) => requestPasswordReset(email),
      resetPassword: async ({ token, password }) => resetPassword({ token, password }),
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

