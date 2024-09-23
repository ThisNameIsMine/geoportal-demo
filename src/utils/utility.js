import proj4 from 'proj4';

// Coordinate transformation function
export const transformCoordinates = (coordinates) => {
  return proj4("EPSG:5514", "EPSG:4326", coordinates);
};

// GeoJSON transformation function
export const transformGeoJSON = (geojson) => {
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

// Fetch WFS data function
export const fetchWFSData = async (layerId, url, transformGeoJSON, setLayers, setError) => {
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
