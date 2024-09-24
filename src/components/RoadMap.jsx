"use client";

import { useEffect, useState } from "react";
import proj4 from "proj4";
import Map from "./Map";
import { transformGeoJSON, fetchWFSData } from "@/utils/utility";
import { greenIcon, redIcon } from "@/utils/utility";
// Define EPSG:5514 projection
proj4.defs(
  "EPSG:5514",
  "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +datum=hermannskogel +units=m +no_defs"
);

// Layers configuration
const layersConfig = [
  {
    id: "first_class_roads",
    name: "Cesty 1. triedy",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_1_triedy_ksk&outputFormat=application/json",
    color: "red",
  },
  {
    id: "second_class_roads",
    name: "Cesty 2. triedy",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_2_triedy_ksk&outputFormat=application/json",
    color: "blue",
  },
  {
    id: "third_class_roads",
    name: "Cesty 3. triedy",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_3_triedy_ksk&outputFormat=application/json",
    color: "green",
  },
  {
    id: "railways",
    name: "Železnice",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:zel_trate_ksk&outputFormat=application/json",
    color: "black",
  },
  {
    id: "bridges",
    name: "Mosty",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ssc:bridges_dc&outputFormat=application/json",
    color: "orange",
  },
];

export default function RoadMap({ layersVisibility, bridgeHeightRequirement }) {
  const [layers, setLayers] = useState({
    first_class_roads: { visible: false, data: null },
    second_class_roads: { visible: false, data: null },
    third_class_roads: { visible: false, data: null },
    railways: { visible: false, data: null },
    bridges: { visible: false, data: null },
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

  // Sync visibility state with the layers
  useEffect(() => {
    setLayers((prevLayers) => {
      const newLayers = { ...prevLayers };
      Object.keys(layersVisibility).forEach((layerId) => {
        newLayers[layerId].visible = layersVisibility[layerId]; // Update visibility based on props
        if (newLayers[layerId].visible && !newLayers[layerId].data) {
          const layer = layersConfig.find((l) => l.id === layerId);
          fetchWFSData(
            layerId,
            layer.url,
            transformGeoJSON,
            setLayers,
            setError
          );
        }
      });
      return newLayers;
    });
  }, [layersVisibility]); // Trigger when visibility changes

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

  // Modify the style of bridges based on the height requirement
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.height) {
      const bridgeHeight = parseFloat(feature.properties.height); // Convert height to number
      console.log("Bridge height:", bridgeHeight);
      if (!isNaN(bridgeHeight)) {
        // Ensure height is a valid number
        if (bridgeHeight >= bridgeHeightRequirement) {
          layer.setIcon(greenIcon); // Bridge is high enough
        } else {
          layer.setIcon(redIcon); // Bridge is too low
        }
      } else {
        console.log("Invalid height:", feature.properties.height);
      }
    }
    // Popup for other features
    const popupContent = Object.keys(feature.properties || {})
      .map((key) => `<strong>${key}</strong>: ${feature.properties[key]}`)
      .join("<br>");
    layer.bindPopup(popupContent);
  };

  return (
    <div className="w-full h-full">
      <Map
        layers={layers}
        layersConfig={layersConfig}
        borderData={borderData}
        borderStyle={borderStyle}
        getGeoJSONStyle={getGeoJSONStyle}
        onEachFeature={onEachFeature} // Apply feature-level styles and popups
      />
    </div>
  );
}
