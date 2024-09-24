"use client";
import React, { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const RoadMap = dynamic(() => import("@/components/RoadMap"), { ssr: false });
const page = () => {
  const [layersVisibility, setLayersVisibility] = useState({
    first_class_roads: false,
    second_class_roads: false,
    third_class_roads: false,
    railways: false,
    bridges: false,
  });

  const [bridgeHeightRequirement, setBridgeHeightRequirement] = useState(0); // Default minimal height

  const handleLayerToggle = (layerId) => {
    setLayersVisibility((prev) => ({
      ...prev,
      [layerId]: !prev[layerId], // Toggle visibility
    }));
  };

  return (
    <div className="h-screen flex">
      <aside className="w-80 p-4 bg-gray-800">
        <h2 className="text-white text-4xl font-bold p-4 pt-10">Čo hľadáš?</h2>

        <p className="italic">Zvoľte si parametre</p>
        <div className="flex flex-col gap-2">
          <Checkbox
            label="Cesty 1. triedy"
            layerId="first_class_roads"
            checked={layersVisibility.first_class_roads}
            onChange={handleLayerToggle}
          />
          <Checkbox
            label="Cesty 2. triedy"
            layerId="second_class_roads"
            checked={layersVisibility.second_class_roads}
            onChange={handleLayerToggle}
          />
          <Checkbox
            label="Cesty 3. triedy"
            layerId="third_class_roads"
            checked={layersVisibility.third_class_roads}
            onChange={handleLayerToggle}
          />
          <Checkbox
            label="Železnice"
            layerId="railways"
            checked={layersVisibility.railways}
            onChange={handleLayerToggle}
          />
          <Checkbox
            label="Mosty"
            layerId="bridges"
            checked={layersVisibility.bridges}
            onChange={handleLayerToggle}
          />

          <div className="divider"></div>

          <p className="text-sm pb-1">Vyber niecoho</p>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled>Nadpis</option>
            <option>Han Solo</option>
            <option>Greedo</option>
            <option>Pivo</option>
            <option>Birel</option>
            <option>Kofola</option>
          </select>

          {/* New Control Panel for Bridge Requirements */}
          {layersVisibility.bridges && (
            <div className="mt-4">
              <p className="text-sm pb-1">Minimálna výška mostu (cm)</p>
              <input
                type="number"
                min="0"
                className="input input-bordered w-full"
                value={bridgeHeightRequirement}
                onChange={(e) => {
                  setBridgeHeightRequirement(Number(e.target.value));
                }} // Update height requirement
              />
            </div>
          )}
        </div>
      </aside>
      <div className="flex-1 bg-gray-100">
        {/* Render the RoadMap here */}
        <RoadMap
          layersVisibility={layersVisibility}
          bridgeHeightRequirement={bridgeHeightRequirement}
        />
      </div>
    </div>
  );
};

export default page;

const Checkbox = ({ label, layerId, checked, onChange }) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text text-base text-white">{label}</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(layerId)} // Toggle the layer visibility
          className="checkbox checkbox-primary"
        />
      </label>
    </div>
  );
};
