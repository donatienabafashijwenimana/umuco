import React from 'react'

function Imiganimiremire() {

  
    const imigani_miremire = ["umugani wa ngunda",
                              "bakame n'ipyisi",
                              "maguru ya sarwaya",
                              "petero nzukira"
                             ]
  return (
    <div className='w-[98%] m-3 p-3 h-auto shadow-xl'>
        <div className="flex w-full  bg-blue-50 p-2 my-4 justify-between items-center ">
            <h2 className="text-[30px]">Inkuru n'imiganimiremire</h2>
            <input type="text" className="w-[400px] bg-white rounded outline-none h-10 p-1 shadow-xl border" placeholder="Shakira hano"/>
        </div>
        {imigani_miremire.map((item,index)=>(
            <div className="w-full h-30 shadow-lg p-3 capitalize mt-2 rounded-xl flex items-center text-[25px] hover:shadow-xl hover:text-blue-500 cursor-pointer">
                <h2>{item}</h2>
            </div>
        ))}

      
    </div>
  )
}

export default Imiganimiremire
