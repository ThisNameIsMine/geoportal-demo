import React from "react";
import Image from "next/image";
import MyMap from "@/components/MyMap";
import dynamic from "next/dynamic";
//import RoadMap from "@/components/RoadMap";
const BasicMap = dynamic(() => import("@/components/BasicMap"), { ssr: false });
const RoadMap = dynamic(() => import("@/components/RoadMap"), { ssr: false });

export default function page() {
  return (
    <div className="bg-gray-300">
      <div className="ml-28 justify-center ">
        <RoadMap className="" />
      </div>
    </div>
  );
}
