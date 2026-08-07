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
  Layers,
  Palette,
  Rocket,
  Monitor,
  Database,
  MapPin,
  Clock,
  Send,
  Sun,
  Moon,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Share2,
  Trash2,
  Video,
  Play,
  Quote,
  TrendingUp,
  CheckCircle,
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
  layers: Layers,
  palette: Palette,
  rocket: Rocket,
  monitor: Monitor,
  database: Database,
  video: Video,
  play: Play,
  quote: Quote,
  trending: TrendingUp,
  check: CheckCircle,
};

// Social Icons Polyfill (for missing lucide-react brand icons)
const Twitter = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Instagram = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Linkedin = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const Github = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const Facebook = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Youtube = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);
const Discord = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6h0a14.5 14.5 0 0 0-4-1.25 10.7 10.7 0 0 0-.5 1A13.5 13.5 0 0 0 10.5 5.75a10.7 10.7 0 0 0-.5-1A14.5 14.5 0 0 0 6 6a15.8 15.8 0 0 0-3 11 14.4 14.4 0 0 0 4.5 2.25 10.9 10.9 0 0 0 1-1.6 9.4 9.4 0 0 1-1.5-.7 1 1 0 0 1 1-.7 10.2 10.2 0 0 0 8 0 1 1 0 0 1 1 .7 9.4 9.4 0 0 1-1.5.7 10.9 10.9 0 0 0 1 1.6A14.4 14.4 0 0 0 21 17a15.8 15.8 0 0 0-3-11z"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>
);
const Dribbble = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 18.5"/></svg>
);
const TikTok = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
);

export function RenderSocialIcon({ platform, className = "h-4 w-4 shrink-0" }: { platform?: string; className?: string }) {
  if (!platform) return <Globe className={className} />;
  const p = platform.toLowerCase().trim();
  if (p === "facebook") return <Facebook className={className} />;
  if (p === "github") return <Github className={className} />;
  if (p === "twitter" || p === "x") return <Twitter className={className} />;
  if (p === "instagram") return <Instagram className={className} />;
  if (p === "linkedin") return <Linkedin className={className} />;
  if (p === "youtube") return <Youtube className={className} />;
  if (p === "discord") return <Discord className={className} />;
  if (p === "dribbble") return <Dribbble className={className} />;
  if (p === "tiktok") return <TikTok className={className} />;
  if (p === "globe" || p === "website") return <Globe className={className} />;
  if (p === "mail" || p === "email") return <Mail className={className} />;
  return <Globe className={className} />;
}

function SocialEditItem({
  social,
  onSave,
  onRemove,
  onClose,
}: {
  social: { platform: string; url?: string; href?: string };
  onSave: (platform: string, url: string) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const [draftPlatform, setDraftPlatform] = useState(social.platform || "twitter");
  const [draftUrl, setDraftUrl] = useState(social.url || social.href || "#");
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

  const PLATFORMS = [
    { id: "facebook", label: "Facebook" },
    { id: "twitter", label: "Twitter / X" },
    { id: "github", label: "GitHub" },
    { id: "instagram", label: "Instagram" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "youtube", label: "YouTube" },
    { id: "discord", label: "Discord" },
    { id: "tiktok", label: "TikTok" },
  ];

  return (
    <EditModalPortal onClose={onClose}>
      <div
        ref={popoverRef}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md my-auto p-5 bg-background border border-border shadow-2xl rounded-2xl text-foreground text-xs space-y-4 animate-in zoom-in-95 cursor-default text-left font-normal"
      >
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-primary" />
            <span className="font-extrabold text-sm text-foreground">Edit Social Link</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
              Social Platform Icon
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setDraftPlatform(p.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-bold transition-all cursor-pointer ${
                    draftPlatform === p.id
                      ? "border-primary bg-primary/10 text-primary shadow-xs"
                      : "border-border/60 hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <RenderSocialIcon platform={p.id} className="h-4 w-4 mb-1 shrink-0" />
                  <span className="truncate w-full text-center">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
              Destination URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={draftUrl}
                onChange={(e) => setDraftUrl(e.target.value)}
                placeholder="https://twitter.com/yourhandle"
                className="w-full px-3 py-2 pl-8 border border-border rounded-xl bg-muted/20 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs font-mono"
              />
              <Link2 className="h-3.5 w-3.5 text-muted-foreground absolute left-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/10 rounded-xl transition-all cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onSave(draftPlatform, draftUrl);
                onClose();
              }}
              className="flex items-center gap-1 px-4 py-1.5 text-xs font-bold text-white bg-primary rounded-xl shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" /> Apply
            </button>
          </div>
        </div>
      </div>
    </EditModalPortal>
  );
}

export function RenderFooterSocialIcons({
  socials,
  textColor,
  borderColor,
  interactive,
  justify = "start",
  onUpdateSocials,
}: {
  socials?: { platform: string; url?: string; href?: string }[];
  textColor?: string;
  borderColor?: string;
  interactive?: boolean;
  justify?: "start" | "center" | "end";
  onUpdateSocials?: (updated: { platform: string; url?: string; href?: string }[]) => void;
}) {
  const [activeEditIndex, setActiveEditIndex] = useState<number | null>(null);

  const currentSocials = socials !== undefined ? socials : [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "github", url: "https://github.com" },
    { platform: "twitter", url: "https://twitter.com" },
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
  ];

  if (!currentSocials) return null;

  const justifyClass =
    justify === "center" ? "justify-center" : justify === "end" ? "justify-end" : "justify-start";

  return (
    <div className={`flex items-center gap-2 flex-wrap ${justifyClass}`}>
      {currentSocials.map((soc, idx) => {
        const href = soc.url || soc.href || "#";
        const isEditingThis = interactive && activeEditIndex === idx;

        return (
          <div key={idx} className="group/soc relative inline-flex items-center">
            {!interactive ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border rounded-full hover:bg-foreground/10 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-xs flex items-center justify-center"
                style={{ color: textColor, borderColor: borderColor || "currentColor" }}
                title={soc.platform ? soc.platform.toUpperCase() : "Social link"}
              >
                <RenderSocialIcon platform={soc.platform} className="h-4 w-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveEditIndex(isEditingThis ? null : idx);
                }}
                className="p-2 border rounded-full hover:bg-foreground/10 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-xs flex items-center justify-center relative"
                style={{ color: textColor, borderColor: borderColor || "currentColor" }}
                title={`Click to Edit ${soc.platform || "Social"} Link`}
              >
                <RenderSocialIcon platform={soc.platform} className="h-4 w-4" />
              </button>
            )}

            {interactive && !isEditingThis && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveEditIndex(idx);
                }}
                className="absolute -top-2 -right-2 hidden group-hover/soc:flex h-4 w-4 items-center justify-center rounded-full bg-background border border-border shadow-md text-primary text-[9px] z-20 cursor-pointer"
                title="Edit Social URL"
              >
                <Link2 className="h-2.5 w-2.5" />
              </button>
            )}

            {isEditingThis && (
              <SocialEditItem
                social={soc}
                onSave={(platform, newUrl) => {
                  const next = [...currentSocials];
                  next[idx] = { platform, url: newUrl };
                  onUpdateSocials?.(next);
                  setActiveEditIndex(null);
                }}
                onRemove={() => {
                  const next = [...currentSocials];
                  next.splice(idx, 1);
                  onUpdateSocials?.(next);
                  setActiveEditIndex(null);
                }}
                onClose={() => setActiveEditIndex(null)}
              />
            )}
          </div>
        );
      })}

      {interactive && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            const next = [...currentSocials, { platform: "twitter", url: "https://twitter.com" }];
            onUpdateSocials?.(next);
            setActiveEditIndex(next.length - 1);
          }}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-foreground/30 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all cursor-pointer ml-1"
          title="Add Social Link"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export function RenderIcon({ icon, className = "h-4 w-4 shrink-0" }: { icon?: string; className?: string }) {
  if (!icon) return null;
  const key = icon.toLowerCase().trim();
  const IconComp = ICON_MAP[key];
  if (IconComp) return <IconComp className={className} />;
  return <span className={className}>{icon}</span>;
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
  style = {},
  isMobile = false,
}: {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  style?: React.CSSProperties;
  isMobile?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${
        isMobile ? "px-3.5 max-w-[95%]" : "px-3.5 sm:px-6 md:px-8"
      } ${className}`}
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

export function getYouTubeEmbedUrl(url?: string, autoplay: boolean = false): string | null {
  if (!url) return null;
  const str = url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = str.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=${autoplay ? "1" : "0"}&rel=0`;
  }
  if (str.includes("youtube.com/embed/")) {
    if (!autoplay && str.includes("autoplay=1")) {
      return str.replace("autoplay=1", "autoplay=0");
    }
    return str;
  }
  return null;
}

export function RenderBadgeIcon({
  tagText = "",
  primaryColor = "#3b82f6",
  className = "h-3.5 w-3.5 shrink-0",
}: {
  tagText?: string;
  primaryColor?: string;
  className?: string;
}) {
  const text = tagText.toLowerCase();
  if (text.includes("★") || text.includes("csat") || text.includes("rating") || text.includes("star")) {
    return <Star className={`${className} text-amber-400 fill-amber-400`} />;
  }
  if (text.includes("⚡") || text.includes("zap") || text.includes("fast") || text.includes("speed")) {
    return <Zap className={`${className} text-amber-400 fill-amber-400`} />;
  }
  if (text.includes("+") || text.includes("%") || text.includes("growth") || text.includes("conversion")) {
    return <TrendingUp className={className} style={{ color: primaryColor }} />;
  }
  if (text.includes("verified") || text.includes("check") || text.includes("customer")) {
    return <CheckCircle className={className} style={{ color: primaryColor }} />;
  }
  if (text.includes("rocket") || text.includes("deploy") || text.includes("ship")) {
    return <Rocket className={className} style={{ color: primaryColor }} />;
  }
  return <Sparkles className={className} style={{ color: primaryColor }} />;
}

