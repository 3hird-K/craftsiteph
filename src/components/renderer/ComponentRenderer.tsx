"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { BuilderComponent, ComponentProps, ComponentStyle, SiteTheme } from "@/lib/types";
import { styleToCss } from "@/lib/style";
import { PALETTE } from "@/lib/presets";
import { toast } from "sonner";
import {
  Plus,
  X,
  Link2,
  Check,
  ChevronDown,
  ArrowLeftRight,
  Menu,
  Search,
  User,
  Image as ImageIcon,
  Signal,
  Wifi,
  Home,
  Briefcase,
  Info,
  BookOpen,
  Mail,
  Phone,
  ShoppingBag,
  Globe,
  Settings,
  Star,
  Heart,
  Compass,
  MessageSquare,
  HelpCircle,
  LogIn,
  LogOut,
  Sparkles,
  Shield,
  Zap,
  MapPin,
  Clock,
  Send,
  Sun,
  Moon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const ICON_MAP: Record<string, React.ElementType> = {
  home: Home,
  briefcase: Briefcase,
  work: Briefcase,
  info: Info,
  about: Info,
  book: BookOpen,
  blog: BookOpen,
  mail: Mail,
  contact: Mail,
  phone: Phone,
  user: User,
  account: User,
  shop: ShoppingBag,
  bag: ShoppingBag,
  search: Search,
  globe: Globe,
  settings: Settings,
  star: Star,
  heart: Heart,
  compass: Compass,
  chat: MessageSquare,
  message: MessageSquare,
  help: HelpCircle,
  login: LogIn,
  logout: LogOut,
  sparkles: Sparkles,
  shield: Shield,
  zap: Zap,
};

export function RenderIcon({ icon, className = "h-4 w-4 shrink-0" }: { icon?: string; className?: string }) {
  if (!icon) return null;
  const key = icon.toLowerCase().trim();
  const IconComp = ICON_MAP[key];
  if (!IconComp) return null;
  return <IconComp className={className} />;
}

export function isDarkColor(colorStr?: string): boolean | undefined {
  if (!colorStr || colorStr === "transparent" || colorStr === "inherit" || colorStr === "initial") {
    return undefined;
  }
  const str = colorStr.trim().toLowerCase();

  if (
    str === "black" ||
    str === "#000" ||
    str === "#000000" ||
    str.includes("0f172a") ||
    str.includes("020617") ||
    str.includes("030712") ||
    str.includes("0b1329") ||
    str.includes("1e1b4b") ||
    str.includes("18181b") ||
    str.includes("09090b") ||
    str.includes("1e293b") ||
    str.includes("111827") ||
    str.includes("slate-900") ||
    str.includes("zinc-900") ||
    str.includes("gray-900")
  ) {
    return true;
  }
  if (
    str === "white" ||
    str === "#fff" ||
    str === "#ffffff" ||
    str === "#fafafa" ||
    str === "#f8fafc" ||
    str === "#f1f5f9" ||
    str === "#f0f9ff"
  ) {
    return false;
  }

  // Hex colors #rrggbb or #rgb
  if (str.startsWith("#")) {
    let hex = str.slice(1);
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        return lum < 140;
      }
    }
  }

  // RGB / RGBA
  if (str.startsWith("rgb")) {
    const match = str.match(/\d+/g);
    if (match && match.length >= 3) {
      const r = parseInt(match[0], 10);
      const g = parseInt(match[1], 10);
      const b = parseInt(match[2], 10);
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      return lum < 140;
    }
  }

  // HSL / HSLA
  if (str.startsWith("hsl")) {
    const match = str.match(/\d+/g);
    if (match && match.length >= 3) {
      const l = parseInt(match[2], 10);
      return l < 50;
    }
  }

  return undefined;
}

