"use client"; // Ensure client-side rendering for this component

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect, useState } from "react";
import proj4 from "proj4";
import * as L from "leaflet";
import "proj4leaflet";

// Define the EPSG:5514 projection using proj4leaflet
const EPSG5514 = new L.Proj.CRS(
  "EPSG:5514",
  "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +datum=hermannskogel +units=m +no_defs",
  {
    resolutions: [
      8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1,
    ],
    origin: [-951499.37, -1320357.42],
    bounds: L.bounds([
      [-1200000, -1200000],
      [1200000, 1200000],
    ]),
  }
);

// Define the road layers (WFS URLs)
const layersConfig = [
  {
    id: "first_class_roads",
    name: "First Class Roads (Highways)",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_1_triedy_ksk&outputFormat=application/json",
  },
  {
    id: "second_class_roads",
    name: "Second Class Roads",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_2_triedy_ksk&outputFormat=application/json",
  },
  {
    id: "third_class_roads",
    name: "Third Class Roads",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_3_triedy_ksk&outputFormat=application/json",
  },
];

export default function RoadMap() {
  const [layers, setLayers] = useState({
    first_class_roads: { visible: false, data: null },
    second_class_roads: { visible: false, data: null },
    third_class_roads: { visible: false, data: null },
  });
  const [error, setError] = useState(null);

  // Function to transform coordinates using EPSG:5514 to EPSG:4326
  const transformCoordinates = (coordinates) => {
    return proj4("EPSG:5514", "EPSG:4326", coordinates);
  };

  // Function to transform GeoJSON
  const transformGeoJSON = (geojson) => {
    if (geojson && geojson.features) {
      geojson.features = geojson.features.map((feature) => {
        const { type, coordinates } = feature.geometry;
        if (type === "Point") {
          feature.geometry.coordinates = transformCoordinates(coordinates);
        } else if (type === "Polygon" || type === "MultiPolygon") {
          feature.geometry.coordinates = coordinates.map((polygon) =>
            polygon.map((ring) => ring.map(transformCoordinates))
          );
        } else if (type === "MultiLineString") {
          feature.geometry.coordinates = coordinates.map((line) =>
            line.map(transformCoordinates)
          );
        } else if (type === "LineString") {
          feature.geometry.coordinates = coordinates.map(transformCoordinates);
        } else if (type === "MultiPoint") {
          feature.geometry.coordinates = coordinates.map(transformCoordinates);
        }

        return feature;
      });
    }
    return geojson;
  };

  // Function to fetch WFS data for a specific layer
  const fetchWFSData = async (layerId, url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch WFS data");
      const data = await response.json();
      const transformedData = transformGeoJSON(data);
      console.log(`Transformed ${layerId} data:`, transformedData);
      setLayers((prevLayers) => ({
        ...prevLayers,
        [layerId]: { ...prevLayers[layerId], data: transformedData },
      }));
    } catch (error) {
      console.error(`Error fetching data for ${layerId}:`, error);
      setError(`Failed to load ${layerId}`);
    }
  };

  // Toggle visibility and fetch data if necessary
  const handleLayerToggle = async (layerId) => {
    setLayers((prevLayers) => {
      const isVisible = prevLayers[layerId].visible;
      // Fetch the data only if it's becoming visible and hasn't been fetched before
      if (!isVisible && !prevLayers[layerId].data) {
        const layer = layersConfig.find((l) => l.id === layerId);
        fetchWFSData(layerId, layer.url);
      }
      // Toggle the visibility
      return {
        ...prevLayers,
        [layerId]: { ...prevLayers[layerId], visible: !isVisible },
      };
    });
  };

  return (
    <div className="flex">
      {/* Checkbox controls for selecting layers */}
      <div className="flex flex-col p-4">
        <h2>Select Layers</h2>
        {layersConfig.map((layer) => (
          <label key={layer.id}>
            <input
              type="checkbox"
              checked={layers[layer.id].visible || false}
              onChange={() => handleLayerToggle(layer.id)}
            />
            {layer.name}
          </label>
        ))}
      </div>

      {/* MapContainer */}
      <div className="w-[700px] h-[500px]">
        <MapContainer
          center={[48.716385, 21.261074]} // Example position (Slovakia)
          zoom={8}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Base tile layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render visible layers dynamically based on user selection */}
          {Object.keys(layers).map(
            (layerId) =>
              layers[layerId].visible &&
              layers[layerId].data && (
                <GeoJSON key={layerId} data={layers[layerId].data} />
              )
          )}
        </MapContainer>
      </div>
    </div>
  );
}
