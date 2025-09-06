import React from 'react'
import logo from './assets/logo.svg'
import Dashboard from './pages/dashboard'

function Homepage() {
  return (
    <div className="w-full h-auto shadow-lg">
      {/* Header */}
      <div className="w-full bg-green-500 flex flex-row items-center justify-between p-3">
        <span></span>
        <img
          src={logo}
          className="h-[60px] md:h-[100px] object-contain self-center"
          alt="logo"
        />
      </div>

      {/* Navigation bar */}
      <div className="w-full flex flex-wrap md:flex-row bg-blue-300 justify-center md:justify-between text-[16px] md:text-[20px] px-2 md:px-10">
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full sm:w-auto">
          Ahabanza
        </button>
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full sm:w-auto">
          Ibisakuzo
        </button>
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full sm:w-auto">
          Imigani migufi
        </button>
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full sm:w-auto">
          Ikeshamvugo
        </button>
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full sm:w-auto">
          Imigani miremire
        </button>
        <button className="text-black p-2 hover:bg-white hover:text-blue-500 w-full sm:w-auto">
          Amateka
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <Dashboard />
      </div>
    </div>
  )
}

export default Homepage
