import { Navbar } from "@/components/Navbar";
import { AlertCard } from "@/components/AlertCard";
import { SOSButton } from "@/components/SOSButton";
import { GlassCard } from "@/components/GlassCard";
import { TrustScoreBadge } from "@/components/TrustScoreBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { LiveMap } from "@/components/LiveMap";
import { useGeolocation } from "@/hooks/use-geolocation";
import { mockAlerts, mockResponders } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { location } = useGeolocation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display font-bold text-2xl mb-6"
        >
          Dashboard
        </motion.h1>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Left */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display font-semibold text-lg mb-3">Active Emergencies Nearby</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {mockAlerts.map((a, i) => (
                  <motion.div key={a.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}>
                    <AlertCard {...a} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-semibold text-lg">Live Map</h2>
                <Link to="/map" className="text-sm text-info hover:underline">Open Full Map →</Link>
              </div>
              <div className="rounded-lg overflow-hidden border border-border h-[350px]">
                {location && <LiveMap center={location} zoom={13} />}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <GlassCard className="flex flex-col items-center py-6 space-y-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Quick SOS</div>
              <SOSButton size="lg" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-success" /> Auto-SOS: ON
              </div>
            </GlassCard>

            <GlassCard className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-display font-bold text-sm">AK</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">Aditya Kumar</div>
                  <TrustScoreBadge score={87} showBar />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Available as Responder</span>
                <div className="h-5 w-9 rounded-full bg-success/30 flex items-center justify-end px-0.5">
                  <div className="h-4 w-4 rounded-full bg-success" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md bg-muted p-2">
                  <div className="font-display font-bold text-sm">14</div>
                  <div className="text-[10px] text-muted-foreground">Responses</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="font-display font-bold text-sm">13</div>
                  <div className="text-[10px] text-muted-foreground">Successful</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="font-display font-bold text-sm font-mono">3.2m</div>
                  <div className="text-[10px] text-muted-foreground">Avg Time</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nearby Responders</div>
              {mockResponders.slice(0, 3).map(r => (
                <div key={r.id} className="flex items-center justify-between text-xs py-1.5">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={r.status} />
                    <span className="font-medium">{r.name}</span>
                  </div>
                  <span className="text-muted-foreground font-mono">{r.distance}</span>
                </div>
              ))}
              <Link to="/responders" className="block text-xs text-info hover:underline text-center pt-1">See All Responders →</Link>
            </GlassCard>

            <GlassCard className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Risk Assessment</div>
              <div className="text-sm font-semibold">Asansol, West Bengal</div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-secondary font-medium">🟡 Medium</span>
                <span className="text-muted-foreground">2 active alerts nearby</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
