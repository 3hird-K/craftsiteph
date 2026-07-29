"use client";

import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function FeedbackAvatarsCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base font-bold">Feedback & Avatars</CardTitle>
        <CardDescription className="text-xs">Alert, Progress & Avatars.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-primary/30 bg-primary/5 text-xs">
          <Terminal className="h-4 w-4 text-primary" />
          <AlertTitle className="font-bold text-primary">System Notification</AlertTitle>
          <AlertDescription className="text-muted-foreground text-[11px]">
            Custom styles live across Theme Studio.
          </AlertDescription>
        </Alert>

        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 ring-2 ring-primary/40">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback className="font-bold">CN</AvatarFallback>
          </Avatar>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">PH</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <div className="text-xs font-bold">Craftsite User</div>
            <div className="text-[10px] text-muted-foreground font-mono">Pro Developer</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>Sync Status</span>
            <span className="font-mono text-primary">85%</span>
          </div>
          <Progress value={85} />
        </div>
      </CardContent>
    </Card>
  );
}
