"use client";
import React from "react";
import { investmentOpportunities } from "../items";

import { useState } from "react";
import dynamic from "next/dynamic";
const RoadMap = dynamic(() => import("@/components/RoadMap"), { ssr: false });
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DetilPage = ({ params: { id } }) => {
  const investmentOpportunity = investmentOpportunities[id];
  const [layersVisibility, setLayersVisibility] = useState({
    first_class_roads: false,
    second_class_roads: false,
    third_class_roads: false,
    railways: false,
    bridges: false,
  });

  const [bridgeHeightRequirement, setBridgeHeightRequirement] = useState(0); // Default minimal height
  const [applyHeightFilter, setApplyHeightFilter] = useState(false); // To trigger height filter application
  const [submitting, setSubmitting] = useState(false);

  // Toggle the visibility of the layer
  const handleLayerToggle = (layerId) => {
    setLayersVisibility((prev) => ({
      ...prev,
      [layerId]: !prev[layerId], // Toggle visibility
    }));
  };

  // This function toggles visibility off, waits for re-render, and toggles back on
  const handleLayerToggleWithDelay = (layerId) => {
    // First, toggle visibility off
    setLayersVisibility((prev) => ({
      ...prev,
      [layerId]: false,
    }));

    // Wait 100ms to allow for re-render, then toggle it back on
    setTimeout(() => {
      setLayersVisibility((prev) => ({
        ...prev,
        [layerId]: true,
      }));
    }, 100); // You can adjust this delay if needed
  };

  // This function will trigger the double-toggle for the 'bridges' layer
  const handleApplyHeightFilter = () => {
    handleLayerToggleWithDelay("bridges"); // Toggle bridges layer off and on
    setApplyHeightFilter((prev) => !prev); // Optionally use this flag for other triggers
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    setSubmitting(true);

    console.log("submitting");

    setTimeout(() => {
      console.log("-- time");

      setSubmitting(false);
      document.getElementById("my_modal_3").close();
    }, 1500);
  };

  return (
    <div className="bg-primary">
      <div className="container mx-auto md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen">
        <div>
          <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Truck.car.transporter.arp.750pix.jpg"
                className="w-full"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img
                src="https://i.pinimg.com/736x/b8/55/01/b85501f55f5104f876ffb5c5baf35957.jpg"
                className="w-full"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img
                src="https://www.portseurope.com/wp-content/uploads/2020/02/Railways.jpg"
                className="w-full"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white px-4 pb-10">
          <h1 className="text-white font-bold text-4xl md:text-5xl">
            {investmentOpportunity.title}
          </h1>
          <div className="divider"></div>
          <p>
            Modernizácia dopravnej infraštruktúry v Košickom kraji ponúka
            vynikajúcu investičnú príležitosť s dlhodobou stabilitou a vysokou
            návratnosťou. Tento projekt sa zameriava na zlepšenie regionálnej
            prepojenosti, zvýšenie efektivity logistiky a prilákanie turistov.
            Investícia do dopravnej siete prináša nielen ekonomické výhody, ale
            aj významné ekologické a technologické inovácie.
          </p>

          <div className="divider py-8"></div>

          <ul className="flex flex-col gap-2">
            <li>
              <span className="text-hover italic text-lg font-bold">
                Výnosnosť investície:
              </span>{" "}
              Očakáva sa ročná návratnosť (ROI) na úrovni
              <span className="text-hover italic text-lg"> 8-10 %</span>, čo
              zaisťuje stabilný príjem pre investorov vďaka zvýšenej efektivite
              logistiky a cestovného ruchu. Zlepšenie regionálnej
            </li>
            <li>
              <span className="text-hover italic text-lg font-bold">
                Zlepšenie regionálnej dostupnosti:
              </span>{" "}
              Modernizácia ciest a výstavba nových cyklotrás skráti čas
              dochádzky do priemyselných zón o{" "}
              <span className="text-hover italic text-lg">25 %</span>, čo
              podporí rast obchodu a zlepší prepojenie s ďalšími regiónmi.
            </li>
          </ul>

          <div className="pt-10 flex justify-end">
            <a
              href="#mapa"
              className="bg-tertiary py-1 px-6 rounded font-semibold text-lg"
            >
              Viac Informácií
            </a>
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col lg:flex-row" id="mapa">
        <div className="w-full lg:w-80 p-4 bg-gray-800 lg:flex lg:flex-col">
          <h2 className="text-white text-4xl font-bold p-4 pt-10">
            Čo hľadáš?
          </h2>

          <p className="italic">Zvoľte si parametre</p>
          <div className="flex flex-col gap-2 flex-1 ">
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

            <div className="flex-1 ">
              {/* Conditionally render input and button only if 'bridges' is checked */}
              {layersVisibility.bridges && (
                <>
                  <div className="divider"></div>
                  <p className="text-sm pb-1">Minimálna výška mostu (cm)</p>
                  <input
                    type="number"
                    min="0"
                    className="input input-bordered w-full"
                    value={bridgeHeightRequirement}
                    onChange={(e) =>
                      setBridgeHeightRequirement(Number(e.target.value))
                    }
                  />
                  <button
                    className="btn btn-primary mt-4"
                    onClick={handleApplyHeightFilter} // Button to trigger double-toggle
                  >
                    Aplikovať filter
                  </button>
                </>
              )}
            </div>

            <div className="flex justify-center mt-10">
              <button
                className="text-xl lg:text-2xl bg-tertiary py-2 md:py-3 w-full rounded-lg text-white bottom-0"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Mám záujem investovať
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <div method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </div>
                  <h2 className="text-white text-xl">Kontaktný formulár</h2>
                  <form
                    className="flex flex-col gap-2 items-center mt-8"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Meno / Názov spoločnosti"
                      className="input input-bordered w-full max-w-xs"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full max-w-xs"
                      required
                    />

                    <div className="flex justify-center md:justify-end mt-8">
                      {!submitting ? (
                        <button
                          className="bg-secondary text-white py-2 px-4 rounded"
                          type="submit"
                        >
                          Odoslať
                        </button>
                      ) : (
                        <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
                      )}
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-100 h-[600px] md:h-[800px] lg:h-auto">
          {/* Render the RoadMap here */}
          <RoadMap
            layersVisibility={layersVisibility}
            bridgeHeightRequirement={bridgeHeightRequirement}
            applyHeightFilter={applyHeightFilter} // Trigger re-render based on button click
          />
        </div>
      </div>
    </div>
  );
};

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

export default DetilPage;
