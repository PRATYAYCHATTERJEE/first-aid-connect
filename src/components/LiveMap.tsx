import { useEffect, useRef } from "react";
import L from "leaflet";
import { DARK_TILES, TILE_ATTRIBUTION, DEFAULT_ZOOM, mockAlerts, mockResponders, mockDangerZones } from "@/lib/mock-data";
import "leaflet/dist/leaflet.css";

interface LiveMapProps {
  center: [number, number];
  zoom?: number;
  className?: string;
  showOverlays?: boolean;
  interactive?: boolean;
}

export function LiveMap({ center, zoom = DEFAULT_ZOOM, className = "h-full w-full", showOverlays = true, interactive = true }: LiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center,
      zoom,
      zoomControl: interactive,
      dragging: interactive,
      scrollWheelZoom: interactive,
      doubleClickZoom: interactive,
      touchZoom: interactive,
      attributionControl: false,
    });

    L.tileLayer(DARK_TILES, { attribution: TILE_ATTRIBUTION }).addTo(map);

    // User location marker
    const userIcon = L.divIcon({ className: "", html: '<div class="pulse-blue"></div>', iconSize: [16, 16], iconAnchor: [8, 8] });
    L.marker(center, { icon: userIcon }).addTo(map).bindPopup("<strong>📍 You are here</strong>");

    if (showOverlays) {
      // Detection radius
      L.circle(center, { radius: 1000, color: "#2979FF", fillColor: "#2979FF", fillOpacity: 0.06, weight: 1 }).addTo(map);

      // Responders
      const responderIcon = L.divIcon({ className: "", html: '<div class="dot-green"></div>', iconSize: [12, 12], iconAnchor: [6, 6] });
      mockResponders.forEach(r => {
        L.marker([r.lat, r.lng], { icon: responderIcon }).addTo(map)
          .bindPopup(`<div style="font-size:13px"><strong style="color:#00E676">${r.name}</strong><div>${r.type} · ⭐ ${r.trust}</div><div>📍 ${r.distance}</div></div>`);
      });

      // SOS alerts
      const sosIcon = L.divIcon({ className: "", html: '<div class="pulse-red"></div>', iconSize: [14, 14], iconAnchor: [7, 7] });
      mockAlerts.filter(a => a.status !== "Resolved").forEach(a => {
        L.marker([a.lat, a.lng], { icon: sosIcon }).addTo(map)
          .bindPopup(`<div style="font-size:13px"><strong style="color:#FF2D2D">🚨 ${a.type} Emergency</strong><div>${a.description}</div><div>${a.time} · ${a.distance}</div></div>`);
      });

      // Danger zones
      mockDangerZones.forEach(z => {
        L.circle([z.lat, z.lng], { radius: z.radius, color: "#FF2D2D", fillColor: "#FF2D2D", fillOpacity: 0.12, weight: 1 })
          .addTo(map).bindPopup(`<strong style="color:#FF2D2D">⚠️ ${z.label}</strong>`);
      });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update center when it changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return <div ref={mapRef} className={className} />;
}
