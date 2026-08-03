"use client";

import type { BuilderComponent, ComponentProps, ComponentStyle, ComponentType, SiteTheme } from "@/lib/types";
import { ComponentRenderer } from "@/components/renderer/ComponentRenderer";
import { PALETTE, COMPONENT_VARIANTS } from "@/lib/presets";
import { Plus, Trash2, ArrowUp, ArrowDown, Hash, LayoutGrid, GripVertical, ArrowLeftRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  components: BuilderComponent[];
  theme: SiteTheme;
  selectedId: string | null;
  previewMode: "edit" | "preview";
  device: "desktop" | "tablet" | "mobile";
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
function DeviceFrame({ device, children }: { device: Props["device"]; children: React.ReactNode }) {
  if (device === "mobile") {
    return (
      <div
        className="relative mx-auto border-[12px] border-[#1c1c1e] rounded-[52px] bg-[#1c1c1e] shadow-2xl my-6 flex-shrink-0 ring-1 ring-white/10 transition-all duration-300 select-none"
        style={{ width: "420px", height: "860px" }}
      >
        {/* Top Status Bar & Dynamic Island */}
        <div className="absolute top-2 left-0 right-0 px-7 flex items-center justify-between z-30 pointer-events-none text-white text-[11px] font-semibold tracking-tight">
          <span>10:03 AM</span>
          
          {/* Dynamic Island Notch */}
          <div className="w-28 h-7 bg-black rounded-full flex items-center justify-between px-3 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0d0d18] border border-indigo-900/60" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>

          <div className="flex items-center gap-1.5 opacity-90">
            <span className="text-[9px] font-bold">5G</span>
            <div className="w-3.5 h-2.5 border border-white rounded-[2px] p-[1px] flex items-center">
              <div className="h-full w-full bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Physical buttons (visual volume & power) */}
        <div className="absolute -left-[15px] top-[110px] w-[3px] h-7 bg-[#2c2c2e] rounded-l-md" />
        <div className="absolute -left-[15px] top-[155px] w-[3px] h-12 bg-[#2c2c2e] rounded-l-md" />
        <div className="absolute -left-[15px] top-[215px] w-[3px] h-12 bg-[#2c2c2e] rounded-l-md" />
        <div className="absolute -right-[15px] top-[170px] w-[3px] h-16 bg-[#2c2c2e] rounded-r-md" />

        {/* Main Canvas Scroll Area */}
        <div className="w-full h-full pt-10 pb-12 overflow-y-auto overflow-x-hidden rounded-[40px] bg-background relative z-10 border border-black/10">
          {children}
        </div>

        {/* Floating Bottom Browser Address Bar & Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none w-full px-6">
          <div className="w-full max-w-[240px] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white/80 flex items-center justify-center gap-1.5 shadow-lg">
            <span className="text-[9px] text-white/50">🔒</span>
            <span>localhost</span>
          </div>
          <div className="w-32 h-1 bg-white/40 rounded-full" />
        </div>
      </div>
    );
  }

  if (device === "tablet") {
    return (
      <div
        className="relative mx-auto border-[16px] border-[#202020] rounded-[2.5rem] bg-[#202020] shadow-2xl my-8 flex-shrink-0 ring-1 ring-border/20 transition-all duration-300"
        style={{ width: "768px", height: "1024px" }}
      >
        {/* Camera */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-full flex items-center justify-center z-30 -mt-[10px]">
          <div className="w-2 h-2 rounded-full bg-[#111] ring-1 ring-black/40 relative">
             <div className="absolute inset-0.5 rounded-full bg-indigo-900/40" />
          </div>
        </div>
        
        {/* Physical buttons (visual only) */}
        <div className="absolute -top-[19px] right-[100px] w-12 h-[3px] bg-[#333] rounded-t-md" />
        <div className="absolute -right-[19px] top-[100px] w-[3px] h-12 bg-[#333] rounded-r-md" />
        <div className="absolute -right-[19px] top-[160px] w-[3px] h-12 bg-[#333] rounded-r-md" />

        <div className="w-full h-full overflow-y-auto overflow-x-hidden rounded-3xl bg-background relative z-10 border border-black/10">
          {children}
        </div>
      </div>
    );
  }

  // Desktop
  return (
    <div
      className="relative mx-auto border-t-[6px] border-l-[6px] border-r-[6px] border-[#202020] rounded-t-2xl bg-[#202020] shadow-2xl flex-shrink-0 ring-1 ring-border/20 transition-all duration-300 w-full h-full flex flex-col"
    >
      {/* Camera */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-full flex items-center justify-center z-30 -mt-1.5">
        <div className="w-1 h-1 rounded-full bg-[#111] ring-1 ring-black/40" />
      </div>
      
      <div className="w-full flex-1 overflow-y-auto overflow-x-hidden rounded-t-lg bg-background relative z-10 border border-black/10">
        {children}
      </div>
      
      {/* Bottom lip / Base */}
      <div className="relative h-4 bg-gradient-to-b from-[#2a2a2a] to-[#151515] rounded-b-xl shadow-xl z-20 flex justify-center border-t border-[#444] shrink-0">
        <div className="w-32 h-full bg-[#1a1a1a] rounded-b-xl" />
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
      const frameHeight = device === "desktop" ? 720 : device === "tablet" ? 1024 : 844;
      
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

  const canvasBg =
    theme.backgroundColor && theme.backgroundColor !== "#ffffff" && theme.backgroundColor !== "transparent"
      ? theme.backgroundColor
      : isAppDark
      ? "#09090b"
      : "#ffffff";

  const canvasTextColor =
    theme.textColor && theme.textColor !== "#0f172a"
      ? theme.textColor
      : isAppDark
      ? "#f8fafc"
      : "#0f172a";

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
          <DeviceFrame device={device}>
        <div
          className="h-full min-h-[500px] transition-colors duration-300"
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
                    className={`relative ${editing ? "cursor-pointer" : ""} ${
                      c.type === "navbar" ? "z-50" : selected ? "z-50" : "z-10"
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
                      <div className="absolute left-2 top-2 z-40 flex flex-wrap items-center gap-1.5 p-1 bg-background/95 backdrop-blur-md rounded-xl border border-border shadow-lg max-w-[calc(100%-16px)]">
                        <div
                          draggable
                          onDragStart={(e) => {
                            e.stopPropagation();
                            e.dataTransfer.setData("text/plain", index.toString());
                            setCanvasDragIndex(index);
                          }}
                          className="rounded-lg bg-muted px-1.5 py-1 text-xs shadow-xs hover:bg-muted/80 text-foreground border border-border transition-all cursor-grab active:cursor-grabbing flex items-center justify-center shrink-0"
                          title="Drag up or down to reorder section"
                        >
                          <GripVertical className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <span
                          className="rounded-lg px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-xs shrink-0"
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
                          className="rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 px-2 py-1 text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0"
                          title="Change Layout Design Template"
                        >
                          <LayoutGrid className="h-3 w-3" /> Layouts
                        </button>
                      )}
                      {(c.type === "hero" || c.props.imageUrl !== undefined) && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentPos = c.props.imagePosition || (c.props.reverseLayout ? "left" : "right");
                            const nextPos = currentPos === "left" ? "right" : "left";
                            onUpdateProps?.(c.id, { imagePosition: nextPos, reverseLayout: nextPos === "left" });
                          }}
                          className="rounded-lg bg-muted/90 hover:bg-primary hover:text-white px-2 py-1 text-xs font-bold text-foreground border border-border shadow-xs transition-all cursor-pointer flex items-center gap-1 shrink-0"
                          title="Switch / Flip Left & Right Grid Items"
                        >
                          <ArrowLeftRight className="h-3 w-3" />
                          <span>{c.props.imagePosition === "left" || c.props.reverseLayout ? "Image: Left" : "Flip Sides"}</span>
                        </button>
                      )}
                      {c.type !== "navbar" && (
                        <div
                          className="flex items-center gap-1 bg-muted/80 hover:bg-muted focus-within:bg-background border border-border/80 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-lg px-2 py-0.5 transition-all text-xs shrink-0 shadow-xs"
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
                        className="rounded-lg bg-muted px-2 py-1 text-xs shadow-xs hover:bg-muted/80 text-foreground border border-border transition-all cursor-pointer flex items-center justify-center"
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
                        className="rounded-lg bg-muted px-2 py-1 text-xs shadow-xs hover:bg-muted/80 text-foreground border border-border transition-all cursor-pointer flex items-center justify-center"
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
                        className="rounded-lg bg-rose-500 hover:bg-rose-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs border border-rose-600 transition-all cursor-pointer flex items-center gap-1"
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
                    interactive={editing}
                    device={device}
                    onUpdateProps={(props) => onUpdateProps?.(c.id, props)}
                    onUpdateStyle={(style) => onUpdateStyle?.(c.id, style)}
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
