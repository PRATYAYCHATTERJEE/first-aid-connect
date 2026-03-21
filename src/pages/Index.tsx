import { useGeolocation } from "@/hooks/use-geolocation";
import { LiveMap } from "@/components/LiveMap";
import { GlassCard } from "@/components/GlassCard";
import { mockResponders, mockAlerts } from "@/lib/mock-data";
import { Shield, MapPin, Users, AlertTriangle, Heart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const duration = 1500;
    const steps = 40;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.round((num / steps) * step * 10) / 10);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, target]);

  const num = parseFloat(target.replace(/[^0-9.]/g, ""));
  const prefix = target.match(/^[^0-9]*/)?.[0] || "";
  const postfix = target.match(/[^0-9.]*$/)?.[0] || "";

  return <span ref={ref}>{visible ? `${prefix}${count >= num ? target.replace(/^[^0-9]*/, "").replace(/[^0-9.+%]*$/, "") : count}${postfix}${suffix}` : "0"}</span>;
}

const steps = [
  { emoji: "🔴", title: "Tap SOS", desc: "Your GPS location is shared instantly with nearby responders" },
  { emoji: "📡", title: "We Match", desc: "Our algorithm finds the best nearby responder based on type, distance, and trust" },
  { emoji: "🚑", title: "Help Arrives", desc: "Real-time tracking until you're safe and the situation is resolved" },
];

const features = [
  { icon: AlertTriangle, title: "Smart SOS Button", desc: "One tap emergency trigger sends your exact location and alert type" },
  { icon: MapPin, title: "Live Location Sharing", desc: "Real-time GPS tracking visible to assigned responders" },
  { icon: Heart, title: "Intelligent Matching", desc: "Emergency type + distance + trust scoring for optimal dispatch" },
  { icon: Shield, title: "Real-Time Map", desc: "See all responders and danger zones on a live dark-theme map" },
  { icon: AlertTriangle, title: "Auto SOS", desc: "Accelerometer detects accidents and triggers alerts automatically" },
  { icon: Users, title: "Trust Score System", desc: "Reliable responders earn higher trust and get priority assignments" },
];

const testimonials = [
  { name: "Riya S.", location: "Mumbai", quote: "I've helped 20+ people through ResQLink. The matching system is incredibly fast — I get alerts for emergencies I'm actually equipped to handle." },
  { name: "Dr. Arjun K.", location: "Delhi", quote: "As a paramedic, this app changed how I respond. I see exactly where the emergency is and what's needed before I arrive." },
  { name: "Neha T.", location: "Pune", quote: "I sent an SOS when my car broke down at night. Within 4 minutes, two volunteers reached me. I felt safe knowing help was on the way." },
];

