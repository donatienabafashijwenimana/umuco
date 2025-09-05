import React from 'react'
import logo from './assets/logo.svg'
import Dashboard from './pages/dashboard'

function Homepage() {
  return (
    <div className='w-full h-auto shadow-12'>
      <div className="w-full bg-green-500 h-25 m-0 flex p-1 flex-row flex p-3 max-h-25 items-center justify-between">
          <span></span>
          <img src={logo} className='h-[100px] object-contain self-center m-0 p-0'/>
      </div>
      <div className="w-full flex flex-row bg-blue-300 h-15 justify-between text-[20px] px-10">
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50'>Ahabanza</button>
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50'>Ibisakuzo</button>
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50'>Imigani migufi</button>
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50'>Ikeshamvugo</button>
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50'>Imigani miremire</button>
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50'>Amateka</button>
      </div>
      <div className="w-full">
        <Dashboard/>
      </div>
    </div>
  )
}

export default Homepage
