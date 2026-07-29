"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Wrench,
  Type,
  BoxSelect,
  Palette,
  Eye,
  Zap,
  Sun,
  Moon,
  Shuffle,
  Copy,
  Clipboard,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

// Imported Reusable UI Components from @/components/ui/
import { ChartBarStacked } from "@/components/ui/bar-chart";
import { CalendarCard } from "@/components/ui/calendar-card";
import { FormControlsSuite } from "@/components/ui/form-controls-suite";
import { CreateAccountCard } from "@/components/ui/create-account-card";
import { FeedbackAvatarsCard } from "@/components/ui/feedback-avatars-card";
import { AccordionCard } from "@/components/ui/accordion-card";
import { RecentTransactionsTable } from "@/components/ui/recent-transactions-table";
import { CraftsiteDashboard } from "@/components/ui/craftsite-dashboard";

// Curated Vibrant Modern Theme Presets
const THEME_PRESETS = [
  {
    name: "Default Theme",
    primaryBg: "#FF4500",
    primaryFg: "#ffffff",
    gradient: "from-orange-600 to-red-500",
  },
  {
    name: "Twitter Sky",
    primaryBg: "#1d9bf0",
    primaryFg: "#ffffff",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    name: "Supabase Green",
    primaryBg: "#3ecf8e",
    primaryFg: "#ffffff",
    gradient: "from-emerald-400 to-emerald-600",
  },
  {
    name: "Royal Purple",
    primaryBg: "#8b5cf6",
    primaryFg: "#ffffff",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Dark Obsidian",
    primaryBg: "#27272a",
    primaryFg: "#fafafa",
    gradient: "from-zinc-700 to-zinc-900",
  },
  {
    name: "Rose Red",
    primaryBg: "#e11d48",
    primaryFg: "#ffffff",
    gradient: "from-rose-500 to-red-600",
  },
];

