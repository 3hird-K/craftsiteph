"use client";

import { useState } from "react";
import { Flame, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MoveGoalCard({ className }: { className?: string }) {
  const [goalCalories, setGoalCalories] = useState(350);
  const [goalToast, setGoalToast] = useState<string | null>(null);

  const handleSetGoal = () => {
    setGoalToast(`Goal updated to ${goalCalories} CALORIES/DAY!`);
    setTimeout(() => setGoalToast(null), 3000);
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Move Goal
          </CardTitle>
          <CardDescription className="text-[11px] mt-0.5">
            Daily activity target.
          </CardDescription>
        </div>
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <Flame className="h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-4 py-1">
          <button
            type="button"
            onClick={() => setGoalCalories((prev) => Math.max(100, prev - 10))}
            className="h-8 w-8 rounded-xl border border-border/70 bg-background flex items-center justify-center text-foreground hover:bg-muted cursor-pointer transition shadow-xs"
            title="Decrease Goal"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>

          <div className="text-center min-w-[100px]">
            <div className="text-3xl font-black tracking-tight">{goalCalories}</div>
            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">
              CALORIES/DAY
            </div>
          </div>

          <button
            type="button"
            onClick={() => setGoalCalories((prev) => prev + 10)}
            className="h-8 w-8 rounded-xl border border-border/70 bg-background flex items-center justify-center text-foreground hover:bg-muted cursor-pointer transition shadow-xs"
            title="Increase Goal"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-end justify-between gap-1.5 h-16">
          {[40, 60, 30, 80, 100, 70, 90, 50, 85, 65].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-lg transition-all duration-300"
              style={{
                height: `${h}%`,
                backgroundColor: i === 4 ? "var(--primary)" : "var(--muted)",
              }}
            />
          ))}
        </div>

        {goalToast ? (
          <div className="text-xs font-semibold text-emerald-500 text-center animate-in fade-in">
            {goalToast}
          </div>
        ) : null}
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleSetGoal}
          className="w-full font-bold shadow-md shadow-primary/20 cursor-pointer bg-primary text-primary-foreground rounded-xl py-5 hover:opacity-95"
        >
          Set Goal
        </Button>
      </CardFooter>
    </Card>
  );
}
