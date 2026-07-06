"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

// Subscribe to nothing - just used to track hydration
const emptySubscribe = () => () => {};

export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Use useSyncExternalStore to track hydration without setState in effect
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark,
    mounted,
  };
}