const FONT_PRESETS = [
  { name: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', sans-serif" },
  { name: "Inter", value: "'Inter', sans-serif" },
  { name: "Outfit", value: "'Outfit', sans-serif" },
  { name: "Roboto", value: "'Roboto', sans-serif" },
  { name: "Lora (Serif)", value: "'Lora', serif" },
  { name: "IBM Plex Mono", value: "'IBM Plex Mono', monospace" },
];

const SHADOW_PRESETS = [
  { name: "Flat", class: "shadow-none" },
  { name: "Soft (Sm)", class: "shadow-xs" },
  { name: "Elevated (Md)", class: "shadow-md hover:shadow-lg" },
  { name: "Floating (Lg)", class: "shadow-xl hover:shadow-2xl" },
];

const POPULAR_GOOGLE_FONTS = [
  "Anton", "Amatic SC", "Bitter", "Cabin", "Concert One", "Dancing Script", "Dosis", "Exo 2", 
  "Fira Sans", "Inconsolata", "Indie Flower", "Inter", "Josefin Sans", "Karla", "Lato", 
  "Libre Baskerville", "Manrope", "Merriweather", "Montserrat", "Mulish", "Nunito", "Open Sans", 
  "Oswald", "Outfit", "Oxygen", "Pacifico", "Permanent Marker", "Playfair Display", "Poppins", 
  "Prompt", "PT Sans", "Quicksand", "Raleway", "Righteous", "Roboto", "Rubik", "Shadows Into Light", 
  "Slabo 27px", "Source Sans Pro", "Teko", "Titillium Web", "Work Sans", "Zilla Slab"
];

function ColorTokenRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs py-1.5">
      <div className="flex items-center gap-2.5 shrink-0">
        <label className="relative flex items-center justify-center cursor-pointer group">
          <input
            type="color"
            value={value.startsWith("#") && value.length === 7 ? value : "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <span
            className="h-6 w-6 rounded-full border-2 border-border shadow-xs transition-transform group-hover:scale-110 shrink-0"
            style={{ backgroundColor: value }}
          />
        </label>
        <span className="font-semibold text-foreground text-xs">{label}</span>
      </div>

      <div className="flex items-center gap-1.5 flex-1 max-w-[190px]">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="h-8 font-mono text-[11px] bg-background border-border/70 text-foreground uppercase px-2.5 rounded-lg focus:ring-1 focus:ring-primary flex-1"
        />
        <button
          type="button"
          onClick={() => void navigator.clipboard.writeText(value)}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer shrink-0"
          title="Copy Color"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={async () => {
            try {
              const text = await navigator.clipboard.readText();
              const cleaned = text.trim();
              if (/^#?[0-9A-Fa-f]{6}$/.test(cleaned)) {
                const hex = cleaned.startsWith("#") ? cleaned : `#${cleaned}`;
                onChange(hex);
              }
            } catch (err) {
              console.error("Failed to read clipboard:", err);
            }
          }}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer shrink-0"
          title="Paste Color"
        >
          <Clipboard className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function ThemesPage() {
  // Theme Color Token & Style States (Scoped to Theme Studio Page)
  const [primaryBg, setPrimaryBg] = useState("#FF4500");
  const [primaryFg, setPrimaryFg] = useState("#ffffff");
  const [radius, setRadius] = useState(0.75);
  const [fontFamily, setFontFamily] = useState("'Plus Jakarta Sans', sans-serif");
  const [shadowStyle, setShadowStyle] = useState("shadow-md");
  const [borderWidth, setBorderWidth] = useState("0px");
  const [isDark, setIsDark] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(350); // Default customizer width
  const [isResizing, setIsResizing] = useState(false);
  const [customFontInput, setCustomFontInput] = useState("");
  const [isFontSearchFocused, setIsFontSearchFocused] = useState(false);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  // Sidebar Sub-tab Category State
  const [sidebarTab, setSidebarTab] = useState<"colors" | "typography" | "style">("colors");

  // Studio Interactive States
  const [activePreset, setActivePreset] = useState("Default Theme");
  const [activeTab, setActiveTab] = useState("cards");

  // Clean root HTML styles on unmount & Initialize theme detection globally
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("craftsite-theme");
      const initialIsDark = stored
        ? stored === "dark"
        : document.documentElement.classList.contains("dark") ||
          window.matchMedia("(prefers-color-scheme: dark)").matches;

      setIsDark(initialIsDark);
      
      const root = document.documentElement;
      if (initialIsDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    return () => {
      document.documentElement.style.removeProperty("--primary");
      document.documentElement.style.removeProperty("--primary-foreground");
      document.documentElement.style.removeProperty("--ring");
      document.documentElement.style.removeProperty("--accent");
      document.documentElement.style.removeProperty("--accent-foreground");
      document.documentElement.style.removeProperty("--radius");
      document.documentElement.style.removeProperty("--font-sans");
    };
  }, []);

  const toggleGlobalTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("craftsite-theme", nextDark ? "dark" : "light");

    const root = document.documentElement;
    if (nextDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const shuffleThemeColor = () => {
    const defaultColors = [
      "#FF4500", // Sunset Vermilion / Default Theme
      "#1d9bf0", // Twitter Sky
      "#3ecf8e", // Supabase Green
      "#8b5cf6", // Royal Purple
      "#e11d48", // Rose Red
      "#3b82f6", // Royal Blue
      "#ec4899", // Rose Pink
      "#10b981", // Emerald
      "#a855f7", // Purple
      "#f97316", // Orange
      "#eab308", // Yellow
      "#06b6d4", // Cyan
    ];
    let randomColor = primaryBg;
    while (randomColor === primaryBg) {
      randomColor = defaultColors[Math.floor(Math.random() * defaultColors.length)];
    }
    setPrimaryBg(randomColor);
    setPrimaryFg("#ffffff");

    // Match with preset if possible
    const matchedPreset = THEME_PRESETS.find(p => p.primaryBg.toLowerCase() === randomColor.toLowerCase());
    if (matchedPreset) {
      setActivePreset(matchedPreset.name);
    } else {
      setActivePreset("");
    }
  };

  // Handle sidebar drag resize mouse events
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Constrain sidebar customizer width between 280px and 520px
      const newWidth = Math.max(280, Math.min(520, e.clientX));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Apply Preset
  const applyPreset = (preset: typeof THEME_PRESETS[0]) => {
    setActivePreset(preset.name);
    setPrimaryBg(preset.primaryBg);
    setPrimaryFg(preset.primaryFg);
  };

  const cardClass = `${shadowStyle} border-border/70 backdrop-blur-md bg-card/80 transition-all duration-300 hover:border-primary/40`;

  return (
    <TooltipProvider>
      <div
        id="themes-page-portal-container"
        className={cn(
          "min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col font-sans selection:bg-primary selection:text-primary-foreground themes-page-scoped",
          isDark ? "dark" : "",
          isResizing ? "cursor-col-resize select-none" : ""
        )}
        style={
          {
            "--primary": primaryBg,
            "--primary-foreground": primaryFg,
            "--ring": primaryBg,
            "--accent": primaryBg,
            "--accent-foreground": primaryFg,
            "--radius": `${radius}rem`,
            "--border-width": borderWidth,
            "--font-sans": fontFamily,
          } as React.CSSProperties
        }
      >
        {/* Dynamic Client Scoped Style Overrides for Corner Radius Customization */}
        <style>{`
          ${!FONT_PRESETS.some(f => f.value === fontFamily) && fontFamily ? `@import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(/['"]/g, "").split(",")[0].trim().replace(/ /g, "+")}:wght@400;500;600;700;800&display=swap');` : ""}
          .themes-page-scoped .rounded-xl,
          .themes-page-scoped [class*="rounded-xl"] {
            border-radius: var(--radius) !important;
          }
          .themes-page-scoped .rounded-2xl,
          .themes-page-scoped [class*="rounded-2xl"] {
            border-radius: calc(var(--radius) * 1.3) !important;
          }
          .themes-page-scoped .rounded-3xl,
          .themes-page-scoped [class*="rounded-3xl"] {
            border-radius: calc(var(--radius) * 1.6) !important;
          }
          .themes-page-scoped .rounded-lg,
          .themes-page-scoped [class*="rounded-lg"] {
            border-radius: calc(var(--radius) * 0.8) !important;
          }
          .themes-page-scoped .rounded-md,
          .themes-page-scoped [class*="rounded-md"] {
            border-radius: calc(var(--radius) * 0.7) !important;
          }
          .themes-page-scoped .rounded-sm,
          .themes-page-scoped [class*="rounded-sm"] {
            border-radius: calc(var(--radius) * 0.5) !important;
          }
          .themes-page-scoped .rounded-full,
          .themes-page-scoped [class*="rounded-full"] {
            border-radius: 9999px !important;
          }
          .themes-page-scoped .border,
          .themes-page-scoped [class*="border-"] {
            border-width: var(--border-width) !important;
          }
          /* Calendar range selection continuous block styling overrides */
          .themes-page-scoped .rdp-day {
            position: relative;
            padding: 0 !important;
          }
          .themes-page-scoped .rdp-day button {
            position: relative;
            z-index: 1;
            width: 100% !important;
            height: 100% !important;
            min-height: 32px !important;
            margin: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          /* Range middle cell */
          .themes-page-scoped .rdp-day:has([data-range-middle="true"]) {
            background-color: color-mix(in srgb, var(--primary) 15%, transparent) !important;
            border-radius: 0px !important;
          }
          /* Range start cell background connector on the right half */
          .themes-page-scoped .rdp-day:has([data-range-start="true"]) {
            background: linear-gradient(to right, transparent 50%, color-mix(in srgb, var(--primary) 15%, transparent) 50%) !important;
            border-radius: 0px !important;
          }
          /* Range end cell background connector on the left half */
          .themes-page-scoped .rdp-day:has([data-range-end="true"]) {
            background: linear-gradient(to left, transparent 50%, color-mix(in srgb, var(--primary) 15%, transparent) 50%) !important;
            border-radius: 0px !important;
          }

          /* Round Sunday range middle start */
          .themes-page-scoped .rdp-day:first-child:has([data-range-middle="true"]) {
            border-top-left-radius: ${radius >= 1.4 ? "9999px" : "var(--radius)"} !important;
            border-bottom-left-radius: ${radius >= 1.4 ? "9999px" : "var(--radius)"} !important;
          }
          /* Round Saturday range middle end */
          .themes-page-scoped .rdp-day:last-child:has([data-range-middle="true"]) {
            border-top-right-radius: ${radius >= 1.4 ? "9999px" : "var(--radius)"} !important;
            border-bottom-right-radius: ${radius >= 1.4 ? "9999px" : "var(--radius)"} !important;
          }

          /* Button selection roundings mapping directly to visual customizer */
          .themes-page-scoped [data-selected-single="true"] {
            border-radius: ${radius >= 1.4 ? "9999px" : "var(--radius)"} !important;
            background-color: var(--primary) !important;
            color: var(--primary-foreground) !important;
          }
          .themes-page-scoped [data-range-start="true"] {
            border-top-left-radius: ${radius >= 1.4 ? "9999px" : "var(--radius)"} !important;
            border-bottom-left-radius: ${radius >= 1.4 ? "9999px" : "var(--radius)"} !important;
            border-top-right-radius: 0px !important;
            border-bottom-right-radius: 0px !important;
            background-color: var(--primary) !important;
            color: var(--primary-foreground) !important;
          }
          .themes-page-scoped [data-range-end="true"] {
            border-top-right-radius: ${radius >= 1.4 ? "9999px" : "var(--radius)"} !important;
            border-bottom-right-radius: ${radius >= 1.4 ? "9999px" : "var(--radius)"} !important;
            border-top-left-radius: 0px !important;
            border-bottom-left-radius: 0px !important;
            background-color: var(--primary) !important;
            color: var(--primary-foreground) !important;
          }
          .themes-page-scoped [data-range-start="true"][data-range-end="true"] {
            border-radius: ${radius >= 1.4 ? "9999px" : "var(--radius)"} !important;
            background-color: var(--primary) !important;
            color: var(--primary-foreground) !important;
          }
          .themes-page-scoped [data-range-middle="true"] {
            border-radius: 0px !important;
            background-color: transparent !important;
            color: var(--foreground) !important;
          }

          /* Premium line-thin custom scrollbars scoped to themes page */
          .themes-page-scoped ::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          .themes-page-scoped ::-webkit-scrollbar-track {
            background: transparent;
          }
          .themes-page-scoped ::-webkit-scrollbar-thumb {
            background: var(--border);
            border-radius: 10px;
            border: 1px solid transparent;
            background-clip: padding-box;
          }
          .themes-page-scoped ::-webkit-scrollbar-thumb:hover {
            background: var(--primary);
          }
          .themes-page-scoped {
            scrollbar-width: thin;
            scrollbar-color: var(--border) transparent;
          }
        `}</style>

        {/* Top Glassmorphism Navigation Header */}
        <header className="h-16 border-b border-border/60 bg-card/70 backdrop-blur-2xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
          <div className="flex items-center gap-0">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center bg-transparent hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all duration-200 rounded-xl"
              title="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Separator orientation="vertical" className="h-5 bg-border/60" />
            <div className="flex items-center pl-2 select-none">
              <span className="font-extrabold text-lg sm:text-xl font-sans tracking-tight bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground bg-clip-text text-transparent">
                craftsiteph
              </span>
            </div>
          </div>

          {/* Action Controls: Clean Header */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              asChild
              className="h-9 font-bold text-primary-foreground bg-primary hover:opacity-95 shadow-md shadow-primary/25 rounded-xl cursor-pointer transition-all hover:scale-[1.02] text-xs px-5"
            >
              <Link href="/">
                <Wrench className="h-3.5 w-3.5 mr-2" />
                <span>Build Now</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleGlobalTheme}
              className="h-9 w-9 rounded-xl border-0 outline-none bg-transparent hover:bg-muted/60 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none transition-transform active:scale-90 cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-foreground transition-transform rotate-0 dark:rotate-[360deg]" />
              ) : (
                <Moon className="h-4 w-4 text-foreground transition-transform" />
              )}
            </Button>
          </div>
        </header>

        {/* Main Studio Body Flex Layout (Resizable Sidebar) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* LEFT PANEL: Modern Sidebar Customizer */}
          <aside
            style={{ width: typeof window !== "undefined" ? `${sidebarWidth}px` : "350px" }}
            className="w-full lg:w-auto shrink-0 border-r border-border/60 bg-card/40 backdrop-blur-xl p-5 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] transition-colors duration-300"
          >
            
            {/* Customizer Sub-tab Navigation */}
            <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-muted/60 border border-border/50 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSidebarTab("colors")}
                className={`py-2 rounded-xl text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  sidebarTab === "colors"
                    ? "bg-background text-foreground shadow-sm font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Palette className="h-3.5 w-3.5 text-primary" />
                <span>Colors</span>
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab("typography")}
                className={`py-2 rounded-xl text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  sidebarTab === "typography"
                    ? "bg-background text-foreground shadow-sm font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Type className="h-3.5 w-3.5 text-primary" />
                <span>Fonts</span>
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab("style")}
                className={`py-2 rounded-xl text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  sidebarTab === "style"
                    ? "bg-background text-foreground shadow-sm font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BoxSelect className="h-3.5 w-3.5 text-primary" />
                <span>Style</span>
              </button>
            </div>

            {/* TAB 1: COLORS & PRESETS */}
            {sidebarTab === "colors" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Curated Presets
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {THEME_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => applyPreset(preset)}
                        className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                          activePreset === preset.name
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "border-border/60 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-5 w-5 rounded-full shadow-xs bg-gradient-to-br ${preset.gradient} shrink-0 border border-white/20`}
                          />
                          <span className="font-semibold text-xs">{preset.name}</span>
                        </div>
                        {activePreset === preset.name ? (
                          <Check className="h-4 w-4 text-primary-foreground" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-border/60" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <span>Color Tokens</span>
                    <button
                      type="button"
                      onClick={shuffleThemeColor}
                      className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer shrink-0 flex items-center justify-center gap-1"
                      title="Shuffle Random Color"
                    >
                      <Shuffle className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl border border-border/60 bg-background/80 space-y-3 shadow-xs">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-primary flex items-center justify-between">
                      <span>PRIMARY ACCENT</span>
                    </div>
                    <ColorTokenRow label="Background" value={primaryBg} onChange={setPrimaryBg} />
                    <ColorTokenRow label="Foreground" value={primaryFg} onChange={setPrimaryFg} />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TYPOGRAPHY & FONTS */}
            {sidebarTab === "typography" && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Search Google Fonts
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const matchedFont = POPULAR_GOOGLE_FONTS.find(f => f.toLowerCase() === customFontInput.trim().toLowerCase());
                      if (matchedFont) {
                        setCustomFontInput(matchedFont);
                        setFontFamily(`'${matchedFont}', sans-serif`);
                        setIsFontSearchFocused(false);
                      }
                    }}
                    className="relative w-full"
                  >
                    <Input
                      type="text"
                      placeholder="e.g. Poppins, Oswald..."
                      value={customFontInput}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomFontInput(val);
                        if (!val.trim()) {
                          setFontFamily("'Plus Jakarta Sans', sans-serif");
                        }
                      }}
                      onFocus={() => setIsFontSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsFontSearchFocused(false), 200)}
                      className="h-10 text-xs bg-background/60 w-full"
                    />
                    {isFontSearchFocused && customFontInput && (
                      <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-card border border-border rounded-xl shadow-lg z-50 thin-scrollbar">
                        {POPULAR_GOOGLE_FONTS.filter(font => font.toLowerCase().includes(customFontInput.toLowerCase())).length > 0 ? (
                          POPULAR_GOOGLE_FONTS.filter(font => font.toLowerCase().includes(customFontInput.toLowerCase())).map(font => (
                            <button
                              key={font}
                              type="button"
                              className="w-full text-left px-3 py-2 text-xs hover:bg-muted cursor-pointer transition-colors"
                              onClick={() => {
                                setCustomFontInput(font);
                                setFontFamily(`'${font}', sans-serif`);
                                setIsFontSearchFocused(false);
                              }}
                            >
                              {font}
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-xs text-muted-foreground">No matches found...</div>
                        )}
                      </div>
                    )}
                  </form>
                </div>
                
                <Separator className="bg-border/60" />

                <div className="space-y-3">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Curated Typography
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {FONT_PRESETS.map((font) => (
                      <button
                        key={font.name}
                        type="button"
                        onClick={() => setFontFamily(font.value)}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                          fontFamily === font.value
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "border-border/60 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        <div className="text-sm font-bold" style={{ fontFamily: font.value }}>
                          {font.name}
                        </div>
                        <div className={`text-xs mt-1 ${fontFamily === font.value ? "text-primary-foreground/90" : "text-muted-foreground"}`} style={{ fontFamily: font.value }}>
                          The quick brown fox jumps over the lazy dog.
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: STYLE, RADIUS & SHADOWS */}
            {sidebarTab === "style" && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="p-4 rounded-2xl border border-border/60 bg-background/80 space-y-3.5 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-foreground">
                    <span>Corner Radius</span>
                    <span className="font-mono text-primary font-bold">{radius}rem</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Square", val: 0 },
                      { label: "Small", val: 0.3 },
                      { label: "Medium", val: 0.5 },
                      { label: "Large", val: 0.75 },
                      { label: "Pill", val: 1.4 },
                    ].map((r) => (
                      <button
                        key={r.val}
                        type="button"
                        onClick={() => setRadius(r.val)}
                        className={`py-2 rounded-xl font-mono text-[11px] border cursor-pointer transition-all ${
                          radius === r.val
                            ? "border-primary bg-primary text-primary-foreground font-bold shadow-xs"
                            : "border-border/60 bg-muted/30 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-border/60 bg-background/80 space-y-3.5 shadow-xs">
                  <div className="text-xs font-bold text-foreground">
                    Shadow Intensity
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SHADOW_PRESETS.map((shadow) => (
                      <button
                        key={shadow.name}
                        type="button"
                        onClick={() => setShadowStyle(shadow.class)}
                        className={`p-3 rounded-2xl border text-center text-xs font-bold cursor-pointer transition-all ${
                          shadowStyle === shadow.class
                            ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/40 shadow-xs"
                            : "border-border/60 bg-muted/20 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {shadow.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-border/60 bg-background/80 space-y-3.5 shadow-xs">
                  <div className="text-xs font-bold text-foreground">
                    Border Thickness
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "None", val: "0px" },
                      { label: "Thin", val: "1px" },
                      { label: "Thick", val: "2px" },
                    ].map((b) => (
                      <button
                        key={b.val}
                        type="button"
                        onClick={() => setBorderWidth(b.val)}
                        className={`py-2 rounded-xl font-mono text-[11px] border cursor-pointer transition-all ${
                          borderWidth === b.val
                            ? "border-primary bg-primary text-primary-foreground font-bold shadow-xs"
                            : "border-border/60 bg-muted/30 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>


              </div>
            )}

          </aside>

          {/* DRAG RESIZE HANDLE */}
          <div
            onMouseDown={startResizing}
            className={cn(
              "hidden lg:block w-[5px] hover:bg-primary/50 active:bg-primary cursor-col-resize transition-colors select-none relative z-10 shrink-0 border-r border-border/40",
              isResizing ? "bg-primary w-[6px]" : "bg-border/10"
            )}
            title="Drag to resize customizer"
          />

          {/* RIGHT CANVAS: Clean Modular Component Showcase */}
          <main className="flex-1 p-5 sm:p-8 overflow-y-auto max-h-[calc(100vh-4rem)] space-y-8 bg-muted/15 transition-colors duration-300 relative">
            
            {/* Category Filter Navigation Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-xs">
                {[
                  { id: "cards", label: "Cards" },
                  { id: "dashboard", label: "Dashboard" },
                  { id: "authentication", label: "Authentication" },
                  { id: "portfolio", label: "Portfolio" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-sm font-bold scale-[1.02]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono bg-card/60 px-3.5 py-1.5 rounded-xl border border-border/50">
                <Eye className="h-3.5 w-3.5 text-primary" />
                <span>Active Font:</span>
                <span className="font-bold text-foreground">{fontFamily.split(",")[0].replace(/'/g, "")}</span>
              </div>
            </div>

            {/* DYNAMIC TAB CONTENT */}
            {activeTab === "cards" ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* DYNAMIC RESPONSIVE GRID (Imported @/components/ui/ Components partitioned in columns to eliminate row gaps) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  
                  {/* Left Column Section (Spans 2 columns on desktop) */}
                  <div className="lg:col-span-2 space-y-6 flex flex-col">
                    <ChartBarStacked className={cardClass} />
                    <FormControlsSuite className={cardClass} />
                    <AccordionCard className={cardClass} />
                  </div>

                  {/* Right Column Section (Spans 1 column on desktop) */}
                  <div className="lg:col-span-1 space-y-6 flex flex-col">
                    <CalendarCard className={cardClass} />
                    <CreateAccountCard className={cardClass} />
                    <FeedbackAvatarsCard className={cardClass} />
                  </div>

                </div>

                {/* ROW 4: FULL-WIDTH 3 COLUMNS: Recent Transactions Table */}
                <RecentTransactionsTable className={`w-full ${cardClass}`} />
              </div>
            ) : activeTab === "dashboard" ? (
              <CraftsiteDashboard cardClass={cardClass} />
            ) : (
              <div className="flex flex-col items-center justify-center p-12 py-24 rounded-3xl border border-border/50 bg-card/60 text-center space-y-4 animate-in fade-in duration-300">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
                  <Wrench className="h-6 w-6" />
                </div>
                <div className="space-y-2 max-w-sm">
                  <h3 className="text-lg font-bold capitalize">{activeTab} Layout Studio</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This section will be populated with responsive layout components, modules, and templates tailored for {activeTab} interfaces in future iterations.
                  </p>
                </div>
                <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-pulse w-3/4" />
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </TooltipProvider>
  );
}
