import { Navbar } from "@/components/Navbar";
import { useGeolocation } from "@/hooks/use-geolocation";
import { LiveMap } from "@/components/LiveMap";
import { GlassCard } from "@/components/GlassCard";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Check } from "lucide-react";
import { alertTypeEmoji, type AlertType } from "@/lib/mock-data";

const emergencyTypes: { type: AlertType; label: string }[] = [
  { type: "Medical", label: "Medical" },
  { type: "Fire", label: "Fire" },
  { type: "Accident", label: "Accident" },
  { type: "Crime", label: "Crime" },
  { type: "Other", label: "Other" },
];

export default function SOSPage() {
  const { location } = useGeolocation();
  const [sent, setSent] = useState(false);
  const [selectedType, setSelectedType] = useState<AlertType | null>(null);
  const [description, setDescription] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-lg px-4 py-10">
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="pre" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-6 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/15">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <h1 className="font-display font-bold text-3xl">Are you in an emergency?</h1>
              <p className="text-muted-foreground">Select the type of emergency and we'll connect you with the nearest responders.</p>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {emergencyTypes.map(e => (
                  <button
                    key={e.type}
                    onClick={() => setSelectedType(e.type)}
                    className={`rounded-lg border p-3 text-center transition-all active:scale-95 ${
                      selectedType === e.type
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    <div className="text-2xl">{alertTypeEmoji[e.type]}</div>
                    <div className="text-xs mt-1 font-medium">{e.label}</div>
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Optional: describe your emergency..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full rounded-lg border border-border bg-card p-3 text-sm placeholder:text-muted-foreground outline-none focus:border-primary/50 resize-none h-20"
              />

              <div className="text-sm text-muted-foreground">
                📍 Location detected: <span className="text-foreground font-mono">
                  {location ? `${location[0].toFixed(4)}, ${location[1].toFixed(4)}` : "Detecting..."}
                </span>
              </div>

              <button
                onClick={() => selectedType && setSent(true)}
                disabled={!selectedType}
                className="w-full sos-pulse rounded-lg bg-primary py-4 text-lg font-display font-bold text-primary-foreground transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:animate-none hover:brightness-110"
              >
                🚨 SEND SOS NOW
              </button>
            </motion.div>
          ) : (
            <motion.div key="post" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-success/15">
                <Check className="h-12 w-12 text-success" />
              </div>
              <h1 className="font-display font-bold text-3xl text-success">Alert Sent!</h1>
              <p className="text-muted-foreground">Help is on the way. 3 responders have been notified.</p>

              <GlassCard className="text-left space-y-2">
                <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Estimated Arrival</div>
                <div className="font-display font-bold text-xl">Nearest: 1.2 km — Est. 4 min</div>
              </GlassCard>

              <div className="rounded-lg overflow-hidden border border-border h-[250px]">
                {location && <LiveMap center={location} zoom={15} />}
              </div>

              <button
                onClick={() => setSent(false)}
                className="w-full rounded-lg border border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]"
              >
                Cancel SOS
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
