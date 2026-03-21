import { Navbar } from "@/components/Navbar";
import { TrustScoreBadge } from "@/components/TrustScoreBadge";
import { GlassCard } from "@/components/GlassCard";
import { motion } from "framer-motion";

const history = [
  { date: "Mar 18, 2026", type: "Medical", role: "Responder", status: "Resolved", change: "+5" },
  { date: "Mar 15, 2026", type: "Accident", role: "Responder", status: "Resolved", change: "+4" },
  { date: "Mar 10, 2026", type: "Fire", role: "Responder", status: "Resolved", change: "+3" },
  { date: "Feb 28, 2026", type: "Crime", role: "Reporter", status: "Resolved", change: "+2" },
  { date: "Feb 20, 2026", type: "Medical", role: "Responder", status: "False Alert", change: "-5" },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Header */}
          <GlassCard className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary font-display font-bold text-2xl">AK</div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="font-display font-bold text-2xl">Aditya Kumar</h1>
              <p className="text-sm text-muted-foreground">📍 Asansol, West Bengal · Member since Jan 2025</p>
            </div>
            <button className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 active:scale-95">Edit Profile</button>
          </GlassCard>

          {/* Trust Score */}
          <GlassCard className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Trust Score</div>
            <div className="flex items-center gap-4">
              <div className="font-display font-bold text-4xl">87<span className="text-lg text-muted-foreground">/100</span></div>
              <div className="flex-1">
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "87%" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="h-full rounded-full bg-success" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <span className="text-success">+52 responses</span>
              <span className="text-info">+20 speed bonus</span>
              <span className="text-primary">-5 false alerts</span>
            </div>
          </GlassCard>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: "2", label: "SOSes Sent" },
              { value: "14", label: "Responses Given" },
              { value: "3.2 min", label: "Avg Response Time" },
              { value: "3", label: "Communities Helped" },
            ].map((s, i) => (
              <GlassCard key={i} className="text-center">
                <div className="font-display font-bold text-xl">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </GlassCard>
            ))}
          </div>

          {/* History */}
          <GlassCard className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Response History</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="text-left py-2 font-medium">Date</th>
                    <th className="text-left py-2 font-medium">Type</th>
                    <th className="text-left py-2 font-medium">Role</th>
                    <th className="text-left py-2 font-medium">Status</th>
                    <th className="text-right py-2 font-medium">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2.5 font-mono text-xs">{h.date}</td>
                      <td className="py-2.5">{h.type}</td>
                      <td className="py-2.5 text-muted-foreground">{h.role}</td>
                      <td className="py-2.5">
                        <span className={`rounded-full px-2 py-0.5 text-xs ${h.status === "Resolved" ? "bg-success/20 text-success" : "bg-primary/20 text-primary"}`}>
                          {h.status}
                        </span>
                      </td>
                      <td className={`py-2.5 text-right font-mono font-semibold ${h.change.startsWith("+") ? "text-success" : "text-primary"}`}>{h.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>

          {/* Settings */}
          <GlassCard className="space-y-4">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Settings</div>
            {["Auto-SOS Detection", "Share Location with Responders", "Push Notifications"].map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm">{s}</span>
                <div className="h-5 w-9 rounded-full bg-success/30 flex items-center justify-end px-0.5 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-success transition-transform" />
                </div>
              </div>
            ))}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
