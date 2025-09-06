import React, { useState } from "react";
import logo from "./assets/logo.svg";
import Dashboard from "./pages/dashboard";
import { swichpage } from "./store/pagestore";
import Imiganimigufi from "./pages/imigani-migufi";

function Homepage() {
  
  const {page,setpage} = swichpage()

  const [isOpen, setIsOpen] = useState(false);
  
  console.log(page)
  return (
    <div className="w-full h-auto shadow-lg">
      <div className="w-full bg-green-500 flex items-center justify-between p-3">
        <img
          src={logo}
          alt="logo"
          className="bg-white rounded-[18px] p-1 object-contain h-[60px] w-40 sm:w-20 sm:h-[20px] md:w-[100px] md:h-[80px] "
        />

        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
      <div
        className={`flex flex-col overflow-hidden md:flex-row bg-blue-300 text-[16px] md:text-[20px] 
          transition-all duration-300  px-3 gap-2
          ${isOpen ? "max-h-96" : "max-h-0 md:max-h-full"} `}
      >
        <button className={`text-black p-2 hover:bg-white hover:text-blue-500 w-full md:w-auto
        ${page=='ahabanza' ? 'bg-white':''}`}

        onClick={()=>setpage('ahabanza')}>
          Ahabanza
        </button>
        
        <button className={`text-black p-2 hover:bg-white hover:text-blue-500 w-full md:w-auto
        ${page=='imigani migufi' ? 'bg-white':''}`}
        onClick={()=>setpage('imigani migufi')}>
          Imigani migufi
        </button>
        <button className={`text-black p-2 hover:bg-white hover:text-blue-500 w-full md:w-auto
        ${page=='ibisakuzo' ? 'bg-white':''}`}
        onClick={()=>setpage('ibisakuzo')}>
          Ibisakuzo
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
      <div className="w-full max-h-400px] overflow-hidden">
        {page==='ahabanza' && <Dashboard/>}
        {page==='imigani migufi' && <Imiganimigufi/>}
      </div>
    </div>
  );
}

export default Homepage;
