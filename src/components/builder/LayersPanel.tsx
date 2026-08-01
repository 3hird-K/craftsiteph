import type { BuilderComponent, ComponentType } from "@/lib/types";
import { PALETTE, COMPONENT_VARIANTS } from "@/lib/presets";
import { LayoutGrid, GripVertical } from "lucide-react";
import React, { useState } from "react";

type Props = {
  components: BuilderComponent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onOpenLayoutModal?: (id: string, type: ComponentType) => void;
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
  onReorder,
  onDuplicate,
  onDelete,
  onOpenLayoutModal,
}: Props) {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  return (
    <div className="flex h-full flex-col border-t border-border">
      <div className="border-b border-border px-4 py-2.5">
        <h2 className="text-sm font-semibold text-foreground">Layers</h2>
        <p className="text-[11px] text-muted-foreground">{components.length} blocks • Drag rows to reorder</p>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-2">
        {components.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-muted-foreground">
            No components yet. Add one from the palette.
          </p>
        ) : (
          components.map((c, index) => {
            const active = c.id === selectedId;
            const isDragging = draggedIdx === index;
            const isDragOver = dragOverIdx === index;

            const sameType = components.slice(0, index + 1).filter((item) => item.type === c.type);
            const typeIndex = sameType.length;
            const layerLabel = `${labelFor(c.type)} ${typeIndex}`;
            const anchorId = c.style?.id || c.props?.sectionId || `${c.type}-${typeIndex}`;

            return (
              <div
                key={c.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", index.toString());
                  setDraggedIdx(index);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (dragOverIdx !== index) setDragOverIdx(index);
                }}
                onDragLeave={() => {
                  if (dragOverIdx === index) setDragOverIdx(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const from = parseInt(e.dataTransfer.getData("text/plain"), 10);
                  if (!isNaN(from) && from !== index) {
                    onReorder?.(from, index);
                  }
                  setDraggedIdx(null);
                  dragOverIdx !== null && setDragOverIdx(null);
                }}
                onDragEnd={() => {
                  setDraggedIdx(null);
                  setDragOverIdx(null);
                }}
                className={`group flex items-center gap-1 rounded-lg border px-2 py-1.5 transition-all ${
                  isDragging
                    ? "opacity-30 border-dashed border-primary bg-primary/5 scale-[0.98]"
                    : isDragOver
                    ? "border-primary bg-primary/15 shadow-md -translate-y-0.5"
                    : active
                    ? "border-primary/50 bg-primary/10 text-foreground font-semibold shadow-xs"
                    : "border-transparent bg-background hover:border-border hover:bg-muted/60 dark:bg-muted/20"
                }`}
              >
                <div
                  className="cursor-grab active:cursor-grabbing p-0.5 text-muted-foreground/50 hover:text-foreground shrink-0"
                  title="Drag up or down to reorder layer"
                >
                  <GripVertical className="h-3.5 w-3.5" />
                </div>

                <button
                  type="button"
                  onClick={() => onSelect(c.id)}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left cursor-pointer"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs">
                    {iconFor(c.type)}
                  </span>
                  <span className="truncate text-xs font-medium text-foreground">
                    {layerLabel}
                    {c.type !== "navbar" && (
                      <span className="font-mono text-[10px] text-muted-foreground ml-1.5 opacity-70">(#{anchorId})</span>
                    )}
                    {c.props.heading ? (
                      <span className="font-normal text-muted-foreground"> · {c.props.heading.slice(0, 14)}</span>
                    ) : null}
                  </span>
                </button>
                <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    title="Move up"
                    disabled={index === 0}
                    onClick={() => onMove(c.id, "up")}
                    className="rounded p-1 text-muted-foreground hover:bg-background disabled:opacity-30 cursor-pointer"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    title="Move down"
                    disabled={index === components.length - 1}
                    onClick={() => onMove(c.id, "down")}
                    className="rounded p-1 text-muted-foreground hover:bg-background disabled:opacity-30 cursor-pointer"
                  >
                    ↓
                  </button>
                  {onOpenLayoutModal && COMPONENT_VARIANTS[c.type] && (
                    <button
                      type="button"
                      title="Change Layout Design Template"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenLayoutModal(c.id, c.type);
                      }}
                      className="rounded p-1 text-primary hover:bg-primary/10 cursor-pointer"
                    >
                      <LayoutGrid className="h-3 w-3" />
                    </button>
                  )}
                  <button
                    type="button"
                    title="Duplicate"
                    onClick={() => onDuplicate(c.id)}
                    className="rounded p-1 text-muted-foreground hover:bg-background cursor-pointer"
                  >
                    ⎘
                  </button>
                  <button
                    type="button"
                    title="Delete"
                    onClick={() => onDelete(c.id)}
                    className="rounded p-1 text-rose-500 hover:bg-rose-50 cursor-pointer"
                  >
                    🗑
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
