import React from "react";

const Options = () => {
  return (
    <div className="min-h-screen bg-base-200" id="moznosti">
      <div className="container mx-auto py-10 min-">
        <h2 className="text-white text-5xl font-bold text-center pb-8 uppercase">
          Čo ťa zaujíma?
        </h2>

        <div className="flex justify-center items-center h-[75vh]">
          <div className="flex flex-col items-center">
            <Circle>Bývanie</Circle>
            <div className="flex gap-40">
              <Circle>Zážitok</Circle>
              <Circle>Investovanie</Circle>
            </div>
            <Circle>Niečo</Circle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;

const Circle = ({ children }) => {
  return (
    <div className="w-48 h-48 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl hover:scale-110 transition-transform">
      {children}
    </div>
  );
};
