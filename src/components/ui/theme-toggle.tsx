"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("craftsite-theme");
    const initialIsDark = stored
      ? stored === "dark"
      : document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    setIsDark(initialIsDark);
    applyTheme(initialIsDark);
  }, []);

  const applyTheme = (dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("craftsite-theme", nextDark ? "dark" : "light");
    applyTheme(nextDark);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-xl border-0 outline-none bg-transparent hover:bg-muted/60 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none transition-transform active:scale-90 cursor-pointer"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-foreground transition-transform rotate-0 dark:rotate-[360deg]" />
      ) : (
        <Moon className="h-4 w-4 text-foreground transition-transform" />
      )}
    </Button>
  );
}
