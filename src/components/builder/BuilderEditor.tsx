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
import { createClient } from "@/lib/supabase/client";
import { Monitor, Tablet, Smartphone, LogOut, User, Shield, Check, Sparkles, Plus, Layers, Sliders } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Props = {
  project: Project;
};

export function BuilderEditor({ project }: Props) {
  const router = useRouter();
  const { user, loading: authLoading, openAuthModal, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "");
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!displayName.trim() || isSavingProfile) return;
    setIsSavingProfile(true);
    try {
      const supabase = createClient();
      await supabase.auth.updateUser({
        data: { full_name: displayName.trim() },
      });
      setProfileSuccess(true);
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        setProfileSuccess(false);
        setIsProfileOpen(false);
      }, 900);
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

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
  const [leftTab, setLeftTab] = useState<"add" | "layers" | "design">("add");

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
    toast.success(`Added ${type} component to canvas`);
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
    toast.success("Component duplicated");
  };

  const deleteComponent = (id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
    markDirty();
    toast.info("Component deleted from page");
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
      const msg = opts?.publish ? "Website published live!" : opts?.unpublish ? "Website unpublished" : "Project saved successfully!";
      setMessage(opts?.publish ? "Published!" : opts?.unpublish ? "Unpublished" : "Saved");
      if (opts?.publish) toast.success("Website published live!");
      else if (opts?.unpublish) toast.info("Website unpublished");
      else toast.success("Project saved successfully!");
      router.refresh();
    } catch {
      setMessage("Could not save. Try again.");
      toast.error("Failed to save project. Please try again.");
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

  // Bi-directional synchronization: Ensure canvas theme matches global application theme
  useEffect(() => {
    const syncCanvasWithGlobalTheme = () => {
      const isGlobalDark = document.documentElement.classList.contains("dark");
      if (isGlobalDark) {
        // App is in dark mode: if canvas is currently light, switch canvas to dark theme
        if (theme.backgroundColor === "#ffffff" || !theme.backgroundColor) {
          changeTheme({
            backgroundColor: "#09090b",
            textColor: "#f8fafc",
            secondaryColor: "#0f172a",
          });
        }
      } else {
        // App is in light mode: if canvas is currently dark, switch canvas to light theme
        if (
          theme.backgroundColor === "#09090b" ||
          theme.backgroundColor === "#020817" ||
          theme.backgroundColor === "#000000"
        ) {
          changeTheme({
            backgroundColor: "#ffffff",
            textColor: "#0f172a",
            secondaryColor: "#f1f5f9",
          });
        }
      }
    };

    syncCanvasWithGlobalTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          syncCanvasWithGlobalTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.backgroundColor]);

  return (
    <div className="flex h-screen flex-col bg-muted text-foreground">
      {/* Top bar */}
      <header className="z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-3 shadow-sm">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          title="Back to Dashboard"
        >
          <img src="/logo.png" alt="craftsiteph Logo" className="h-10 sm:h-16 md:h-18 w-auto object-contain shrink-0" />
        </Link>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            markDirty();
          }}
          className="min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm font-semibold outline-none hover:border-border focus:border-border focus:bg-background sm:max-w-xs"
        />

        {dirty ? (
          <span className="hidden text-xs text-amber-600 sm:inline">Unsaved</span>
        ) : (
          <span className="hidden text-xs text-emerald-600 sm:inline">{message || "Up to date"}</span>
        )}

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Viewport Controls */}
          <div className="mr-1 hidden items-center rounded-lg border border-border bg-muted/50 dark:bg-muted/20 p-0.5 sm:flex">
            {(
              [
                ["desktop", "Desktop", Monitor],
                ["tablet", "Tablet", Tablet],
                ["mobile", "Mobile", Smartphone],
              ] as const
            ).map(([key, label, Icon]) => (
              <button
                key={key}
                type="button"
                onClick={() => setDevice(key)}
                title={label}
                className={`rounded-md p-1.5 transition ${
                  device === key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <div className="flex items-center rounded-lg border border-border bg-muted/50 dark:bg-muted/20 p-0.5">
            <button
              type="button"
              onClick={() => setPreviewMode("edit")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                previewMode === "edit"
                  ? "bg-background text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
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
                  ? "bg-background text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Preview
            </button>
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={() => void save()}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:bg-muted/50 dark:bg-muted/20 disabled:opacity-50"
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
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted/50 dark:bg-muted/20 disabled:opacity-50"
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
          <div className="ml-1 pl-1 border-l border-border">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full border-2 overflow-hidden cursor-pointer transition-all focus:outline-none flex items-center justify-center bg-muted hover:scale-105 active:scale-95"
                    style={{
                      borderColor: `${theme.primaryColor || "#ea580c"}60`,
                    }}
                    title={user.email || "User Profile"}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata.full_name || "User Avatar"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className="h-full w-full flex items-center justify-center font-bold text-xs"
                        style={{
                          backgroundColor: `${theme.primaryColor || "#ea580c"}15`,
                          color: theme.primaryColor || "#ea580c",
                        }}
                      >
                        {user.email?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-xl border-border/80 bg-popover">
                  <div className="px-2 py-1.5 space-y-0.5">
                    <p className="text-xs font-bold text-foreground truncate">
                      {user.user_metadata?.full_name || "User Account"}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                    onClick={() => setIsProfileOpen(true)}
                    className="text-xs font-semibold cursor-pointer rounded-lg flex items-center gap-2 py-2 text-foreground focus:bg-muted focus:text-foreground hover:bg-muted transition-colors"
                  >
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                    onClick={() => void signOut()}
                    className="text-xs font-semibold cursor-pointer rounded-lg flex items-center gap-2 py-2 text-rose-600 focus:text-rose-600 focus:bg-rose-500/10"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal()}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground shadow-xs hover:bg-muted/50 dark:bg-muted/20 cursor-pointer"
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
        {/* Unified Left Sidebar */}
        <aside className="flex w-80 sm:w-84 md:w-88 shrink-0 flex-col border-r border-border bg-background">
          <div className="flex border-b border-border bg-muted/30 p-1.5 gap-1">
            <button
              type="button"
              onClick={() => setLeftTab("add")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                leftTab === "add"
                  ? "bg-background text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              style={
                leftTab === "add"
                  ? { color: theme.primaryColor || "#ea580c" }
                  : undefined
              }
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
            <button
              type="button"
              onClick={() => setLeftTab("layers")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                leftTab === "layers"
                  ? "bg-background text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              style={
                leftTab === "layers"
                  ? { color: theme.primaryColor || "#ea580c" }
                  : undefined
              }
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Layers</span>
            </button>
            <button
              type="button"
              onClick={() => setLeftTab("design")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer relative ${
                leftTab === "design"
                  ? "bg-background text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              style={
                leftTab === "design"
                  ? { color: theme.primaryColor || "#ea580c" }
                  : undefined
              }
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Design</span>
              {selectedId && (
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: theme.primaryColor || "#ea580c" }}
                />
              )}
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {leftTab === "add" && <ComponentPalette onAdd={addComponent} />}
            {leftTab === "layers" && (
              <LayersPanel
                components={components}
                selectedId={selectedId}
                onSelect={(id) => {
                  setSelectedId(id);
                  if (id) setLeftTab("design");
                }}
                onMove={moveComponent}
                onDuplicate={duplicateComponent}
                onDelete={deleteComponent}
              />
            )}
            {leftTab === "design" && (
              <PropertiesPanel
                component={selected}
                theme={theme}
                onChangeProps={changeProps}
                onChangeStyle={changeStyle}
                onChangeTheme={changeTheme}
              />
            )}
          </div>
        </aside>

        {/* Canvas (Full right area) */}
        <main className="min-w-0 flex-1">
          <Canvas
            components={components}
            theme={theme}
            selectedId={selectedId}
            previewMode={previewMode}
            device={device}
            onSelect={(id) => {
              setSelectedId(id);
              if (id) setLeftTab("design");
            }}
            onMove={moveComponent}
            onDelete={deleteComponent}
          />
        </main>
      </div>
      {/* Edit Profile Modal Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent
          className="sm:max-w-[440px] border-border/80 bg-background/95 backdrop-blur-2xl shadow-2xl p-0 overflow-hidden"
          style={{
            borderRadius: theme.borderRadius ? `calc(${theme.borderRadius} * 1.5)` : "24px",
            fontFamily: theme.fontFamily || "inherit",
          }}
        >
          <div
            className="p-6 pb-4 border-b border-border/50"
            style={{
              background: `linear-gradient(to right, ${theme.primaryColor || "#ea580c"}18, ${theme.primaryColor || "#ea580c"}05, transparent)`,
            }}
          >
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="p-1.5 transition-all flex items-center justify-center"
                  style={{
                    backgroundColor: `${theme.primaryColor || "#ea580c"}20`,
                    color: theme.primaryColor || "#ea580c",
                    borderRadius: theme.borderRadius || "12px",
                  }}
                >
                  <User className="h-4 w-4" />
                </span>
                <DialogTitle className="text-xl font-extrabold tracking-tight">Edit Profile</DialogTitle>
              </div>
              <DialogDescription className="text-xs text-muted-foreground">
                Update your display name and view your account details.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6 space-y-5">
            {/* Account Info Card */}
            <div
              className="flex items-center gap-4 p-3.5 bg-muted/40 border border-border/60 shadow-xs transition-all"
              style={{
                borderRadius: theme.borderRadius ? `calc(${theme.borderRadius} * 1.2)` : "16px",
              }}
            >
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  className="h-12 w-12 rounded-full border border-border object-cover"
                />
              ) : (
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center font-bold text-base"
                  style={{
                    backgroundColor: `${theme.primaryColor || "#ea580c"}15`,
                    color: theme.primaryColor || "#ea580c",
                  }}
                >
                  {user?.email?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground truncate">
                  {displayName.trim() || user?.user_metadata?.full_name || "User Account"}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Shield className="h-3 w-3" /> Google Authenticated
                </span>
              </div>
            </div>

            {/* Display Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Full / Display Name</label>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name..."
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                className="h-10.5 border bg-background/50 text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent selection:bg-slate-200 dark:selection:bg-slate-700 selection:text-foreground transition-all"
                style={{
                  borderRadius: theme.borderRadius || "12px",
                  borderColor: isInputFocused ? (theme.primaryColor || "#ea580c") : undefined,
                  boxShadow: isInputFocused ? `0 0 0 2px ${theme.primaryColor || "#ea580c"}33` : undefined,
                }}
              />
            </div>
          </div>

          <DialogFooter className="p-6 pt-0 sm:justify-stretch">
            <Button
              type="button"
              size="default"
              disabled={isSavingProfile || !displayName.trim()}
              onClick={handleSaveProfile}
              className="w-full py-2.5 font-bold text-sm h-10.5 text-white shadow-md cursor-pointer transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
              style={{
                backgroundColor: theme.primaryColor || "#ea580c",
                borderRadius: theme.borderRadius || "12px",
              }}
            >
              {profileSuccess ? (
                <>
                  <Check className="h-4 w-4 mr-1.5" />
                  <span>Saved!</span>
                </>
              ) : isSavingProfile ? (
                <span>Saving...</span>
              ) : (
                <span>Save Changes</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
