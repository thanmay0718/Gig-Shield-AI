import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("gigshield_user");
    return raw ? JSON.parse(raw) : null;
  });

  const setSession = (session) => {
    const nextUser = {
      email: session.email,
      role: session.role,
      name: session.name || session.email,
    };
    localStorage.setItem("gigshield_user", JSON.stringify(nextUser));
    localStorage.setItem("token", session.token || "");
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem("gigshield_user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      setSession,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
