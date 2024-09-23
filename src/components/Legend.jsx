import React from "react";

export default function Legend({ layersConfig }) {
  return (
    <div className="flex flex-col p-4">
      <h2>Legend</h2>
      {layersConfig.map((layer) => (
        <div key={layer.id} style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              display: "inline-block",
              width: "20px",
              height: "10px",
              backgroundColor: layer.color,
              marginRight: "8px",
            }}
          ></span>
          <span>{layer.name}</span>
        </div>
      ))}
    </div>
  );
}
