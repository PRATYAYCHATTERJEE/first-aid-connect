import { useState, useEffect } from "react";
import { DEFAULT_CENTER } from "@/lib/mock-data";

export function useGeolocation() {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(DEFAULT_CENTER);
      setLoading(false);
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      () => {
        setLocation(DEFAULT_CENTER);
        setLoading(false);
        setError("Permission denied");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return { location, loading, error };
}
