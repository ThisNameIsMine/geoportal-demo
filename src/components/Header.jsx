import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-end">
      <Link
        href="/investovanie"
        className="bg-tertiary py-2 px-4 text-white font-bold rounded-md hover:scale-105 transition-transform"
      >
        Chcem investovať
      </Link>
    </div>
  );
};

export default Header;
