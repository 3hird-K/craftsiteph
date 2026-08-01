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
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">Components</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">Click to add or select a layout</p>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto p-3">
        {CATEGORIES.map((cat) => {
          const items = PALETTE.filter((p) => p.category === cat.key);
          if (!items.length) return null;
          return (
            <div key={cat.key}>
              <div className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {cat.label}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => {
                  const hasVariants = Boolean(COMPONENT_VARIANTS[item.type]);
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => {
                        if (hasVariants && onSelectVariant) {
                          onSelectVariant(item.type);
                        } else {
                          onAdd(item.type);
                        }
                      }}
                      className="group flex flex-col items-start gap-1 rounded-xl border border-border/80 bg-background p-2.5 text-left shadow-xs transition-all hover:border-primary/40 hover:bg-muted/80 dark:hover:bg-muted/50 active:scale-[0.98] cursor-pointer"
                      title={item.description}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-sm text-foreground transition-colors group-hover:bg-primary/15 group-hover:text-primary">
                          {item.icon}
                        </span>
                        {hasVariants && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            Layouts
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-foreground group-hover:text-foreground">{item.label}</span>
                      <span className="line-clamp-2 text-[10px] leading-snug text-muted-foreground group-hover:text-muted-foreground">
                        {item.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
