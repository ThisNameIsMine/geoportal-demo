import React from "react";

import Link from "next/link";
import { investmentOpportunities } from "./items";

const page = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-primary font-bold text-5xl text-center">
          Možnosti <span className="text-secondary uppercase">práve</span> pre
          vás
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-[1000px] mx-auto">
          {investmentOpportunities.map((opportunity, index) => (
            <Link
              key={index}
              href={"/investovanie/ponuky/" + index}
              className="card bg-primary shadow-xl hover:scale-105 transition-transform"
            >
              <div className="card-body">
                <h2 className="card-title text-white text-2xl">
                  {opportunity.title}
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <p className="text-right">{opportunity.pozadovanaHodnota}€</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center py-4 pt-8">
          <button className="bg-tertiary text-white font-bold text-xl py-4 w-1/2 rounded-lg hover:scale-105 transition-transform">
            Máš vlastný nápad? Kontaktuj nás!
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
