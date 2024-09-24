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
  AiOutlineUser 
} from "react-icons/ai";
import { FaBook } from "react-icons/fa";

const Options = () => {
  return (
    <div className="bg-primary" id="moznosti">
      <div className="container mx-auto py-10">
        <h2 className="text-[#FFC843] text-5xl font-bold text-center pb-12">
          Čo ťa zaujíma?
        </h2>

        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="flex gap-5 flex-wrap justify-center">
              <Rectangle color="bg-green-500" icon={<AiOutlineDollarCircle />}>Ekonomika</Rectangle>
              <Rectangle color="bg-blue-500" icon={<AiOutlineCar />}>Doprava</Rectangle>
              <Rectangle color="bg-yellow-500" icon={<AiOutlineShopping />}>Cestovný ruch</Rectangle>
              <Rectangle color="bg-red-500" icon={<AiOutlineBuild />}>Priemysel</Rectangle>
              {/* Replaced AiOutlineField with AiOutlineHome */}
              <Rectangle color="bg-purple-500" icon={<AiOutlineHome />}>Poľnohospodárstvo</Rectangle>
              <Rectangle color="bg-orange-500" icon={<AiOutlineThunderbolt />}>Energetika</Rectangle>
              <Rectangle color="bg-teal-500" icon={<FaBook />}>Vzdelanie</Rectangle>
              <Rectangle color="bg-pink-500" icon={<AiOutlineHome />}>Bývanie</Rectangle>
              <Rectangle color="bg-indigo-500" icon={<AiOutlineEnvironment />}>Príroda</Rectangle>
              <Rectangle color="bg-gray-500" icon={<AiOutlineHeart />}>Zdravotníctvo</Rectangle>
              <Rectangle color="bg-lime-500" icon={<AiOutlineUser />}>Demografia</Rectangle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;

const Rectangle = ({ children, color, icon }) => {
  return (
    <div
      className={`px-6 py-4 rounded-lg ${color} hover:bg-hover flex items-center justify-start text-white font-bold text-xl transition-transform`}
    >
      {/* Display icon */}
      <span className="mr-3">{icon}</span>
      {/* Display text */}
      <span>{children}</span>
    </div>
  );
};
