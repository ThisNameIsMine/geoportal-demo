"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    title: "Kto ste?",
    questions: ["Firma", "Investor", "Startup", "Iný"],
    type: "radio",
    backgroundImage: "/images/background3.jfif", // Replace with actual image URL
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
    backgroundImage: "/images/background4.jpg", // Replace with actual image URL
  },
  {
    title: "Koľko mate finančných prostriedkov?",
    questions: [
      "Menej ako 10 tisíc eur",
      "10 tisíc eur - 100 tisíc eur",
      "100 tisíc eur - 1 milion eur",
      "1 milion eur a viac",
    ],
    type: "radio",
    backgroundImage: "/images/background5.jpg", // Replace with actual image URL
  },
  {
    title: "Aký je váš investičný horizont?",
    questions: ["1-3 roky", "3-5 rokov", "5-10 rokov", "10+ rokov"],
    type: "radio",
    backgroundImage: "/images/background6.jpg", // Replace with actual image URL
  },
  {
    title: "Vyberte etapu investície:",
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
    backgroundImage: "/images/background7.jpg" // Replace with actual image URL
  },
  {
    title: "Vyberte risk:",
    questions: ["Nízky", "Stredný", "Vysoký"],
    type: "radio",
    backgroundImage: "/images/background8.jpg", // Replace with actual image URL
  },
  {
    title: "Vyberte typ účasti:",
    questions: ["Hands-off", "Poradenská", "Aktívna účasť"],
    type: "radio",
    backgroundImage: "/images/background9.jpg", // Replace with actual image URL
  },
];

const Page = () => {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNextSlide = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide((prev) => prev + 1);
    } else {
      setIsProcessing(true);

      // After 2 seconds, redirect to the next page
      setTimeout(() => {
        router.push("/investovanie/ponuky");
      }, 2000);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-primary py-20"
      style={{
        backgroundImage: !isProcessing
          ? `url(${slides[activeSlide].backgroundImage})`
          : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!isProcessing ? (
        slides.map((slide, index) => (
          <Box
            key={index}
            slide={slide}
            hidden={index !== activeSlide}
            onNextClick={handleNextSlide}
          />
        ))
      ) : (
        // Show "processing" animation after the last slide
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
      className={`w-[80%] max-w-xl md:max-w-3xl min-h-1/2 bg-secondary bg-opacity-50 rounded-lg flex flex-col p-4 md:p-8 backdrop-blur-sm ${
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
        <input type="radio" className="peer radio" name={"filip"} />
      ) : (
        <input type="checkbox" className="peer checkbox" name={"filip"} />
      )}
      {text}
    </label>
  );
};
