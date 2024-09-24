import React from "react";
import { AiOutlineStock } from "react-icons/ai";

const Benefits = () => {
  return (
    <div className="relative">
      {/* Background Image Wrapper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/background2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(5px)", // Apply blur to only the background
          zIndex: 0, // Ensure the background is behind everything
        }}
      ></div>

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 py-10 pb-40 container mx-auto">
        <h2 className="text-[#FFC843] text-5xl font-bold text-center pb-12">
          Košický kraj
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 justify-items-center">
          <Item
            title="HDP kraja ročne - 13 289 miliónov eur"
          />
          <Item
            title="Priemerne vyprodukované HDP na občana - 16 876 Eur"
          />
          <Item
            title="Podieľ ekonomicky aktívneho obyvateľstva - 49%"
          />
          <Item
            title="Miera ekonomickej aktivity - 59,7%"
          />
          <Item title="Miera zamestnanosti - 71,7%"/>
          <Item title="Miera nezamestnanosti - 9,3%"/>
        </div>
      </div>
    </div>
  );
};

export default Benefits;

const Item = ({ title, text, icon }) => {
  return (
    <div className="w-full h-15 flex flex-col items-center border border-gray-300 rounded-lg p-4 bg-transparent backdrop-blur-md">
      <h2 className="text-[#6CC3E7] text-xl text-white font-semibold">{title}</h2>
    </div>
  );
};
