"use client";

import React, { useState, useEffect } from "react";
import {
  Wrench,
  Layout,
  Layers,
  Palette,
  BarChart3,
  Activity,
  Zap,
  FolderKanban,
  Users,
  Settings,
  HelpCircle,
  Clock,
  Server,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Globe,
  Gauge,
  HardDrive,
  Cpu,
  Sparkles,
  Search,
  Bell,
  CheckCircle2,
  MoreVertical,
  Maximize2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// 24-hour platform analytics data
const hourlyData = [
  { time: "06:00", pageviews: 1240, requests: 3820, buildTime: 1.2 },
  { time: "08:00", pageviews: 2850, requests: 6540, buildTime: 1.8 },
  { time: "10:00", pageviews: 4390, requests: 9200, buildTime: 2.5 },
  { time: "12:00", pageviews: 5820, requests: 12400, buildTime: 3.1 },
  { time: "14:00", pageviews: 6410, requests: 14100, buildTime: 3.8 },
  { time: "16:00", pageviews: 5930, requests: 12900, buildTime: 3.2 },
  { time: "18:00", pageviews: 4810, requests: 10500, buildTime: 2.4 },
  { time: "20:00", pageviews: 3920, requests: 8400, buildTime: 1.9 },
  { time: "22:00", pageviews: 2750, requests: 5900, buildTime: 1.4 },
];

// Weekly performance averages data
const weeklyData = [
  { week: "Week 1", visitors: 18.2, deployments: 42, latency: 24 },
  { week: "Week 2", visitors: 20.5, deployments: 58, latency: 22 },
  { week: "Week 3", visitors: 22.8, deployments: 64, latency: 21 },
  { week: "Week 4", visitors: 24.1, deployments: 79, latency: 19 },
  { week: "Week 5", visitors: 25.9, deployments: 88, latency: 18 },
  { week: "Week 6", visitors: 26.8, deployments: 94, latency: 17 },
];

interface CraftsiteDashboardProps {
  cardClass?: string;
}

export function CraftsiteDashboard({ cardClass = "" }: CraftsiteDashboardProps) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime ? currentTime.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "July 29, 2026";
  const formattedTime = currentTime ? currentTime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "04:10:57 PM";

  return (
    <div id="craftsite-dashboard-container" className="w-full rounded-3xl border border-border/70 bg-card/40 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col lg:flex-row transition-all duration-300 relative bg-background">
      <style>{`
        .thin-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 10px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--primary);
        }
        .thin-scrollbar {
          scrollbar-width: thin;
        }
        #craftsite-dashboard-container:fullscreen {
          background-color: var(--background) !important;
        }
        #craftsite-dashboard-container:fullscreen main {
          max-height: 100vh !important;
        }
      `}</style>
      
      {/* ================= CRAFTSITE SIDEBAR ================= */}
      <aside className="w-full lg:w-64 shrink-0 bg-card/90 border-r border-border/60 p-4 flex flex-col justify-between space-y-6 select-none overflow-y-auto thin-scrollbar">
        
        <div className="space-y-6">
          {/* LOGO & BRAND */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md shadow-primary/30 font-bold">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-foreground flex items-center gap-1.5">
                <span>craftsite</span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-primary/15 text-primary">
                  PRO
                </span>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Visual Site Builder
              </p>
            </div>
          </div>

          {/* SEARCH BAR MINI */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search components..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-background/60 border border-border/60 rounded-xl placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* NAVIGATION SECTIONS */}
          <nav className="space-y-5 text-xs">
            
            {/* SECTION 1: CREATIVE STUDIO */}
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Creative Studio
              </div>
              <button
                type="button"
                onClick={() => setActiveNav("dashboard")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeNav === "dashboard"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layout className="h-4 w-4" />
                  <span>Dashboard</span>
                </div>
                {activeNav === "dashboard" && <ChevronRight className="h-3.5 w-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveNav("builder")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeNav === "builder"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FolderKanban className="h-4 w-4" />
                  <span>Page Builder</span>
                </div>
                <Badge variant="outline" className="text-[9px] py-0 px-1 bg-primary/10 border-primary/20 text-primary font-bold">
                  v2.4
                </Badge>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav("themes")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeNav === "themes"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Palette className="h-4 w-4" />
                  <span>Theme Studio</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav("components")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeNav === "components"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="h-4 w-4" />
                  <span>Components</span>
                </div>
              </button>
            </div>

            {/* SECTION 2: ANALYTICS & MONITORING */}
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Analytics & Traffic
              </div>
              <button
                type="button"
                onClick={() => setActiveNav("analytics")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeNav === "analytics"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="h-4 w-4" />
                  <span>Site Analytics</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav("logs")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeNav === "logs"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="h-4 w-4" />
                  <span>Deployment Logs</span>
                </div>
              </button>
            </div>

            {/* SECTION 3: ADMINISTRATION */}
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Administration
              </div>
              <button
                type="button"
                onClick={() => setActiveNav("users")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeNav === "users"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="h-4 w-4" />
                  <span>Team & Roles</span>
                </div>
              </button>
            </div>

          </nav>
        </div>

        {/* BOTTOM SIDEBAR UTILITIES & PROFILE */}
        <div className="space-y-3 pt-3 border-t border-border/60 text-xs">
          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 transition cursor-pointer font-semibold"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          
          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 transition cursor-pointer font-semibold"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help & Docs</span>
          </button>

          {/* USER PROFILE CARD */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-background/80 border border-border/60 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-primary/20 text-primary font-extrabold flex items-center justify-center text-xs">
                CA
              </div>
              <div>
                <div className="font-bold text-foreground text-xs leading-tight">
                  Craftsite Admin
                </div>
                <div className="text-[10px] text-muted-foreground font-medium">
                  System Operator
                </div>
              </div>
            </div>
            <button className="p-1.5 rounded-lg bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer" title="Edit Profile">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* ================= MAIN DASHBOARD BODY ================= */}
      <main className="flex-1 p-5 sm:p-7 space-y-6 overflow-y-auto max-h-[850px] thin-scrollbar">
        
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <Globe className="h-4 w-4" />
              <span>Craftsite Platform Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Good Afternoon
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Real-time website performance &amp; builder metrics for{" "}
              <span className="font-semibold text-foreground">{formattedDate}</span>.
            </p>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-mono bg-background/80 border border-border/70 px-3 py-1.5 rounded-xl shadow-xs">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-foreground font-semibold">{formattedTime}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono bg-background/80 border border-border/70 px-3 py-1.5 rounded-xl shadow-xs">
              <Server className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-foreground font-semibold">Edge CDN</span>
              <span className="text-emerald-500 font-bold text-[10px]">Connected</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-xl shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE</span>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-xl bg-background/80 border border-border/70 shadow-xs ml-1 cursor-pointer hover:bg-muted"
              onClick={() => {
                const elem = document.getElementById("craftsite-dashboard-container");
                if (elem) {
                  if (!document.fullscreenElement) {
                    elem.requestFullscreen().catch((err) => console.error(err));
                  } else {
                    document.exitFullscreen();
                  }
                }
              }}
              title="Toggle Fullscreen"
            >
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* TOP STAT CARDS (3 COLUMNS) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* CARD 1: TOTAL VISITORS */}
          <Card className={`p-4 ${cardClass}`}>
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-sky-400" />
                <span>Total Visitors</span>
              </div>
            </div>
            <div className="text-3xl font-extrabold text-foreground mb-3 font-mono tracking-tight">
              26.8K
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground flex-wrap">
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] font-bold px-2 py-0">
                +12.4% Optimal
              </Badge>
              <span>Global CDN — Zone A</span>
            </div>
          </Card>

          {/* CARD 2: CONVERSION RATE */}
          <Card className={`p-4 ${cardClass}`}>
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              <div className="flex items-center gap-1.5">
                <Gauge className="h-4 w-4 text-emerald-400" />
                <span>Conversion Rate</span>
              </div>
            </div>
            <div className="text-3xl font-extrabold text-foreground mb-3 font-mono tracking-tight">
              89% RH
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground flex-wrap">
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] font-bold px-2 py-0">
                Ideal Range
              </Badge>
              <span>Target: 80-95% RH</span>
            </div>
          </Card>

          {/* CARD 3: ACTIVE DEPLOYMENTS */}
          <Card className={`p-4 ${cardClass}`}>
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-indigo-400" />
                <span>Deploy Status</span>
              </div>
            </div>
            <div className="text-3xl font-extrabold text-foreground mb-3 font-mono tracking-tight">
              2/3 LIVE
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground flex-wrap">
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px] font-bold px-2 py-0">
                Main + Staging
              </Badge>
              <span>Auto build trigger</span>
            </div>
          </Card>

        </div>

        {/* MIDDLE MAIN GRID: CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* FULL WIDTH CHART CARD (12 COLS) */}
          <Card className={`lg:col-span-12 flex flex-col justify-between ${cardClass}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Traffic &amp; Server Load Monitoring</CardTitle>
              <CardDescription className="text-xs">
                Real-time pageviews, API requests, and compilation speed from Craftsite Edge Nodes — today&apos;s 24-hour cycle.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-1">
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="pvGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="reqGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        borderColor: "var(--border)",
                        borderRadius: "12px",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="pageviews"
                      name="Pageviews"
                      stroke="#38bdf8"
                      strokeWidth={2}
                      fill="url(#pvGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      name="API Requests"
                      stroke="#f87171"
                      strokeWidth={2}
                      fill="url(#reqGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="buildTime"
                      name="Build Time (s)"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="none"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-3 border-t border-border/40 text-xs font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                  <span>Pageviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span>API Requests</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>Build Latency (s)</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* BOTTOM GRID (2 EQUAL COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* BOTTOM LEFT: WEEKLY VISITOR AVERAGES */}
          <Card className={`p-5 space-y-4 ${cardClass}`}>
            <div>
              <CardTitle className="text-base font-bold">Weekly Performance Averages</CardTitle>
              <CardDescription className="text-xs mt-1">
                Average visitors (K), total deployments, and server latency per week stored in PostgreSQL.
              </CardDescription>
            </div>

            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      borderColor: "var(--border)",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="visitors" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Visitors (K)" />
                  <Bar dataKey="deployments" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Deployments" />
                  <Bar dataKey="latency" fill="#10b981" radius={[4, 4, 0, 0]} name="Latency (ms)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* BOTTOM RIGHT: RESOURCE UTILIZATION */}
          <Card className={`p-5 space-y-4 ${cardClass}`}>
            <div>
              <CardTitle className="text-base font-bold">Resource Utilization</CardTitle>
              <CardDescription className="text-xs mt-1">
                Bandwidth distribution of CDN, Edge Functions, and Image Optimization — controlled by Craftsite.
              </CardDescription>
            </div>

            <div className="space-y-4 pt-1">
              {/* Resource 1: CDN Bandwidth */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-sky-400" />
                    <span>Global CDN Bandwidth</span>
                  </div>
                  <span className="font-mono text-muted-foreground">4.2 GB/day (42%)</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-sky-400 rounded-full transition-all duration-500" style={{ width: "42%" }} />
                </div>
              </div>

              {/* Resource 2: Edge Functions */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span>Edge Function Invocations</span>
                  </div>
                  <span className="font-mono text-muted-foreground">2.8M req/day (28%)</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "28%" }} />
                </div>
              </div>

              {/* Resource 3: Image Optimization */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-emerald-400" />
                    <span>Image Optimization Asset Storage</span>
                  </div>
                  <span className="font-mono text-muted-foreground">0.5 GB/day (5%)</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: "5%" }} />
                </div>
              </div>

              {/* Summary stat badge */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-between text-xs mt-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Total Platform Usage</span>
                </div>
                <span className="font-mono font-bold text-foreground">7.5 GB / 24h</span>
              </div>
            </div>
          </Card>

        </div>

      </main>
    </div>
  );
}
