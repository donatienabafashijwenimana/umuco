import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function Ibisakuzo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExcel = async () => {
      try {
        const response = await fetch("/document/ibisakuzo.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet,{header:1});
        const cleanData = jsonData.filter(row => row.length > 0);
        setData(cleanData);
      } catch (error) {
        console.error("Error reading excel:", error);
      }
    };

    fetchExcel();
  }, []);

  return (
    <div className="p-4">
      <div className="flex w-full shadow-lg p-2 my-4 justify-between items-center ">
        <h2 className="text-[24px]">Ibisakuzo</h2>
        <input type="text" className="w-[400px] rounded outline-none h-10 p-1 shadow-xl border" placeholder="Shakira hano"/>
      </div>

      <table className="border border-gray-300 w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Ibisakuzo</th>
            <th className="p-2 border">Igisubizo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{row[0] || ""}</td>
              <td className="p-2 border">{row[1] || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ibisakuzo;
