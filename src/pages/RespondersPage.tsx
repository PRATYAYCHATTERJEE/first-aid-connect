import { Navbar } from "@/components/Navbar";
import { ResponderCard } from "@/components/ResponderCard";
import { mockResponders } from "@/lib/mock-data";
import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["All", "Volunteers", "Medical", "Authorities"] as const;
const typeMap = { Volunteers: "Volunteer", Medical: "Medical", Authorities: "Authority" } as const;

export default function RespondersPage() {
  const [tab, setTab] = useState<string>("All");
  const [sort, setSort] = useState<"distance" | "trust">("distance");

  const filtered = tab === "All" ? mockResponders : mockResponders.filter(r => r.type === typeMap[tab as keyof typeof typeMap]);
  const sorted = [...filtered].sort((a, b) => sort === "trust" ? b.trust - a.trust : parseFloat(a.distance) - parseFloat(b.distance));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="font-display font-bold text-2xl">Responders Near You</h1>
          <div className="flex gap-2">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setSort("distance")} className={`text-xs px-3 py-1 rounded-md transition-colors ${sort === "distance" ? "bg-info/20 text-info" : "text-muted-foreground hover:text-foreground"}`}>Sort: Distance</button>
          <button onClick={() => setSort("trust")} className={`text-xs px-3 py-1 rounded-md transition-colors ${sort === "trust" ? "bg-info/20 text-info" : "text-muted-foreground hover:text-foreground"}`}>Sort: Trust Score</button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}>
              <ResponderCard {...r} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
