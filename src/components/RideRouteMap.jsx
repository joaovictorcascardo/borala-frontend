import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "../services/api";

function FitRoute({ polyline }) {
  const map = useMap();
  useEffect(() => {
    if (polyline?.length) {
      map.fitBounds(polyline, { padding: [28, 28] });
    }
  }, [polyline, map]);
  return null;
}

export function RideRouteMap({ rideId }) {
  const [mapData, setMapData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setMapData(null);
    setFailed(false);
    api.get(`/rides/${rideId}/map`)
      .then(setMapData)
      .catch(() => setFailed(true));
  }, [rideId]);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-blue-50/60 rounded-[20px]">
        <p className="text-sm text-slate-400">Trajeto indisponível</p>
      </div>
    );
  }

  if (!mapData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-blue-50/60 rounded-[20px]">
        <div className="w-7 h-7 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const center = [mapData.origin.lat, mapData.origin.lng];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ width: "100%", height: "100%", borderRadius: 20 }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={mapData.polyline} color="#2563eb" weight={4} opacity={0.85} />
      <CircleMarker
        center={[mapData.origin.lat, mapData.origin.lng]}
        radius={9}
        color="#2563eb"
        fillColor="#ffffff"
        fillOpacity={1}
        weight={2.5}
      >
        <Popup>Origem</Popup>
      </CircleMarker>
      <CircleMarker
        center={[mapData.destination.lat, mapData.destination.lng]}
        radius={9}
        color="#0f172a"
        fillColor="#0f172a"
        fillOpacity={1}
        weight={2.5}
      >
        <Popup>Destino</Popup>
      </CircleMarker>
      <FitRoute polyline={mapData.polyline} />
    </MapContainer>
  );
}
