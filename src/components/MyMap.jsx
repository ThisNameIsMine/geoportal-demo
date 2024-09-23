"use client";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import dynamic from "next/dynamic";

export default function MyPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/BasicMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div>
      <Map />
    </div>
  );
}