function VideoEditItem({
  currentVideoUrl,
  currentThumbnailUrl,
  onSave,
  onClose,
}: {
  currentVideoUrl?: string;
  currentThumbnailUrl?: string;
  onSave: (videoUrl: string, thumbnailUrl?: string) => void;
  onClose: () => void;
}) {
  const [draftVideoUrl, setDraftVideoUrl] = useState(currentVideoUrl || "");
  const [draftThumbnailUrl, setDraftThumbnailUrl] = useState(currentThumbnailUrl || "");
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
        className="w-full max-w-md my-auto p-5 bg-background border border-border shadow-2xl rounded-2xl text-foreground text-xs space-y-4 animate-in zoom-in-95 cursor-default text-left font-normal"
      >
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <span className="font-extrabold text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Video className="h-4 w-4 text-primary" /> Edit Video Testimonial Link
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
              YouTube Video Link or Embed URL
            </label>
            <input
              type="url"
              value={draftVideoUrl}
              onChange={(e) => setDraftVideoUrl(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="w-full px-3 py-2 text-xs border border-border rounded-xl bg-muted/40 focus:outline-none focus:border-primary text-foreground"
            />
            <p className="text-[10px] text-muted-foreground mt-1">
              Paste any YouTube video link (e.g. youtube.com/watch?v=... or youtu.be/...).
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
              Custom Video Poster Image URL (Optional)
            </label>
            <input
              type="url"
              value={draftThumbnailUrl}
              onChange={(e) => setDraftThumbnailUrl(e.target.value)}
              placeholder="e.g. https://images.unsplash.com/photo-..."
              className="w-full px-3 py-2 text-xs border border-border rounded-xl bg-muted/40 focus:outline-none focus:border-primary text-foreground"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-border/60 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-bold text-muted-foreground hover:bg-muted rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(draftVideoUrl, draftThumbnailUrl)}
            className="px-4 py-1.5 text-xs font-bold text-white bg-primary hover:brightness-110 shadow-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Check className="h-3.5 w-3.5" /> Save Video Link
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
  hideLayoutOptions,
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
  hideLayoutOptions?: boolean;
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

      {!hideLayoutOptions && (
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
      )}

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


export const cleanPlainText = (val?: string) => {
  if (!val) return "";
  let s = val;
  if (typeof window !== "undefined") {
    for (let i = 0; i < 3; i++) {
      if (s.includes("&lt;") || s.includes("&gt;") || s.includes("&amp;")) {
        try {
          const doc = new DOMParser().parseFromString(s, "text/html");
          s = doc.body.textContent || s;
        } catch (_) {}
      }
    }
  }
  return s
    .replace(/<[^>]*>/g, "")
    .replace(/&lt;[^&]*&gt;/gi, "")
    .replace(/&lt;\/?[a-z0-9]+&gt;/gi, "")
    .replace(/^[✦\s\*\#\-\•]+/, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

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
  delete css.paddingLeft;
  delete css.paddingRight;
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";
  const isMobileOrTablet = isMobile || isTablet;

  const radius = style.borderRadius || theme.borderRadius || "12px";
  const btnRadius = theme.borderRadius || "12px";
  const shadow = style.boxShadow || theme.boxShadow || "none";
  const effectiveMaxWidth = theme.containerWidth || style.maxWidth || "1120px";
  const primary = theme.primaryColor;

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

  const isDirectlyBelowNavbar = React.useMemo(() => {
    if (!allComponents || allComponents.length < 2) return false;
    const idx = allComponents.findIndex((c) => c.id === component.id);
    return idx === 1 && allComponents[0].type === "navbar";
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
        ? (!pageBgDark ? "rgba(255, 255, 255, 0.9)" : (theme.backgroundColor ? `${theme.backgroundColor}d9` : "rgba(9, 9, 11, 0.85)"))
        : (!pageBgDark ? "#ffffff" : (theme.backgroundColor || "#09090b"));

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

    const [activeSectionId, setActiveSectionId] = useState<string>("");

    useEffect(() => {
      const scrollContainer = document.getElementById("canvas-scroll-viewport") || window;

      const updateActiveSection = () => {
        const sectionElements = allComponents
          .filter((c) => c.type !== "navbar")
          .map((c) => {
            const anchorId = getSectionAnchorId(c);
            const el = document.getElementById(anchorId);
            return { id: anchorId, el };
          })
          .filter((item): item is { id: string; el: HTMLElement } => Boolean(item.el));

        if (sectionElements.length === 0) return;

        const viewportTop = scrollContainer instanceof Window ? window.scrollY : (scrollContainer as HTMLElement).scrollTop;
        const offset = 140;

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const { id, el } = sectionElements[i];
          if (el.offsetTop - offset <= viewportTop) {
            setActiveSectionId(id);
            break;
          }
        }
      };

      scrollContainer.addEventListener("scroll", updateActiveSection, { passive: true });
      updateActiveSection();

      return () => {
        scrollContainer.removeEventListener("scroll", updateActiveSection);
      };
    }, [allComponents]);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
      if (!href) return;
      const targetAnchor = href.replace(/^#/, "").trim();
      if (!targetAnchor || targetAnchor === "#") return;

      let targetEl = document.getElementById(targetAnchor);
      if (!targetEl) {
        const matchedOption = sectionOptions.find(
          (opt) => opt.anchorId.replace(/^#/, "").toLowerCase() === targetAnchor.toLowerCase() ||
                   opt.label.toLowerCase().includes(targetAnchor.toLowerCase())
        );
        if (matchedOption) {
          targetEl = document.getElementById(matchedOption.anchorId.replace(/^#/, ""));
        }
      }

      if (!targetEl) {
        const compMatch = allComponents.find((c) => {
          const anchor = getSectionAnchorId(c);
          return anchor.toLowerCase() === targetAnchor.toLowerCase() || c.type.toLowerCase() === targetAnchor.toLowerCase();
        });
        if (compMatch) {
          targetEl = document.getElementById(getSectionAnchorId(compMatch));
        }
      }

      if (targetEl) {
        e.preventDefault();
        const scrollContainer = document.getElementById("canvas-scroll-viewport");
        if (scrollContainer) {
          const containerTop = scrollContainer.getBoundingClientRect().top;
          const targetTop = targetEl.getBoundingClientRect().top;
          const relativeTop = targetTop - containerTop + scrollContainer.scrollTop - 20;
          scrollContainer.scrollTo({ top: relativeTop, behavior: "smooth" });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        const matchedComp = allComponents.find(c => document.getElementById(getSectionAnchorId(c)) === targetEl);
        if (matchedComp) {
          setActiveSectionId(getSectionAnchorId(matchedComp));
        }
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    };

    const isLinkActive = (link: { label: string; href?: string }) => {
      if (!activeSectionId) return false;
      const cleanHref = (link.href || "").replace(/^#/, "").trim().toLowerCase();
      const cleanLabel = link.label.trim().toLowerCase();
      const activeLower = activeSectionId.toLowerCase();
      
      if (cleanHref && (cleanHref === activeLower || activeLower.includes(cleanHref))) return true;
      if (cleanLabel && (activeLower.includes(cleanLabel) || cleanLabel.includes(activeLower))) return true;
      return false;
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
            const activeColor = primary || "#8b5cf6";
            
            const isFirstNonBtnLink = !isBtn && (props.links || []).findIndex((l) => l.variant !== "button") === i;
            const isActive = isLinkActive(link) || (interactive && isFirstNonBtnLink && !activeSectionId);

            const showUnderline = props.showActiveUnderline === true || props.activeStyle === "underline";

            const linkClass = isMobileNav
              ? `w-full flex items-center justify-start gap-2.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer select-none text-left ${
                  isActive
                    ? "font-bold shadow-xs border-l-4 pl-3"
                    : !isDarkNav
                    ? "hover:bg-foreground/5"
                    : "hover:bg-white/10"
                } ${!isBtn && !isActive ? "hover:text-[var(--nav-hover)]" : ""}`
              : `relative inline-flex items-center gap-1.5 transition-all cursor-pointer select-none ${!isBtn && !isActive ? "hover:text-[var(--nav-hover)]" : ""} ${
                  isBtn
                    ? "px-3.5 py-1.5 rounded-md font-semibold opacity-100 hover:brightness-110 shadow-sm hover:text-white"
                    : isActive
                    ? "font-extrabold opacity-100"
                    : link.variant === "bold"
                    ? "font-bold opacity-100"
                    : link.variant === "muted"
                    ? "opacity-75"
                    : "opacity-90"
                }`;
            
            const linkStyle: React.CSSProperties = isBtn ? {
              color: "#ffffff",
              backgroundColor: activeColor,
              borderRadius: btnRadius,
            } : isActive ? {
              color: activeColor,
              backgroundColor: isMobileNav ? `${activeColor}1a` : undefined,
              borderColor: isMobileNav ? activeColor : undefined,
            } : {};

            return (
              <div key={i} className={isMobileNav ? "w-full text-left relative" : "group/link relative inline-flex items-center"}>
                {!interactive ? (
                  <a
                    href={href}
                    onClick={(e) => handleSmoothScroll(e, href)}
                    className={linkClass}
                    style={linkStyle}
                  >
                    <RenderIcon icon={link.icon} className="h-4 w-4 shrink-0" />
                    <span>{link.label}</span>
                    {isActive && !isBtn && !isMobileNav && showUnderline && (
                      <span
                        className="absolute -bottom-2 left-0 right-0 h-[2.5px] rounded-full z-10 animate-in fade-in-50"
                        style={{ backgroundColor: activeColor }}
                      />
                    )}
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
                    {isActive && !isBtn && !isMobileNav && showUnderline && (
                      <span
                        className="absolute -bottom-2 left-0 right-0 h-[2.5px] rounded-full z-10 animate-in fade-in-50"
                        style={{ backgroundColor: activeColor }}
                      />
                    )}
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
            <div className="flex items-center gap-1">
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex h-5 items-center justify-center gap-1 px-2 rounded-full border border-dashed border-foreground/30 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground text-[10px] font-bold transition-all cursor-pointer ml-1"
                    title="Active Link Indicator Style"
                  >
                    Active Style
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48 rounded-xl">
                  <DropdownMenuItem
                    className="cursor-pointer font-medium"
                    onClick={() => onUpdateProps?.({ showActiveUnderline: false, activeStyle: "color" })}
                  >
                    Color Only (Default)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer font-medium"
                    onClick={() => onUpdateProps?.({ showActiveUnderline: true, activeStyle: "underline" })}
                  >
                    Color + Underline Bar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
          borderRadius: isMobileMenuOpen ? "0px 0px 12px 12px" : headerRadius,
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
        <Center maxWidth={effectiveMaxWidth} isMobile={isMobile}>
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
                className="p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center hover:bg-foreground/10 shrink-0"
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
    const isBgLayout = props.imageLayout === "background" || variant === "fullbleed-image-hero" || variant === "split-bg-showcase-hero";
    const isSplit = variant === "split-showcase-hero" || variant === "split-bg-showcase-hero" || variant === "bento-grid-hero" || variant === "three-images-hero" || variant === "split-image" || (variant === "bento-hero" && !isBgLayout);
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
    const isEditingHeroImage2 = activeHeroPopover === "image2";
    const setIsEditingHeroImage2 = (val: boolean) => setActiveHeroPopover(val ? "image2" : null);
    const isEditingHeroImage3 = activeHeroPopover === "image3";
    const setIsEditingHeroImage3 = (val: boolean) => setActiveHeroPopover(val ? "image3" : null);
    const isImageLeft = props.imagePosition === "left" || props.reverseLayout;

    return (
      <section
        {...aosAttrs}
        id={currentSectionId}
        style={{
          borderRadius: heroSectionRadius,
          backgroundColor: heroBg,
          backgroundImage: isBgLayout ? `url(${variant === "split-bg-showcase-hero" ? props.imageUrl2 : props.imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...css
        }}
        className={`relative py-16 md:py-24 transition-all ${
          isBgLayout || isDirectlyBelowNavbar ? "flex flex-col justify-center" : ""
        } ${isBgLayout ? "text-white" : ""} ${
          isFollowingNavbar
            ? "min-h-[90vh] lg:min-h-[100vh] !pt-[130px] md:!pt-[170px]"
            : isDirectlyBelowNavbar
              ? "min-h-[85vh] lg:min-h-[calc(100vh-80px)]"
              : isBgLayout
                ? "min-h-[60vh] lg:min-h-[75vh]"
                : ""
        }`}
      >
        {isBgLayout && (
          <div className="absolute inset-0 bg-black/60 z-0" style={{ borderRadius: heroSectionRadius }} />
        )}
        
        {interactive && isBgLayout && (
          <div className="absolute bottom-4 right-4 z-40">
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
              <div className="absolute bottom-12 right-0">
                <ImageEditItem
                  currentUrl={variant === "split-bg-showcase-hero" ? props.imageUrl2 : props.imageUrl}
                  currentUrl2={props.imageUrl2}
                  currentUrl3={props.imageUrl3}
                  currentAlt={props.imageAlt}
                  currentBorderRadius={props.imageBorderRadius}
                  currentObjectFit={props.imageObjectFit}
                  currentAspectRatio={props.imageAspectRatio}
                  currentImageLayout={props.imageLayout}
                  onSave={(editProps) => {
                    if (variant === "split-bg-showcase-hero") {
                      onUpdateProps?.({ 
                        imageUrl2: editProps.url,
                        imageAlt: editProps.alt, 
                        imageBorderRadius: editProps.imageBorderRadius,
                        imageObjectFit: editProps.objectFit as any,
                        imageAspectRatio: editProps.aspectRatio as any,
                        imageLayout: editProps.imageLayout as any
                      });
                    } else {
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
                    }
                    setIsEditingHeroImage(false);
                  }}
                  onClose={() => setIsEditingHeroImage(false)}
                />
              </div>
            )}
          </div>
        )}

        <Center maxWidth={effectiveMaxWidth} isMobile={isMobile} className="relative z-10">
          {variant === "interactive-search-hero" ? (
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {props.heading && (
                <h1
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerHTML;
                    if (newText && newText !== props.heading) {
                      onUpdateProps?.({ heading: newText });
                    }
                  }}
                  style={{ outline: "none", color: style.textColor || heroTextColor }}
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                 dangerouslySetInnerHTML={{ __html: props.heading }} />
              )}
              {props.subheading && (
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerHTML;
                    if (newText && newText !== props.subheading) {
                      onUpdateProps?.({ subheading: newText });
                    }
                  }}
                  style={{ outline: "none", color: heroSubtextColor }}
                  className={`text-sm sm:text-base md:text-lg ${isBgLayout ? "text-white/80" : "text-muted-foreground"} ${
                    interactive ? "cursor-text transition-all" : ""
                  }`}
                 dangerouslySetInnerHTML={{ __html: props.subheading }} />
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
                      const newText = e.currentTarget.innerHTML.replace(/^#/, "");
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
                      const newText = e.currentTarget.innerHTML;
                      if (newText && newText !== props.heading) {
                        onUpdateProps?.({ heading: newText });
                      }
                    }}
                    style={{ outline: "none", color: style.textColor || heroTextColor }}
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                   dangerouslySetInnerHTML={{ __html: props.heading }} />
                )}
                {props.subheading && (
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.innerHTML;
                      if (newText && newText !== props.subheading) {
                        onUpdateProps?.({ subheading: newText });
                      }
                    }}
                    style={{ outline: "none", color: heroSubtextColor }}
                    className={`text-sm sm:text-base md:text-lg ${isBgLayout ? "text-white/80" : "text-muted-foreground"} ${
                      interactive ? "cursor-text transition-all" : ""
                    }`}
                   dangerouslySetInnerHTML={{ __html: props.subheading }} />
                )}

                {(variant === "split-showcase-hero" || variant === "split-bg-showcase-hero") && (
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
                            const newText = e.currentTarget.innerHTML;
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
                         dangerouslySetInnerHTML={{ __html: benefit }} />
                      </div>
                    ))}
                  </div>
                )}

                <ButtonsBlock />
              </div>

              {variant === "three-images-hero" ? (
                <div className={`relative w-full h-[500px] z-30 flex items-center justify-center transition-all ${isImageLeft ? "md:order-1" : "md:order-2"}`}>
                  
                  {/* Image 1: Main Large (Left) */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[65%] h-[85%] rounded-3xl overflow-hidden shadow-2xl z-20 border-[6px] border-background hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src={props.imageUrl || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"}
                      alt="Hero Collage 1"
                      className="w-full h-full object-cover"
                    />
                    {interactive && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditingHeroImage(!isEditingHeroImage);
                        }}
                        className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border text-foreground text-xs font-bold shadow-lg hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 cursor-pointer z-40"
                      >
                        <ImageIcon className="h-3.5 w-3.5" /> Edit
                      </button>
                    )}
                    {isEditingHeroImage && (
                      <div className="absolute top-14 right-4 z-50">
                        <ImageEditItem
                          currentUrl={props.imageUrl}
                          onSave={(editProps) => {
                            onUpdateProps?.({ imageUrl: editProps.url });
                            setIsEditingHeroImage(false);
                          }}
                          onClose={() => setIsEditingHeroImage(false)}
                          hideLayoutOptions
                        />
                      </div>
                    )}
                  </div>

                  {/* Image 2: Top Right Small */}
                  <div className="absolute right-0 top-[5%] w-[45%] h-[45%] rounded-3xl overflow-hidden shadow-xl z-10 border-[6px] border-background hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src={props.imageUrl2 || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"}
                      alt="Hero Collage 2"
                      className="w-full h-full object-cover"
                    />
                    {interactive && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditingHeroImage2(!isEditingHeroImage2);
                        }}
                        className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border text-foreground text-xs font-bold shadow-lg hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 cursor-pointer z-40"
                      >
                        <ImageIcon className="h-3.5 w-3.5" /> Edit
                      </button>
                    )}
                    {isEditingHeroImage2 && (
                      <div className="absolute top-14 right-4 z-50">
                        <ImageEditItem
                          currentUrl={props.imageUrl2}
                          onSave={(editProps) => {
                            onUpdateProps?.({ imageUrl2: editProps.url });
                            setIsEditingHeroImage2(false);
                          }}
                          onClose={() => setIsEditingHeroImage2(false)}
                          hideLayoutOptions
                        />
                      </div>
                    )}
                  </div>

                  {/* Image 3: Bottom Right Small */}
                  <div className="absolute right-[5%] bottom-[5%] w-[50%] h-[42%] rounded-3xl overflow-hidden shadow-2xl z-30 border-[6px] border-background hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src={props.imageUrl3 || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"}
                      alt="Hero Collage 3"
                      className="w-full h-full object-cover"
                    />
                    {interactive && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditingHeroImage3(!isEditingHeroImage3);
                        }}
                        className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border text-foreground text-xs font-bold shadow-lg hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 cursor-pointer z-40"
                      >
                        <ImageIcon className="h-3.5 w-3.5" /> Edit
                      </button>
                    )}
                    {isEditingHeroImage3 && (
                      <div className="absolute top-14 right-4 z-50">
                        <ImageEditItem
                          currentUrl={props.imageUrl3}
                          onSave={(editProps) => {
                            onUpdateProps?.({ imageUrl3: editProps.url });
                            setIsEditingHeroImage3(false);
                          }}
                          onClose={() => setIsEditingHeroImage3(false)}
                          hideLayoutOptions
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : variant === "bento-grid-hero" ? (
                <div className={`grid grid-cols-2 gap-5 z-30 w-full h-full my-auto ${isImageLeft ? "md:order-1" : "md:order-2"}`}>
                  <div
                    className="col-span-2 p-7 min-h-[140px] bg-card border border-border/80 shadow-2xl flex items-center justify-between transition-all hover:border-primary/40 relative overflow-hidden"
                    style={{ borderRadius: btnRadius }}
                  >
                    {/* Decorative glow */}
                    <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl z-0 pointer-events-none" />
                    
                    <div className="z-10 relative">
                      <div
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateProps?.({ bentoCard1Title: e.currentTarget.innerHTML })}
                        className={`text-xs font-bold text-muted-foreground uppercase tracking-widest ${interactive ? "cursor-text outline-none" : ""}`}
                       dangerouslySetInnerHTML={{ __html: props.bentoCard1Title || "Live Performance" }} />
                      <div
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateProps?.({ bentoCard1Value: e.currentTarget.innerHTML })}
                        className={`text-3xl font-extrabold text-foreground mt-1 tracking-tight ${interactive ? "cursor-text outline-none" : ""}`}
                      >
                        {props.bentoCard1Value || "+142% Growth"}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end z-10 relative">
                      <div
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateProps?.({ bentoCard1Badge: e.currentTarget.innerHTML })}
                        className={`px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs shadow-xs ${interactive ? "cursor-text outline-none" : ""}`}
                      >
                        {props.bentoCard1Badge || "↑ Trending"}
                      </div>
                      <div className="mt-4 flex items-end gap-1.5 h-8 opacity-80 pointer-events-none">
                         <div className="w-1.5 h-3 bg-emerald-500/40 rounded-t-sm" />
                         <div className="w-1.5 h-5 bg-emerald-500/60 rounded-t-sm" />
                         <div className="w-1.5 h-4 bg-emerald-500/50 rounded-t-sm" />
                         <div className="w-1.5 h-7 bg-emerald-500/80 rounded-t-sm" />
                         <div className="w-1.5 h-5 bg-emerald-500/60 rounded-t-sm" />
                         <div className="w-1.5 h-9 bg-emerald-500 rounded-t-sm" />
                      </div>
                    </div>
                  </div>
                  
                  <div
                    className="col-span-1 p-6 min-h-[160px] bg-card border border-border/80 shadow-2xl flex flex-col justify-between transition-all hover:border-primary/40 relative overflow-hidden group"
                    style={{ borderRadius: btnRadius }}
                  >
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl z-0 pointer-events-none" />
                    
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary z-10 transition-transform group-hover:scale-110 group-hover:bg-primary/20">
                      <Shield className="h-5 w-5" />
                    </div>
                    
                    <div className="z-10 relative mt-4">
                      <div
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateProps?.({ bentoCard2Value: e.currentTarget.innerHTML })}
                        className={`text-3xl font-extrabold text-primary tracking-tight ${interactive ? "cursor-text outline-none" : ""}`}
                      >
                        {props.bentoCard2Value || "99.99%"}
                      </div>
                      <div
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateProps?.({ bentoCard2Label: e.currentTarget.innerHTML })}
                        className={`text-sm text-muted-foreground font-semibold mt-1 ${interactive ? "cursor-text outline-none" : ""}`}
                       dangerouslySetInnerHTML={{ __html: props.bentoCard2Label || "Uptime SLA" }} />
                    </div>
                  </div>
                  
                  <div
                    className="col-span-1 p-6 min-h-[160px] bg-card border border-border/80 shadow-2xl flex flex-col justify-between transition-all hover:border-primary/40 relative overflow-hidden group"
                    style={{ borderRadius: btnRadius }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground z-10 transition-transform group-hover:scale-110 group-hover:bg-foreground/10">
                      <User className="h-5 w-5" />
                    </div>
                    
                    <div className="z-10 relative mt-4">
                      <div
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateProps?.({ bentoCard3Value: e.currentTarget.innerHTML })}
                        className={`text-3xl font-extrabold text-foreground tracking-tight ${interactive ? "cursor-text outline-none" : ""}`}
                      >
                        {props.bentoCard3Value || "50k+"}
                      </div>
                      <div
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateProps?.({ bentoCard3Label: e.currentTarget.innerHTML })}
                        className={`text-sm text-muted-foreground font-semibold mt-1 ${interactive ? "cursor-text outline-none" : ""}`}
                       dangerouslySetInnerHTML={{ __html: props.bentoCard3Label || "Creators" }} />
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
                      
                      {props.imageLayout === "bento" && (
                        <>
                          <div
                            className="col-span-1 overflow-hidden border border-border/80 transition-all h-[200px]"
                            style={{
                              borderRadius: props.imageBorderRadius || "16px",
                              boxShadow: shadow !== "none" ? shadow : undefined,
                            }}
                          >
                            <img
                              src={props.imageUrl2 || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"}
                              alt="Bento Image 2"
                              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"; }}
                              className={`w-full h-full ${
                                props.imageObjectFit === "contain" ? "object-contain" : props.imageObjectFit === "fill" ? "object-fill" : "object-cover"
                              }`}
                            />
                          </div>
                          <div
                            className="col-span-1 overflow-hidden border border-border/80 transition-all h-[200px]"
                            style={{
                              borderRadius: props.imageBorderRadius || "16px",
                              boxShadow: shadow !== "none" ? shadow : undefined,
                            }}
                          >
                            <img
                              src={props.imageUrl3 || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"}
                              alt="Bento Image 3"
                              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"; }}
                              className={`w-full h-full ${
                                props.imageObjectFit === "contain" ? "object-contain" : props.imageObjectFit === "fill" ? "object-fill" : "object-cover"
                              }`}
                            />
                          </div>
                        </>
                      )}
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
                    onBlur={(e) => onUpdateProps?.({ badgeText: e.currentTarget.innerHTML })}
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
                    const newText = e.currentTarget.innerHTML;
                    if (newText && newText !== props.heading) {
                      onUpdateProps?.({ heading: newText });
                    }
                  }}
                  style={{ outline: "none", color: style.textColor || heroTextColor }}
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                 dangerouslySetInnerHTML={{ __html: props.heading }} />
              )}
              {props.subheading && (
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerHTML;
                    if (newText && newText !== props.subheading) {
                      onUpdateProps?.({ subheading: newText });
                    }
                  }}
                  style={{ outline: "none", color: heroSubtextColor }}
                  className={`text-sm sm:text-base md:text-lg ${isBgLayout ? "text-white/80" : "text-muted-foreground"} ${
                    interactive ? "cursor-text transition-all" : ""
                  }`}
                 dangerouslySetInnerHTML={{ __html: props.subheading }} />
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
                      onBlur={(e) => onUpdateProps?.({ stat1Value: e.currentTarget.innerHTML })}
                      className={`text-2xl md:text-3xl font-extrabold text-white ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.stat1Value || "50,000+"}
                    </div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ stat1Label: e.currentTarget.innerHTML })}
                      className={`text-xs text-white/80 font-medium ${interactive ? "cursor-text outline-none" : ""}`}
                     dangerouslySetInnerHTML={{ __html: props.stat1Label || "Active Creators" }} />
                  </div>
                  <div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ stat2Value: e.currentTarget.innerHTML })}
                      className={`text-2xl md:text-3xl font-extrabold text-white ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.stat2Value || "4.9 / 5.0"}
                    </div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ stat2Label: e.currentTarget.innerHTML })}
                      className={`text-xs text-white/80 font-medium ${interactive ? "cursor-text outline-none" : ""}`}
                     dangerouslySetInnerHTML={{ __html: props.stat2Label || "Customer Rating" }} />
                  </div>
                  <div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ stat3Value: e.currentTarget.innerHTML })}
                      className={`text-2xl md:text-3xl font-extrabold text-white ${interactive ? "cursor-text outline-none" : ""}`}
                    >
                      {props.stat3Value || "99.99%"}
                    </div>
                    <div
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdateProps?.({ stat3Label: e.currentTarget.innerHTML })}
                      className={`text-xs text-white/80 font-medium ${interactive ? "cursor-text outline-none" : ""}`}
                     dangerouslySetInnerHTML={{ __html: props.stat3Label || "Platform Uptime" }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </Center>
      </section>
    );
  }

  if (type === "stats") {
    const [editingItemImageIdx, setEditingItemImageIdx] = useState<number | null>(null);
    const items = props.items || [];
    const layoutMode = props.layoutMode || "grid";
    const flexJustify = props.flexJustify || "center";
    const columnsCount = props.columns || 3;

    const justifyClass =
      flexJustify === "start"
        ? "justify-start"
        : flexJustify === "end"
        ? "justify-end"
        : flexJustify === "between"
        ? "justify-between"
        : "justify-center";

    const gridColsClass = isMobile
      ? "grid-cols-1"
      : isTablet
      ? "grid-cols-2"
      : columnsCount === 1
      ? "grid-cols-1"
      : columnsCount === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columnsCount === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

    const containerClass = layoutMode === "flex"
      ? `flex flex-wrap items-center ${justifyClass} gap-5 sm:gap-6 w-full`
      : `grid gap-5 sm:gap-6 ${gridColsClass} w-full`;

    return (
      <section
        {...aosAttrs}
        id={currentSectionId}
        style={{
          ...css,
          backgroundColor: style.backgroundColor || "transparent",
        }}
        className="w-full py-10 sm:py-24 transition-all"
      >
        <Center maxWidth={effectiveMaxWidth} isMobile={isMobile}>
          {(props.heading || props.subheading) && (
            <div className="text-center mb-10 space-y-3.5 max-w-3xl mx-auto">
              {props.heading && (
                <h2
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== props.heading) onUpdateProps?.({ heading: next });
                  }}
                  style={{ outline: "none", color: headingTextColor }}
                  className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                    interactive ? "cursor-text transition-all" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: props.heading }}
                />
              )}
              {props.subheading && (
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== props.subheading) onUpdateProps?.({ subheading: next });
                  }}
                  style={{ outline: "none", color: bodyTextColor }}
                  className={`text-base md:text-lg leading-relaxed ${
                    interactive ? "cursor-text transition-all" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: props.subheading }}
                />
              )}
            </div>
          )}

          {/* EMPTY CONTAINER DROPZONE WHEN NO ITEMS */}
          {items.length === 0 ? (
            <div className="w-full py-12 px-6 border-2 border-dashed border-border/80 hover:border-primary/60 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 bg-muted/20 backdrop-blur-xs transition-all">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-xs">
                <Plus className="h-7 w-7" />
              </div>
              <div className="space-y-1.5 max-w-lg">
                <h4 className="text-lg font-extrabold text-foreground tracking-tight">Custom Section Container</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This section is ready to build! Select a layout template below to instant-load Hero, Navbar, Features, Cards, Contact Form, CTA, or Footer, or add custom elements.
                </p>
              </div>

              {/* QUICK LAYOUT TEMPLATE PICKER BUTTONS */}
              <div className="w-full max-w-3xl pt-4 border-t border-border/40">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary block mb-3">
                  1-Click Load Section Layout Template:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    {
                      id: "hero-empty-template",
                      label: "Hero Layout",
                      icon: "✦",
                      props: {
                        variant: "hero-empty-template",
                        layoutMode: "hero",
                        heading: "Build Something People Love",
                        subheading: "Design beautiful responsive landing pages in minutes. Customize every block, style, and layout — then publish instantly.",
                        items: [
                          { type: "badge", badgeText: "✦ VISUAL WEBSITE BUILDER" },
                          { type: "button", buttonText: "Start Building Free" },
                          { type: "button", buttonText: "Watch 2-Min Tour" },
                          { type: "image", imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80", title: "Hero Visual" },
                        ],
                      },
                    },
                    {
                      id: "navbar-empty-template",
                      label: "Navbar Header",
                      icon: "☰",
                      props: {
                        variant: "navbar-empty-template",
                        layoutMode: "navbar",
                        logoText: "CraftSite",
                        items: [
                          { type: "text", description: "Home" },
                          { type: "text", description: "Features" },
                          { type: "text", description: "Pricing" },
                          { type: "text", description: "Contact" },
                          { type: "button", buttonText: "Get Started" },
                        ],
                      },
                    },
                    {
                      id: "features-empty-template",
                      label: "Features Grid",
                      icon: "▦",
                      props: {
                        variant: "features-empty-template",
                        layoutMode: "grid",
                        columns: 3,
                        heading: "Everything You Need",
                        subheading: "Complete suite of visual tools engineered for design & engineering teams.",
                        items: [
                          { type: "stack", icon: "🎯", badgeText: "CANVAS", title: "Drag & Drop Builder", description: "Assemble pages visually with real-time DOM preview." },
                          { type: "stack", icon: "🎨", badgeText: "THEMING", title: "Live Style System", description: "Tune colors, typography, borders, and shadows globally." },
                          { type: "stack", icon: "🚀", badgeText: "PUBLISH", title: "One-Click Deploy", description: "Ship production-ready landing pages to custom domains." },
                        ],
                      },
                    },
                    {
                      id: "cards-empty-template",
                      label: "Cards Grid",
                      icon: "▤",
                      props: {
                        variant: "cards-empty-template",
                        layoutMode: "grid",
                        columns: 3,
                        heading: "Featured Showcases",
                        subheading: "Explore curated templates designed for high conversion.",
                        items: [
                          { type: "card", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", badgeText: "SAAS", title: "Analytics SaaS", description: "Modern dashboard landing page layout.", buttonText: "View Demo" },
                          { type: "card", imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", badgeText: "AGENCY", title: "Creative Studio", description: "Minimalist portfolio showcase for agencies.", buttonText: "View Demo" },
                          { type: "card", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80", badgeText: "STORE", title: "E-Commerce Hub", description: "High-conversion storefront product showcase.", buttonText: "View Demo" },
                        ],
                      },
                    },
                    {
                      id: "contact-empty-template",
                      label: "Contact Form",
                      icon: "✎",
                      props: {
                        variant: "contact-empty-template",
                        layoutMode: "form",
                        heading: "Get in Touch With Us",
                        subheading: "Have questions or want to build together? Send us a message.",
                        items: [
                          { type: "stack", title: "Email Support", description: "hello@craftsite.io\nResponse within 24 hours" },
                          { type: "stack", title: "Office Location", description: "100 Montgomery St, Suite 1400\nSan Francisco, CA" },
                          { type: "form", buttonText: "Send Message", title: "Contact Form" },
                        ],
                      },
                    },
                    {
                      id: "cta-empty-template",
                      label: "CTA Banner",
                      icon: "➤",
                      props: {
                        variant: "cta-empty-template",
                        layoutMode: "cta",
                        flexJustify: "center",
                        heading: "Ready to launch your site?",
                        subheading: "Start creating with our free plan. No credit card required.",
                        items: [
                          { type: "button", buttonText: "Get Started Free" },
                          { type: "button", buttonText: "Contact Sales" },
                        ],
                      },
                    },
                    {
                      id: "footer-empty-template",
                      label: "Footer Layout",
                      icon: "⬇",
                      props: {
                        variant: "footer-empty-template",
                        layoutMode: "footer",
                        logoText: "CraftSite Inc.",
                        subheading: "© 2026 CraftSite Inc. All rights reserved.",
                        items: [
                          { type: "stack", title: "Product", description: "Features, Roadmap, Pricing, Release Notes" },
                          { type: "stack", title: "Resources", description: "Documentation, Tutorials, Community, Support" },
                          { type: "stack", title: "Company", description: "About Us, Careers, Press, Privacy Policy" },
                        ],
                      },
                    },
                    {
                      id: "blank-canvas-container",
                      label: "Blank Grid",
                      icon: "▢",
                      props: {
                        variant: "blank-canvas-container",
                        layoutMode: "grid",
                        columns: 3,
                        heading: "",
                        subheading: "",
                        items: [
                          { type: "card", title: "Custom Box 1", description: "Editable text block." },
                          { type: "card", title: "Custom Box 2", description: "Editable text block." },
                          { type: "card", title: "Custom Box 3", description: "Editable text block." },
                        ],
                      },
                    },
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateProps?.(tpl.props as any);
                      }}
                      className="px-3.5 py-2 rounded-xl border border-border/80 bg-background hover:bg-primary hover:text-white hover:border-primary text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer group"
                    >
                      <span className="text-primary group-hover:text-white transition-colors">{tpl.icon}</span>
                      <span>{tpl.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={containerClass}>
              {items.map((item: any, i: number) => {
                const effectiveRadius = theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "20px" : (theme.borderRadius || "16px");
                const itemType = item.type || "card";

                // STANDALONE HEADING ELEMENT
                if (itemType === "heading") {
                  return (
                    <div key={i} className="group relative p-2.5 rounded-xl transition-all hover:bg-muted/40">
                      {interactive && selected && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateProps?.({ items: items.filter((_: any, idx: number) => idx !== i) });
                          }}
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-destructive text-white text-xs z-30 shadow-md cursor-pointer"
                          title="Delete Heading"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                      <h3
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const nextItems = [...items];
                          nextItems[i] = { ...nextItems[i], title: e.currentTarget.innerHTML };
                          onUpdateProps?.({ items: nextItems });
                        }}
                        style={{ outline: "none", color: headingTextColor }}
                        className={`text-2xl sm:text-3xl font-black tracking-tight ${interactive ? "cursor-text" : ""}`}
                        dangerouslySetInnerHTML={{ __html: item.title || "Custom Heading Title" }}
                      />
                    </div>
                  );
                }

                // STANDALONE TEXT PARAGRAPH ELEMENT
                if (itemType === "text") {
                  return (
                    <div key={i} className="group relative p-2.5 rounded-xl transition-all hover:bg-muted/40">
                      {interactive && selected && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateProps?.({ items: items.filter((_: any, idx: number) => idx !== i) });
                          }}
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-destructive text-white text-xs z-30 shadow-md cursor-pointer"
                          title="Delete Text"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                      <p
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const nextItems = [...items];
                          nextItems[i] = { ...nextItems[i], description: e.currentTarget.innerHTML };
                          onUpdateProps?.({ items: nextItems });
                        }}
                        style={{ outline: "none", color: bodyTextColor }}
                        className={`text-sm sm:text-base leading-relaxed ${interactive ? "cursor-text" : ""}`}
                        dangerouslySetInnerHTML={{ __html: item.description || "Paragraph text copy block." }}
                      />
                    </div>
                  );
                }

                // STANDALONE BUTTON ELEMENT
                if (itemType === "button") {
                  const btnBg = primary;
                  const btnTextColor = isDarkColor(btnBg) === false ? "#000000" : "#ffffff";
                  const btnRadiusStyle = style.borderRadius || theme.borderRadius || "12px";

                  return (
                    <div key={i} className="group relative inline-block p-1">
                      {interactive && selected && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateProps?.({ items: items.filter((_: any, idx: number) => idx !== i) });
                          }}
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-destructive text-white text-xs z-30 shadow-md cursor-pointer"
                          title="Delete Button"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                      <button
                        type="button"
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const nextItems = [...items];
                          nextItems[i] = { ...nextItems[i], buttonText: e.currentTarget.innerHTML };
                          onUpdateProps?.({ items: nextItems });
                        }}
                        style={{
                          outline: "none",
                          backgroundColor: btnBg,
                          color: btnTextColor,
                          borderRadius: btnRadiusStyle,
                          fontFamily: style.fontFamily || theme.fontFamily || "inherit",
                        }}
                        className={`px-6 py-3 text-sm font-bold shadow-lg transition-all hover:opacity-90 active:scale-95 ${
                          interactive ? "cursor-text" : ""
                        }`}
                        dangerouslySetInnerHTML={{ __html: item.buttonText || item.title || "Call to Action" }}
                      />
                    </div>
                  );
                }

                // STANDALONE BADGE ELEMENT
                if (itemType === "badge") {
                  return (
                    <div key={i} className="group relative inline-block p-1">
                      {interactive && selected && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateProps?.({ items: items.filter((_: any, idx: number) => idx !== i) });
                          }}
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-destructive text-white text-xs z-30 shadow-md cursor-pointer"
                          title="Delete Badge"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                      <span
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const nextItems = [...items];
                          nextItems[i] = { ...nextItems[i], badgeText: e.currentTarget.innerHTML };
                          onUpdateProps?.({ items: nextItems });
                        }}
                        style={{
                          outline: "none",
                          backgroundColor: `${primary}18`,
                          color: primary,
                          borderColor: `${primary}35`,
                          borderRadius: theme.borderRadius === "0px" ? "0px" : "9999px",
                          fontFamily: style.fontFamily || theme.fontFamily || "inherit",
                        }}
                        className={`px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full border shadow-2xs ${
                          interactive ? "cursor-text" : ""
                        }`}
                        dangerouslySetInnerHTML={{ __html: item.badgeText || item.title || "BADGE" }}
                      />
                    </div>
                  );
                }

                // STANDALONE IMAGE ELEMENT
                if (itemType === "image") {
                  const imgUrl = item.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80";
                  const imgRadius = style.borderRadius || theme.borderRadius || "16px";

                  return (
                    <div key={i} className="group relative p-2 rounded-2xl transition-all">
                      {interactive && selected && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateProps?.({ items: items.filter((_: any, idx: number) => idx !== i) });
                          }}
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-destructive text-white text-xs z-40 shadow-md cursor-pointer"
                          title="Delete Image"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <div className="relative overflow-hidden shadow-md" style={{ borderRadius: imgRadius }}>
                        <img src={imgUrl} alt={item.title || "Custom Image"} className="w-full h-auto object-cover max-h-80 group-hover:scale-105 transition-transform duration-500" style={{ borderRadius: imgRadius }} />
                        {interactive && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingItemImageIdx(editingItemImageIdx === i ? null : i);
                            }}
                            className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border text-foreground text-xs font-bold shadow-lg hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 cursor-pointer z-30"
                          >
                            <ImageIcon className="h-3.5 w-3.5" /> Edit Image
                          </button>
                        )}
                        {editingItemImageIdx === i && (
                          <ImageEditItem
                            currentUrl={imgUrl}
                            hideLayoutOptions={true}
                            onSave={(editProps) => {
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], imageUrl: editProps.url };
                              onUpdateProps?.({ items: nextItems });
                              setEditingItemImageIdx(null);
                            }}
                            onClose={() => setEditingItemImageIdx(null)}
                          />
                        )}
                      </div>
                    </div>
                  );
                }

                // VERTICAL STACK COLUMN BLOCK (UNBOXED, CLEAN & COMPLETELY OPTIONAL INTERNAL COMPONENTS)
                if (itemType === "stack") {
                  const imgUrl = item.imageUrl;
                  const stackBtnBg = primary;
                  const stackBtnTextColor = isDarkColor(stackBtnBg) === false ? "#000000" : "#ffffff";
                  const stackBtnRadius = style.borderRadius || theme.borderRadius || "12px";

                  return (
                    <div key={i} className="group relative flex flex-col justify-between space-y-4 p-2 rounded-2xl transition-all">
                      {interactive && selected && (
                        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-30">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateProps?.({ items: items.filter((_: any, idx: number) => idx !== i) });
                            }}
                            className="p-1.5 rounded-full bg-destructive text-white text-xs shadow-md cursor-pointer hover:scale-105 transition-transform"
                            title="Delete Stack Column"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}

                      {/* OPTIONAL STACK IMAGE */}
                      {imgUrl && (
                        <div className="relative w-full overflow-hidden shadow-sm" style={{ borderRadius: stackBtnRadius }}>
                          <img src={imgUrl} alt={item.title || "Stack Image"} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" style={{ borderRadius: stackBtnRadius }} />
                          {interactive && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingItemImageIdx(editingItemImageIdx === i ? null : i);
                              }}
                              className="absolute top-2 right-2 px-2.5 py-1 rounded-xl bg-background/90 backdrop-blur-md border border-border text-foreground text-xs font-bold shadow-md hover:bg-primary hover:text-white transition-all flex items-center gap-1 cursor-pointer z-30"
                            >
                              <ImageIcon className="h-3.5 w-3.5" /> Edit Image
                            </button>
                          )}
                          {editingItemImageIdx === i && (
                            <ImageEditItem
                              currentUrl={imgUrl}
                              hideLayoutOptions={true}
                              onSave={(editProps) => {
                                const nextItems = [...items];
                                nextItems[i] = { ...nextItems[i], imageUrl: editProps.url };
                                onUpdateProps?.({ items: nextItems });
                                setEditingItemImageIdx(null);
                              }}
                              onClose={() => setEditingItemImageIdx(null)}
                            />
                          )}
                        </div>
                      )}

                      {/* OPTIONAL BADGE */}
                      {item.badgeText && (
                        <div>
                          <span
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], badgeText: e.currentTarget.innerHTML };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{
                              outline: "none",
                              backgroundColor: `${primary}18`,
                              color: primary,
                              borderColor: `${primary}35`,
                              borderRadius: theme.borderRadius === "0px" ? "0px" : "9999px",
                              fontFamily: style.fontFamily || theme.fontFamily || "inherit",
                            }}
                            className={`inline-block px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full border ${
                              interactive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.badgeText }}
                          />
                        </div>
                      )}

                      {/* OPTIONAL TITLE (TOP) */}
                      {item.title && (
                        <h3
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], title: e.currentTarget.innerHTML };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none", color: style.textColor || headingTextColor, fontFamily: style.fontFamily || theme.fontFamily || "inherit" }}
                          className={`text-xl sm:text-2xl font-bold tracking-tight ${interactive ? "cursor-text" : ""}`}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                      )}

                      {/* OPTIONAL SUBTITLE / DESCRIPTION */}
                      {item.description && (
                        <p
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], description: e.currentTarget.innerHTML };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none", color: style.textColor || bodyTextColor, fontFamily: style.fontFamily || theme.fontFamily || "inherit" }}
                          className={`text-sm sm:text-base leading-relaxed ${interactive ? "cursor-text" : ""}`}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}

                      {/* OPTIONAL BUTTON (BOTTOM) */}
                      {item.buttonText && (
                        <div className="pt-2">
                          <button
                            type="button"
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], buttonText: e.currentTarget.innerHTML };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{
                              outline: "none",
                              backgroundColor: stackBtnBg,
                              color: stackBtnTextColor,
                              borderRadius: stackBtnRadius,
                              fontFamily: style.fontFamily || theme.fontFamily || "inherit",
                            }}
                            className={`px-5 py-2.5 text-sm font-bold shadow-md transition-all hover:opacity-90 active:scale-95 ${
                              interactive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.buttonText }}
                          />
                        </div>
                      )}

                      {/* INLINE STACK TOOLBAR TO ADD OPTIONAL COMPONENTS INTO THIS SPECIFIC STACK */}
                      {interactive && selected && (
                        <div className="pt-1 opacity-0 group-hover:opacity-100 transition-opacity flex flex-wrap items-center gap-1.5 text-[10px]">
                          {!item.title && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const nextItems = [...items];
                                nextItems[i] = { ...nextItems[i], title: "Title Heading" };
                                onUpdateProps?.({ items: nextItems });
                              }}
                              className="px-2 py-0.5 rounded-md bg-muted/80 hover:bg-primary hover:text-white transition-all cursor-pointer font-semibold"
                            >
                              + Title
                            </button>
                          )}
                          {!item.description && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const nextItems = [...items];
                                nextItems[i] = { ...nextItems[i], description: "Subtitle description text block." };
                                onUpdateProps?.({ items: nextItems });
                              }}
                              className="px-2 py-0.5 rounded-md bg-muted/80 hover:bg-primary hover:text-white transition-all cursor-pointer font-semibold"
                            >
                              + Subtitle
                            </button>
                          )}
                          {!item.buttonText && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const nextItems = [...items];
                                nextItems[i] = { ...nextItems[i], buttonText: "Click Here" };
                                onUpdateProps?.({ items: nextItems });
                              }}
                              className="px-2 py-0.5 rounded-md bg-muted/80 hover:bg-primary hover:text-white transition-all cursor-pointer font-semibold"
                            >
                              + Button
                            </button>
                          )}
                          {!item.imageUrl && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const nextItems = [...items];
                                nextItems[i] = { ...nextItems[i], imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" };
                                onUpdateProps?.({ items: nextItems });
                              }}
                              className="px-2 py-0.5 rounded-md bg-muted/80 hover:bg-primary hover:text-white transition-all cursor-pointer font-semibold"
                            >
                              + Image
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                // CARD CONTAINER ELEMENT
                return (
                  <div
                    key={i}
                    className={`group relative flex flex-col justify-between p-6 border transition-all duration-300 ${
                      layoutMode === "flex" ? "min-w-[260px] max-w-sm flex-1" : ""
                    } ${
                      isDarkSection
                        ? "bg-card/90 border-border/80 hover:border-primary/50 shadow-xl"
                        : "bg-card/90 border-border/60 hover:border-primary/40 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                    }`}
                    style={{
                      borderRadius: effectiveRadius,
                      fontFamily: theme.fontFamily || "inherit",
                      borderColor: isDarkSection ? `${primary}30` : `${primary}20`,
                    }}
                  >
                    {interactive && selected && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-30 bg-background/90 backdrop-blur-md p-1 rounded-xl border border-border shadow-md">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const nextItems = items.filter((_: any, idx: number) => idx !== i);
                            onUpdateProps?.({ items: nextItems });
                          }}
                          className="p-1 rounded-lg hover:bg-destructive/10 text-destructive text-xs cursor-pointer"
                          title="Delete Element"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}

                    <div className="space-y-3">
                      {item.badgeText && (
                        <span
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], badgeText: e.currentTarget.innerHTML };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            backgroundColor: `${primary}15`,
                            color: primary,
                            borderColor: `${primary}30`,
                          }}
                          className={`inline-block px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full border ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.badgeText }}
                        />
                      )}

                      {item.title && (
                        <h3
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], title: e.currentTarget.innerHTML };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none", color: headingTextColor }}
                          className={`text-lg sm:text-xl font-bold tracking-tight ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                      )}

                      {item.description && (
                        <p
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], description: e.currentTarget.innerHTML };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none", color: bodyTextColor }}
                          className={`text-xs sm:text-sm leading-relaxed ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}
                    </div>

                    {(item.buttonText || itemType === "button") && (
                      <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
                        <button
                          type="button"
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], buttonText: e.currentTarget.innerHTML };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            backgroundColor: primary,
                            color: "#ffffff",
                            borderRadius: theme.borderRadius || "10px",
                          }}
                          className={`px-4 py-2 text-xs font-bold shadow-md transition-all hover:opacity-90 ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.buttonText || "Learn More" }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ADD CUSTOM ELEMENT TOOLBAR IN INTERACTIVE MODE */}
          {interactive && selected && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-2 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl z-20">
              <span className="text-[11px] font-extrabold uppercase text-muted-foreground px-2">
                Add Component Element:
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const newItem = { type: "stack", title: `Stack Title ${items.length + 1}`, description: "Subtitle description text for this column stack.", buttonText: "Get Started" };
                  onUpdateProps?.({ items: [...items, newItem] });
                }}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                title="Add Column Stack Block (Title -> Subtitle -> Button)"
              >
                + Stack Block
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const newItem = { type: "heading", title: `Heading Title ${items.length + 1}` };
                  onUpdateProps?.({ items: [...items, newItem] });
                }}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1 cursor-pointer"
              >
                + Heading
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const newItem = { type: "text", description: "Paragraph copy text description." };
                  onUpdateProps?.({ items: [...items, newItem] });
                }}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1 cursor-pointer"
              >
                + Text
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const newItem = { type: "button", buttonText: "Click Here" };
                  onUpdateProps?.({ items: [...items, newItem] });
                }}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1 cursor-pointer"
              >
                + Button
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const newItem = { type: "image", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", title: "Showcase Photo" };
                  onUpdateProps?.({ items: [...items, newItem] });
                }}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1 cursor-pointer"
              >
                + Image
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const newItem = { type: "card", badgeText: "NEW", title: `Custom Card ${items.length + 1}`, description: "Visual component card item.", buttonText: "View Details" };
                  onUpdateProps?.({ items: [...items, newItem] });
                }}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1 cursor-pointer"
              >
                + Card
              </button>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateProps?.({ items: [] });
                  }}
                  className="px-2.5 py-1.5 text-xs font-bold rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all flex items-center gap-1 cursor-pointer ml-2"
                  title="Clear All Elements"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Clear All
                </button>
              )}
            </div>
          )}
        </Center>
      </section>
    );
  }

  if (type === "features" || type === "card-grid") {
    const variant = props.variant || (type === "card-grid" ? "bento-card-stack" : "bento-grid-features");
    const [editingItemImageIdx, setEditingItemImageIdx] = useState<number | null>(null);
    const [isEditingShowcaseImage, setIsEditingShowcaseImage] = useState(false);
    const [activeCardIdx, setActiveCardIdx] = useState(2);
    const items = (props.items || [
      {
        stepNumber: "Feature 01",
        badgeText: "COMPONENT LIBRARY",
        icon: "layers",
        title: "15+ Visual Drag & Drop Blocks",
        description: "Compose Navbars, Hero sections, Features, CTAs, and Footers with instant drag & drop feedback.",
        buttonText: "Explore Feature →",
      },
      {
        stepNumber: "Feature 02",
        badgeText: "DESIGN SYSTEM",
        icon: "palette",
        title: "Live OKLCH Theme Editor",
        description: "Customize fonts, background color, margins, padding, and corner radius with instant live feedback.",
        buttonText: "Explore Feature →",
      },
      {
        stepNumber: "Feature 03",
        badgeText: "CLOUD INFRASTRUCTURE",
        icon: "rocket",
        title: "Instant 1-Click Cloud Deploy",
        description: "Publish your web pages with custom slugs in one click. Every project state is safely persisted in PostgreSQL.",
        buttonText: "Explore Feature →",
      },
      {
        stepNumber: "Feature 04",
        badgeText: "RESPONSIVE VIEWPORTS",
        icon: "monitor",
        title: "Multi-Device Viewport Preview",
        description: "Test seamlessly across Desktop, Tablet, and Mobile devices with high-fidelity device frames.",
        buttonText: "Explore Feature →",
      },
      {
        stepNumber: "Feature 05",
        badgeText: "STACK POWER",
        icon: "database",
        title: "Drizzle ORM & Supabase DB",
        description: "Robust database schemas and automated SQL queries generated as you design your visual pages.",
        buttonText: "Explore Feature →",
      },
    ]).slice(0, variant === "3d-carousel-deck-cards" ? 8 : 4);

    const [isCarouselHovered, setIsCarouselHovered] = useState(false);

    useEffect(() => {
      if (variant !== "3d-carousel-deck-cards" || isCarouselHovered || items.length <= 1) return;
      const timer = setInterval(() => {
        setActiveCardIdx((prev) => (prev + 1) % items.length);
      }, 4000);
      return () => clearInterval(timer);
    }, [variant, isCarouselHovered, items.length]);

    return (
      <section
        {...aosAttrs}
        id={currentSectionId}
        style={{
          ...css,
          backgroundColor: style.backgroundColor || "transparent",
        }}
        className="w-full py-10 sm:py-24 transition-all"
      >
        <Center maxWidth={effectiveMaxWidth} isMobile={isMobile}>
          {(props.heading || props.subheading) && (
            <div className="text-center mb-14 space-y-3.5 max-w-3xl mx-auto">
              {props.heading && (
                <h2
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== props.heading) onUpdateProps?.({ heading: next });
                  }}
                  style={{ outline: "none", color: headingTextColor }}
                  className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                    interactive ? "cursor-text transition-all" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: props.heading }}
                />
              )}
              {props.subheading && (
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== props.subheading) onUpdateProps?.({ subheading: next });
                  }}
                  style={{ outline: "none", color: bodyTextColor }}
                  className={`text-base md:text-lg leading-relaxed ${
                    interactive ? "cursor-text transition-all" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: props.subheading }}
                />
              )}
            </div>
          )}

          {variant === "3d-carousel-deck-cards" ? (
            <div
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
              className="relative w-full max-w-5xl mx-auto py-2 sm:py-4 select-none"
            >
              {/* Desktop Floating Left Navigation Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCardIdx((prev) => (prev - 1 + items.length) % items.length);
                }}
                className="hidden sm:flex absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-50 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-border/80 bg-card hover:bg-background text-foreground shadow-2xl backdrop-blur-md items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                style={{
                  boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                }}
                title="Previous Feature Card"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Desktop Floating Right Navigation Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCardIdx((prev) => (prev + 1) % items.length);
                }}
                className="hidden sm:flex absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-50 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-border/80 bg-card hover:bg-background text-foreground shadow-2xl backdrop-blur-md items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                style={{
                  boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                }}
                title="Next Feature Card"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* 3D Stack Deck Carousel Container */}
              <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center overflow-visible">
                {items.map((item: any, i: number) => {
                  const total = items.length;
                  let diff = i - (activeCardIdx % total);
                  if (diff > total / 2) diff -= total;
                  if (diff < -total / 2) diff += total;

                  const isActive = diff === 0;
                  const isLeft = diff === -1;
                  const isRight = diff === 1;
                  const isFarLeft = diff === -2 || diff < -1;
                  const isFarRight = diff === 2 || diff > 1;

                  let positionClasses = "";
                  if (isActive) {
                    positionClasses = "z-30 scale-100 opacity-100 translate-x-0 border-2 cursor-default";
                  } else if (isLeft) {
                    positionClasses = "z-20 scale-90 opacity-40 -translate-x-[40%] sm:-translate-x-[60%] blur-[0.4px] hover:opacity-85 cursor-pointer border border-border/60";
                  } else if (isRight) {
                    positionClasses = "z-20 scale-90 opacity-40 translate-x-[40%] sm:translate-x-[60%] blur-[0.4px] hover:opacity-85 cursor-pointer border border-border/60";
                  } else if (isFarLeft) {
                    positionClasses = "z-10 scale-75 opacity-20 -translate-x-[80%] sm:-translate-x-[110%] pointer-events-none hidden sm:flex border border-border/40";
                  } else {
                    positionClasses = "z-10 scale-75 opacity-20 translate-x-[80%] sm:translate-x-[110%] pointer-events-none hidden sm:flex border border-border/40";
                  }

                  const itemIcon = item.icon || "rocket";

                  return (
                    <div
                      key={i}
                      onClick={(e) => {
                        if (!isActive) {
                          e.stopPropagation();
                          setActiveCardIdx(i);
                        }
                      }}
                      className={`absolute w-[280px] sm:w-[380px] md:w-[420px] h-[300px] sm:h-[340px] p-5 sm:p-7 rounded-3xl bg-card transition-all duration-500 ease-out flex flex-col justify-between ${positionClasses}`}
                      style={{
                        borderRadius: theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "28px" : (theme.borderRadius || "28px"),
                        borderColor: isActive ? primary : undefined,
                        boxShadow: isActive ? `0 25px 60px -12px ${primary}40` : undefined,
                      }}
                    >
                      {/* Top Row: Pill Badge + Icon Badge */}
                      <div className="flex items-center justify-between">
                        {item.badgeText && (
                          <span
                            contentEditable={interactive && isActive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], badgeText: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{
                              outline: "none",
                              backgroundColor: `${primary}18`,
                              color: primary,
                              borderColor: `${primary}35`,
                            }}
                            className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full border shadow-2xs ${
                              interactive && isActive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.badgeText }}
                          />
                        )}

                        <div
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shadow-xs shrink-0"
                          style={{
                            backgroundColor: `${primary}15`,
                            color: primary,
                          }}
                        >
                          <RenderIcon icon={itemIcon} className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                      </div>

                      {/* Content Middle */}
                      <div className="space-y-2 my-auto">
                        {item.title && (
                          <h3
                            contentEditable={interactive && isActive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], title: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{ outline: "none", color: headingTextColor }}
                            className={`text-lg sm:text-2xl font-black tracking-tight ${
                              interactive && isActive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.title }}
                          />
                        )}
                        {item.description && (
                          <p
                            contentEditable={interactive && isActive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], description: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{ outline: "none", color: bodyTextColor }}
                            className={`text-xs sm:text-sm leading-relaxed ${
                              interactive && isActive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.description }}
                          />
                        )}
                      </div>

                      {/* Footer Row: Feature Number + Action Link */}
                      <div
                        className="pt-3 border-t flex items-center justify-between text-xs font-bold"
                        style={{ borderColor: isDarkSection ? `${primary}20` : "rgba(0,0,0,0.08)" }}
                      >
                        <span
                          contentEditable={interactive && isActive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], stepNumber: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none" }}
                          className={`text-muted-foreground font-semibold ${interactive && isActive ? "cursor-text" : ""}`}
                          dangerouslySetInnerHTML={{ __html: item.stepNumber || `Feature 0${i + 1}` }}
                        />

                        {item.buttonText && (
                          <span
                            contentEditable={interactive && isActive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], buttonText: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{ outline: "none", color: primary }}
                            className={`font-extrabold flex items-center gap-1 hover:translate-x-1 transition-transform ${
                              interactive && isActive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.buttonText }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Navigation & Pagination Controls Bar */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 z-40 relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCardIdx((prev) => (prev - 1 + items.length) % items.length);
                  }}
                  className="sm:hidden h-9 w-9 rounded-full border border-border/80 bg-background/90 hover:bg-background text-foreground shadow-md backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Previous Feature Card"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-2">
                  {items.map((_, idx) => {
                    const isCurrent = idx === activeCardIdx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCardIdx(idx);
                        }}
                        style={{
                          backgroundColor: isCurrent ? primary : undefined,
                        }}
                        className={`transition-all duration-300 cursor-pointer ${
                          isCurrent
                            ? "w-8 h-2.5 rounded-full shadow-xs"
                            : "w-2.5 h-2.5 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/60"
                        }`}
                        title={`Go to slide ${idx + 1}`}
                      />
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCardIdx((prev) => (prev + 1) % items.length);
                  }}
                  className="sm:hidden h-9 w-9 rounded-full border border-border/80 bg-background/90 hover:bg-background text-foreground shadow-md backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Next Feature Card"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : variant === "bento-grid-features" || variant === "bento-card-stack" || variant === "bento-grid" ? (
            <div className={`grid gap-3.5 sm:gap-4 ${
              isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}>
              {items.map((item: any, i: number) => {
                const isSpotlight = i === 0;
                const colSpanClass = (isMobile || isTablet)
                  ? "col-span-1"
                  : isSpotlight
                  ? "lg:col-span-2 col-span-1"
                  : "col-span-1";

                return (
                  <div
                    key={i}
                    className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-xl flex flex-col justify-between p-4 sm:p-6 md:p-7 ${colSpanClass} ${
                      isSpotlight ? "min-h-0 sm:min-h-[300px]" : "min-h-0 sm:min-h-[260px]"
                    } ${
                      isDarkSection ? "border-border/80 bg-card/95 backdrop-blur-md shadow-xl" : "border-border/70 bg-card/80 backdrop-blur-md shadow-xs"
                    }`}
                    style={{
                      borderRadius: theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "24px" : (theme.borderRadius || "24px"),
                    }}
                  >
                    <div
                      className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${primary}18 0%, ${primary}05 50%, transparent 100%)`,
                      }}
                    />

                    <div className="relative z-10 space-y-2.5 sm:space-y-4">
                      {item.badgeText && (
                        <div className="flex items-center justify-start">
                          <span
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], badgeText: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{
                              outline: "none",
                              backgroundColor: isDarkSection ? `${primary}25` : `${primary}12`,
                              color: isDarkSection ? "#ffffff" : primary,
                              borderColor: isDarkSection ? `${primary}45` : `${primary}25`,
                            }}
                            className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full border shadow-2xs ${
                              interactive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.badgeText }}
                          />
                        </div>
                      )}

                      <div className="space-y-1 sm:space-y-2">
                        <h3
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], title: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none", color: headingTextColor }}
                          className={`text-base sm:text-xl md:text-2xl font-bold tracking-tight ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <p
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], description: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none", color: bodyTextColor }}
                          className={`text-xs sm:text-sm leading-relaxed ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>

                    {isSpotlight && item.imageUrl && (
                      <div className="mt-3 sm:mt-6 relative overflow-hidden rounded-xl max-h-40 sm:max-h-48 z-20">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-40 sm:h-48 object-cover object-top rounded-xl" />
                        {interactive && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingItemImageIdx(editingItemImageIdx === i ? null : i);
                            }}
                            className="absolute top-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border text-foreground text-xs font-bold shadow-lg hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 cursor-pointer z-30"
                          >
                            <ImageIcon className="h-3.5 w-3.5" /> Edit Image
                          </button>
                        )}
                        {editingItemImageIdx === i && (
                          <ImageEditItem
                            currentUrl={item.imageUrl}
                            hideLayoutOptions={true}
                            onSave={(editProps) => {
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], imageUrl: editProps.url };
                              onUpdateProps?.({ items: nextItems });
                              setEditingItemImageIdx(null);
                            }}
                            onClose={() => setEditingItemImageIdx(null)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : variant === "split-feature-showcase" ? (
            <div className={`grid gap-3.5 sm:gap-6 items-center ${isMobileOrTablet ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-12"}`}>
              <div className={`space-y-2.5 sm:space-y-4 text-left ${isMobileOrTablet ? "w-full" : "lg:col-span-6"}`}>
                {items.map((item: any, i: number) => (
                  <div
                    key={i}
                    className={`p-3.5 sm:p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 space-y-1 group ${
                      isDarkSection ? "border-border/80 bg-card/90 hover:bg-card shadow-lg" : "border-border/60 bg-card/60 hover:bg-card shadow-2xs hover:shadow-lg"
                    }`}
                  >
                    <h4
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        const nextItems = [...items];
                        nextItems[i] = { ...nextItems[i], title: next };
                        onUpdateProps?.({ items: nextItems });
                      }}
                      style={{ outline: "none", color: headingTextColor }}
                      className={`text-sm sm:text-lg font-bold ${interactive ? "cursor-text" : ""}`}
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        const nextItems = [...items];
                        nextItems[i] = { ...nextItems[i], description: next };
                        onUpdateProps?.({ items: nextItems });
                      }}
                      style={{ outline: "none", color: bodyTextColor }}
                      className={`text-xs leading-relaxed ${
                        interactive ? "cursor-text" : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                ))}
              </div>

              <div className={`${isMobileOrTablet ? "w-full mt-2" : "lg:col-span-6"} relative group`}>
                <div
                  className="absolute -inset-1 rounded-3xl opacity-30 blur-xl group-hover:opacity-60 transition-all duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${primary}40 0%, ${primary}10 100%)`,
                  }}
                />
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={props.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"}
                    alt="Feature Showcase"
                    className="w-full h-auto object-cover rounded-2xl max-h-[380px] sm:max-h-[440px]"
                  />
                  {interactive && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditingShowcaseImage(!isEditingShowcaseImage);
                      }}
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border text-foreground text-xs font-bold shadow-lg hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 cursor-pointer z-30"
                    >
                      <ImageIcon className="h-3.5 w-3.5" /> Edit Image
                    </button>
                  )}
                  {isEditingShowcaseImage && (
                    <ImageEditItem
                      currentUrl={props.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"}
                      hideLayoutOptions={true}
                      onSave={(editProps) => {
                        onUpdateProps?.({ imageUrl: editProps.url });
                        setIsEditingShowcaseImage(false);
                      }}
                      onClose={() => setIsEditingShowcaseImage(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : variant === "minimal-matrix-features" ? (
            <div className={`grid gap-3.5 sm:gap-4 ${
              isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}>
              {items.map((item: any, i: number) => (
                <div
                  key={i}
                  className={`p-3.5 sm:p-5 rounded-2xl border transition-all space-y-2 text-left group ${
                    isDarkSection ? "border-border/80 bg-card/90 hover:bg-card shadow-xs hover:shadow-lg" : "border-border/60 bg-card/50 hover:bg-card shadow-xs hover:shadow-lg"
                  }`}
                >
                  <h4
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      const nextItems = [...items];
                      nextItems[i] = { ...nextItems[i], title: next };
                      onUpdateProps?.({ items: nextItems });
                    }}
                    style={{ outline: "none", color: headingTextColor }}
                    className={`text-sm sm:text-base font-bold ${interactive ? "cursor-text" : ""}`}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      const nextItems = [...items];
                      nextItems[i] = { ...nextItems[i], description: next };
                      onUpdateProps?.({ items: nextItems });
                    }}
                    style={{ outline: "none", color: bodyTextColor }}
                    className={`text-xs leading-relaxed ${
                      interactive ? "cursor-text" : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              ))}
            </div>
          ) : variant === "glowing-stat-cards" ? (
            <div className={`grid gap-5 sm:gap-6 ${
              isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {items.map((item: any, i: number) => {
                const IconComp = item.icon === "globe" ? Globe : item.icon === "shield" ? Shield : item.icon === "sparkles" ? Sparkles : Zap;
                const effectiveRadius = theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "24px" : (theme.borderRadius || "24px");
                const innerRadius = theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "9999px" : "14px";
                return (
                  <div
                    key={i}
                    className={`group relative overflow-hidden flex flex-col justify-between p-6 sm:p-7 border backdrop-blur-xl transition-all duration-300 ${
                      isDarkSection
                        ? "bg-card/95 hover:shadow-2xl"
                        : "bg-card/90 shadow-md hover:shadow-2xl hover:-translate-y-0.5"
                    }`}
                    style={{
                      borderRadius: effectiveRadius,
                      fontFamily: theme.fontFamily || "inherit",
                      borderColor: isDarkSection ? `${primary}35` : `${primary}25`,
                    }}
                  >
                    <div
                      className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top right, ${primary}25, transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div
                          className="p-3 border transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
                          style={{
                            backgroundColor: isDarkSection ? `${primary}20` : `${primary}12`,
                            color: primary,
                            borderColor: `${primary}35`,
                            borderRadius: innerRadius,
                          }}
                        >
                          <IconComp className="h-5 w-5" />
                        </div>

                        {(item.metric || item.badgeText) && (
                          <div className="flex items-center gap-1.5">
                            {item.metric && (
                              <span
                                contentEditable={interactive}
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                  const next = e.currentTarget.innerHTML;
                                  const nextItems = [...items];
                                  nextItems[i] = { ...nextItems[i], metric: next };
                                  onUpdateProps?.({ items: nextItems });
                                }}
                                style={{
                                  outline: "none",
                                  color: primary,
                                  backgroundColor: `${primary}15`,
                                  borderColor: `${primary}35`,
                                }}
                                className={`px-2.5 py-1 text-xs font-black rounded-full border ${
                                  interactive ? "cursor-text" : ""
                                }`}
                                dangerouslySetInnerHTML={{ __html: item.metric }}
                              />
                            )}
                            {item.badgeText && (
                              <span
                                contentEditable={interactive}
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                  const next = e.currentTarget.innerHTML;
                                  const nextItems = [...items];
                                  nextItems[i] = { ...nextItems[i], badgeText: next };
                                  onUpdateProps?.({ items: nextItems });
                                }}
                                style={{
                                  outline: "none",
                                  backgroundColor: isDarkSection ? `${primary}25` : `${primary}12`,
                                  color: isDarkSection ? "#ffffff" : primary,
                                  borderColor: `${primary}35`,
                                }}
                                className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full border ${
                                  interactive ? "cursor-text" : ""
                                }`}
                                dangerouslySetInnerHTML={{ __html: item.badgeText }}
                              />
                            )}
                          </div>
                        )}
                      </div>

                      {item.stat && (
                        <div className="pt-2">
                          <div
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], stat: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{ outline: "none", color: primary }}
                            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                              interactive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.stat }}
                          />
                        </div>
                      )}

                      <div className="space-y-1.5 pt-1">
                        <h3
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], title: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            color: headingTextColor,
                            fontFamily: theme.headingFontFamily || theme.fontFamily || "inherit",
                          }}
                          className={`text-lg sm:text-xl font-bold tracking-tight ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <p
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], description: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            color: bodyTextColor,
                            fontFamily: theme.bodyFontFamily || theme.fontFamily || "inherit",
                          }}
                          className={`text-xs sm:text-sm leading-relaxed ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>

                    {item.buttonText && (
                      <div
                        className="relative z-10 pt-4 mt-4 flex items-center justify-between border-t"
                        style={{ borderColor: isDarkSection ? `${primary}20` : "rgba(0,0,0,0.08)" }}
                      >
                        <span
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], buttonText: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none", color: primary }}
                          className={`text-xs font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.buttonText }}
                        />
                        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ color: primary }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : variant === "visual-cover-cards" ? (
            <div className={`grid gap-5 sm:gap-6 ${
              isMobile
                ? "grid-cols-1"
                : isTablet
                ? "grid-cols-2"
                : items.length === 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : items.length >= 5
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {items.map((item: any, i: number) => {
                const coverImage = item.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80";
                const effectiveRadius = theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "24px" : (theme.borderRadius || "24px");
                return (
                  <div
                    key={i}
                    className={`group relative flex flex-col justify-between border overflow-hidden transition-all duration-300 ${
                      isDarkSection
                        ? "bg-card/95 shadow-xl hover:border-primary/50"
                        : "bg-card/90 shadow-md hover:shadow-2xl hover:-translate-y-0.5"
                    }`}
                    style={{
                      borderRadius: effectiveRadius,
                      fontFamily: theme.fontFamily || "inherit",
                      borderColor: isDarkSection ? `${primary}30` : `${primary}20`,
                    }}
                  >
                    <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-muted">
                      <img
                        src={coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      {item.badgeText && (
                        <div className="absolute top-3.5 left-3.5 z-10">
                          <span
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], badgeText: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{
                              outline: "none",
                              backgroundColor: primary,
                              color: "#ffffff",
                            }}
                            className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-lg ${
                              interactive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.badgeText }}
                          />
                        </div>
                      )}

                      {interactive && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingItemImageIdx(editingItemImageIdx === i ? null : i);
                          }}
                          className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border text-foreground text-xs font-bold shadow-lg hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 cursor-pointer z-30"
                        >
                          <ImageIcon className="h-3.5 w-3.5" /> Edit Image
                        </button>
                      )}
                      {editingItemImageIdx === i && (
                        <ImageEditItem
                          currentUrl={coverImage}
                          hideLayoutOptions={true}
                          onSave={(editProps) => {
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], imageUrl: editProps.url };
                            onUpdateProps?.({ items: nextItems });
                            setEditingItemImageIdx(null);
                          }}
                          onClose={() => setEditingItemImageIdx(null)}
                        />
                      )}
                    </div>

                    <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], title: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            color: headingTextColor,
                            fontFamily: theme.headingFontFamily || theme.fontFamily || "inherit",
                          }}
                          className={`text-lg sm:text-xl font-bold tracking-tight group-hover:text-primary transition-colors ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <p
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], description: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            color: bodyTextColor,
                            fontFamily: theme.bodyFontFamily || theme.fontFamily || "inherit",
                          }}
                          className={`text-xs sm:text-sm leading-relaxed ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>

                      {item.buttonText && (
                        <div
                          className="pt-3 border-t flex items-center justify-between text-xs font-bold"
                          style={{
                            borderColor: isDarkSection ? `${primary}20` : "rgba(0,0,0,0.08)",
                            color: primary,
                          }}
                        >
                          <span
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], buttonText: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{ outline: "none" }}
                            className={interactive ? "cursor-text" : ""}
                            dangerouslySetInnerHTML={{ __html: item.buttonText }}
                          />
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" style={{ color: primary }} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : variant === "numbered-step-cards" ? (
            <div className={`grid gap-5 sm:gap-6 ${
              isMobile
                ? "grid-cols-1"
                : isTablet
                ? "grid-cols-2"
                : items.length === 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : items.length >= 5
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {items.map((item: any, i: number) => {
                const stepNum = item.stepNumber || `0${i + 1}`;
                const effectiveRadius = theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "24px" : (theme.borderRadius || "24px");
                return (
                  <div
                    key={i}
                    className={`group relative flex flex-col justify-between p-6 sm:p-7 border transition-all duration-300 ${
                      isDarkSection
                        ? "bg-card/95 shadow-xl hover:border-primary/60"
                        : "bg-card/90 shadow-md hover:shadow-2xl hover:-translate-y-0.5"
                    }`}
                    style={{
                      borderRadius: effectiveRadius,
                      fontFamily: theme.fontFamily || "inherit",
                      borderColor: isDarkSection ? `${primary}30` : `${primary}20`,
                    }}
                  >
                    <div
                      className="w-12 h-1 rounded-full mb-5 group-hover:w-full transition-all duration-500"
                      style={{ backgroundColor: primary }}
                    />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], stepNumber: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none", color: primary }}
                          className={`text-4xl sm:text-5xl font-black tracking-tighter opacity-90 group-hover:opacity-100 transition-opacity ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: stepNum }}
                        />

                        {item.badgeText && (
                          <span
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], badgeText: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{
                              outline: "none",
                              backgroundColor: `${primary}15`,
                              color: primary,
                              borderColor: `${primary}35`,
                              borderRadius: theme.borderRadius === "0px" ? "0px" : (theme.borderRadius || "9999px"),
                            }}
                            className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest border ${
                              interactive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.badgeText }}
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], title: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            color: headingTextColor,
                            fontFamily: theme.headingFontFamily || theme.fontFamily || "inherit",
                          }}
                          className={`text-lg sm:text-xl font-bold tracking-tight ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <p
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], description: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            color: bodyTextColor,
                            fontFamily: theme.bodyFontFamily || theme.fontFamily || "inherit",
                          }}
                          className={`text-xs sm:text-sm leading-relaxed ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>

                    {item.buttonText && (
                      <div
                        className="pt-4 mt-4 border-t flex items-center justify-between text-xs font-bold"
                        style={{
                          borderColor: isDarkSection ? `${primary}20` : "rgba(0,0,0,0.08)",
                          color: primary,
                        }}
                      >
                        <span
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], buttonText: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none" }}
                          className={interactive ? "cursor-text" : ""}
                          dangerouslySetInnerHTML={{ __html: item.buttonText }}
                        />
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" style={{ color: primary }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : variant === "hover-expand-stack" ? (
            <div className={`grid gap-5 sm:gap-6 ${
              isMobile
                ? "grid-cols-1"
                : isTablet
                ? "grid-cols-2"
                : items.length === 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : items.length >= 5
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {items.map((item: any, i: number) => {
                const isFeatured = i === 1 || item.badgeText?.toLowerCase().includes("popular");
                const effectiveRadius = theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "24px" : (theme.borderRadius || "24px");
                const innerRadius = theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "9999px" : "14px";

                const featuredBg = (theme.secondaryColor && isDarkColor(theme.secondaryColor) === true)
                  ? theme.secondaryColor
                  : (isDarkColor(primary) === true ? primary : "#0f172a");

                const cardBg = isFeatured
                  ? featuredBg
                  : isDarkSection
                  ? (theme.secondaryColor && isDarkColor(theme.secondaryColor) === true ? `${theme.secondaryColor}e6` : "rgba(15, 23, 42, 0.85)")
                  : "rgba(255, 255, 255, 0.95)";

                const isCardDark = isDarkColor(cardBg) ?? (isFeatured || isDarkSection);
                const headingColor = isCardDark ? "#ffffff" : headingTextColor;
                const descColor = isCardDark ? "rgba(255, 255, 255, 0.85)" : bodyTextColor;
                const statColor = isCardDark ? "#ffffff" : primary;

                const isCardPrimaryBg = isFeatured && (cardBg === primary || cardBg === theme.primaryColor);

                const badgeBg = isCardPrimaryBg
                  ? "#ffffff"
                  : isFeatured
                  ? primary
                  : `${primary}15`;

                const badgeColor = isCardPrimaryBg ? primary : isFeatured ? "#ffffff" : primary;
                const badgeBorder = isCardPrimaryBg ? "#ffffff" : isFeatured ? primary : `${primary}35`;

                const buttonBg = isCardPrimaryBg
                  ? "#ffffff"
                  : isFeatured
                  ? primary
                  : `${primary}15`;

                const buttonColor = isCardPrimaryBg ? primary : isFeatured ? "#ffffff" : primary;
                const buttonBorder = isCardPrimaryBg ? "1px solid #ffffff" : isFeatured ? `1px solid ${primary}` : `1px solid ${primary}35`;

                const cardBorder = isFeatured
                  ? primary
                  : isDarkSection
                  ? `${primary}35`
                  : `${primary}25`;

                return (
                  <div
                    key={i}
                    className={`group relative flex flex-col justify-between p-6 sm:p-7 border transition-all duration-300 hover:-translate-y-0.5 ${
                      isFeatured ? "shadow-xl z-10" : "shadow-md hover:shadow-xl"
                    }`}
                    style={{
                      backgroundColor: cardBg,
                      borderColor: cardBorder,
                      borderRadius: effectiveRadius,
                      fontFamily: theme.fontFamily || "inherit",
                      boxShadow: isFeatured ? `0 20px 45px -15px ${primary}40` : undefined,
                    }}
                  >
                    <div className="space-y-4">
                      {item.badgeText && (
                        <div className="flex items-center justify-end">
                          <span
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], badgeText: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{
                              outline: "none",
                              backgroundColor: badgeBg,
                              color: badgeColor,
                              borderColor: badgeBorder,
                              borderRadius: theme.borderRadius === "0px" ? "0px" : (theme.borderRadius || "9999px"),
                            }}
                            className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider border shadow-xs ${
                              interactive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.badgeText }}
                          />
                        </div>
                      )}

                      {item.stat && (
                        <div className="flex items-baseline gap-1.5 pt-1">
                          <span
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], stat: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{ outline: "none", color: statColor }}
                            className={`text-3xl sm:text-4xl font-black tracking-tight ${
                              interactive ? "cursor-text" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.stat }}
                          />
                          {item.metric && (
                            <span
                              contentEditable={interactive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerHTML;
                                const nextItems = [...items];
                                nextItems[i] = { ...nextItems[i], metric: next };
                                onUpdateProps?.({ items: nextItems });
                              }}
                              style={{ outline: "none", color: isCardDark ? "rgba(255,255,255,0.7)" : bodyTextColor }}
                              className={`text-xs font-bold ${interactive ? "cursor-text" : ""}`}
                              dangerouslySetInnerHTML={{ __html: item.metric }}
                            />
                          )}
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <h3
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], title: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            color: headingColor,
                            fontFamily: theme.headingFontFamily || theme.fontFamily || "inherit",
                          }}
                          className={`text-lg sm:text-xl font-bold tracking-tight ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <p
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], description: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            color: descColor,
                            fontFamily: theme.bodyFontFamily || theme.fontFamily || "inherit",
                          }}
                          className={`text-xs sm:text-sm leading-relaxed ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>

                    {item.buttonText && (
                      <div className="pt-6 mt-4">
                        <button
                          type="button"
                          className="w-full py-3 px-4 text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:opacity-90"
                          style={{
                            backgroundColor: buttonBg,
                            color: buttonColor,
                            border: buttonBorder,
                            borderRadius: theme.borderRadius || "12px",
                          }}
                        >
                          <span
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], buttonText: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{ outline: "none" }}
                            className={interactive ? "cursor-text" : ""}
                            dangerouslySetInnerHTML={{ __html: item.buttonText }}
                          />
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Glass Cards / Modern Service Cards default fallback */
            <div className={`grid gap-3.5 sm:gap-4 ${
              isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {items.map((item: any, i: number) => {
                const effectiveRadius = theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "24px" : (theme.borderRadius || "24px");
                return (
                  <div
                    key={i}
                    className={`group relative flex flex-col justify-between p-4 sm:p-6 border backdrop-blur-md transition-all duration-300 text-left space-y-3.5 ${
                      isDarkSection ? "bg-card/95 hover:shadow-xl" : "bg-card/80 shadow-xs hover:shadow-xl"
                    }`}
                    style={{
                      borderRadius: effectiveRadius,
                      fontFamily: theme.fontFamily || "inherit",
                      borderColor: isDarkSection ? `${primary}30` : `${primary}20`,
                    }}
                  >
                    <div className="space-y-2.5 sm:space-y-4">
                      {item.badgeText && (
                        <div className="flex items-center justify-start">
                          <span
                            className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full border shadow-2xs"
                            style={{
                              backgroundColor: isDarkSection ? `${primary}25` : `${primary}12`,
                              color: isDarkSection ? "#ffffff" : primary,
                              borderColor: isDarkSection ? `${primary}45` : `${primary}25`,
                            }}
                          >
                            {item.badgeText}
                          </span>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <h3
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], title: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            color: headingTextColor,
                            fontFamily: theme.headingFontFamily || theme.fontFamily || "inherit",
                          }}
                          className={`text-lg sm:text-xl font-bold tracking-tight ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <p
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], description: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{
                            outline: "none",
                            color: bodyTextColor,
                            fontFamily: theme.bodyFontFamily || theme.fontFamily || "inherit",
                          }}
                          className={`text-xs sm:text-sm leading-relaxed ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>

                    {item.buttonText && (
                      <div
                        className="pt-3 border-t flex items-center gap-1.5 text-xs font-bold group-hover:translate-x-1 transition-transform"
                        style={{
                          borderColor: isDarkSection ? `${primary}20` : "rgba(0,0,0,0.08)",
                          color: primary,
                        }}
                      >
                        <span>{item.buttonText}</span>
                        <ArrowRight className="h-3.5 w-3.5" style={{ color: primary }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Center>
      </section>
    );
  }

  if (type === "testimonial") {
    const variant = props.variant || "3d-testimonial-deck";
    const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
    const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
    const [editingAvatarIdx, setEditingAvatarIdx] = useState<number | null>(null);
    const [isEditingVideo, setIsEditingVideo] = useState(false);
    const [isPlayingVideo, setIsPlayingVideo] = useState(false);

    const items = (props.items || [
      {
        quote: props.quote || props.text || "“This builder completely transformed our agency workflow. We ship pixel-perfect client sites in hours instead of weeks.”",
        authorName: props.authorName || props.heading || "Sarah Jenkins",
        authorRole: props.authorRole || props.subheading || "Head of Product, Designflow",
        avatarUrl: props.avatarUrl || props.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
        rating: props.rating || 5,
        companyLogo: props.companyLogo || "DESIGNFLOW",
        metricTag: props.metricTag || "4.9/5 CSAT Score",
      },
      {
        quote: "“The 1-click cloud publishing and live color theme editor make custom web design feel like magic.”",
        authorName: "Marcus Vance",
        authorRole: "Founder & Lead Architect, ScaleVenture",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        rating: 5,
        companyLogo: "SCALEVENTURE",
        metricTag: "+340% Conversion",
      },
      {
        quote: "“Our dev team relies on the generated schema and instant DOM synchronization. Essential tool for modern stacks.”",
        authorName: "Elena Rostova",
        authorRole: "VP of Engineering, CloudPulse",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
        rating: 5,
        companyLogo: "CLOUDPULSE",
        metricTag: "10x Faster Ship",
      },
      {
        quote: "“Clean code output, beautiful component presets, and lightning fast UI. Best web builder engine we've tested.”",
        authorName: "Alex Chen",
        authorRole: "Senior UI Architect, Nexus Studio",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
        rating: 5,
        companyLogo: "NEXUS",
        metricTag: "Verified Customer",
      },
    ]);

    useEffect(() => {
      if (variant !== "3d-testimonial-deck" || isTestimonialHovered || items.length <= 1) return;
      const timer = setInterval(() => {
        setActiveTestimonialIdx((prev) => (prev + 1) % items.length);
      }, 4500);
      return () => clearInterval(timer);
    }, [variant, isTestimonialHovered, items.length]);

    const youtubeEmbed = getYouTubeEmbedUrl(props.videoUrl || props.videoPreviewUrl, isPlayingVideo);

    const renderStars = (count = 5) => (
      <div className="flex items-center gap-1 text-amber-400">
        {Array.from({ length: count }).map((_, idx) => (
          <Star key={idx} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400 shrink-0" />
        ))}
      </div>
    );

    return (
      <section
        {...aosAttrs}
        id={currentSectionId}
        style={{
          ...css,
          backgroundColor: style.backgroundColor || "transparent",
        }}
        className={`w-full transition-all relative overflow-hidden group/section ${
          isMobile ? "py-6 px-1" : isTablet ? "py-10 px-3" : "py-12 sm:py-24"
        }`}
      >
        <Center maxWidth={effectiveMaxWidth} isMobile={isMobile}>
          {(props.heading || props.subheading) && (
            <div className={`text-center space-y-2.5 max-w-3xl mx-auto ${isMobile ? "mb-6" : "mb-12"}`}>
              {props.heading && (
                <h2
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== props.heading) onUpdateProps?.({ heading: next });
                  }}
                  style={{ outline: "none", color: headingTextColor }}
                  className={`font-black tracking-tight ${
                    isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl md:text-5xl"
                  } ${interactive ? "cursor-text transition-all" : ""}`}
                  dangerouslySetInnerHTML={{ __html: props.heading }}
                />
              )}
              {props.subheading && (
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== props.subheading) onUpdateProps?.({ subheading: next });
                  }}
                  style={{ outline: "none", color: bodyTextColor }}
                  className={`leading-relaxed ${
                    isMobile ? "text-xs px-2" : "text-sm md:text-lg"
                  } ${interactive ? "cursor-text transition-all" : ""}`}
                  dangerouslySetInnerHTML={{ __html: props.subheading }}
                />
              )}
            </div>
          )}

          {/* VARIANT 1: 3d-testimonial-deck */}
          {variant === "3d-testimonial-deck" && (
            <div
              onMouseEnter={() => setIsTestimonialHovered(true)}
              onMouseLeave={() => setIsTestimonialHovered(false)}
              className="relative w-full max-w-5xl mx-auto py-1 sm:py-4 select-none"
            >
              {/* Desktop Floating Left Navigation Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTestimonialIdx((prev) => (prev - 1 + items.length) % items.length);
                }}
                className="hidden sm:flex absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-50 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-border/80 bg-card hover:bg-background text-foreground shadow-2xl backdrop-blur-md items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                title="Previous Testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Desktop Floating Right Navigation Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTestimonialIdx((prev) => (prev + 1) % items.length);
                }}
                className="hidden sm:flex absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-50 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-border/80 bg-card hover:bg-background text-foreground shadow-2xl backdrop-blur-md items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                title="Next Testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* 3D Stack Deck Container */}
              <div className={`relative w-full flex items-center justify-center overflow-visible ${
                isMobile ? "h-[290px]" : "h-[330px] sm:h-[380px]"
              }`}>
                {items.map((item: any, i: number) => {
                  const total = items.length;
                  let diff = i - (activeTestimonialIdx % total);
                  if (diff > total / 2) diff -= total;
                  if (diff < -total / 2) diff += total;

                  const isActive = diff === 0;
                  const isLeft = diff === -1;
                  const isRight = diff === 1;
                  const isFarLeft = diff === -2 || diff < -1;
                  const isFarRight = diff === 2 || diff > 1;

                  let positionClasses = "";
                  if (isActive) {
                    positionClasses = "z-30 scale-100 opacity-100 translate-x-0 border-2 cursor-default";
                  } else if (isLeft) {
                    positionClasses = isMobile
                      ? "z-20 scale-75 opacity-30 -translate-x-[25%] blur-[0.6px] border border-border/60"
                      : "z-20 scale-90 opacity-40 -translate-x-[45%] sm:-translate-x-[60%] blur-[0.4px] hover:opacity-85 cursor-pointer border border-border/60";
                  } else if (isRight) {
                    positionClasses = isMobile
                      ? "z-20 scale-75 opacity-30 translate-x-[25%] blur-[0.6px] border border-border/60"
                      : "z-20 scale-90 opacity-40 translate-x-[45%] sm:translate-x-[60%] blur-[0.4px] hover:opacity-85 cursor-pointer border border-border/60";
                  } else if (isFarLeft) {
                    positionClasses = "z-10 scale-75 opacity-20 -translate-x-[80%] sm:-translate-x-[110%] pointer-events-none hidden sm:flex border border-border/40";
                  } else {
                    positionClasses = "z-10 scale-75 opacity-20 translate-x-[80%] sm:translate-x-[110%] pointer-events-none hidden sm:flex border border-border/40";
                  }

                  return (
                    <div
                      key={i}
                      onClick={(e) => {
                        if (!isActive) {
                          e.stopPropagation();
                          setActiveTestimonialIdx(i);
                        }
                      }}
                      className={`absolute rounded-3xl bg-card transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden ${
                        isMobile
                          ? "w-[305px] h-[285px] p-4 space-y-2"
                          : "w-[330px] sm:w-[400px] md:w-[460px] h-[310px] sm:h-[350px] p-5 sm:p-7"
                      } ${positionClasses}`}
                      style={{
                        borderRadius: theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "28px" : (theme.borderRadius || "28px"),
                        borderColor: isActive ? primary : undefined,
                        boxShadow: isActive ? `0 25px 60px -12px ${primary}40` : undefined,
                      }}
                    >
                      {/* Top Header Row: Rating + Metric Tag */}
                      <div className="flex items-center justify-between gap-1.5 min-w-0">
                        <div className="shrink-0">
                          {renderStars(item.rating || 5)}
                        </div>
                        {item.metricTag && (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider rounded-full border shadow-2xs shrink-0 max-w-[135px] sm:max-w-[180px] overflow-hidden"
                            style={{
                              backgroundColor: `${primary}18`,
                              color: primary,
                              borderColor: `${primary}35`,
                            }}
                          >
                            <RenderBadgeIcon tagText={item.metricTag} primaryColor={primary} className="h-3 w-3 shrink-0" />
                            <span
                              contentEditable={interactive && isActive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerHTML;
                                const nextItems = [...items];
                                nextItems[i] = { ...nextItems[i], metricTag: next };
                                onUpdateProps?.({ items: nextItems });
                              }}
                              style={{ outline: "none" }}
                              className={`truncate ${interactive && isActive ? "cursor-text" : ""}`}
                              dangerouslySetInnerHTML={{ __html: item.metricTag }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Middle Quote Text */}
                      <div className="my-auto space-y-1.5 overflow-hidden">
                        <p
                          contentEditable={interactive && isActive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], quote: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none", color: headingTextColor }}
                          className={`font-bold italic leading-relaxed line-clamp-4 ${
                            isMobile ? "text-xs" : "text-sm sm:text-base md:text-lg"
                          } ${interactive && isActive ? "cursor-text" : ""}`}
                          dangerouslySetInnerHTML={{ __html: item.quote || item.text }}
                        />
                      </div>

                      {/* Footer Row: Reviewer Profile + Company Logo */}
                      <div
                        className="pt-2 border-t flex items-center justify-between gap-1.5 text-xs min-w-0"
                        style={{ borderColor: isDarkSection ? `${primary}20` : "rgba(0,0,0,0.08)" }}
                      >
                        <div className="flex items-center gap-2 min-w-0 shrink">
                          <div className="relative group/avatar shrink-0">
                            <img
                              src={item.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"}
                              alt={item.authorName}
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 shadow-xs"
                              style={{ borderColor: primary }}
                            />
                            {interactive && isActive && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingAvatarIdx(editingAvatarIdx === i ? null : i);
                                }}
                                className="absolute -bottom-1 -right-1 p-0.5 sm:p-1 rounded-full bg-background border border-border text-foreground shadow-md hover:bg-primary hover:text-white transition-all text-[8px] cursor-pointer z-10"
                                title="Change Avatar Image"
                              >
                                ✎
                              </button>
                            )}
                            {editingAvatarIdx === i && (
                              <ImageEditItem
                                currentUrl={item.avatarUrl}
                                hideLayoutOptions={true}
                                onSave={(editProps) => {
                                  const nextItems = [...items];
                                  nextItems[i] = { ...nextItems[i], avatarUrl: editProps.url };
                                  onUpdateProps?.({ items: nextItems });
                                  setEditingAvatarIdx(null);
                                }}
                                onClose={() => setEditingAvatarIdx(null)}
                              />
                            )}
                          </div>

                          <div className="text-left min-w-0">
                            <h4
                              contentEditable={interactive && isActive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerHTML;
                                const nextItems = [...items];
                                nextItems[i] = { ...nextItems[i], authorName: next };
                                onUpdateProps?.({ items: nextItems });
                              }}
                              style={{ outline: "none", color: headingTextColor }}
                              className={`font-black text-xs sm:text-sm leading-tight truncate max-w-[100px] sm:max-w-[140px] ${
                                interactive && isActive ? "cursor-text" : ""
                              }`}
                              dangerouslySetInnerHTML={{ __html: item.authorName || item.heading }}
                            />
                            <p
                              contentEditable={interactive && isActive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerHTML;
                                const nextItems = [...items];
                                nextItems[i] = { ...nextItems[i], authorRole: next };
                                onUpdateProps?.({ items: nextItems });
                              }}
                              style={{ outline: "none", color: bodyTextColor }}
                              className={`text-[10px] sm:text-[11px] font-semibold text-muted-foreground truncate max-w-[100px] sm:max-w-[140px] ${
                                interactive && isActive ? "cursor-text" : ""
                              }`}
                              dangerouslySetInnerHTML={{ __html: item.authorRole || item.subheading }}
                            />
                          </div>
                        </div>

                        {item.companyLogo && (
                          <div className="inline-flex items-center gap-1 font-black text-[10px] sm:text-xs uppercase tracking-wider shrink-0 max-w-[90px] sm:max-w-[120px] overflow-hidden" style={{ color: primary }}>
                            <RenderBadgeIcon tagText={item.companyLogo} primaryColor={primary} className="h-3 w-3 shrink-0" />
                            <span
                              contentEditable={interactive && isActive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerHTML;
                                const nextItems = [...items];
                                nextItems[i] = { ...nextItems[i], companyLogo: next };
                                onUpdateProps?.({ items: nextItems });
                              }}
                              style={{ outline: "none" }}
                              className={`truncate ${interactive && isActive ? "cursor-text" : ""}`}
                              dangerouslySetInnerHTML={{ __html: item.companyLogo }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Controls Bar */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 z-40 relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTestimonialIdx((prev) => (prev - 1 + items.length) % items.length);
                  }}
                  className="sm:hidden h-8 w-8 rounded-full border border-border/80 bg-background/90 hover:bg-background text-foreground shadow-md backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Previous Testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {items.map((_, idx) => {
                    const isCurrent = idx === activeTestimonialIdx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTestimonialIdx(idx);
                        }}
                        style={{
                          backgroundColor: isCurrent ? primary : undefined,
                        }}
                        className={`transition-all duration-300 cursor-pointer ${
                          isCurrent
                            ? "w-6 sm:w-8 h-2 sm:h-2.5 rounded-full shadow-xs"
                            : "w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/60"
                        }`}
                        title={`Go to slide ${idx + 1}`}
                      />
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTestimonialIdx((prev) => (prev + 1) % items.length);
                  }}
                  className="sm:hidden h-8 w-8 rounded-full border border-border/80 bg-background/90 hover:bg-background text-foreground shadow-md backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Next Testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* VARIANT 2: bento-testimonial-grid */}
          {variant === "bento-testimonial-grid" && (
            <div className={`grid gap-3.5 sm:gap-6 ${
              isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-1 md:grid-cols-3"
            }`}>
              {items.map((item: any, i: number) => {
                const isSpotlight = item.isSpotlight || i === 0;
                const colSpanClass = isMobile
                  ? "col-span-1"
                  : isTablet
                  ? (isSpotlight ? "col-span-2" : "col-span-1")
                  : (isSpotlight ? "md:col-span-2" : "md:col-span-1");

                return (
                  <div
                    key={i}
                    className={`rounded-3xl border bg-card transition-all duration-300 hover:shadow-xl flex flex-col justify-between space-y-3.5 ${
                      isMobile ? "p-4 sm:p-6" : "p-6 sm:p-7"
                    } ${colSpanClass} ${isSpotlight ? "border-2" : ""}`}
                    style={{
                      borderRadius: theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "28px" : (theme.borderRadius || "28px"),
                      borderColor: isSpotlight ? primary : `${primary}25`,
                      boxShadow: isSpotlight ? `0 20px 50px -10px ${primary}25` : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      {renderStars(item.rating || 5)}
                      {item.metricTag && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full border shrink-0"
                          style={{ backgroundColor: `${primary}18`, color: primary, borderColor: `${primary}35` }}
                        >
                          <RenderBadgeIcon tagText={item.metricTag} primaryColor={primary} />
                          <span
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], metricTag: next };
                              onUpdateProps?.({ items: nextItems });
                            }}
                            style={{ outline: "none" }}
                            className={`truncate max-w-[120px] ${interactive ? "cursor-text" : ""}`}
                            dangerouslySetInnerHTML={{ __html: item.metricTag }}
                          />
                        </div>
                      )}
                    </div>

                    <p
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        const nextItems = [...items];
                        nextItems[i] = { ...nextItems[i], quote: next };
                        onUpdateProps?.({ items: nextItems });
                      }}
                      style={{ outline: "none", color: headingTextColor }}
                      className={`font-bold italic leading-relaxed ${
                        isSpotlight ? (isMobile ? "text-base" : "text-lg sm:text-xl") : "text-xs sm:text-base"
                      } ${interactive ? "cursor-text" : ""}`}
                      dangerouslySetInnerHTML={{ __html: item.quote || item.text }}
                    />

                    <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                      <div className="relative group/avatar shrink-0">
                        <img
                          src={item.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"}
                          alt={item.authorName}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border"
                          style={{ borderColor: primary }}
                        />
                        {interactive && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingAvatarIdx(editingAvatarIdx === i ? null : i);
                            }}
                            className="absolute -bottom-1 -right-1 p-0.5 sm:p-1 rounded-full bg-background border border-border text-foreground shadow-md hover:bg-primary hover:text-white transition-all text-[8px] cursor-pointer"
                            title="Change Avatar Image"
                          >
                            ✎
                          </button>
                        )}
                        {editingAvatarIdx === i && (
                          <ImageEditItem
                            currentUrl={item.avatarUrl}
                            hideLayoutOptions={true}
                            onSave={(editProps) => {
                              const nextItems = [...items];
                              nextItems[i] = { ...nextItems[i], avatarUrl: editProps.url };
                              onUpdateProps?.({ items: nextItems });
                              setEditingAvatarIdx(null);
                            }}
                            onClose={() => setEditingAvatarIdx(null)}
                          />
                        )}
                      </div>

                      <div className="text-left min-w-0">
                        <h4
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], authorName: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none", color: headingTextColor }}
                          className={`font-extrabold text-xs sm:text-sm leading-tight truncate ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.authorName || item.heading }}
                        />
                        <p
                          contentEditable={interactive}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const next = e.currentTarget.innerHTML;
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], authorRole: next };
                            onUpdateProps?.({ items: nextItems });
                          }}
                          style={{ outline: "none", color: bodyTextColor }}
                          className={`text-[11px] sm:text-xs opacity-75 truncate ${
                            interactive ? "cursor-text" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.authorRole || item.subheading }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VARIANT 3: spotlight-testimonial-hero */}
          {variant === "spotlight-testimonial-hero" && (
            <div
              className={`max-w-4xl mx-auto rounded-3xl bg-card border-2 shadow-2xl text-center relative overflow-hidden ${
                isMobile ? "p-5 space-y-4" : isTablet ? "p-8 space-y-5" : "p-8 sm:p-14 space-y-6"
              }`}
              style={{
                borderRadius: theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "32px" : (theme.borderRadius || "32px"),
                borderColor: primary,
                boxShadow: `0 30px 70px -15px ${primary}30`,
              }}
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                {renderStars(props.rating || 5)}
                {props.metricTag && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black rounded-full border"
                    style={{ backgroundColor: `${primary}18`, color: primary, borderColor: `${primary}35` }}
                  >
                    <RenderBadgeIcon tagText={props.metricTag} primaryColor={primary} />
                    <span
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== props.metricTag) onUpdateProps?.({ metricTag: next });
                      }}
                      style={{ outline: "none" }}
                      className={interactive ? "cursor-text" : ""}
                      dangerouslySetInnerHTML={{ __html: props.metricTag }}
                    />
                  </div>
                )}
              </div>

              <p
                contentEditable={interactive}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const next = e.currentTarget.innerHTML;
                  if (next && next !== (props.quote || props.text)) onUpdateProps?.({ quote: next, text: next });
                }}
                style={{ outline: "none", color: headingTextColor }}
                className={`font-black italic leading-relaxed tracking-tight ${
                  isMobile ? "text-base" : isTablet ? "text-xl" : "text-xl sm:text-2xl md:text-3xl"
                } ${interactive ? "cursor-text" : ""}`}
                dangerouslySetInnerHTML={{ __html: props.quote || props.text || "“CraftSite allowed us to launch 12 high-converting landing pages in a single month.”" }}
              />

              <div className="flex flex-col items-center justify-center space-y-1.5 pt-3 border-t border-border/40">
                <div className="relative group/avatar shrink-0">
                  <img
                    src={props.avatarUrl || props.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"}
                    alt={props.authorName || "Reviewer"}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 shadow-md"
                    style={{ borderColor: primary }}
                  />
                  {interactive && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingAvatarIdx(editingAvatarIdx === 999 ? null : 999);
                      }}
                      className="absolute -bottom-1 -right-1 p-1 rounded-full bg-background border border-border text-foreground shadow-md hover:bg-primary hover:text-white transition-all text-[10px] cursor-pointer"
                      title="Change Avatar Image"
                    >
                      ✎
                    </button>
                  )}
                  {editingAvatarIdx === 999 && (
                    <ImageEditItem
                      currentUrl={props.avatarUrl || props.imageUrl}
                      hideLayoutOptions={true}
                      onSave={(editProps) => {
                        onUpdateProps?.({ avatarUrl: editProps.url, imageUrl: editProps.url });
                        setEditingAvatarIdx(null);
                      }}
                      onClose={() => setEditingAvatarIdx(null)}
                    />
                  )}
                </div>

                <h4
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== props.authorName) onUpdateProps?.({ authorName: next });
                  }}
                  style={{ outline: "none", color: headingTextColor }}
                  className={`font-extrabold text-base sm:text-lg leading-tight ${interactive ? "cursor-text" : ""}`}
                  dangerouslySetInnerHTML={{ __html: props.authorName || props.heading || "David Sterling" }}
                />
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== props.authorRole) onUpdateProps?.({ authorRole: next });
                  }}
                  style={{ outline: "none", color: bodyTextColor }}
                  className={`text-xs font-semibold text-muted-foreground ${interactive ? "cursor-text" : ""}`}
                  dangerouslySetInnerHTML={{ __html: props.authorRole || props.subheading || "Chief Marketing Officer, HyperScale Inc." }}
                />
              </div>
            </div>
          )}

          {/* VARIANT 4: wall-of-love-testimonials */}
          {variant === "wall-of-love-testimonials" && (
            <div className={`grid gap-3.5 sm:gap-6 ${
              isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {items.map((item: any, i: number) => (
                <div
                  key={i}
                  className={`rounded-2xl border bg-card/90 backdrop-blur-md transition-all duration-300 hover:shadow-xl text-left space-y-3 flex flex-col justify-between ${
                    isMobile ? "p-4" : "p-6"
                  }`}
                  style={{
                    borderRadius: theme.borderRadius === "0px" ? "0px" : theme.borderRadius === "9999px" ? "24px" : (theme.borderRadius || "24px"),
                    borderColor: `${primary}25`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    {renderStars(item.rating || 5)}
                    {item.date && (
                      <span
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          const nextItems = [...items];
                          nextItems[i] = { ...nextItems[i], date: next };
                          onUpdateProps?.({ items: nextItems });
                        }}
                        style={{ outline: "none" }}
                        className={`text-[10px] sm:text-[11px] font-semibold text-muted-foreground ${interactive ? "cursor-text" : ""}`}
                        dangerouslySetInnerHTML={{ __html: item.date }}
                      />
                    )}
                  </div>

                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      const nextItems = [...items];
                      nextItems[i] = { ...nextItems[i], quote: next };
                      onUpdateProps?.({ items: nextItems });
                    }}
                    style={{ outline: "none", color: headingTextColor }}
                    className={`leading-relaxed ${
                      isMobile ? "text-xs" : "text-sm sm:text-base"
                    } ${interactive ? "cursor-text" : ""}`}
                    dangerouslySetInnerHTML={{ __html: item.quote || item.text }}
                  />

                  <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                    <div className="relative group/avatar shrink-0">
                      <img
                        src={item.avatarUrl || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"}
                        alt={item.authorName}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border"
                        style={{ borderColor: primary }}
                      />
                      {interactive && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingAvatarIdx(editingAvatarIdx === i ? null : i);
                          }}
                          className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-background border border-border text-foreground shadow-md hover:bg-primary hover:text-white transition-all text-[8px] cursor-pointer"
                          title="Change Avatar Image"
                        >
                          ✎
                        </button>
                      )}
                      {editingAvatarIdx === i && (
                        <ImageEditItem
                          currentUrl={item.avatarUrl}
                          hideLayoutOptions={true}
                          onSave={(editProps) => {
                            const nextItems = [...items];
                            nextItems[i] = { ...nextItems[i], avatarUrl: editProps.url };
                            onUpdateProps?.({ items: nextItems });
                            setEditingAvatarIdx(null);
                          }}
                          onClose={() => setEditingAvatarIdx(null)}
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          const nextItems = [...items];
                          nextItems[i] = { ...nextItems[i], authorName: next };
                          onUpdateProps?.({ items: nextItems });
                        }}
                        style={{ outline: "none", color: headingTextColor }}
                        className={`font-extrabold text-xs truncate ${interactive ? "cursor-text" : ""}`}
                        dangerouslySetInnerHTML={{ __html: item.authorName || item.heading }}
                      />
                      <p
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          const nextItems = [...items];
                          nextItems[i] = { ...nextItems[i], authorHandle: next };
                          onUpdateProps?.({ items: nextItems });
                        }}
                        style={{ outline: "none", color: primary }}
                        className={`text-[10px] sm:text-[11px] font-bold truncate ${interactive ? "cursor-text" : ""}`}
                        dangerouslySetInnerHTML={{ __html: item.authorHandle || item.authorRole || "@creator" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VARIANT 5: split-story-testimonial */}
          {variant === "split-story-testimonial" && (
            <div className={`grid items-center ${
              isMobileOrTablet ? "grid-cols-1 space-y-6" : "grid-cols-1 lg:grid-cols-12 gap-8"
            }`}>
              {/* Left Video / Case Study Preview Card */}
              <div className={`${isMobileOrTablet ? "w-full" : "lg:col-span-6"} relative group`}>
                <div
                  className="absolute -inset-1 rounded-3xl opacity-30 blur-xl group-hover:opacity-60 transition-all duration-500 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${primary}40 0%, ${primary}10 100%)` }}
                />
                <div className="relative overflow-hidden rounded-3xl border shadow-2xl bg-black" style={{ borderColor: `${primary}35` }}>
                  {youtubeEmbed && (isPlayingVideo || !interactive) ? (
                    <iframe
                      src={youtubeEmbed}
                      title="Customer Video Case Study"
                      className={`w-full rounded-3xl border-none ${
                        isMobile ? "h-[220px]" : "h-[280px] sm:h-[360px]"
                      }`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className={`relative w-full ${
                      isMobile ? "h-[220px]" : "h-[280px] sm:h-[360px]"
                    }`}>
                      <img
                        src={props.videoPreviewUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"}
                        alt="Case study story"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-4 sm:p-6">
                        {props.metricTag && (
                          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-black rounded-full shadow-lg text-white"
                            style={{ backgroundColor: primary }}
                          >
                            <RenderBadgeIcon tagText={props.metricTag} primaryColor="#ffffff" />
                            <span
                              contentEditable={interactive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerHTML;
                                if (next && next !== props.metricTag) onUpdateProps?.({ metricTag: next });
                              }}
                              style={{ outline: "none" }}
                              className={interactive ? "cursor-text" : ""}
                              dangerouslySetInnerHTML={{ __html: props.metricTag }}
                            />
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => setIsPlayingVideo(true)}
                            className="flex items-center gap-2.5 group/play cursor-pointer"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 group-hover/play:bg-white text-primary flex items-center justify-center shadow-2xl backdrop-blur-md transition-all group-hover/play:scale-110 shrink-0">
                              <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary ml-0.5" />
                            </div>
                            <span className="text-white font-extrabold text-xs sm:text-sm drop-shadow-md">Watch Case Study Video</span>
                          </button>

                          {interactive && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsEditingVideo(true);
                              }}
                              className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-background/90 border border-border shadow-lg hover:border-primary text-foreground text-[10px] sm:text-xs font-mono transition-all cursor-pointer flex items-center gap-1 shrink-0"
                              title="Edit YouTube Video Link"
                            >
                              <Video className="h-3 w-3 text-primary" />
                              <span>Edit Video</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {interactive && !youtubeEmbed && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditingVideo(true);
                      }}
                      className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-background border border-border shadow-lg hover:border-primary text-foreground text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1 z-30"
                      title="Edit YouTube Video Link"
                    >
                      <Video className="h-3 w-3 text-primary" />
                      <span>YouTube Video</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Story Quote Content */}
              <div className={`space-y-4 sm:space-y-6 text-left ${isMobileOrTablet ? "w-full" : "lg:col-span-6"}`}>
                {renderStars(props.rating || 5)}
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== (props.quote || props.text)) onUpdateProps?.({ quote: next, text: next });
                  }}
                  style={{ outline: "none", color: headingTextColor }}
                  className={`font-black italic leading-relaxed ${
                    isMobile ? "text-base" : "text-xl sm:text-2xl"
                  } ${interactive ? "cursor-text" : ""}`}
                  dangerouslySetInnerHTML={{ __html: props.quote || props.text || "“We replaced complex manual frontend boilerplate with modular visual sections.”" }}
                />
                <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-border/40">
                  <div className="relative group/avatar shrink-0">
                    <img
                      src={props.avatarUrl || "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"}
                      alt={props.authorName || "Reviewer"}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 shadow-md"
                      style={{ borderColor: primary }}
                    />
                    {interactive && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingAvatarIdx(editingAvatarIdx === 888 ? null : 888);
                        }}
                        className="absolute -bottom-1 -right-1 p-1 rounded-full bg-background border border-border text-foreground shadow-md hover:bg-primary hover:text-white transition-all text-[9px] cursor-pointer"
                        title="Change Avatar Image"
                      >
                        ✎
                      </button>
                    )}
                    {editingAvatarIdx === 888 && (
                      <ImageEditItem
                        currentUrl={props.avatarUrl}
                        hideLayoutOptions={true}
                        onSave={(editProps) => {
                          onUpdateProps?.({ avatarUrl: editProps.url });
                          setEditingAvatarIdx(null);
                        }}
                        onClose={() => setEditingAvatarIdx(null)}
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== props.authorName) onUpdateProps?.({ authorName: next });
                      }}
                      style={{ outline: "none", color: headingTextColor }}
                      className={`font-extrabold text-sm sm:text-base leading-tight truncate ${
                        interactive ? "cursor-text" : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: props.authorName || props.heading || "Amara Okonkwo" }}
                    />
                    <p
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== props.authorRole) onUpdateProps?.({ authorRole: next });
                      }}
                      style={{ outline: "none", color: bodyTextColor }}
                      className={`text-xs font-semibold text-muted-foreground truncate ${
                        interactive ? "cursor-text" : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: props.authorRole || props.subheading || "Director of Digital Strategy, ScaleVenture" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Link Edit Modal */}
          {isEditingVideo && (
            <VideoEditItem
              currentVideoUrl={props.videoUrl || props.videoPreviewUrl}
              currentThumbnailUrl={props.videoPreviewUrl}
              onSave={(vUrl, tUrl) => {
                onUpdateProps?.({ videoUrl: vUrl, videoPreviewUrl: tUrl || vUrl });
                setIsEditingVideo(false);
                setIsPlayingVideo(true);
              }}
              onClose={() => setIsEditingVideo(false)}
            />
          )}

          {/* Interactive Item Management Toolbar (Only for multi-card layout variants) */}
          {interactive && selected && (variant === "3d-testimonial-deck" || variant === "bento-testimonial-grid" || variant === "wall-of-love-testimonials") && (
            <div className="mt-6 sm:mt-8 pt-4 border-t border-border/40 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const nextItems = [
                    ...items,
                    {
                      quote: "“Fantastic tool! Reduced our release timelines dramatically with stunning UI defaults.”",
                      authorName: "Jordan Lee",
                      authorRole: "Lead Frontend Engineer",
                      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                      rating: 5,
                      companyLogo: "DESIGNSTUDIO",
                      metricTag: "Verified Reviewer",
                    },
                  ];
                  onUpdateProps?.({ items: nextItems });
                  toast.success("New Review Card Added!");
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-bold text-xs rounded-xl shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" /> Add Review Card
              </button>

              {items.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextItems = [...items];
                    nextItems.pop();
                    onUpdateProps?.({ items: nextItems });
                  }}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove Last Card
                </button>
              )}
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

    const ctaBgImageStyle = (props.imageUrl && (props.imageLayout === "background" || variant === "fullbleed-cta")) ? {
      backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.88)), url("${props.imageUrl}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    } : {};

    const ctaBg = (style.backgroundColor && !isDefaultPresetCtaBg) ? style.backgroundColor : defaultBg;
    const ctaRadius = "0px";

    const ctaBgDark = (props.imageUrl && (props.imageLayout === "background" || variant === "fullbleed-cta")) ? true : isDarkColor(ctaBg);
    const isDarkBg = ctaBgDark !== undefined ? ctaBgDark : pageBgDark;

    const textColor = isDarkBg
      ? (style.textColor && isDarkColor(style.textColor) === false ? style.textColor : "#ffffff")
      : (style.textColor && isDarkColor(style.textColor) === true ? style.textColor : (theme.textColor || "#0f172a"));

    const subtextColor = isDarkBg ? "rgba(255, 255, 255, 0.85)" : "#475569";

    const isSplitLayout = variant === "split-headline-cta" || variant === "minimal-inline-cta" || variant === "app-preview-cta";
    const isFlipped = props.imagePosition === "left" || props.reverseLayout;

    const buttonsList = props.buttons || [
      {
        label: props.buttonText || "Get Started",
        href: props.buttonHref || "#",
        variant: "solid" as const,
      },
    ];

    const [activeCtaPopover, setActiveCtaPopover] = useState<string | null>(null);
    const isEditingCtaImage = activeCtaPopover === "image";
    const setIsEditingCtaImage = (val: boolean) => setActiveCtaPopover(val ? "image" : null);

    useEffect(() => {
      if (!selected) {
        setActiveCtaPopover(null);
      }
    }, [selected]);

    const renderCtaButtons = () => (
      <div className={`flex flex-wrap items-center gap-3 ${isMobileOrTablet || !isSplitLayout ? "justify-center" : "justify-start"}`}>
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
          ...ctaBgImageStyle,
        }}
        className={`py-16 md:py-20 transition-all ${
          isFollowingNavbar
            ? "min-h-[90vh] lg:min-h-[100vh] !pt-[130px] md:!pt-[170px] flex flex-col justify-center"
            : isDirectlyBelowNavbar
              ? "min-h-[85vh] lg:min-h-[calc(100vh-80px)] flex flex-col justify-center"
              : ""
        }`}
      >
        <Center maxWidth={effectiveMaxWidth} isMobile={isMobile}>
          {variant === "app-preview-cta" ? (
            <div className={`grid gap-8 items-center text-left ${isMobileOrTablet ? `grid-cols-1 ${isFlipped ? "flex flex-col-reverse" : ""}` : `grid-cols-1 md:grid-cols-12 ${isFlipped ? "md:flex-row-reverse" : ""}`}`}>
              <div className={`space-y-4 ${isMobileOrTablet ? "w-full text-center" : "md:col-span-6 text-left"} ${isFlipped ? "md:order-2" : "md:order-1"}`}>
                {props.heading && (
                  <h2
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    suppressHydrationWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.innerHTML;
                      if (newText && newText !== props.heading) onUpdateProps?.({ heading: newText });
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight ${interactive ? "cursor-text" : ""}`}
                   dangerouslySetInnerHTML={{ __html: props.heading }} />
                )}
                {props.subheading && (
                  <div
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    suppressHydrationWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.innerHTML;
                      if (newText && newText !== props.subheading) onUpdateProps?.({ subheading: newText });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`${isMobile ? "text-sm" : "text-base font-medium"} opacity-90 ${interactive ? "cursor-text" : ""}`}
                   dangerouslySetInnerHTML={{ __html: props.subheading }} />
                )}
                <div className={`pt-2 ${isMobileOrTablet ? "flex justify-center" : ""}`}>
                  {renderCtaButtons()}
                </div>
              </div>
              <div className={`${isMobileOrTablet ? "w-full" : "md:col-span-6"} ${isFlipped ? "md:order-1" : "md:order-2"}`}>
                <div className="relative overflow-hidden group">
                  <img
                    src={props.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"}
                    alt={props.imageAlt || "Platform Preview"}
                    style={{
                      borderRadius: props.imageBorderRadius || "20px",
                      objectFit: (props.imageObjectFit as any) || "cover",
                      aspectRatio: props.imageAspectRatio !== "auto" ? props.imageAspectRatio : undefined,
                    }}
                    className="w-full h-auto object-cover max-h-[360px] sm:max-h-[420px] shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
                  />
                  {interactive && (
                    <div className="absolute top-4 right-4 z-40">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditingCtaImage(!isEditingCtaImage);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-background/90 backdrop-blur-md border border-border text-foreground text-xs font-bold shadow-lg hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                        style={{ borderRadius: theme.borderRadius || "12px" }}
                      >
                        <ImageIcon className="h-3.5 w-3.5" /> Edit Image
                      </button>
                      {isEditingCtaImage && (
                        <div className="absolute top-12 right-0 z-50">
                          <ImageEditItem
                            currentUrl={props.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"}
                            currentAlt={props.imageAlt}
                            currentBorderRadius={props.imageBorderRadius}
                            currentObjectFit={props.imageObjectFit}
                            currentAspectRatio={props.imageAspectRatio}
                            hideLayoutOptions
                            onSave={(editProps) => {
                              onUpdateProps?.({
                                imageUrl: editProps.url,
                                imageAlt: editProps.alt,
                                imageBorderRadius: editProps.imageBorderRadius,
                                imageObjectFit: editProps.objectFit as any,
                                imageAspectRatio: editProps.aspectRatio as any,
                              });
                              setIsEditingCtaImage(false);
                            }}
                            onClose={() => setIsEditingCtaImage(false)}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : isSplitLayout ? (
            <div className={`flex justify-between gap-8 ${isMobileOrTablet ? `flex-col items-center text-center ${isFlipped ? "flex-col-reverse" : ""}` : `flex-col md:flex-row items-center ${isFlipped ? "md:flex-row-reverse" : ""}`}`}>
              <div className={`space-y-3 max-w-2xl w-full ${isMobileOrTablet ? "text-center" : "text-left"}`}>
                {props.heading && (
                  <h2
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    suppressHydrationWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.innerHTML;
                      if (newText && newText !== props.heading) {
                        onUpdateProps?.({ heading: newText });
                      }
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`${
                      isMobile ? "text-xl sm:text-2xl" : isTablet ? "text-2xl md:text-3xl" : "text-2xl md:text-3xl lg:text-4xl"
                    } font-extrabold tracking-tight ${interactive ? "cursor-text transition-all" : ""}`}
                   dangerouslySetInnerHTML={{ __html: props.heading }} />
                )}
                {props.subheading && (
                  <div
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    suppressHydrationWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.innerHTML;
                      if (newText && newText !== props.subheading) {
                        onUpdateProps?.({ subheading: newText });
                      }
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`${isMobile ? "text-sm" : "text-base font-medium"} opacity-90 ${
                      interactive ? "cursor-text transition-all" : ""
                    }`}
                   dangerouslySetInnerHTML={{ __html: props.subheading }} />
                )}
              </div>
              <div className={`shrink-0 ${isMobileOrTablet ? "w-full flex justify-center pt-2" : ""}`}>
                {renderCtaButtons()}
              </div>
            </div>
          ) : variant === "newsletter-input-cta" ? (
            <div className="max-w-2xl mx-auto text-center space-y-5 w-full py-4">
              {props.heading && (
                <h2
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  suppressHydrationWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerHTML;
                    if (newText && newText !== props.heading) onUpdateProps?.({ heading: newText });
                  }}
                  style={{ outline: "none", color: textColor }}
                  className={`${isMobile ? "text-xl" : isTablet ? "text-2xl" : "text-2xl sm:text-3xl md:text-4xl"} font-extrabold tracking-tight`}
                 dangerouslySetInnerHTML={{ __html: props.heading }} />
              )}
              {props.subheading && (
                <div
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  suppressHydrationWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerHTML;
                    if (newText && newText !== props.subheading) onUpdateProps?.({ subheading: newText });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className="text-xs sm:text-sm max-w-lg mx-auto opacity-90"
                 dangerouslySetInnerHTML={{ __html: props.subheading }} />
              )}
              <form onSubmit={(e) => e.preventDefault()} className={`flex ${isMobile ? "flex-col w-full" : "flex-col sm:flex-row"} items-center justify-center gap-3 max-w-md mx-auto pt-2`}>
                <input
                  type="email"
                  required={!interactive}
                  placeholder="Enter your work email..."
                  className={`w-full ${isMobile ? "w-full" : "sm:w-72"} px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20`}
                  style={{ backgroundColor: isDarkBg ? "rgba(255, 255, 255, 0.1)" : "#ffffff", borderColor: isDarkBg ? "rgba(255,255,255,0.2)" : "#cbd5e1", color: textColor, borderRadius: theme.borderRadius || "12px" }}
                />
                <button
                  type={interactive ? "button" : "submit"}
                  className={`w-full ${isMobile ? "w-full" : "sm:w-auto"} py-3 px-6 font-bold text-sm text-white shadow-lg transition-all hover:brightness-110 active:scale-95 cursor-pointer shrink-0`}
                  style={{ backgroundColor: primary, borderRadius: theme.borderRadius || "12px" }}
                >
                  <span
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    suppressHydrationWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.innerHTML;
                      if (newText) onUpdateProps?.({ buttonText: newText });
                    }}
                    className={interactive ? "cursor-text outline-none" : ""}
                  >
                    {props.buttonText || "Claim Free Access"}
                  </span>
                </button>
              </form>
              <div className="text-xs text-muted-foreground opacity-80 pt-1 flex items-center justify-center gap-1.5">
                <span
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  suppressHydrationWarning
                  onBlur={(e) => {
                    const clean = cleanPlainText(e.currentTarget.innerText || e.currentTarget.textContent || "");
                    if (clean) onUpdateProps?.({ copyright: clean });
                  }}
                  className={interactive ? "cursor-text outline-none hover:bg-foreground/5 rounded px-1 transition-all" : ""}
                >
                  {cleanPlainText(props.copyright) || "No credit card required. Cancel anytime."}
                </span>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {variant === "gradient-glow-cta" && (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold mb-2 ${
                  isDarkBg ? "bg-white/10 backdrop-blur-md border-white/20 text-white" : "bg-primary/10 border-primary/20 text-primary"
                }`}>
                  <span className="shrink-0">✦</span>
                  <span
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    suppressHydrationWarning
                    onBlur={(e) => {
                      const clean = cleanPlainText(e.currentTarget.innerText || e.currentTarget.textContent || "");
                      if (clean) onUpdateProps?.({ tagline: clean });
                    }}
                    className={interactive ? "cursor-text outline-none hover:bg-foreground/5 rounded px-1 transition-all" : ""}
                  >
                    {cleanPlainText(props.tagline) || "ANNOUNCEMENT: PRO EDITION v2.0"}
                  </span>
                </div>
              )}
              {props.heading && (
                <h2
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  suppressHydrationWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerHTML;
                    if (newText && newText !== props.heading) {
                      onUpdateProps?.({ heading: newText });
                    }
                  }}
                  style={{ outline: "none", color: textColor }}
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight cursor-text transition-all"
                 dangerouslySetInnerHTML={{ __html: props.heading }} />
              )}
              {props.subheading && (
                <div
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  suppressHydrationWarning
                  onBlur={(e) => {
                    const newText = e.currentTarget.innerHTML;
                    if (newText && newText !== props.subheading) {
                      onUpdateProps?.({ subheading: newText });
                    }
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`${isMobile ? "text-sm" : "text-base sm:text-lg md:text-xl"} opacity-90 max-w-2xl mx-auto ${
                    interactive ? "cursor-text transition-all" : ""
                  }`}
                 dangerouslySetInnerHTML={{ __html: props.subheading }} />
              )}
              <div className="pt-2">
                {renderCtaButtons()}
              </div>

              {variant === "gradient-glow-cta" && (
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-semibold opacity-90">
                  {(props.items && props.items.length > 0
                    ? props.items
                    : [
                        { title: "Custom Domains", description: "" },
                        { title: "React Code Export", description: "" },
                        { title: "24/7 Priority Support", description: "" },
                      ]
                  ).map((item, idx, arr) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-black">✓</span>
                      <span
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        suppressHydrationWarning
                        onBlur={(e) => {
                          const clean = cleanPlainText(e.currentTarget.innerText || e.currentTarget.textContent || "");
                          if (clean) {
                            const updated = [...arr];
                            updated[idx] = { ...updated[idx], title: clean };
                            onUpdateProps?.({ items: updated });
                          }
                        }}
                        className={interactive ? "cursor-text outline-none hover:bg-foreground/5 rounded px-1 transition-all" : ""}
                      >
                        {cleanPlainText(item.title) || item.title}
                      </span>
                    </span>
                  ))}
                </div>
              )}

              {variant === "full-width-primary" && (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs font-semibold opacity-85">
                  <span className="text-amber-400 tracking-widest">★ ★ ★ ★ ★</span>
                  <span
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    suppressHydrationWarning
                    onBlur={(e) => {
                      const clean = cleanPlainText(e.currentTarget.innerText || e.currentTarget.textContent || "");
                      if (clean) onUpdateProps?.({ tagline: clean });
                    }}
                    className={interactive ? "cursor-text outline-none hover:bg-foreground/5 rounded px-1 transition-all" : ""}
                  >
                    {cleanPlainText(props.tagline) || "Rated 4.9/5 by 10,000+ creators worldwide"}
                  </span>
                </div>
              )}
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
    const defaultSocials = [
      { platform: "facebook", url: "https://facebook.com" },
      { platform: "github", url: "https://github.com" },
      { platform: "twitter", url: "https://twitter.com" },
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "linkedin", url: "https://linkedin.com" },
    ];
    const socials = props.socialLinks !== undefined ? props.socialLinks : defaultSocials;

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
                  const next = e.currentTarget.innerHTML;
                  if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                }}
                style={{ outline: "none", color: textColor }}
                className={`text-2xl font-black tracking-tight ${interactive ? "cursor-text transition-all" : ""}`}
               dangerouslySetInnerHTML={{ __html: logoText }} />
              <p
                contentEditable={interactive}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const next = e.currentTarget.innerHTML;
                  if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                }}
                style={{ outline: "none", color: subtextColor }}
                className={`text-sm ${interactive ? "cursor-text transition-all" : ""}`}
               dangerouslySetInnerHTML={{ __html: tagline }} />
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
              <div className="pt-6 border-t flex flex-col items-center gap-4" style={{ borderColor }}>
                <RenderFooterSocialIcons socials={socials} textColor={textColor} borderColor={borderColor} interactive={interactive} onUpdateSocials={(updated) => onUpdateProps?.({ socialLinks: updated })} justify="center" />
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`text-xs opacity-60 ${interactive ? "cursor-text transition-all" : ""}`}
                 dangerouslySetInnerHTML={{ __html: copyright }} />
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
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== (props.heading || "Stay updated with our latest news")) {
                        onUpdateProps?.({ heading: next });
                      }
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-lg md:text-xl font-bold ${interactive ? "cursor-text transition-all" : ""}`}
                   dangerouslySetInnerHTML={{ __html: props.heading || "Stay updated with our latest news" }} />
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-xs ${interactive ? "cursor-text transition-all" : ""}`}
                   dangerouslySetInnerHTML={{ __html: tagline }} />
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
              <div className={`grid gap-8 text-left ${isMobileOrTablet ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4"}`}>
                <div className={`space-y-3 text-left ${isMobileOrTablet ? "w-full" : "lg:col-span-2"}`}>
                  <h3
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-xl font-black whitespace-nowrap ${interactive ? "cursor-text transition-all" : ""}`}
                   dangerouslySetInnerHTML={{ __html: logoText }} />
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-xs max-w-sm ${interactive ? "cursor-text transition-all" : ""}`}
                   dangerouslySetInnerHTML={{ __html: tagline }} />
                </div>
                <div className={`${isMobileOrTablet ? "w-full" : "lg:col-span-2"} grid grid-cols-2 gap-6`}>
                  {columnsList.map((col: any, cIdx: number) => (
                    <div key={cIdx} className="space-y-3 text-xs text-left">
                      <h5
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          if (next && next !== col.title) {
                            const updatedCols = [...columnsList];
                            updatedCols[cIdx] = { ...updatedCols[cIdx], title: next };
                            onUpdateProps?.({ columns: updatedCols });
                          }
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-bold uppercase tracking-wider text-[11px] ${interactive ? "cursor-text transition-all" : ""}`}
                       dangerouslySetInnerHTML={{ __html: col.title }} />
                      <ul className="space-y-2">
                        {col.links.map((lnk: string, lIdx: number) => (
                          <li key={lIdx} className="block">
                            <span
                              contentEditable={interactive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerHTML;
                                if (next && next !== lnk) {
                                  const updatedCols = [...columnsList];
                                  const nextLinks = [...updatedCols[cIdx].links];
                                  nextLinks[lIdx] = next;
                                  updatedCols[cIdx] = { ...updatedCols[cIdx], links: nextLinks };
                                  onUpdateProps?.({ columns: updatedCols });
                                }
                              }}
                              style={{ outline: "none", color: subtextColor }}
                              className={`hover:opacity-100 transition-opacity block ${interactive ? "cursor-text" : ""}`}
                             dangerouslySetInnerHTML={{ __html: lnk }} />
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
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={interactive ? "cursor-text transition-all" : ""}
                 dangerouslySetInnerHTML={{ __html: copyright }} />
                <div className="flex flex-wrap items-center justify-center gap-6" style={{ color: subtextColor }}>
                  <RenderFooterSocialIcons socials={socials} textColor={textColor} borderColor={borderColor} interactive={interactive} onUpdateSocials={(updated) => onUpdateProps?.({ socialLinks: updated })} />
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
          ) : variant === "dark-tech-dock" ? (
            <div className="space-y-8">
              <div className={`p-8 md:p-10 border flex ${isMobileOrTablet ? "flex-col items-center text-center space-y-8" : "flex-row justify-between items-center"}`}
                   style={{ backgroundColor: isLightBg ? "rgba(15,23,42,0.03)" : "rgba(255,255,255,0.05)", borderColor, borderRadius: theme.borderRadius === "0px" ? "0px" : "24px" }}>
                <div className={`flex items-center gap-4 ${isMobileOrTablet ? "flex-col text-center" : "text-left"}`}>
                  <div className="flex-shrink-0 h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                  <div className="space-y-1">
                    <h3
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                      }}
                      style={{ outline: "none", color: textColor }}
                      className={`font-black tracking-tight text-xl ${interactive ? "cursor-text" : ""}`}
                     dangerouslySetInnerHTML={{ __html: logoText }} />
                    <p
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                      }}
                      style={{ outline: "none", color: subtextColor }}
                      className={`text-xs opacity-80 max-w-sm ${interactive ? "cursor-text" : ""}`}
                     dangerouslySetInnerHTML={{ __html: tagline }} />
                  </div>
                </div>
                
                <div className={`flex flex-wrap items-center gap-4 ${isMobileOrTablet ? "justify-center" : ""}`}>
                  <RenderFooterSocialIcons socials={socials} textColor={textColor} borderColor={borderColor} interactive={interactive} onUpdateSocials={(updated) => onUpdateProps?.({ socialLinks: updated })} />
                  {navLinks.map((l: any, idx: number) => (
                    <div key={idx} className="group/link relative inline-flex items-center">
                      <a
                        href={l.href || "#"}
                        className="px-4 py-2 text-xs font-semibold rounded-full hover:bg-foreground/5 border transition-all"
                        style={{ color: textColor, borderColor }}
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
                        <LinkEditItem link={{ label: l.label, href: l.href || "#" }} sectionOptions={sectionOptions} positionUp={true} onSave={(label, newHref) => { const next = [...navLinks]; next[idx] = { ...next[idx], label, href: newHref }; onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onRemove={() => { const next = [...navLinks]; next.splice(idx, 1); onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onClose={() => setActiveFooterPopover(null)} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <span
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`text-xs opacity-60 ${interactive ? "cursor-text" : ""}`}
                 dangerouslySetInnerHTML={{ __html: copyright }} />
              </div>
            </div>
          ) : variant === "stacked-brand-statement" ? (
            <div className="space-y-16 pt-8">
              <div className="text-center">
                 <h2
                   contentEditable={interactive}
                   suppressContentEditableWarning
                   onBlur={(e) => {
                     const next = e.currentTarget.innerHTML;
                     if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                   }}
                   style={{ outline: "none", color: textColor }}
                   className={`text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter ${interactive ? "cursor-text" : ""}`}
                  dangerouslySetInnerHTML={{ __html: logoText }} />
                 <p
                   contentEditable={interactive}
                   suppressContentEditableWarning
                   onBlur={(e) => {
                     const next = e.currentTarget.innerHTML;
                     if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                   }}
                   style={{ outline: "none", color: subtextColor }}
                   className={`mt-6 text-xs md:text-sm font-bold tracking-[0.3em] uppercase ${interactive ? "cursor-text" : ""}`}
                  dangerouslySetInnerHTML={{ __html: tagline }} />
              </div>
              <div className={`grid gap-12 text-center ${isMobileOrTablet ? "grid-cols-1" : "grid-cols-2 max-w-3xl mx-auto"}`}>
                 {columnsList.slice(0, 2).map((col: any, cIdx: number) => (
                    <div key={cIdx} className="space-y-5">
                      <h5
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          if (next && next !== col.title) {
                            const updatedCols = [...columnsList];
                            updatedCols[cIdx] = { ...updatedCols[cIdx], title: next };
                            onUpdateProps?.({ columns: updatedCols });
                          }
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-bold uppercase tracking-wider text-xs ${interactive ? "cursor-text transition-all" : ""}`}
                       dangerouslySetInnerHTML={{ __html: col.title }} />
                      <ul className="space-y-3">
                        {col.links.map((lnk: string, lIdx: number) => (
                          <li key={lIdx} className="block">
                            <span
                              contentEditable={interactive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerHTML;
                                if (next && next !== lnk) {
                                  const updatedCols = [...columnsList];
                                  const nextLinks = [...updatedCols[cIdx].links];
                                  nextLinks[lIdx] = next;
                                  updatedCols[cIdx] = { ...updatedCols[cIdx], links: nextLinks };
                                  onUpdateProps?.({ columns: updatedCols });
                                }
                              }}
                              style={{ outline: "none", color: subtextColor }}
                              className={`hover:opacity-100 transition-opacity block ${interactive ? "cursor-text" : ""}`}
                             dangerouslySetInnerHTML={{ __html: lnk }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                 ))}
              </div>
              <div className={`pt-10 border-t flex items-center justify-between text-xs gap-4 ${isMobileOrTablet ? "flex-col text-center" : "flex-col lg:flex-row lg:text-left"}`} style={{ borderColor }}>
                <span
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={interactive ? "cursor-text transition-all" : ""}
                 dangerouslySetInnerHTML={{ __html: copyright }} />
                <div className="flex flex-wrap justify-center items-center gap-6" style={{ color: subtextColor }}>
                  <RenderFooterSocialIcons socials={socials} textColor={textColor} borderColor={borderColor} interactive={interactive} onUpdateSocials={(updated) => onUpdateProps?.({ socialLinks: updated })} justify="center" />
                  {navLinks.map((l: any, idx: number) => (
                    <div key={idx} className="group/link relative inline-flex items-center">
                      <a
                        href={l.href || "#"}
                        className="hover:opacity-100 transition-opacity uppercase font-bold tracking-widest text-[10px]"
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
                        <LinkEditItem link={{ label: l.label, href: l.href || "#" }} sectionOptions={sectionOptions} alignRight={true} positionUp={true} onSave={(label, newHref) => { const next = [...navLinks]; next[idx] = { ...next[idx], label, href: newHref }; onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onRemove={() => { const next = [...navLinks]; next.splice(idx, 1); onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onClose={() => setActiveFooterPopover(null)} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : variant === "compact-bottom-bar" ? (
            <div className={`flex items-center justify-between gap-6 ${isMobileOrTablet ? "flex-col text-center" : "flex-row"}`}>
              <h3
                contentEditable={interactive}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const next = e.currentTarget.innerHTML;
                  if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                }}
                style={{ outline: "none", color: textColor }}
                className={`text-lg font-bold tracking-tight ${interactive ? "cursor-text" : ""}`}
               dangerouslySetInnerHTML={{ __html: logoText }} />
              <span
                contentEditable={interactive}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const next = e.currentTarget.innerHTML;
                  if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                }}
                style={{ outline: "none", color: subtextColor }}
                className={`text-xs opacity-75 ${interactive ? "cursor-text" : ""}`}
               dangerouslySetInnerHTML={{ __html: copyright }} />
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold" style={{ color: subtextColor }}>
                <RenderFooterSocialIcons socials={socials} textColor={textColor} borderColor={borderColor} interactive={interactive} onUpdateSocials={(updated) => onUpdateProps?.({ socialLinks: updated })} />
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
                      <LinkEditItem link={{ label: l.label, href: l.href || "#" }} sectionOptions={sectionOptions} positionUp={true} onSave={(label, newHref) => { const next = [...navLinks]; next[idx] = { ...next[idx], label, href: newHref }; onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onRemove={() => { const next = [...navLinks]; next.splice(idx, 1); onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onClose={() => setActiveFooterPopover(null)} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : variant === "footer-graphy" ? (
            <div className="space-y-12">
              <div className={`grid gap-12 text-left ${isMobileOrTablet ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-12"}`}>
                <div className={`space-y-6 ${isMobileOrTablet ? "w-full" : "lg:col-span-5"}`}>
                  <div className="flex items-center gap-3">
                    <div className="bg-foreground text-background p-1.5 rounded-lg">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                    </div>
                    <h3
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                      }}
                      style={{ outline: "none", color: textColor }}
                      className={`text-xl font-bold ${interactive ? "cursor-text" : ""}`}
                     dangerouslySetInnerHTML={{ __html: logoText }} />
                  </div>
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-sm leading-relaxed max-w-sm ${interactive ? "cursor-text" : ""}`}
                   dangerouslySetInnerHTML={{ __html: tagline }} />
                  <div className="pt-2">
                    <RenderFooterSocialIcons socials={socials} textColor={textColor} borderColor={borderColor} interactive={interactive} onUpdateSocials={(updated) => onUpdateProps?.({ socialLinks: updated })} />
                  </div>
                </div>
                <div className={`grid gap-8 ${isMobile ? "grid-cols-2" : isMobileOrTablet ? "grid-cols-3" : "lg:col-span-7 grid-cols-2 md:grid-cols-3"}`}>
                  {columnsList.map((col: any, cIdx: number) => (
                    <div key={cIdx} className="space-y-4 text-sm text-left">
                      <h5
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          if (next && next !== col.title) {
                            const updatedCols = [...columnsList];
                            updatedCols[cIdx] = { ...updatedCols[cIdx], title: next };
                            onUpdateProps?.({ columns: updatedCols });
                          }
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-semibold ${interactive ? "cursor-text" : ""}`}
                       dangerouslySetInnerHTML={{ __html: col.title }} />
                      <ul className="space-y-3">
                        {col.links.map((lnk: string, lIdx: number) => (
                          <li key={lIdx} className="block">
                            <span
                              contentEditable={interactive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerHTML;
                                if (next && next !== lnk) {
                                  const updatedCols = [...columnsList];
                                  const nextLinks = [...updatedCols[cIdx].links];
                                  nextLinks[lIdx] = next;
                                  updatedCols[cIdx] = { ...updatedCols[cIdx], links: nextLinks };
                                  onUpdateProps?.({ columns: updatedCols });
                                }
                              }}
                              style={{ outline: "none", color: subtextColor }}
                              className={`text-sm hover:opacity-100 transition-opacity block ${interactive ? "cursor-text" : ""}`}
                             dangerouslySetInnerHTML={{ __html: lnk }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`pt-8 border-t flex items-center justify-between text-sm gap-4 ${isMobileOrTablet ? "flex-col text-center" : "flex-col lg:flex-row lg:text-left"}`} style={{ borderColor }}>
                <span
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={interactive ? "cursor-text" : ""}
                 dangerouslySetInnerHTML={{ __html: copyright }} />
                <div className="flex flex-wrap items-center justify-center gap-6" style={{ color: subtextColor }}>
                  <RenderFooterSocialIcons socials={socials} textColor={textColor} borderColor={borderColor} interactive={interactive} onUpdateSocials={(updated) => onUpdateProps?.({ socialLinks: updated })} />
                  {navLinks.map((l: any, idx: number) => (
                    <div key={idx} className="group/link relative inline-flex items-center">
                      <a
                        href={l.href || "#"}
                        className="hover:underline underline-offset-4 decoration-muted-foreground/30 transition-all"
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
                        <LinkEditItem link={{ label: l.label, href: l.href || "#" }} sectionOptions={sectionOptions} positionUp={true} onSave={(label, newHref) => { const next = [...navLinks]; next[idx] = { ...next[idx], label, href: newHref }; onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onRemove={() => { const next = [...navLinks]; next.splice(idx, 1); onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onClose={() => setActiveFooterPopover(null)} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : variant === "footer-square-ui" ? (
            <div className="space-y-16">
              <div className={`grid gap-12 text-left ${isMobileOrTablet ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-12"}`}>
                <div className={`space-y-4 ${isMobileOrTablet ? "w-full" : "lg:col-span-4"}`}>
                  <div className="flex items-center gap-3">
                    <div className="text-foreground">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    </div>
                    <h3
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                      }}
                      style={{ outline: "none", color: textColor }}
                      className={`text-xl font-bold ${interactive ? "cursor-text" : ""}`}
                     dangerouslySetInnerHTML={{ __html: logoText }} />
                  </div>
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-sm leading-relaxed max-w-xs pt-2 ${interactive ? "cursor-text" : ""}`}
                   dangerouslySetInnerHTML={{ __html: tagline }} />
                </div>
                
                <div className={`grid gap-8 ${isMobileOrTablet ? "grid-cols-2" : "lg:col-span-4 grid-cols-2"}`}>
                  {columnsList.map((col: any, cIdx: number) => (
                    <div key={cIdx} className="space-y-6 text-sm text-left">
                      <h5
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          if (next && next !== col.title) {
                            const updatedCols = [...columnsList];
                            updatedCols[cIdx] = { ...updatedCols[cIdx], title: next };
                            onUpdateProps?.({ columns: updatedCols });
                          }
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-semibold ${interactive ? "cursor-text" : ""}`}
                       dangerouslySetInnerHTML={{ __html: col.title }} />
                      <ul className="space-y-4">
                        {col.links.map((lnk: string, lIdx: number) => (
                          <li key={lIdx} className="block">
                            <span
                              contentEditable={interactive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerHTML;
                                if (next && next !== lnk) {
                                  const updatedCols = [...columnsList];
                                  const nextLinks = [...updatedCols[cIdx].links];
                                  nextLinks[lIdx] = next;
                                  updatedCols[cIdx] = { ...updatedCols[cIdx], links: nextLinks };
                                  onUpdateProps?.({ columns: updatedCols });
                                }
                              }}
                              style={{ outline: "none", color: subtextColor }}
                              className={`text-sm hover:opacity-100 transition-opacity flex items-center gap-1.5 ${interactive ? "cursor-text" : ""}`}
                            >
                              {lnk}
                              {cIdx === 1 && <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className={`space-y-4 ${isMobileOrTablet ? "w-full pt-8" : "lg:col-span-4"}`}>
                  <h5 style={{ color: textColor }} className="font-semibold text-sm">Newsletter</h5>
                  <p style={{ color: subtextColor }} className="text-sm pb-2">Receive product updates news, exclusive discounts and early access.</p>
                  <div className="relative flex items-center w-full max-w-sm rounded-full bg-background border p-1.5" style={{ borderColor }}>
                    <span className="pl-4 opacity-50" style={{ color: textColor }}>@</span>
                    <input type="text" placeholder="Enter your email..." className="flex-1 bg-transparent border-none focus:outline-none text-sm px-3 py-2" style={{ color: textColor }} disabled={interactive} />
                    <button className="bg-foreground text-background h-10 w-12 rounded-full flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity" disabled={interactive}>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className={`pt-12 flex items-center justify-between text-xs gap-4 ${isMobileOrTablet ? "flex-col text-center" : "flex-row text-left"}`}>
                <span
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={interactive ? "cursor-text" : ""}
                 dangerouslySetInnerHTML={{ __html: copyright }} />
                <RenderFooterSocialIcons socials={socials} textColor={textColor} borderColor={borderColor} interactive={interactive} />
              </div>
            </div>
          ) : variant === "footer-azimute" ? (
            <div className="space-y-12">
              <div className={`flex items-center justify-between text-left ${isMobileOrTablet ? "flex-col items-start gap-4" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="text-blue-600">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <h3
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-2xl font-bold tracking-tight ${interactive ? "cursor-text" : ""}`}
                   dangerouslySetInnerHTML={{ __html: logoText }} />
                </div>
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`text-sm font-medium ${interactive ? "cursor-text" : ""}`}
                 dangerouslySetInnerHTML={{ __html: tagline }} />
              </div>

              <div className="w-full border-t" style={{ borderColor }}></div>

              <div className={`grid gap-12 text-left ${isMobile ? "grid-cols-1" : isMobileOrTablet ? "grid-cols-2" : "grid-cols-4"}`}>
                {columnsList.map((col: any, cIdx: number) => (
                  <div key={cIdx} className="space-y-6 text-sm">
                    <h5
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== col.title) {
                          const updatedCols = [...columnsList];
                          updatedCols[cIdx] = { ...updatedCols[cIdx], title: next };
                          onUpdateProps?.({ columns: updatedCols });
                        }
                      }}
                      style={{ outline: "none", color: textColor }}
                      className={`font-bold ${interactive ? "cursor-text" : ""}`}
                     dangerouslySetInnerHTML={{ __html: col.title }} />
                    <ul className="space-y-4">
                      {col.links.map((lnk: string, lIdx: number) => (
                        <li key={lIdx} className="block">
                          <span
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              if (next && next !== lnk) {
                                const updatedCols = [...columnsList];
                                const nextLinks = [...updatedCols[cIdx].links];
                                nextLinks[lIdx] = next;
                                updatedCols[cIdx] = { ...updatedCols[cIdx], links: nextLinks };
                                onUpdateProps?.({ columns: updatedCols });
                              }
                            }}
                            style={{ outline: "none", color: subtextColor }}
                            className={`text-sm hover:opacity-100 transition-opacity block ${interactive ? "cursor-text" : ""}`}
                           dangerouslySetInnerHTML={{ __html: lnk }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                <div className="space-y-6 text-sm">
                  <h5 style={{ color: textColor }} className="font-bold">Contacto</h5>
                  <ul className="space-y-5">
                    <li className="flex items-center gap-3">
                      <div className="p-2 border rounded-md text-blue-500 bg-blue-50/50" style={{ borderColor }}>
                        <Mail className="w-4 h-4" />
                      </div>
                      <span style={{ color: subtextColor }}>info@azimute.pt</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="p-2 border rounded-md text-blue-500 bg-blue-50/50" style={{ borderColor }}>
                        <Phone className="w-4 h-4" />
                      </div>
                      <span style={{ color: subtextColor }}>+351 123 456 789</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="p-2 border rounded-md text-blue-500 bg-blue-50/50" style={{ borderColor }}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span style={{ color: subtextColor }}>Lisboa, Portugal</span>
                    </li>
                  </ul>
                </div>

                <div className={`space-y-6 flex flex-col ${isMobileOrTablet ? "items-start" : "items-end"}`}>
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted/50 transition-colors text-sm" style={{ color: textColor, borderColor }}>
                    <Globe className="w-4 h-4" />
                    <span>Português</span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </button>
                  <div className="pt-2">
                    <RenderFooterSocialIcons socials={socials} textColor={textColor} borderColor={borderColor} interactive={interactive} />
                  </div>
                </div>
              </div>

              <div className={`pt-12 flex items-center justify-between text-xs gap-4 ${isMobileOrTablet ? "flex-col text-center" : "flex-row text-left"}`}>
                <span
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={interactive ? "cursor-text" : ""}
                 dangerouslySetInnerHTML={{ __html: copyright }} />
                <div className="flex flex-wrap items-center justify-center gap-6" style={{ color: subtextColor }}>
                  {navLinks.map((l: any, idx: number) => (
                    <div key={idx} className="group/link relative inline-flex items-center">
                      <a
                        href={l.href || "#"}
                        className="hover:underline underline-offset-4 decoration-muted-foreground/30 transition-all"
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
                        <LinkEditItem link={{ label: l.label, href: l.href || "#" }} sectionOptions={sectionOptions} positionUp={true} onSave={(label, newHref) => { const next = [...navLinks]; next[idx] = { ...next[idx], label, href: newHref }; onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onRemove={() => { const next = [...navLinks]; next.splice(idx, 1); onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onClose={() => setActiveFooterPopover(null)} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : variant === "footer-blue-office" ? (
            <div className="space-y-12 text-sm">
              <div className={`flex items-center justify-between text-left ${isMobileOrTablet ? "flex-col items-start gap-4" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="text-foreground">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  </div>
                  <h3
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-xl font-semibold ${interactive ? "cursor-text" : ""}`}
                   dangerouslySetInnerHTML={{ __html: logoText }} />
                </div>
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                  }}
                  style={{ outline: "none", color: textColor }}
                  className={`font-medium ${interactive ? "cursor-text" : ""}`}
                 dangerouslySetInnerHTML={{ __html: tagline }} />
              </div>

              <div className="w-full border-t" style={{ borderColor }}></div>

              <div className={`grid gap-12 text-left ${isMobile ? "grid-cols-1" : isMobileOrTablet ? "grid-cols-3" : "grid-cols-6"}`}>
                <div className={`space-y-6 ${isMobileOrTablet ? "col-span-full" : "col-span-2"}`} style={{ color: subtextColor }}>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">The Blue Office A/S</p>
                    <p>123 Office Way,</p>
                    <p>8000 Aarhus, Denmark</p>
                  </div>
                  <div className="space-y-1">
                    <p>info@theblueoffice.com</p>
                    <p>+45 12 34 56 78</p>
                  </div>
                  <div className="grid grid-cols-2 max-w-xs pt-2 text-xs">
                    <div>
                      <p>Monday - Friday</p>
                      <p>Saturday - Sunday</p>
                    </div>
                    <div className="text-right">
                      <p>10.00 - 14.00</p>
                      <p>Closed</p>
                    </div>
                  </div>
                </div>

                {columnsList.map((col: any, cIdx: number) => (
                  <div key={cIdx} className="space-y-6">
                    <h5
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== col.title) {
                          const updatedCols = [...columnsList];
                          updatedCols[cIdx] = { ...updatedCols[cIdx], title: next };
                          onUpdateProps?.({ columns: updatedCols });
                        }
                      }}
                      style={{ outline: "none", color: textColor }}
                      className={`font-semibold ${interactive ? "cursor-text" : ""}`}
                     dangerouslySetInnerHTML={{ __html: col.title }} />
                    <ul className="space-y-4">
                      {col.links.map((lnk: string, lIdx: number) => (
                        <li key={lIdx} className="block">
                          <span
                            contentEditable={interactive}
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const next = e.currentTarget.innerHTML;
                              if (next && next !== lnk) {
                                const updatedCols = [...columnsList];
                                const nextLinks = [...updatedCols[cIdx].links];
                                nextLinks[lIdx] = next;
                                updatedCols[cIdx] = { ...updatedCols[cIdx], links: nextLinks };
                                onUpdateProps?.({ columns: updatedCols });
                              }
                            }}
                            style={{ outline: "none", color: subtextColor }}
                            className={`hover:opacity-100 transition-opacity block ${interactive ? "cursor-text" : ""}`}
                           dangerouslySetInnerHTML={{ __html: lnk }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="w-full border-t" style={{ borderColor }}></div>

              <div className={`pt-2 grid gap-6 items-center text-xs ${isMobileOrTablet ? "grid-cols-1 text-center" : "grid-cols-3"}`}>
                <div className={isMobileOrTablet ? "order-3" : "order-1 text-left"}>
                  <span
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={interactive ? "cursor-text" : ""}
                   dangerouslySetInnerHTML={{ __html: copyright }} />
                </div>
                
                <div className={`flex items-center justify-center ${isMobileOrTablet ? "order-1" : "order-2"}`}>
                  <RenderFooterSocialIcons socials={socials} textColor={textColor} borderColor={borderColor} interactive={interactive} justify="center" />
                </div>

                <div className={`flex flex-wrap items-center gap-6 ${isMobileOrTablet ? "justify-center order-2" : "justify-end order-3"}`} style={{ color: subtextColor }}>
                  {navLinks.map((l: any, idx: number) => (
                    <div key={idx} className="group/link relative inline-flex items-center">
                      <a
                        href={l.href || "#"}
                        className="hover:underline underline-offset-4 decoration-muted-foreground/30 transition-all font-medium"
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
                        <LinkEditItem link={{ label: l.label, href: l.href || "#" }} sectionOptions={sectionOptions} positionUp={true} onSave={(label, newHref) => { const next = [...navLinks]; next[idx] = { ...next[idx], label, href: newHref }; onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onRemove={() => { const next = [...navLinks]; next.splice(idx, 1); onUpdateProps?.({ links: next }); setActiveFooterPopover(null); }} onClose={() => setActiveFooterPopover(null)} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Multi-Column Links Default */
            <div className="space-y-12">
              <div className={`grid gap-8 text-left ${isMobileOrTablet ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-5 lg:gap-12"}`}>
                <div className={`space-y-3 text-left ${isMobileOrTablet ? "w-full" : "lg:col-span-2"}`}>
                  <h3
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== logoText) onUpdateProps?.({ logoText: next });
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-2xl font-black whitespace-nowrap ${interactive ? "cursor-text transition-all" : ""}`}
                   dangerouslySetInnerHTML={{ __html: logoText }} />
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== tagline) onUpdateProps?.({ tagline: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-sm max-w-sm ${interactive ? "cursor-text transition-all" : ""}`}
                   dangerouslySetInnerHTML={{ __html: tagline }} />
                </div>
                <div className={`grid gap-6 ${isMobile ? "grid-cols-2" : isMobileOrTablet ? "grid-cols-3" : "lg:col-span-3 grid-cols-2 md:grid-cols-3"}`}>
                  {columnsList.map((col: any, cIdx: number) => (
                    <div key={cIdx} className="space-y-3 text-sm text-left">
                      <h5
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          if (next && next !== col.title) {
                            const updatedCols = [...columnsList];
                            updatedCols[cIdx] = { ...updatedCols[cIdx], title: next };
                            onUpdateProps?.({ columns: updatedCols });
                          }
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-bold uppercase tracking-wider text-xs ${interactive ? "cursor-text transition-all" : ""}`}
                       dangerouslySetInnerHTML={{ __html: col.title }} />
                      <ul className="space-y-2.5">
                        {col.links.map((lnk: string, lIdx: number) => (
                          <li key={lIdx} className="block">
                            <span
                              contentEditable={interactive}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const next = e.currentTarget.innerHTML;
                                if (next && next !== lnk) {
                                  const updatedCols = [...columnsList];
                                  const nextLinks = [...updatedCols[cIdx].links];
                                  nextLinks[lIdx] = next;
                                  updatedCols[cIdx] = { ...updatedCols[cIdx], links: nextLinks };
                                  onUpdateProps?.({ columns: updatedCols });
                                }
                              }}
                              style={{ outline: "none", color: subtextColor }}
                              className={`hover:opacity-100 transition-opacity block ${interactive ? "cursor-text" : ""}`}
                             dangerouslySetInnerHTML={{ __html: lnk }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`pt-8 border-t flex items-center justify-between text-xs gap-4 ${isMobileOrTablet ? "flex-col text-center" : "flex-col lg:flex-row lg:text-left"}`} style={{ borderColor }}>
                <span
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== copyright) onUpdateProps?.({ copyright: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={interactive ? "cursor-text transition-all" : ""}
                 dangerouslySetInnerHTML={{ __html: copyright }} />
                <RenderFooterSocialIcons socials={socials} textColor={textColor} borderColor={borderColor} interactive={interactive} />
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
    const isFlipped = props.imagePosition === "left" || props.reverseLayout;

    return (
      <section
        {...aosAttrs}
        id={currentSectionId}
        style={{ ...css, backgroundColor: sectionBg }}
        className={`py-8 sm:py-24 transition-all relative w-full ${
          isFollowingNavbar
            ? "min-h-[90vh] lg:min-h-[100vh] !pt-[130px] md:!pt-[170px] flex flex-col justify-center"
            : isDirectlyBelowNavbar
              ? "min-h-[85vh] lg:min-h-[calc(100vh-80px)] flex flex-col justify-center"
              : ""
        }`}
      >
        <Center maxWidth={sectionMaxWidth} isMobile={isMobile}>
          {/* Variant 1: classic-centered-form */}
          {(variant === "classic-centered-form" || !variant) && (
            <div
              className={`w-full max-w-2xl sm:max-w-3xl mx-auto border ${borderColor} shadow-xl backdrop-blur-md ${
                isMobile ? "p-4 sm:p-6 space-y-5" : isTablet ? "p-6 sm:p-8 space-y-6" : "p-8 sm:p-12 space-y-8"
              }`}
              style={{
                backgroundColor: cardBg,
                borderRadius: theme.borderRadius || "20px",
              }}
            >
              <div className="text-center space-y-2.5">
                <h2
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== heading) onUpdateProps?.({ heading: next });
                  }}
                  style={{ outline: "none", color: textColor }}
                  className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${interactive ? "cursor-text" : ""}`}
                 dangerouslySetInnerHTML={{ __html: heading }} />
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== subheading) onUpdateProps?.({ subheading: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`text-xs sm:text-sm md:text-base max-w-lg mx-auto ${interactive ? "cursor-text" : ""}`}
                 dangerouslySetInnerHTML={{ __html: subheading }} />
              </div>

              <form onSubmit={(e) => { e.preventDefault(); if (!interactive) handleSubmit(e); }} className="space-y-4 text-left">
                  <div className={`grid gap-4 ${isMobileOrTablet ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                    <div className={`space-y-1.5 w-full min-w-0 ${isFlipped ? "order-2 md:order-2" : "order-1 md:order-1"}`}>
                      <label className="text-xs font-semibold text-foreground/80">Full Name</label>
                      <input
                        type="text"
                        required={!interactive}
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                    <div className={`space-y-1.5 w-full min-w-0 ${isFlipped ? "order-1 md:order-1" : "order-2 md:order-2"}`}>
                      <label className="text-xs font-semibold text-foreground/80">Email Address</label>
                      <input
                        type="email"
                        required={!interactive}
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 w-full min-w-0">
                    <label className="text-xs font-semibold text-foreground/80">Subject</label>
                    <input
                      type="text"
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                    />
                  </div>
                  <div className="space-y-1.5 w-full min-w-0">
                    <label className="text-xs font-semibold text-foreground/80">Message</label>
                    <textarea
                      rows={4}
                      required={!interactive}
                      placeholder="Tell us about your timeline, budget, and requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
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
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== buttonText) onUpdateProps?.({ buttonText: next });
                      }}
                      style={{ outline: "none" }}
                      className={interactive ? "cursor-text" : ""}
                     dangerouslySetInnerHTML={{ __html: buttonText }} />
                  </button>
                </form>
            </div>
          )}

          {/* Variant 2: split-contact-info-form */}
          {variant === "split-contact-info-form" && (
            <div className={`grid items-start text-left ${isMobileOrTablet ? "grid-cols-1 w-full gap-6 md:gap-8" : "grid-cols-1 lg:grid-cols-12 gap-12"}`}>
              {/* Direct Contact Info */}
              <div className={`${isMobileOrTablet ? "w-full space-y-6" : "lg:col-span-5 space-y-8"} ${isFlipped ? "lg:order-2" : "lg:order-1"}`}>
                <div className="space-y-3">
                  <h2
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== heading) onUpdateProps?.({ heading: next });
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${interactive ? "cursor-text" : ""}`}
                   dangerouslySetInnerHTML={{ __html: heading }} />
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== subheading) onUpdateProps?.({ subheading: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-sm sm:text-base ${interactive ? "cursor-text" : ""}`}
                   dangerouslySetInnerHTML={{ __html: subheading }} />
                </div>

                <div className="space-y-3.5">
                  <div className="p-3.5 sm:p-4 rounded-2xl border flex items-start gap-3.5 transition-all hover:border-primary/40" style={{ backgroundColor: cardBg, borderColor }}>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Support</h4>
                      <p
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          if (next && next !== contactEmail) onUpdateProps?.({ contactEmail: next });
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-semibold text-xs sm:text-sm mt-0.5 break-all ${interactive ? "cursor-text" : ""}`}
                       dangerouslySetInnerHTML={{ __html: contactEmail }} />
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl border flex items-start gap-3.5 transition-all hover:border-primary/40" style={{ backgroundColor: cardBg, borderColor }}>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">Call Us Directly</h4>
                      <p
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          if (next && next !== contactPhone) onUpdateProps?.({ contactPhone: next });
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-semibold text-xs sm:text-sm mt-0.5 ${interactive ? "cursor-text" : ""}`}
                       dangerouslySetInnerHTML={{ __html: contactPhone }} />
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl border flex items-start gap-3.5 transition-all hover:border-primary/40" style={{ backgroundColor: cardBg, borderColor }}>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">Headquarters</h4>
                      <p
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          if (next && next !== contactAddress) onUpdateProps?.({ contactAddress: next });
                        }}
                        style={{ outline: "none", color: textColor }}
                        className={`font-semibold text-xs sm:text-sm mt-0.5 ${interactive ? "cursor-text" : ""}`}
                       dangerouslySetInnerHTML={{ __html: contactAddress }} />
                      <p
                        contentEditable={interactive}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const next = e.currentTarget.innerHTML;
                          if (next && next !== contactHours) onUpdateProps?.({ contactHours: next });
                        }}
                        style={{ outline: "none", color: subtextColor }}
                        className={`text-xs opacity-75 mt-1 ${interactive ? "cursor-text" : ""}`}
                       dangerouslySetInnerHTML={{ __html: contactHours }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div
                className={`${isMobileOrTablet ? "w-full p-4 sm:p-6 space-y-5" : "lg:col-span-7 p-8 sm:p-10 space-y-6"} border ${borderColor} shadow-2xl backdrop-blur-md ${isFlipped ? "lg:order-1" : "lg:order-2"}`}
                style={{ backgroundColor: cardBg, borderRadius: theme.borderRadius || "24px" }}
              >
                <form onSubmit={(e) => { e.preventDefault(); if (!interactive) handleSubmit(e); }} className="space-y-4 text-left">
                  <div className={`grid gap-4 ${isMobileOrTablet ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                    <div className={`space-y-1.5 w-full min-w-0 ${isFlipped ? "order-2 md:order-2" : "order-1 md:order-1"}`}>
                      <label className="text-xs font-semibold text-foreground/80">First Name</label>
                      <input
                        type="text"
                        required={!interactive}
                        placeholder="Alex"
                        className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                    <div className={`space-y-1.5 w-full min-w-0 ${isFlipped ? "order-1 md:order-1" : "order-2 md:order-2"}`}>
                      <label className="text-xs font-semibold text-foreground/80">Last Name</label>
                      <input
                        type="text"
                        required={!interactive}
                        placeholder="Smith"
                        className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 w-full min-w-0">
                    <label className="text-xs font-semibold text-foreground/80">Work Email</label>
                    <input
                      type="email"
                      required={!interactive}
                      placeholder="alex@company.com"
                      className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                    />
                  </div>
                  <div className="space-y-1.5 w-full min-w-0">
                    <label className="text-xs font-semibold text-foreground/80">Message</label>
                    <textarea
                      rows={4}
                      required={!interactive}
                      placeholder="How can we help your business succeed?"
                      className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
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
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== buttonText) onUpdateProps?.({ buttonText: next });
                      }}
                      style={{ outline: "none" }}
                      className={interactive ? "cursor-text" : ""}
                     dangerouslySetInnerHTML={{ __html: buttonText }} />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Variant 3: boxed-dark-glass-form / Modern Centered Form */}
          {variant === "boxed-dark-glass-form" && (
            <div
              className={`w-full max-w-2xl sm:max-w-3xl mx-auto border ${borderColor} shadow-2xl ${
                isMobile ? "p-4 sm:p-6 space-y-5" : isTablet ? "p-6 sm:p-8 space-y-6" : "p-8 sm:p-12 space-y-8"
              }`}
              style={{
                backgroundColor: cardBg,
                color: textColor,
                borderRadius: theme.borderRadius || "24px",
              }}
            >
              <div className="text-center space-y-2.5">
                <h2
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== heading) onUpdateProps?.({ heading: next });
                  }}
                  style={{ outline: "none", color: textColor }}
                  className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${interactive ? "cursor-text" : ""}`}
                 dangerouslySetInnerHTML={{ __html: heading }} />
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== subheading) onUpdateProps?.({ subheading: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`text-xs sm:text-sm max-w-lg mx-auto ${interactive ? "cursor-text" : ""}`}
                 dangerouslySetInnerHTML={{ __html: subheading }} />
              </div>

              <form onSubmit={(e) => { e.preventDefault(); if (!interactive) handleSubmit(e); }} className="space-y-4 text-left">
                <div className="space-y-1.5 w-full min-w-0">
                  <label className="text-xs font-semibold" style={{ color: labelColor }}>Your Name</label>
                  <input
                    type="text"
                    required={!interactive}
                    placeholder="Enter your name"
                    className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400"
                    style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                  />
                </div>
                <div className="space-y-1.5 w-full min-w-0">
                  <label className="text-xs font-semibold" style={{ color: labelColor }}>Work Email</label>
                  <input
                    type="email"
                    required={!interactive}
                    placeholder="name@company.com"
                    className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400"
                    style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                  />
                </div>
                <div className="space-y-1.5 w-full min-w-0">
                  <label className="text-xs font-semibold" style={{ color: labelColor }}>Project Overview</label>
                  <textarea
                    rows={4}
                    required={!interactive}
                    placeholder="Briefly describe your goals, budget range, and desired launch date..."
                    className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none placeholder:text-slate-400"
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
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== buttonText) onUpdateProps?.({ buttonText: next });
                    }}
                    style={{ outline: "none" }}
                    className={interactive ? "cursor-text" : ""}
                   dangerouslySetInnerHTML={{ __html: buttonText }} />
                </button>
              </form>
            </div>
          )}

          {/* Variant 4: map-split-form */}
          {variant === "map-split-form" && (
            <div className={`grid items-stretch text-left ${isMobileOrTablet ? "grid-cols-1 w-full gap-6 md:gap-8" : "grid-cols-1 lg:grid-cols-12 gap-8"}`}>
              {/* Office Location Card */}
              <div
                className={`${isMobileOrTablet ? "w-full p-4 sm:p-6 space-y-4" : "lg:col-span-5 p-8 space-y-6"} border ${borderColor} flex flex-col justify-between shadow-xl ${isFlipped ? "lg:order-2" : "lg:order-1"}`}
                style={{ backgroundColor: cardBg, borderRadius: theme.borderRadius || "24px" }}
              >
                <div className="space-y-3">
                  <h3
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== heading) onUpdateProps?.({ heading: next });
                    }}
                    style={{ outline: "none", color: textColor }}
                    className={`text-xl sm:text-2xl font-bold ${interactive ? "cursor-text" : ""}`}
                   dangerouslySetInnerHTML={{ __html: heading }} />
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== subheading) onUpdateProps?.({ subheading: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-xs sm:text-sm ${interactive ? "cursor-text" : ""}`}
                   dangerouslySetInnerHTML={{ __html: subheading }} />
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl border space-y-3" style={{ backgroundColor: inputBg, borderColor }}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold" style={{ color: textColor }}>Studio Location</span>
                    <span className="text-emerald-500 font-bold">Open</span>
                  </div>
                  <p
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== contactAddress) onUpdateProps?.({ contactAddress: next });
                    }}
                    style={{ outline: "none", color: subtextColor }}
                    className={`text-xs ${interactive ? "cursor-text" : ""}`}
                   dangerouslySetInnerHTML={{ __html: contactAddress }} />
                  <div className="pt-2 border-t flex flex-wrap items-center justify-between gap-2 text-xs opacity-80" style={{ borderColor, color: subtextColor }}>
                    <span
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== contactEmail) onUpdateProps?.({ contactEmail: next });
                      }}
                      style={{ outline: "none" }}
                      className={`break-all ${interactive ? "cursor-text" : ""}`}
                     dangerouslySetInnerHTML={{ __html: contactEmail }} />
                    <span
                      contentEditable={interactive}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== contactPhone) onUpdateProps?.({ contactPhone: next });
                      }}
                      style={{ outline: "none" }}
                      className={interactive ? "cursor-text" : ""}
                     dangerouslySetInnerHTML={{ __html: contactPhone }} />
                  </div>
                </div>
              </div>

              {/* Detailed Contact Form */}
              <div
                className={`${isMobileOrTablet ? "w-full p-4 sm:p-6 space-y-5" : "lg:col-span-7 p-8 sm:p-10 space-y-6"} border ${borderColor} shadow-xl backdrop-blur-md ${isFlipped ? "lg:order-1" : "lg:order-2"}`}
                style={{ backgroundColor: cardBg, borderRadius: theme.borderRadius || "24px" }}
              >
                <form onSubmit={(e) => { e.preventDefault(); if (!interactive) handleSubmit(e); }} className="space-y-4 text-left">
                  <div className={`grid gap-4 ${isMobileOrTablet ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                    <div className={`space-y-1.5 w-full min-w-0 ${isFlipped ? "order-2 md:order-2" : "order-1 md:order-1"}`}>
                      <label className="text-xs font-semibold text-foreground/80">First Name</label>
                      <input
                        type="text"
                        required={!interactive}
                        placeholder="Alex"
                        className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                    <div className={`space-y-1.5 w-full min-w-0 ${isFlipped ? "order-1 md:order-1" : "order-2 md:order-2"}`}>
                      <label className="text-xs font-semibold text-foreground/80">Last Name</label>
                      <input
                        type="text"
                        required={!interactive}
                        placeholder="Morgan"
                        className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 w-full min-w-0">
                    <label className="text-xs font-semibold text-foreground/80">Email Address</label>
                    <input
                      type="email"
                      required={!interactive}
                      placeholder="alex@company.com"
                      className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                    />
                  </div>
                  <div className="space-y-1.5 w-full min-w-0">
                    <label className="text-xs font-semibold text-foreground/80">Message</label>
                    <textarea
                      rows={4}
                      required={!interactive}
                      placeholder="How can our studio assist you?"
                      className="w-full min-w-0 box-border px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
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
                        const next = e.currentTarget.innerHTML;
                        if (next && next !== buttonText) onUpdateProps?.({ buttonText: next });
                      }}
                      style={{ outline: "none" }}
                      className={interactive ? "cursor-text" : ""}
                     dangerouslySetInnerHTML={{ __html: buttonText }} />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Variant 5: compact-newsletter-contact */}
          {variant === "compact-newsletter-contact" && (
            <div
              className={`border ${borderColor} shadow-xl text-left ${
                isMobileOrTablet
                  ? `p-4 sm:p-6 flex space-y-4 w-full ${isFlipped ? "flex-col-reverse" : "flex-col"}`
                  : `p-6 sm:p-8 flex items-center justify-between gap-6 ${isFlipped ? "md:flex-row-reverse" : "md:flex-row"}`
              }`}
              style={{
                backgroundColor: cardBg,
                borderRadius: theme.borderRadius || "20px",
              }}
            >
              <div className={`space-y-1 ${isMobileOrTablet ? "w-full" : "max-w-md"}`}>
                <h3
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== heading) onUpdateProps?.({ heading: next });
                  }}
                  style={{ outline: "none", color: textColor }}
                  className={`text-lg sm:text-xl font-bold tracking-tight ${interactive ? "cursor-text" : ""}`}
                 dangerouslySetInnerHTML={{ __html: heading }} />
                <p
                  contentEditable={interactive}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = e.currentTarget.innerHTML;
                    if (next && next !== subheading) onUpdateProps?.({ subheading: next });
                  }}
                  style={{ outline: "none", color: subtextColor }}
                  className={`text-xs ${interactive ? "cursor-text" : ""}`}
                 dangerouslySetInnerHTML={{ __html: subheading }} />
              </div>

              <form onSubmit={(e) => { e.preventDefault(); if (!interactive) handleSubmit(e); }} className={`flex gap-3 ${isMobileOrTablet ? "flex-col w-full" : "flex-col sm:flex-row items-center w-full md:w-auto"}`}>
                <input
                  type="email"
                  required={!interactive}
                  placeholder="Enter your email"
                  className={`px-4 py-3 text-sm border outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 ${isMobileOrTablet ? "w-full" : "w-full sm:w-64"}`}
                  style={{ backgroundColor: inputBg, borderColor, color: textColor, borderRadius: theme.borderRadius || "12px" }}
                />
                <button
                  type={interactive ? "button" : "submit"}
                  className={`py-3 px-6 font-bold text-sm text-white shadow-md transition-all hover:brightness-110 shrink-0 cursor-pointer border-2 border-transparent ${isMobileOrTablet ? "w-full justify-center" : "w-full sm:w-auto"}`}
                  style={{ backgroundColor: primary, borderRadius: theme.borderRadius || "12px" }}
                >
                  <span
                    contentEditable={interactive}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.innerHTML;
                      if (next && next !== buttonText) onUpdateProps?.({ buttonText: next });
                    }}
                    style={{ outline: "none" }}
                    className={interactive ? "cursor-text" : ""}
                   dangerouslySetInnerHTML={{ __html: buttonText }} />
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
      className={`py-12 transition-all ${
        isFollowingNavbar
          ? "min-h-[90vh] lg:min-h-[100vh] !pt-[130px] md:!pt-[170px] flex flex-col justify-center"
          : isDirectlyBelowNavbar
            ? "min-h-[85vh] lg:min-h-[calc(100vh-80px)] flex flex-col justify-center"
            : ""
      }`}
    >
      <Center maxWidth={effectiveMaxWidth} isMobile={isMobile}>
        {props.heading && (
          <h2
            contentEditable={interactive}
            suppressContentEditableWarning
            onBlur={(e) => {
              const newText = e.currentTarget.innerHTML;
              if (newText && newText !== props.heading) {
                onUpdateProps?.({ heading: newText });
              }
            }}
            style={{ outline: "none" }}
            className={`text-2xl font-bold mb-4 ${
              interactive ? "cursor-text transition-all" : ""
            }`}
           dangerouslySetInnerHTML={{ __html: props.heading }} />
        )}
        {props.text && (
          <p
            contentEditable={interactive}
            suppressContentEditableWarning
            onBlur={(e) => {
              const newText = e.currentTarget.innerHTML;
              if (newText && newText !== props.text) {
                onUpdateProps?.({ text: newText });
              }
            }}
            style={{ outline: "none" }}
            className={`text-muted-foreground ${
              interactive ? "cursor-text transition-all" : ""
            }`}
           dangerouslySetInnerHTML={{ __html: props.text }} />
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
