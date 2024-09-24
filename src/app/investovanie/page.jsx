"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    title: "Kto ste?",
    questions: ["Firma", "Investor", "Startup", "Iný"],
    type: "radio",
  },
  {
    title: "Ktorý sektor Vás zaujíma?",
    questions: [
      "Transport",
      "Zdravotníctvo",
      "Bývanie",
      "Vzdelanie",
      "Energetika",
      "Poľnohospodárstvo",
      "Priemysel",
      "Cestovný Ruch",
      "Ekonomika",
    ],
    type: "checkbox",
  },
  {
    title: "Koľko mate finančných prostriedkov?",
    questions: ["Menej ako 10 tisíc eur", "10 tisíc eur - 100 tisíc eur", "100 tisíc eur - 1 milion eur", "1 milion eur a viac"],
    type: "radio",
  },
  {
    title: "Aký je váš investičný horizont?",
    questions: ["1-3 roky", "3-5 rokov", "5-10 rokov", "10+ rokov"],
    type: "radio",
  },
  {
    title: "Vyberte etapu investície:?",
    questions: [
        "Skorý Startup",
        "Seria A",
        "Seria B a ďalej",
        "Neskorá etapa spoločnosti",
        "M&A",
        "Nehnuteľnosti",
        "Venture Capital",
        "IPO",
    ],
    type: "checkbox",
  },
  {
    title: "Vyberte risk:?",
    questions: [
      "Nízky",
      "Stredný",
      "Vysoký",
    ],
    type: "radio",
  },
  {
    title: "Vyberte typ účasti:?",
    questions: [
      "Hands-off",
      "Poradenská",
      "Aktívna účasť",
    ],
    type: "radio",
  },
];

const Page = () => {
  const router = useRouter();

  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = () => {
    setActiveSlide((prev) => prev + 1);

    if (activeSlide === slides.length) {
      setTimeout(() => {
        router.push("/investovanie/ponuky");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      {activeSlide <= slides.length ? (
        <>
          {slides.map((slide, index) => (
            <Box
              key={index}
              slide={slide}
              hidden={index !== activeSlide}
              onNextClick={handleNextSlide}
            />
          ))}

          <div
            className={`w-[80%] max-w-xl md:max-w-3xl min-h-1/2 bg-secondary rounded-lg flex flex-col p-8 absolute ${
              activeSlide < slides.length ? "hidden" : ""
            }`}
          >
            <div className="flex-1">
              <div className="text-white text-3xl text-center font-semibold mb-4">
                Kontaktne údaje
              </div>

              <div className="flex flex-col gap-2 items-center">
                <input
                  type="text"
                  placeholder="Meno / Názov firmy"
                  className="input input-bordered w-full max-w-xs bg-gray-700 text-white"
                />

                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs bg-gray-700"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-tertiary py-2 px-4 hover:bg-hover font-bold text-white rounded text-xl"
                onClick={handleNextSlide}
              >
                Ďalej
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-10 items-center px-10">
          <p className="text-2xl md:text-4xl text-center text-white">
            Vaše odpovede sa spracovávajú
          </p>
          <span className="loading loading-dots loading-lg text-tertiary"></span>
        </div>
      )}
    </div>
  );
};

export default Page;

const Box = ({ slide, hidden, onNextClick }) => {
  return (
    <div
      className={`w-[80%] max-w-xl md:max-w-3xl min-h-1/2 bg-secondary rounded-lg flex flex-col p-8 absolute ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="flex-1">
        <div className="text-white text-3xl text-center font-semibold mb-4">
          {slide.title}
        </div>

        <ul className="flex flex-col gap-2">
          {slide.questions.map((question, index) => (
            <Chip key={index} text={question} type={slide.type} />
          ))}
        </ul>
        <textarea
          className="textarea textarea-bordered w-full mt-4 bg-gray-200 text-black resize-none"
          placeholder="Niečo iné?"
          rows={3}
        ></textarea>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-tertiary py-2 px-4 hover:bg-hover font-bold text-white rounded text-xl"
          onClick={onNextClick}
        >
          Ďalej
        </button>
      </div>
    </div>
  );
};

const Chip = ({ text, type }) => {
  return (
    <label className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
      {type === "radio" ? (
        <input type="radio" class="peer radio" name={"filip"} />
      ) : (
        <input type="checkbox" class="peer checkbox" name={"filip"} />
      )}
      {text}
    </label>
  );
};
