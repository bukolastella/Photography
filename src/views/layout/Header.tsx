import React from "react";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between gap-6 flex-wrap p-6">
      <h1>B.stella</h1>

      <div className=" flex items-center gap-6">
        <button>Home</button>
        <button>Collections</button>
        <button>Enquiry</button>
      </div>
    </header>
  );
};

export default Header;
