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
proj4.defs(
  "EPSG:5514",
  "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +datum=hermannskogel +units=m +no_defs"
);
const layersConfig = [
  {
    id: "first_class_roads",
    name: "First Class Roads (Highways)",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_1_triedy_ksk&outputFormat=application/json",
    color: "red", // Color for first class roads
  },
  {
    id: "second_class_roads",
    name: "Second Class Roads",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_2_triedy_ksk&outputFormat=application/json",
    color: "blue", // Color for second class roads
  },
  {
    id: "third_class_roads",
    name: "Third Class Roads",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:cesty_3_triedy_ksk&outputFormat=application/json",
    color: "green", // Color for third class roads
  },
  {
    id: "railways",
    name: "Railways",
    url: "https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:zel_trate_ksk&outputFormat=application/json",
    color: "black", // Color for railways
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
        } else if (type === "MultiPolygon") {
          feature.geometry.coordinates = coordinates.map((polygon) =>
            polygon.map((ring) => ring.map(transformCoordinates))
          );
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
  useEffect(() => {
    const borderUrl = `https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_gis:hranica_ksk&outputFormat=application/json`; // Replace with actual WFS URL
    const fetchBorderData = async () => {
      try {
        const response = await fetch(borderUrl);
        if (!response.ok) throw new Error("Failed to fetch border data");
        const data = await response.json();
        const transformedData = transformGeoJSON(data);
        setBorderData(transformedData); // Store border data
      } catch (error) {
        console.error("Error fetching border data:", error);
        setError("Failed to load border");
      }
    };

    fetchBorderData(); // Fetch border data when component mounts
  }, []);

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

  // Custom styling for each layer based on color
  const getGeoJSONStyle = (layerId) => {
    const layer = layersConfig.find((l) => l.id === layerId);
    return {
      color: layer.color,
      weight: layerId === "border" ? 3 : 2, // Thicker border line
    };
  };
  const borderStyle = {
    color: "purple", // Border color
    weight: 3, // Thickness
    fillOpacity: 0, // No fill inside the border
  };

  return (
    <div className="">
      {/* Checkbox controls for selecting layers and legend */}
      <h2>Select Layers</h2>
      <div className="flex flex-col p-3 m-auto">
        {layersConfig.map((layer) => (
          <label key={layer.id} className="flex items-center">
            <input
              className=""
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

      {/* MapContainer */}
      <div className="w-[780px] h-[450px]">
        <MapContainer
          className="rounded-3xl shadow-lg border-2 border-gray-300"
          center={[48.716385, 21.261074]} // Example position (Slovakia)
          zoom={9}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Base tile layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Render the border layer (always visible) */}
          {borderData && <GeoJSON data={borderData} style={borderStyle} />}

          {/* Render visible layers dynamically based on user selection */}
          {Object.keys(layers).map(
            (layerId) =>
              layers[layerId].visible &&
              layers[layerId].data && (
                <GeoJSON
                  key={layerId}
                  data={layers[layerId].data}
                  style={getGeoJSONStyle(layerId)}
                />
              )
          )}
        </MapContainer>
      </div>
    </div>
  );
}
