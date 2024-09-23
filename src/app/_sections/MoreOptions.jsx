import React from "react";

const kosiceNews = [
  {
    title: "Otvorenie nového technologického centra",
    description:
      "IT spoločnosť spustila nové vývojové stredisko s plánom zamestnať 500 odborníkov.",
  },
  {
    title: "Revitalizácia historického centra",
    description:
      "Začala sa rozsiahla rekonštrukcia námestia so zameraním na turistickú atraktivitu a moderné služby.",
  },
  {
    title: "Košice znížili uhlíkovú stopu o 20 %",
    description:
      "Mesto investovalo do zelených technológií a znížilo energetickú spotrebu verejných budov.",
  },
  {
    title: "Nový cyklomost spája Košice s okolitými obcami",
    description:
      "Mesto otvorilo moderný cyklomost, ktorý umožní lepšie spojenie s prímestskými časťami.",
  },
  {
    title: "Spustenie inovačného hubu pre start-upy",
    description:
      "V spolupráci s univerzitami a investormi bolo otvorené centrum pre technologické start-upy.",
  },
  {
    title: "Medzinárodný filmový festival prilákal rekordný počet návštevníkov",
    description:
      "Košice hostili prestížny festival s účasťou známych režisérov a hercov.",
  },
  {
    title: "Nový projekt bývania pre mladé rodiny",
    description:
      "Spustil sa stavebný projekt dostupného bývania s dôrazom na ekologickosť a komunitný život.",
  },
  {
    title: "Košice získali titul Európske mesto športu",
    description:
      "Mesto bolo ocenené za podporu športových aktivít a infraštruktúry pre verejnosť.",
  },
  {
    title: "Rozšírenie letiska s novými medzinárodnými linkami",
    description:
      "Letisko Košice pridalo nové pravidelné lety do veľkých európskych metropol.",
  },
  {
    title: "Výstavba moderného ekologického parku",
    description:
      "Mesto začalo s projektom mestského parku využívajúceho zelené technológie na správu a údržbu.",
  },
];

const MoreOptions = () => {
  return (
    <div className="overflow-hidden">
      <div className="py-4"></div>
      <div className="carousel overflow-auto">
        {kosiceNews.map((item, index) => (
          <div
            key={index}
            className="carousel-item border-r odd:bg-secondary even:text-primary odd:text-white bg-white h-64 flex flex-col gap-8 p-4"
          >
            <h3 className="text-center text-3xl max-w-sm font-semibold">
              {item.title}
            </h3>
            <p
              className={`max-w-xs text-justify ${
                index % 2 === 0 ? "text-gray-200" : ""
              }`}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreOptions;
