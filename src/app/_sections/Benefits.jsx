import React from "react";
import { AiOutlineStock } from "react-icons/ai";

const Benefits = () => {
  return (
    <div className="min-h-screen py-10 bg-gray-200">
      <h2 className="text-[#191E23] text-5xl font-bold text-center pb-12">
        Čo ponúka Košický kraj?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 justify-items-center container mx-auto">
        <Item
          title="Dynamický ekonomický rast"
          text="Silný priemyselný a technologický sektor."
          icon={<AiOutlineStock />}
        />
        <Item
          title="Prístup k vzdelaniu"
          text="23 vysokých škôl a 3 výskumné inštitúty."
          icon={<AiOutlineStock />}
        />
        <Item
          title="Strategická poloha"
          text="Blízkosť hraníc s Maďarskom, Poľskom a Ukrajinou."
          icon={<AiOutlineStock />}
        />
        <Item
          title="Turistický potenciál"
          text="Historické pamiatky, UNESCO lokality a krásna príroda."
          icon={<AiOutlineStock />}
        />
        <Item
          title="Kvalitná infraštruktúra"
          text=""
          icon={<AiOutlineStock />}
        />
        <Item
          title="Kvalitná infraštruktúra"
          text=""
          icon={<AiOutlineStock />}
        />
      </div>
    </div>
  );
};

export default Benefits;

const Item = ({ title, text, icon }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <div className="text-[140px] text-primary">{icon}</div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-3xl text-white">{title}</h2>
        <p className="italic">{text}</p>
      </div>
    </div>
  );
};
