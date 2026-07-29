"use client";

import type { BuilderComponent } from "@/lib/types";
import { PALETTE } from "@/lib/presets";

type Props = {
  components: BuilderComponent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
};

function labelFor(type: string) {
  return PALETTE.find((p) => p.type === type)?.label || type;
}

function iconFor(type: string) {
  return PALETTE.find((p) => p.type === type)?.icon || "•";
}

export function LayersPanel({
  components,
  selectedId,
  onSelect,
  onMove,
  onDuplicate,
  onDelete,
}: Props) {
  return (
    <div className="flex h-full flex-col border-t border-slate-200">
      <div className="border-b border-slate-200 px-4 py-2.5">
        <h2 className="text-sm font-semibold text-slate-900">Layers</h2>
        <p className="text-[11px] text-slate-500">{components.length} blocks</p>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-2">
        {components.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-slate-400">
            No components yet. Add one from the palette.
          </p>
        ) : (
          components.map((c, index) => {
            const active = c.id === selectedId;
            return (
              <div
                key={c.id}
                className={`group flex items-center gap-1 rounded-lg border px-2 py-1.5 transition ${
                  active
                    ? "border-indigo-300 bg-indigo-50 shadow-sm"
                    : "border-transparent bg-white hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(c.id)}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs">
                    {iconFor(c.type)}
                  </span>
                  <span className="truncate text-xs font-medium text-slate-800">
                    {labelFor(c.type)}
                    {c.props.heading ? (
                      <span className="font-normal text-slate-400"> · {c.props.heading.slice(0, 18)}</span>
                    ) : null}
                  </span>
                </button>
                <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    title="Move up"
                    disabled={index === 0}
                    onClick={() => onMove(c.id, "up")}
                    className="rounded p-1 text-slate-500 hover:bg-white disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    title="Move down"
                    disabled={index === components.length - 1}
                    onClick={() => onMove(c.id, "down")}
                    className="rounded p-1 text-slate-500 hover:bg-white disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    title="Duplicate"
                    onClick={() => onDuplicate(c.id)}
                    className="rounded p-1 text-slate-500 hover:bg-white"
                  >
                    ⎘
                  </button>
                  <button
                    type="button"
                    title="Delete"
                    onClick={() => onDelete(c.id)}
                    className="rounded p-1 text-rose-500 hover:bg-rose-50"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
