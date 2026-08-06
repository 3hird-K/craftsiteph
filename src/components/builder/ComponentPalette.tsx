"use client";

import { PALETTE, COMPONENT_VARIANTS, type PaletteItem } from "@/lib/presets";
import type { ComponentType } from "@/lib/types";

const CATEGORIES: { key: PaletteItem["category"]; label: string }[] = [
  { key: "layout", label: "Layout" },
  { key: "content", label: "Content" },
  { key: "media", label: "Media" },
  { key: "interactive", label: "Interactive" },
];

type Props = {
  onAdd: (type: ComponentType, variantId?: string) => void;
  onSelectVariant?: (type: ComponentType) => void;
};

export function ComponentPalette({ onAdd, onSelectVariant }: Props) {
  const templateComponents = PALETTE.filter((item) => Boolean(COMPONENT_VARIANTS[item.type]));
  const basicComponents = PALETTE.filter((item) => !COMPONENT_VARIANTS[item.type]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-bold text-foreground">Components</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">Select a section layout or add a component</p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-3">
        {/* SECTION 1: COMPONENTS WITH LAYOUT TEMPLATES */}
        <div>
          <div className="mb-2.5 px-1 flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary">
              Section Layouts & Templates
            </span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {templateComponents.length} Templates
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {templateComponents.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => {
                  if (onSelectVariant) {
                    onSelectVariant(item.type);
                  } else {
                    onAdd(item.type);
                  }
                }}
                className="group flex flex-col items-start gap-1 rounded-xl border border-border/80 bg-background p-2.5 text-left shadow-xs transition-all hover:border-primary/50 hover:bg-muted/80 dark:hover:bg-muted/50 active:scale-[0.98] cursor-pointer"
                title={item.description}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm transition-colors group-hover:bg-primary group-hover:text-white">
                    {item.icon}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                    Layouts
                  </span>
                </div>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</span>
                <span className="line-clamp-2 text-[10px] leading-snug text-muted-foreground">
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2: BASIC COMPONENTS ONLY */}
        <div>
          <div className="mb-2.5 px-1 flex items-center justify-between pt-3 border-t border-border/60">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted-foreground">
              Basic Components & Elements
            </span>
            <span className="text-[9px] text-muted-foreground font-semibold">
              {basicComponents.length} Elements
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {basicComponents.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => onAdd(item.type)}
                className="group flex flex-col items-start gap-1 rounded-xl border border-border/60 bg-background/60 p-2.5 text-left shadow-2xs transition-all hover:border-foreground/30 hover:bg-muted/60 active:scale-[0.98] cursor-pointer"
                title={item.description}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-sm text-foreground/80 transition-colors group-hover:bg-foreground/10 group-hover:text-foreground">
                    {item.icon}
                  </span>
                </div>
                <span className="text-xs font-semibold text-foreground">{item.label}</span>
                <span className="line-clamp-2 text-[10px] leading-snug text-muted-foreground">
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
