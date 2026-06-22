import { createContext, useState, useEffect, useCallback } from "react";
import { api } from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("@Borala:token"));
  const [loading, setLoading] = useState(!!localStorage.getItem("@Borala:token"));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    api.get("/users/me")
      .then((userData) => setUser(userData))
      .catch(() => {
        localStorage.removeItem("@Borala:token");
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = useCallback((newToken, userData = null) => {
    localStorage.setItem("@Borala:token", newToken);
    setToken(newToken);
    if (userData) setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("@Borala:token");
    localStorage.removeItem("@Borala:user");
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
