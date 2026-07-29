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
import { Separator } from "@/components/ui/separator";

export function CreateAccountCard({ className }: { className?: string }) {
  const [authEmail, setAuthEmail] = useState("m@example.com");
  const [authPassword, setAuthPassword] = useState("••••••••");
  const [authMsg, setAuthMsg] = useState<string | null>(null);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMsg(`Account created for ${authEmail}!`);
    setTimeout(() => setAuthMsg(null), 3000);
  };

  return (
    <form onSubmit={handleAuthSubmit} className={className}>
      <Card className="h-full gap-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-bold">Create an account</CardTitle>
          <CardDescription className="text-xs">Enter details to get started.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 pb-0">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setAuthMsg("Signed in with GitHub!");
                setTimeout(() => setAuthMsg(null), 3000);
              }}
              className="h-9 text-xs font-semibold rounded-xl cursor-pointer"
            >
              GitHub
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setAuthMsg("Signed in with Google!");
                setTimeout(() => setAuthMsg(null), 3000);
              }}
              className="h-9 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Google
            </Button>
          </div>

          <div className="relative flex items-center justify-center my-2">
            <Separator />
            <span className="absolute bg-card px-2 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
              OR CONTINUE WITH
            </span>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Email</label>
              <Input
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="m@example.com"
                className="h-9 text-xs rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">Password</label>
              <Input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="h-9 text-xs rounded-xl"
              />
            </div>
          </div>

          {authMsg ? (
            <div className="text-xs font-semibold text-emerald-500 text-center animate-in fade-in pt-1">
              {authMsg}
            </div>
          ) : null}
        </CardContent>

        <CardFooter className="pt-1 pb-5">
          <Button
            type="submit"
            className="w-full font-bold shadow-md shadow-primary/20 cursor-pointer bg-primary text-primary-foreground rounded-xl h-10 hover:opacity-95 text-xs"
          >
            Create account
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
