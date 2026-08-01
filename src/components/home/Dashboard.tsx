"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project, Template } from "@/lib/types";
import { DEFAULT_THEME } from "@/lib/types";
import { blankProjectComponents } from "@/lib/presets";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Lucide Icons
import {
  Plus,
  Search,
  Globe,
  Trash2,
  ExternalLink,
  Layers,
  Database,
  ArrowRight,
  LayoutGrid,
  Smartphone,
  Tablet,
  Monitor,
  Rocket,
  Sliders,
  ArrowUpDown,
  GripVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

export function Dashboard() {
  const router = useRouter();
  const { user, openAuthModal, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "published" | "draft">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | number | null>(null);

  // Animated Builder Demo State (Strict User-Chosen Color Theme)
  const [sandboxViewport, setSandboxViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [sandboxColor, setSandboxColor] = useState<string>("coral");
  const [activeSandboxBlock, setActiveSandboxBlock] = useState<string>("hero");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isSwapped, setIsSwapped] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);

  // 3D Cover Flow Carousel State for "Everything You Need" Section
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const featureCards = useMemo(
    () => [
      {
        id: "blocks",
        tag: "Component Library",
        title: "15+ Visual Drag & Drop Blocks",
        description:
          "Compose Navbars, Hero sections, Feature grids, CTAs, and Footers with instant drag & drop placement.",
        icon: LayoutGrid,
      },
      {
        id: "styling",
        tag: "Design System",
        title: "Live OKLCH Theme Engine",
        description:
          "Customize fonts, background colors, text colors, margins, padding, and corner radius with real-time feedback.",
        icon: Sliders,
      },
      {
        id: "publishing",
        tag: "Cloud Infrastructure",
        title: "Instant 1-Click Cloud Deploy",
        description:
          "Publish your web pages with custom slugs in one click. Every project state is safely persisted in PostgreSQL.",
        icon: Rocket,
      },
      {
        id: "responsive",
        tag: "Fluid Breakpoints",
        title: "Multi-Viewport Preview",
        description:
          "Fine-tune layouts across Desktop, Tablet, and Mobile devices seamlessly with high-fidelity device frames.",
        icon: Monitor,
      },
      {
        id: "database",
        tag: "Fullstack Power",
        title: "Drizzle ORM & Supabase DB",
        description:
          "Type-safe database schemas and automated migrations generated as you design your visual pages.",
        icon: Database,
      },
    ],
    []
  );

  // Auto-rotate 3D Cover Flow Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % featureCards.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [featureCards.length]);

  // Helper to handle user interaction: pause auto-play and auto-resume after 5 seconds of inactivity
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);

    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    const timer = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);

    setInactivityTimer(timer);
  };

  // Function to toggle section layer positions
  const swapLayers = () => {
    setIsSwapped((prev) => !prev);
  };

  // Auto-play Animation Loop (STRICT USER COLOR Theme — NO Automatic Color Shifts!)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const viewports: ("desktop" | "tablet" | "mobile")[] = ["desktop", "tablet", "mobile"];

    let focusStep = 0;
    // 1. Active Block Focus Loop (Every 4.5 seconds - strictly keeps user's chosen color)
    const focusInterval = setInterval(() => {
      focusStep++;
      const blocks = isSwapped ? ["features", "hero", "navbar"] : ["hero", "features", "navbar"];
      setActiveSandboxBlock(blocks[focusStep % blocks.length]);
    }, 4500);

    // 2. Layer Swap Loop (Every 7.5 seconds)
    const swapInterval = setInterval(() => {
      setIsSwapped((prev) => !prev);
    }, 7500);

    // 3. Viewport Timer (Every 16 seconds)
    let vpStep = 0;
    const viewportInterval = setInterval(() => {
      vpStep++;
      setSandboxViewport(viewports[vpStep % viewports.length]);
    }, 16000);

    return () => {
      clearInterval(focusInterval);
      clearInterval(swapInterval);
      clearInterval(viewportInterval);
    };
  }, [isAutoPlaying, isSwapped]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [pRes, tRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/templates"),
      ]);
      if (!pRes.ok || !tRes.ok) throw new Error("Failed to load workspace data");
      const [pData, tData] = await Promise.all([pRes.json(), tRes.json()]);
      setProjects(pData);
      setTemplates(tData);
    } catch {
      setError("Could not load your workspace. Please verify database connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const createProject = async (opts?: {
    name?: string;
    components?: Project["components"];
    theme?: Project["theme"];
    description?: string;
  }) => {
    if (!user) {
      openAuthModal();
      return;
    }
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: opts?.name || "Untitled project",
          description: opts?.description || "",
          components: opts?.components || blankProjectComponents(),
          theme: opts?.theme || DEFAULT_THEME,
        }),
      });
      if (!res.ok) throw new Error("Creation failed");
      const project = await res.json();
      toast.success(`Project "${project.name || "Untitled"}" created!`);
      router.push(`/builder/${project.id}`);
    } catch {
      setError("Failed to create new project.");
      toast.error("Failed to create new project.");
      setCreating(false);
    }
  };

  const handleOpenProject = (id: string) => {
    if (!user) {
      openAuthModal();
      return;
    }
    router.push(`/builder/${id}`);
  };

  const deleteProject = async (id: string | number) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.info("Project deleted successfully");
    } catch {
      setError("Failed to delete project.");
      toast.error("Failed to delete project.");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.slug && p.slug.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;
      if (activeFilter === "published") return p.isPublished;
      if (activeFilter === "draft") return !p.isPublished;
      return true;
    });
  }, [projects, searchQuery, activeFilter]);

  // Categories for templates
  const categories = useMemo(() => {
    const cats = Array.from(new Set(templates.map((t) => t.category)));
    return ["all", ...cats];
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    if (selectedCategory === "all") return templates;
    return templates.filter((t) => t.category === selectedCategory);
  }, [templates, selectedCategory]);

  // Dynamic Theme Colors Map for Entire Page
  const sandboxThemeColorMap: Record<
    string,
    {
      bg: string;
      text: string;
      primary: string;
      border: string;
      ring: string;
      dotRing: string;
      hoverBorder: string;
      buttonHover: string;
      outlineText: string;
      outlineBorder: string;
    }
  > = {
    coral: {
      bg: "bg-primary/10",
      text: "text-primary",
      primary: "bg-primary hover:bg-primary/90",
      border: "border-primary",
      ring: "ring-primary/30",
      dotRing: "ring-primary",
      hoverBorder: "hover:border-primary/50",
      buttonHover: "hover:bg-primary/20",
      outlineText: "text-primary",
      outlineBorder: "border-primary/40",
    },
    indigo: {
      bg: "bg-indigo-500/10",
      text: "text-indigo-600 dark:text-indigo-400",
      primary: "bg-indigo-600 hover:bg-indigo-700",
      border: "border-indigo-600",
      ring: "ring-indigo-600/30",
      dotRing: "ring-indigo-600",
      hoverBorder: "hover:border-indigo-600/50",
      buttonHover: "hover:bg-indigo-500/20",
      outlineText: "text-indigo-600 dark:text-indigo-400",
      outlineBorder: "border-indigo-600/40",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      primary: "bg-emerald-600 hover:bg-emerald-700",
      border: "border-emerald-600",
      ring: "ring-emerald-600/30",
      dotRing: "ring-emerald-600",
      hoverBorder: "hover:border-emerald-600/50",
      buttonHover: "hover:bg-emerald-500/20",
      outlineText: "text-emerald-600 dark:text-emerald-400",
      outlineBorder: "border-emerald-600/40",
    },
    violet: {
      bg: "bg-purple-500/10",
      text: "text-purple-600 dark:text-purple-400",
      primary: "bg-purple-600 hover:bg-purple-700",
      border: "border-purple-600",
      ring: "ring-purple-600/30",
      dotRing: "ring-purple-600",
      hoverBorder: "hover:border-purple-600/50",
      buttonHover: "hover:bg-purple-500/20",
      outlineText: "text-purple-600 dark:text-purple-400",
      outlineBorder: "border-purple-600/40",
    },
  };

  const currentSandboxStyle = sandboxThemeColorMap[sandboxColor] || sandboxThemeColorMap.coral;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 py-12">

        {/* Clean, Simple & Concise Hero Section */}
        <section className="mb-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Simple & Concise Copy */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Standalone BIG craftsiteph Logo Brand (Initial Slant + Hover Scale Only) */}
              <div className="flex justify-start -ml-8 sm:-ml-12 -mb-12 sm:-mb-16 md:-mb-20 -mt-4">
                <img
                  src="/logo.png"
                  alt="craftsiteph Logo"
                  className="w-[340px] sm:w-[440px] md:w-[500px] h-auto object-contain drop-shadow-md transition-transform duration-300 ease-out transform -rotate-3 origin-left hover:scale-102 cursor-pointer"
                />
              </div>

              {/* Ultra-Clean Modern Headline */}
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.10]">
                Design visually. <br />
                <span className={`${currentSandboxStyle.text} transition-colors duration-500`}>
                  Publish instantly.
                </span>
              </h1>

              {/* Simple & Concise Subtitle */}
              <p className="text-base text-muted-foreground sm:text-lg leading-relaxed max-w-xl">
                Build responsive websites visually. Customize themes in real time and publish in one click.
              </p>

              {/* Concise CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Main Hero CTA Button */}
                <Link
                  href="/themes"
                  className={`h-11 px-6 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 text-base cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${currentSandboxStyle.primary}`}
                >
                  <span>Start Building</span>
                </Link>

                {/* Secondary Hero CTA Button */}
                <a
                  href="#templates"
                  className={`h-11 px-6 rounded-xl font-semibold flex items-center justify-center border bg-background cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${currentSandboxStyle.outlineText} ${currentSandboxStyle.outlineBorder} ${currentSandboxStyle.buttonHover}`}
                >
                  Templates
                </a>
              </div>

              {/* Clean Concise Metric Strip */}
              <div className="grid grid-cols-3 gap-6 border-t border-border pt-6 max-w-lg">
                {[
                  { number: "15+ Blocks", text: "Ready Components" },
                  { number: "100%", text: "Custom Themes" },
                  { number: "1-Click", text: "Cloud Publishing" },
                ].map((item) => (
                  <div key={item.text}>
                    <div className={`text-xl font-black sm:text-2xl transition-colors duration-500 ${currentSandboxStyle.text}`}>
                      {item.number}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 font-medium">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Sleek Animated Product Mockup */}
            <div className="lg:col-span-6 relative">
              
              {/* Browser Window Mockup Container */}
              <div className="w-full rounded-2xl border border-border bg-card shadow-xl min-h-[520px] h-[520px] flex mt-15 flex-col transition-all overflow-hidden">
                
                {/* Clean Browser Window Header with Google Chrome Style */}
                <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3 shrink-0">
                  
                  {/* Left: Official Google Icon & Address */}
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span className="hidden sm:inline text-xs font-mono font-semibold text-foreground">craftsiteph.app/live-preview</span>
                  </div>

                  {/* Right Controls: Viewport Icons + Swap Icon + Color Dots */}
                  <div className="flex items-center gap-3">
                    
                    {/* Device Viewport Icons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          handleUserInteraction();
                          setSandboxViewport("desktop");
                        }}
                        className={`p-1 rounded-md cursor-pointer transition ${
                          sandboxViewport === "desktop" ? `${currentSandboxStyle.text} font-bold` : "text-muted-foreground hover:text-foreground"
                        }`}
                        title="Desktop View"
                      >
                        <Monitor className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleUserInteraction();
                          setSandboxViewport("tablet");
                        }}
                        className={`p-1 rounded-md cursor-pointer transition ${
                          sandboxViewport === "tablet" ? `${currentSandboxStyle.text} font-bold` : "text-muted-foreground hover:text-foreground"
                        }`}
                        title="Tablet View"
                      >
                        <Tablet className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleUserInteraction();
                          setSandboxViewport("mobile");
                        }}
                        className={`p-1 rounded-md cursor-pointer transition ${
                          sandboxViewport === "mobile" ? `${currentSandboxStyle.text} font-bold` : "text-muted-foreground hover:text-foreground"
                        }`}
                        title="Mobile View"
                      >
                        <Smartphone className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Manual Swap Layers Icon Button */}
                    <button
                      type="button"
                      className={`p-1 rounded-md text-muted-foreground hover:${currentSandboxStyle.text} cursor-pointer transition`}
                      onClick={() => {
                        handleUserInteraction();
                        swapLayers();
                      }}
                      title="Swap Layer Positions"
                    >
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>

                    {/* Color Dots */}
                    <div className="flex items-center gap-2">
                      {[
                        { id: "coral", color: "bg-primary", dotRing: "ring-primary" },
                        { id: "indigo", color: "bg-indigo-600", dotRing: "ring-indigo-600" },
                        { id: "emerald", color: "bg-emerald-600", dotRing: "ring-emerald-600" },
                        { id: "violet", color: "bg-purple-600", dotRing: "ring-purple-600" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSandboxColor(item.id);
                          }}
                          className={`h-3 w-3 rounded-full ${item.color} cursor-pointer transition-all duration-300 ${
                            sandboxColor === item.id
                              ? `ring-2 ${item.dotRing} ring-offset-2 ring-offset-card scale-110`
                              : "opacity-60 hover:opacity-100"
                          }`}
                          title={`Select ${item.id} theme for whole page`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Inner Canvas Body */}
                <div className="p-4 flex-1 overflow-hidden bg-background/40 flex justify-center items-start">
                  
                  {/* Device Frame */}
                  <div
                    className={`w-full space-y-3 transition-all duration-700 ease-in-out relative ${
                      sandboxViewport === "mobile"
                        ? "max-w-[240px]"
                        : sandboxViewport === "tablet"
                        ? "max-w-[330px]"
                        : "max-w-full"
                    }`}
                  >
                    {/* Fixed Block 1: Navbar */}
                    <div
                      onClick={() => {
                        handleUserInteraction();
                        setActiveSandboxBlock("navbar");
                      }}
                      className={`group relative cursor-pointer rounded-xl border p-2.5 bg-card transition-all duration-500 flex items-center justify-between overflow-hidden shrink-0 z-30 ${
                        activeSandboxBlock === "navbar"
                          ? `${currentSandboxStyle.border} ring-2 ${currentSandboxStyle.ring} shadow-md`
                          : `border-border ${currentSandboxStyle.hoverBorder} shadow-sm`
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-1 rounded-md bg-muted/80 border border-border/50 text-muted-foreground flex items-center justify-center cursor-grab active:cursor-grabbing">
                          <GripVertical className="h-3 w-3" />
                        </div>
                        <img src="/logo.png" alt="craftsiteph Logo" className={`w-12 sm:w-18 h-auto scale-125 origin-left object-contain shrink-0 drop-shadow-xs -my-10 -mx-2 sm:-mx-3 ${sandboxViewport === "mobile" ? `w-24 sm:w-24` : `w-18 sm:w-32`}`} />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {sandboxViewport === "desktop" ? (
                          <div className="hidden md:flex items-center gap-2 text-[10px] font-semibold text-muted-foreground mr-1">
                            <span>Features</span>
                            <span>Docs</span>
                          </div>
                        ) : null}

                        {/* Deploy Button */}
                        <button
                          type="button"
                          className={`h-6 text-[10px] px-3 font-bold text-white rounded-md shadow-none shrink-0 cursor-pointer transition-colors duration-300 ${currentSandboxStyle.primary}`}
                        >
                          Deploy
                        </button>
                      </div>
                    </div>

                    {/* Symmetric Section Blocks Container */}
                    <div className="space-y-3 relative">
                      
                      {/* Hero Section Block */}
                      <div
                        onClick={() => {
                          handleUserInteraction();
                          setActiveSandboxBlock("hero");
                        }}
                        className={`group relative cursor-pointer rounded-xl border p-3.5 bg-card flex flex-col justify-between h-[160px] transition-all duration-700 ease-in-out ${
                          isSwapped
                            ? `translate-y-[175px] z-20 shadow-xl ${sandboxViewport === "mobile" ? `translate-y-[250px]` : ``}`
                            : "translate-y-0 z-10"
                        } ${
                          activeSandboxBlock === "hero"
                            ? `${currentSandboxStyle.border} ring-2 ${currentSandboxStyle.ring} shadow-md`
                            : `border-border ${currentSandboxStyle.hoverBorder} shadow-sm`
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {/* 6-Dot Drag Handle Badge */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUserInteraction();
                                swapLayers();
                              }}
                              className={`p-1 rounded-md bg-muted/90 border border-border/60 ${currentSandboxStyle.buttonHover} transition-all cursor-grab active:cursor-grabbing flex items-center justify-center group/grip ${currentSandboxStyle.text}`}
                              title="Click or drag 6-dot handle to swap section position"
                            >
                              <GripVertical className="h-3.5 w-3.5 group-hover/grip:scale-110 transition-transform" />
                            </button>
                            
                            {/* NextGen Builder Badge */}
                            <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-semibold transition-colors duration-500 ${currentSandboxStyle.bg} ${currentSandboxStyle.text}`}>
                              {/* <img src="/logo.png" alt="Logo" className={`h-4 w-auto object-contain shrink-0 ${sandboxViewport === "mobile" ? `sm:hidden` : `sm:inline`}`} /> */}
                              <span>NextGen Builder</span>
                            </div>
                          </div>

                          <Badge variant="outline" className={`text-[9px] py-0.5 px-2 font-mono text-muted-foreground ${sandboxViewport === "mobile" ? `sm:hidden` : `sm:inline`}`}>
                            v2.4 Live
                          </Badge>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-foreground leading-snug">
                            Build Fullstack Sites <span className={`${
                                          sandboxViewport === "mobile" ? `sm:hidden` : "sm:inline"
                                        }`}>Visually</span>
                          </h4>

                          <p className="text-[10px] sm:text-[11px] text-muted-foreground line-clamp-1 leading-relaxed mt-0.5">
                            Compose responsive Shadcn UI pages with integrated Drizzle ORM.
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Start Free Button */}
                          <button
                            type="button"
                            className={`h-6 text-[10px] px-3 font-bold text-white rounded-lg shadow-sm cursor-pointer transition-colors duration-300 ${currentSandboxStyle.primary}`}
                          >
                            Start Free
                          </button>

                          {/* Showcase Button */}
                          <button
                            type="button"
                            className={`h-6 text-[10px] px-3 font-semibold rounded-lg border bg-background cursor-pointer transition-colors duration-300 ${currentSandboxStyle.outlineText} ${currentSandboxStyle.outlineBorder} ${currentSandboxStyle.buttonHover}`}
                          >
                            Showcase
                          </button>
                        </div>
                      </div>

                      {/* Features Section Block */}
                      <div
                        onClick={() => {
                          handleUserInteraction();
                          setActiveSandboxBlock("features");
                        }}
                        className={`group relative cursor-pointer rounded-xl border p-3.5 bg-card flex flex-col justify-between h-[160px] transition-all duration-700 ease-in-out
                          ${
                            sandboxViewport === "mobile" ? `h-[240px]` : ``
                          }
                          ${
                          isSwapped
                            ? "-translate-y-[175px] z-20 shadow-xl"
                            : "translate-y-0 z-10"
                        } ${
                          activeSandboxBlock === "features"
                            ? `${currentSandboxStyle.border} ring-2 ${currentSandboxStyle.ring} shadow-md`
                            : `border-border ${currentSandboxStyle.hoverBorder} shadow-sm`
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {/* 6-Dot Drag Handle Badge */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUserInteraction();
                                swapLayers();
                              }}
                              className={`p-1 rounded-md bg-muted/90 border border-border/60 ${currentSandboxStyle.buttonHover} transition-all cursor-grab active:cursor-grabbing flex items-center justify-center group/grip ${currentSandboxStyle.text}`}
                              title="Click or drag 6-dot handle to swap section position"
                            >
                              <GripVertical className="h-3.5 w-3.5 group-hover/grip:scale-110 transition-transform" />
                            </button>
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                              Engineered Features
                            </span>
                          </div>
                          <Badge variant="outline" className={`text-[8px] py-0 px-1.5 ${sandboxViewport === "mobile" ? `sm:hidden` : `sm:inline`}`}>Shadcn UI</Badge>
                        </div>

                        <div className={`grid  gap-2 ${sandboxViewport === "mobile" ? `grid-cols-1` : `grid-cols-2`}`}>
                          <Card className={`p-2.5 border-border shadow-none ${currentSandboxStyle.bg} transition-colors duration-500 rounded-lg cursor-pointer`}>
                            <div className="flex items-center gap-1.5 mb-1">
                              <div className={`p-1 rounded-md bg-background shadow-xs ${currentSandboxStyle.text} transition-colors duration-500`}>
                                <Layers className="h-3 w-3" />
                              </div>
                              <CardTitle className={`text-[10px] font-bold line-clamp-1 ${currentSandboxStyle.text} transition-colors duration-500`}>
                                Visual Drag-Drop
                                {/* <span className={`${
                                          sandboxViewport === "mobile" ? `sm:hidden` : "sm:inline"
                                        }`}>Drag-Drop</span> */}
                              </CardTitle>
                            </div>
                            <CardDescription className="text-[8px] sm:text-[9px] leading-tight line-wrap">
                              Live OKLCH theme styling
                              {/* <span className={`${
                                          sandboxViewport === "mobile" ? `sm:hidden` : "sm:inline"
                                        }`}> theme styling</span> */}
                            </CardDescription>
                          </Card>

                          <Card className={`p-2.5 border-border shadow-none ${currentSandboxStyle.bg} transition-colors duration-500 rounded-lg cursor-pointer`}>
                            <div className="flex items-center gap-1.5 mb-1">
                              <div className={`p-1 rounded-md bg-background shadow-xs ${currentSandboxStyle.text} transition-colors duration-500`}>
                                <Database className="h-3 w-3" />
                              </div>
                              <CardTitle className={`text-[10px] font-bold ${currentSandboxStyle.text} transition-colors duration-500 line-clamp-1`}>
                                Supabase Database
                                {/* <span className={`${
                                          sandboxViewport === "mobile" ? `sm:hidden` : "sm:inline"
                                        }`}>DB</span> */}
                              </CardTitle>
                            </div>
                            <CardDescription className="text-[8px] sm:text-[9px] leading-tight">
                              <span className={`${
                                          sandboxViewport === "mobile" ? `sm:hidden` : "sm:inline"
                                        }`}>1-Click</span> PostgreSQL sync
                            </CardDescription>
                          </Card>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 3D Cover Flow Animated Feature Carousel Section */}
        <section className="mb-24 overflow-hidden py-6">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight sm:text-3xl">
              Everything You Need to Ship Beautiful Websites
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore the core capabilities of our modern visual builder engine
            </p>
          </div>

          {/* 3D Cover Flow Stage Container */}
          <div className="relative w-full max-w-5xl mx-auto h-[320px] flex items-center justify-center perspective-[1000px] select-none">
            
            {/* Left Nav Arrow Button */}
            <button
              type="button"
              onClick={() =>
                setActiveFeatureIndex((prev) => (prev - 1 + featureCards.length) % featureCards.length)
              }
              className="absolute left-2 z-40 p-2.5 rounded-full bg-card border border-border/80 shadow-xl backdrop-blur hover:scale-110 active:scale-95 transition cursor-pointer text-foreground"
              title="Previous Feature"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Right Nav Arrow Button */}
            <button
              type="button"
              onClick={() => setActiveFeatureIndex((prev) => (prev + 1) % featureCards.length)}
              className="absolute right-2 z-40 p-2.5 rounded-full bg-card border border-border/80 shadow-xl backdrop-blur hover:scale-110 active:scale-95 transition cursor-pointer text-foreground"
              title="Next Feature"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* 3D Feature Cards Stack */}
            <div className="relative w-full h-full flex items-center justify-center">
              {featureCards.map((feature, index) => {
                const total = featureCards.length;
                let diff = (index - activeFeatureIndex) % total;
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;

                const isActive = diff === 0;
                const IconComponent = feature.icon;

                // 3D Transform calculations based on offset position
                let transformStyle = "";
                let zIndex = 0;
                let opacity = 0;

                if (isActive) {
                  transformStyle = "translate3d(0px, 0px, 0px) scale(1) rotateY(0deg)";
                  zIndex = 30;
                  opacity = 1;
                } else if (diff === 1) {
                  transformStyle = "translate3d(210px, 0px, -120px) scale(0.85) rotateY(-28deg)";
                  zIndex = 20;
                  opacity = 0.65;
                } else if (diff === -1) {
                  transformStyle = "translate3d(-210px, 0px, -120px) scale(0.85) rotateY(28deg)";
                  zIndex = 20;
                  opacity = 0.65;
                } else if (diff === 2 || diff === -3) {
                  transformStyle = "translate3d(380px, 0px, -240px) scale(0.7) rotateY(-40deg)";
                  zIndex = 10;
                  opacity = 0.3;
                } else if (diff === -2 || diff === 3) {
                  transformStyle = "translate3d(-380px, 0px, -240px) scale(0.7) rotateY(40deg)";
                  zIndex = 10;
                  opacity = 0.3;
                } else {
                  transformStyle = "translate3d(0px, 0px, -400px) scale(0.5)";
                  zIndex = 0;
                  opacity = 0;
                }

                return (
                  <div
                    key={feature.id}
                    onClick={() => setActiveFeatureIndex(index)}
                    style={{
                      transform: transformStyle,
                      zIndex,
                      opacity,
                    }}
                    className={`absolute w-[310px] sm:w-[360px] h-[280px] rounded-3xl p-6 bg-card transition-all duration-700 ease-out cursor-pointer flex flex-col justify-between overflow-hidden backdrop-blur ${
                      isActive
                        ? `border-2 ${currentSandboxStyle.border} shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]`
                        : "border border-border/70 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.65)] hover:border-primary/40"
                    }`}
                  >
                    {/* Top Pill Tag */}
                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${currentSandboxStyle.bg} ${currentSandboxStyle.text} transition-colors duration-500`}>
                        {feature.tag}
                      </div>

                      <div className={`p-2.5 rounded-2xl ${currentSandboxStyle.bg} ${currentSandboxStyle.text} transition-colors duration-500`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="space-y-2 my-auto">
                      <h3 className="text-xl font-extrabold text-foreground tracking-tight leading-snug">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {feature.description}
                      </p>
                    </div>

                    {/* Card Footer Indicator */}
                    <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs font-bold text-muted-foreground">
                      <span>Feature 0{index + 1}</span>
                      <span className={`${currentSandboxStyle.text} flex items-center gap-1 transition-colors duration-500`}>
                        Explore Feature <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3D Cover Flow Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {featureCards.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveFeatureIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeFeatureIndex === i
                    ? `w-8 ${currentSandboxStyle.primary}`
                    : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
                title={`Go to feature ${i + 1}`}
              />
            ))}
          </div>
        </section>


        {/* Error Alert */}
        {error ? (
          <Card className="mb-6 border-destructive/30 bg-destructive/10 p-4 text-destructive">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>{error}</span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="cursor-pointer"
                onClick={() => void load()}
              >
                Retry
              </Button>
            </div>
          </Card>
        ) : null}

        {/* Workspace Projects Section */}
        <section className="mb-16">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-foreground tracking-tight">Your Projects</h2>
                <Badge variant="secondary" className="rounded-full">
                  {projects.length}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage and open your existing visual website projects
              </p>
            </div>

            {/* Controls: Search & Filter */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[220px]">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center rounded-lg border border-border bg-muted/50 p-1">
                {(["all", "published", "draft"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-md px-3 py-1 text-xs font-semibold capitalize cursor-pointer transition ${
                      activeFilter === filter
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Skeletons */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-48 animate-pulse bg-card/60" />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            /* Empty State */
            <Card className="border-dashed p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-2xl mb-3">
                <LayoutGrid className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No projects found</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
                {searchQuery || activeFilter !== "all"
                  ? "No projects match your current search or filter."
                  : "Create a blank canvas or start from a pre-made template below."}
              </p>
              <Link
                href="/themes"
                className={`mt-5 h-10 px-5 rounded-lg font-bold text-white flex items-center gap-2 text-sm mx-auto cursor-pointer transition-colors duration-500 ${currentSandboxStyle.primary}`}
              >
                <Plus className="h-4 w-4" />
                <span>Create your first project</span>
              </Link>
            </Card>
          ) : (
            /* Projects Grid */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((p) => {
                const isConfirming = confirmDeleteId === p.id;
                const isDeleting = deletingId === p.id;

                return (
                  <Card
                    key={p.id}
                    className="group relative flex flex-col overflow-hidden transition hover:shadow-lg"
                  >
                    {/* Visual Card Banner Header */}
                    <div
                      className="h-28 border-b border-border relative p-4 flex flex-col justify-between"
                      style={{
                        background: `linear-gradient(135deg, ${p.theme?.primaryColor || "var(--primary)"}, ${p.theme?.secondaryColor || "var(--secondary)"})`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-card/90 text-foreground backdrop-blur">
                          {p.components?.length || 0} blocks
                        </Badge>
                        {p.isPublished ? (
                          <Badge variant="default" className="gap-1 bg-emerald-600 text-white">
                            <Globe className="h-3 w-3" />
                            <span>Live</span>
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-card/80 text-muted-foreground backdrop-blur">
                            Draft
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <CardHeader className="p-5 pb-2">
                      <CardTitle className={`text-lg transition-colors duration-300 group-hover:${currentSandboxStyle.text}`}>
                        {p.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-xs">
                        {p.description || "Custom website design layout."}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter className="mt-auto p-5 pt-3 border-t border-border flex items-center gap-2">
                      {/* Editor Link */}
                      <button
                        type="button"
                        onClick={() => handleOpenProject(p.slug || String(p.id))}
                        className={`flex-1 h-9 rounded-md font-semibold text-white text-xs flex items-center justify-center cursor-pointer transition-colors duration-500 ${currentSandboxStyle.primary}`}
                      >
                        Open editor
                      </button>

                      {/* View Published Link */}
                      {p.isPublished && p.slug ? (
                        <Button asChild variant="outline" size="sm" className="gap-1 cursor-pointer">
                          <Link href={`/p/${p.slug}`} target="_blank">
                            <span>View</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      ) : null}

                      {/* Delete Action */}
                      {isConfirming ? (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="cursor-pointer"
                          disabled={isDeleting}
                          onClick={() => void deleteProject(p.id)}
                        >
                          {isDeleting ? "..." : "Confirm?"}
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer"
                          onClick={() => setConfirmDeleteId(p.id)}
                          title="Delete project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Starter Kit Templates Showcase Section */}
        <section id="templates" className="pb-16 border-t border-border pt-12">
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">
                Start from a Template
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Choose a pre-designed layout to jumpstart your build
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`capitalize font-semibold text-xs h-8 px-3 rounded-md cursor-pointer transition-colors duration-300 ${
                      isSelected
                        ? `${currentSandboxStyle.primary} text-white`
                        : "border border-border bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredTemplates.map((t) => (
              <Card
                key={t.id}
                onClick={() =>
                  void createProject({
                    name: t.name,
                    description: t.description || "",
                    components: t.components,
                    theme: t.theme,
                  })
                }
                className={`group cursor-pointer flex flex-col overflow-hidden transition-all duration-500 hover:shadow-lg ${currentSandboxStyle.hoverBorder}`}
              >
                {/* Template Visual Banner */}
                <div
                  className="h-24 relative p-4 flex items-end justify-between"
                  style={{
                    background: `linear-gradient(135deg, ${t.theme.primaryColor}, ${t.theme.secondaryColor})`,
                  }}
                >
                  <Badge variant="secondary" className="bg-card/90 uppercase font-bold text-[10px]">
                    {t.category}
                  </Badge>
                </div>

                {/* Template Content */}
                <CardHeader className="p-4 pb-2">
                  <CardTitle className={`text-base transition-colors duration-300 group-hover:${currentSandboxStyle.text}`}>
                    {t.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">
                    {t.description}
                  </CardDescription>
                </CardHeader>

                <CardFooter className={`mt-auto p-4 pt-2 border-t border-border flex items-center justify-between text-xs font-semibold ${currentSandboxStyle.text} transition-colors duration-500`}>
                  <span>Use template</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </CardFooter>
              </Card>
            ))}

            {!loading && filteredTemplates.length === 0 ? (
              <Card className="col-span-full border-dashed p-12 text-center text-sm text-muted-foreground">
                No templates in this category yet.
              </Card>
            ) : null}
          </div>
        </section>
      </main>

      {/* Footer with PROMINENT LARGE craftsiteph Logo */}
      <footer className="border-t border-border bg-card py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="craftsiteph Logo" className="h-10 sm:h-12 w-auto object-contain shrink-0" />
          </div>
          <div>© 2026 craftsiteph. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
