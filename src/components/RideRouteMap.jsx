import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FitRoute({ polyline }) {
  const map = useMap();
  useEffect(() => {
    if (polyline?.length) {
      map.fitBounds(polyline, { padding: [32, 32] });
    }
  }, [polyline, map]);
  return null;
}

export function RideRouteMap({ originLat, originLng, destLat, destLng }) {
  const [polyline, setPolyline] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!originLat || !originLng || !destLat || !destLng) {
      setFailed(true);
      return;
    }

    setPolyline(null);
    setFailed(false);

    fetch(
      `https://router.project-osrm.org/route/v1/driving/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.code !== "Ok" || !data.routes?.length) {
          setFailed(true);
          return;
        }
        const coords = data.routes[0].geometry.coordinates;
        setPolyline(coords.map(([lng, lat]) => [lat, lng]));
      })
      .catch(() => setFailed(true));
  }, [originLat, originLng, destLat, destLng]);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-blue-50/60 rounded-[20px]">
        <p className="text-sm text-slate-400">Trajeto indisponível</p>
      </div>
    );
  }

  if (!polyline) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-blue-50/60 rounded-[20px]">
        <div className="w-7 h-7 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <MapContainer
      center={[originLat, originLng]}
      zoom={13}
      style={{ width: "100%", height: "100%", borderRadius: 20 }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={polyline} color="#2563eb" weight={4} opacity={0.85} />
      <CircleMarker
        center={[originLat, originLng]}
        radius={9}
        color="#2563eb"
        fillColor="#ffffff"
        fillOpacity={1}
        weight={2.5}
      >
        <Popup>Origem</Popup>
      </CircleMarker>
      <CircleMarker
        center={[destLat, destLng]}
        radius={9}
        color="#0f172a"
        fillColor="#0f172a"
        fillOpacity={1}
        weight={2.5}
      >
        <Popup>Destino</Popup>
      </CircleMarker>
      <FitRoute polyline={polyline} />
    </MapContainer>
  );
}
