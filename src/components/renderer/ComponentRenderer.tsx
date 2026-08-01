"use client";

import React, { useState, useEffect, useRef } from "react";
import type { BuilderComponent, ComponentProps, SiteTheme } from "@/lib/types";
import { styleToCss } from "@/lib/style";
import { PALETTE } from "@/lib/presets";
import { Plus, X, Link2, Check, ChevronDown } from "lucide-react";
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

type Props = {
  component: BuilderComponent;
  allComponents?: BuilderComponent[];
  theme: SiteTheme;
  interactive?: boolean;
  onUpdateProps?: (props: Partial<ComponentProps>) => void;
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
      className={`mx-auto w-full px-6 md:px-8 ${className}`}
      style={{ maxWidth: maxWidth || "1120px", ...style }}
    >
      {children}
    </div>
  );
}

function EditableText({
  value = "",
  onChange,
  className = "",
  style,
  tagName = "span",
  placeholder = "Edit text...",
  interactive = false,
}: {
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
  style?: React.CSSProperties;
  tagName?: "span" | "div" | "h1" | "h2" | "h3" | "p" | "a" | "button";
  placeholder?: string;
  interactive?: boolean;
}) {
  const Tag = tagName as any;

  if (!interactive || !onChange) {
    return <Tag className={className} style={style}>{value}</Tag>;
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      className={`${className} outline-none focus:ring-2 focus:ring-primary/50 focus:bg-primary/10 rounded px-1 cursor-pointer focus:cursor-text transition-all inline-block select-none focus:select-text`}
      style={style}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const text = e.currentTarget.innerText.trim();
        if (text !== value) {
          onChange(text);
        }
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" && tagName !== "p") {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
    >
      {value || placeholder}
    </Tag>
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
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange("#top");
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
              value === "#top" ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-muted"
            }`}
          >
            <span>Top of Page (#top)</span>
            {value === "#top" && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
          </button>

          {options.map((opt) => {
            const isSelected = value === opt.anchorId || `#${value.replace(/^#/, "")}` === opt.anchorId;
            return (
              <button
                key={opt.anchorId}
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

function LogoEditItem({
  logoText,
  logoHref = "#top",
  sectionOptions,
  onSave,
  onRemove,
  onClose,
}: {
  logoText: string;
  logoHref?: string;
  sectionOptions: { label: string; anchorId: string }[];
  onSave: (text: string, href: string) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const [draftText, setDraftText] = useState(logoText || "");
  const [draftHref, setDraftHref] = useState(logoHref || "#top");
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
    <div
      ref={popoverRef}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full left-0 mt-2.5 w-72 p-4 bg-background border border-border shadow-2xl rounded-2xl text-foreground text-xs z-50 space-y-3.5 animate-in fade-in-0 zoom-in-95 cursor-default text-left font-normal"
    >
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <span className="font-extrabold text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Link2 className="h-3.5 w-3.5 text-primary" /> Edit Logo & Link
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

      <div className="space-y-1.5">
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

      <div className="pt-2.5 border-t border-border/60 flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={onRemove}
          className="flex-1 w-1/2 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <X className="h-3.5 w-3.5" /> Remove
        </button>
        <button
          type="button"
          onClick={() => onSave(draftText, draftHref)}
          className="flex-1 w-1/2 py-2 text-xs font-bold text-white bg-primary hover:brightness-110 shadow-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          <Check className="h-3.5 w-3.5" /> Done
        </button>
      </div>
    </div>
  );
}

function LinkEditItem({
  link,
  sectionOptions,
  onSave,
  onRemove,
  onClose,
}: {
  link: { label: string; href?: string; variant?: string };
  sectionOptions: { label: string; anchorId: string }[];
  onSave: (label: string, href: string) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const [draftLabel, setDraftLabel] = useState(link.label || "");
  const [draftHref, setDraftHref] = useState(link.href || "#");
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
    <div
      ref={popoverRef}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full left-0 mt-2.5 w-72 p-4 bg-background border border-border shadow-2xl rounded-2xl text-foreground text-xs z-50 space-y-3.5 animate-in fade-in-0 zoom-in-95 cursor-default text-left font-normal"
    >
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <span className="font-extrabold text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Link2 className="h-3.5 w-3.5 text-primary" /> Edit Link
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 1. Edit Link Label / Name */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Link Text Name
        </label>
        <input
          type="text"
          value={draftLabel}
          onChange={(e) => setDraftLabel(e.target.value)}
          placeholder="e.g. Features"
          className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-semibold text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* 2. Scroll to Section Target Dropdown */}
      <div className="space-y-1.5">
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

      {/* 3. Custom URL Input */}
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

      {/* 4. Footer Buttons (Equal half width) */}
      <div className="pt-2.5 border-t border-border/60 flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={onRemove}
          className="flex-1 w-1/2 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <X className="h-3.5 w-3.5" /> Remove
        </button>
        <button
          type="button"
          onClick={() => onSave(draftLabel, draftHref)}
          className="flex-1 w-1/2 py-2 text-xs font-bold text-white bg-primary hover:brightness-110 shadow-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          <Check className="h-3.5 w-3.5" /> Done
        </button>
      </div>
    </div>
  );
}

function ButtonEditItem({
  button,
  sectionOptions,
  onSave,
  onRemove,
  onClose,
}: {
  button: { label: string; href?: string; variant?: string };
  sectionOptions: { label: string; anchorId: string }[];
  onSave: (label: string, href: string, variant: "solid" | "outline" | "ghost") => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const [draftLabel, setDraftLabel] = useState(button.label || "");
  const [draftHref, setDraftHref] = useState(button.href || "#");
  const [draftVariant, setDraftVariant] = useState<"solid" | "outline" | "ghost">((button.variant as "solid" | "outline" | "ghost") || "solid");
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
    <div
      ref={popoverRef}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full right-0 mt-2.5 w-72 p-4 bg-background border border-border shadow-2xl rounded-2xl text-foreground text-xs z-50 space-y-3.5 animate-in fade-in-0 zoom-in-95 cursor-default text-left font-normal"
    >
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <span className="font-extrabold text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Link2 className="h-3.5 w-3.5 text-primary" /> Edit Button
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 1. Button Text Name */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Button Text Name
        </label>
        <input
          type="text"
          value={draftLabel}
          onChange={(e) => setDraftLabel(e.target.value)}
          placeholder="e.g. Get Started"
          className="w-full px-3 py-2 bg-muted/40 border border-border/80 rounded-xl text-xs font-semibold text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* 2. Button Variant */}
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

      {/* 3. Scroll to Section Target Dropdown */}
      <div className="space-y-1.5">
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

      {/* 4. Target URL Input */}
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

      {/* 5. Footer Buttons (Equal half width) */}
      <div className="pt-2.5 border-t border-border/60 flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={onRemove}
          className="flex-1 w-1/2 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <X className="h-3.5 w-3.5" /> Remove
        </button>
        <button
          type="button"
          onClick={() => onSave(draftLabel, draftHref, draftVariant)}
          className="flex-1 w-1/2 py-2 text-xs font-bold text-white bg-primary hover:brightness-110 shadow-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
        >
          <Check className="h-3.5 w-3.5" /> Done
        </button>
      </div>
    </div>
  );
}

export function ComponentRenderer({ component, allComponents = [], theme, interactive = false, onUpdateProps }: Props) {
  const { type, props, style } = component;
  const css = styleToCss(style);
  const radius = style.borderRadius || theme.borderRadius || "12px";
  const btnRadius = style.borderRadius || theme.borderRadius || "12px";
  const effectiveMaxWidth = theme.containerWidth || style.maxWidth || "1120px";
  const primary = theme.primaryColor;

  const getSectionAnchorId = (c: BuilderComponent): string => {
    const sameType = allComponents.filter((item) => item.type === c.type);
    const typeIndex = sameType.findIndex((item) => item.id === c.id) + 1;
    const fallbackId = `${c.type}-${typeIndex > 0 ? typeIndex : 1}`;
    const rawAnchor = c.style?.id || c.props?.sectionId || fallbackId;
    return rawAnchor.replace(/^#/, "").trim();
  };

  const currentSectionId = getSectionAnchorId(component);

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
    const isFloating = variant === "floating-glass" || Boolean(style.maxWidth && style.maxWidth !== "100%" && style.maxWidth !== "auto");
    const headerRadius = style.borderRadius || (isFloating ? "9999px" : "0px");
    const headerBg = style.backgroundColor || (variant === "floating-glass" ? "rgba(15, 23, 42, 0.85)" : variant === "classic-split" || variant === "dual-action" ? "#0f172a" : theme.backgroundColor || "transparent");
    const headerTextColor = style.textColor || (variant === "classic-split" || variant === "dual-action" || variant === "floating-glass" ? "#f8fafc" : theme.textColor || "inherit");

    if (variant === "floating-glass") {
      css.position = "sticky";
      css.top = "12px";
      css.zIndex = 30;
      css.marginTop = "0px";
      css.marginBottom = "-56px";
      css.maxWidth = effectiveMaxWidth;
      css.marginLeft = "auto";
      css.marginRight = "auto";
    }

    const LogoElement = () => {
      const text = props.logoText ?? "Brand";
      const href = props.logoHref || "#top";
      const [isEditingLogo, setIsEditingLogo] = useState(false);

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

      return (
        <div className="group/logo relative inline-flex items-center">
          {!interactive ? (
            <a
              href={href}
              onClick={(e) => {
                if (href.startsWith("#") && href.length > 1) {
                  e.preventDefault();
                  if (href === "#top") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                  }
                  const targetId = href.replace(/^#/, "");
                  const targetEl = document.getElementById(targetId) || document.querySelector(href);
                  if (targetEl) targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="text-lg font-extrabold tracking-tight cursor-pointer select-none hover:opacity-85 transition-opacity"
              style={{ color: headerTextColor }}
            >
              {text}
            </a>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingLogo(!isEditingLogo);
              }}
              className="text-lg font-extrabold tracking-tight cursor-pointer select-none text-left"
              style={{ color: headerTextColor }}
            >
              {text}
            </button>
          )}

          {/* Hover Edit Link Chip */}
          {interactive && !isEditingLogo && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingLogo(true);
              }}
              className="absolute -top-2.5 -right-2.5 hidden group-hover/logo:flex h-5 items-center gap-1 px-1.5 py-0.5 rounded-full bg-background border border-border shadow-md hover:border-primary text-foreground text-[10px] font-mono z-20 transition-all cursor-pointer"
              title="Click to Edit Logo & Destination Link"
            >
              <Link2 className="h-3 w-3 text-primary shrink-0" />
              <span className="max-w-[45px] truncate text-[9px]">{href}</span>
            </button>
          )}

          {/* Directly Attached Logo Link Edit Popover */}
          {isEditingLogo && (
            <LogoEditItem
              logoText={text}
              logoHref={href}
              sectionOptions={sectionOptions}
              onSave={(newText, newHref) => {
                onUpdateProps?.({ logoText: newText, logoHref: newHref });
                setIsEditingLogo(false);
              }}
              onRemove={() => {
                onUpdateProps?.({ logoText: "" });
                setIsEditingLogo(false);
              }}
              onClose={() => setIsEditingLogo(false)}
            />
          )}
        </div>
      );
    };

    const LinksElement = () => {
      const [editingIndex, setEditingIndex] = useState<number | null>(null);

      return (
        <nav className="flex flex-wrap items-center gap-5 text-sm font-medium" style={{ gap: style.gap || "1.25rem" }}>
          {(props.links || []).map((link, i) => {
            const href = link.href || "#";
            const isEditingThis = interactive && editingIndex === i;
            const linkClass = `transition-all cursor-pointer select-none ${
              link.variant === "bold"
                ? "font-bold opacity-100 hover:opacity-80"
                : link.variant === "muted"
                ? "opacity-60 hover:opacity-100"
                : link.variant === "button"
                ? "px-3.5 py-1.5 rounded-md font-semibold opacity-100 hover:brightness-110 shadow-sm"
                : "opacity-85 hover:opacity-100"
            }`;
            const linkStyle = {
              color: link.variant === "button" ? "#ffffff" : headerTextColor,
              backgroundColor: link.variant === "button" ? primary : "transparent",
              borderRadius: link.variant === "button" ? btnRadius : undefined,
            };

            return (
              <div key={i} className="group/link relative inline-flex items-center">
                {!interactive ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (href.startsWith("#") && href.length > 1) {
                        e.preventDefault();
                        if (href === "#top") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          return;
                        }
                        const targetId = href.replace(/^#/, "");
                        const targetEl = document.getElementById(targetId) || document.querySelector(href);
                        if (targetEl) targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className={linkClass}
                    style={linkStyle}
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingIndex(isEditingThis ? null : i);
                    }}
                    className={linkClass}
                    style={linkStyle}
                  >
                    {link.label || "Link"}
                  </button>
                )}

                {/* Hover Edit Target Tag Chip */}
                {interactive && !isEditingThis && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingIndex(i);
                    }}
                    className="absolute -top-2.5 -right-2.5 hidden group-hover/link:flex h-5 items-center gap-1 px-1.5 py-0.5 rounded-full bg-background border border-border shadow-md hover:border-primary text-foreground text-[10px] font-mono z-20 transition-all cursor-pointer"
                    title="Click to Edit Link & Destination"
                  >
                    <Link2 className="h-3 w-3 text-primary shrink-0" />
                    <span className="max-w-[45px] truncate text-[9px]">{href}</span>
                  </button>
                )}

                {/* Directly Attached Inline Edit Dialog Popover */}
                {isEditingThis && (
                  <LinkEditItem
                    link={link}
                    sectionOptions={sectionOptions}
                    onSave={(label, newHref) => {
                      const next = [...(props.links || [])];
                      next[i] = { ...next[i], label, href: newHref };
                      onUpdateProps?.({ links: next });
                      setEditingIndex(null);
                    }}
                    onRemove={() => {
                      const next = [...(props.links || [])];
                      next.splice(i, 1);
                      onUpdateProps?.({ links: next });
                      setEditingIndex(null);
                    }}
                    onClose={() => setEditingIndex(null)}
                  />
                )}
              </div>
            );
          })}

          {/* Add Link Dropdown */}
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
                    const next = [...(props.links || []), { label: "New Link", href: "#", variant: "default" as const }];
                    onUpdateProps?.({ links: next });
                  }}
                >
                  Default Link
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    const next = [...(props.links || []), { label: "Bold Link", href: "#", variant: "bold" as const }];
                    onUpdateProps?.({ links: next });
                  }}
                >
                  Bold Link
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    const next = [...(props.links || []), { label: "Muted Link", href: "#", variant: "muted" as const }];
                    onUpdateProps?.({ links: next });
                  }}
                >
                  Muted Link
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    const next = [...(props.links || []), { label: "Button Link", href: "#", variant: "button" as const }];
                    onUpdateProps?.({ links: next });
                  }}
                >
                  Button Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      );
    };

    const ButtonsElement = () => {
      const [editingBtnIndex, setEditingBtnIndex] = useState<number | null>(null);

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
        <div className="flex items-center flex-wrap" style={{ gap: style.gap || "0.75rem" }}>
          {buttonsList.map((btn, i) => {
            const href = btn.href || "#";
            const isEditingThis = interactive && editingBtnIndex === i;

            return (
              <div key={i} className="group/btn relative inline-flex items-center">
                {!interactive ? (
                  <span
                    className={`px-4 py-2 text-sm font-semibold shadow-sm transition-all cursor-pointer select-none ${
                      btn.variant === "outline" ? "border-2 bg-transparent hover:bg-foreground/5" :
                      btn.variant === "ghost" ? "bg-transparent shadow-none hover:bg-foreground/5" :
                      "text-white hover:brightness-110 active:scale-95"
                    }`}
                    style={{
                      backgroundColor: btn.variant === "outline" || btn.variant === "ghost" ? "transparent" : primary,
                      borderColor: btn.variant === "outline" ? primary : "transparent",
                      color: btn.variant === "outline" || btn.variant === "ghost" ? primary : "#ffffff",
                      borderRadius: btnRadius
                    }}
                  >
                    {btn.label || "Button"}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingBtnIndex(isEditingThis ? null : i);
                    }}
                    className={`px-4 py-2 text-sm font-semibold shadow-sm transition-all cursor-pointer select-none ${
                      btn.variant === "outline" ? "border-2 bg-transparent hover:bg-foreground/5" :
                      btn.variant === "ghost" ? "bg-transparent shadow-none hover:bg-foreground/5" :
                      "text-white hover:brightness-110 active:scale-95"
                    }`}
                    style={{
                      backgroundColor: btn.variant === "outline" || btn.variant === "ghost" ? "transparent" : primary,
                      borderColor: btn.variant === "outline" ? primary : "transparent",
                      color: btn.variant === "outline" || btn.variant === "ghost" ? primary : "#ffffff",
                      borderRadius: btnRadius
                    }}
                  >
                    {btn.label || "Button"}
                  </button>
                )}

                {/* Hover Edit Button Tag Chip */}
                {interactive && !isEditingThis && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingBtnIndex(i);
                    }}
                    className="absolute -top-2.5 -right-2.5 hidden group-hover/btn:flex h-5 items-center gap-1 px-1.5 py-0.5 rounded-full bg-background border border-border shadow-md hover:border-primary text-foreground text-[10px] font-mono z-20 transition-all cursor-pointer"
                    title="Click to Edit Button & Destination"
                  >
                    <Link2 className="h-3 w-3 text-primary shrink-0" />
                    <span className="max-w-[45px] truncate text-[9px]">{href}</span>
                  </button>
                )}

                {/* Directly Attached Inline Edit Dialog Popover */}
                {isEditingThis && (
                  <ButtonEditItem
                    button={btn}
                    sectionOptions={sectionOptions}
                    onSave={(label, newHref, variant) => {
                      const next = [...buttonsList];
                      next[i] = { ...next[i], label, href: newHref, variant };
                      onUpdateProps?.({ buttons: next, buttonText: undefined });
                      setEditingBtnIndex(null);
                    }}
                    onRemove={() => {
                      const next = [...buttonsList];
                      next.splice(i, 1);
                      onUpdateProps?.({ buttons: next.length > 0 ? next : undefined, buttonText: undefined });
                      setEditingBtnIndex(null);
                    }}
                    onClose={() => setEditingBtnIndex(null)}
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
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "New Button", variant: "solid" }], buttonText: undefined })}>Solid Button</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "New Button", variant: "outline" }], buttonText: undefined })}>Outline Button</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "New Button", variant: "ghost" }], buttonText: undefined })}>Ghost Button</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    };

    return (
      <header
        id={currentSectionId}
        style={{
          borderRadius: headerRadius,
          backgroundColor: headerBg,
          color: headerTextColor,
          ...css
        }}
        className={`transition-all duration-300 ${variant === "floating-glass" ? "backdrop-blur-md border border-white/15 dark:border-white/10 shadow-2xl" : ""}`}
      >


        <Center maxWidth={effectiveMaxWidth}>
          {variant === "centered-minimal" ? (
            <div className="flex flex-col items-center justify-center gap-4 py-1 text-center">
              <LogoElement />
              <div className="flex flex-wrap items-center justify-center gap-6">
                <LinksElement />
                <ButtonsElement />
              </div>
            </div>
          ) : variant === "inline-left" ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <LogoElement />
                <div className="h-5 w-px bg-foreground/20" />
                <LinksElement />
              </div>
              <ButtonsElement />
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <LogoElement />
              <LinksElement />
              <ButtonsElement />
            </div>
          )}
        </Center>
      </header>
    );
  }

  if (type === "hero") {
    const heroSectionRadius = style.borderRadius || "0px";
    const variant = props.variant || "centered-hero";
    const heroBg = style.backgroundColor || "transparent";
    const isSplit = variant === "split-image" || variant === "bento-hero";

    const ButtonsBlock = () => {
      const [editingBtnIndex, setEditingBtnIndex] = useState<number | null>(null);
      const buttonsList = props.buttons !== undefined ? props.buttons : (props.buttonText !== undefined ? [{ label: props.buttonText, variant: "solid" as const }] : undefined);

      if (!buttonsList && !interactive) return null;
      if (!buttonsList || buttonsList.length === 0) {
        return interactive ? (
          <div className={`pt-2 flex flex-wrap items-center ${isSplit || style.textAlign === "left" ? "justify-start" : "justify-center"}`}>
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
        <div className={`pt-2 flex flex-wrap items-center ${isSplit || style.textAlign === "left" ? "justify-start" : "justify-center"}`} style={{ gap: style.gap || "1rem" }}>
          {buttonsList.map((btn, i) => {
            const href = btn.href || "#";
            const isEditingThis = interactive && editingBtnIndex === i;
            const btnClass = `inline-flex items-center px-6 py-3 text-base font-semibold shadow-lg transition-all cursor-pointer select-none ${
              btn.variant === "outline" ? "border-2 bg-transparent hover:bg-foreground/5" :
              btn.variant === "ghost" ? "bg-transparent shadow-none hover:bg-foreground/5" :
              "text-white hover:brightness-110 active:scale-95"
            }`;
            const btnStyle = {
              backgroundColor: btn.variant === "outline" || btn.variant === "ghost" ? "transparent" : primary,
              borderColor: btn.variant === "outline" ? primary : "transparent",
              color: btn.variant === "outline" || btn.variant === "ghost" ? primary : "#ffffff",
              borderRadius: radius
            };

            return (
              <div key={i} className="group/btn relative inline-flex items-center">
                {!interactive ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (href.startsWith("#") && href.length > 1) {
                        e.preventDefault();
                        if (href === "#top") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          return;
                        }
                        const targetId = href.replace(/^#/, "");
                        const targetEl = document.getElementById(targetId) || document.querySelector(href);
                        if (targetEl) targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className={btnClass}
                    style={btnStyle}
                  >
                    {btn.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingBtnIndex(isEditingThis ? null : i);
                    }}
                    className={btnClass}
                    style={btnStyle}
                  >
                    {btn.label || "Button"}
                  </button>
                )}

                {/* Hover Edit Link Chip */}
                {interactive && !isEditingThis && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingBtnIndex(i);
                    }}
                    className="absolute -top-2.5 -right-2.5 hidden group-hover/btn:flex h-5 items-center gap-1 px-1.5 py-0.5 rounded-full bg-background border border-border shadow-md hover:border-primary text-foreground text-[10px] font-mono z-20 transition-all cursor-pointer"
                    title="Click to Edit Button & Destination Link"
                  >
                    <Link2 className="h-3 w-3 text-primary shrink-0" />
                    <span className="max-w-[45px] truncate text-[9px]">{href}</span>
                  </button>
                )}

                {/* Directly Attached Button Edit Popover */}
                {isEditingThis && (
                  <ButtonEditItem
                    button={btn}
                    sectionOptions={sectionOptions}
                    onSave={(label, newHref, variant) => {
                      const next = [...buttonsList];
                      next[i] = { ...next[i], label, href: newHref, variant };
                      onUpdateProps?.({ buttons: next, buttonText: undefined });
                      setEditingBtnIndex(null);
                    }}
                    onRemove={() => {
                      const next = [...buttonsList];
                      next.splice(i, 1);
                      onUpdateProps?.({ buttons: next.length > 0 ? next : undefined, buttonText: undefined });
                      setEditingBtnIndex(null);
                    }}
                    onClose={() => setEditingBtnIndex(null)}
                  />
                )}
              </div>
            );
          })}
          {interactive && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-foreground/30 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all" title="Add Secondary Button">
                  <Plus className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Learn More", variant: "solid" }], buttonText: undefined })}>Solid Button</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Learn More", variant: "outline" }], buttonText: undefined })}>Outline Button</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Learn More", variant: "ghost" }], buttonText: undefined })}>Ghost Button</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    };

    return (
      <section id={currentSectionId} style={{ borderRadius: heroSectionRadius, backgroundColor: heroBg, maxWidth: effectiveMaxWidth, ...css }} className="mx-auto w-full transition-all duration-300">
        <Center maxWidth="100%">
          {variant === "gradient-glow" && (
            <div className="mb-4 flex justify-center">
              <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20 shadow-xs">
                Introducing Version 2.0 — Built for Modern Teams
              </span>
            </div>
          )}

          {isSplit ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
              <div className="space-y-4 sm:space-y-5" style={{ textAlign: style.textAlign || "left" }}>
                <EditableText
                  tagName="h1"
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight break-words max-w-full"
                  style={{ lineHeight: 1.1, color: style.textColor || theme.textColor }}
                  value={props.heading}
                  onChange={(v) => onUpdateProps?.({ heading: v })}
                  interactive={interactive}
                />
                {props.subheading || interactive ? (
                  <EditableText
                    tagName="p"
                    className="text-base sm:text-lg lg:text-xl opacity-80 break-words max-w-full"
                    style={{ lineHeight: 1.6 }}
                    value={props.subheading}
                    onChange={(v) => onUpdateProps?.({ subheading: v })}
                    interactive={interactive}
                  />
                ) : null}
                <ButtonsBlock />
              </div>

              {props.imageUrl ? (
                <div className="w-full overflow-hidden border border-border/40 rounded-2xl" style={{ borderRadius: radius }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={props.imageUrl}
                    alt={props.imageAlt || ""}
                    className="h-auto w-full object-cover"
                    style={{ maxHeight: 440 }}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="max-w-3xl w-full space-y-4" style={{ textAlign: style.textAlign || "center" }}>
                <EditableText
                  tagName="h1"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight break-words max-w-full"
                  style={{ lineHeight: 1.1, color: style.textColor || theme.textColor }}
                  value={props.heading}
                  onChange={(v) => onUpdateProps?.({ heading: v })}
                  interactive={interactive}
                />
                {props.subheading || interactive ? (
                  <EditableText
                    tagName="p"
                    className="text-base sm:text-lg md:text-xl opacity-80 break-words max-w-full"
                    style={{ lineHeight: 1.6 }}
                    value={props.subheading}
                    onChange={(v) => onUpdateProps?.({ subheading: v })}
                    interactive={interactive}
                  />
                ) : null}
                <ButtonsBlock />
              </div>
              {props.imageUrl ? (
                <div className="mt-4 w-full overflow-hidden border border-border/40 rounded-2xl" style={{ borderRadius: radius, maxWidth: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={props.imageUrl}
                    alt={props.imageAlt || ""}
                    className="h-auto w-full object-cover"
                    style={{ maxHeight: 440 }}
                  />
                </div>
              ) : null}
            </div>
          )}
        </Center>
      </section>
    );
  }

  if (type === "heading") {
    return (
      <section id={currentSectionId} style={{ maxWidth: effectiveMaxWidth, ...css }} className="mx-auto w-full transition-all duration-300">
        <Center maxWidth="100%">
          <EditableText
            tagName="h2"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            value={props.heading}
            onChange={(v) => onUpdateProps?.({ heading: v })}
            interactive={interactive}
          />
          {props.subheading || interactive ? (
            <EditableText
              tagName="p"
              className="mt-2 text-base opacity-70 sm:text-lg"
              value={props.subheading}
              onChange={(v) => onUpdateProps?.({ subheading: v })}
              interactive={interactive}
            />
          ) : null}
        </Center>
      </section>
    );
  }

  if (type === "text") {
    return (
      <section id={currentSectionId} style={{ maxWidth: effectiveMaxWidth, ...css }} className="mx-auto w-full transition-all duration-300">
        <Center maxWidth="100%">
          <EditableText
            tagName="p"
            className="mx-auto"
            style={{ maxWidth: style.maxWidth || "720px" }}
            value={props.text}
            onChange={(v) => onUpdateProps?.({ text: v })}
            interactive={interactive}
          />
        </Center>
      </section>
    );
  }

  if (type === "button") {
    return (
      <section id={currentSectionId} style={{ maxWidth: effectiveMaxWidth, backgroundColor: css.backgroundColor === primary ? "transparent" : css.backgroundColor, ...css }} className="mx-auto w-full transition-all duration-300">
        <Center maxWidth="100%">
          <div style={{ textAlign: style.textAlign || "center" }}>
            <EditableText
              tagName="span"
              className="inline-flex items-center px-6 py-3 font-semibold shadow-md transition hover:brightness-110"
              style={{
                backgroundColor: style.backgroundColor || primary,
                color: style.textColor || "#fff",
                borderRadius: style.borderRadius || radius,
                fontSize: style.fontSize || "16px",
              }}
              value={props.buttonText || "Button"}
              onChange={(v) => onUpdateProps?.({ buttonText: v })}
              interactive={interactive}
            />
          </div>
        </Center>
      </section>
    );
  }

  if (type === "image") {
    return (
      <section id={currentSectionId} style={{ maxWidth: effectiveMaxWidth, ...css }} className="mx-auto w-full transition-all duration-300">
        <Center maxWidth="100%">
          <div
            className="mx-auto overflow-hidden border border-border/30 rounded-2xl"
            style={{ borderRadius: radius, maxWidth: style.maxWidth || "960px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.imageUrl || ""}
              alt={props.imageAlt || ""}
              className="h-auto w-full object-cover"
            />
          </div>
        </Center>
      </section>
    );
  }

  if (type === "features" || type === "card-grid") {
    const cols = props.columns || 3;
    const isCards = type === "card-grid";
    return (
      <section id={currentSectionId} style={{ maxWidth: effectiveMaxWidth, ...css }} className="mx-auto w-full transition-all duration-300">
        <Center maxWidth="100%">
          {props.heading || interactive ? (
            <EditableText
              tagName="h2"
              className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl block"
              value={props.heading}
              onChange={(v) => onUpdateProps?.({ heading: v })}
              interactive={interactive}
            />
          ) : null}
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(${cols >= 4 ? "180px" : "240px"}, 1fr))`,
              gap: style.gap || "20px",
            }}
          >
            {(props.items || []).map((item, i) => (
              <div
                key={i}
                className={`group/item relative ${
                  isCards
                    ? "flex flex-col gap-3 border border-black/5 bg-white p-6 shadow-sm"
                    : "flex flex-col gap-3 p-5"
                }`}
                style={{ borderRadius: radius }}
              >
                {interactive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = [...(props.items || [])];
                      next.splice(i, 1);
                      onUpdateProps?.({ items: next });
                    }}
                    className="absolute -top-2 -right-2 hidden h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600 group-hover/item:flex z-10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
                {item.icon ? <div className="text-3xl">{item.icon}</div> : null}
                <EditableText
                  tagName="h3"
                  className="text-lg font-semibold"
                  value={item.title}
                  onChange={(v) => {
                    const next = [...(props.items || [])];
                    next[i] = { ...next[i], title: v };
                    onUpdateProps?.({ items: next });
                  }}
                  interactive={interactive}
                />
                <EditableText
                  tagName="p"
                  className="text-sm leading-relaxed opacity-75"
                  value={item.description}
                  onChange={(v) => {
                    const next = [...(props.items || [])];
                    next[i] = { ...next[i], description: v };
                    onUpdateProps?.({ items: next });
                  }}
                  interactive={interactive}
                />
              </div>
            ))}
            {interactive && (
              <button
                onClick={() => {
                  const next = [...(props.items || []), { title: "New Item", description: "Description here", icon: "✨" }];
                  onUpdateProps?.({ items: next });
                }}
                className={`flex items-center justify-center border-2 border-dashed border-foreground/20 text-foreground/40 hover:text-foreground/70 hover:border-foreground/40 transition-colors min-h-[160px] ${
                  isCards ? "bg-white/50 dark:bg-white/5" : ""
                }`}
                style={{ borderRadius: radius }}
                title="Add Item"
              >
                <Plus className="h-8 w-8" />
              </button>
            )}
          </div>
        </Center>
      </section>
    );
  }

  if (type === "stats") {
    return (
      <section id={currentSectionId} style={{ maxWidth: effectiveMaxWidth, ...css }} className="mx-auto w-full transition-all duration-300">
        <Center maxWidth="100%">
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`,
              textAlign: style.textAlign || "center",
            }}
          >
            {(props.items || []).map((item, i) => (
              <div key={i} className="group/stat relative space-y-1 p-2">
                {interactive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = [...(props.items || [])];
                      next.splice(i, 1);
                      onUpdateProps?.({ items: next });
                    }}
                    className="absolute top-0 right-0 hidden h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600 group-hover/stat:flex z-10"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                )}
                <EditableText
                  tagName="div"
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                  value={item.title}
                  onChange={(v) => {
                    const next = [...(props.items || [])];
                    next[i] = { ...next[i], title: v };
                    onUpdateProps?.({ items: next });
                  }}
                  interactive={interactive}
                />
                <EditableText
                  tagName="div"
                  className="text-sm uppercase tracking-wider opacity-70"
                  value={item.description}
                  onChange={(v) => {
                    const next = [...(props.items || [])];
                    next[i] = { ...next[i], description: v };
                    onUpdateProps?.({ items: next });
                  }}
                  interactive={interactive}
                />
              </div>
            ))}
            {interactive && (
              <button
                onClick={() => {
                  const next = [...(props.items || []), { title: "100%", description: "New Stat" }];
                  onUpdateProps?.({ items: next });
                }}
                className="flex flex-col items-center justify-center space-y-1 p-2 border-2 border-dashed border-foreground/20 text-foreground/40 hover:text-foreground/70 hover:border-foreground/40 transition-colors rounded-xl min-h-[80px]"
                title="Add Stat"
              >
                <Plus className="h-6 w-6 mb-1" />
              </button>
            )}
          </div>
        </Center>
      </section>
    );
  }

  if (type === "testimonial") {
    return (
      <section id={currentSectionId} style={{ maxWidth: effectiveMaxWidth, ...css }} className="mx-auto w-full transition-all duration-300">
        <Center maxWidth="100%" className="max-w-3xl">
          <EditableText
            tagName="p"
            className="mx-auto max-w-2xl text-xl font-medium leading-relaxed sm:text-2xl"
            value={props.text}
            onChange={(v) => onUpdateProps?.({ text: v })}
            interactive={interactive}
          />
          <div className="mt-8 flex flex-col items-center gap-3">
            {props.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={props.imageUrl}
                alt={props.heading || ""}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white/50"
              />
            ) : null}
            <div>
              <EditableText
                tagName="div"
                className="font-semibold"
                value={props.heading}
                onChange={(v) => onUpdateProps?.({ heading: v })}
                interactive={interactive}
              />
              <EditableText
                tagName="div"
                className="text-sm opacity-70"
                value={props.subheading}
                onChange={(v) => onUpdateProps?.({ subheading: v })}
                interactive={interactive}
              />
            </div>
          </div>
        </Center>
      </section>
    );
  }

  if (type === "cta") {
    return (
      <section id={currentSectionId} style={{ maxWidth: effectiveMaxWidth, ...css }} className="mx-auto w-full transition-all duration-300">
        <Center maxWidth="100%" className="max-w-3xl space-y-4">
          <EditableText
            tagName="h2"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            value={props.heading}
            onChange={(v) => onUpdateProps?.({ heading: v })}
            interactive={interactive}
          />
          {props.subheading || interactive ? (
            <EditableText
              tagName="p"
              className="text-lg opacity-90"
              value={props.subheading}
              onChange={(v) => onUpdateProps?.({ subheading: v })}
              interactive={interactive}
            />
          ) : null}
          {(() => {
            const buttonsList = props.buttons !== undefined ? props.buttons : (props.buttonText !== undefined ? [{ label: props.buttonText, variant: "solid" as const }] : undefined);
            if (!buttonsList && !interactive) return null;
            if (!buttonsList || buttonsList.length === 0) {
              return interactive ? (
                <div className="pt-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md border-2 border-dashed border-foreground/30 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all">
                        <Plus className="h-4 w-4" /> Add Button
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [{ label: "Join Now", variant: "solid" }], buttonText: undefined })}>Solid Button</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [{ label: "Join Now", variant: "outline" }], buttonText: undefined })}>Outline Button</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [{ label: "Join Now", variant: "ghost" }], buttonText: undefined })}>Ghost Button</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : null;
            }
            return (
              <div className="pt-2 flex flex-wrap items-center justify-center" style={{ gap: style.gap || "1rem" }}>
                {buttonsList.map((btn, i) => (
                  <div key={i} className="group/btn relative inline-flex">
                    <EditableText
                      tagName="span"
                      className={`inline-flex items-center px-6 py-3 text-base font-semibold shadow-lg transition-all cursor-pointer select-none ${
                        btn.variant === "outline" ? "border-2 bg-transparent hover:bg-foreground/5" :
                        btn.variant === "ghost" ? "bg-transparent shadow-none hover:bg-foreground/5" :
                        "hover:brightness-110 active:scale-95"
                      }`}
                      style={{
                        backgroundColor: btn.variant === "outline" || btn.variant === "ghost" ? "transparent" : "#ffffff",
                        borderColor: btn.variant === "outline" ? "#ffffff" : "transparent",
                        color: btn.variant === "outline" || btn.variant === "ghost" ? "#ffffff" : style.backgroundColor || primary,
                        borderRadius: radius
                      }}
                      value={btn.label}
                      placeholder="Button text"
                      onChange={(v) => {
                        const next = [...buttonsList];
                        next[i] = { ...next[i], label: v };
                        onUpdateProps?.({ buttons: next, buttonText: undefined });
                      }}
                      interactive={interactive}
                    />
                    {interactive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const next = [...buttonsList];
                          next.splice(i, 1);
                          onUpdateProps?.({ buttons: next.length > 0 ? next : undefined, buttonText: undefined });
                        }}
                        className="absolute -top-2 -right-3 hidden h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white shadow hover:bg-rose-600 group-hover/btn:flex z-10"
                        title="Remove Button"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                {interactive && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-foreground/30 bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all" title="Add Secondary Button">
                        <Plus className="h-5 w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Learn More", variant: "solid" }] as any, buttonText: undefined })}>Solid Button</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Learn More", variant: "outline" }] as any, buttonText: undefined })}>Outline Button</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdateProps?.({ buttons: [...buttonsList, { label: "Learn More", variant: "ghost" }] as any, buttonText: undefined })}>Ghost Button</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            );
          })()}
        </Center>
      </section>
    );
  }

  if (type === "form") {
    return (
      <section id={currentSectionId} style={{ maxWidth: effectiveMaxWidth, ...css }} className="mx-auto w-full transition-all duration-300">
        <Center maxWidth="100%">
          <div className="mx-auto w-full space-y-6" style={{ maxWidth: style.maxWidth || "560px" }}>
            <div>
              <EditableText
                tagName="h2"
                className="text-3xl font-bold tracking-tight"
                value={props.heading}
                onChange={(v) => onUpdateProps?.({ heading: v })}
                interactive={interactive}
              />
              {props.subheading || interactive ? (
                <EditableText
                  tagName="p"
                  className="mt-2 opacity-70"
                  value={props.subheading}
                  onChange={(v) => onUpdateProps?.({ subheading: v })}
                  interactive={interactive}
                />
              ) : null}
            </div>
            <form
              className="space-y-4 text-left"
              onSubmit={interactive ? (e) => e.preventDefault() : undefined}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block font-medium opacity-80">Name</span>
                  <input
                    className="w-full border border-black/10 bg-white/80 px-3 py-2 outline-none ring-0 focus:border-black/30"
                    style={{ borderRadius: radius }}
                    placeholder="Jane Doe"
                    disabled={interactive}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium opacity-80">Email</span>
                  <input
                    type="email"
                    className="w-full border border-black/10 bg-white/80 px-3 py-2 outline-none focus:border-black/30"
                    style={{ borderRadius: radius }}
                    placeholder="jane@company.com"
                    disabled={interactive}
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1 block font-medium opacity-80">Message</span>
                <textarea
                  rows={4}
                  className="w-full border border-black/10 bg-white/80 px-3 py-2 outline-none focus:border-black/30"
                  style={{ borderRadius: radius }}
                  placeholder={props.placeholder || "Your message…"}
                  disabled={interactive}
                />
              </label>
              <EditableText
                tagName="span"
                className="w-full px-4 py-3 font-semibold text-white shadow-md text-center"
                style={{ backgroundColor: primary, borderRadius: radius, display: "block" }}
                value={props.buttonText || "Submit"}
                onChange={(v) => onUpdateProps?.({ buttonText: v })}
                interactive={interactive}
              />
            </form>
          </div>
        </Center>
      </section>
    );
  }

  if (type === "spacer") {
    const height = style.padding || "40px 0";
    return <div style={{ ...css, padding: height, minHeight: 24 }} aria-hidden />;
  }

  if (type === "divider") {
    return (
      <div style={css} className="">
        <Center>
          <hr style={{ borderColor: style.textColor || "#e2e8f0", borderTopWidth: 1 }} />
        </Center>
      </div>
    );
  }

  if (type === "footer") {
    return (
      <footer id={currentSectionId} style={css} className="">
        <Center className="space-y-6">
          {(() => {
            const text = props.logoText ?? "Brand";
            if (text === "") {
              return interactive ? (
                <button
                  onClick={() => onUpdateProps?.({ logoText: "Brand" })}
                  className="mx-auto flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-dashed border-white/30 bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all"
                >
                  <Plus className="h-3 w-3" /> Add Logo
                </button>
              ) : <div />;
            }
            return (
              <div className="group/logo relative inline-flex">
                <EditableText
                  tagName="div"
                  className="text-lg font-bold text-white"
                  value={text}
                  onChange={(v) => onUpdateProps?.({ logoText: v })}
                  interactive={interactive}
                />
                {interactive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateProps?.({ logoText: "" });
                    }}
                    className="absolute -top-2 -right-4 hidden h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white shadow hover:bg-rose-600 group-hover/logo:flex z-10"
                    title="Remove Logo"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            );
          })()}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-sm" style={{ gap: style.gap || "1.25rem" }}>
            {(props.links || []).map((link, i) => (
              <div key={i} className="group/link relative flex items-center">
                <EditableText
                  tagName="span"
                  className={`transition ${
                    link.variant === "bold"
                      ? "font-bold text-white opacity-100"
                      : link.variant === "muted"
                      ? "text-white/60 hover:text-white opacity-100"
                      : link.variant === "button"
                      ? "px-3 py-1.5 rounded-md font-semibold opacity-100 hover:brightness-110 shadow-sm"
                      : "hover:opacity-100 opacity-80"
                  }`}
                  style={link.variant === "button" ? { backgroundColor: primary, color: "#ffffff", borderRadius: radius } : {}}
                  value={link.label}
                  onChange={(v) => {
                    const next = [...(props.links || [])];
                    next[i] = { ...next[i], label: v };
                    onUpdateProps?.({ links: next });
                  }}
                  interactive={interactive}
                />
                {interactive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = [...(props.links || [])];
                      next.splice(i, 1);
                      onUpdateProps?.({ links: next });
                    }}
                    className="absolute -top-2 -right-3 hidden h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600 group-hover/link:flex z-10"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>
            ))}
            {interactive && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex h-5 w-5 items-center justify-center rounded-full border border-dashed border-white/30 bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all"
                    title="Add Link"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-40 rounded-xl">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      const next = [...(props.links || []), { label: "New Link", href: "#", variant: "default" }];
                      onUpdateProps?.({ links: next });
                    }}
                  >
                    Default Link
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      const next = [...(props.links || []), { label: "Bold Link", href: "#", variant: "bold" }];
                      onUpdateProps?.({ links: next });
                    }}
                  >
                    Bold Link
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      const next = [...(props.links || []), { label: "Muted Link", href: "#", variant: "muted" }];
                      onUpdateProps?.({ links: next });
                    }}
                  >
                    Muted Link
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      const next = [...(props.links || []), { label: "Button Link", href: "#", variant: "button" }];
                      onUpdateProps?.({ links: next });
                    }}
                  >
                    Button Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
          {props.socialLinks?.length || interactive ? (
            <div className="flex flex-wrap justify-center gap-4 text-xs uppercase tracking-wider opacity-70">
              {(props.socialLinks || []).map((s, i) => (
                <div key={i} className="group/social relative flex items-center">
                  <EditableText
                    tagName="span"
                    value={s.platform}
                    onChange={(v) => {
                      const next = [...(props.socialLinks || [])];
                      next[i] = { ...next[i], platform: v };
                      onUpdateProps?.({ socialLinks: next });
                    }}
                    interactive={interactive}
                  />
                  {interactive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const next = [...(props.socialLinks || [])];
                        next.splice(i, 1);
                        onUpdateProps?.({ socialLinks: next });
                      }}
                      className="absolute -top-2 -right-3 hidden h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600 group-hover/social:flex z-10"
                    >
                      <X className="h-2 w-2" />
                    </button>
                  )}
                </div>
              ))}
              {interactive && (
                <button
                  onClick={() => {
                    const next = [...(props.socialLinks || []), { platform: "SOCIAL", href: "#" }];
                    onUpdateProps?.({ socialLinks: next });
                  }}
                  className="flex h-4 w-4 items-center justify-center rounded-full border border-dashed border-white/30 bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all"
                  title="Add Social"
                >
                  <Plus className="h-2.5 w-2.5" />
                </button>
              )}
            </div>
          ) : null}
          <EditableText
            tagName="p"
            className="text-sm opacity-60"
            value={props.text}
            onChange={(v) => onUpdateProps?.({ text: v })}
            interactive={interactive}
          />
        </Center>
      </footer>
    );
  }

  return (
    <div style={css} className="p-4 text-sm opacity-60">
      Unknown component: {type}
    </div>
  );
}

export function PageRenderer({
  components,
  theme,
  interactive = false,
}: {
  components: BuilderComponent[];
  theme: SiteTheme;
  interactive?: boolean;
}) {
  return (
    <div
      className="min-h-full w-full"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      {components.map((c) => (
        <ComponentRenderer key={c.id} component={c} theme={theme} interactive={interactive} />
      ))}
    </div>
  );
}
