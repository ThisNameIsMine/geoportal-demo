import React from "react";

const Benefits = ({ selectedOption, infographicsData }) => {
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
          filter: "blur(5px)",
          zIndex: 0,
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
          {infographicsData[selectedOption]?.map((benefit, index) => (
            <Item key={index} title={benefit} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Item = ({ title }) => {
  return (
    <div className="w-full h-15 flex flex-col items-center border border-gray-300 rounded-lg p-4 bg-transparent backdrop-blur-md">
      <h2 className="text-[#6CC3E7] text-xl text-white font-semibold">{title}</h2>
    </div>
  );
};

export default Benefits;
