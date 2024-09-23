import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// Reusable Map Component
const Map = ({
  layers,
  layersConfig,
  borderData,
  borderStyle,
  getGeoJSONStyle,
}) => {
  return (
    <MapContainer
      className="rounded-3xl"
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
  );
};

export default Map;
