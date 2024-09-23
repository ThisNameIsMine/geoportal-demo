"use client"; // Ensure client-side rendering for this component

import { MapContainer, Marker, TileLayer, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect, useState } from "react";

import proj4 from "proj4";
import "proj4leaflet";

// Define the EPSG:5514 projection
proj4.defs(
  "EPSG:5514",
  "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +datum=hermannskogel +units=m +no_defs"
);

export default function BasicMap({
  position = [48.716385, 21.261074],
  zoom = 8,
}) {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const transformCoordinates = (coordinates) => {
      // Convert coordinates from EPSG:5514 to EPSG:4326
      return proj4("EPSG:5514", "EPSG:4326", coordinates);
    };

    const transformGeoJSON = (geojson) => {
      // Loop through all features and transform their coordinates
      if (geojson && geojson.features) {
        geojson.features = geojson.features.map((feature) => {
          const { type, coordinates } = feature.geometry;
          if (type === "Point") {
            // Transform point coordinates
            feature.geometry.coordinates = transformCoordinates(coordinates);
          } else if (type === "Polygon" || type === "MultiPolygon") {
            // Transform polygon coordinates
            feature.geometry.coordinates = coordinates.map((polygon) =>
              polygon.map((ring) => ring.map(transformCoordinates))
            );
          }
          return feature;
        });
      }
      return geojson;
    };

    const fetchWFSData = async () => {
      try {
        // WFS URL for GeoJSON output
        const wfsUrl = `https://www.geoportalksk.sk/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ksk_statsoffice:celkovy_prirastok_obyv_obce&outputFormat=application/json`;

        // Fetch the data
        const response = await fetch(wfsUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch WFS data");
        }

        // Parse the GeoJSON data
        const data = await response.json();
        const transformedData = transformGeoJSON(data); // Transform coordinates
        setGeoJsonData(transformedData); // Set transformed data
        console.log("Transformed WFS data: ", transformedData);
      } catch (error) {
        console.error("Error fetching WFS data:", error);
        setError("Failed to load WFS data.");
      }
    };

    // Fetch the WFS data when the component mounts
    fetchWFSData();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div className="w-[700px] h-[500px]">
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Base tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker for center point */}
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        {/* Handle errors */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Render the transformed WFS GeoJSON data */}
        {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            onEachFeature={(feature, layer) => {
              // You can customize the popup content here
              const properties = feature.properties || {};
              const popupContent = `
                <strong>Feature ID:</strong> ${feature.id} <br />
                <strong>Name:</strong> ${properties.name || "N/A"} <br />
                <strong>Population:</strong> ${properties.population || "N/A"}
              `;
              layer.bindPopup(popupContent);
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