function IconSearchPicker({
  selectedIcon,
  onSelectIcon,
}: {
  selectedIcon?: string;
  onSelectIcon: (iconName: string) => void;
}) {
  const [query, setQuery] = useState("");

  const availableIconKeys = [
    "home", "briefcase", "info", "book", "mail", "phone",
    "user", "shop", "search", "globe", "settings", "star",
    "heart", "compass", "chat", "help", "login", "logout",
    "sparkles", "shield", "zap"
  ].filter((key) => key.includes(query.toLowerCase().trim()));

  return (
    <div className="space-y-1.5 pt-1">
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <span>Link / Button Icon</span>
        {selectedIcon && (
          <button
            type="button"
            onClick={() => onSelectIcon("")}
            className="text-rose-500 hover:underline text-[9px] cursor-pointer"
          >
            Clear Icon
          </button>
        )}
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search icons (home, mail, user)..."
          className="w-full pl-8 pr-3 py-1.5 bg-muted/40 border border-border/80 rounded-xl text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="grid grid-cols-7 gap-1 max-h-28 overflow-y-auto p-1 bg-muted/20 border border-border/60 rounded-xl">
        {availableIconKeys.map((name) => {
          const IconComponent = ICON_MAP[name];
          if (!IconComponent) return null;
          const isSelected = selectedIcon?.toLowerCase() === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onSelectIcon(name)}
              className={`p-1.5 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              title={name}
            >
              <IconComponent className="h-4 w-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

type Props = {
  component: BuilderComponent;
  allComponents?: BuilderComponent[];
  theme: SiteTheme;
  interactive?: boolean;
  device?: "desktop" | "tablet" | "mobile";
  onUpdateProps?: (props: Partial<ComponentProps>) => void;
  onUpdateStyle?: (style: Partial<ComponentStyle>) => void;
};

function Center({
  children,
  maxWidth,
  className = "",
  style,
}: {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 md:px-8 ${className}`}
      style={{ maxWidth: maxWidth || "1120px", ...style }}
    >
      {children}
    </div>
  );
}

function SectionSelectDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { label: string; anchorId: string }[];
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("mousedown", handleOutside);
    }
    return () => window.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const selectedOption =
    value === "#top"
      ? { label: "Top of Page (#top)", anchorId: "#top" }
      : options.find((opt) => opt.anchorId === value || opt.anchorId === `#${value.replace(/^#/, "")}`) ||
        (value && value !== "#"
          ? { label: `Custom: ${value}`, anchorId: value }
          : options[0] || { label: "Top of Page (#top)", anchorId: "#top" });

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between px-3 py-2 bg-muted/40 hover:bg-muted/60 border border-border/80 rounded-xl text-xs font-medium text-foreground transition-all cursor-pointer outline-none focus:ring-1 focus:ring-primary"
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-full left-0 mt-1 w-full max-h-52 overflow-y-auto bg-background border border-border shadow-2xl rounded-xl p-1.5 z-50 space-y-0.5 animate-in fade-in-0 zoom-in-95 cursor-default"
        >
          {options.map((opt, i) => {
            const isSelected = selectedOption.anchorId === opt.anchorId;
            return (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(opt.anchorId);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                  isSelected ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span>{opt.label}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">({opt.anchorId})</span>
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CustomSelectDropdown({
  value,
  options,
  onChange,
  placeholder = "Select option...",
}: {
  value: string;
  options: { label: string; value: string; sublabel?: string }[];
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("mousedown", handleOutside);
    }
    return () => window.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`w-full flex items-center justify-between px-3 py-2 bg-muted/40 hover:bg-muted/60 border rounded-xl text-xs font-medium text-foreground transition-all cursor-pointer outline-none ${
          isOpen
            ? "border-primary ring-1 ring-primary bg-background"
            : "border-border/80 focus:border-primary focus:ring-1 focus:ring-primary"
        }`}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-full left-0 mt-1 w-full max-h-52 overflow-y-auto bg-background border border-border shadow-2xl rounded-xl p-1.5 z-50 space-y-0.5 animate-in fade-in-0 zoom-in-95 cursor-default"
        >
          {options.map((opt, i) => {
            const isSelected = (value || "") === opt.value;
            return (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                  isSelected ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span>{opt.label}</span>
                  {opt.sublabel && (
                    <span className="text-[10px] font-mono text-muted-foreground">({opt.sublabel})</span>
                  )}
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EditModalPortal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const scrollContainer = document.getElementById("canvas-scroll-viewport");
    if (scrollContainer) {
      scrollContainer.style.overflowY = "hidden";
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.style.overflowY = "auto";
      }
    };
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  const host = document.getElementById("canvas-host") || document.body;
  const isCanvas = host.id === "canvas-host";

  return createPortal(
    <div
      className={`${
        isCanvas ? "absolute inset-0 w-full h-full" : "fixed inset-0"
      } z-[9999999] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto animate-in fade-in-0`}
      onClick={onClose}
    >
      {children}
    </div>,
    host
  );
}

function LogoEditItem({
  logoText,
  logoHref = "#top",
  logoFontFamily = "",
  logoFontSize = "",
  logoFontWeight = "",
  logoFontStyle = "normal",
  logoTextTransform = "none",
  logoColor = "",
  sectionOptions,
  onSave,
  onRemove,
  onClose,
}: {
  logoText: string;
  logoHref?: string;
  logoFontFamily?: string;
  logoFontSize?: string;
  logoFontWeight?: string;
  logoFontStyle?: string;
  logoTextTransform?: string;
  logoColor?: string;
  sectionOptions: { label: string; anchorId: string }[];
  onSave: (data: {
    logoText: string;
    logoHref: string;
    logoFontFamily?: string;
    logoFontSize?: string;
    logoFontWeight?: string;
    logoFontStyle?: string;
    logoTextTransform?: string;
    logoColor?: string;
  }) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const [draftText, setDraftText] = useState(logoText || "");
  const [draftHref, setDraftHref] = useState(logoHref || "#top");
  const [draftFontFamily, setDraftFontFamily] = useState(logoFontFamily || "");
  const [draftFontSize, setDraftFontSize] = useState(logoFontSize || "");
  const [draftFontWeight, setDraftFontWeight] = useState(logoFontWeight || "");
  const [draftFontStyle, setDraftFontStyle] = useState(logoFontStyle || "normal");
  const [draftTextTransform, setDraftTextTransform] = useState(logoTextTransform || "none");
  const [draftColor, setDraftColor] = useState(logoColor || "");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      onClose();
    };

    const timer = setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    }, 10);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  const presetColors = [
    { label: "Default", value: "" },
    { label: "Black", value: "#000000" },
    { label: "White", value: "#ffffff" },
    { label: "Indigo", value: "#4f46e5" },
    { label: "Emerald", value: "#10b981" },
    { label: "Rose", value: "#e11d48" },
    { label: "Amber", value: "#f59e0b" },
    { label: "Purple", value: "#9333ea" },
  ];

  const fontFamilyOptions = [
    { label: "Default Theme Font", value: "" },
    { label: "Inter (Sans-serif)", value: "Inter, system-ui, sans-serif" },
    { label: "Playfair Display (Serif)", value: '"Playfair Display", Georgia, serif' },
    { label: "Outfit (Modern)", value: '"Outfit", system-ui, sans-serif' },
    { label: "Poppins (Geometric)", value: '"Poppins", system-ui, sans-serif' },
    { label: "Roboto (Clean)", value: "Roboto, system-ui, sans-serif" },
    { label: "Cinzel (Luxury Serif)", value: '"Cinzel", serif' },
    { label: "Pacifico (Handwritten)", value: '"Pacifico", cursive' },
    { label: "Plus Jakarta Sans", value: '"Plus Jakarta Sans", sans-serif' },
    { label: "Lora (Classic Serif)", value: '"Lora", serif' },
    { label: "IBM Plex Mono (Code)", value: '"IBM Plex Mono", monospace' },
    { label: "Space Grotesk (Display)", value: '"Space Grotesk", sans-serif' },
    { label: "Georgia (Serif)", value: "Georgia, serif" },
  ];

  const fontSizeOptions = [
    { label: "Default (18px)", value: "" },
    { label: "14px (Small)", value: "14px" },
    { label: "16px (Base)", value: "16px" },
    { label: "18px (Medium)", value: "18px" },
    { label: "20px (Large)", value: "20px" },
    { label: "24px (XL)", value: "24px" },
    { label: "28px (2XL)", value: "28px" },
    { label: "32px (3XL)", value: "32px" },
    { label: "36px (4XL)", value: "36px" },
  ];

  const fontWeightOptions = [
    { label: "Default (Extrabold)", value: "" },
    { label: "Normal (400)", value: "400" },
    { label: "Medium (500)", value: "500" },
    { label: "Semibold (600)", value: "600" },
    { label: "Bold (700)", value: "700" },
    { label: "Extrabold (800)", value: "800" },
    { label: "Black (900)", value: "900" },
  ];

  const fontStyleOptions = [
    { label: "Normal", value: "normal" },
    { label: "Italic", value: "italic" },
  ];

  const textTransformOptions = [
    { label: "As Typed", value: "none" },
    { label: "UPPERCASE", value: "uppercase" },
    { label: "lowercase", value: "lowercase" },
    { label: "Capitalize", value: "capitalize" },
  ];

  return (
    <EditModalPortal onClose={onClose}>
      <div
        ref={popoverRef}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl my-auto max-h-[85vh] overflow-y-auto p-5 bg-background border border-border shadow-2xl rounded-2xl text-foreground text-xs space-y-4 animate-in zoom-in-95 cursor-default text-left font-normal"
      >
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <span className="font-extrabold text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Link2 className="h-3.5 w-3.5 text-primary" /> Edit Logo & Typography
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
        {/* Left Column: Preview, Text & Core Typography */}
        <div className="space-y-3">
          {/* Live Preview */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Live Logo Preview
            </label>
            <div className="p-3 rounded-xl border border-border/80 bg-muted/30 flex items-center justify-center overflow-hidden min-h-[48px]">
              <span
                style={{
                  fontFamily: draftFontFamily || undefined,
                  fontSize: draftFontSize || "18px",
                  fontWeight: draftFontWeight || "800",
                  fontStyle: draftFontStyle || "normal",
                  textTransform: (draftTextTransform as React.CSSProperties["textTransform"]) || "none",
                  color: draftColor || "inherit",
                }}
                className="truncate transition-all max-w-full text-center"
              >
                {draftText || "Brand"}
              </span>
            </div>
          </div>

          {/* Logo Text */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Logo Text Name
            </label>
            <input
              type="text"
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              placeholder="e.g. Studio"
              className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-semibold text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* Font Family */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Font Family</label>
            <CustomSelectDropdown
              value={draftFontFamily}
              onChange={(val) => setDraftFontFamily(val)}
              options={fontFamilyOptions}
              placeholder="Select Font Family"
            />
          </div>

          {/* Font Size & Weight */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Font Size</label>
              <CustomSelectDropdown
                value={draftFontSize}
                onChange={(val) => setDraftFontSize(val)}
                options={fontSizeOptions}
                placeholder="Font Size"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Font Weight</label>
              <CustomSelectDropdown
                value={draftFontWeight}
                onChange={(val) => setDraftFontWeight(val)}
                options={fontWeightOptions}
                placeholder="Font Weight"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Style, Case, Color & Link Settings */}
        <div className="space-y-3">
          {/* Font Style & Text Case */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Style</label>
              <CustomSelectDropdown
                value={draftFontStyle}
                onChange={(val) => setDraftFontStyle(val)}
                options={fontStyleOptions}
                placeholder="Font Style"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Text Case</label>
              <CustomSelectDropdown
                value={draftTextTransform}
                onChange={(val) => setDraftTextTransform(val)}
                options={textTransformOptions}
                placeholder="Text Case"
              />
            </div>
          </div>

          {/* Custom Text Color */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Text Color</label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {presetColors.map((c) => (
                <button
                  key={c.value || "default"}
                  type="button"
                  onClick={() => setDraftColor(c.value)}
                  className={`h-5 w-5 rounded-full border transition-transform cursor-pointer ${
                    draftColor === c.value ? "scale-110 ring-2 ring-primary ring-offset-1" : "hover:scale-105 opacity-80"
                  }`}
                  style={{
                    backgroundColor: c.value || "transparent",
                    borderColor: c.value === "#ffffff" ? "#ccc" : "transparent",
                  }}
                  title={c.label}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="color"
                value={draftColor || "#000000"}
                onChange={(e) => setDraftColor(e.target.value)}
                className="h-7 w-8 rounded-md border border-border cursor-pointer bg-transparent p-0.5"
              />
              <input
                type="text"
                value={draftColor}
                onChange={(e) => setDraftColor(e.target.value)}
                placeholder="e.g. #4f46e5 or transparent"
                className="flex-1 px-2.5 py-1 bg-muted/40 border border-border/80 rounded-xl text-xs font-mono text-foreground outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Link Settings */}
          <div className="space-y-1.5 pt-1 border-t border-border/60">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Scroll To Section
            </label>
            <SectionSelectDropdown
              value={draftHref}
              options={sectionOptions}
              onChange={(val) => {
                if (val !== "CUSTOM_URL") {
                  setDraftHref(val);
                }
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Target URL
            </label>
            <input
              type="text"
              value={draftHref}
              onChange={(e) => setDraftHref(e.target.value)}
              placeholder="e.g. #top or https://..."
              className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-mono text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-border/60 flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={onRemove}
          className="flex-1 w-1/2 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <X className="h-3.5 w-3.5" /> Remove
        </button>
        <button
          type="button"
          onClick={() =>
            onSave({
              logoText: draftText,
              logoHref: draftHref,
              logoFontFamily: draftFontFamily || undefined,
              logoFontSize: draftFontSize || undefined,
              logoFontWeight: draftFontWeight || undefined,
              logoFontStyle: draftFontStyle || undefined,
              logoTextTransform: draftTextTransform || undefined,
              logoColor: draftColor || undefined,
            })
          }
          className="flex-1 w-1/2 py-2 text-xs font-bold text-white bg-primary hover:brightness-110 shadow-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          <Check className="h-3.5 w-3.5" /> Done
        </button>
      </div>
      </div>
    </EditModalPortal>
  );
}

function LinkEditItem({
  link,
  sectionOptions,
  alignRight = false,
  positionUp = false,
  onSave,
  onRemove,
  onClose,
}: {
  link: { label: string; href?: string; variant?: string; icon?: string };
  sectionOptions: { label: string; anchorId: string }[];
  alignRight?: boolean;
  positionUp?: boolean;
  onSave: (label: string, href: string, icon?: string) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const [draftLabel, setDraftLabel] = useState(link.label || "");
  const [draftHref, setDraftHref] = useState(link.href || "#");
  const [draftIcon, setDraftIcon] = useState(link.icon || "");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      onClose();
    };

    const timer = setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    }, 10);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <EditModalPortal onClose={onClose}>
      <div
        ref={popoverRef}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl my-auto max-h-[85vh] overflow-y-auto p-5 bg-background border border-border shadow-2xl rounded-2xl text-foreground text-xs space-y-4 animate-in zoom-in-95 cursor-default text-left font-normal"
      >
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <span className="font-extrabold text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Link2 className="h-3.5 w-3.5 text-primary" /> Edit Nav Link
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
        {/* Left Column: Link Label & Navigation settings */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Link Label Text
            </label>
            <input
              type="text"
              value={draftLabel}
              onChange={(e) => setDraftLabel(e.target.value)}
              placeholder="e.g. Work"
              className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-semibold text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Scroll To Section
            </label>
            <SectionSelectDropdown
              value={draftHref}
              options={sectionOptions}
              onChange={(val) => setDraftHref(val)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Target URL
            </label>
            <input
              type="text"
              value={draftHref}
              onChange={(e) => setDraftHref(e.target.value)}
              placeholder="e.g. #hero-1 or https://..."
              className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-mono text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Right Column: Icon Search Picker */}
        <div className="space-y-1.5 flex flex-col justify-start">
          <IconSearchPicker
            selectedIcon={draftIcon}
            onSelectIcon={(iconName) => setDraftIcon(iconName)}
          />
        </div>
      </div>

      <div className="pt-2 border-t border-border/60 flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={onRemove}
          className="flex-1 w-1/2 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <X className="h-3.5 w-3.5" /> Remove
        </button>
        <button
          type="button"
          onClick={() => onSave(draftLabel, draftHref, draftIcon)}
          className="flex-1 w-1/2 py-2 text-xs font-bold text-white bg-primary hover:brightness-110 shadow-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          <Check className="h-3.5 w-3.5" /> Done
        </button>
      </div>
      </div>
    </EditModalPortal>
  );
}

function ButtonEditItem({
  button,
  sectionOptions,
  alignRight = false,
  positionUp = false,
  onSave,
  onRemove,
  onClose,
}: {
  button: { label: string; href?: string; variant?: "solid" | "outline" | "ghost"; icon?: string };
  sectionOptions: { label: string; anchorId: string }[];
  alignRight?: boolean;
  positionUp?: boolean;
  onSave: (label: string, href: string, variant: "solid" | "outline" | "ghost", icon?: string) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const [draftLabel, setDraftLabel] = useState(button.label || "");
  const [draftHref, setDraftHref] = useState(button.href || "#");
  const [draftVariant, setDraftVariant] = useState<"solid" | "outline" | "ghost">(button.variant || "solid");
  const [draftIcon, setDraftIcon] = useState(button.icon || "");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      onClose();
    };

    const timer = setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    }, 10);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <EditModalPortal onClose={onClose}>
      <div
        ref={popoverRef}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl my-auto max-h-[85vh] overflow-y-auto p-5 bg-background border border-border shadow-2xl rounded-2xl text-foreground text-xs space-y-4 animate-in zoom-in-95 cursor-default text-left font-normal"
      >
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <span className="font-extrabold text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Link2 className="h-3.5 w-3.5 text-primary" /> Edit Button Link
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
        {/* Left Column: Label, Style & Link settings */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Button Label
            </label>
            <input
              type="text"
              value={draftLabel}
              onChange={(e) => setDraftLabel(e.target.value)}
              placeholder="e.g. Sign In"
              className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-semibold text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Button Style
            </label>
            <div className="grid grid-cols-3 gap-1 bg-muted/30 p-1 rounded-xl border border-border/60">
              {(["solid", "outline", "ghost"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setDraftVariant(v)}
                  className={`py-1.5 text-[10px] font-bold capitalize rounded-lg transition-all cursor-pointer ${
                    draftVariant === v
                      ? "bg-primary text-white shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Scroll To Section
            </label>
            <SectionSelectDropdown
              value={draftHref}
              options={sectionOptions}
              onChange={(val) => setDraftHref(val)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Target URL
            </label>
            <input
              type="text"
              value={draftHref}
              onChange={(e) => setDraftHref(e.target.value)}
              placeholder="e.g. #hero-1 or https://..."
              className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-mono text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Right Column: Icon Search Picker */}
        <div className="space-y-1.5 flex flex-col justify-start">
          <IconSearchPicker
            selectedIcon={draftIcon}
            onSelectIcon={(iconName) => setDraftIcon(iconName)}
          />
        </div>
      </div>

      <div className="pt-2 border-t border-border/60 flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={onRemove}
          className="flex-1 w-1/2 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <X className="h-3.5 w-3.5" /> Remove
        </button>
        <button
          type="button"
          onClick={() => onSave(draftLabel, draftHref, draftVariant, draftIcon)}
          className="flex-1 w-1/2 py-2 text-xs font-bold text-white bg-primary hover:brightness-110 shadow-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          <Check className="h-3.5 w-3.5" /> Done
        </button>
      </div>
      </div>
    </EditModalPortal>
  );
}

function ImageEditItem({
  currentUrl,
  currentUrl2,
  currentUrl3,
  currentAlt,
  currentBorderRadius,
  currentObjectFit,
  currentAspectRatio,
  currentImageLayout,
  onSave,
  onClose,
}: {
  currentUrl?: string;
  currentUrl2?: string;
  currentUrl3?: string;
  currentAlt?: string;
  currentBorderRadius?: string;
  currentObjectFit?: string;
  currentAspectRatio?: string;
  currentImageLayout?: string;
  onSave: (props: { url: string; url2?: string; url3?: string; imageLayout?: string; alt?: string; imageBorderRadius?: string; objectFit?: string; aspectRatio?: string }) => void;
  onClose: () => void;
}) {
  const [draftUrl, setDraftUrl] = useState(currentUrl || "");
  const [draftUrl2, setDraftUrl2] = useState(currentUrl2 || "");
  const [draftUrl3, setDraftUrl3] = useState(currentUrl3 || "");
  const [draftAlt, setDraftAlt] = useState(currentAlt || "");
  const [draftBorderRadius, setDraftBorderRadius] = useState(currentBorderRadius || "16px");
  const [draftObjectFit, setDraftObjectFit] = useState(currentObjectFit || "cover");
  const [draftAspectRatio, setDraftAspectRatio] = useState(currentAspectRatio || "auto");
  const [draftImageLayout, setDraftImageLayout] = useState(currentImageLayout || "single");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const timer = setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    }, 50);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  const sampleImages = [
    { label: "Design Sketch", url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80" },
    { label: "Modern Dashboard", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" },
    { label: "Workspace Office", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80" },
    { label: "Mobile App Screen", url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80" },
  ];

  const borderRadiusOptions = [
    { label: "Default Rounded (16px)", value: "16px" },
    { label: "Square / Sharp (0px)", value: "0px" },
    { label: "Subtle Round (8px)", value: "8px" },
    { label: "Medium Round (12px)", value: "12px" },
    { label: "Large Round (24px)", value: "24px" },
    { label: "Extra Large (32px)", value: "32px" },
    { label: "Full Round (Circle / Oval)", value: "9999px" },
  ];

  const objectFitOptions = [
    { label: "Cover (Fill Shape)", value: "cover" },
    { label: "Contain (Show Whole Image)", value: "contain" },
    { label: "Fill (Stretch to Shape)", value: "fill" },
  ];

  const aspectRatioOptions = [
    { label: "Auto (Original)", value: "auto" },
    { label: "Square (1:1)", value: "1/1" },
    { label: "Landscape (16:9)", value: "16/9" },
    { label: "Standard (4:3)", value: "4/3" },
    { label: "Portrait (4:5)", value: "4/5" },
  ];

  const imageLayoutOptions = [
    { label: "Single Image", value: "single" },
    { label: "Bento Grid (3 Images)", value: "bento" },
    { label: "Background Image", value: "background" },
  ];

  return (
    <EditModalPortal onClose={onClose}>
      <div
        ref={popoverRef}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md my-auto max-h-[85vh] overflow-y-auto p-5 bg-background border border-border shadow-2xl rounded-2xl text-foreground text-xs space-y-3.5 animate-in zoom-in-95 cursor-default text-left font-normal"
      >
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <span className="font-extrabold text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5 text-primary" /> Edit Image & Shape
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Image Layout
        </label>
        <CustomSelectDropdown
          value={draftImageLayout}
          onChange={(val) => {
            setDraftImageLayout(val);
            if (val === "bento" && !draftUrl2) {
              setDraftUrl2("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80");
            }
            if (val === "bento" && !draftUrl3) {
              setDraftUrl3("https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80");
            }
          }}
          options={imageLayoutOptions}
          placeholder="Select Layout"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Image Address (URL)
        </label>
        <input
          type="text"
          value={draftUrl}
          onChange={(e) => setDraftUrl(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-mono text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {draftImageLayout === "bento" && (
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Image Address 2 (URL)
          </label>
          <input
            type="text"
            value={draftUrl2}
            onChange={(e) => setDraftUrl2(e.target.value)}
            placeholder="Second Image URL..."
            className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-mono text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      )}

      {draftImageLayout === "bento" && (
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Image Address 3 (URL)
          </label>
          <input
            type="text"
            value={draftUrl3}
            onChange={(e) => setDraftUrl3(e.target.value)}
            placeholder="Third Image URL..."
            className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-mono text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Photo Border Radius / Shape
        </label>
        <CustomSelectDropdown
          value={draftBorderRadius}
          onChange={(val) => setDraftBorderRadius(val)}
          options={borderRadiusOptions}
          placeholder="Select Border Radius"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Image Object Fit
          </label>
          <CustomSelectDropdown
            value={draftObjectFit}
            onChange={(val) => setDraftObjectFit(val)}
            options={objectFitOptions}
            placeholder="Select Object Fit"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Image Aspect Ratio
          </label>
          <CustomSelectDropdown
            value={draftAspectRatio}
            onChange={(val) => setDraftAspectRatio(val)}
            options={aspectRatioOptions}
            placeholder="Select Aspect Ratio"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Sample Image Presets
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {sampleImages.map((img) => {
            const isSelected = draftUrl === img.url;
            return (
              <button
                key={img.label}
                type="button"
                onClick={() => setDraftUrl(img.url)}
                className={`p-2 rounded-xl border text-[10px] font-bold text-left truncate transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-muted/40 hover:bg-muted border-border/80 text-foreground hover:border-primary/50"
                }`}
              >
                <span className="truncate">{img.label}</span>
                {isSelected && <Check className="h-3 w-3 text-white shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 border-t border-border/60 flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2 text-xs font-bold text-muted-foreground hover:bg-muted border border-border rounded-xl transition-colors shrink-0"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave({
            url: draftUrl,
            url2: draftUrl2,
            url3: draftUrl3,
            imageLayout: draftImageLayout,
            alt: draftAlt,
            imageBorderRadius: draftBorderRadius,
            objectFit: draftObjectFit,
            aspectRatio: draftAspectRatio
          })}
          className="flex-1 py-2 text-xs font-bold text-white bg-primary hover:brightness-110 shadow-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          <Check className="h-3.5 w-3.5" /> Save Image
        </button>
      </div>
      </div>
    </EditModalPortal>
  );
}

function SpacerEditItem({
  currentHeight,
  onSave,
  onClose,
}: {
  currentHeight: string;
  onSave: (height: string) => void;
  onClose: () => void;
}) {
  const [draftHeight, setDraftHeight] = useState(currentHeight || "48px");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const timer = setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    }, 50);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <EditModalPortal onClose={onClose}>
      <div
        ref={popoverRef}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs my-auto p-5 bg-background border border-border shadow-2xl rounded-2xl text-foreground text-xs space-y-3.5 animate-in zoom-in-95 cursor-default text-left font-normal"
      >
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <span className="font-extrabold text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Settings className="h-3.5 w-3.5 text-primary" /> Custom Spacer Height
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Height Value (px / rem)
        </label>
        <input
          type="text"
          value={draftHeight}
          onChange={(e) => setDraftHeight(e.target.value)}
          placeholder="e.g. 64px or 4rem"
          className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-mono text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      <div className="pt-2 border-t border-border/60 flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-1.5 text-xs font-bold text-muted-foreground hover:bg-muted border border-border rounded-xl transition-colors shrink-0"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(draftHeight)}
          className="flex-1 py-1.5 text-xs font-bold text-white bg-primary hover:brightness-110 shadow-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          <Check className="h-3.5 w-3.5" /> Apply
        </button>
      </div>
      </div>
    </EditModalPortal>
  );
}


export function ComponentRenderer({
  component,
  allComponents = [],
  theme,
  selected = false,
  interactive = false,
  device = "desktop",
  onUpdateProps,
  onUpdateStyle,
}: {
  component: BuilderComponent;
  allComponents?: BuilderComponent[];
  theme: SiteTheme;
  selected?: boolean;
  interactive?: boolean;
  device?: "desktop" | "tablet" | "mobile";
  onUpdateProps?: (props: Partial<ComponentProps>) => void;
  onUpdateStyle?: (style: Partial<ComponentStyle>) => void;
}) {
  const { type, props, style } = component;
  const css = styleToCss(style);
  const radius = style.borderRadius || theme.borderRadius || "12px";
  const btnRadius = theme.borderRadius || "12px";
  const shadow = style.boxShadow || theme.boxShadow || "none";
  const effectiveMaxWidth = theme.containerWidth || style.maxWidth || "1120px";
  const primary = theme.primaryColor;
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";
  const isMobileOrTablet = isMobile || isTablet;

  const aosAttrs = !interactive && props.scrollAnimation
    ?     ({
        "data-aos": props.scrollAnimation,
        ...(props.scrollAnimationDuration
          ? { "data-aos-duration": props.scrollAnimationDuration }
          : {}),
      } as const)
    : null;

  const isFollowingNavbar = React.useMemo(() => {
    if (!allComponents || allComponents.length < 2) return false;
    const idx = allComponents.findIndex((c) => c.id === component.id);
    const navOverlay =
      allComponents[0].props?.variant === "floating-glass"
        ? "overlay"
        : (allComponents[0].props?.scrollBehavior ?? "overlay");
    return idx === 1 && allComponents[0].type === "navbar" && navOverlay === "overlay";
  }, [allComponents, component.id]);

  const pageBgDark = theme.mode === "dark" || isDarkColor(theme.backgroundColor) === true;
  const compBgDark = isDarkColor(style.backgroundColor);
  const isDarkSection = compBgDark !== undefined ? compBgDark : pageBgDark;

  const headingTextColor = isDarkSection
    ? (theme.headingColor && isDarkColor(theme.headingColor) === false ? theme.headingColor : "#f8fafc")
    : (theme.headingColor && isDarkColor(theme.headingColor) === true ? theme.headingColor : "#0f172a");

  const bodyTextColor = isDarkSection
    ? (theme.bodyColor && isDarkColor(theme.bodyColor) === false ? theme.bodyColor : "#cbd5e1")
    : (theme.bodyColor && isDarkColor(theme.bodyColor) === true ? theme.bodyColor : "#475569");

  const getSectionAnchorId = (c: BuilderComponent): string => {
    const sameType = allComponents.filter((item) => item.type === c.type);
    const typeIndex = sameType.findIndex((item) => item.id === c.id) + 1;
    const fallbackId = `${c.type}-${typeIndex > 0 ? typeIndex : 1}`;
    const rawAnchor = c.style?.id || c.props?.sectionId || fallbackId;
    return rawAnchor.replace(/^#/, "").trim();
  };

  const currentSectionId = getSectionAnchorId(component);

  if (type === "spacer") {
    const currentHeight = style.paddingY || style.padding || (style as any).height || "48px";
    const [isEditingSpacer, setIsEditingSpacer] = useState(false);

    return (
      <section
        {...aosAttrs}
        id={currentSectionId}
        style={{
          ...css,
          minHeight: interactive ? "40px" : currentHeight,
          height: !interactive ? currentHeight : undefined,
        }}
        className="relative w-full group/spacer transition-all my-1"
      >
        <div
          className={`w-full flex items-center justify-center relative transition-all ${
            interactive
              ? "bg-primary/5 border border-dashed border-primary/40 rounded-xl hover:border-primary"
              : ""
          }`}
          style={{ height: currentHeight }}
        >
          {interactive && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-background/95 backdrop-blur-md border border-border shadow-xl text-foreground text-xs font-semibold z-20 transition-all cursor-default select-none">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Spacer:</span>
              <span className="font-bold text-primary font-mono">{currentHeight}</span>

              <div className="flex items-center gap-1 ml-1.5 pl-2 border-l border-border/60">
                {["24px", "48px", "64px", "96px", "128px"].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateStyle?.({ paddingY: h });
                    }}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                      currentHeight === h
                        ? "bg-primary text-white shadow-xs scale-105"
                        : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60"
                    }`}
                  >
                    {h}
                  </button>
                ))}

                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingSpacer(!isEditingSpacer);
                    }}
                    className={`p-1 rounded-lg border transition-all cursor-pointer ${
                      isEditingSpacer
                        ? "bg-primary text-white border-primary"
                        : "bg-muted/40 hover:bg-muted border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                    title="Custom Height Input"
                  >
                    <Settings className="h-3.5 w-3.5" />
                  </button>

                  {isEditingSpacer && (
                    <SpacerEditItem
                      currentHeight={currentHeight}
                      onSave={(newHeight) => {
                        onUpdateStyle?.({ paddingY: newHeight });
                        setIsEditingSpacer(false);
                      }}
                      onClose={() => setIsEditingSpacer(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  const sectionOptions = allComponents
    .filter((c) => c.type !== "navbar")
    .map((c) => {
      const sameType = allComponents.filter((item) => item.type === c.type);
      const typeIndex = sameType.findIndex((item) => item.id === c.id) + 1;
      const baseLabel = PALETTE.find((p) => p.type === c.type)?.label || (c.type.charAt(0).toUpperCase() + c.type.slice(1));
      const label = `${baseLabel} ${typeIndex > 0 ? typeIndex : 1}`;
      const anchorId = getSectionAnchorId(c);
      return {
        label: `${label}`,
        anchorId: `#${anchorId}`,
      };
    });

  if (type === "navbar") {
    const variant = props.variant || "classic-split";
    const scrollBehavior = props.scrollBehavior || "overlay";
    const isFloating = variant === "floating-glass" || Boolean(style.maxWidth && style.maxWidth !== "100%" && style.maxWidth !== "auto");
    const headerRadius = style.borderRadius || (variant === "floating-glass" ? (theme.borderRadius || "12px") : "0px");

    const isDefaultPresetBg =
      !style.backgroundColor ||
      style.backgroundColor === "transparent" ||
      style.backgroundColor === "#0f172a" ||
      style.backgroundColor === "#0b1329" ||
      style.backgroundColor === "#020617" ||
      style.backgroundColor === "#ffffff" ||
      style.backgroundColor === "#f8fafc" ||
      style.backgroundColor === "#fafafa" ||
      style.backgroundColor === "#f1f5f9";

    const defaultBg =
      variant === "floating-glass"
        ? (!pageBgDark ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.85)")
        : (!pageBgDark ? "#ffffff" : "#0f172a");

    const headerBg = isDefaultPresetBg ? defaultBg : style.backgroundColor;

    const navBgDark = isDarkColor(headerBg);
    const isDarkNav = navBgDark !== undefined ? navBgDark : pageBgDark;

    const headerTextColor = isDarkNav ? "#f8fafc" : "#0f172a";
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNavHidden, setIsNavHidden] = useState(false);

    if (variant === "floating-glass") {
      css.position = "sticky";
      css.top = "16px";
      css.zIndex = 50;
      css.marginTop = "16px";
      css.marginBottom = "24px";
      css.width = "calc(100% - 2rem)";
      css.maxWidth = effectiveMaxWidth;
      css.marginLeft = "auto";
      css.marginRight = "auto";
      css.pointerEvents = "auto";
    } else {
      css.width = "100%";
      css.maxWidth = "100%";
      if (!style.marginY) {
        css.marginBottom = "16px";
      }
    }

    // Apply the user-selected scroll behavior to non-floating variants.
    // "overlay" (default) is positioned absolutely by the wrapper in Canvas/PageRenderer.
    // "static" keeps the default relative in-flow layout.
    if (variant !== "floating-glass") {
      if (scrollBehavior === "sticky" || scrollBehavior === "sticky-hide") {
        css.position = "sticky";
        css.top = "0";
        css.zIndex = 50;
      }
    }

    // Hide on scroll down / reveal on scroll up for the sticky-hide behavior.
    useEffect(() => {
      if (scrollBehavior !== "sticky-hide" || interactive || variant === "floating-glass") return;
      const container = document.getElementById("canvas-scroll-viewport");
      const target: Window | HTMLElement = container || window;
      let lastY = container ? container.scrollTop : (window.scrollY || 0);
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const y = container ? container.scrollTop : (window.scrollY || 0);
          if (y < 80) {
            setIsNavHidden(false);
          } else if (y > lastY + 4) {
            setIsNavHidden(true);
          } else if (y < lastY - 4) {
            setIsNavHidden(false);
          }
          lastY = y;
        });
      };
      target.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        cancelAnimationFrame(raf);
        target.removeEventListener("scroll", onScroll);
      };
    }, [scrollBehavior, interactive]);

    const [activeEditPopover, setActiveEditPopover] = useState<string | null>(null);

    useEffect(() => {
      if (!selected) {
        setActiveEditPopover(null);
      }
    }, [selected]);

    const LogoElement = () => {
      const text = props.logoText ?? "Brand";
      const href = props.logoHref || "#top";
      const isEditingLogo = activeEditPopover === "logo";

      if (text === "") {
        return interactive ? (
          <button
            onClick={() => onUpdateProps?.({ logoText: "Brand", logoHref: "#top" })}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-dashed border-foreground/30 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all cursor-pointer"
          >
            <Plus className="h-3 w-3" /> Add Logo
          </button>
        ) : <div />;
      }

      const logoStyle: React.CSSProperties = {
        color: props.logoColor || headerTextColor,
        fontFamily: props.logoFontFamily || undefined,
        fontSize: props.logoFontSize || undefined,
        fontWeight: props.logoFontWeight || undefined,
        fontStyle: props.logoFontStyle || undefined,
        textTransform: (props.logoTextTransform as React.CSSProperties["textTransform"]) || undefined,
      };

      return (
        <div className="group/logo relative inline-flex items-center shrink-0">
          {!interactive ? (
            <a
              href={href}
              className="text-lg font-extrabold tracking-tight cursor-pointer select-none hover:opacity-85 transition-opacity"
              style={logoStyle}
            >
              {text}
            </a>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveEditPopover(isEditingLogo ? null : "logo");
              }}
              className="text-lg font-extrabold tracking-tight cursor-pointer select-none text-left"
              style={logoStyle}
            >
              {text}
            </button>
          )}

          {interactive && !isEditingLogo && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveEditPopover("logo");
              }}
              className="absolute -top-2.5 -right-2.5 hidden group-hover/logo:flex h-5 items-center gap-1 px-1.5 py-0.5 rounded-full bg-background border border-border shadow-md hover:border-primary text-foreground text-[10px] font-mono z-20 transition-all cursor-pointer"
              title="Click to Edit Logo & Destination Link"
            >
              <Link2 className="h-3 w-3 text-primary shrink-0" />
              <span className="max-w-[45px] truncate text-[9px]">{href}</span>
            </button>
          )}

          {isEditingLogo && (
            <LogoEditItem
              logoText={text}
              logoHref={href}
              logoFontFamily={props.logoFontFamily}
              logoFontSize={props.logoFontSize}
              logoFontWeight={props.logoFontWeight}
              logoFontStyle={props.logoFontStyle}
              logoTextTransform={props.logoTextTransform}
              logoColor={props.logoColor}
              sectionOptions={sectionOptions}
              onSave={(updated) => {
                onUpdateProps?.(updated);
                setActiveEditPopover(null);
              }}
              onRemove={() => {
                onUpdateProps?.({ logoText: "" });
                setActiveEditPopover(null);
              }}
              onClose={() => setActiveEditPopover(null)}
            />
          )}
        </div>
      );
    };

    const LinksElement = ({ mobile = false }: { mobile?: boolean }) => {
      const isMobileNav = mobile || isMobile;

      return (
        <nav
          className={
            isMobileNav
              ? "flex flex-col items-start gap-2.5 w-full py-1 text-sm font-medium"
              : "hidden sm:flex items-center gap-5 text-sm font-medium"
          }
          style={isMobileNav ? { "--nav-hover": primary, color: headerTextColor } as any : { gap: style.gap || "1.25rem", "--nav-hover": primary, color: headerTextColor } as any}
        >
          {(props.links || []).map((link, i) => {
            const href = link.href || "#";
            const isEditingThis = interactive && activeEditPopover === `link-${i}`;
            const isBtn = link.variant === "button";
            
            const linkClass = isMobileNav
              ? `w-full flex items-center justify-start gap-2.5 px-3.5 py-2 rounded-xl ${!isDarkNav ? "hover:bg-foreground/5" : "hover:bg-white/10"} text-sm font-semibold transition-all cursor-pointer select-none text-left ${!isBtn ? "hover:text-[var(--nav-hover)]" : ""}`
              : `transition-all cursor-pointer select-none inline-flex items-center gap-1.5 ${!isBtn ? "hover:text-[var(--nav-hover)]" : ""} ${
                  link.variant === "bold"
                    ? "font-bold opacity-100"
                    : link.variant === "muted"
                    ? "opacity-75"
                    : link.variant === "button"
                    ? "px-3.5 py-1.5 rounded-md font-semibold opacity-100 hover:brightness-110 shadow-sm hover:text-white"
                    : "opacity-90"
                }`;
            
            const linkStyle = isBtn ? {
              color: "#ffffff",
              backgroundColor: primary,
              borderRadius: btnRadius,
            } : undefined;

            return (
              <div key={i} className={isMobileNav ? "w-full text-left relative" : "group/link relative inline-flex items-center"}>
                {!interactive ? (
                  <a
                    href={href}
                    className={linkClass}
                    style={linkStyle}
                  >
                    <RenderIcon icon={link.icon} className="h-4 w-4 shrink-0" />
                    <span>{link.label}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveEditPopover(isEditingThis ? null : `link-${i}`);
                    }}
                    className={linkClass}
                    style={linkStyle}
                  >
                    <RenderIcon icon={link.icon} className="h-4 w-4 shrink-0" />
                    <span>{link.label || "Link"}</span>
                  </button>
                )}

                {interactive && !isEditingThis && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveEditPopover(`link-${i}`);
                    }}
                    className="absolute -top-2.5 -right-2.5 hidden group-hover/link:flex h-5 items-center gap-1 px-1.5 py-0.5 rounded-full bg-background border border-border shadow-md hover:border-primary text-foreground text-[10px] font-mono z-20 transition-all cursor-pointer"
                    title="Click to Edit Link & Icon"
                  >
                    <Link2 className="h-3 w-3 text-primary shrink-0" />
                  </button>
                )}

                {isEditingThis && (
                  <LinkEditItem
                    link={link}
                    sectionOptions={sectionOptions}
                    onSave={(label, newHref, icon) => {
                      const next = [...(props.links || [])];
                      next[i] = { ...next[i], label, href: newHref, icon };
                      onUpdateProps?.({ links: next });
                      setActiveEditPopover(null);
                    }}
                    onRemove={() => {
                      const next = [...(props.links || [])];
                      next.splice(i, 1);
                      onUpdateProps?.({ links: next });
                      setActiveEditPopover(null);
                    }}
                    onClose={() => setActiveEditPopover(null)}
                  />
                )}
              </div>
            );
          })}

          {interactive && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-dashed border-foreground/30 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
                  title="Add Link"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-40 rounded-xl">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    const next = [...(props.links || []), { label: "Work", href: "#", variant: "default", icon: "briefcase" }];
                    onUpdateProps?.({ links: next });
                  }}
                >
                  Work Link
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    const next = [...(props.links || []), { label: "About", href: "#", variant: "default", icon: "info" }];
                    onUpdateProps?.({ links: next });
                  }}
                >
                  About Link
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    const next = [...(props.links || []), { label: "Blog", href: "#", variant: "default", icon: "book" }];
                    onUpdateProps?.({ links: next });
                  }}
                >
                  Blog Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      );
    };

    const ButtonsElement = ({ mobile = false }: { mobile?: boolean }) => {
      const isMobileNav = mobile || isMobile;

      const buttonsList = props.buttons !== undefined ? props.buttons : (props.buttonText !== undefined ? [{ label: props.buttonText, variant: "solid" as const }] : undefined);
      if (!buttonsList && !interactive) return null;
      if (!buttonsList || buttonsList.length === 0) {
        return interactive ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-dashed border-foreground/30 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all">
                <Plus className="h-3 w-3" /> Add Button
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [{ label: "Get Started", variant: "solid" }], buttonText: undefined })}>Solid Button</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [{ label: "Get Started", variant: "outline" }], buttonText: undefined })}>Outline Button</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [{ label: "Get Started", variant: "ghost" }], buttonText: undefined })}>Ghost Button</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null;
      }
      return (
        <div
          className={
            isMobileNav
              ? "flex flex-col items-stretch gap-2 w-full pt-2 border-t border-foreground/10"
              : "hidden sm:flex items-center flex-wrap"
          }
          style={isMobileNav ? undefined : { gap: style.gap || "0.75rem" }}
        >
          {buttonsList.map((btn, i) => {
            const href = btn.href || "#";
            const isEditingThis = interactive && activeEditPopover === `button-${i}`;
            const btnClass = isMobileNav
              ? "w-full py-2.5 px-4 text-center text-sm font-bold shadow-md rounded-xl transition-all cursor-pointer select-none inline-flex items-center justify-center gap-2"
              : `inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold border-2 shadow-sm transition-all cursor-pointer select-none ${
                  btn.variant === "outline" ? "bg-transparent hover:bg-foreground/5" :
                  btn.variant === "ghost" ? "bg-transparent shadow-none hover:bg-foreground/5" :
                  "text-white hover:brightness-110 active:scale-95"
                }`;

            return (
              <div key={i} className={isMobileNav ? "w-full text-center relative" : `group/btn relative inline-flex items-center ${isEditingThis ? "z-[999999]" : ""}`}>
                {!interactive ? (
                  <span
                    className={btnClass}
                    style={{
                      backgroundColor: btn.variant === "outline" || btn.variant === "ghost" ? "transparent" : primary,
                      borderColor: btn.variant === "outline" ? primary : "transparent",
                      color: btn.variant === "outline" || btn.variant === "ghost" ? primary : "#ffffff",
                      borderRadius: btnRadius
                    }}
                  >
                    <RenderIcon icon={btn.icon} className="h-4 w-4 shrink-0" />
                    <span>{btn.label || "Button"}</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveEditPopover(isEditingThis ? null : `button-${i}`);
                    }}
                    className={btnClass}
                    style={{
                      backgroundColor: btn.variant === "outline" || btn.variant === "ghost" ? "transparent" : primary,
                      borderColor: btn.variant === "outline" ? primary : "transparent",
                      color: btn.variant === "outline" || btn.variant === "ghost" ? primary : "#ffffff",
                      borderRadius: btnRadius
                    }}
                  >
                    <RenderIcon icon={btn.icon} className="h-4 w-4 shrink-0" />
                    <span>{btn.label || "Button"}</span>
                  </button>
                )}

                {interactive && !isEditingThis && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveEditPopover(`button-${i}`);
                    }}
                    className="absolute -top-2.5 -right-2.5 hidden group-hover/btn:flex h-5 items-center gap-1 px-1.5 py-0.5 rounded-full bg-background border border-border shadow-md hover:border-primary text-foreground text-[10px] font-mono z-20 transition-all cursor-pointer"
                    title="Click to Edit Button & Icon"
                  >
                    <Link2 className="h-3 w-3 text-primary shrink-0" />
                  </button>
                )}

                {isEditingThis && (
                  <ButtonEditItem
                    button={btn}
                    sectionOptions={sectionOptions}
                    alignRight={true}
                    onSave={(label, newHref, variant, icon) => {
                      const next = [...buttonsList];
                      next[i] = { ...next[i], label, href: newHref, variant, icon };
                      onUpdateProps?.({ buttons: next, buttonText: undefined });
                      setActiveEditPopover(null);
                    }}
                    onRemove={() => {
                      const next = [...buttonsList];
                      next.splice(i, 1);
                      onUpdateProps?.({ buttons: next.length > 0 ? next : undefined, buttonText: undefined });
                      setActiveEditPopover(null);
                    }}
                    onClose={() => setActiveEditPopover(null)}
                  />
                )}
              </div>
            );
          })}
          {interactive && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-foreground/30 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all" title="Add Button">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Sign In", variant: "solid", icon: "login" }], buttonText: undefined })}>Solid Button</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Sign In", variant: "outline", icon: "login" }], buttonText: undefined })}>Outline Button</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Sign In", variant: "ghost", icon: "login" }], buttonText: undefined })}>Ghost Button</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    };

    return (
      <header
        {...aosAttrs}
        id={currentSectionId}
        style={{
          ...css,
          border: variant === "floating-glass" ? undefined : "none",
          borderRadius: isMobileMenuOpen ? "24px 24px 12px 12px" : headerRadius,
          backgroundColor: headerBg,
          color: headerTextColor,
          boxShadow: shadow !== "none" ? shadow : undefined,
          transform: isNavHidden ? "translateY(-100%)" : "translateY(0)",
        }}
        className={`relative z-30 transition-all duration-300 ${isMobileMenuOpen ? "overflow-hidden" : ""} ${
          variant === "floating-glass"
            ? "backdrop-blur-md border border-white/15 dark:border-white/10 shadow-2xl"
            : ""
        }`}
      >
        <Center maxWidth={effectiveMaxWidth}>
          <div className="flex items-center justify-between w-full gap-2 py-2.5">
            <LogoElement />

            {/* Desktop Navigation Links & Action Buttons */}
            <div className={isMobile ? "hidden" : "hidden sm:flex items-center gap-6"}>
              <LinksElement />
              <ButtonsElement />
            </div>

            {/* Mobile View 3-Bar Hamburger Menu Icon (☰) */}
            <div className={isMobile ? "flex items-center gap-2" : "flex sm:hidden items-center gap-2"}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-foreground/15 hover:bg-foreground/10 shrink-0"
                style={{ color: headerTextColor, borderRadius: theme.borderRadius || "12px" }}
                title="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 shrink-0" style={{ color: headerTextColor }} />
                ) : (
                  <Menu className="h-5 w-5 shrink-0" style={{ color: headerTextColor }} />
                )}
              </button>
            </div>
          </div>

          {/* Seamless Unified Mobile Navigation Drawer Dropdown */}
          {isMobileMenuOpen && (
            <div className={`w-full border-t ${!isDarkNav ? "border-foreground/15" : "border-white/10"} pt-3 pb-4 my-1 space-y-3.5 animate-in fade-in-0 slide-in-from-top-2 duration-200`}>
              <LinksElement mobile />
              <ButtonsElement mobile />
            </div>
          )}
        </Center>
      </header>
    );
  }

  if (type === "hero") {
    const heroSectionRadius = style.borderRadius || "0px";
    const variant = props.variant || "fullbleed-image-hero";
    const isBgLayout = props.imageLayout === "background" || variant === "fullbleed-image-hero";
    const isSplit = variant === "split-showcase-hero" || variant === "bento-grid-hero" || variant === "mobile-app-hero" || variant === "split-image" || (variant === "bento-hero" && !isBgLayout);
    const [activeHeroPopover, setActiveHeroPopover] = useState<string | null>(null);
    const isDefaultPresetHeroBg =
      !style.backgroundColor ||
      style.backgroundColor === "transparent" ||
      style.backgroundColor === "#0f172a" ||
      style.backgroundColor === "#0b1329" ||
      style.backgroundColor === "#020617" ||
      style.backgroundColor === "#ffffff" ||
      style.backgroundColor === "#f8fafc" ||
      style.backgroundColor === "#fafafa" ||
      style.backgroundColor === "#f1f5f9";

    const heroBg = (style.backgroundColor && !isDefaultPresetHeroBg)
      ? style.backgroundColor
      : "transparent";

    const heroBgDark = isDarkColor(heroBg);
    const isDarkHeroBg = Boolean(
      isBgLayout || (heroBgDark !== undefined ? heroBgDark : pageBgDark)
    );

    const heroTextColor = isDarkHeroBg
      ? (theme.headingColor && isDarkColor(theme.headingColor) === false ? theme.headingColor : "#f8fafc")
      : (theme.headingColor && isDarkColor(theme.headingColor) === true ? theme.headingColor : "#0f172a");

    const heroSubtextColor = isDarkHeroBg
      ? (theme.bodyColor && isDarkColor(theme.bodyColor) === false ? theme.bodyColor : "rgba(248, 250, 252, 0.85)")
      : (theme.bodyColor && isDarkColor(theme.bodyColor) === true ? theme.bodyColor : "#475569");

    const ButtonsBlock = () => {
      const buttonsList = props.buttons !== undefined ? props.buttons : (props.buttonText !== undefined ? [{ label: props.buttonText, variant: "solid" as const }] : undefined);

      if (!buttonsList && !interactive) return null;
      if (!buttonsList || buttonsList.length === 0) {
        return interactive ? (
          <div className={`pt-2 flex flex-wrap items-center ${!isSplit ? "justify-center" : "justify-start"}`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md border-2 border-dashed border-foreground/30 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all cursor-pointer">
                  <Plus className="h-4 w-4" /> Add Button
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [{ label: "Get Started", variant: "solid" }], buttonText: undefined })}>Solid Button</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [{ label: "Get Started", variant: "outline" }], buttonText: undefined })}>Outline Button</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [{ label: "Get Started", variant: "ghost" }], buttonText: undefined })}>Ghost Button</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null;
      }
      return (
        <div className={`pt-2 flex flex-wrap items-center ${(!isSplit || isMobileOrTablet) ? "justify-center" : "justify-start"}`} style={{ gap: style.gap || "1rem" }}>
          <style>{`
            .btn-variant-outline:hover {
              background-color: ${primary} !important;
              color: #ffffff !important;
            }
          `}</style>
          {buttonsList.map((btn, i) => {
            const href = btn.href || "#";
            const isEditingThis = interactive && activeHeroPopover === `button-${i}`;
            const btnClass = `inline-flex items-center gap-2 px-6 py-3 text-base font-semibold border-2 shadow-lg transition-all cursor-pointer select-none btn-variant-${btn.variant} ${
              btn.variant === "outline" ? "bg-transparent" :
              btn.variant === "ghost" ? "bg-transparent shadow-none hover:bg-foreground/5" :
              "text-white hover:brightness-110 active:scale-95"
            }`;
            const btnStyle = {
              backgroundColor: btn.variant === "outline" || btn.variant === "ghost" ? "transparent" : primary,
              borderColor: btn.variant === "outline" ? primary : "transparent",
              color: btn.variant === "outline" || btn.variant === "ghost" ? primary : "#ffffff",
              borderRadius: btnRadius
            };

            return (
              <div key={i} className="group/btn relative inline-flex items-center">
                {!interactive ? (
                  <a
                    href={href}
                    className={btnClass}
                    style={btnStyle}
                  >
                    <RenderIcon icon={btn.icon} className="h-4 w-4 shrink-0" />
                    <span>{btn.label || "Button"}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHeroPopover(isEditingThis ? null : `button-${i}`);
                    }}
                    className={btnClass}
                    style={btnStyle}
                  >
                    <RenderIcon icon={btn.icon} className="h-4 w-4 shrink-0" />
                    <span>{btn.label || "Button"}</span>
                  </button>
                )}

                {interactive && !isEditingThis && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHeroPopover(`button-${i}`);
                    }}
                    className="absolute -top-2.5 -right-2.5 hidden group-hover/btn:flex h-5 items-center gap-1 px-1.5 py-0.5 rounded-full bg-background border border-border shadow-md hover:border-primary text-foreground text-[10px] font-mono z-20 transition-all cursor-pointer"
                    title="Click to Edit Button & Icon"
                  >
                    <Link2 className="h-3 w-3 text-primary shrink-0" />
                  </button>
                )}

                {isEditingThis && (
                  <ButtonEditItem
                    button={btn}
                    sectionOptions={sectionOptions}
                    onSave={(label, newHref, variant, icon) => {
                      const next = [...buttonsList];
                      next[i] = { ...next[i], label, href: newHref, variant, icon };
                      onUpdateProps?.({ buttons: next, buttonText: undefined });
                      setActiveHeroPopover(null);
                    }}
                    onRemove={() => {
                      const next = [...buttonsList];
                      next.splice(i, 1);
                      onUpdateProps?.({ buttons: next.length > 0 ? next : undefined, buttonText: undefined });
                      setActiveHeroPopover(null);
                    }}
                    onClose={() => setActiveHeroPopover(null)}
                  />
                )}
              </div>
            );
          })}
          
          {interactive && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-foreground/30 bg-transparent hover:bg-foreground/5 text-foreground/50 hover:text-foreground/80 transition-all cursor-pointer ml-2"
                  title="Add Button"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Get Started", variant: "solid" }], buttonText: undefined })}>Solid Button</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Learn More", variant: "outline" }], buttonText: undefined })}>Outline Button</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Contact Us", variant: "ghost" }], buttonText: undefined })}>Ghost Button</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {interactive && buttonsList.length > 1 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-foreground/30 bg-transparent hover:bg-foreground/5 text-foreground/50 hover:text-foreground/80 transition-all cursor-pointer ml-1"
                  title="Button Gap / Spacing"
                >
                  <ArrowLeftRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateStyle?.({ gap: "0.5rem" })}>Tight Spacing</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateStyle?.({ gap: "1rem" })}>Normal Spacing</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateStyle?.({ gap: "2rem" })}>Wide Spacing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    };

    const isEditingHeroImage = activeHeroPopover === "image";
    const setIsEditingHeroImage = (val: boolean) => setActiveHeroPopover(val ? "image" : null);
    const isImageLeft = props.imagePosition === "left" || props.reverseLayout;

    return (
      <section
        {...aosAttrs}
        id={currentSectionId}
        style={{
          borderRadius: heroSectionRadius,
          backgroundColor: heroBg,
          backgroundImage: isBgLayout ? `url(${props.imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...css
        }}
        className={`relative py-16 md:py-24 transition-all ${
          isBgLayout ? "text-white flex flex-col justify-center" : ""
        } ${
          isFollowingNavbar
            ? "min-h-[90vh] lg:min-h-[100vh] !pt-[130px] md:!pt-[170px]"
            : isBgLayout
              ? "min-h-[60vh] lg:min-h-[75vh]"
              : ""
        }`}
      >
        {isBgLayout && (
          <div className="absolute inset-0 bg-black/60 z-0" style={{ borderRadius: heroSectionRadius }} />
        )}
        
        {interactive && isBgLayout && (
          <div className="absolute top-4 right-4 z-40">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingHeroImage(!isEditingHeroImage);
              }}
              className="px-4 py-2 rounded-xl bg-background/90 backdrop-blur-md border border-border text-foreground text-sm font-bold shadow-lg hover:bg-primary hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              style={{ borderRadius: theme.borderRadius || "12px" }}
            >
              <ImageIcon className="h-4 w-4" /> Edit Background
            </button>
            {isEditingHeroImage && (
              <div className="absolute top-12 right-0">
                <ImageEditItem
                  currentUrl={props.imageUrl}
                  currentUrl2={props.imageUrl2}
                  currentUrl3={props.imageUrl3}
                  currentAlt={props.imageAlt}
                  currentBorderRadius={props.imageBorderRadius}
                  currentObjectFit={props.imageObjectFit}
                  currentAspectRatio={props.imageAspectRatio}
                  currentImageLayout={props.imageLayout}
                  onSave={(editProps) => {
                    onUpdateProps?.({ 
                      imageUrl: editProps.url,
                      imageUrl2: editProps.url2,
                      imageUrl3: editProps.url3,
                      imageAlt: editProps.alt, 
                      imageBorderRadius: editProps.imageBorderRadius,
                      imageObjectFit: editProps.objectFit as any,
                      imageAspectRatio: editProps.aspectRatio as any,
                      imageLayout: editProps.imageLayout as any
                    });
                    setIsEditingHeroImage(false);
                  }}
                  onClose={() => setIsEditingHeroImage(false)}
                />
              </div>
            )}
          </div>
        )}

        <Center maxWidth={effectiveMaxWidth} className="relative z-10">
          {variant === "interactive-search-hero" ? (
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {props.heading && (
                <h1
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerText.trim();
                    if (newText && newText !== props.heading) {
                      onUpdateProps?.({ heading: newText });
                    }
                  }}
                  style={{ outline: "none", color: style.textColor || heroTextColor }}
                  className={`${
                    isMobile ? "text-2xl sm:text-3xl" : isTablet ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl lg:text-6xl"
                  } font-extrabold tracking-tight ${interactive ? "cursor-text transition-all" : ""}`}
                >
                  {props.heading}
                </h1>
              )}
              {props.subheading && (
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerText.trim();
                    if (newText && newText !== props.subheading) {
                      onUpdateProps?.({ subheading: newText });
                    }
                  }}
                  style={{ outline: "none", color: heroSubtextColor }}
                  className={`${isMobile ? "text-sm" : isTablet ? "text-base" : "text-base md:text-lg"} ${isBgLayout ? "text-white/80" : "text-muted-foreground"} ${
                    interactive ? "cursor-text transition-all" : ""
                  }`}
                >
                  {props.subheading}
                </p>
              )}

              {/* Interactive Search Bar Input */}
              <div
                className="max-w-2xl mx-auto mt-6 p-2 bg-card border border-border/80 shadow-2xl flex items-center gap-3 transition-all"
                style={{ borderRadius: btnRadius }}
              >
                <Search className="h-5 w-5 text-muted-foreground ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search templates, components, or features..."
                  className="w-full bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground/70"
                />
                <button
                  type="button"
                  className="px-6 py-2.5 font-bold text-white shadow-md transition-all shrink-0 hover:brightness-110 active:scale-95 cursor-pointer"
                  style={{ backgroundColor: primary, borderRadius: btnRadius }}
                >
                  Search
                </button>
              </div>

              {/* Popular Tags Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                <style>{`
                  .hero-tag-pill:hover {
                    border-color: ${primary} !important;
                  }
                `}</style>
                <span className="font-bold opacity-75 mr-1" style={{ color: heroSubtextColor }}>Popular Searches:</span>
                {(props.tags || ["Landing Pages", "E-commerce", "SaaS Dashboard", "Portfolio", "AI Apps"]).map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.innerText.trim().replace(/^#/, "");
                      if (newText) {
                        const currentTags = [...(props.tags || ["Landing Pages", "E-commerce", "SaaS Dashboard", "Portfolio", "AI Apps"])];
                        currentTags[idx] = newText;
                        onUpdateProps?.({ tags: currentTags });
                      }
                    }}
                    className="hero-tag-pill px-3.5 py-1.5 bg-muted/60 border border-border/60 font-semibold transition-all cursor-pointer select-none"
                    style={{ color: heroTextColor, borderRadius: btnRadius }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : isSplit ? (
            <div className={`grid gap-8 md:gap-12 items-center ${isMobileOrTablet ? "grid-cols-1 text-center" : "grid-cols-1 md:grid-cols-2 text-left"}`}>
              <div className={`space-y-6 ${!isMobileOrTablet && isImageLeft ? "md:order-2" : "md:order-1"}`}>


                {props.heading && (
                  <h1
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.innerText.trim();
                      if (newText && newText !== props.heading) {
                        onUpdateProps?.({ heading: newText });
                      }
                    }}
                    style={{ outline: "none", color: style.textColor || heroTextColor }}
                    className={`${
                      isMobile ? "text-2xl sm:text-3xl" : isTablet ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl lg:text-6xl"
                    } font-extrabold tracking-tight ${interactive ? "cursor-text transition-all" : ""}`}
                  >
                    {props.heading}
                  </h1>
                )}
                {props.subheading && (
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.innerText.trim();
                      if (newText && newText !== props.subheading) {
                        onUpdateProps?.({ subheading: newText });
                      }
                    }}
                    style={{ outline: "none", color: heroSubtextColor }}
                    className={`${isMobile ? "text-sm" : isTablet ? "text-base" : "text-base md:text-lg"} ${isBgLayout ? "text-white/80" : "text-muted-foreground"} ${
                      interactive ? "cursor-text transition-all" : ""
                    }`}
                  >
                    {props.subheading}
                  </p>
                )}

                {variant === "split-showcase-hero" && (
                  <div className={`space-y-2.5 pt-1 text-sm font-semibold flex flex-col ${isMobileOrTablet ? "items-center text-center" : "items-start text-left"}`} style={{ color: heroTextColor }}>
                    {(props.benefits || [
                      "Drag & drop visual page builder with live preview",
                      "Clean, production-ready React & Tailwind export",
                      "Instant one-click cloud hosting & publishing"
                    ]).map((benefit: string, idx: number) => (
                      <div key={idx} className={`flex items-center gap-2.5 ${isMobileOrTablet ? "justify-center text-center" : "justify-start text-left"}`}>
                        <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-black shrink-0">✓</span>
                        <span
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const newText = e.currentTarget.innerText.trim();
                            if (newText) {
                              const next = [...(props.benefits || [
                                "Drag & drop visual page builder with live preview",
                                "Clean, production-ready React & Tailwind export",
                                "Instant one-click cloud hosting & publishing"
                              ])];
                              next[idx] = newText;
                              onUpdateProps?.({ benefits: next });
                            }
                          }}
                          className={interactive ? "cursor-text outline-none" : ""}
                        >
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <ButtonsBlock />
              </div>

              {variant === "mobile-app-hero" ? (
                <div
                  className="relative mx-auto w-[280px] h-[500px] rounded-[44px] bg-slate-900 p-2.5 border-[3px] border-slate-700/80 ring-1 ring-white/10 select-none flex flex-col z-30 transition-all"
                  style={{ boxShadow: shadow !== "none" ? shadow : "none" }}
                >
                  {/* Physical Side Buttons */}
                  <div className="absolute -left-[5px] top-24 w-[4px] h-6 bg-slate-700 rounded-l-md border-l border-slate-500/80 shadow-md" />
                  <div className="absolute -left-[5px] top-36 w-[4px] h-11 bg-slate-700 rounded-l-md border-l border-slate-500/80 shadow-md" />
                  <div className="absolute -left-[5px] top-50 w-[4px] h-11 bg-slate-700 rounded-l-md border-l border-slate-500/80 shadow-md" />
                  <div className="absolute -right-[5px] top-38 w-[4px] h-14 bg-slate-700 rounded-r-md border-r border-slate-500/80 shadow-md" />

                  {/* Inner Screen Display Viewport */}
                  <div className="w-full h-full rounded-[34px] overflow-hidden relative flex flex-col z-10 border border-black/40 shadow-inner bg-slate-950">
                    {/* Clean Status Bar */}
                    <div className="px-5 pt-2.5 pb-1 flex items-center justify-between text-[11px] font-bold text-white shrink-0 select-none z-30 relative bg-black/60 backdrop-blur-md">
                      <span className="font-extrabold tracking-tight">11:41 AM</span>
                      
                      {/* Dynamic Island Notch */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-20 h-4 bg-black rounded-full border border-slate-800 shadow-md flex items-center justify-center z-40 pointer-events-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b]" />
                      </div>

                      <div className="flex items-center gap-1.5 opacity-90">
                        <Wifi className="h-3 w-3" />
                        <div className="w-4 h-2 rounded-[2px] border border-white/70 p-0.5 flex items-center shrink-0">
                          <div className="w-full h-full bg-emerald-500 rounded-[0.5px]" />
                        </div>
                      </div>
                    </div>

                    {/* Clean Mobile App Interface Screenshot */}
                    <img
                      src={props.imageUrl || "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&q=80"}
                      alt="Mobile App Interface"
                      className="w-full h-full object-cover flex-1"
                    />

                    {/* iOS Home Indicator Pill */}
                    <div className="py-1.5 bg-black/60 backdrop-blur-md flex justify-center shrink-0 z-30">
                      <div className="w-24 h-1 bg-white/50 rounded-full" />
                    </div>
                  </div>
                </div>
              ) : variant === "bento-grid-hero" ? (
                <div className="grid grid-cols-2 gap-5 z-30 w-full h-full my-auto">
                  <div
                    className="col-span-2 p-7 min-h-[140px] bg-card border border-border/80 shadow-2xl flex items-center justify-between transition-all hover:border-primary/40"
                    style={{ borderRadius: btnRadius }}
                  >
                    <div>
                      <div
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateProps?.({ bentoCard1Title: e.currentTarget.innerText.trim() })}
                        className={`text-xs font-bold text-muted-foreground uppercase tracking-widest ${interactive ? "cursor-text outline-none" : ""}`}
                      >
                        {props.bentoCard1Title || "Live Performance"}
                      </div>
                      <div
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateProps?.({ bentoCard1Value: e.currentTarget.innerText.trim() })}
                        className={`text-3xl font-extrabold text-foreground mt-1 tracking-tight ${interactive ? "cursor-text outline-none" : ""}`}
                      >
                        {props.bentoCard1Value || "+142% Growth"}
                      </div>
                    </div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ bentoCard1Badge: e.currentTarget.innerText.trim() })}
                      className={`px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs shadow-xs ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.bentoCard1Badge || "↑ Trending"}
                    </div>
                  </div>
                  <div
                    className="col-span-1 p-6 min-h-[140px] bg-card border border-border/80 shadow-2xl flex flex-col justify-center transition-all hover:border-primary/40"
                    style={{ borderRadius: btnRadius }}
                  >
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ bentoCard2Value: e.currentTarget.innerText.trim() })}
                      className={`text-3xl font-extrabold text-primary tracking-tight ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.bentoCard2Value || "99.99%"}
                    </div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ bentoCard2Label: e.currentTarget.innerText.trim() })}
                      className={`text-sm text-muted-foreground font-semibold mt-1 ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.bentoCard2Label || "Uptime SLA"}
                    </div>
                  </div>
                  <div
                    className="col-span-1 p-6 min-h-[140px] bg-card border border-border/80 shadow-2xl flex flex-col justify-center transition-all hover:border-primary/40"
                    style={{ borderRadius: btnRadius }}
                  >
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ bentoCard3Value: e.currentTarget.innerText.trim() })}
                      className={`text-3xl font-extrabold text-foreground tracking-tight ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.bentoCard3Value || "50k+"}
                    </div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ bentoCard3Label: e.currentTarget.innerText.trim() })}
                      className={`text-sm text-muted-foreground font-semibold mt-1 ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.bentoCard3Label || "Creators"}
                    </div>
                  </div>
                </div>
              ) : (props.imageUrl || interactive) && (
                <div className={`relative group z-30 w-full ${isImageLeft ? "md:order-1" : "md:order-2"}`}>
                  {props.imageUrl ? (
                    <div
                      className={`w-full ${props.imageLayout === "bento" ? "grid grid-cols-2 gap-4" : "block"}`}
                    >
                      <div
                        className={`overflow-hidden border border-border/80 transition-all ${props.imageLayout === "bento" ? "col-span-2" : "col-span-1 w-full"}`}
                        style={{
                          borderRadius: props.imageBorderRadius || "16px",
                          boxShadow: shadow !== "none" ? shadow : undefined,
                        }}
                      >
                        <img
                          src={props.imageUrl}
                          alt={props.imageAlt || "Hero"}
                          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"; }}
                          className={`w-full ${props.imageAspectRatio && props.imageAspectRatio !== "auto" ? "h-full" : (props.imageLayout === "bento" ? "h-[250px]" : "h-auto max-h-[450px]")} ${
                            props.imageObjectFit === "contain" ? "object-contain" : props.imageObjectFit === "fill" ? "object-fill" : "object-cover"
                          }`}
                          style={{ aspectRatio: props.imageAspectRatio && props.imageAspectRatio !== "auto" ? props.imageAspectRatio : undefined }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-full h-[350px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer"
                      onClick={(e) => {
                         e.stopPropagation();
                         setIsEditingHeroImage(true);
                      }}
                    >
                      <ImageIcon className="h-8 w-8 text-muted-foreground/50 mb-2" />
                      <span className="text-sm font-medium text-muted-foreground/70">Click to Add Image</span>
                    </div>
                  )}
                  {interactive && props.imageUrl && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditingHeroImage(!isEditingHeroImage);
                      }}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border text-foreground text-xs font-bold shadow-lg hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 cursor-pointer z-30"
                      style={{ borderRadius: theme.borderRadius || "12px" }}
                    >
                      <ImageIcon className="h-3.5 w-3.5" /> Edit Image
                    </button>
                  )}
                  {isEditingHeroImage && (
                    <ImageEditItem
                      currentUrl={props.imageUrl}
                      currentUrl2={props.imageUrl2}
                      currentUrl3={props.imageUrl3}
                      currentAlt={props.imageAlt}
                      currentBorderRadius={props.imageBorderRadius}
                      currentObjectFit={props.imageObjectFit}
                      currentAspectRatio={props.imageAspectRatio}
                      currentImageLayout={props.imageLayout}
                      onSave={(editProps) => {
                        onUpdateProps?.({ 
                          imageUrl: editProps.url,
                          imageUrl2: editProps.url2,
                          imageUrl3: editProps.url3,
                          imageAlt: editProps.alt, 
                          imageBorderRadius: editProps.imageBorderRadius,
                          imageObjectFit: editProps.objectFit as any,
                          imageAspectRatio: editProps.aspectRatio as any,
                          imageLayout: editProps.imageLayout as any
                        });
                        setIsEditingHeroImage(false);
                      }}
                      onClose={() => setIsEditingHeroImage(false)}
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {(variant === "centered-dashboard-hero" || variant === "app-preview") && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => onUpdateProps?.({ badgeText: e.currentTarget.innerText.trim() })}
                    className={interactive ? "cursor-text outline-none" : ""}
                  >
                    {props.badgeText || "NEW: AI Web Builder v2.0 →"}
                  </span>
                </div>
              )}
              {props.heading && (
                <h1
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerText.trim();
                    if (newText && newText !== props.heading) {
                      onUpdateProps?.({ heading: newText });
                    }
                  }}
                  style={{ outline: "none", color: style.textColor || heroTextColor }}
                  className={`${
                    isMobile ? "text-2xl sm:text-3xl" : isTablet ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl lg:text-6xl"
                  } font-extrabold tracking-tight ${interactive ? "cursor-text transition-all" : ""}`}
                >
                  {props.heading}
                </h1>
              )}
              {props.subheading && (
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerText.trim();
                    if (newText && newText !== props.subheading) {
                      onUpdateProps?.({ subheading: newText });
                    }
                  }}
                  style={{ outline: "none", color: heroSubtextColor }}
                  className={`${isMobile ? "text-sm" : isTablet ? "text-base" : "text-base md:text-lg"} ${isBgLayout ? "text-white/80" : "text-muted-foreground"} ${
                    interactive ? "cursor-text transition-all" : ""
                  }`}
                >
                  {props.subheading}
                </p>
              )}
              <ButtonsBlock />

              {/* Modern SaaS Product Showcase Card for app-preview */}
              {variant === "app-preview" && (
                <div className="mt-12 max-w-5xl mx-auto relative group z-30">
                  {/* Outer Glow Backdrop Accent */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 via-emerald-500/20 to-primary/30 opacity-40 blur-xl group-hover:opacity-70 transition-all duration-500" />
                  
                  {/* Sleek Floating Image Card */}
                  <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/90 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.3)] backdrop-blur-md p-2 sm:p-3 transition-all duration-300">
                    <img
                      src={props.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"}
                      alt="Dashboard Showcase"
                      className="w-full h-auto object-cover rounded-2xl max-h-[500px]"
                    />
                  </div>
                </div>
              )}

              {/* Stats Bar for fullbleed-image-hero */}
              {variant === "fullbleed-image-hero" && (
                <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
                  <div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ stat1Value: e.currentTarget.innerText.trim() })}
                      className={`text-2xl md:text-3xl font-extrabold text-white ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.stat1Value || "50,000+"}
                    </div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ stat1Label: e.currentTarget.innerText.trim() })}
                      className={`text-xs text-white/80 font-medium ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.stat1Label || "Active Creators"}
                    </div>
                  </div>
                  <div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ stat2Value: e.currentTarget.innerText.trim() })}
                      className={`text-2xl md:text-3xl font-extrabold text-white ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.stat2Value || "4.9 / 5.0"}
                    </div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ stat2Label: e.currentTarget.innerText.trim() })}
                      className={`text-xs text-white/80 font-medium ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.stat2Label || "Customer Rating"}
                    </div>
                  </div>
                  <div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ stat3Value: e.currentTarget.innerText.trim() })}
                      className={`text-2xl md:text-3xl font-extrabold text-white ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.stat3Value || "99.99%"}
                    </div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ stat3Label: e.currentTarget.innerText.trim() })}
                      className={`text-xs text-white/80 font-medium ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.stat3Label || "Platform Uptime"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Center>
      </section>
    );
  }

  if (type === "features") {
    const variant = props.variant || "bento-grid";
    const items = props.items || [
      { title: "Digital Banking", description: "Experience seamless financial operations anywhere.", icon: "briefcase", imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200" },
      { title: "AI-Assistant", description: "Smart automation for your daily tasks.", icon: "zap" },
      { title: "Ethereum", description: "Track your crypto portfolio in real-time.", icon: "shield" },
    ];
    
    return (
      <section
        {...aosAttrs}
        id={currentSectionId}
        style={{
          ...css,
          backgroundColor: style.backgroundColor || "transparent",
        }}
        className={`w-full py-16 sm:py-24 ${style.padding || "px-4 md:px-8"}`}
      >
        <Center maxWidth={style.maxWidth}>
          {(props.heading || props.subheading) && (
            <div className="text-center mb-16 space-y-4">
              {props.heading && (
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  {props.heading}
                </h2>
              )}
              {props.subheading && (
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {props.subheading}
                </p>
              )}
            </div>
          )}
          
          {variant === "bento-grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {items.map((item, i) => {
                const isFeatured = i === 0 && items.length >= 3;
                const hasBgImage = !!item.imageUrl;
                return (
                  <div 
                    key={i} 
                    className={`relative overflow-hidden rounded-3xl border border-border/50 flex flex-col justify-end ${
                      isFeatured ? "md:col-span-2 min-h-[400px] md:min-h-[500px]" : "min-h-[300px] md:min-h-[400px]"
                    } ${!hasBgImage ? "bg-muted/20 p-8 hover:bg-muted/40 transition-colors" : "p-8"}`}
                  >
                    {hasBgImage && (
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>
                    )}
                    <div className={`relative z-10 ${hasBgImage ? "text-white" : "text-foreground"}`}>
                       {item.icon && !hasBgImage && (
                         <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                           <RenderIcon icon={item.icon} className="h-6 w-6" />
                         </div>
                       )}
                       <h3 className={`text-2xl font-bold mb-2 ${hasBgImage ? "text-white" : ""}`}>{item.title}</h3>
                       <p className={`max-w-md ${hasBgImage ? "text-white/80" : "text-muted-foreground"}`}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
               {items.map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl border border-transparent hover:border-border hover:bg-muted/10 transition-all">
                    {item.imageUrl ? (
                       <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-xl object-cover mb-2 shadow-sm" />
                    ) : item.icon ? (
                       <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                         <RenderIcon icon={item.icon} className="h-6 w-6" />
                       </div>
                    ) : null}
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                 </div>
               ))}
            </div>
          )}
        </Center>
      </section>
    );
  }

  if (type === "cta") {
    const variant = props.variant || "full-width-primary";

    const isDarkVariant = variant === "gradient-glow-cta";
    const isLightVariant = variant === "minimal-inline-cta";

    const isDefaultPresetCtaBg =
      !style.backgroundColor ||
      style.backgroundColor === "transparent" ||
      style.backgroundColor === "#0f172a" ||
      style.backgroundColor === "#0b1329" ||
      style.backgroundColor === "#1e293b" ||
      style.backgroundColor === "#020617" ||
      style.backgroundColor === "#ffffff" ||
      style.backgroundColor === "#f8fafc" ||
      style.backgroundColor === "#f1f5f9" ||
      style.backgroundColor === "#f0f9ff" ||
      style.backgroundColor === "#ea580c" ||
      style.backgroundColor === "#4f46e5" ||
      style.backgroundColor === "rgb(234, 88, 12)";

    const defaultBg =
      variant === "gradient-glow-cta"
        ? `linear-gradient(135deg, ${primary}, #312e81)`
        : "transparent";

    const ctaBg = (style.backgroundColor && !isDefaultPresetCtaBg) ? style.backgroundColor : defaultBg;
    const ctaRadius = "0px";

    const ctaBgDark = isDarkColor(ctaBg);
    const isDarkBg = ctaBgDark !== undefined ? ctaBgDark : pageBgDark;

    const textColor = isDarkBg
      ? (style.textColor && isDarkColor(style.textColor) === false ? style.textColor : "#ffffff")
      : (style.textColor && isDarkColor(style.textColor) === true ? style.textColor : (theme.textColor || "#0f172a"));

    const subtextColor = isDarkBg ? "rgba(255, 255, 255, 0.85)" : "#475569";

    const isSplitLayout = variant === "split-headline-cta" || variant === "minimal-inline-cta";

    const buttonsList = props.buttons || [
      {
        label: props.buttonText || "Get Started",
        href: props.buttonHref || "#",
        variant: "solid" as const,
      },
    ];

    const [activeCtaPopover, setActiveCtaPopover] = useState<string | null>(null);

    useEffect(() => {
      if (!selected) {
        setActiveCtaPopover(null);
      }
    }, [selected]);

    const renderCtaButtons = () => (
      <div className={`flex flex-wrap items-center gap-3 ${isSplitLayout ? "justify-start" : "justify-center"}`}>
        {buttonsList.map((btn, i) => {
          const isEditingThis = interactive && activeCtaPopover === `button-${i}`;
          const isSolid = btn.variant === "solid" || !btn.variant;
          const isOutline = btn.variant === "outline";
          const isGhost = btn.variant === "ghost";

          const btnBg = isSolid
            ? primary
            : "transparent";

          const btnText = isSolid
            ? "#ffffff"
            : (isDarkBg ? "#ffffff" : primary);

          const btnBorder = isOutline
            ? (isDarkBg ? "rgba(255, 255, 255, 0.4)" : primary)
            : "transparent";

          const btnClass = `inline-flex items-center gap-2 px-6 py-3 text-base font-semibold border-2 shadow-lg transition-all cursor-pointer select-none active:scale-95 ${
            isOutline ? "hover:bg-white/10" : isGhost ? "hover:bg-white/10 shadow-none" : "hover:brightness-110 shadow-md"
          }`;

          return (
            <div key={i} className={`group/btn relative inline-flex items-center ${isEditingThis ? "z-[999999]" : ""}`}>
              {!interactive ? (
                <a
                  href={btn.href || "#"}
                  className={btnClass}
                  style={{
                    borderRadius: btnRadius,
                    backgroundColor: btnBg,
                    color: btnText,
                    borderColor: btnBorder,
                  }}
                >
                  <RenderIcon icon={btn.icon} className="h-4 w-4 shrink-0" />
                  <span>{btn.label || "Button"}</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCtaPopover(isEditingThis ? null : `button-${i}`);
                  }}
                  className={btnClass}
                  style={{
                    borderRadius: btnRadius,
                    backgroundColor: btnBg,
                    color: btnText,
                    borderColor: btnBorder,
                  }}
                >
                  <RenderIcon icon={btn.icon} className="h-4 w-4 shrink-0" />
                  <span>{btn.label || "Button"}</span>
                </button>
              )}

              {interactive && !isEditingThis && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCtaPopover(`button-${i}`);
                  }}
                  className="absolute -top-2.5 -right-2.5 hidden group-hover/btn:flex h-5 items-center gap-1 px-1.5 py-0.5 rounded-full bg-background border border-border shadow-md hover:border-primary text-foreground text-[10px] font-mono z-20 transition-all cursor-pointer"
                  title="Click to Edit Button & Icon"
                >
                  <Link2 className="h-3 w-3 text-primary shrink-0" />
                </button>
              )}

              {isEditingThis && (
                <ButtonEditItem
                  button={btn}
                  sectionOptions={sectionOptions}
                  onSave={(label, newHref, variant, icon) => {
                    const next = [...buttonsList];
                    next[i] = { ...next[i], label, href: newHref, variant, icon };
                    onUpdateProps?.({ buttons: next, buttonText: undefined });
                    setActiveCtaPopover(null);
                  }}
                  onRemove={() => {
                    const next = [...buttonsList];
                    next.splice(i, 1);
                    onUpdateProps?.({ buttons: next.length > 0 ? next : undefined, buttonText: undefined });
                    setActiveCtaPopover(null);
                  }}
                  onClose={() => setActiveCtaPopover(null)}
                />
              )}
            </div>
          );
        })}

        {interactive && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-foreground/30 bg-transparent hover:bg-foreground/5 text-foreground/50 hover:text-foreground/80 transition-all cursor-pointer ml-2"
                title="Add Button"
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Get Started", variant: "solid" }], buttonText: undefined })}>Solid Button</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Learn More", variant: "outline" }], buttonText: undefined })}>Outline Button</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Contact Us", variant: "ghost" }], buttonText: undefined })}>Ghost Button</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {interactive && buttonsList.length > 1 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-foreground/30 bg-transparent hover:bg-foreground/5 text-foreground/50 hover:text-foreground/80 transition-all cursor-pointer ml-1"
                title="Button Gap / Spacing"
              >
                <ArrowLeftRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateStyle?.({ gap: "0.5rem" })}>Tight Spacing</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateStyle?.({ gap: "1rem" })}>Normal Spacing</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => onUpdateStyle?.({ gap: "2rem" })}>Wide Spacing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    );

    return (
      <section
        {...aosAttrs}
        id={currentSectionId}
        style={{
          ...css,
          backgroundColor: ctaBg,
          color: textColor,
          borderRadius: ctaRadius,
        }}
        className="py-16 md:py-20 transition-all"
      >
        <Center maxWidth={effectiveMaxWidth}>
          {isSplitLayout ? (
            <div className={`flex justify-between gap-8 text-left ${isMobileOrTablet ? "flex-col items-start text-left" : "flex-col md:flex-row items-center"}`}>
              <div className="space-y-3 max-w-2xl">
                {props.heading && (
                  <h2
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.innerText.trim();
                      if (newText && newText !== props.heading) {
                        onUpdateProps?.({ heading: newText });
                      }
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`${
                      isMobile ? "text-2xl sm:text-3xl" : isTablet ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl lg:text-6xl"
                    } font-extrabold tracking-tight ${interactive ? "cursor-text transition-all" : ""}`}
                  >
                    {props.heading}
                  </h2>
                )}
                {props.subheading && (
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.innerText.trim();
                      if (newText && newText !== props.subheading) {
                        onUpdateProps?.({ subheading: newText });
                      }
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`${isMobile ? "text-sm" : "text-base font-medium"} opacity-90 ${
                      interactive ? "cursor-text transition-all" : ""
                    }`}
                  >
                    {props.subheading}
                  </p>
                )}
                {interactive && !props.subheading && (
                  <button
                    type="button"
                    onClick={() => onUpdateProps?.({ subheading: "Enter your subtitle here..." })}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-foreground/30 bg-transparent hover:bg-foreground/5 text-foreground/50 hover:text-foreground/80 transition-all cursor-pointer mt-2"
                    title="Add Subheading"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                )}
              </div>
              <div className="shrink-0">
                {renderCtaButtons()}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {variant === "gradient-glow-cta" && (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold mb-2 ${
                  isDarkBg ? "bg-white/10 backdrop-blur-md border-white/20 text-white" : "bg-primary/10 border-primary/20 text-primary"
                }`}>
                  <span>✦</span> <span>ANNOUNCEMENT</span>
                </div>
              )}
              {props.heading && (
                <h2
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerText.trim();
                    if (newText && newText !== props.heading) {
                      onUpdateProps?.({ heading: newText });
                    }
                  }}
                  style={{ outline: "none", color: textColor }}
                  className={`${
                    isMobile ? "text-2xl sm:text-3xl" : isTablet ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl lg:text-6xl"
                  } font-extrabold tracking-tight ${interactive ? "cursor-text transition-all" : ""}`}
                >
                  {props.heading}
                </h2>
              )}
              {props.subheading && (
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerText.trim();
                    if (newText && newText !== props.subheading) {
                      onUpdateProps?.({ subheading: newText });
                    }
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`text-lg md:text-xl opacity-90 max-w-2xl mx-auto ${
                    interactive ? "cursor-text transition-all" : ""
                  }`}
                >
                  {props.subheading}
                </p>
              )}
              {interactive && !props.subheading && (
                <button
                  type="button"
                  onClick={() => onUpdateProps?.({ subheading: "Enter your subtitle here..." })}
                  className="flex h-8 w-8 mx-auto items-center justify-center rounded-full border border-dashed border-foreground/30 bg-transparent hover:bg-foreground/5 text-foreground/50 hover:text-foreground/80 transition-all cursor-pointer mt-2"
                  title="Add Subheading"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              )}
              <div className="pt-2">
                {renderCtaButtons()}
              </div>
            </div>
          )}
        </Center>
      </section>
    );
  }

  if (type === "footer") {
    const variant = props.variant || "multi-column-links";
    const effectiveBg = (!style.backgroundColor || style.backgroundColor === "transparent")
      ? (theme.backgroundColor || (pageBgDark ? "#09090b" : "#f1f5f9"))
      : style.backgroundColor;

    const footerBgDark = isDarkColor(effectiveBg);
    const isDarkBg = footerBgDark !== undefined ? footerBgDark : pageBgDark;

    const isLightBg = !isDarkBg;
    const footerBg = style.backgroundColor || "transparent";
    const footerRadius = style.borderRadius || "0px";

    const textColor = style.textColor && style.textColor !== "#ffffff" && style.textColor !== "#0f172a"
      ? style.textColor
      : isDarkBg
      ? "#f8fafc"
      : (theme.textColor || "#0f172a");

    const subtextColor = isDarkBg ? "rgba(255, 255, 255, 0.75)" : (theme.textColor ? `${theme.textColor}cc` : "#475569");
    const borderColor = isDarkBg ? "rgba(255, 255, 255, 0.12)" : "rgba(15, 23, 42, 0.12)";

    const logoText = props.logoText || "CraftSite";
    const tagline = props.tagline || "Building the future of visual web creation.";
    const copyright = props.copyright || `© ${new Date().getFullYear()} ${logoText}. All rights reserved.`;

    const navLinks = props.links || [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Contact Us", href: "#" },
    ];

    const columnsList: { title: string; links: string[] }[] = Array.isArray(props.columns)
      ? (props.columns as { title: string; links: string[] }[])
      : [
          { title: "Product", links: ["Features", "Templates", "Integrations", "Changelog"] },
          { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
          { title: "Resources", links: ["Documentation", "Community", "Guides", "API Status"] },
        ];

    const [activeFooterPopover, setActiveFooterPopover] = useState<string | null>(null);

    return (
      <footer
        {...aosAttrs}
        id={currentSectionId}
        style={{
          ...css,
          backgroundColor: footerBg,
          color: textColor,
          borderRadius: footerRadius,
        }}
        className={`py-12 md:py-16 transition-all relative ${activeFooterPopover ? "z-[9999]" : "z-40"}`}
      >
        <Center maxWidth={effectiveMaxWidth}>
          {variant === "centered-minimal" ? (
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h3
                contentEditable={interactive}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const next = e.currentTarget.innerText.trim();
                  if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                }}
                style={{ outline: "none", color: textColor }}
                className={`text-2xl font-black tracking-tight ${interactive ? "cursor-text transition-all" : ""}`}
              >
                {logoText}
              </h3>
              <p
                contentEditable={interactive}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const next = e.currentTarget.innerText.trim();
                  if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                }}
                style={{ outline: "none", color: subtextColor }}
                className={`text-sm ${interactive ? "cursor-text transition-all" : ""}`}
              >
                {tagline}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
                {navLinks.map((l: any, idx: number) => (
                  <div key={idx} className="group/link relative inline-flex items-center">
                    <a
                      href={l.href || "#"}
                      className="hover:opacity-100 transition-opacity"
                      style={{ color: textColor }}
                      onClick={(e) => {
                        if (interactive) {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveFooterPopover(activeFooterPopover === `nav-${idx}` ? null : `nav-${idx}`);
                        }
                      }}
                    >
                      {l.label}
                    </a>
                    {interactive && activeFooterPopover === `nav-${idx}` && (
                      <LinkEditItem
                        link={{ label: l.label, href: l.href || "#" }}
                        sectionOptions={sectionOptions}
                        positionUp={true}
                        onSave={(label, newHref) => {
                          const next = [...navLinks];
                          next[idx] = { ...next[idx], label, href: newHref };
                          onUpdateProps?.({ links: next });
                          setActiveFooterPopover(null);
                        }}
                        onRemove={() => {
                          const next = [...navLinks];
                          next.splice(idx, 1);
                          onUpdateProps?.({ links: next });
                          setActiveFooterPopover(null);
                        }}
                        onClose={() => setActiveFooterPopover(null)}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t" style={{ borderColor }}>
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerText.trim();
                    if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`text-xs opacity-60 ${interactive ? "cursor-text transition-all" : ""}`}
                >
                  {copyright}
                </p>
              </div>
            </div>
          ) : variant === "newsletter-split-footer" ? (
            <div className="space-y-12">
              <div
                className={`p-6 md:p-8 border flex justify-between gap-6 ${
                  isMobileOrTablet ? "flex-col items-start text-left" : "flex-col lg:flex-row lg:items-center"
                }`}
                style={{
                  borderColor,
                  backgroundColor: isLightBg ? "rgba(15,23,42,0.03)" : "rgba(255,255,255,0.05)",
                  borderRadius: theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "24px" : (theme.borderRadius || "16px"),
                }}
              >
                <div className={`space-y-1 text-left ${isMobileOrTablet ? "w-full" : "flex-1 min-w-0 pr-4"}`}>
                  <h4
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== (props.heading || "Stay updated with our latest news")) {
                        onUpdateProps?.({ heading: next });
                      }
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-lg md:text-xl font-bold ${interactive ? "cursor-text transition-all" : ""}`}
                  >
                    {props.heading || "Stay updated with our latest news"}
                  </h4>
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-xs ${interactive ? "cursor-text transition-all" : ""}`}
                  >
                    {tagline}
                  </p>
                </div>
                <div
                  className={`flex gap-2.5 shrink-0 ${
                    isMobile
                      ? "flex-col items-stretch w-full"
                      : "flex-col sm:flex-row items-stretch sm:items-center w-full lg:w-auto"
                  }`}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`px-4 py-2.5 border bg-transparent text-sm outline-none placeholder:opacity-50 ${
                      isMobile ? "w-full" : "w-full sm:w-64"
                    }`}
                    style={{ borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                  />
                  <div className={`relative group/btn inline-flex items-center ${isMobile ? "w-full" : "w-full sm:w-auto"}`}>
                    <button
                      type="button"
                      onClick={(e) => {
                        if (!interactive) return;
                        e.stopPropagation();
                        setActiveFooterPopover(activeFooterPopover === "cta-btn" ? null : "cta-btn");
                      }}
                      className={`px-5 py-2.5 font-bold text-xs text-white shadow-md hover:brightness-110 justify-center shrink-0 cursor-pointer ${
                        isMobile ? "w-full" : "w-full sm:w-auto"
                      }`}
                      style={{ backgroundColor: primary, borderRadius: theme.borderRadius || "12px" }}
                    >
                      {props.buttonText || "Subscribe"}
                    </button>
                    {interactive && activeFooterPopover === "cta-btn" && (
                      <ButtonEditItem
                        button={{ label: props.buttonText || "Subscribe", href: props.buttonHref || "#" }}
                        sectionOptions={sectionOptions}
                        onSave={(label, newHref) => {
                          onUpdateProps?.({ buttonText: label, buttonHref: newHref });
                          setActiveFooterPopover(null);
                        }}
                        onRemove={() => setActiveFooterPopover(null)}
                        onClose={() => setActiveFooterPopover(null)}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={`grid gap-8 text-left ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-4"}`}>
                <div className={`space-y-3 text-left ${isMobile ? "w-full" : "md:col-span-2"}`}>
                  <h3
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-xl font-black whitespace-nowrap ${interactive ? "cursor-text transition-all" : ""}`}
                  >
                    {logoText}
                  </h3>
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-xs max-w-sm ${interactive ? "cursor-text transition-all" : ""}`}
                  >
                    {tagline}
                  </p>
                </div>
                <div className="md:col-span-2 grid grid-cols-2 gap-6">
                  {columnsList.map((col: any, cIdx: number) => (
                    <div key={cIdx} className="space-y-3 text-xs text-left">
                      <h5
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerText.trim();
                          if (next && next !== col.title) {
                            const updatedCols = [...columnsList];
                            updatedCols[cIdx] = { ...updatedCols[cIdx], title: next };
                            onUpdateProps?.({ columns: updatedCols });
                          }
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-bold uppercase tracking-wider text-[11px] whitespace-nowrap ${interactive ? "cursor-text transition-all" : ""}`}
                      >
                        {col.title}
                      </h5>
                      <ul className="space-y-2">
                        {col.links.map((lnk: string, lIdx: number) => (
                          <li key={lIdx} className="block">
                            <span
                              contentEditable={interactive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerText.trim();
                                if (next && next !== lnk) {
                                  const updatedCols = [...columnsList];
                                  const nextLinks = [...updatedCols[cIdx].links];
                                  nextLinks[lIdx] = next;
                                  updatedCols[cIdx] = { ...updatedCols[cIdx], links: nextLinks };
                                  onUpdateProps?.({ columns: updatedCols });
                                }
                              }}
                              style={{ outline: "none", color: subtextColor }}
                              className={`hover:opacity-100 transition-opacity block whitespace-nowrap ${interactive ? "cursor-text" : ""}`}
                            >
                              {lnk}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`pt-6 border-t flex items-center justify-between text-xs gap-4 ${isMobile ? "flex-col text-center" : "flex-col md:flex-row"}`} style={{ borderColor }}>
                <span
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerText.trim();
                    if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={interactive ? "cursor-text transition-all" : ""}
                >
                  {copyright}
                </span>
                <div className="flex gap-4" style={{ color: subtextColor }}>
                  {navLinks.map((l: any, idx: number) => (
                    <div key={idx} className="group/link relative inline-flex items-center">
                      <a
                        href={l.href || "#"}
                        className="hover:opacity-100 transition-opacity"
                        style={{ color: subtextColor }}
                        onClick={(e) => {
                          if (interactive) {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveFooterPopover(activeFooterPopover === `nav-${idx}` ? null : `nav-${idx}`);
                          }
                        }}
                      >
                        {l.label}
                      </a>
                      {interactive && activeFooterPopover === `nav-${idx}` && (
                        <LinkEditItem
                          link={{ label: l.label, href: l.href || "#" }}
                          sectionOptions={sectionOptions}
                          alignRight={true}
                          positionUp={true}
                          onSave={(label, newHref) => {
                            const next = [...navLinks];
                            next[idx] = { ...next[idx], label, href: newHref };
                            onUpdateProps?.({ links: next });
                            setActiveFooterPopover(null);
                          }}
                          onRemove={() => {
                            const next = [...navLinks];
                            next.splice(idx, 1);
                            onUpdateProps?.({ links: next });
                            setActiveFooterPopover(null);
                          }}
                          onClose={() => setActiveFooterPopover(null)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Multi-Column Links Default */
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-left">
                <div className="md:col-span-2 space-y-3 text-left">
                  <h3
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-2xl font-black whitespace-nowrap ${interactive ? "cursor-text transition-all" : ""}`}
                  >
                    {logoText}
                  </h3>
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-sm max-w-sm ${interactive ? "cursor-text transition-all" : ""}`}
                  >
                    {tagline}
                  </p>
                </div>
                <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {columnsList.map((col: any, cIdx: number) => (
                    <div key={cIdx} className="space-y-3 text-sm text-left">
                      <h5
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerText.trim();
                          if (next && next !== col.title) {
                            const updatedCols = [...columnsList];
                            updatedCols[cIdx] = { ...updatedCols[cIdx], title: next };
                            onUpdateProps?.({ columns: updatedCols });
                          }
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-bold uppercase tracking-wider text-xs whitespace-nowrap ${interactive ? "cursor-text transition-all" : ""}`}
                      >
                        {col.title}
                      </h5>
                      <ul className="space-y-2.5">
                        {col.links.map((lnk: string, lIdx: number) => (
                          <li key={lIdx} className="block">
                            <span
                              contentEditable={interactive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerText.trim();
                                if (next && next !== lnk) {
                                  const updatedCols = [...columnsList];
                                  const nextLinks = [...updatedCols[cIdx].links];
                                  nextLinks[lIdx] = next;
                                  updatedCols[cIdx] = { ...updatedCols[cIdx], links: nextLinks };
                                  onUpdateProps?.({ columns: updatedCols });
                                }
                              }}
                              style={{ outline: "none", color: subtextColor }}
                              className={`hover:opacity-100 transition-opacity block whitespace-nowrap ${interactive ? "cursor-text" : ""}`}
                            >
                              {lnk}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between text-xs gap-4" style={{ borderColor }}>
                <span
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerText.trim();
                    if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={interactive ? "cursor-text transition-all" : ""}
                >
                  {copyright}
                </span>
                <div className="flex items-center gap-6" style={{ color: subtextColor }}>
                  {navLinks.map((l: any, idx: number) => (
                    <div key={idx} className="group/link relative inline-flex items-center">
                      <a
                        href={l.href || "#"}
                        className="hover:opacity-100 transition-opacity"
                        style={{ color: subtextColor }}
                        onClick={(e) => {
                          if (interactive) {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveFooterPopover(activeFooterPopover === `nav-${idx}` ? null : `nav-${idx}`);
                          }
                        }}
                      >
                        {l.label}
                      </a>
                      {interactive && activeFooterPopover === `nav-${idx}` && (
                        <LinkEditItem
                          link={{ label: l.label, href: l.href || "#" }}
                          sectionOptions={sectionOptions}
                          alignRight={true}
                          positionUp={true}
                          onSave={(label, newHref) => {
                            const next = [...navLinks];
                            next[idx] = { ...next[idx], label, href: newHref };
                            onUpdateProps?.({ links: next });
                            setActiveFooterPopover(null);
                          }}
                          onRemove={() => {
                            const next = [...navLinks];
                            next.splice(idx, 1);
                            onUpdateProps?.({ links: next });
                            setActiveFooterPopover(null);
                          }}
                          onClose={() => setActiveFooterPopover(null)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Center>
      </footer>
    );
  }

  if (type === "form") {
    const variant = props.variant || "classic-centered-form";
    const heading = props.heading || "Get in touch";
    const subheading = props.subheading || "Have questions or want to start a project? Send us a message and we'll reply within 24 hours.";
    const buttonText = props.buttonText || "Send message";
    const contactEmail = props.contactEmail || "hello@craftsite.io";
    const contactPhone = props.contactPhone || "+1 (555) 234-5678";
    const contactAddress = props.contactAddress || "795 Folsom St, San Francisco, CA";
    const contactHours = props.contactHours || "Mon - Fri, 9am - 6pm EST";

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

    const formBgDark = isDarkColor(style.backgroundColor);
    const isDarkCard = formBgDark !== undefined ? formBgDark : pageBgDark;

    const textColor = isDarkCard ? "#f8fafc" : "#0f172a";
    const subtextColor = isDarkCard ? "#94a3b8" : "#475569";
    const labelColor = isDarkCard ? "#cbd5e1" : "#334155";
    const cardBg = isDarkCard ? "rgba(15, 23, 42, 0.9)" : "#ffffff";
    const inputBg = isDarkCard ? "rgba(2, 6, 23, 0.6)" : "#f8fafc";
    const borderColor = isDarkCard ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      const target = e.target as HTMLFormElement;
      if (target && typeof target.reset === "function") {
        target.reset();
      }
      toast.success("Message Sent Successfully!", {
        description: "Thank you for reaching out. We will get back to you shortly.",
        duration: 4000,
      });
      setTimeout(() => setFormSubmitted(false), 5000);
    };

    const sectionMaxWidth = theme.containerWidth || "1120px";

    const isTransparentBg = !style.backgroundColor || style.backgroundColor === "transparent" || style.backgroundColor === "#ffffff" || style.backgroundColor === "#f8fafc";
    const sectionBg = isTransparentBg ? "transparent" : style.backgroundColor;

    return (
      <section
        {...aosAttrs}
        id={currentSectionId}
        style={{ ...css, backgroundColor: sectionBg }}
        className="py-16 md:py-24 transition-all relative w-full"
      >
        <Center maxWidth={sectionMaxWidth}>
          {/* Variant 1: classic-centered-form */}
          {(variant === "classic-centered-form" || !variant) && (
            <div
              className={`w-full max-w-2xl sm:max-w-3xl mx-auto p-8 sm:p-12 border ${borderColor} shadow-xl backdrop-blur-md space-y-8`}
              style={{
                backgroundColor: cardBg,
                borderRadius: theme.borderRadius || "20px",
              }}
            >
              <div className="text-center space-y-3">
                <h2
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerText.trim();
                    if (next && next !== heading) onUpdateProps?.({ heading: next });
                  }}
                  style={{ outline: "none", color: textColor }}
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${interactive ? "cursor-text" : ""}`}
                >
                  {heading}
                </h2>
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerText.trim();
                    if (next && next !== subheading) onUpdateProps?.({ subheading: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`text-sm sm:text-base max-w-lg mx-auto ${interactive ? "cursor-text" : ""}`}
                >
                  {subheading}
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); if (!interactive) handleSubmit(e); }} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground/80">Full Name</label>
                      <input
                        type="text"
                        required={!interactive}
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground/80">Email Address</label>
                      <input
                        type="email"
                        required={!interactive}
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80">Subject</label>
                    <input
                      type="text"
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80">Message</label>
                    <textarea
                      rows={4}
                      required={!interactive}
                      placeholder="Tell us about your timeline, budget, and requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                    />
                  </div>
                  <button
                    type={interactive ? "button" : "submit"}
                    className="w-full py-3.5 px-6 font-bold text-sm text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 border-2 border-transparent"
                    style={{ backgroundColor: primary, borderRadius: theme.borderRadius || "12px" }}
                  >
                    <span
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerText.trim();
                        if (next && next !== buttonText) onUpdateProps?.({ buttonText: next });
                      }}
                      style={{ outline: "none" }}
                      className={interactive ? "cursor-text" : ""}
                    >
                      {buttonText}
                    </span>
                  </button>
                </form>
            </div>
          )}

          {/* Variant 2: split-contact-info-form */}
          {variant === "split-contact-info-form" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
              {/* Left Column: Direct Contact Info */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <h2
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== heading) onUpdateProps?.({ heading: next });
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${interactive ? "cursor-text" : ""}`}
                  >
                    {heading}
                  </h2>
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== subheading) onUpdateProps?.({ subheading: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-base ${interactive ? "cursor-text" : ""}`}
                  >
                    {subheading}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border flex items-start gap-4 transition-all hover:border-primary/40" style={{ backgroundColor: cardBg, borderColor }}>
                    <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Support</h4>
                      <p
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerText.trim();
                          if (next && next !== contactEmail) onUpdateProps?.({ contactEmail: next });
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-semibold text-sm mt-0.5 ${interactive ? "cursor-text" : ""}`}
                      >
                        {contactEmail}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border flex items-start gap-4 transition-all hover:border-primary/40" style={{ backgroundColor: cardBg, borderColor }}>
                    <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Call Us Directly</h4>
                      <p
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerText.trim();
                          if (next && next !== contactPhone) onUpdateProps?.({ contactPhone: next });
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-semibold text-sm mt-0.5 ${interactive ? "cursor-text" : ""}`}
                      >
                        {contactPhone}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border flex items-start gap-4 transition-all hover:border-primary/40" style={{ backgroundColor: cardBg, borderColor }}>
                    <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Headquarters</h4>
                      <p
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerText.trim();
                          if (next && next !== contactAddress) onUpdateProps?.({ contactAddress: next });
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-semibold text-sm mt-0.5 ${interactive ? "cursor-text" : ""}`}
                      >
                        {contactAddress}
                      </p>
                      <p
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerText.trim();
                          if (next && next !== contactHours) onUpdateProps?.({ contactHours: next });
                        }}
                        style={{ outline: "none", color: subtextColor }}
                        className={`text-xs opacity-75 mt-1 ${interactive ? "cursor-text" : ""}`}
                      >
                        {contactHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form Card */}
              <div
                className={`lg:col-span-7 p-8 sm:p-10 border ${borderColor} shadow-2xl backdrop-blur-md space-y-6`}
                style={{ backgroundColor: cardBg, borderRadius: theme.borderRadius || "24px" }}
              >
                <form onSubmit={(e) => { e.preventDefault(); if (!interactive) handleSubmit(e); }} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground/80">First Name</label>
                      <input
                        type="text"
                        required={!interactive}
                        placeholder="Alex"
                        className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground/80">Last Name</label>
                      <input
                        type="text"
                        required={!interactive}
                        placeholder="Smith"
                        className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80">Work Email</label>
                    <input
                      type="email"
                      required={!interactive}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80">Message</label>
                    <textarea
                      rows={4}
                      required={!interactive}
                      placeholder="How can we help your business succeed?"
                      className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                    />
                  </div>
                  <button
                    type={interactive ? "button" : "submit"}
                    className="w-full py-3.5 px-6 font-bold text-sm text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 border-2 border-transparent"
                    style={{ backgroundColor: primary, borderRadius: theme.borderRadius || "12px" }}
                  >
                    <span
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerText.trim();
                        if (next && next !== buttonText) onUpdateProps?.({ buttonText: next });
                      }}
                      style={{ outline: "none" }}
                      className={interactive ? "cursor-text" : ""}
                    >
                      {buttonText}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Variant 3: boxed-dark-glass-form / Modern Centered Form */}
          {variant === "boxed-dark-glass-form" && (
            <div
              className={`w-full max-w-2xl sm:max-w-3xl mx-auto p-8 sm:p-12 border ${borderColor} shadow-2xl space-y-8`}
              style={{
                backgroundColor: cardBg,
                color: textColor,
                borderRadius: theme.borderRadius || "24px",
              }}
            >
              <div className="text-center space-y-3">
                <h2
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerText.trim();
                    if (next && next !== heading) onUpdateProps?.({ heading: next });
                  }}
                  style={{ outline: "none", color: textColor }}
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${interactive ? "cursor-text" : ""}`}
                >
                  {heading}
                </h2>
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerText.trim();
                    if (next && next !== subheading) onUpdateProps?.({ subheading: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`text-sm max-w-lg mx-auto ${interactive ? "cursor-text" : ""}`}
                >
                  {subheading}
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); if (!interactive) handleSubmit(e); }} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold" style={{ color: labelColor }}>Your Name</label>
                  <input
                    type="text"
                    required={!interactive}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400"
                    style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold" style={{ color: labelColor }}>Work Email</label>
                  <input
                    type="email"
                    required={!interactive}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400"
                    style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold" style={{ color: labelColor }}>Project Overview</label>
                  <textarea
                    rows={4}
                    required={!interactive}
                    placeholder="Briefly describe your goals, budget range, and desired launch date..."
                    className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none placeholder:text-slate-400"
                    style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                  />
                </div>
                <button
                  type={interactive ? "button" : "submit"}
                  className="w-full py-3.5 px-6 font-bold text-sm text-white shadow-xl transition-all hover:brightness-110 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 border-2 border-transparent"
                  style={{ backgroundColor: primary, borderRadius: theme.borderRadius || "12px" }}
                >
                  <span
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== buttonText) onUpdateProps?.({ buttonText: next });
                    }}
                    style={{ outline: "none" }}
                    className={interactive ? "cursor-text" : ""}
                  >
                    {buttonText}
                  </span>
                </button>
              </form>
            </div>
          )}

          {/* Variant 4: map-split-form */}
          {variant === "map-split-form" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
              {/* Left Column: Office Location Card */}
              <div
                className={`lg:col-span-5 p-8 border ${borderColor} flex flex-col justify-between space-y-6 shadow-xl`}
                style={{ backgroundColor: cardBg, borderRadius: theme.borderRadius || "24px" }}
              >
                <div className="space-y-4">
                  <h3
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== heading) onUpdateProps?.({ heading: next });
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-2xl font-bold ${interactive ? "cursor-text" : ""}`}
                  >
                    {heading}
                  </h3>
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== subheading) onUpdateProps?.({ subheading: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-sm ${interactive ? "cursor-text" : ""}`}
                  >
                    {subheading}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border space-y-3" style={{ backgroundColor: inputBg, borderColor }}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold" style={{ color: textColor }}>Studio Location</span>
                    <span className="text-emerald-500 font-bold">Open</span>
                  </div>
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== contactAddress) onUpdateProps?.({ contactAddress: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-xs ${interactive ? "cursor-text" : ""}`}
                  >
                    {contactAddress}
                  </p>
                  <div className="pt-2 border-t flex items-center justify-between text-xs opacity-80" style={{ borderColor, color: subtextColor }}>
                    <span
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerText.trim();
                        if (next && next !== contactEmail) onUpdateProps?.({ contactEmail: next });
                      }}
                      style={{ outline: "none" }}
                      className={interactive ? "cursor-text" : ""}
                    >
                      {contactEmail}
                    </span>
                    <span
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerText.trim();
                        if (next && next !== contactPhone) onUpdateProps?.({ contactPhone: next });
                      }}
                      style={{ outline: "none" }}
                      className={interactive ? "cursor-text" : ""}
                    >
                      {contactPhone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Contact Form */}
              <div
                className={`lg:col-span-7 p-8 sm:p-10 border ${borderColor} shadow-xl backdrop-blur-md space-y-6`}
                style={{ backgroundColor: cardBg, borderRadius: theme.borderRadius || "24px" }}
              >
                <form onSubmit={(e) => { e.preventDefault(); if (!interactive) handleSubmit(e); }} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground/80">First Name</label>
                      <input
                        type="text"
                        required={!interactive}
                        placeholder="Alex"
                        className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground/80">Last Name</label>
                      <input
                        type="text"
                        required={!interactive}
                        placeholder="Morgan"
                        className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80">Email Address</label>
                    <input
                      type="email"
                      required={!interactive}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/80">Message</label>
                    <textarea
                      rows={4}
                      required={!interactive}
                      placeholder="How can our studio assist you?"
                      className="w-full px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                    />
                  </div>
                  <button
                    type={interactive ? "button" : "submit"}
                    className="w-full py-3.5 px-6 font-bold text-sm text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 border-2 border-transparent"
                    style={{ backgroundColor: primary, borderRadius: theme.borderRadius || "12px" }}
                  >
                    <span
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerText.trim();
                        if (next && next !== buttonText) onUpdateProps?.({ buttonText: next });
                      }}
                      style={{ outline: "none" }}
                      className={interactive ? "cursor-text" : ""}
                    >
                      {buttonText}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Variant 5: compact-newsletter-contact */}
          {variant === "compact-newsletter-contact" && (
            <div
              className={`p-6 sm:p-8 border ${borderColor} shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left`}
              style={{
                backgroundColor: cardBg,
                borderRadius: theme.borderRadius || "20px",
              }}
            >
              <div className="space-y-1 max-w-md">
                <h3
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerText.trim();
                    if (next && next !== heading) onUpdateProps?.({ heading: next });
                  }}
                  style={{ outline: "none", color: textColor }}
                  className={`text-xl font-bold tracking-tight ${interactive ? "cursor-text" : ""}`}
                >
                  {heading}
                </h3>
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerText.trim();
                    if (next && next !== subheading) onUpdateProps?.({ subheading: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`text-xs ${interactive ? "cursor-text" : ""}`}
                >
                  {subheading}
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); if (!interactive) handleSubmit(e); }} className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <input
                  type="email"
                  required={!interactive}
                  placeholder="Enter your email"
                  className="w-full sm:w-64 px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                />
                <button
                  type={interactive ? "button" : "submit"}
                  className="w-full sm:w-auto py-3 px-6 font-bold text-sm text-white shadow-md transition-all hover:brightness-110 shrink-0 cursor-pointer border-2 border-transparent"
                  style={{ backgroundColor: primary, borderRadius: theme.borderRadius || "12px" }}
                >
                  <span
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerText.trim();
                      if (next && next !== buttonText) onUpdateProps?.({ buttonText: next });
                    }}
                    style={{ outline: "none" }}
                    className={interactive ? "cursor-text" : ""}
                  >
                    {buttonText}
                  </span>
                </button>
              </form>
            </div>
          )}
        </Center>
      </section>
    );
  }

  // Fallback for default section types
  return (
    <section
      {...aosAttrs}
      id={currentSectionId}
      style={css}
      className={`py-12 ${
        isFollowingNavbar
          ? "min-h-[90vh] lg:min-h-[100vh] !pt-[130px] md:!pt-[170px]"
          : ""
      }`}
    >
      <Center maxWidth={effectiveMaxWidth}>
        {props.heading && (
          <h2
            contentEditable={interactive}
            suppressContentEditableWarning
            onBlur={(e) => {
              const newText = e.currentTarget.innerText.trim();
              if (newText && newText !== props.heading) {
                onUpdateProps?.({ heading: newText });
              }
            }}
            style={{ outline: "none" }}
            className={`text-2xl font-bold mb-4 ${
              interactive ? "cursor-text transition-all" : ""
            }`}
          >
            {props.heading}
          </h2>
        )}
        {props.text && (
          <p
            contentEditable={interactive}
            suppressContentEditableWarning
            onBlur={(e) => {
              const newText = e.currentTarget.innerText.trim();
              if (newText && newText !== props.text) {
                onUpdateProps?.({ text: newText });
              }
            }}
            style={{ outline: "none" }}
            className={`text-muted-foreground ${
              interactive ? "cursor-text transition-all" : ""
            }`}
          >
            {props.text}
          </p>
        )}
      </Center>
    </section>
  );
}

