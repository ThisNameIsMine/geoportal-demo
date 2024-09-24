"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    title: "Kto ste",
    questions: ["Firma", "Investor", "Startup", "Iny"],
    type: "radio",
  },
  {
    title: "Prečo chcete investovať?",
    questions: ["neico", "nieco", "nieco", "lebo mam lovaky"],
    type: "checkbox",
  },
  {
    title: "Kolko mate penazi?",
    questions: ["menej ako 10k", "10k - 100k", "100k - 1M", "1M a viac"],
    type: "radio",
  },
  {
    title: "Nadpis text daco...",
    questions: ["menej ako 10k", "10k - 100k", "100k - 1M", "1M a viac"],
    type: "checkbox",
  },
];

const Page = () => {
  const router = useRouter();

  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = () => {
    setActiveSlide((prev) => prev + 1);

    if (activeSlide + 1 === slides.length) {
      setTimeout(() => {
        router.push("/investovanie/ponuky");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      {activeSlide < slides.length ? (
        <>
          {slides.map((slide, index) => (
            <Box
              key={index}
              slide={slide}
              hidden={index !== activeSlide}
              onNextClick={handleNextSlide}
            />
          ))}
        </>
      ) : (
        <div className="flex flex-col gap-10 items-center">
          <p className="text-4xl text-center text-white">
            vyhodnocujem vase data
          </p>
          <span className="loading loading-dots loading-lg text-tertiary"></span>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-sm md:max-w-xl">
            <h1 className="text-2xl font-bold mb-6">Čo Vás zaujíma?</h1>

            {/* Form starts here */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-20">
                {/* Name field */}
                <div>
                  <label className="block text-left mb-2 font-semibold">
                    Meno:
                  </label>
                  <input
                    type="text"
                    name="Meno"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Zadajte meno"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Email field */}
                <div>
                  <label className="block text-left mb-2 font-semibold">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Zadajte email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-20">
                {/* Phone Number field */}
                <div>
                  <label className="block text-left mb-2 font-semibold">
                    Tel. číslo:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Zadajte tel. číslo"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* country */}
                <div>
                  <label className="block text-left mb-2 font-semibold">
                    Krajina:
                  </label>
                  <input
                    type="country"
                    name="country"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Zadajte krajinu"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              {/* Sector dropdown */}
              <div>
                <label className="block text-left mb-2 font-semibold">
                  Sektor:
                </label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Vyberte sektor
                  </option>
                  <option value="transport">Transport</option>
                  <option value="health">Zdravotníctvo</option>
                  <option value="nature">Príroda</option>
                  <option value="living">Bývanie</option>
                  <option value="education">Vzdelanie</option>
                  <option value="energy">Energetika</option>
                  <option value="farming">Poľnohospodárstvo</option>
                  <option value="industry">Priemysel</option>
                  <option value="finance">Finančníctvo</option>
                  <option value="tourism">Cestovný Ruch</option>
                  <option value="Economy">Economika</option>
                </select>
              </div>

              {/* Budget dropdown */}
              <div>
                <label className="block text-left mb-2 font-semibold">
                  Rozpočet:
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Vyberte rozpočet
                  </option>
                  <option value="10000">10,000 a menej</option>
                  <option value="100000">100,000 a menej</option>
                  <option value="1000000">1,000,000 a menej</option>
                </select>
              </div>

              {/* Budget dropdown */}
              <div>
                <label className="block text-left mb-2 font-semibold">
                  Etapa investície:
                </label>
                <select
                  name="stage"
                  value={formData.budget}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Vyberte etapu
                  </option>
                  <option value="early">Skorý Startup</option>
                  <option value="seriea">Seria A</option>
                  <option value="serieb">Seria B a ďalej</option>
                  <option value="late">Neskorá etapa spoločnosti</option>
                  <option value="m&a">M&A</option>
                  <option value="realestate">Nehnuteľnosti</option>
                  <option value="venture">Venture Capital</option>
                  <option value="IPO">IPO</option>
                </select>
              </div>

              {/* Budget dropdown */}
              <div>
                <label className="block text-left mb-2 font-semibold">
                  Risk:
                </label>
                <select
                  name="risk"
                  value={formData.budget}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Vyberte risk
                  </option>
                  <option value="low">Nízky</option>
                  <option value="medium">Stredný</option>
                  <option value="high">Vysoký</option>
                </select>
              </div>

              {/* Budget dropdown */}
              <div>
                <label className="block text-left mb-2 font-semibold">
                  Typ účasti:
                </label>
                <select
                  name="involvement"
                  value={formData.budget}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Vyberte typ účasti
                  </option>
                  <option value="handsoff">Hands-off</option>
                  <option value="advisory">Poradenská</option>
                  <option value="active">Aktívna účasť</option>
                </select>
              </div>

              {/* Submit button */}
              <div>
                <button type="submit" className="btn btn-primary w-full">
                  Potvrdiť
                </button>
              </div>
            </form>
            {/* Form ends here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

const Box = ({ slide, hidden, onNextClick }) => {
  return (
    <div
      className={`w-1/2 min-h-1/2 bg-secondary rounded-lg flex flex-col p-8 absolute ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="flex-1">
        <div className="text-white text-3xl text-center font-semibold mb-4">
          {slide.title},
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
