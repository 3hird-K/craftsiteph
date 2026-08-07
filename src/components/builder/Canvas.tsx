"use client";

import type { BuilderComponent, ComponentProps, ComponentStyle, ComponentType, SiteTheme } from "@/lib/types";
import { isTwoColumnLayout } from "@/lib/types";
import { ComponentRenderer, isDarkColor } from "@/components/renderer/ComponentRenderer";
import { PALETTE, COMPONENT_VARIANTS } from "@/lib/presets";
import { Plus, Trash2, ArrowUp, ArrowDown, Hash, LayoutGrid, GripVertical, ArrowLeftRight, Wifi, Battery, Signal, Lock, RotateCw, Copy, Monitor, Type } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  components: BuilderComponent[];
  theme: SiteTheme;
  selectedId: string | null;
  previewMode: "edit" | "preview";
  device: "desktop" | "tablet" | "mobile";
  showDeviceFrame?: boolean;
  onSelect: (id: string | null) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  onDelete: (id: string) => void;
  onUpdateProps?: (id: string, props: Partial<ComponentProps>) => void;
  onUpdateStyle?: (id: string, style: Partial<ComponentStyle>) => void;
  onOpenSetupModal?: () => void;
  onOpenLayoutModal?: (id: string, type: ComponentType) => void;
};

const deviceWidth = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

