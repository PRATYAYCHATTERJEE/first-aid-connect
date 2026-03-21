import { Navbar } from "@/components/Navbar";
import { LiveMap } from "@/components/LiveMap";
import { useGeolocation } from "@/hooks/use-geolocation";
import { mockAlerts } from "@/lib/mock-data";
import { AlertCard } from "@/components/AlertCard";
import { useState } from "react";
import { Search, Crosshair, Layers } from "lucide-react";

const filters = ["All", "Medical", "Fire", "Accident", "Crime"] as const;

export default function MapPage() {
  const { location } = useGeolocation();
  const [filter, setFilter] = useState<string>("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = filter === "All" ? mockAlerts : mockAlerts.filter(a => a.type === filter);

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />
      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-72 shrink-0 border-r border-border bg-card overflow-y-auto p-4 space-y-4 hidden md:block">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Filter by Type</div>
            <div className="flex flex-wrap gap-1.5">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Active Alerts</div>
            <div className="space-y-2">
              {filtered.map(a => <AlertCard key={a.id} {...a} className="!bg-muted/50" />)}
            </div>
          </div>
        )}

        {/* Map */}
        <div className="flex-1 relative">
          {location && <LiveMap center={location} className="h-full w-full" />}

          {/* Top bar */}
          <div className="absolute top-4 left-4 right-4 z-[1000] flex gap-2">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="glass rounded-lg p-2.5 hidden md:block hover:bg-muted/50 transition-colors">
              <Layers className="h-4 w-4" />
            </button>
            <div className="glass flex-1 flex items-center gap-2 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Search location..." className="bg-transparent text-sm flex-1 outline-none placeholder:text-muted-foreground" />
            </div>
            <button className="glass rounded-lg px-3 py-2 flex items-center gap-1.5 text-xs font-medium hover:bg-muted/50 transition-colors">
              <Crosshair className="h-4 w-4" /> Center on Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
