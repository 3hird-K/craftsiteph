"use client";

import type { BuilderComponent, SiteTheme } from "@/lib/types";
import { ComponentRenderer } from "@/components/renderer/ComponentRenderer";
import { PALETTE } from "@/lib/presets";

type Props = {
  components: BuilderComponent[];
  theme: SiteTheme;
  selectedId: string | null;
  previewMode: "edit" | "preview";
  device: "desktop" | "tablet" | "mobile";
  onSelect: (id: string | null) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onDelete: (id: string) => void;
};

const deviceWidth = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

export function Canvas({
  components,
  theme,
  selectedId,
  previewMode,
  device,
  onSelect,
  onMove,
  onDelete,
}: Props) {
  const editing = previewMode === "edit";

  return (
    <div
      className="flex h-full justify-center overflow-auto bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0] p-6"
      onClick={() => editing && onSelect(null)}
    >
      <div
        className="min-h-full overflow-hidden shadow-2xl transition-all duration-300"
        style={{
          width: deviceWidth[device],
          maxWidth: "100%",
          backgroundColor: theme.backgroundColor,
          borderRadius: device === "desktop" ? 12 : 24,
          border: device === "desktop" ? "1px solid #cbd5e1" : "8px solid #0f172a",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {components.length === 0 ? (
          <div className="grid min-h-[480px] place-items-center p-10 text-center">
            <div>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                ✦
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Your canvas is empty</h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Add components from the left palette to start designing your page.
              </p>
            </div>
          </div>
        ) : (
          components.map((c) => {
            const selected = editing && selectedId === c.id;
            const label = PALETTE.find((p) => p.type === c.type)?.label || c.type;
            return (
              <div
                key={c.id}
                className={`relative ${editing ? "cursor-pointer" : ""}`}
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
                  <div className="absolute left-2 top-2 z-20 flex items-center gap-1">
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow"
                      style={{ backgroundColor: theme.primaryColor || "#ea580c" }}
                    >
                      {label}
                    </span>
                    <button
                      type="button"
                      className="rounded-md bg-white px-1.5 py-0.5 text-xs shadow hover:bg-slate-50"
                      title="Move up"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMove(c.id, "up");
                      }}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-white px-1.5 py-0.5 text-xs shadow hover:bg-slate-50"
                      title="Move down"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMove(c.id, "down");
                      }}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-rose-500 px-1.5 py-0.5 text-xs text-white shadow hover:bg-rose-600"
                      title="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(c.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : null}
                <ComponentRenderer component={c} theme={theme} interactive={editing} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
