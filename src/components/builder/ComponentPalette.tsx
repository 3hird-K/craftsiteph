"use client";

import { PALETTE, type PaletteItem } from "@/lib/presets";
import type { ComponentType } from "@/lib/types";

const CATEGORIES: { key: PaletteItem["category"]; label: string }[] = [
  { key: "layout", label: "Layout" },
  { key: "content", label: "Content" },
  { key: "media", label: "Media" },
  { key: "interactive", label: "Interactive" },
];

type Props = {
  onAdd: (type: ComponentType) => void;
};

export function ComponentPalette({ onAdd }: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Components</h2>
        <p className="mt-0.5 text-xs text-slate-500">Click to add to canvas</p>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto p-3">
        {CATEGORIES.map((cat) => {
          const items = PALETTE.filter((p) => p.category === cat.key);
          if (!items.length) return null;
          return (
            <div key={cat.key}>
              <div className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {cat.label}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => onAdd(item.type)}
                    className="group flex flex-col items-start gap-1 rounded-xl border border-slate-200 bg-white p-2.5 text-left shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md active:scale-[0.98]"
                    title={item.description}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-sm group-hover:bg-indigo-100">
                      {item.icon}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">{item.label}</span>
                    <span className="line-clamp-2 text-[10px] leading-snug text-slate-500">
                      {item.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
