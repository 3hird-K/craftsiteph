"use client";

import React from "react";
import {
  Sprout,
  Thermometer,
  Droplets,
  Activity,
  TrendingUp,
  Clock,
  Cpu,
  ExternalLink,
  ShieldAlert,
  Database,
  Wind,
  CloudRain,
  Zap,
  BarChart3,
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

// 24-hour environmental monitoring mock data
const hourlyData = [
  { time: "06:00", temp: 24.5, humidity: 82, fan: 0 },
  { time: "08:00", temp: 25.2, humidity: 85, fan: 0.5 },
  { time: "10:00", temp: 26.0, humidity: 88, fan: 1.2 },
  { time: "12:00", temp: 27.5, humidity: 91, fan: 2.5 },
  { time: "14:00", temp: 28.1, humidity: 89, fan: 3.2 },
  { time: "16:00", temp: 27.8, humidity: 88, fan: 2.8 },
  { time: "18:00", temp: 26.9, humidity: 87, fan: 1.5 },
  { time: "20:00", temp: 26.2, humidity: 89, fan: 0.8 },
  { time: "22:00", temp: 25.8, humidity: 90, fan: 0.2 },
];

// Weekly sensor averages data
const weeklyData = [
  { week: "Week 1", temp: 24.2, humidity: 85, fan: 2.1 },
  { week: "Week 2", temp: 25.0, humidity: 87, fan: 2.8 },
  { week: "Week 3", temp: 25.8, humidity: 88, fan: 3.4 },
  { week: "Week 4", temp: 26.5, humidity: 90, fan: 4.0 },
  { week: "Week 5", temp: 26.8, humidity: 89, fan: 4.2 },
  { week: "Week 6", temp: 26.8, humidity: 89, fan: 4.2 },
];

interface SmartGrowDashboardProps {
  cardClass?: string;
}

export function SmartGrowDashboard({ cardClass = "" }: SmartGrowDashboardProps) {
  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider">
            <Sprout className="h-4 w-4" />
            <span>SmartGrow Greenhouse Monitor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Good Afternoon
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Real-time environmental monitoring for{" "}
            <span className="font-semibold text-foreground">July 29, 2026</span>.
          </p>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-mono bg-background/80 border border-border/70 px-3 py-1.5 rounded-xl shadow-xs">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-foreground font-semibold">04:10:57 PM</span>
            <span className="text-muted-foreground text-[10px]">PH</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono bg-background/80 border border-border/70 px-3 py-1.5 rounded-xl shadow-xs">
            <Cpu className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-foreground font-semibold">ESP32</span>
            <span className="text-emerald-500 font-bold text-[10px]">Connected</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-xl shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>LIVE</span>
          </div>
        </div>
      </div>

      {/* TOP STAT CARDS (4 COLUMNS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: TEMPERATURE */}
        <Card className={`p-4 ${cardClass}`}>
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            <div className="flex items-center gap-1.5">
              <Thermometer className="h-4 w-4 text-rose-500" />
              <span>Temperature</span>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-foreground mb-3 font-mono tracking-tight">
            26.8°C
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground flex-wrap">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] font-bold px-2 py-0">
              Optimal
            </Badge>
            <span>DHT22 Sensor — Zone A</span>
          </div>
        </Card>

        {/* CARD 2: HUMIDITY */}
        <Card className={`p-4 ${cardClass}`}>
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            <div className="flex items-center gap-1.5">
              <Droplets className="h-4 w-4 text-sky-400" />
              <span>Humidity</span>
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

        {/* CARD 3: ACTUATOR STATUS */}
        <Card className={`p-4 ${cardClass}`}>
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            <div className="flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-indigo-400" />
              <span>Actuator Status</span>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-foreground mb-3 font-mono tracking-tight">
            2/3 ON
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground flex-wrap">
            <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px] font-bold px-2 py-0">
              Fan + Fogger
            </Badge>
            <span>Auto threshold control</span>
          </div>
        </Card>

        {/* CARD 4: GROWTH CYCLE */}
        <Card className={`p-4 ${cardClass}`}>
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>Growth Cycle</span>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-foreground mb-3 font-mono tracking-tight">
            Day 42
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground flex-wrap">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-bold px-2 py-0">
              Fruiting Stage
            </Badge>
            <span>Oyster Mushroom Batch #12</span>
          </div>
        </Card>
      </div>

      {/* MIDDLE MAIN GRID: CHART & SYSTEM ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT CHART CARD (8 COLS) */}
        <Card className={`lg:col-span-8 flex flex-col justify-between ${cardClass}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Environmental Monitoring</CardTitle>
            <CardDescription className="text-xs">
              Real-time temperature, humidity, and fan activity from DHT22 sensor via ESP32 — today&apos;s 24-hour cycle.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 flex-1">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f87171" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
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
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    ticks={[0, 25, 50, 75, 100]}
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
                    dataKey="humidity"
                    name="Humidity (% RH)"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    fill="url(#humidityGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="temp"
                    name="Temperature (°C)"
                    stroke="#f87171"
                    strokeWidth={2}
                    fill="url(#tempGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="fan"
                    name="Fan Runtime (hrs)"
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
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span>Temperature (°C)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                <span>Humidity (% RH)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span>Fan Runtime (hrs)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT SYSTEM ACTIVITY FEED (4 COLS) */}
        <Card className={`lg:col-span-4 flex flex-col justify-between ${cardClass}`}>
          <CardHeader className="pb-3 flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-base font-bold">System Activity</CardTitle>
              <CardDescription className="text-xs mt-0.5">Latest greenhouse automation events.</CardDescription>
            </div>
            <Button variant="link" size="sm" className="h-auto p-0 text-emerald-500 text-xs font-bold hover:underline cursor-pointer">
              VIEW ALL
            </Button>
          </CardHeader>

          <CardContent className="space-y-4 flex-1">
            {/* Event 1 */}
            <div className="flex items-start gap-3 text-xs border-b border-border/40 pb-3">
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                MC
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">ESP32 Controller</span>
                  <span className="text-[10px] text-muted-foreground">12 min ago</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-snug">
                  Fan activated — temperature exceeded threshold at <span className="font-semibold text-emerald-400">28.5°C in Zone A</span>
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Badge variant="secondary" className="text-[9px] font-bold uppercase py-0 px-1.5 bg-muted text-muted-foreground border-0">
                    ACTUATOR: FAN — AUTO MODE
                  </Badge>
                  <Badge variant="outline" className="text-[9px] font-bold uppercase py-0 px-1.5 bg-rose-500/10 text-rose-400 border-rose-500/30">
                    THRESHOLD ALERT
                  </Badge>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="flex items-start gap-3 text-xs border-b border-border/40 pb-3">
              <div className="h-8 w-8 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                DH
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">DHT22 Sensor</span>
                  <span className="text-[10px] text-muted-foreground">45 min ago</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-snug">
                  Humidity dropped below 80% RH — fogger started in <span className="font-semibold text-sky-400">Zone B (78% RH)</span>
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Badge variant="secondary" className="text-[9px] font-bold uppercase py-0 px-1.5 bg-muted text-muted-foreground border-0">
                    ACTUATOR: FOGGER — AUTO MODE
                  </Badge>
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="flex items-start gap-3 text-xs">
              <div className="h-8 w-8 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                PHP
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">System Backend</span>
                  <span className="text-[10px] text-muted-foreground">1 hour ago</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-snug">
                  Batch data sync completed — 144 readings uploaded to <span className="font-semibold text-emerald-400">MySQL Database</span>
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Badge variant="secondary" className="text-[9px] font-bold uppercase py-0 px-1.5 bg-muted text-muted-foreground border-0">
                    BACKEND: PHP API — POST /APUREADINGS
                  </Badge>
                  <Badge variant="outline" className="text-[9px] font-bold uppercase py-0 px-1.5 bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                    DATA SYNC
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>

          <div className="p-4 pt-2 border-t border-border/40">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-semibold hover:bg-muted cursor-pointer flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Open System Logs</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* BOTTOM GRID (2 EQUAL COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* BOTTOM LEFT: WEEKLY SENSOR AVERAGES */}
        <Card className={`p-5 space-y-4 ${cardClass}`}>
          <div>
            <CardTitle className="text-base font-bold">Weekly Sensor Averages</CardTitle>
            <CardDescription className="text-xs mt-1">
              Average temperature, humidity, and fan runtime per growing week from DHT22 readings stored in MySQL.
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
                <Bar dataKey="temp" fill="#f87171" radius={[4, 4, 0, 0]} name="Temp (°C)" />
                <Bar dataKey="humidity" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Humidity (%)" />
                <Bar dataKey="fan" fill="#10b981" radius={[4, 4, 0, 0]} name="Fan (hrs)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* BOTTOM RIGHT: ACTUATOR USAGE */}
        <Card className={`p-5 space-y-4 ${cardClass}`}>
          <div>
            <CardTitle className="text-base font-bold">Actuator Usage</CardTitle>
            <CardDescription className="text-xs mt-1">
              Runtime distribution of fan, fogger, and sprinkler — controlled automatically by the ESP32.
            </CardDescription>
          </div>

          <div className="space-y-4 pt-1">
            {/* Actuator 1: Exhaust Fan */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-emerald-400" />
                  <span>Exhaust Fan</span>
                </div>
                <span className="font-mono text-muted-foreground">4.2 hrs/day (42%)</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: "42%" }} />
              </div>
            </div>

            {/* Actuator 2: Ultrasonic Fogger */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-sky-400" />
                  <span>Ultrasonic Fogger</span>
                </div>
                <span className="font-mono text-muted-foreground">2.8 hrs/day (28%)</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full transition-all duration-500" style={{ width: "28%" }} />
              </div>
            </div>

            {/* Actuator 3: Water Sprinkler */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span>Water Sprinkler</span>
                </div>
                <span className="font-mono text-muted-foreground">0.5 hrs/day (5%)</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: "5%" }} />
              </div>
            </div>

            {/* Summary stat badge */}
            <div className="p-3 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-between text-xs mt-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-emerald-400" />
                <span className="text-muted-foreground">Total Automation Runtime</span>
              </div>
              <span className="font-mono font-bold text-foreground">7.5 hrs/24h</span>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
