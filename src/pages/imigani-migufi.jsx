import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Quote, Search } from "lucide-react";

function Imiganimigufi() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchExcel = async () => {
      try {
        const response = await fetch("/document/imigani-migufi.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const flatArray = jsonData.filter((row) => row.length > 0);
        setData(flatArray);
      } catch (error) {
        console.error("Error reading excel:", error);
      }
    };
    fetchExcel();
  }, []);

  // 🔍 Filter proverbs based on query
  const filteredData = data.filter((row) =>
    row[0]?.toString().toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-3 md:space-y-0">
        <h2 className="text-2xl font-bold text-purple-700 flex gap-2">
           <Quote size={20} /> Imigani Migufi / Imigenurano
        </h2>

        <div className="relative w-full md:w-[350px]">
          <input
            type="text"
            placeholder="🔍 Shakira hano..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-green-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-green-100 text-purple-800 font-semibold">
            <tr>
              <th className="p-3 text-center">#</th>
              <th className="p-3 text-lg text-left">Umugani mugufi / Umugenurano</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-green-50 transition border-b last:border-none"
                >
                  <td className="p-3 text-center">{i + 1}</td>
                  <td className="p-3 text-lg text-left">{row[0]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-6 text-center text-gray-500">
                  Tegereza gato...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Imiganimigufi;
