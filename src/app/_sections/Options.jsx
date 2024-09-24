import React from "react";
import {
  AiOutlineDollarCircle,
  AiOutlineCar,
  AiOutlineShopping,
  AiOutlineBuild,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineEnvironment,
  AiOutlineThunderbolt,
  AiOutlineUser,
} from "react-icons/ai";
import { FaBook } from "react-icons/fa";

const Options = ({ onOptionSelect }) => {
  const options = [
    {
      color: "bg-green-500",
      icon: <AiOutlineDollarCircle />,
      label: "Ekonomika",
    },
    { color: "bg-blue-500", icon: <AiOutlineCar />, label: "Doprava" },
    {
      color: "bg-yellow-500",
      icon: <AiOutlineShopping />,
      label: "Cestovný ruch",
    },
    { color: "bg-red-500", icon: <AiOutlineBuild />, label: "Priemysel" },
    {
      color: "bg-purple-500",
      icon: <AiOutlineHome />,
      label: "Poľnohospodárstvo",
    },
    {
      color: "bg-orange-500",
      icon: <AiOutlineThunderbolt />,
      label: "Energetika",
    },
    { color: "bg-teal-500", icon: <FaBook />, label: "Vzdelanie" },
    { color: "bg-pink-500", icon: <AiOutlineHome />, label: "Bývanie" },
    {
      color: "bg-indigo-500",
      icon: <AiOutlineEnvironment />,
      label: "Príroda",
    },
    { color: "bg-gray-500", icon: <AiOutlineHeart />, label: "Zdravotníctvo" },
    { color: "bg-lime-500", icon: <AiOutlineUser />, label: "Demografia" },
  ];

  return (
    <div className="bg-primary" id="moznosti">
      <div className="container mx-auto py-10">
        <h2 className="text-[#FFC843] text-4xl md:text-5xl font-bold text-center pb-12">
          Čo ťa zaujíma?
        </h2>

        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div
              className="grid grid-cols-1 gap-5 w-screen px-4 max-w-2xl
              md:flex md:gap-5 md:flex-wrap md:justify-center
            
            "
            >
              {options.map(({ color, icon, label }) => (
                <Rectangle
                  key={label}
                  color={color}
                  icon={icon}
                  onClick={() => onOptionSelect(label)}
                >
                  {label}
                </Rectangle>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Rectangle = ({ children, color, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`px-6 py-4 rounded-lg ${color} hover:bg-hover flex items-center justify-start text-white font-bold text-lg md:text-xl transition-transform cursor-pointer`}
    >
      <span className="mr-3">{icon}</span>
      <span>{children}</span>
    </div>
  );
};

export default Options;
