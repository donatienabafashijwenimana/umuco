import React from 'react'
import logo from './assets/logo.svg'

function Homepage() {
  return (
    <div className='w-full h-auto shadow-12'>
      <div className="w-full bg-green-500 h-25 m-0 flex p-1 flex-row flex p-3 max-h-25 items-center justify-left sm:w-[10px]">
        
          <img src={logo} className='h-[100px] object-contain self-center m-0 p-0'/>
      </div>
      <div className="w-full flex flex-row bg-blue-300 h-15 justify-between text-[20px] px-10">
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50 sm:text-[1px]'>Ahabanza</button>
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50 sm:text-[1px]'>Ibisakuzo</button>
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50 sm:text-[1px]'>Imigani migufi</button>
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50 sm:text-[1px]'>Ikeshamvugo</button>
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50 sm:text-[1px]'>Imigani miremire</button>
        <button className='text-black p-2 hover:bg-white hover:text-blue-500 w-50 sm:text-[1px]'>Amateka</button>
      </div>
    </div>
  )
}

export default Homepage
