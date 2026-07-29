"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
  BuilderComponent,
  ComponentProps,
  ComponentStyle,
  ComponentType,
  Project,
  SiteTheme,
} from "@/lib/types";
import { DEFAULT_THEME } from "@/lib/types";
import { createComponent, uid } from "@/lib/presets";
import { ComponentPalette } from "./ComponentPalette";
import { LayersPanel } from "./LayersPanel";
import { PropertiesPanel } from "./PropertiesPanel";
import { Canvas } from "./Canvas";
import { useAuth } from "@/components/providers/AuthProvider";

type Props = {
  project: Project;
};

export function BuilderEditor({ project }: Props) {
  const router = useRouter();
  const { user, loading: authLoading, openAuthModal, signOut } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);
  const [name, setName] = useState(project.name);
  const [components, setComponents] = useState<BuilderComponent[]>(project.components || []);
  const [theme, setTheme] = useState<SiteTheme>(project.theme || DEFAULT_THEME);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"edit" | "preview">("edit");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(project.isPublished);
  const [slug, setSlug] = useState(project.slug || "");
  const [leftTab, setLeftTab] = useState<"components" | "layers">("components");

  const selected = useMemo(
    () => components.find((c) => c.id === selectedId) || null,
    [components, selectedId],
  );

  const markDirty = useCallback(() => {
    setDirty(true);
    setMessage(null);
  }, []);

  const addComponent = (type: ComponentType) => {
    const next = createComponent(type);
    setComponents((prev) => [...prev, next]);
    setSelectedId(next.id);
    setPreviewMode("edit");
    markDirty();
  };

  const moveComponent = (id: string, direction: "up" | "down") => {
    setComponents((prev) => {
      const index = prev.findIndex((c) => c.id === id);
      if (index < 0) return prev;
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.splice(target, 0, item);
      return copy;
    });
    markDirty();
  };

  const duplicateComponent = (id: string) => {
    setComponents((prev) => {
      const index = prev.findIndex((c) => c.id === id);
      if (index < 0) return prev;
      const original = prev[index];
      const clone: BuilderComponent = {
        ...structuredClone(original),
        id: uid(original.type),
      };
      const copy = [...prev];
      copy.splice(index + 1, 0, clone);
      setSelectedId(clone.id);
      return copy;
    });
    markDirty();
  };

  const deleteComponent = (id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
    markDirty();
  };

  const changeProps = (id: string, props: Partial<ComponentProps>) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, props: { ...c.props, ...props } } : c)),
    );
    markDirty();
  };

  const changeStyle = (id: string, style: Partial<ComponentStyle>) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, style: { ...c.style, ...style } } : c)),
    );
    markDirty();
  };

  const changeTheme = (partial: Partial<SiteTheme>) => {
    setTheme((prev) => ({ ...prev, ...partial }));
    markDirty();
  };

  const save = async (opts?: { publish?: boolean; unpublish?: boolean }) => {
    setSaving(true);
    setMessage(null);
    try {
      const payload: Record<string, unknown> = {
        name,
        components,
        theme,
      };
      if (opts?.publish) {
        payload.isPublished = true;
        if (!slug) {
          const generated = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
            .slice(0, 48);
          payload.slug = `${generated || "site"}-${Math.random().toString(36).slice(2, 6)}`;
        }
      }
      if (opts?.unpublish) {
        payload.isPublished = false;
      }

      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      setIsPublished(data.isPublished);
      setSlug(data.slug || "");
      setDirty(false);
      setMessage(opts?.publish ? "Published!" : opts?.unpublish ? "Unpublished" : "Saved");
      router.refresh();
    } catch {
      setMessage("Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        void save();
      }
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, components, theme, slug]);

  return (
    <div className="flex h-screen flex-col bg-slate-100 text-slate-900">
      {/* Top bar */}
      <header className="z-30 flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-3 shadow-sm">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          title="Back to Dashboard"
        >
          <img src="/logo.png" alt="craftsiteph Logo" className="h-8 sm:h-9 w-auto object-contain shrink-0" />
        </Link>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            markDirty();
          }}
          className="min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm font-semibold outline-none hover:border-slate-200 focus:border-slate-300 focus:bg-white sm:max-w-xs"
        />

        {dirty ? (
          <span className="hidden text-xs text-amber-600 sm:inline">Unsaved</span>
        ) : (
          <span className="hidden text-xs text-emerald-600 sm:inline">{message || "Up to date"}</span>
        )}

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          
          {/* Quick Header Theme Selector Dots */}
          <div className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 md:flex">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Theme</span>
            {[
              { name: "Coral", primary: "#ea580c", secondary: "#0f172a", accent: "#fdba74" },
              { name: "Indigo", primary: "#4f46e5", secondary: "#0f172a", accent: "#818cf8" },
              { name: "Emerald", primary: "#059669", secondary: "#064e3b", accent: "#34d399" },
              { name: "Violet", primary: "#7c3aed", secondary: "#3b0764", accent: "#c084fc" },
            ].map((p) => {
              const isActive = theme.primaryColor === p.primary;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() =>
                    changeTheme({
                      primaryColor: p.primary,
                      secondaryColor: p.secondary,
                      accentColor: p.accent,
                    })
                  }
                  className={`h-4 w-4 rounded-full transition-all cursor-pointer ${
                    isActive ? "ring-2 ring-slate-500 scale-125" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: p.primary }}
                  title={`Switch to ${p.name} Theme`}
                />
              );
            })}
          </div>

          {/* Viewport Controls */}
          <div className="mr-1 hidden items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 sm:flex">
            {(
              [
                ["desktop", "Desktop"],
                ["tablet", "Tablet"],
                ["mobile", "Mobile"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setDevice(key)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  device === key ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
            <button
              type="button"
              onClick={() => setPreviewMode("edit")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                previewMode === "edit"
                  ? "bg-white text-slate-900 shadow-sm font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                setPreviewMode("preview");
                setSelectedId(null);
              }}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                previewMode === "preview"
                  ? "bg-white text-slate-900 shadow-sm font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Preview
            </button>
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={() => void save()}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>

          {isPublished && slug ? (
            <>
              <Link
                href={`/p/${slug}`}
                target="_blank"
                className="hidden rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 sm:inline"
              >
                View live
              </Link>
              <button
                type="button"
                disabled={saving}
                onClick={() => void save({ unpublish: true })}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Unpublish
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={saving}
              onClick={() => void save({ publish: true })}
              className="rounded-lg px-4 py-1.5 text-xs font-bold text-white shadow-md transition-all hover:brightness-110 disabled:opacity-50 cursor-pointer"
              style={{ backgroundColor: theme.primaryColor || "#ea580c" }}
            >
              {saving ? "Publishing..." : "Publish"}
            </button>
          )}

          {/* User Auth Avatar / Google Sign-In */}
          <div className="ml-1 pl-1 border-l border-slate-200">
            {user ? (
              <div className="flex items-center gap-2" title={user.email || undefined}>
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name || "User Avatar"}
                    className="h-7 w-7 rounded-full border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                    {user.email?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="hidden sm:inline text-[11px] font-semibold text-slate-500 hover:text-rose-600 cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal()}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 cursor-pointer"
                title="Sign in with Google"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Workspace */}
      <div className="flex min-h-0 flex-1">
        {/* Left sidebar */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
          <div className="flex border-b border-slate-200">
            <button
              type="button"
              onClick={() => setLeftTab("components")}
              className={`flex-1 px-3 py-2.5 text-xs font-semibold transition-colors ${
                leftTab === "components"
                  ? "border-b-2 font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              style={
                leftTab === "components"
                  ? { borderColor: theme.primaryColor || "#ea580c", color: theme.primaryColor || "#ea580c" }
                  : undefined
              }
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setLeftTab("layers")}
              className={`flex-1 px-3 py-2.5 text-xs font-semibold transition-colors ${
                leftTab === "layers"
                  ? "border-b-2 font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              style={
                leftTab === "layers"
                  ? { borderColor: theme.primaryColor || "#ea580c", color: theme.primaryColor || "#ea580c" }
                  : undefined
              }
            >
              Layers
            </button>
          </div>
          <div className="min-h-0 flex-1">
            {leftTab === "components" ? (
              <div className="flex h-full flex-col">
                <div className="min-h-0 flex-[1.2]">
                  <ComponentPalette onAdd={addComponent} />
                </div>
                <div className="min-h-0 flex-1 border-t border-slate-200">
                  <LayersPanel
                    components={components}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    onMove={moveComponent}
                    onDuplicate={duplicateComponent}
                    onDelete={deleteComponent}
                  />
                </div>
              </div>
            ) : (
              <LayersPanel
                components={components}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onMove={moveComponent}
                onDuplicate={duplicateComponent}
                onDelete={deleteComponent}
              />
            )}
          </div>
        </aside>

        {/* Canvas */}
        <main className="min-w-0 flex-1">
          <Canvas
            components={components}
            theme={theme}
            selectedId={selectedId}
            previewMode={previewMode}
            device={device}
            onSelect={setSelectedId}
            onMove={moveComponent}
            onDelete={deleteComponent}
          />
        </main>

        {/* Right sidebar */}
        <aside className="w-72 shrink-0 border-l border-slate-200 bg-white">
          <PropertiesPanel
            component={selected}
            theme={theme}
            onChangeProps={changeProps}
            onChangeStyle={changeStyle}
            onChangeTheme={changeTheme}
          />
        </aside>
      </div>
    </div>
  );
}
