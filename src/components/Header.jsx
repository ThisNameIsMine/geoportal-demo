import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-end">
      <Link
        href="/investovanie"
        className="bg-gray-200 py-2 px-4 text-primary font-bold rounded-md hover:scale-105 transition-transform"
      >
        Chcem investovat
      </Link>
    </div>
  );
};

export default Header;
