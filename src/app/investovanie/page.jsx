"use client";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country:"",
    sector: "",
    budget: "",
    stage:"",
    risk:"",
    involvement:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., sending data to an API
    console.log(formData);
  };

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
                <label className="block text-left mb-2 font-semibold">Meno:</label>
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
                <label className="block text-left mb-2 font-semibold">Email:</label>
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
                <label className="block text-left mb-2 font-semibold">Tel. číslo:</label>
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
                <label className="block text-left mb-2 font-semibold">Krajina:</label>
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
                <label className="block text-left mb-2 font-semibold">Sektor:</label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Vyberte sektor</option>
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
                <label className="block text-left mb-2 font-semibold">Rozpočet:</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Vyberte rozpočet</option>
                  <option value="10000">10,000 a menej</option>
                  <option value="100000">100,000 a menej</option>
                  <option value="1000000">1,000,000 a menej</option>
                </select>
              </div>

              {/* Budget dropdown */}
              <div>
                <label className="block text-left mb-2 font-semibold">Etapa investície:</label>
                <select
                  name="stage"
                  value={formData.budget}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Vyberte etapu</option>
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
                <label className="block text-left mb-2 font-semibold">Risk:</label>
                <select
                  name="risk"
                  value={formData.budget}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Vyberte risk</option>
                  <option value="low">Nízky</option>
                  <option value="medium">Stredný</option>
                  <option value="high">Vysoký</option>
                </select>
              </div>

              {/* Budget dropdown */}
              <div>
                <label className="block text-left mb-2 font-semibold">Typ účasti:</label>
                <select
                  name="involvement"
                  value={formData.budget}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Vyberte typ účasti</option>
                  <option value="handsoff">Hands-off</option>
                  <option value="advisory">Poradenská</option>
                  <option value="active">Aktívna účasť</option>
                </select>
              </div>

              {/* Submit button */}
              <div>
                <button type="submit" className="btn btn-primary w-full">Potvrdiť</button>
              </div>
            </form>
            {/* Form ends here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

