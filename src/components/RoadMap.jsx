"use client";

import { useEffect, useState } from "react";
import proj4 from "proj4";
import Legend from "./Legend";
import Map from "./Map";
import { transformGeoJSON, fetchWFSData } from "@/utils/utility";

// Define EPSG:5514 projection
proj4.defs(
  "EPSG:5514",
  "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +datum=hermannskogel +units=m +no_defs"
);

// Layers configuration
const layersConfig = [
  {
    id: "first_class_roads",
    name: "First Class Roads (Highways)",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_1_triedy_ksk&outputFormat=application/json",
    color: "red",
  },
  {
    id: "second_class_roads",
    name: "Second Class Roads",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_2_triedy_ksk&outputFormat=application/json",
    color: "blue",
  },
  {
    id: "third_class_roads",
    name: "Third Class Roads",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_3_triedy_ksk&outputFormat=application/json",
    color: "green",
  },
  {
    id: "railways",
    name: "Railways",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:zel_trate_ksk&outputFormat=application/json",
    color: "black",
  },
];

export default function RoadMap() {
  const [layers, setLayers] = useState({
    first_class_roads: { visible: false, data: null },
    second_class_roads: { visible: false, data: null },
    third_class_roads: { visible: false, data: null },
    railways: { visible: false, data: null },
  });
  const [error, setError] = useState(null);
  const [borderData, setBorderData] = useState(null);

  useEffect(() => {
    const borderUrl = `https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:hranica_ksk&outputFormat=application/json`;
    const fetchBorderData = async () => {
      try {
        const response = await fetch(borderUrl);
        if (!response.ok) throw new Error("Failed to fetch border data");
        const data = await response.json();
        const transformedData = transformGeoJSON(data);
        setBorderData(transformedData);
      } catch (error) {
        console.error("Error fetching border data:", error);
        setError("Failed to load border");
      }
    };

    fetchBorderData();
  }, []);

  // Toggle visibility and fetch data if necessary
  const handleLayerToggle = async (layerId) => {
    setLayers((prevLayers) => {
      const isVisible = prevLayers[layerId].visible;
      if (!isVisible && !prevLayers[layerId].data) {
        const layer = layersConfig.find((l) => l.id === layerId);
        fetchWFSData(layerId, layer.url, transformGeoJSON, setLayers, setError);
      }
      return {
        ...prevLayers,
        [layerId]: { ...prevLayers[layerId], visible: !isVisible },
      };
    });
  };

  // Custom styling for each layer based on color
  const getGeoJSONStyle = (layerId) => {
    const layer = layersConfig.find((l) => l.id === layerId);
    return {
      color: layer.color,
      weight: layerId === "border" ? 3 : 2,
    };
  };

  const borderStyle = {
    color: "purple",
    weight: 3,
    fillOpacity: 0,
  };

  return (
    <div className="">
      <h2>Select Layers</h2>
      <div className="flex flex-col p-3 m-auto">
        {layersConfig.map((layer) => (
          <label key={layer.id} className="flex items-center">
            <input
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              checked={layers[layer.id].visible || false}
              onChange={() => handleLayerToggle(layer.id)}
            />
            <span
              className="p-3 ml-2"
              style={{
                display: "inline-block",
                width: "20px",
                height: "10px",
                backgroundColor: layer.color,
                marginRight: "8px",
              }}
            ></span>
            {layer.name}
          </label>
        ))}
      </div>

      <div className="w-[780px] h-[450px]">
        <Map
          layers={layers}
          layersConfig={layersConfig}
          borderData={borderData}
          borderStyle={borderStyle}
          getGeoJSONStyle={getGeoJSONStyle}
        />
      </div>
    </div>
  );
}
