import Image from "next/image";
import MyMap from "@/components/MyMap";
import dynamic from "next/dynamic";
const BasicMap = dynamic(() => import("@/components/BasicMap"), { ssr: false });

export default function Home() {
  return (
    <div className="ml-28 justify-center">
      <h1>Hello There</h1>
      <h4> here is your map:</h4>

      <BasicMap className="" />
    </div>
  );
}