export function PageRenderer({
  components,
  theme,
}: {
  components: BuilderComponent[];
  theme: SiteTheme;
}) {
  const [mode, setMode] = useState<"light" | "dark">(theme.mode || "light");

  useEffect(() => {
    if (theme.mode) setMode(theme.mode);
  }, [theme.mode]);

  const isDark = mode === "dark";

  const effectiveTheme: SiteTheme = {
    ...theme,
    mode,
    backgroundColor: isDark
      ? (theme.backgroundColor && isDarkColor(theme.backgroundColor) === true ? theme.backgroundColor : "#09090b")
      : (theme.backgroundColor && isDarkColor(theme.backgroundColor) === false ? theme.backgroundColor : "#f1f5f9"),
    textColor: isDark ? "#f8fafc" : (theme.textColor && theme.textColor !== "#f8fafc" ? theme.textColor : "#0f172a"),
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-300 pt-0.5 relative ${isDark ? "dark bg-black text-slate-100" : "bg-[#f1f5f9] text-slate-900"}`}
      style={{
        backgroundColor: effectiveTheme.backgroundColor,
        color: effectiveTheme.textColor,
        fontFamily: theme.fontFamily || "inherit",
      }}
    >


      {components.map((component) =>
        component.type === "navbar" &&
        (component.props?.variant === "floating-glass" || (component.props?.scrollBehavior ?? "overlay") === "overlay") ? (
          <div
            key={component.id}
            className={`${
              component.props?.variant === "floating-glass"
                ? "absolute inset-0 pointer-events-none"
                : "absolute top-0 left-0 right-0 w-full"
            } z-[9999]`}
          >
            <ComponentRenderer
              component={component}
              allComponents={components}
              theme={effectiveTheme}
              interactive={false}
            />
          </div>
        ) : (
          <ComponentRenderer
            key={component.id}
            component={component}
            allComponents={components}
            theme={effectiveTheme}
            interactive={false}
          />
        )
      )}
    </main>
  );
}
