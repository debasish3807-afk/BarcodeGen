"use client";

import { useState, useEffect, useCallback } from "react";
import { getCurrentUser, logout as clientLogout, type AuthUser } from "@/lib/auth/client";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    clientLogout();
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
  };
}