// Device Frame Wrapper Component
function DeviceFrame({ device, showDeviceFrame = true, canvasBg, children }: { device: Props["device"]; showDeviceFrame?: boolean; canvasBg?: string; children: React.ReactNode }) {
  if (!showDeviceFrame) {
    return (
      <div
        id="canvas-host"
        className="relative mx-auto my-6 flex-shrink-0 transition-all duration-300 flex flex-col relative z-10"
        style={{
          width: device === "mobile" ? "390px" : device === "tablet" ? "768px" : "100%",
          height: device === "mobile" ? "844px" : device === "tablet" ? "960px" : "100%",
          backgroundColor: canvasBg,
        }}
      >
        <div id="canvas-scroll-viewport" className="w-full flex-1 overflow-y-auto overflow-x-hidden relative z-10" style={{ backgroundColor: canvasBg }}>
          {children}
        </div>
      </div>
    );
  }
  if (device === "mobile") {
    return (
      <div
        className="relative mx-auto my-6 flex-shrink-0 transition-all duration-300 flex flex-col rounded-[52px] bg-slate-900 p-3.5 border-[3px] border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/10 select-none"
        style={{ width: "390px", height: "844px" }}
      >
        {/* Physical Side Buttons */}
        {/* Action Button */}
        <div className="absolute -left-[5px] top-24 w-[5px] h-7 bg-slate-700 rounded-l-md border-l border-slate-500/80 shadow-md" />
        {/* Volume Up */}
        <div className="absolute -left-[5px] top-36 w-[5px] h-12 bg-slate-700 rounded-l-md border-l border-slate-500/80 shadow-md" />
        {/* Volume Down */}
        <div className="absolute -left-[5px] top-52 w-[5px] h-12 bg-slate-700 rounded-l-md border-l border-slate-500/80 shadow-md" />
        {/* Power Button */}
        <div className="absolute -right-[5px] top-40 w-[5px] h-16 bg-slate-700 rounded-r-md border-r border-slate-500/80 shadow-md" />

        {/* Inner Screen Canvas Container */}
        <div id="canvas-host" className="w-full h-full rounded-[42px] overflow-hidden relative flex flex-col z-10 border border-black/40 shadow-inner" style={{ backgroundColor: canvasBg }}>
          
          {/* iOS Status Bar */}
          <div className="text-foreground px-7 pt-3 pb-1 flex items-center justify-between text-xs font-bold shrink-0 select-none z-30 relative" style={{ backgroundColor: canvasBg }}>
            <span className="font-extrabold text-[13px] tracking-tight pl-1">11:41 AM</span>
            
            {/* Realistic Dynamic Island Notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-28 h-6 bg-black rounded-full border border-slate-800/80 shadow-md flex items-center justify-between px-2.5 z-40 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0d0d0f] border border-slate-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#1e293b]" />
              </div>
              <div className="w-2 h-2 rounded-full bg-[#09090b] border border-slate-800" />
            </div>

            <div className="flex items-center gap-1.5 text-[11px] opacity-90 pr-1 font-semibold">
              <span className="text-[10px] font-extrabold font-mono tracking-tighter">5G</span>
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <div className="w-5 h-2.5 rounded-[3px] border border-foreground/70 p-0.5 flex items-center shrink-0">
                <div className="w-full h-full bg-emerald-500 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Scrollable Content Viewport */}
          <div id="canvas-scroll-viewport" className="w-full flex-1 overflow-y-auto overflow-x-hidden relative z-10" style={{ backgroundColor: canvasBg }}>
            {children}
          </div>

          {/* Safari Mobile Bottom Navigation Bar & Home Indicator */}
          <div className="backdrop-blur-md text-foreground border-t border-border/40 pt-2 pb-1.5 px-4 flex flex-col gap-1.5 shrink-0 z-30 select-none" style={{ backgroundColor: canvasBg }}>
            <div className="flex items-center justify-between gap-3 px-2">
              <span className="text-xs font-black opacity-80 font-serif tracking-tighter">AA</span>
              <div className="flex-1 max-w-[210px] bg-muted/60 border border-border/60 rounded-full px-3 py-1 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground shadow-xs">
                <Lock className="h-3 w-3 text-emerald-500 shrink-0" />
                <span className="font-semibold text-foreground tracking-tight">localhost</span>
                <RotateCw className="h-2.5 w-2.5 opacity-60 shrink-0" />
              </div>
              <div className="flex items-center gap-2 opacity-70">
                <span className="text-xs font-bold">‹</span>
                <span className="text-xs font-bold">›</span>
              </div>
            </div>
            {/* iOS Home Indicator Pill */}
            <div className="w-32 h-1 bg-foreground/40 rounded-full mx-auto mt-1" />
          </div>
        </div>
      </div>
    );
  }

  if (device === "tablet") {
    return (
      <div
        className="relative mx-auto my-6 flex-shrink-0 transition-all duration-300 flex flex-col rounded-[38px] bg-[#1c1c1e] p-4 border-4 border-[#3a3a3c] shadow-2xl ring-1 ring-black/50 select-none"
        style={{ width: "768px", height: "960px" }}
      >
        {/* Inner Screen Canvas Container */}
        <div id="canvas-host" className="w-full h-full rounded-[24px] overflow-hidden relative flex flex-col z-10 border border-black/20" style={{ backgroundColor: canvasBg }}>
          
          {/* iPadOS Status Bar */}
          <div className="text-foreground px-6 py-2 flex items-center justify-between text-xs font-semibold shrink-0 select-none z-30 border-b border-border/30" style={{ backgroundColor: canvasBg }}>
            <div className="flex items-center gap-2 text-[12px]">
              <span className="font-bold">9:41 AM</span>
              <span className="opacity-60 text-[11px]">Mon Aug 3</span>
            </div>
            
            {/* Front Camera Dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-black border border-white/20 shadow-inner" />

            <div className="flex items-center gap-2 text-[11px] opacity-80">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3.5 w-3.5" />
              <span className="text-[10px] font-mono font-bold">100%</span>
              <Battery className="h-3.5 w-3.5 fill-foreground/30 text-foreground" />
            </div>
          </div>

          {/* Scrollable Content Viewport */}
          <div id="canvas-scroll-viewport" className="w-full flex-1 overflow-y-auto overflow-x-hidden relative z-10" style={{ backgroundColor: canvasBg }}>
            {children}
          </div>

          {/* iPadOS Home Indicator */}
          <div className="backdrop-blur-md py-2 shrink-0 z-30 select-none border-t border-border/30" style={{ backgroundColor: canvasBg }}>
            <div className="w-36 h-1 bg-foreground/30 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // Laptop Hardware Device Frame
  return (
    <div className="relative mx-auto my-4 w-full h-full max-w-6xl p-2 flex flex-col items-center transition-all duration-300 select-none">
      {/* Laptop Screen Lid Outer Frame */}
      <div className="w-full flex-1 rounded-t-[28px] bg-[#1c1c1e] p-3 pt-2.5 border-t-4 border-x-4 border-[#3a3a3c] shadow-2xl ring-1 ring-black/50 flex flex-col overflow-hidden">
        
        {/* Laptop Webcam Camera */}
        <div className="w-full flex justify-center items-center pb-2 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#09090b] border border-white/20 shadow-inner" />
        </div>

        {/* Inner Screen Display Box */}
        <div id="canvas-host" className="w-full flex-1 rounded-xl overflow-hidden relative flex flex-col z-10 border border-black/30 shadow-inner" style={{ backgroundColor: canvasBg }}>
          {/* Scrollable Content Viewport */}
          <div id="canvas-scroll-viewport" className="w-full flex-1 overflow-y-auto overflow-x-hidden relative z-10" style={{ backgroundColor: canvasBg }}>
            {children}
          </div>
        </div>
      </div>

      {/* Laptop Keyboard Base & Hinge Lip */}
      <div className="w-[102%] h-4 bg-gradient-to-b from-[#27272a] to-[#18181b] border-t border-[#3a3a3c] rounded-b-xl shadow-2xl flex items-center justify-center relative shrink-0">
        {/* Center Trackpad Opening Notch */}
        <div className="w-28 h-1.5 bg-[#3f3f46] rounded-b-md shadow-inner" />
      </div>
    </div>
  );
}

export function Canvas({
  components,
  theme,
  selectedId,
  previewMode,
  device,
  showDeviceFrame = true,
  onSelect,
  onMove,
  onReorder,
  onDelete,
  onUpdateProps,
  onUpdateStyle,
  onOpenSetupModal,
  onOpenLayoutModal,
}: Props) {
  const editing = previewMode === "edit";

  const cleanFontName = theme.fontFamily
    ? theme.fontFamily.replace(/['"]/g, "").split(",")[0].trim()
    : "";

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [canvasDragIndex, setCanvasDragIndex] = useState<number | null>(null);
  const [canvasDragOverIndex, setCanvasDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      
      const frameWidth = device === "desktop" ? 1200 : device === "tablet" ? 768 : 390;
      const frameHeight = device === "desktop" ? 720 : device === "tablet" ? 960 : 844;
      
      const paddingX = 80;
      const paddingY = 80;

      const scaleX = width / (frameWidth + paddingX);
      const scaleY = height / (frameHeight + paddingY);
      
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [device]);

  // Listen to document.documentElement dark mode state for live preview adaptability
  const [isAppDark, setIsAppDark] = useState<boolean>(false);

  useEffect(() => {
    const updateDark = () => {
      setIsAppDark(document.documentElement.classList.contains("dark"));
    };
    updateDark();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === "class") {
          updateDark();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const isPageDark =
    theme.mode === "dark" ||
    (theme.mode !== "light" && (theme.backgroundColor ? isDarkColor(theme.backgroundColor) === true : isAppDark));

  const canvasBg = isPageDark
    ? (theme.backgroundColor && isDarkColor(theme.backgroundColor) === true ? theme.backgroundColor : "#09090b")
    : (theme.backgroundColor && isDarkColor(theme.backgroundColor) === false ? theme.backgroundColor : "#f1f5f9");

  const canvasTextColor = isPageDark ? "#f8fafc" : "#0f172a";

  const handleCanvasClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (
      target?.closest('[data-slot="select-content"]') ||
      target?.closest('[data-slot="popover-content"]') ||
      target?.closest('[role="listbox"]') ||
      target?.closest('[data-radix-popper-content-wrapper]')
    ) {
      return;
    }
    if (editing) onSelect(null);
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 h-full w-full flex justify-center items-start overflow-hidden bg-[linear-gradient(45deg,var(--color-border)_25%,transparent_25%),linear-gradient(-45deg,var(--color-border)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,var(--color-border)_75%),linear-gradient(-45deg,transparent_75%,var(--color-border)_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0]"
      onClick={handleCanvasClick}
    >
      {cleanFontName && (
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(
            cleanFontName.replace(/ /g, "+")
          )}:wght@400;500;600;700;800&display=swap');
        `}</style>
      )}
      
      <div 
        className="flex items-center justify-center w-full h-full"
        style={{ padding: device === 'desktop' ? '0px 24px 24px 24px' : '40px' }}
      >
        <div 
          className="flex flex-col justify-center items-center w-full h-full"
          style={{ 
            width: device === 'desktop' ? '100%' : 'auto',
            height: device === 'desktop' ? '100%' : 'auto',
            transform: device === 'desktop' ? 'none' : `scale(${scale})`, 
            transformOrigin: 'center center', 
            transition: 'transform 0.2s ease-out', 
            willChange: 'transform' 
          }}
        >
          <DeviceFrame device={device} showDeviceFrame={showDeviceFrame} canvasBg={canvasBg}>
        <div
          id="canvas-host"
          className="relative w-full h-full min-h-[100vh] transition-colors duration-300"
          style={{
            backgroundColor: canvasBg,
            color: canvasTextColor,
            fontFamily: theme.fontFamily || "inherit",
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleCanvasClick(e);
          }}
        >
          {components.length === 0 ? (
            <div className="grid min-h-[480px] place-items-center p-10 text-center">
              <div>
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-xs transition-all cursor-pointer hover:scale-105"
                  style={{
                    backgroundColor: `${theme.primaryColor || "#ea580c"}15`,
                    borderColor: `${theme.primaryColor || "#ea580c"}35`,
                    color: theme.primaryColor || "#ea580c",
                  }}
                  onClick={onOpenSetupModal}
                >
                  <Plus className="h-6 w-6" />
                </div>
                <h3
                  className="text-xl font-extrabold tracking-tight"
                  style={{ color: canvasTextColor }}
                >
                  Start Building Your Page
                </h3>
                <p
                  className="mt-2 max-w-sm text-sm opacity-80"
                  style={{ color: canvasTextColor }}
                >
                  Set your global container width basis to start adding components to your page.
                </p>
                {onOpenSetupModal && (
                  <button
                    type="button"
                    onClick={onOpenSetupModal}
                    className="mt-5 px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-2 mx-auto"
                    style={{ backgroundColor: theme.primaryColor || "#ea580c" }}
                  >
                    <span>Set Container Width & Start</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            components.map((c, index) => {
              const selected = editing && selectedId === c.id;
              const isCanvasDragging = canvasDragIndex === index;
              const isCanvasDragOver = canvasDragOverIndex === index;

              const sameType = components.filter((item) => item.type === c.type);
              const typeIndex = sameType.findIndex((item) => item.id === c.id) + 1;
              const baseLabel = PALETTE.find((p) => p.type === c.type)?.label || c.type;
              const label = `${baseLabel} ${typeIndex}`;
              const defaultAnchorId = `${c.type}-${typeIndex}`;
              const isNavbarOverlay =
                c.type === "navbar" &&
                (c.props?.variant === "floating-glass" || (c.props?.scrollBehavior ?? "overlay") === "overlay");
              const isFloatingNavbar = c.type === "navbar" && c.props?.variant === "floating-glass";

              return (
                <React.Fragment key={c.id}>
                  {isCanvasDragOver && canvasDragIndex !== index && (
                    <div className="w-full h-2.5 bg-primary/80 rounded-full shadow-lg my-1.5 animate-pulse z-50 transition-all" />
                  )}
                  <div
                    draggable={editing}
                    onDragStart={(e) => {
                      if (!editing) return;
                      e.stopPropagation();
                      e.dataTransfer.setData("text/plain", index.toString());
                      setCanvasDragIndex(index);
                    }}
                    onDragOver={(e) => {
                      if (!editing) return;
                      e.preventDefault();
                      e.stopPropagation();
                      if (canvasDragOverIndex !== index) setCanvasDragOverIndex(index);
                    }}
                    onDragLeave={(e) => {
                      e.stopPropagation();
                      if (canvasDragOverIndex === index) setCanvasDragOverIndex(null);
                    }}
                    onDrop={(e) => {
                      if (!editing) return;
                      e.preventDefault();
                      e.stopPropagation();
                      const from = parseInt(e.dataTransfer.getData("text/plain"), 10);
                      if (!isNaN(from) && from !== index) {
                        onReorder?.(from, index);
                      }
                      setCanvasDragIndex(null);
                      setCanvasDragOverIndex(null);
                    }}
                    onDragEnd={() => {
                      setCanvasDragIndex(null);
                      setCanvasDragOverIndex(null);
                    }}
                    className={`${
                      isFloatingNavbar
                        ? "absolute inset-0 pointer-events-none"
                        : isNavbarOverlay
                          ? "absolute top-0 left-0 right-0 w-full"
                          : "relative"
                    } ${editing ? "cursor-pointer" : ""} ${
                      c.type === "navbar" ? "z-[9999]" : selected ? "z-[500]" : "z-10"
                    } ${
                      isCanvasDragging ? "opacity-25 border-2 border-dashed border-primary scale-[0.99] transition-all" : ""
                    }`}
                    style={{
                      outline: selected ? `2px solid ${theme.primaryColor || "#ea580c"}` : undefined,
                      outlineOffset: selected ? "-2px" : undefined,
                    }}
                    onClick={(e) => {
                      if (!editing) return;
                      e.stopPropagation();
                      onSelect(c.id);
                    }}
                  >
                    {selected ? (
                      <div className={`absolute left-2 z-[10000] pointer-events-auto flex flex-wrap items-center gap-1.5 p-1 bg-background/95 backdrop-blur-md rounded-full border border-border shadow-lg max-w-[calc(100%-16px)] ${
                        index === 1 && components[0]?.type === "navbar" ? "top-[100px]" : "top-2"
                      }`}>
                        <div
                          draggable
                          onDragStart={(e) => {
                            e.stopPropagation();
                            e.dataTransfer.setData("text/plain", index.toString());
                            setCanvasDragIndex(index);
                          }}
                          className="rounded-full bg-muted px-1.5 py-1 text-xs shadow-xs hover:bg-muted/80 text-foreground border border-border transition-all cursor-grab active:cursor-grabbing flex items-center justify-center shrink-0"
                          title="Drag up or down to reorder section"
                        >
                          <GripVertical className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <span
                          className="rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-xs shrink-0"
                          style={{ backgroundColor: theme.primaryColor || "#ea580c" }}
                        >
                          {label}
                        </span>
                      {onOpenLayoutModal && COMPONENT_VARIANTS[c.type] && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenLayoutModal(c.id, c.type);
                          }}
                          className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 px-2 py-1 text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0"
                          title="Change Layout Design Template"
                        >
                          <LayoutGrid className="h-3 w-3" /> Layouts
                        </button>
                      )}
                      {c.type === "card-grid" && (
                        <div className="flex items-center gap-1 bg-muted/90 border border-border/80 rounded-full p-0.5 text-xs shrink-0 shadow-xs">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const currentItems = (c.props.items || []).slice(0, 4);
                              let nextItems = [...currentItems];
                              if (nextItems.length !== 3) {
                                if (nextItems.length < 3) {
                                  while (nextItems.length < 3) {
                                    const idx = nextItems.length + 1;
                                    nextItems.push({
                                      title: `Step 0${idx}`,
                                      description: "Customize design tokens, edit copy visually, and fine-tune responsive breakpoints.",
                                      stepNumber: `0${idx}`,
                                      stat: idx === 1 ? "$19" : idx === 2 ? "$49" : "$99",
                                      metric: "/ month",
                                      badgeText: idx === 1 ? "STARTER" : idx === 2 ? "POPULAR" : "PRO",
                                      buttonText: "Learn more",
                                    });
                                  }
                                } else {
                                  nextItems = nextItems.slice(0, 3);
                                }
                                onUpdateProps?.(c.id, { items: nextItems });
                              }
                            }}
                            className={`px-2.5 py-0.5 text-[11px] font-extrabold rounded-full transition-all cursor-pointer ${
                              (c.props.items || []).length === 3
                                ? "bg-primary text-white shadow-xs"
                                : "hover:bg-background text-muted-foreground"
                            }`}
                            title="Set 3 Cards Grid"
                          >
                            3 Cards
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const currentItems = (c.props.items || []).slice(0, 4);
                              let nextItems = [...currentItems];
                              if (nextItems.length !== 4) {
                                if (nextItems.length < 4) {
                                  while (nextItems.length < 4) {
                                    const idx = nextItems.length + 1;
                                    nextItems.push({
                                      title: idx === 4 ? "Enterprise Scale" : `Step 0${idx}`,
                                      description: "Dedicated edge infrastructure, custom SLA guarantees, and priority support.",
                                      stepNumber: `0${idx}`,
                                      stat: idx === 4 ? "Custom" : "$99",
                                      metric: idx === 4 ? "contact us" : "/ month",
                                      badgeText: idx === 4 ? "ENTERPRISE" : "PRO",
                                      buttonText: idx === 4 ? "Contact Sales" : "Learn more",
                                    });
                                  }
                                } else {
                                  nextItems = nextItems.slice(0, 4);
                                }
                                onUpdateProps?.(c.id, { items: nextItems.slice(0, 4) });
                              }
                            }}
                            className={`px-2.5 py-0.5 text-[11px] font-extrabold rounded-full transition-all cursor-pointer ${
                              (c.props.items || []).length === 4
                                ? "bg-primary text-white shadow-xs"
                                : "hover:bg-background text-muted-foreground"
                            }`}
                            title="Set 4 Cards Grid (Max 4 Cards)"
                          >
                            4 Cards
                          </button>
                        </div>
                      )}




                      {c.type !== "navbar" && (
                        <div
                          className="flex items-center gap-1 bg-muted/80 hover:bg-muted focus-within:bg-background border border-border/80 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-full px-2 py-0.5 transition-all text-xs shrink-0 shadow-xs"
                          title="Edit Section Anchor ID (#id)"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Hash className="h-3 w-3 text-muted-foreground shrink-0" />
                          <input
                            type="text"
                            value={c.style.id || c.props.sectionId || defaultAnchorId}
                            placeholder={defaultAnchorId}
                            onChange={(e) => {
                              const cleanId = e.target.value.replace(/^#/, "").trim();
                              onUpdateStyle?.(c.id, { id: cleanId });
                              onUpdateProps?.(c.id, { sectionId: cleanId });
                            }}
                            onKeyDown={(e) => e.stopPropagation()}
                            className="w-20 sm:w-28 bg-transparent text-xs font-semibold text-foreground outline-none placeholder:text-muted-foreground/50 border-none p-0 focus:ring-0"
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        className="rounded-full bg-muted px-2 py-1 text-xs shadow-xs hover:bg-muted/80 text-foreground border border-border transition-all cursor-pointer flex items-center justify-center"
                        title="Move up"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onMove(c.id, "up");
                        }}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-muted px-2 py-1 text-xs shadow-xs hover:bg-muted/80 text-foreground border border-border transition-all cursor-pointer flex items-center justify-center"
                        title="Move down"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onMove(c.id, "down");
                        }}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-rose-500 hover:bg-rose-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs border border-rose-600 transition-all cursor-pointer flex items-center gap-1"
                        title="Delete Layer"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onDelete(c.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  ) : null}
                  <ComponentRenderer
                    component={c}
                    allComponents={components}
                    theme={{
                      ...theme,
                      backgroundColor: canvasBg,
                      textColor: canvasTextColor,
                    }}
                    selected={selected}
                    interactive={editing}
                    device={device}
                    onUpdateProps={(props: any) => onUpdateProps?.(c.id, props)}
                    onUpdateStyle={(style: any) => onUpdateStyle?.(c.id, style)}
                  />
                </div>
              </React.Fragment>
            );
            })
          )}
        </div>
      </DeviceFrame>
      </div>
    </div>
  </div>
  );
}