export default function LandingPage() {
  const { location, loading } = useGeolocation();
  const navigate = useNavigate();
  const activeAlerts = mockAlerts.filter(a => a.status !== "Resolved");
  const availableResponders = mockResponders.filter(r => r.status === "Available");

  return (
    <div className="bg-background">
      {/* === SECTION A: MAP HERO === */}
      <section className="relative h-screen w-full overflow-hidden">
        {location && <LiveMap center={location} className="h-full w-full" />}
        {loading && (
          <div className="flex h-full items-center justify-center">
            <div className="pulse-blue h-8 w-8" />
          </div>
        )}

        {/* Top-left: Logo */}
        <div className="absolute top-4 left-4 z-[1000]">
          <GlassCard className="flex items-center gap-2 px-4 py-2">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <div className="font-display font-bold text-sm">ResQLink</div>
              <div className="text-[10px] text-muted-foreground">Emergency Response Network</div>
            </div>
          </GlassCard>
        </div>

        {/* Top-center: Status bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] hidden md:block">
          <GlassCard className="flex items-center gap-4 px-5 py-2 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success animate-pulse" /> LIVE</span>
            <span className="text-border">|</span>
            <span className="text-muted-foreground">📍 {loading ? "Detecting location..." : "Location detected"}</span>
            <span className="text-border">|</span>
            <span className="text-muted-foreground">👥 {availableResponders.length} Responders nearby</span>
            <span className="text-border">|</span>
            <span className="text-muted-foreground">🚨 {activeAlerts.length} Active alerts</span>
          </GlassCard>
        </div>

        {/* Top-right: Actions */}
        <div className="absolute top-4 right-4 z-[1000] flex items-center gap-2">
          <button
            onClick={() => navigate("/sos")}
            className="sos-pulse rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-transform active:scale-95 hover:brightness-110"
          >
            🚨 SEND SOS
          </button>
          <Link to="/login" className="hidden md:inline-flex rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 glass">
            Login
          </Link>
        </div>

        {/* Bottom-left: Legend */}
        <div className="absolute bottom-4 left-4 z-[1000] hidden md:block">
          <GlassCard className="space-y-2 text-xs px-4 py-3">
            <div className="flex items-center gap-2"><div className="pulse-blue h-3 w-3 !shadow-none" style={{ animationDuration: "0s" }} /> Your Location</div>
            <div className="flex items-center gap-2"><div className="dot-green h-3 w-3" /> Responders ({availableResponders.length})</div>
            <div className="flex items-center gap-2"><div className="pulse-red h-3 w-3 !shadow-none" style={{ animationDuration: "0s" }} /> Active SOS ({activeAlerts.length})</div>
            <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-primary/30 border border-primary/50" /> Danger Zones</div>
          </GlassCard>
        </div>

        {/* Bottom-center: CTA */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-2rem)] max-w-xl"
        >
          <GlassCard className="text-center space-y-3 px-6 py-5">
            <h1 className="font-display font-bold text-xl md:text-2xl leading-tight">Emergency Help. One Tap Away.</h1>
            <p className="text-sm text-muted-foreground">ResQLink connects you to nearby volunteers, medical help, and authorities — instantly and intelligently.</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => navigate("/sos")} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform active:scale-95 hover:brightness-110">
                🚨 Send SOS Now
              </button>
              <Link to="/responders" className="rounded-lg border border-success/40 px-5 py-2.5 text-sm font-medium text-success transition-colors hover:bg-success/10">
                Become a Responder
              </Link>
            </div>
          </GlassCard>
        </motion.div>

        {/* Bottom-right: Responder mini-list */}
        <div className="absolute bottom-4 right-4 z-[1000] hidden lg:block w-64">
          <GlassCard className="space-y-2 px-4 py-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nearby Responders</div>
            <div className="space-y-2">
              {mockResponders.slice(0, 3).map(r => (
                <div key={r.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${r.status === "Available" ? "bg-success" : "bg-primary"}`} />
                    <span className="font-medium">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground font-mono">
                    <span>{r.distance}</span>
                    <span>⭐{r.trust}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/responders" className="block text-xs text-info hover:underline text-center pt-1">See All →</Link>
          </GlassCard>
        </div>
      </section>

      {/* === SECTION B: BELOW THE MAP === */}
      <div className="mx-auto max-w-6xl px-4">
        {/* Stats Bar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="my-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "12,400+", label: "Lives Assisted" },
            { value: "3", label: "Avg Response Time", suffix: " min" },
            { value: "98.7%", label: "Alert Accuracy" },
            { value: "500+", label: "Active Responders" },
          ].map((s, i) => (
            <div key={i} className="rounded-lg border-l-2 border-primary bg-card p-5">
              <div className="font-display font-bold text-2xl md:text-3xl">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="font-display font-bold text-3xl text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-lg bg-card border border-border p-6 text-center space-y-3"
              >
                <div className="text-4xl">{s.emoji}</div>
                <div className="font-display font-bold text-lg">{s.title}</div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="font-display font-bold text-3xl text-center mb-10">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-lg bg-card border border-border p-5 space-y-2 transition-shadow duration-300 hover:shadow-[0_0_20px_hsla(0,100%,59%,0.15)]"
              >
                <f.icon className="h-6 w-6 text-primary" />
                <div className="font-display font-semibold">{f.title}</div>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="font-display font-bold text-3xl text-center mb-10">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-lg bg-card border border-border p-6 space-y-3"
              >
                <p className="text-sm text-muted-foreground italic">"{t.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">ResQLink</span>
            <span className="text-xs text-muted-foreground">Emergency Response Network</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <Link to="/responders" className="hover:text-foreground transition-colors">Responders</Link>
          </div>
          <div className="text-xs text-muted-foreground">© 2026 ResQLink. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
