import React from "react";

const kosiceNews = [
  {
    title: "Nový cyklomost spája Košice s okolitými obcami",
    description:
      "Mesto otvorilo moderný cyklomost, ktorý umožní lepšie spojenie s prímestskými časťami.",
    img: "https://bratislavskykraj.sk/wp-content/uploads/2021/06/38156270386-015b786636-o-696x463.jpg",
  },

  {
    title: "Revitalizácia historického centra",
    description:
      "Začala sa rozsiahla rekonštrukcia námestia so zameraním na turistickú atraktivitu a moderné služby.",
    img: "https://www.keturist.sk/info/wp-content/uploads/2021/01/dom-a-michal.jpg",
  },
  {
    title: "Košice získali titul Európske mesto športu",
    description:
      "Mesto bolo ocenené za podporu športových aktivít a infraštruktúry pre verejnosť.",
    img: "https://www1.teraz.sk/usercontent/photos/2/8/7/4-287a6e287e0b496cf9a82744da2e6dcfb03b0baf.jpg",
  },
  {
    title: "Spustenie inovačného hubu pre start-upy",
    description:
      "V spolupráci s univerzitami a investormi bolo otvorené centrum pre technologické start-upy.",
    img: "https://images.adsttc.com/media/images/6196/603a/9a95/7a23/ec86/82da/large_jpg/scion-innovation-hub-atrium-patrick-reynolds-6.jpg?1637245014",
  },
  {
    title: "Rozšírenie letiska s novými medzinárodnými linkami",
    description:
      "Letisko Košice pridalo nové pravidelné lety do veľkých európskych metropol.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf6y7sbg_LPZnEZaBY7vNURw6S0N98ZuagCQ&s",
  },
  {
    title: "Výstavba moderného ekologického parku",
    description:
      "Mesto začalo s projektom mestského parku využívajúceho zelené technológie na správu a údržbu.",
    img: "https://www.yimba.sk/upload/Projekty/Ru%C5%BEinov/City%20Park%20Ru%C5%BEinov/02.jpg",
  },

  {
    title: "Otvorenie nového technologického centra",
    description:
      "IT spoločnosť spustila nové vývojové stredisko s plánom zamestnať 500 odborníkov.",
    img: "https://fmjournal.cz/wp-content/uploads/2022/08/umprum3-300x230.png",
  },
];

const MoreOptions = () => {
  return (
    <div className="overflow-hidden">
      <h2 className="text-center text-white text-5xl font-bold pt-10">
        Novinky v <span className="text-secondary">KSK</span>
      </h2>
      <div className="py-4"></div>
      <div className="carousel overflow-auto">
        {kosiceNews.map((item, index) => (
          <div
            key={index}
            className="carousel-item border-r odd:bg-gray-300 even:text-primary odd:text-white bg-white h-100 flex flex-col items-center gap-8 p-4"
          >
            <img
              className="w-48 aspect-video object-cover rounded"
              src={item.img}
              alt=""
            />
            <h3 className="text-center text-3xl max-w-sm font-semibold">
              {item.title}
            </h3>
            <p
              className={`max-w-xs text-justify ${
                index % 2 === 0 ? "text-black" : "text-black"
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
