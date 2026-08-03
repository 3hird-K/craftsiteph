"use client";

import { ComponentType, SiteTheme } from "@/lib/types";
import { COMPONENT_VARIANTS, PALETTE, ComponentVariant } from "@/lib/presets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout, Sparkles, Check, ArrowRight } from "lucide-react";

type Props = {
  open: boolean;
  componentType: ComponentType | null;
  theme: SiteTheme;
  onClose: () => void;
  onSelectLayout: (type: ComponentType, variantId: string) => void;
};

export function ComponentVariantModal({
  open,
  componentType,
  theme,
  onClose,
  onSelectLayout,
}: Props) {
  if (!componentType) return null;

  const itemInfo = PALETTE.find((p) => p.type === componentType);
  const variants = COMPONENT_VARIANTS[componentType] || [];
  const typeLabel = itemInfo?.label || componentType;

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) onClose(); }}>
      <DialogContent
        className="sm:max-w-[840px] md:max-w-[900px] border-border/80 bg-background/95 backdrop-blur-2xl shadow-2xl p-0 overflow-hidden rounded-2xl"
        style={{
          borderRadius: "24px",
          fontFamily: theme.fontFamily || "inherit",
        }}
      >
        {/* Header */}
        <div
          className="p-6 pb-4 border-b border-border/50"
          style={{
            background: `linear-gradient(to right, ${theme.primaryColor || "#ea580c"}18, ${theme.primaryColor || "#ea580c"}05, transparent)`,
          }}
        >
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="p-2 transition-all flex items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${theme.primaryColor || "#ea580c"}20`,
                  color: theme.primaryColor || "#ea580c",
                }}
              >
                <Layout className="h-5 w-5" />
              </span>
              <div>
                <DialogTitle className="text-xl font-extrabold tracking-tight">
                  Select {typeLabel} Layout Design
                </DialogTitle>
              </div>
            </div>
            <DialogDescription className="text-xs text-muted-foreground ml-9">
              Choose how your {typeLabel.toLowerCase()} section should look on your website.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Variant Cards Grid */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="flex items-center justify-between px-1 text-xs text-muted-foreground font-semibold">
            <span>Choose a layout design template</span>
            <span className="bg-muted px-2 py-0.5 rounded-full text-[11px] font-bold text-foreground">
              {variants.length} Layouts Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {variants.map((v) => (
              <div
                key={v.id}
                onClick={() => {
                  onSelectLayout(componentType, v.id);
                  onClose();
                }}
                className="group relative flex flex-col justify-between p-4 rounded-2xl border border-border/80 bg-card hover:bg-background hover:border-primary/60 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
              >
                {/* Visual Component Preview Thumbnail (Top) */}
                <div className="w-full p-2.5 rounded-xl bg-muted/40 border border-border/50 group-hover:border-primary/40 group-hover:bg-muted/60 transition-all flex items-center justify-center min-h-[76px] overflow-hidden mb-3">
                  <RealisticLayoutPreview variantId={v.id} theme={theme} />
                </div>

                {/* Content Header */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {v.name}
                    </h3>
                    {v.badge && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: `${theme.primaryColor || "#ea580c"}15`,
                          color: theme.primaryColor || "#ea580c",
                        }}
                      >
                        {v.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {v.description}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="mt-4 flex items-center justify-between pt-2.5 border-t border-border/40 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  <span>Use This Layout</span>
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted group-hover:bg-primary group-hover:text-white transition-all">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RealisticLayoutPreview({
  variantId,
  theme,
}: {
  variantId: string;
  theme: SiteTheme;
}) {
  const primaryColor = theme.primaryColor || "#ea580c";
  const isLightTheme =
    !theme.backgroundColor ||
    theme.backgroundColor === "#ffffff" ||
    theme.backgroundColor === "#fafafa" ||
    theme.backgroundColor === "#f8fafc" ||
    theme.backgroundColor === "#f1f5f9" ||
    (theme.backgroundColor.startsWith("#f") && theme.backgroundColor.length === 7);

  const cardBg = isLightTheme ? "#ffffff" : "#0f172a";
  const cardTextColor = isLightTheme ? "#0f172a" : "#f8fafc";
  const navRadius = theme.borderRadius || "12px";
  const borderStyle = isLightTheme ? "border-slate-200" : "border-slate-800";

  switch (variantId) {
    // NAVBAR VARIANTS
    case "classic-split":
      return (
        <div
          className={`w-full p-2.5 flex items-center justify-between text-xs border ${borderStyle} shadow-sm transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "0px" }}
        >
          <span className="font-extrabold text-[11px]" style={{ color: cardTextColor }}>Brand</span>
          <div className="hidden sm:flex items-center gap-3 text-[10px] opacity-75">
            <span>Home</span>
            <span>Features</span>
            <span>Pricing</span>
            <span>Contact</span>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
            Get Started
          </span>
        </div>
      );
    case "centered-minimal":
      return (
        <div
          className={`w-full p-3 flex flex-col items-center gap-2 text-center border ${borderStyle} shadow-sm transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "0px" }}
        >
          <span className="font-black text-xs tracking-wider" style={{ color: cardTextColor }}>CRAFTSITE</span>
          <div className="flex items-center gap-4 text-[10px] opacity-75 font-medium">
            <span>Home</span>
            <span>Showcase</span>
            <span>Pricing</span>
            <span>Contact</span>
          </div>
        </div>
      );
    case "floating-glass":
      return (
        <div className="w-full py-1">
          <div
            className={`mx-auto w-11/12 p-2 px-3 flex items-center justify-between border ${borderStyle} shadow-md text-xs transition-all`}
            style={{
              backgroundColor: isLightTheme ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.9)",
              color: cardTextColor,
              borderRadius: navRadius,
            }}
          >
            <span className="font-bold text-[11px]" style={{ color: cardTextColor }}>Studio</span>
            <div className="flex gap-2.5 text-[10px] opacity-75">
              <span>Work</span>
              <span>About</span>
              <span>Blog</span>
            </div>
            <span className="px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Sign In
            </span>
          </div>
        </div>
      );

    case "inline-left":
      return (
        <div
          className={`w-full p-2.5 flex items-center justify-between text-xs border ${borderStyle} shadow-sm transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "0px" }}
        >
          <div className="flex items-center gap-3">
            <span className="font-black text-[11px]" style={{ color: cardTextColor }}>Pulse</span>
            <div className="h-3 w-px bg-border" />
            <div className="hidden sm:flex items-center gap-2.5 text-[10px] opacity-75">
              <span>Overview</span>
              <span>Integrations</span>
              <span>Changelog</span>
            </div>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
            Launch App
          </span>
        </div>
      );
    case "dual-action":
      return (
        <div
          className={`w-full p-2.5 flex items-center justify-between text-xs border ${borderStyle} shadow-sm transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "0px" }}
        >
          <span className="font-extrabold text-[11px]" style={{ color: cardTextColor }}>Horizon</span>
          <div className="hidden sm:flex items-center gap-3 text-[10px] opacity-75">
            <span>Features</span>
            <span>Enterprise</span>
            <span>Pricing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 text-[9px] font-semibold border opacity-80" style={{ borderColor: primaryColor, borderRadius: navRadius }}>
              Log In
            </span>
            <span className="px-2.5 py-1 text-[10px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Start Free Trial
            </span>
          </div>
        </div>
      );
    case "bordered-light":
      return (
        <div
          className={`w-full border-b-2 p-2.5 flex items-center justify-between text-xs transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderColor: primaryColor, borderRadius: "0px" }}
        >
          <span className="font-extrabold text-[11px] tracking-tight" style={{ color: cardTextColor }}>Vanguard</span>
          <div className="hidden sm:flex items-center gap-3 text-[10px] opacity-75">
            <span>Platform</span>
            <span>Developers</span>
            <span>Resources</span>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
            Book Demo
          </span>
        </div>
      );

    // HERO VARIANTS
    case "centered-hero":
      return (
        <div
          className={`w-full p-3.5 border ${borderStyle} text-center flex flex-col items-center justify-center gap-1.5 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <span className="font-extrabold text-xs" style={{ color: cardTextColor }}>Build something people love</span>
          <span className="text-[10px] opacity-75 line-clamp-1">Design landing pages in minutes. Customize every component.</span>
          <span className="mt-1 px-3 py-1 text-[10px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
            Start building free
          </span>
        </div>
      );
    case "split-image":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} flex items-center justify-between gap-3 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="flex-1 space-y-1">
            <span className="font-bold text-[11px] leading-tight block" style={{ color: cardTextColor }}>Turn ideas into live websites</span>
            <span className="text-[9px] opacity-75 block line-clamp-1">Visual page builder with drag-and-drop flexibility.</span>
            <span className="inline-block mt-1 px-2.5 py-0.5 text-[9px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Explore Platform
            </span>
          </div>
          <div
            className="w-24 h-14 overflow-hidden bg-muted border border-border flex items-center justify-center text-[9px] font-semibold shrink-0 opacity-80"
            style={{ borderRadius: navRadius }}
          >
            Showcase Img
          </div>
        </div>
      );
    case "minimalist-hero":
      return (
        <div
          className={`w-full p-3.5 border ${borderStyle} text-center flex flex-col items-center justify-center gap-1 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <span className="font-extrabold text-xs tracking-tight" style={{ color: cardTextColor }}>Simplicity in visual design.</span>
          <span className="text-[10px] opacity-75">Minimalist layout for modern creators.</span>
          <span className="px-3 py-1 text-[10px] font-bold text-white mt-1 shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
            Get Started →
          </span>
        </div>
      );
    case "app-preview":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} flex flex-col items-center text-center gap-2 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <span className="font-extrabold text-[11px] leading-tight" style={{ color: cardTextColor }}>Manage everything in one workspace</span>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 text-[9px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Start Free Trial
            </span>
            <span className="px-2 py-0.5 text-[9px] font-semibold border opacity-80" style={{ borderColor: primaryColor, borderRadius: navRadius }}>
              Watch Demo
            </span>
          </div>
          <div
            className="w-full h-10 bg-muted/60 border border-border/60 flex items-center justify-center text-[9px] font-bold opacity-80"
            style={{ borderRadius: navRadius }}
          >
            App Dashboard Preview
          </div>
        </div>
      );
    case "gradient-glow":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} flex flex-col items-center text-center gap-1.5 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <span
            className="px-2 py-0.5 text-[9px] font-bold border"
            style={{
              backgroundColor: `${primaryColor}15`,
              borderColor: `${primaryColor}30`,
              color: primaryColor,
              borderRadius: navRadius,
            }}
          >
            Introducing Version 2.0
          </span>
          <span className="font-extrabold text-xs tracking-tight" style={{ color: cardTextColor }}>Build faster with intelligent components</span>
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 text-[9px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Get Started Free
            </span>
            <span className="text-[9px] font-semibold opacity-75">
              Book a Demo
            </span>
          </div>
        </div>
      );
    case "bento-hero":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} flex items-center gap-2 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="flex-1 space-y-1">
            <span className="font-extrabold text-[10px] leading-tight block" style={{ color: cardTextColor }}>Engineered for digital products</span>
            <span className="px-2 py-0.5 text-[8px] font-bold text-white inline-block shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Explore Features
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 w-24">
            <div className="p-1 bg-muted/80 text-[8px] font-bold text-center opacity-80" style={{ borderRadius: navRadius }}>99.9% Uptime</div>
            <div className="p-1 bg-muted/80 text-[8px] font-bold text-center opacity-80" style={{ borderRadius: navRadius }}>Fast Setup</div>
          </div>
        </div>
      );

    // FEATURES VARIANTS
    case "3-col-grid":
      return (
        <div
          className={`grid grid-cols-3 gap-1.5 p-2 border ${borderStyle} transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="p-1.5 bg-muted/60 text-[9px] space-y-0.5" style={{ borderRadius: navRadius }}>
            <span>🎯</span>
            <p className="font-bold truncate">Drag & drop</p>
          </div>
          <div className="p-1.5 bg-muted/60 text-[9px] space-y-0.5" style={{ borderRadius: navRadius }}>
            <span>🎨</span>
            <p className="font-bold truncate">Live styling</p>
          </div>
          <div className="p-1.5 bg-muted/60 text-[9px] space-y-0.5" style={{ borderRadius: navRadius }}>
            <span>🚀</span>
            <p className="font-bold truncate">Publishing</p>
          </div>
        </div>
      );
    case "2-col-cards":
      return (
        <div
          className={`grid grid-cols-2 gap-2 p-2 border ${borderStyle} transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="p-2 bg-muted/50 border border-border/50 text-[9px]" style={{ borderRadius: navRadius }}>
            <span className="font-bold block" style={{ color: cardTextColor }}>Pro Builder</span>
            <span className="opacity-75 text-[8px]">Full customization controls</span>
          </div>
          <div className="p-2 bg-muted/50 border border-border/50 text-[9px]" style={{ borderRadius: navRadius }}>
            <span className="font-bold block" style={{ color: cardTextColor }}>Live Themes</span>
            <span className="opacity-75 text-[8px]">Instant color presets</span>
          </div>
        </div>
      );

    // FOOTER VARIANTS
    case "dark-multi-column":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} flex items-center justify-between text-[9px] transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div>
            <span className="font-bold block" style={{ color: cardTextColor }}>Brand Inc.</span>
            <span className="text-[8px] opacity-60">© 2026 All rights reserved</span>
          </div>
          <div className="flex gap-2 text-[8px] opacity-75">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      );
    case "centered-minimal-footer":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} text-center text-[9px] space-y-1 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <span className="font-bold block" style={{ color: cardTextColor }}>Brand</span>
          <div className="flex justify-center gap-3 text-[8px] opacity-75">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      );

    // CTA VARIANTS
    case "full-width-primary":
    case "full-width-cta":
      return (
        <div
          className="w-full p-3 text-center flex flex-col items-center justify-center gap-1.5 shadow-md transition-all"
          style={{ backgroundColor: primaryColor, color: "#ffffff", borderRadius: "12px" }}
        >
          <span className="font-extrabold text-xs">Ready to ship your next page?</span>
          <span className="text-[9px] opacity-85 line-clamp-1">Join thousands of makers designing with CraftSite.</span>
          <span className="mt-0.5 px-3 py-1 text-[9px] font-extrabold text-slate-900 bg-white shadow-xs rounded-lg">
            Create Free Project
          </span>
        </div>
      );

    case "boxed-glass-card":
    case "boxed-cta":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} text-center flex flex-col items-center justify-center gap-1.5 transition-all shadow-md`}
          style={{ backgroundColor: isLightTheme ? "#0f172a" : "#1e293b", color: "#ffffff", borderRadius: "14px" }}
        >
          <span className="font-bold text-xs text-white">Accelerate your workflow today</span>
          <span className="text-[9px] opacity-75 line-clamp-1 text-slate-300">Get instant access to design templates.</span>
          <span className="mt-0.5 px-3 py-1 text-[9px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
            Get Started Now
          </span>
        </div>
      );

    case "split-headline-cta":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} flex items-center justify-between gap-2 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="flex-1 space-y-0.5 text-left">
            <span className="font-extrabold text-[11px] block" style={{ color: cardTextColor }}>Start building faster today</span>
            <span className="text-[9px] opacity-75 block line-clamp-1">Everything you need to launch products.</span>
          </div>
          <span className="px-2.5 py-1 text-[9px] font-bold text-white shadow-xs shrink-0" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
            Start Free Trial
          </span>
        </div>
      );

    case "gradient-glow-cta":
      return (
        <div
          className="w-full p-3 text-center flex flex-col items-center justify-center gap-1 shadow-lg transition-all relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, #312e81)`,
            color: "#ffffff",
            borderRadius: "14px",
          }}
        >
          <span className="px-2 py-0.5 text-[8px] font-extrabold bg-white/20 backdrop-blur-md text-white rounded-full">
            ✦ PRO EDITION
          </span>
          <span className="font-extrabold text-xs text-white">Unlock unlimited site creation</span>
          <span className="px-3 py-0.5 text-[9px] font-bold text-slate-950 bg-white shadow-xs rounded-md">
            Upgrade Pro Plan
          </span>
        </div>
      );

    case "minimal-inline-cta":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} flex items-center justify-between gap-2 transition-all`}
          style={{ backgroundColor: isLightTheme ? "#f8fafc" : "#0f172a", color: cardTextColor, borderRadius: "12px" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: primaryColor }} />
            <span className="font-bold text-[10px]" style={{ color: cardTextColor }}>Want to see it in action?</span>
          </div>
          <span className="px-2 py-0.5 text-[9px] font-bold border opacity-90 hover:opacity-100 shrink-0" style={{ borderColor: primaryColor, color: primaryColor, borderRadius: navRadius }}>
            Watch Demo →
          </span>
        </div>
      );

    case "dark-card-badge":
      return (
        <div
          className="w-full p-3 border border-slate-700/80 text-center flex flex-col items-center justify-center gap-1 transition-all shadow-md"
          style={{ backgroundColor: "#020617", color: "#f8fafc", borderRadius: "14px" }}
        >
          <span className="font-extrabold text-xs text-white">Transform how you build</span>
          <span className="text-[8px] text-slate-400">Join 50,000+ teams building next-generation websites.</span>
          <span className="mt-1 px-3 py-0.5 text-[9px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
            Join Waitlist
          </span>
        </div>
      );

    default:
      return (
        <div
          className={`w-full p-3 border ${borderStyle} text-center text-[10px] transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <span className="font-bold">Standard Layout Variant</span>
        </div>
      );
  }
}
