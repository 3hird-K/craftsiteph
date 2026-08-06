"use client";

import { useState, useEffect } from "react";
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
        <div className="pt-6 pb-5 px-6 border-b border-border/40">
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
  const [isAppDark, setIsAppDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsAppDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === "class") checkDark();
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const isDark = theme.mode === "dark" || isAppDark;
  const isLightTheme = !isDark;

  const cardBg = isLightTheme ? "#ffffff" : "#0b1329";
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
    case "fullbleed-image-hero":
      return (
        <div
          className="w-full p-3.5 text-center flex flex-col items-center justify-center gap-1.5 shadow-md relative overflow-hidden bg-cover bg-center text-white min-h-[76px]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80')",
            borderRadius: navRadius,
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-0" />
          <span className="font-extrabold text-xs relative z-10 text-white">Craft stunning websites with zero limits</span>
          <span className="text-[9px] opacity-85 line-clamp-1 relative z-10 text-white/90">The ultimate visual web builder designed for modern teams.</span>
          <span className="mt-0.5 px-3 py-1 text-[9px] font-bold text-white shadow-xs relative z-10" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
            Start Building Free
          </span>
        </div>
      );
    case "split-showcase-hero":
    case "split-image":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} flex items-center justify-between gap-3 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="flex-1 space-y-1">
            <span className="font-bold text-[11px] leading-tight block" style={{ color: cardTextColor }}>Turn ideas into live websites</span>
            <span className="text-[9px] opacity-75 block line-clamp-1">Visual drag-and-drop page builder for teams.</span>
            <span className="inline-block mt-0.5 px-2.5 py-0.5 text-[9px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
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
    case "centered-dashboard-hero":
    case "app-preview":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} flex flex-col items-center text-center gap-1.5 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <span className="px-2 py-0.5 text-[8px] font-extrabold text-primary bg-primary/10 border border-primary/20 rounded-full">
            ✦ NEW: AI Web Builder v2.0
          </span>
          <span className="font-extrabold text-[11px] leading-tight" style={{ color: cardTextColor }}>Manage everything in one workspace</span>
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 text-[9px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Start Free Trial
            </span>
            <span className="px-2 py-0.5 text-[9px] font-semibold border opacity-80" style={{ borderColor: primaryColor, borderRadius: navRadius }}>
              Watch 2-Min Tour
            </span>
          </div>
          <div
            className="w-full h-9 bg-muted/60 border border-border/60 flex items-center justify-center text-[8px] font-bold opacity-80"
            style={{ borderRadius: navRadius }}
          >
            3D Dashboard Preview
          </div>
        </div>
      );
    case "interactive-search-hero":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} flex flex-col items-center text-center gap-1.5 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <span className="font-extrabold text-xs tracking-tight" style={{ color: cardTextColor }}>Find and build anything visually</span>
          <span className="text-[9px] opacity-75 line-clamp-1">Search thousands of pre-built UI components.</span>
          <div className="w-full max-w-[200px] h-7 bg-muted/80 border border-border flex items-center justify-between px-2 text-[8px] opacity-80" style={{ borderRadius: navRadius }}>
            <span className="opacity-60">🔍 Search templates...</span>
            <span className="px-1.5 py-0.5 text-[7px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>Search</span>
          </div>
        </div>
      );
    case "bento-grid-hero":
    case "bento-hero":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} flex items-center gap-2 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="flex-1 space-y-1">
            <span className="font-extrabold text-[10px] leading-tight block" style={{ color: cardTextColor }}>Intelligent components built for scale</span>
            <span className="px-2 py-0.5 text-[8px] font-bold text-white inline-block shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Explore Bento Grid
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 w-24">
            <div className="p-1 bg-muted/80 text-[8px] font-bold text-center opacity-80" style={{ borderRadius: navRadius }}>99.9% Uptime</div>
            <div className="p-1 bg-muted/80 text-[8px] font-bold text-center opacity-80" style={{ borderRadius: navRadius }}>Fast Setup</div>
          </div>
        </div>
      );
    case "mobile-app-hero":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} flex items-center justify-between gap-2 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="flex-1 space-y-1">
            <span className="font-extrabold text-[10px] leading-tight block" style={{ color: cardTextColor }}>Workspace in your pocket</span>
            <span className="text-[8px] opacity-75 block line-clamp-1">Download app for iOS & Android.</span>
            <div className="flex gap-1 mt-0.5">
              <span className="px-1.5 py-0.5 text-[7px] font-bold text-white" style={{ backgroundColor: primaryColor, borderRadius: "4px" }}>App Store</span>
              <span className="px-1.5 py-0.5 text-[7px] font-bold border" style={{ borderColor: primaryColor, borderRadius: "4px" }}>Google Play</span>
            </div>
          </div>
          <div className="w-10 h-14 bg-muted border border-border flex items-center justify-center text-[7px] font-bold shrink-0 opacity-80" style={{ borderRadius: "8px" }}>
            iPhone
          </div>
        </div>
      );

    // FEATURES & CARDS VARIANTS
    case "bento-grid-features":
    case "bento-card-stack":
      return (
        <div
          className={`grid grid-cols-3 gap-1.5 p-2 border ${borderStyle} transition-all w-full`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="col-span-2 p-2 bg-primary/10 border border-primary/30 text-[9px] flex flex-col justify-between space-y-1" style={{ borderRadius: navRadius }}>
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[9px] text-primary">✦ Spotlight</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
            <span className="font-extrabold text-[10px]" style={{ color: cardTextColor }}>Visual Drag & Drop</span>
            <span className="text-[8px] opacity-75 line-clamp-1">Real-time DOM updates & custom CSS.</span>
          </div>
          <div className="p-1.5 bg-muted/60 text-[8px] flex flex-col justify-center space-y-0.5" style={{ borderRadius: navRadius }}>
            <span className="font-bold block" style={{ color: cardTextColor }}>AI Generator</span>
            <span className="opacity-70 text-[7px]">React code</span>
          </div>
        </div>
      );

    case "glass-cards-features":
    case "modern-service-cards":
      return (
        <div
          className={`grid grid-cols-3 gap-1.5 p-2 border ${borderStyle} transition-all w-full`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="p-2 bg-muted/40 border border-border/50 text-[8px] space-y-1" style={{ borderRadius: navRadius }}>
            <span className="h-2 w-2 rounded-full block" style={{ backgroundColor: primaryColor }} />
            <span className="font-bold block" style={{ color: cardTextColor }}>Live Themes</span>
            <span className="opacity-75 text-[7px] block line-clamp-1">Instant color presets</span>
          </div>
          <div className="p-2 bg-muted/40 border border-border/50 text-[8px] space-y-1" style={{ borderRadius: navRadius }}>
            <span className="h-2 w-2 rounded-full block" style={{ backgroundColor: primaryColor }} />
            <span className="font-bold block" style={{ color: cardTextColor }}>Unified Mobile</span>
            <span className="opacity-75 text-[7px] block line-clamp-1">Responsive editing</span>
          </div>
          <div className="p-2 bg-muted/40 border border-border/50 text-[8px] space-y-1" style={{ borderRadius: navRadius }}>
            <span className="h-2 w-2 rounded-full block" style={{ backgroundColor: primaryColor }} />
            <span className="font-bold block" style={{ color: cardTextColor }}>Edge Publishing</span>
            <span className="opacity-75 text-[7px] block line-clamp-1">1-Click deploy</span>
          </div>
        </div>
      );

    case "split-feature-showcase":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} flex items-center justify-between gap-2 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="flex-1 space-y-1 text-left">
            <span className="font-extrabold text-[10px] leading-tight block" style={{ color: cardTextColor }}>Designed for product teams</span>
            <span className="text-[8px] opacity-75 block line-clamp-1">Collaborate in real-time & launch 10x faster.</span>
            <div className="flex items-center gap-1 text-[7px] font-bold text-primary">
              <span>✓ Visual Canvas</span>
              <span>✓ Code Sync</span>
            </div>
          </div>
          <div className="w-16 h-12 bg-muted/80 border border-border flex items-center justify-center text-[7px] font-bold shrink-0 opacity-80" style={{ borderRadius: "8px" }}>
            Dashboard
          </div>
        </div>
      );

    case "minimal-matrix-features":
      return (
        <div
          className={`grid grid-cols-4 gap-1 p-2 border ${borderStyle} transition-all w-full text-center`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="p-1 bg-muted/30 text-[8px]"><span className="font-bold block text-[7px]" style={{ color: cardTextColor }}>SEO</span></div>
          <div className="p-1 bg-muted/30 text-[8px]"><span className="font-bold block text-[7px]" style={{ color: cardTextColor }}>Fast</span></div>
          <div className="p-1 bg-muted/30 text-[8px]"><span className="font-bold block text-[7px]" style={{ color: cardTextColor }}>Fonts</span></div>
          <div className="p-1 bg-muted/30 text-[8px]"><span className="font-bold block text-[7px]" style={{ color: cardTextColor }}>SSL</span></div>
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
    case "full-width-primary":
    case "full-width-cta":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} text-center flex flex-col items-center justify-center gap-1.5 transition-all shadow-md`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "14px" }}
        >
          <span className="font-extrabold text-xs" style={{ color: cardTextColor }}>Ready to ship your next page?</span>
          <span className="text-[9px] opacity-75 line-clamp-1">Join thousands of makers designing with CraftSite.</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="px-3 py-1 text-[9px] font-extrabold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Create Free Project
            </span>
            <span className="px-2.5 py-1 text-[9px] font-bold border opacity-80" style={{ borderColor: primaryColor, borderRadius: navRadius }}>
              Contact Sales
            </span>
          </div>
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
          <div className="flex items-center gap-1 shrink-0">
            <span className="px-2.5 py-1 text-[9px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Start Free Trial
            </span>
          </div>
        </div>
      );

    case "newsletter-input-cta":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} text-center flex flex-col items-center justify-center gap-1.5 transition-all shadow-md`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "14px" }}
        >
          <span className="font-extrabold text-xs" style={{ color: cardTextColor }}>Get instant access to CraftSite Pro</span>
          <div className="w-full max-w-[220px] flex items-center gap-1 bg-muted/70 p-1 border border-border/80 rounded-lg">
            <span className="text-[8px] opacity-60 px-1 truncate">name@company.com</span>
            <span className="px-2 py-0.5 text-[8px] font-bold text-white shrink-0 shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: "6px" }}>
              Claim Free
            </span>
          </div>
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
          <div className="flex gap-2 text-[7px] text-white/80 opacity-90 my-0.5">
            <span>✓ Custom Domains</span>
            <span>✓ Clean Export</span>
          </div>
          <span className="px-3 py-0.5 text-[9px] font-bold text-slate-950 bg-white shadow-xs rounded-md">
            Upgrade Pro Plan
          </span>
        </div>
      );

    case "app-preview-cta":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} flex items-center justify-between gap-2 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: navRadius }}
        >
          <div className="flex-1 space-y-0.5 text-left">
            <span className="font-extrabold text-[10px] leading-tight block" style={{ color: cardTextColor }}>Accelerate with live preview</span>
            <span className="text-[8px] opacity-75 block line-clamp-1">Responsive previews & automatic code export.</span>
            <span className="px-2 py-0.5 text-[8px] font-bold text-white inline-block shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Explore Platform
            </span>
          </div>
          <div className="w-16 h-12 bg-muted/80 border border-border flex items-center justify-center text-[7px] font-bold shrink-0 opacity-80" style={{ borderRadius: "8px" }}>
            3D Dashboard
          </div>
        </div>
      );

    case "minimal-inline-cta":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} flex items-center justify-between gap-2 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "12px" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: primaryColor }} />
            <span className="font-bold text-[10px]" style={{ color: cardTextColor }}>Want to see CraftSite in action?</span>
          </div>
          <span className="px-2 py-0.5 text-[9px] font-bold border opacity-90 hover:opacity-100 shrink-0" style={{ borderColor: primaryColor, color: primaryColor, borderRadius: navRadius }}>
            Watch Demo →
          </span>
        </div>
      );

    /* Footer Variants */
    case "multi-column-links":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} text-[10px] space-y-2 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "12px" }}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <span className="font-extrabold text-xs block" style={{ color: cardTextColor }}>CraftSite</span>
              <span className="text-[8px] opacity-75 block">Building the future of visual web creation.</span>
            </div>
            <div className="flex gap-4 text-[8px] opacity-80">
              <div className="space-y-0.5"><span className="font-bold block" style={{ color: cardTextColor }}>Product</span><span>Features</span></div>
              <div className="space-y-0.5"><span className="font-bold block" style={{ color: cardTextColor }}>Company</span><span>About</span></div>
            </div>
          </div>
          <div className="pt-1 border-t border-border/60 text-[8px] opacity-60 flex justify-between">
            <span>© 2026 CraftSite Inc.</span>
            <span>Twitter • GitHub</span>
          </div>
        </div>
      );

    case "centered-minimal":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} text-center space-y-1.5 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "12px" }}
        >
          <span className="font-black text-xs block" style={{ color: cardTextColor }}>CraftSite</span>
          <div className="flex justify-center gap-3 text-[9px] opacity-80">
            <span>Privacy</span><span>Terms</span><span>Contact</span><span>Support</span>
          </div>
          <span className="text-[8px] opacity-50 block">© 2026 CraftSite. Built with passion.</span>
        </div>
      );

    case "newsletter-split-footer":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} text-[10px] space-y-2 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "12px" }}
        >
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-muted/40 border border-border/60">
            <span className="text-[8px] opacity-75">Subscribe to updates</span>
            <span className="px-2 py-0.5 text-[8px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
              Join
            </span>
          </div>
          <div className="flex justify-between items-center text-[8px] opacity-75">
            <span className="font-bold" style={{ color: cardTextColor }}>CraftSite</span>
            <span>© 2026 CraftSite Inc.</span>
          </div>
        </div>
      );

    case "dark-tech-dock":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} text-[10px] space-y-2 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "12px" }}
        >
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs" style={{ color: cardTextColor }}>CraftSite Dev</span>
            <span className="px-2 py-0.5 text-[8px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full">
              🟢 Operational
            </span>
          </div>
          <div className="flex justify-between text-[8px] opacity-75">
            <span>Status • API Docs • GitHub</span>
            <span>© 2026</span>
          </div>
        </div>
      );

    case "stacked-brand-statement":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} text-center space-y-1 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "12px" }}
        >
          <span className="font-black text-sm tracking-widest block" style={{ color: cardTextColor }}>CRAFTSITE</span>
          <span className="text-[8px] tracking-wider opacity-75 block">VISUAL BUILDER FOR CREATORS</span>
          <span className="text-[7px] opacity-50 block pt-1">© 2026 ALL RIGHTS RESERVED</span>
        </div>
      );

    case "compact-bottom-bar":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} flex items-center justify-between text-[9px] transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "10px" }}
        >
          <span className="font-extrabold text-[10px]" style={{ color: cardTextColor }}>CraftSite</span>
          <span className="opacity-70">© 2026 • Privacy • Terms</span>
        </div>
      );

    /* Contact Form Variants */
    case "classic-centered-form":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} text-center space-y-1.5 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "14px" }}
        >
          <span className="font-extrabold text-xs block" style={{ color: cardTextColor }}>Get in touch</span>
          <div className="w-11/12 mx-auto space-y-1">
            <div className="h-2.5 rounded bg-muted/60 border border-border/40 w-full" />
            <div className="h-2.5 rounded bg-muted/60 border border-border/40 w-full" />
            <div className="h-4 rounded bg-muted/60 border border-border/40 w-full" />
          </div>
          <span className="mt-1 px-3 py-0.5 text-[8px] font-bold text-white shadow-xs inline-block" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
            Send Message
          </span>
        </div>
      );

    case "split-contact-info-form":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} grid grid-cols-2 gap-2 text-[9px] transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "14px" }}
        >
          <div className="space-y-1 text-left">
            <span className="font-extrabold text-[10px] block" style={{ color: cardTextColor }}>Contact Us</span>
            <span className="text-[7px] opacity-75 block">hello@craftsite.io</span>
            <span className="text-[7px] opacity-75 block">+1 (800) 555-0199</span>
          </div>
          <div className="p-1.5 rounded-lg bg-muted/30 border border-border/60 space-y-1">
            <div className="h-2 rounded bg-muted/60 border border-border/40 w-full" />
            <div className="h-2 rounded bg-muted/60 border border-border/40 w-full" />
            <div className="h-2.5 rounded text-[7px] text-white font-bold flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
              Send
            </div>
          </div>
        </div>
      );

    case "boxed-dark-glass-form":
      return (
        <div
          className={`w-full p-3 border ${borderStyle} text-center space-y-1.5 transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "16px" }}
        >
          <span className="font-extrabold text-xs block" style={{ color: cardTextColor }}>Start a Conversation</span>
          <div className="w-11/12 mx-auto space-y-1">
            <div className="h-2.5 rounded bg-muted/60 border border-border/40 w-full" />
            <div className="h-4 rounded bg-muted/60 border border-border/40 w-full" />
          </div>
          <span className="px-3 py-0.5 text-[8px] font-bold text-white shadow-xs inline-block" style={{ backgroundColor: primaryColor, borderRadius: navRadius }}>
            Submit Inquiry
          </span>
        </div>
      );

    case "map-split-form":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} grid grid-cols-2 gap-2 text-[9px] transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "14px" }}
        >
          <div className="p-1.5 rounded-lg bg-muted/40 border border-border/60 space-y-1 flex flex-col justify-between">
            <span className="font-bold text-[8px]" style={{ color: cardTextColor }}>Headquarters</span>
            <span className="text-[7px] opacity-70">San Francisco, CA</span>
          </div>
          <div className="space-y-1">
            <div className="h-2 rounded bg-muted/60 border border-border/40 w-full" />
            <div className="h-2 rounded bg-muted/60 border border-border/40 w-full" />
            <div className="h-2.5 rounded text-[7px] text-white font-bold flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
              Send
            </div>
          </div>
        </div>
      );

    case "compact-newsletter-contact":
      return (
        <div
          className={`w-full p-2.5 border ${borderStyle} flex items-center justify-between gap-2 text-[9px] transition-all`}
          style={{ backgroundColor: cardBg, color: cardTextColor, borderRadius: "12px" }}
        >
          <div className="space-y-0.5 text-left">
            <span className="font-bold block text-[10px]" style={{ color: cardTextColor }}>Have Questions?</span>
            <span className="text-[7px] opacity-70">Request callback</span>
          </div>
          <div className="flex gap-1 shrink-0">
            <div className="w-16 h-4 rounded bg-muted/60 border border-border/40" />
            <span className="px-2 py-0.5 text-[7px] font-bold text-white shrink-0" style={{ backgroundColor: primaryColor, borderRadius: "6px" }}>
              Send
            </span>
          </div>
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
