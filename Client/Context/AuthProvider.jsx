import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch(`${baseURL}/api/auth/me`, {
      method: "GET",
      credentials: "include",
      headers,
    })
      .then(async (res) => {
        if (res.status === 401) {
          setAuth(false);
          setLoading(false);
          return;
        }
        const data = await res.json().catch(() => ({}));
        setAuth(data.user || false);
        setLoading(false);
      })
      .catch(() => {
        setAuth(false);
        setLoading(false);
      });
  }, [baseURL]);

  if (loading) return null; // Or a spinner if you prefer

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}