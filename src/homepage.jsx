import React, { useState } from "react";
import logo from "./assets/logo.svg";
import Dashboard from "./pages/dashboard";

function Homepage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-auto shadow-lg">
      <div className="w-full bg-green-500 flex items-center justify-between p-3">
        <img
          src={logo}
          alt="logo"
          className="h-[60px] md:h-[100px] object-contain"
        />
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
      <div
        className={`flex flex-col md:flex-row bg-blue-300 text-[16px] md:text-[20px] 
          transition-all duration-300 overflow-hidden 
          ${isOpen ? "max-h-96" : "max-h-0 md:max-h-full"}`}
      >
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full md:w-auto">
          Ahabanza
        </button>
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full md:w-auto">
          Ibisakuzo
        </button>
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full md:w-auto">
          Imigani migufi
        </button>
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full md:w-auto">
          Ikeshamvugo
        </button>
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full md:w-auto">
          inkuru n'Imigani miremire
        </button>
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full md:w-auto">
          insigamugani
        </button>
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full md:w-auto">
          Amateka
        </button>
      </div>
      <Dashboard/>
    </div>
  );
}

export default Homepage;
