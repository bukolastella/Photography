"use client";
import React from "react";
import NavButton from "./NavButton";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full flex items-center justify-between gap-2 flex-wrap p-[5%] sm:px-6 py-4">
      <h1 onClick={() => router.push("/")}>Bukola Stella</h1>

      <div className=" flex items-center gap-2 sm:gap-6 flex-wrap">
        <NavButton text="Home" href="/" />
        <NavButton text="Collections" href="/collections" />
        <NavButton text="Enquiry" href="/enquiry" />
      </div>
    </header>
  );
};

export default Header;
