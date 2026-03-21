export const DEFAULT_CENTER: [number, number] = [23.685, 86.9833];
export const DEFAULT_ZOOM = 14;
export const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
export const TILE_ATTRIBUTION = '&copy; <a href="https://carto.com/">CARTO</a>';

export const mockAlerts = [
  { id: 1, type: "Medical" as const, lat: 23.688, lng: 86.987, distance: "0.8 km", time: "2 min ago", status: "Pending" as const, responders: 0, description: "Elderly person collapsed on street" },
  { id: 2, type: "Accident" as const, lat: 23.682, lng: 86.978, distance: "1.4 km", time: "5 min ago", status: "Responding" as const, responders: 2, description: "Two-vehicle collision at intersection" },
  { id: 3, type: "Fire" as const, lat: 23.691, lng: 86.99, distance: "2.1 km", time: "12 min ago", status: "Resolved" as const, responders: 3, description: "Kitchen fire in residential building" },
  { id: 4, type: "Crime" as const, lat: 23.679, lng: 86.975, distance: "1.8 km", time: "8 min ago", status: "Pending" as const, responders: 0, description: "Reported theft in market area" },
];

export const mockResponders = [
  { id: 1, name: "Rahul M.", type: "Volunteer" as const, lat: 23.6865, lng: 86.985, distance: "0.4 km", trust: 92, status: "Available" as const, skills: ["First Aid", "CPR"] },
  { id: 2, name: "Dr. Priya S.", type: "Medical" as const, lat: 23.684, lng: 86.99, distance: "0.9 km", trust: 98, status: "Available" as const, skills: ["Emergency Medicine", "Trauma Care"] },
  { id: 3, name: "Officer Vikram", type: "Authority" as const, lat: 23.68, lng: 86.986, distance: "1.2 km", trust: 95, status: "Busy" as const, skills: ["Law Enforcement", "Traffic Control"] },
  { id: 4, name: "Ananya K.", type: "Volunteer" as const, lat: 23.687, lng: 86.98, distance: "0.6 km", trust: 88, status: "Available" as const, skills: ["First Aid", "Search & Rescue"] },
];

export const mockDangerZones = [
  { id: 1, lat: 23.69, lng: 86.98, radius: 500, type: "Flood", label: "Flood Risk Zone" },
];

export const alertTypeColors = {
  Medical: "hsl(var(--info))",
  Fire: "hsl(var(--secondary))",
  Accident: "hsl(var(--secondary))",
  Crime: "hsl(var(--primary))",
  Other: "hsl(var(--muted-foreground))",
} as const;

export const alertTypeEmoji = {
  Medical: "🏥",
  Fire: "🔥",
  Accident: "🚗",
  Crime: "🚨",
  Other: "🆘",
} as const;

export type AlertType = keyof typeof alertTypeColors;
export type ResponderType = "Volunteer" | "Medical" | "Authority";
export type AlertStatus = "Pending" | "Responding" | "Resolved";
