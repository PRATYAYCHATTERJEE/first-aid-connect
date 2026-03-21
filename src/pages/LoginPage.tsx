import { useState } from "react";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"help" | "responder">("help");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left - branding */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-card border-r border-border p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 50%, hsla(0,100%,59%,0.15), transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center space-y-4">
          <Shield className="h-16 w-16 text-primary mx-auto" />
          <h1 className="font-display font-bold text-4xl">ResQLink</h1>
          <p className="text-muted-foreground max-w-sm">Emergency Response Network — connecting people in crisis to nearby help, instantly.</p>
        </motion.div>
      </div>

      {/* Right - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-xl">ResQLink</span>
          </div>

          {/* Tabs */}
          <div className="flex rounded-lg bg-muted p-1">
            <button onClick={() => setTab("login")} className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${tab === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>Login</button>
            <button onClick={() => setTab("register")} className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${tab === "register" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>Register</button>
          </div>

          {tab === "login" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input type="email" placeholder="you@example.com" className="w-full rounded-lg border border-border bg-card p-3 text-sm outline-none focus:border-primary/50 placeholder:text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-border bg-card p-3 text-sm outline-none focus:border-primary/50 placeholder:text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded border-border" /> Remember me
                </label>
                <a href="#" className="text-primary hover:underline">Forgot password?</a>
              </div>
              <button className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]">Login</button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or</span></div>
              </div>
              <button className="w-full rounded-lg border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]">
                Continue with Google
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input placeholder="Your name" className="w-full rounded-lg border border-border bg-card p-3 text-sm outline-none focus:border-primary/50 placeholder:text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input type="email" placeholder="you@example.com" className="w-full rounded-lg border border-border bg-card p-3 text-sm outline-none focus:border-primary/50 placeholder:text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-border bg-card p-3 text-sm outline-none focus:border-primary/50 placeholder:text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">I want to...</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setRole("help")} className={`rounded-lg border p-3 text-sm font-medium transition-all active:scale-95 ${role === "help" ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
                    🆘 Get Help
                  </button>
                  <button onClick={() => setRole("responder")} className={`rounded-lg border p-3 text-sm font-medium transition-all active:scale-95 ${role === "responder" ? "border-success bg-success/15 text-success" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
                    🟢 Be a Responder
                  </button>
                </div>
              </div>
              {role === "responder" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {["First Aid", "CPR", "Emergency Medicine", "Search & Rescue", "Law Enforcement"].map(s => (
                      <label key={s} className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                        <input type="checkbox" className="rounded border-border h-3 w-3" /> {s}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <button className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]">Create Account</button>
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground">
            <Link to="/" className="text-info hover:underline">← Back to home</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
