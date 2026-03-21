import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { DARK_TILES, TILE_ATTRIBUTION, DEFAULT_ZOOM, mockAlerts, mockResponders, mockDangerZones } from "@/lib/mock-data";
import "leaflet/dist/leaflet.css";

const userIcon = L.divIcon({ className: "", html: '<div class="pulse-blue"></div>', iconSize: [16, 16], iconAnchor: [8, 8] });
const sosIcon = L.divIcon({ className: "", html: '<div class="pulse-red"></div>', iconSize: [14, 14], iconAnchor: [7, 7] });
const responderIcon = L.divIcon({ className: "", html: '<div class="dot-green"></div>', iconSize: [12, 12], iconAnchor: [6, 6] });

interface LiveMapProps {
  center: [number, number];
  zoom?: number;
  className?: string;
  showOverlays?: boolean;
  interactive?: boolean;
}

export function LiveMap({ center, zoom = DEFAULT_ZOOM, className = "h-full w-full", showOverlays = true, interactive = true }: LiveMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      zoomControl={interactive}
      dragging={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      touchZoom={interactive}
      attributionControl={false}
    >
      <TileLayer url={DARK_TILES} attribution={TILE_ATTRIBUTION} />

      {/* User location */}
      <Marker position={center} icon={userIcon}>
        <Popup><strong>📍 You are here</strong></Popup>
      </Marker>

      {/* Detection radius */}
      {showOverlays && (
        <Circle center={center} radius={1000} pathOptions={{ color: "hsl(220,100%,58%)", fillColor: "hsl(220,100%,58%)", fillOpacity: 0.06, weight: 1 }} />
      )}

      {showOverlays && mockResponders.map(r => (
        <Marker key={r.id} position={[r.lat, r.lng]} icon={responderIcon}>
          <Popup>
            <div className="space-y-1 text-sm">
              <strong className="text-success">{r.name}</strong>
              <div>{r.type} · ⭐ {r.trust}</div>
              <div>📍 {r.distance}</div>
            </div>
          </Popup>
        </Marker>
      ))}

      {showOverlays && mockAlerts.filter(a => a.status !== "Resolved").map(a => (
        <Marker key={a.id} position={[a.lat, a.lng]} icon={sosIcon}>
          <Popup>
            <div className="space-y-1 text-sm">
              <strong className="text-red-400">🚨 {a.type} Emergency</strong>
              <div>{a.description}</div>
              <div>{a.time} · {a.distance}</div>
            </div>
          </Popup>
        </Marker>
      ))}

      {showOverlays && mockDangerZones.map(z => (
        <Circle key={z.id} center={[z.lat, z.lng]} radius={z.radius} pathOptions={{ color: "hsl(0,100%,59%)", fillColor: "hsl(0,100%,59%)", fillOpacity: 0.12, weight: 1 }}>
          <Popup><strong className="text-red-400">⚠️ {z.label}</strong></Popup>
        </Circle>
      ))}
    </MapContainer>
  );
}
