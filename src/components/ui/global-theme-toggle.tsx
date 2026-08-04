"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";

export function GlobalThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

  useEffect(() => {
    // Read current theme on mount
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    }
  }, []);

  // Listen for global class changes (since builder also changes it)
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setTheme(isDark ? "dark" : "light");
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("craftsite-theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (pathname?.startsWith("/builder") || pathname?.startsWith("/p/")) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm hover:bg-accent text-foreground transition-all focus:outline-none cursor-pointer"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
