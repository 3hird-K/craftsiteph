import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";

type AuthView = "signIn" | "signUp1" | "signUp2" | "resetPassword";

export function CraftsiteAuthLayout({ shadowClass = "shadow-2xl" }: { shadowClass?: string }) {
  const [view, setView] = useState<AuthView>("signIn");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Reusable Image Panel Component
  const ImagePanel = ({ className = "" }: { className?: string }) => (
    <div className={`hidden lg:block lg:w-1/2 relative bg-muted/20 ${className}`}>
      {/* Placeholder for the studio image */}
      <img 
        src="/auth-bg.png" 
        alt="Office Building" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );

  // Reusable Logo Component
  const Logo = () => (
    <div className="flex flex-col items-center justify-center gap-1 mb-4">
      <img src="/logo.png" alt="Craftsite" className="h-48 -my-10 object-contain" />
    </div>
  );

  return (
    <div className={`w-full max-w-5xl mx-auto min-h-[450px] lg:min-h-[550px] rounded-xl border border-border/70 bg-background overflow-hidden ${shadowClass} flex relative transition-all duration-300`}>
      
      {/* SIGN IN VIEW */}
      {view === "signIn" && (
        <>
          <ImagePanel />
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 relative animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="w-[95%] max-w-[600px] space-y-5">
              <Logo />
              
              <div className="text-center space-y-1.5 mb-6">
                <h1 className="text-xl font-bold text-foreground">Sign In</h1>
                <p className="text-xs text-muted-foreground">
                  Sign in to access the ultimate theme builder and component studio.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-foreground">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="example@craftsite.ph" 
                    className={`h-10 bg-transparent border border-border/70 focus-visible:ring-1 focus-visible:ring-primary rounded-md ${shadowClass} px-4`}
                  />
                </div>
                
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-foreground">Password</label>
                    <button onClick={() => setView("resetPassword")} className="text-[10px] font-bold text-primary hover:underline transition-all">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      className={`h-10 bg-transparent border border-border/70 focus-visible:ring-1 focus-visible:ring-primary rounded-md ${shadowClass} px-4 pr-10`}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <Button className="w-full h-10 text-xs font-bold shadow-sm rounded-md border border-transparent transition-all hover:opacity-90 mt-2">
                  Sign In
                </Button>
              </div>
              
              <p className="text-center text-[11px] text-muted-foreground font-medium mt-4">
                Don't have an account?{" "}
                <button onClick={() => setView("signUp1")} className="font-bold text-primary hover:underline transition-all">
                  Create an account
                </button>
              </p>
            </div>
          </div>
        </>
      )}

      {/* CREATE ACCOUNT STEP 1 */}
      {view === "signUp1" && (
        <>
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 relative animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="w-[95%] max-w-[600px] space-y-5">
              <Logo />
              
              <div className="text-center space-y-1.5 mb-4">
                <h1 className="text-xl font-bold text-foreground">Create Account</h1>
                <p className="text-xs text-muted-foreground">
                  Register to access the Craftsite Studio
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-foreground">First Name</label>
                    <Input 
                      type="text" 
                      placeholder="Juan" 
                      className={`h-10 bg-transparent border border-border/70 focus-visible:ring-1 focus-visible:ring-primary rounded-md ${shadowClass} px-4`}
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-foreground">Last Name</label>
                    <Input 
                      type="text" 
                      placeholder="Dela Cruz" 
                      className={`h-10 bg-transparent border border-border/70 focus-visible:ring-1 focus-visible:ring-primary rounded-md ${shadowClass} px-4`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-foreground">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="example@craftsite.ph" 
                    className={`h-10 bg-transparent border border-border/70 focus-visible:ring-1 focus-visible:ring-primary rounded-md ${shadowClass} px-4`}
                  />
                </div>
                
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-foreground">Password</label>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Create a password" 
                      className={`h-10 bg-transparent border border-border/70 focus-visible:ring-1 focus-visible:ring-primary rounded-md ${shadowClass} px-4 pr-10`}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <Button className="w-full h-10 text-xs font-bold shadow-sm rounded-md border border-transparent transition-all hover:opacity-90 mt-2">
                  Create Account
                </Button>
              </div>
              
              <p className="text-center text-[11px] text-muted-foreground font-medium mt-4">
                Already have an account?{" "}
                <button onClick={() => setView("signIn")} className="font-bold text-primary hover:underline transition-all">
                  Sign in
                </button>
              </p>
            </div>
          </div>
          <ImagePanel className="rounded-l-xl overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-10" />
        </>
      )}



      {/* RESET PASSWORD VIEW */}
      {view === "resetPassword" && (
        <div className="w-full flex items-center justify-center p-6 sm:p-8 relative bg-background animate-in fade-in zoom-in-95 duration-500">
          <div className="w-[95%] max-w-[600px] flex flex-col items-center">
            <Logo />
            
            <div className="text-center space-y-2 mb-6 max-w-[280px]">
              <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Type in your email and we'll send you a link to reset your password.
              </p>
            </div>

            <div className="w-full space-y-5">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-foreground">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="example@craftsite.ph" 
                  className={`h-10 bg-transparent border border-border/70 focus-visible:ring-1 focus-visible:ring-primary rounded-md ${shadowClass} px-4`}
                />
              </div>

              <Button className="w-full h-10 text-xs font-bold shadow-sm rounded-md border border-transparent transition-all hover:opacity-90">
                Send reset email
              </Button>
              
              <div className="flex justify-center mt-4">
                <button onClick={() => setView("signIn")} className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline transition-all">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
