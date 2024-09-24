// utility.js

import proj4 from 'proj4';
import L from 'leaflet';
// Coordinate transformation function for all layers except bridges
export const transformCoordinates = (coordinates) => {
  return proj4("EPSG:5514", "EPSG:4326", coordinates);
};



// Define a custom small icon for bridges
export const smallIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/701/701666.png', // Change to your preferred icon URL
  iconSize: [12, 20], // Size of the icon
  iconAnchor: [6, 20], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -20], // Position of the popup anchor relative to the icon
});

export const greenIcon = new L.Icon({
  iconUrl:
    "https://icons.veryicon.com/png/o/transport/traffic-2/super-large-bridge.png", // Customize this with your green icon
    iconSize: [12, 20], // Size of the icon
  iconAnchor: [6, 20], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -20], // Position of the popup anchor relative to the icon
});
export const redIcon = new L.Icon({
  iconUrl:
    "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-red-bridge-building-image_2244161.jpg", // Customize this with your green icon
    iconSize: [12, 20], // Size of the icon
    iconAnchor: [6, 20], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -20], // Position of the popup anchor relative to the icon
});



// GeoJSON transformation function
export const transformGeoJSON = (geojson, skipTransformation = false) => {
  if (geojson && geojson.features) {
    geojson.features = geojson.features.map((feature) => {
      const { type, coordinates } = feature.geometry;
      if (skipTransformation) {
        return feature; // Skip transformation for bridges (already in EPSG:4326)
      }
      // Apply transformations for other layers
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

// Fetch WFS data function
export const fetchWFSData = async (layerId, url, transformGeoJSON, setLayers, setError) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch WFS data");
    const data = await response.json();
    const skipTransformation = layerId === 'bridges'; // Skip transformation if this is the bridges layer
    const transformedData = transformGeoJSON(data, skipTransformation);
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
