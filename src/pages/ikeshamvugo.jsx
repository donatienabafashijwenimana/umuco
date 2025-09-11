import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

function Ikeshamvugo() {
  const [data_inka, setData_inka] = useState([])
  const [data_ingoma, setData_ingoma] = useState([])
  const [data_amata, setData_amata] = useState([])
  const [data_isekuru, setData_isekuru] = useState([])


  const mainfunction = async(response)=>{
        const arraybuffer = await response.arrayBuffer()
        const workbook = XLSX.read(arraybuffer, { type: 'array' })
        const sheetname = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetname]
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })
        const finalarraydata = jsonData.filter(row => row.length > 0)
        return finalarraydata
    }
  useEffect(() => {
    const fetchexcel = async () => {
      const file1 = await fetch('/document/ikeshamvugo/ikeshamvugo-inka.xlsx')
      const file2 = await fetch('/document/ikeshamvugo/ikeshamvugo-ingoma.xlsx')
      const file3 = await fetch('/document/ikeshamvugo/ikeshamvugo-amata-igisabo.xlsx')
      const file4 = await fetch('/document/ikeshamvugo/isekuru-icyansi-umuheto-ingobyi-igisabo.xlsx')
      var d = await mainfunction(file1)
      setData_inka(d)
      d = await mainfunction(file2)
      setData_ingoma(d)
      d = await mainfunction(file3)
      setData_amata(d)
      d = await mainfunction(file4)
      setData_isekuru(d)
      console.log(d)
    }
    fetchexcel()
  }, [])

  return (
    <div className='w-full p-3'>
      <div className="w-full items-center p-3 flex justify-between">
        <h1 className="text-[35px] font-semibold">Ikeshamvugo</h1>
        <input
          type="text"
          placeholder="Shakira hano"
          className="w-80 border rounded outline-none shadow-lg p-1"
        />
      </div>

      <h2 className='text-[30px] text-blue-500'><u>1.Ikeshamvugo kunka</u></h2>

      <table className="border border-gray-400 w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Ntibavuga</th>
            <th className="border p-2">Bavuga</th>
          </tr>
        </thead>
        <tbody>
          {data_inka.slice(1).map((row, i) => ( // skip header row
            <tr key={i}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{row[0]}</td>
              <td className="border p-2">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className='text-[30px] text-blue-500'><u>2.Ikeshamvugo kungoma</u></h2>

      <table className="border border-gray-400 w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Ntibavuga</th>
            <th className="border p-2">Bavuga</th>
          </tr>
        </thead>
        <tbody>
          {data_ingoma.slice(1).map((row, i) => ( // skip header row
            <tr key={i}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{row[0]}</td>
              <td className="border p-2">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className='text-[30px] text-blue-500'><u>3.Ikeshamvugo kumata n'igisabo</u></h2>

      <table className="border border-gray-400 w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Ntibavuga</th>
            <th className="border p-2">Bavuga</th>
          </tr>
        </thead>
        <tbody>
          {data_amata.slice(1).map((row, i) => ( // skip header row
            <tr key={i}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{row[0]}</td>
              <td className="border p-2">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className='text-[30px] text-blue-500'><u>2.Ikeshamvugo ku isekuru,urusyo,icyansi,umuheto,ingobyi n'igisabo</u></h2>

      <table className="border border-gray-400 w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Ntibavuga</th>
            <th className="border p-2">Bavuga</th>
          </tr>
        </thead>
        <tbody>
          {data_isekuru.slice(1).map((row, i) => ( // skip header row
            <tr key={i}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{row[0]}</td>
              <td className="border p-2">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Ikeshamvugo
