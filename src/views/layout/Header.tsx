import React from "react";
import NavButton from "./NavButton";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between gap-2 flex-wrap p-[5%] sm:px-6 py-4">
      <h1>Bukola Stella</h1>

      <div className=" flex items-center gap-2 sm:gap-6 flex-wrap">
        <NavButton text="Home" />
        <NavButton text="Collections" />
        <NavButton text="Enquiry" />
      </div>
    </header>
  );
};

export default Header;
