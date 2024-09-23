import React from "react";

const page = () => {
  return (
    <div className="h-screen flex">
      <aside className="w-80 p-4">
        <h2 className="text-white text-4xl font-bold p-4 pt-10">Čo hľadáš?</h2>

        <p>Veci v mape</p>
        <div className="">
          <Checkbox label="Cesty" />
          <Checkbox label="Mosty" />
          <Checkbox label="Dialnice" />
          <Checkbox label="Nieco" />
          <Checkbox label="Daco" />
          <Checkbox label="Este nieco" />

          <div className="divider"></div>

          <p className="text-sm pb-1">Vyber niecoho</p>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Nadpis
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
            <option>Pivo</option>
            <option>Birel</option>
            <option>Kofola</option>
          </select>
        </div>
      </aside>
      <div className="flex-1 bg-green-500">
        <p className="text-6xl text-center text-red-500">mapa</p>
      </div>
    </div>
  );
};

export default page;

const Checkbox = ({ label }) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text text-base">{label}</span>
        <input
          type="checkbox"
          defaultChecked
          className="checkbox checkbox-primary"
        />
      </label>
    </div>
  );
};
