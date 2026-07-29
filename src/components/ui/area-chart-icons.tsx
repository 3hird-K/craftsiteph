"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const areaChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const areaChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
    icon: TrendingUp,
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
    icon: TrendingDown,
  },
} satisfies ChartConfig;

export function ChartAreaIcons({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base font-bold">Area Chart - Icons</CardTitle>
        <CardDescription className="text-xs">
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={areaChartConfig}>
          <AreaChart
            accessibilityLayer
            data={areaChartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--primary)"
              fillOpacity={0.2}
              stroke="var(--primary)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--primary)"
              fillOpacity={0.5}
              stroke="var(--primary)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-xs">
          <div className="grid gap-1">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-500">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground text-[11px]">
              January - June 2026
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
