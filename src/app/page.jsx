"use client";

import Options from "./_sections/Options";
import Benefits from "./_sections/Benefits";
import MoreOptions from "./_sections/MoreOptions";
import Header from "../components/Header";
import { useState } from "react";

const infographicsData = {
  Ekonomika: [
    "HDP kraja ročne: 13 289 miliónov eur",
    "Priemerne vyprodukované HDP na občana: 16 876 Eur",
    "Podieľ ekonomicky aktívneho obyvateľstva: 49%",
    "Miera ekonomickej aktivity: 59,7%",
    "Miera zamestnanosti: 71,7%",
    "Miera nezamestnanosti: 9,3%",
  ],
  Doprava: [
    "Dĺžka cestnej siete: 2 395km",
    "Dĺžka dialníc: 22km",
    "Dĺžka rýchlostných ciest: 15km",
    "Dĺžka ciest I. triedy: 367 min",
    "Dĺžka ciest II. triedy: 583 min",
    "Počet evidovaných motorových vozidiel: 419 tisíc",
  ],
  Cestovnýruch: [
    "Počet divadiel: 14",
    "Počet stálých kín: 9",
    "Počet muzeí: 28",
    "Počet galérií: 3",
    "Počet knižníc: 123",
    "Počet ubytovacích zariadení: 357,2 tisíc",
  ],
  Priemysel: [
    "Hlavné odvetvia: hutnícky, strojárenský, potravinársky, elektrotechnický a ťažobný priemysel, výroba stavebných hmôt, palív a energetika",
    "Počet zamestnancov priemyselných subjektov: 52,9 tisíc",
    "Tržby za vlastné výkony: 12 miliárd eur",
  ],
  Poľnohospodárstvo: [
    "Poľnohospodárska pôda: 333 tisíc ha",
  ],
  Energetika: [
  ],
  Vzdelanie: [
    "Počet materských škol: 461",
    "Počet základných škol: 293",
    "Počet gymnázií: 34",
    "Počet stredných odborných škol: 59",
  ],
  Bývanie: [
    "Počet postavených bytov v roku 2023: 1 590",
  ],
  Príroda: [
    "Počet národných parkov: 2",
    "Počet chránených krajinných oblastí: 2",
    "Počet národných prírodných rezervácií: 29",
    "Počet prírodných rezervácií: 49",
    "Počet národných prírodných pamiatok: 23",
    "Počet prírodných pamiatok: 26",
    "Počet chránených areálov: 11",
    "Počet chránených vtáčich území: 10",
  ],
  Zdravotníctvo: [
    "Počet zdravotníckych zariadení: 1 966",
    "Počet nemocníc: 19",
    "Počet zariadení ambulatnej zdravotnej starostlivosti: 1 552",
    "Počet liečební: 11",
  ],
  Demografia: [
    "Celkový počet obyvateľov: 779 073",
    "Podiel celkového obyvateľstva: 14,4%",
    "Priemerná hustota na km2: 115",
    "Priemerný vek: 40,5",
  ],
};

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("Ekonomika"); // Default to Economy

  return (
    <div className="bg-primary">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/background1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(0px)",
        }}
      ></div>
      <Header />
      <div className="hero bg-primary min-h-screen">
        <div className="hero-content text-center">
        {/* Scaling semi-transparent rectangle */}
        <div className="mx-auto w-2/4">
          <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-lg p-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white ">
              Inovatívny portál KSK pre{" "}
              <span className="text-secondary">ľudí</span> a firmy
            </h1>

            <p className="py-6 text-[#FFC843] text-xl">
              Košický kraj ponúka strategickú polohu, kvalifikovanú pracovnú
              silu a modernizovanú infraštruktúru, ideálne podmienky pre rast
              vášho podnikania.
            </p>
            <a href="#moznosti">
              <button className="btn bg-secondary text-white hover:bg-hover border-none">
                Poďme na to!
              </button>
            </a>
          </div>
          </div>
        </div>
      </div>
      <Benefits selectedOption={selectedOption} infographicsData={infographicsData} />
      <Options onOptionSelect={setSelectedOption} />
      <MoreOptions />
    </div>
  );
}
