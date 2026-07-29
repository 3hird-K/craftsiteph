"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function UpgradeSubscriptionCard({ className }: { className?: string }) {
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [upgradeName, setUpgradeName] = useState("Evil Rabbit");
  const [upgradeEmail, setUpgradeEmail] = useState("example@acme.com");
  const [upgradeMsg, setUpgradeMsg] = useState<string | null>(null);

  const handleUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    setUpgradeMsg(`Upgraded ${upgradeName} to ${selectedPlan.toUpperCase()} plan!`);
    setTimeout(() => setUpgradeMsg(null), 3000);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base font-bold">Upgrade subscription</CardTitle>
        <CardDescription className="text-xs leading-relaxed">
          You are currently on the free plan. Upgrade to pro for unlimited features.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleUpgrade}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Name</label>
              <Input
                value={upgradeName}
                onChange={(e) => setUpgradeName(e.target.value)}
                className="h-9 text-xs rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Email</label>
              <Input
                value={upgradeEmail}
                onChange={(e) => setUpgradeEmail(e.target.value)}
                className="h-9 text-xs rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedPlan("starter")}
              className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedPlan === "starter"
                  ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/40 shadow-xs"
                  : "border-border/60 bg-background/50 text-muted-foreground hover:border-primary/50"
              }`}
            >
              <div className="text-xs font-bold">Starter Plan</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Small projects.</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPlan("pro")}
              className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedPlan === "pro"
                  ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/40 shadow-xs"
                  : "border-border/60 bg-background/50 text-muted-foreground hover:border-primary/50"
              }`}
            >
              <div className="text-xs font-bold">Pro Plan</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">More features.</div>
            </button>
          </div>

          {upgradeMsg ? (
            <div className="text-xs font-semibold text-emerald-500 text-center animate-in fade-in">
              {upgradeMsg}
            </div>
          ) : null}
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full font-bold shadow-md shadow-primary/20 cursor-pointer bg-primary text-primary-foreground rounded-xl py-5 hover:opacity-95"
          >
            Upgrade Plan
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
