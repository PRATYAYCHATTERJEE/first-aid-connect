import { Navbar } from "@/components/Navbar";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { mockAlerts, mockResponders, mockDangerZones } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Medical", value: 35, color: "hsl(220,100%,58%)" },
  { name: "Fire", value: 20, color: "hsl(24,100%,50%)" },
  { name: "Accident", value: 28, color: "hsl(24,100%,50%)" },
  { name: "Crime", value: 17, color: "hsl(0,100%,59%)" },
];

const lineData = [
  { day: "Mon", alerts: 3 }, { day: "Tue", alerts: 7 }, { day: "Wed", alerts: 5 },
  { day: "Thu", alerts: 8 }, { day: "Fri", alerts: 4 }, { day: "Sat", alerts: 6 }, { day: "Sun", alerts: 2 },
];

const barData = [
  { range: "<2min", count: 12 }, { range: "2-5min", count: 18 },
  { range: "5-10min", count: 8 }, { range: ">10min", count: 3 },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-2xl mb-6">
          Admin Panel
        </motion.h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { value: "24", label: "Active Alerts", color: "text-primary" },
            { value: "20", label: "Resolved Today", color: "text-success" },
            { value: "2", label: "False Alerts", color: "text-secondary" },
            { value: "47", label: "Responders Online", color: "text-info" },
          ].map((s, i) => (
            <GlassCard key={i}>
              <div className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Alert Management */}
        <GlassCard className="mb-6 space-y-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Alert Management</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left py-2 font-medium">ID</th>
                  <th className="text-left py-2 font-medium">Type</th>
                  <th className="text-left py-2 font-medium">Location</th>
                  <th className="text-left py-2 font-medium">Time</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockAlerts.map(a => (
                  <tr key={a.id} className="border-b border-border/50">
                    <td className="py-2.5 font-mono text-xs">ALT-{String(a.id).padStart(4, "0")}</td>
                    <td className="py-2.5">{a.type}</td>
                    <td className="py-2.5 font-mono text-xs">{a.lat.toFixed(4)}, {a.lng.toFixed(4)}</td>
                    <td className="py-2.5 text-muted-foreground">{a.time}</td>
                    <td className="py-2.5"><StatusBadge status={a.status} /></td>
                    <td className="py-2.5 flex gap-1.5">
                      <button className="rounded px-2 py-1 text-xs bg-success/20 text-success hover:bg-success/30 transition-colors">Resolve</button>
                      <button className="rounded px-2 py-1 text-xs bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors">Flag</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Danger Zone Manager */}
        <GlassCard className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Danger Zones</div>
            <button className="rounded-md bg-primary/20 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/30 transition-colors">+ Add Zone</button>
          </div>
          {mockDangerZones.map(z => (
            <div key={z.id} className="flex items-center justify-between rounded-md bg-muted/50 p-3">
              <div>
                <div className="text-sm font-semibold">{z.label}</div>
                <div className="text-xs text-muted-foreground font-mono">{z.lat}, {z.lng} · {z.radius}m radius</div>
              </div>
              <button className="rounded px-2 py-1 text-xs bg-primary/20 text-primary hover:bg-primary/30 transition-colors">Deactivate</button>
            </div>
          ))}
        </GlassCard>

        {/* Analytics */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <GlassCard className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Alerts by Type</div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={70} strokeWidth={0}>
                  {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(240,25%,9%)", border: "1px solid hsl(240,20%,20%)", borderRadius: 8, color: "hsl(0,0%,94%)" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2">
              {pieData.map(d => (
                <span key={d.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />{d.name}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Alerts (Last 7 Days)</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <XAxis dataKey="day" tick={{ fill: "hsl(240,15%,60%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(240,15%,60%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(240,25%,9%)", border: "1px solid hsl(240,20%,20%)", borderRadius: 8, color: "hsl(0,0%,94%)" }} />
                <Line type="monotone" dataKey="alerts" stroke="hsl(0,100%,59%)" strokeWidth={2} dot={{ fill: "hsl(0,100%,59%)", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Response Time Distribution</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="range" tick={{ fill: "hsl(240,15%,60%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(240,15%,60%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(240,25%,9%)", border: "1px solid hsl(240,20%,20%)", borderRadius: 8, color: "hsl(0,0%,94%)" }} />
                <Bar dataKey="count" fill="hsl(220,100%,58%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Responder Management */}
        <GlassCard className="space-y-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Responder Management</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left py-2 font-medium">Name</th>
                  <th className="text-left py-2 font-medium">Type</th>
                  <th className="text-left py-2 font-medium">Trust</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockResponders.map(r => (
                  <tr key={r.id} className="border-b border-border/50">
                    <td className="py-2.5 font-medium">{r.name}</td>
                    <td className="py-2.5 text-muted-foreground">{r.type}</td>
                    <td className="py-2.5 font-mono">⭐ {r.trust}</td>
                    <td className="py-2.5"><StatusBadge status={r.status} /></td>
                    <td className="py-2.5 flex gap-1.5">
                      <button className="rounded px-2 py-1 text-xs bg-success/20 text-success hover:bg-success/30 transition-colors">Verify</button>
                      <button className="rounded px-2 py-1 text-xs bg-primary/20 text-primary hover:bg-primary/30 transition-colors">Suspend</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
