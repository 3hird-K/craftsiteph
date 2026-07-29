"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export function FormControlsSuite({ className }: { className?: string }) {
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [sliderVal, setSliderVal] = useState([70]);
  const [otpVal, setOtpVal] = useState("123456");

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base font-bold">Form Controls Suite</CardTitle>
        <CardDescription className="text-xs">
          Interactive Switch, Slider, Checkbox & Input OTP controls.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold">Notifications</div>
                <div className="text-[11px] text-muted-foreground">Receive real-time alerts.</div>
              </div>
              <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
            </div>

            <Separator />

            <div className="flex items-center gap-2.5">
              <Checkbox id="terms-suite" checked={checkboxChecked} onCheckedChange={(v) => setCheckboxChecked(!!v)} />
              <label htmlFor="terms-suite" className="text-xs font-medium cursor-pointer">
                Accept terms and conditions
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Volume Level</span>
                <span className="font-mono text-primary">{sliderVal[0]}%</span>
              </div>
              <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="text-xs font-semibold">Security PIN (Input OTP)</div>
              <InputOTP maxLength={6} value={otpVal} onChange={setOtpVal}>
                <InputOTPGroup className="gap-1.5">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
