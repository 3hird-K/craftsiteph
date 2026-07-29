"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  let theme = "system";
  try {
    const themeContext = useTheme();
    if (themeContext?.theme) theme = themeContext.theme;
  } catch (_) {}

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        className:
          "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg text-xs font-medium rounded-xl border p-2 px-3 max-w-[280px]",
        style: {
          fontSize: "12px",
          lineHeight: "1.3",
          padding: "8px 12px",
          borderRadius: "12px",
          maxWidth: "280px",
          minHeight: "36px",
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-3.5 text-emerald-500 shrink-0" />,
        info: <InfoIcon className="size-3.5 text-sky-500 shrink-0" />,
        warning: <TriangleAlertIcon className="size-3.5 text-amber-500 shrink-0" />,
        error: <OctagonXIcon className="size-3.5 text-rose-500 shrink-0" />,
        loading: <Loader2Icon className="size-3.5 animate-spin text-primary shrink-0" />,
      }}
      {...props}
    />
  )
}

export { Toaster }
