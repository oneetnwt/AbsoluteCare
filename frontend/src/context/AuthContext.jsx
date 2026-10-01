import { useEffect, useState } from "react";
import axiosInstance from "../services/api/axiosInstance";
import AuthContext from "./authContext";

function normalizeUser(user) {
  if (!user) return null;

  const role = user.role === "user" ? "patient" : user.role;
  return {
    ...user,
    id: user.id || user._id || user.userId,
    firstName: user.firstName || user.firstname || "",
    lastName: user.lastName || user.lastname || "",
    role,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function setAuthUser(nextUser) {
    setUser(normalizeUser(nextUser));
  }

  async function refreshUser() {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/auth/me");
      const currentUser = response.data?.user || response.data;
      const nextUser = normalizeUser(currentUser);
      setUser(nextUser);
      return nextUser;
    } catch (error) {
      if (error.response?.status !== 401) console.error(error);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      if (error.response?.status !== 401) console.error(error);
    } finally {
      setUser(null);
    }
  }

  useEffect(() => {
    const request = window.setTimeout(() => refreshUser(), 0);
    return () => window.clearTimeout(request);
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      setUser(null);
    }

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser: setAuthUser, refreshUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
