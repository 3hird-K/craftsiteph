"use client";

import { useState } from "react";
import type { SiteTheme } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layout, Maximize2, Minimize2, AlignCenter, Check } from "lucide-react";

type Props = {
  open: boolean;
  theme: SiteTheme;
  onClose: () => void;
  onConfirm: (width: string) => void;
};

const WIDTH_OPTIONS = [
  {
    id: "1120px",
    label: "Standard Container",
    width: "1120px",
    tag: "Recommended",
    description: "Perfect balanced layout basis for landing pages, features, and marketing sites.",
    icon: Layout,
  },
  {
    id: "1280px",
    label: "Wide Container",
    width: "1280px",
    tag: "SaaS / App",
    description: "Expansive layout for data-dense dashboards and modern web apps.",
    icon: Maximize2,
  },
  {
    id: "960px",
    label: "Compact Container",
    width: "960px",
    tag: "Clean & Focused",
    description: "Sleek, centered focus ideal for portfolios and personal brand pages.",
    icon: Minimize2,
  },
  {
    id: "800px",
    label: "Narrow Container",
    width: "800px",
    tag: "Reading / Blog",
    description: "Single-column reading width designed for articles and editorial pages.",
    icon: AlignCenter,
  },
  {
    id: "100%",
    label: "Full Width Canvas",
    width: "100%",
    tag: "Edge-to-Edge",
    description: "Stretches 100% edge-to-edge across the entire browser width.",
    icon: Maximize2,
  },
];

export function PageSetupModal({ open, theme, onClose, onConfirm }: Props) {
  const [selectedWidth, setSelectedWidth] = useState(theme.containerWidth || "1120px");

  const handleConfirm = () => {
    onConfirm(selectedWidth);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl rounded-3xl">
        {/* Header Banner */}
        <div className="p-6 pb-4 border-b border-border/60 bg-muted/20">
          <div>
            <DialogTitle className="text-xl font-extrabold tracking-tight text-foreground">
              Set Up Global Page Width
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Choose your master container max-width basis before rendering your first layer.
            </DialogDescription>
          </div>
        </div>

        {/* Options List */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {WIDTH_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedWidth === opt.width;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedWidth(opt.width)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? "bg-primary/5 border-primary shadow-sm ring-2"
                    : "bg-muted/20 border-border/70 hover:bg-muted/50 hover:border-border"
                }`}
                style={{
                  borderColor: isSelected ? (theme.primaryColor || "#ea580c") : undefined,
                  boxShadow: isSelected ? `0 0 0 1px ${theme.primaryColor || "#ea580c"}` : undefined,
                }}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isSelected ? "text-white shadow-xs" : "bg-muted text-muted-foreground"
                    }`}
                    style={{
                      backgroundColor: isSelected ? (theme.primaryColor || "#ea580c") : undefined,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground truncate">
                        {opt.label}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-muted border border-border/60 text-muted-foreground">
                        {opt.width}
                      </span>
                      {opt.tag && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-2xs"
                          style={{
                            backgroundColor: isSelected ? (theme.primaryColor || "#ea580c") : `${theme.primaryColor || "#ea580c"}80`,
                          }}
                        >
                          {opt.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "text-white border-transparent shadow-xs"
                      : "border-border bg-transparent text-transparent"
                  }`}
                  style={{
                    backgroundColor: isSelected ? (theme.primaryColor || "#ea580c") : undefined,
                  }}
                >
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Action */}
        <DialogFooter className="p-6 pt-4 border-t border-border/60 bg-muted/20 sm:justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Width basis can be adjusted anytime in the <span className="font-semibold text-foreground">Design</span> tab.
          </p>
          <Button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2.5 font-bold text-sm h-10.5 text-white shadow-md cursor-pointer transition-all hover:brightness-110 active:scale-[0.99]"
            style={{
              backgroundColor: theme.primaryColor || "#ea580c",
              borderRadius: theme.borderRadius || "12px",
            }}
          >
            Confirm & Start Building
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
