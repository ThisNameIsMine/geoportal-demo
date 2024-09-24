import React from "react";
import { investmentOpportunities } from "../items";

const DetilPage = ({ params: { id } }) => {
  const investmentOpportunity = investmentOpportunities[id];

  return (
    <div className="bg-primary min-h-screen">
      <div className="container mx-auto py-20 grid grid-cols-2 gap-8">
        <div>
          <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Truck.car.transporter.arp.750pix.jpg"
                className="w-full"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img
                src="https://i.pinimg.com/736x/b8/55/01/b85501f55f5104f876ffb5c5baf35957.jpg"
                className="w-full"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img
                src="https://www.portseurope.com/wp-content/uploads/2020/02/Railways.jpg"
                className="w-full"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white">
          <h1 className="text-white font-bold text-5xl">
            {investmentOpportunity.title}
          </h1>
          <div className="divider"></div>
          <p>
            Modernizácia dopravnej infraštruktúry v Košickom kraji ponúka
            vynikajúcu investičnú príležitosť s dlhodobou stabilitou a vysokou
            návratnosťou. Tento projekt sa zameriava na zlepšenie regionálnej
            prepojenosti, zvýšenie efektivity logistiky a prilákanie turistov.
            Investícia do dopravnej siete prináša nielen ekonomické výhody, ale
            aj významné ekologické a technologické inovácie.
          </p>

          <div className="divider py-8"></div>

          <ul className="flex flex-col gap-2">
            <li>
              <span className="text-hover italic text-lg font-bold">
                Výnosnosť investície:
              </span>{" "}
              Očakáva sa ročná návratnosť (ROI) na úrovni
              <span className="text-hover italic text-lg"> 8-10 %</span>, čo
              zaisťuje stabilný príjem pre investorov vďaka zvýšenej efektivite
              logistiky a cestovného ruchu. Zlepšenie regionálnej
            </li>
            <li>
              <span className="text-hover italic text-lg font-bold">
                Zlepšenie regionálnej dostupnosti:
              </span>{" "}
              Modernizácia ciest a výstavba nových cyklotrás skráti čas
              dochádzky do priemyselných zón o{" "}
              <span className="text-hover italic text-lg">25 %</span>, čo
              podporí rast obchodu a zlepší prepojenie s ďalšími regiónmi.
            </li>
          </ul>

          <div className="flex justify-center mt-10">
            <button className="text-3xl bg-tertiary py-6 px-10 rounded-lg">
              Mám záujem investovať
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetilPage;
