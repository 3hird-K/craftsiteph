"use client";

import { useEffect, useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  Unlink,
  Palette,
  Highlighter,
  RemoveFormatting,
  Check,
  X,
} from "lucide-react";

const TEXT_COLORS = [
  "#000000",
  "#4b5563",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#ffffff",
];

const HIGHLIGHT_COLORS = [
  "transparent",
  "#fef08a", // yellow
  "#bbf7d0", // green
  "#bfdbfe", // blue
  "#fbcfe8", // pink
  "#fed7aa", // orange
  "#e9d5ff", // purple
  "#e5e7eb", // gray
];

export function FloatingTextToolbar() {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isLink, setIsLink] = useState(false);

  // Popover states
  const [activeTab, setActiveTab] = useState<"none" | "link" | "color" | "highlight">("none");
  const [linkUrl, setLinkUrl] = useState("");
  const [openInNewTab, setOpenInNewTab] = useState(true);

  const toolbarRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedRangeRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      // Don't hide toolbar if active element is inside our toolbar popover
      if (document.activeElement && toolbarRef.current?.contains(document.activeElement)) {
        return;
      }

      const selection = window.getSelection();

      if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        if (activeTab === "none") {
          setPosition(null);
        }
        return;
      }

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const element = container.nodeType === 3 ? container.parentElement : (container as HTMLElement);

      if (!element || !element.closest("[contenteditable='true']")) {
        if (activeTab === "none") {
          setPosition(null);
        }
        return;
      }

      const rect = range.getBoundingClientRect();

      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
      setIsUnderline(document.queryCommandState("underline"));
      setIsStrikethrough(document.queryCommandState("strikeThrough"));

      const anchor = element.closest("a");
      setIsLink(Boolean(anchor));
      if (anchor && activeTab !== "link") {
        setLinkUrl(anchor.getAttribute("href") || "");
      }

      setPosition({
        top: rect.top - 54,
        left: rect.left + rect.width / 2,
      });
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    const handleMouseDown = (e: MouseEvent) => {
      if (toolbarRef.current && toolbarRef.current.contains(e.target as Node)) {
        return;
      }
      setTimeout(() => {
        const selection = window.getSelection();
        if ((!selection || selection.isCollapsed) && !toolbarRef.current?.contains(document.activeElement)) {
          setPosition(null);
          setActiveTab("none");
        }
      }, 10);
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [activeTab]);

  if (!position) return null;

  const handleCommand = (command: string, value: string | undefined = undefined) => {
    restoreSelection();
    document.execCommand(command, false, value);
    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
    setIsUnderline(document.queryCommandState("underline"));
    setIsStrikethrough(document.queryCommandState("strikeThrough"));
    saveSelection();
  };

  const applyLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;

    let formattedUrl = linkUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl) && !formattedUrl.startsWith("#") && !formattedUrl.startsWith("/")) {
      formattedUrl = `https://${formattedUrl}`;
    }

    restoreSelection();
    document.execCommand("createLink", false, formattedUrl);

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const container = selection.getRangeAt(0).commonAncestorContainer;
      const element = container.nodeType === 3 ? container.parentElement : (container as HTMLElement);
      const anchor = element?.closest("a");
      if (anchor) {
        anchor.setAttribute("data-edited-link", "true");
        anchor.style.cursor = "pointer";
        anchor.classList.add("rich-text-link", "cursor-pointer", "text-blue-600", "underline", "hover:text-blue-700", "transition-colors");
        if (openInNewTab) {
          anchor.setAttribute("target", "_blank");
          anchor.setAttribute("rel", "noopener noreferrer");
        } else {
          anchor.removeAttribute("target");
          anchor.removeAttribute("rel");
        }
      }
    }

    setActiveTab("none");
    setIsLink(true);
  };

  const removeLink = () => {
    restoreSelection();
    document.execCommand("unlink", false);
    setActiveTab("none");
    setIsLink(false);
  };

  const preventBlur = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleTab = (tab: "link" | "color" | "highlight") => {
    if (activeTab === tab) {
      setActiveTab("none");
    } else {
      saveSelection();
      setActiveTab(tab);
    }
  };

  return (
    <div
      ref={toolbarRef}
      style={{
        position: "fixed",
        top: Math.max(10, position.top),
        left: position.left,
        transform: "translateX(-50%)",
        zIndex: 99999,
      }}
      className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-150 select-none"
    >
      {/* Main Pill Toolbar */}
      <div
        className="flex items-center gap-1 bg-background/95 backdrop-blur-md border border-border/80 shadow-2xl rounded-full px-2 py-1.5"
        onMouseDown={preventBlur}
      >
        {/* Bold */}
        <button
          type="button"
          onMouseDown={preventBlur}
          onClick={() => handleCommand("bold")}
          className={`p-1.5 rounded-full hover:bg-muted transition-colors ${
            isBold ? "bg-primary/15 text-primary font-bold" : "text-muted-foreground"
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onMouseDown={preventBlur}
          onClick={() => handleCommand("italic")}
          className={`p-1.5 rounded-full hover:bg-muted transition-colors ${
            isItalic ? "bg-primary/15 text-primary" : "text-muted-foreground"
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        {/* Underline */}
        <button
          type="button"
          onMouseDown={preventBlur}
          onClick={() => handleCommand("underline")}
          className={`p-1.5 rounded-full hover:bg-muted transition-colors ${
            isUnderline ? "bg-primary/15 text-primary" : "text-muted-foreground"
          }`}
          title="Underline (Ctrl+U)"
        >
          <Underline className="w-4 h-4" />
        </button>

        {/* Strikethrough */}
        <button
          type="button"
          onMouseDown={preventBlur}
          onClick={() => handleCommand("strikeThrough")}
          className={`p-1.5 rounded-full hover:bg-muted transition-colors ${
            isStrikethrough ? "bg-primary/15 text-primary" : "text-muted-foreground"
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-border/60 mx-0.5" />

        {/* Link Button */}
        <button
          type="button"
          onMouseDown={preventBlur}
          onClick={() => toggleTab("link")}
          className={`p-1.5 rounded-full hover:bg-muted transition-colors ${
            activeTab === "link" || isLink ? "bg-primary/15 text-primary" : "text-muted-foreground"
          }`}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        {/* Text Color Button */}
        <button
          type="button"
          onMouseDown={preventBlur}
          onClick={() => toggleTab("color")}
          className={`p-1.5 rounded-full hover:bg-muted transition-colors ${
            activeTab === "color" ? "bg-primary/15 text-primary" : "text-muted-foreground"
          }`}
          title="Text Color"
        >
          <Palette className="w-4 h-4" />
        </button>

        {/* Highlight Color Button */}
        <button
          type="button"
          onMouseDown={preventBlur}
          onClick={() => toggleTab("highlight")}
          className={`p-1.5 rounded-full hover:bg-muted transition-colors ${
            activeTab === "highlight" ? "bg-primary/15 text-primary" : "text-muted-foreground"
          }`}
          title="Highlight Color"
        >
          <Highlighter className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-border/60 mx-0.5" />

        {/* Clear Formatting */}
        <button
          type="button"
          onMouseDown={preventBlur}
          onClick={() => handleCommand("removeFormat")}
          className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-destructive"
          title="Clear Formatting"
        >
          <RemoveFormatting className="w-4 h-4" />
        </button>
      </div>

      {/* Popover content: Link */}
      {activeTab === "link" && (
        <form
          onSubmit={applyLink}
          className="mt-2 bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-2.5 flex flex-col gap-2 min-w-[280px] animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="flex items-center gap-1.5 bg-muted/60 border rounded-xl px-2.5 py-1.5">
            <LinkIcon className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Paste or type a URL..."
              className="bg-transparent text-xs w-full focus:outline-none text-foreground"
              autoFocus
            />
            {linkUrl && (
              <button
                type="button"
                onClick={() => setLinkUrl("")}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                className="rounded border-muted-foreground/30 accent-primary"
              />
              <span>Open in new tab</span>
            </label>

            <div className="flex items-center gap-1">
              {isLink && (
                <button
                  type="button"
                  onClick={removeLink}
                  className="p-1 hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                  title="Remove link"
                >
                  <Unlink className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="px-2.5 py-1 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1 text-[11px]"
              >
                <Check className="w-3 h-3" />
                <span>Apply</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Popover content: Text Color */}
      {activeTab === "color" && (
        <div className="mt-2 bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-2.5 flex flex-col gap-2 min-w-[200px] animate-in fade-in slide-in-from-top-1 duration-150">
          <span className="text-[11px] font-semibold text-muted-foreground px-1">Text Color</span>
          <div className="grid grid-cols-6 gap-1.5">
            {TEXT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onMouseDown={preventBlur}
                onClick={() => {
                  handleCommand("foreColor", c);
                  setActiveTab("none");
                }}
                className="w-6 h-6 rounded-full border border-border/60 hover:scale-110 transition-transform shadow-sm flex items-center justify-center"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
            <label
              className="w-6 h-6 rounded-full border border-dashed border-border hover:scale-110 transition-transform cursor-pointer flex items-center justify-center bg-muted text-[10px] font-bold"
              title="Custom Color"
            >
              +
              <input
                type="color"
                className="sr-only"
                onChange={(e) => {
                  handleCommand("foreColor", e.target.value);
                  setActiveTab("none");
                }}
              />
            </label>
          </div>
        </div>
      )}

      {/* Popover content: Highlight Color */}
      {activeTab === "highlight" && (
        <div className="mt-2 bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-2.5 flex flex-col gap-2 min-w-[200px] animate-in fade-in slide-in-from-top-1 duration-150">
          <span className="text-[11px] font-semibold text-muted-foreground px-1">Highlight Color</span>
          <div className="grid grid-cols-5 gap-1.5">
            {HIGHLIGHT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onMouseDown={preventBlur}
                onClick={() => {
                  handleCommand("hiliteColor", c);
                  setActiveTab("none");
                }}
                className="w-6 h-6 rounded-full border border-border/60 hover:scale-110 transition-transform shadow-sm flex items-center justify-center text-[10px]"
                style={{ backgroundColor: c === "transparent" ? "white" : c }}
                title={c === "transparent" ? "None" : c}
              >
                {c === "transparent" && <X className="w-3 h-3 text-muted-foreground" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
