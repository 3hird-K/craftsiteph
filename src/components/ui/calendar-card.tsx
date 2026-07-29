"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CalendarCard({ className }: { className?: string }) {
  const today = new Date();
  const defaultTo = new Date();
  defaultTo.setDate(today.getDate() + 5);

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: today,
    to: defaultTo,
  });

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold">Schedule Calendar</CardTitle>
        <CardDescription className="text-xs">
          Select date or range with today's date highlighted.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center p-2">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          captionLayout="dropdown"
          startMonth={new Date(2015, 0)}
          endMonth={new Date(2035, 11)}
          className="rounded-2xl border border-border/50 shadow-xs"
        />
      </CardContent>
    </Card>
  );
}
