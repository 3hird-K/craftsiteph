"use client";

import { useEffect, useState } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { CheckCircle2, Info, AlertCircle, XCircle, Loader2 } from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };
    updateTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === "class") {
          updateTheme();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        style: {
          borderRadius: "14px",
        },
      }}
      icons={{
        success: <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />,
        info: <Info className="h-4 w-4 text-sky-500 shrink-0" />,
        warning: <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />,
        error: <XCircle className="h-4 w-4 text-rose-500 shrink-0" />,
        loading: <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
