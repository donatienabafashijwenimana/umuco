import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function Imiganimigufi() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchExcel = async () => {
      try {
        const response = await fetch("/document/imigani-migufi.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet,{header:1});
        const flatArray = jsonData.filter(row => row.length > 0);
        setData(flatArray);
        console.log(flatArray)
      } catch (error) {
        console.error("Error reading excel:", error);
      }
    };
    fetchExcel();
  }, []);

  return (
    <div className="p-4">
      <div className="flex w-full shadow-lg p-2 my-4 justify-between items-center ">
        <h2 className="text-[24px]">Imigani Migufi/imigani y'imigenurano</h2>
        <input type="text" className="w-[400px] rounded outline-none h-10 p-1 shadow-xl border" placeholder="Shakira hano"/>
      </div>
        <table className="border border-gray-300 w-full text-left">
            <thead className="bg-gray-200">
                <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Umugani mugufi / Umugenurano</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, i) => (
                <tr key={i} >
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">{item[0]}</td>
                </tr>
                ))}
            </tbody>
        </table>

    </div>
  );
}
export default Imiganimigufi;
