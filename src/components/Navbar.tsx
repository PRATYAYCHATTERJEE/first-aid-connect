import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Shield, Menu, X, Bell } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/map", label: "Map" },
  { to: "/responders", label: "Responders" },
  { to: "/profile", label: "Profile" },
  { to: "/admin", label: "Admin" },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 border-b border-border">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-lg">ResQLink</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                location.pathname === l.to
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="relative rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">3</span>
          </button>
          <Link to="/login" className="hidden md:inline-flex rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 active:scale-95">
            Login
          </Link>
          <button className="md:hidden p-1 text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border p-4 space-y-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === l.to
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
