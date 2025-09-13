import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Search } from "lucide-react";

function Ikeshamvugo() {
  const [data, setData] = useState({
    inka: [],
    ingoma: [],
    amata: [],
    isekuru: [],
  });
  const [query, setQuery] = useState("");

  const mainFunction = async (response) => {
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    return jsonData.filter((row) => row.length > 0);
  };

  useEffect(() => {
    const fetchExcel = async () => {
      const files = [
        { key: "inka", path: "/document/ikeshamvugo/ikeshamvugo-inka.xlsx" },
        { key: "ingoma", path: "/document/ikeshamvugo/ikeshamvugo-ingoma.xlsx" },
        { key: "amata", path: "/document/ikeshamvugo/ikeshamvugo-amata-igisabo.xlsx" },
        {
          key: "isekuru",
          path: "/document/ikeshamvugo/isekuru-icyansi-umuheto-ingobyi-igisabo.xlsx",
        },
      ];

      const newData = {};
      for (let file of files) {
        const res = await fetch(file.path);
        newData[file.key] = await mainFunction(res);
      }
      setData(newData);
    };
    fetchExcel();
  }, []);

  const filterRows = (rows) =>
    rows.filter(
      (row) =>
        row[0]?.toString().toLowerCase().includes(query.toLowerCase()) ||
        row[1]?.toString().toLowerCase().includes(query.toLowerCase())
    );

  const sections = [
    { title: "📝 1. Ikeshamvugo kunka", key: "inka" },
    { title: "📝 2. Ikeshamvugo kungoma", key: "ingoma" },
    { title: "📝 3. Ikeshamvugo kumata n'igisabo", key: "amata" },
    { title: "📝 4. Ikeshamvugo ku isekuru, urusyo, icyansi, umuheto, ingobyi n'igisabo", key: "isekuru" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold text-purple-700">💬 Ikeshamvugo</h1>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="🔍 Shakira hano..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-purple-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => {
        const rows = filterRows(data[section.key] || []).slice(1); // skip header
        return (
          <div key={section.key} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4">
            <h2 className="text-xl md:text-2xl font-semibold text-purple-600 mb-4">{section.title}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-purple-100 text-purple-800 font-semibold">
                  <tr>
                    <th className="p-3 text-center">#</th>
                    <th className="p-3 text-lg font-medium">Ntibavuga</th>
                    <th className="p-3 text-lg font-medium">Bavuga</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length > 0 ? (
                    rows.map((row, i) => (
                      <tr key={i} className="hover:bg-purple-50 transition border-b last:border-none">
                        <td className="p-3 text-center">{i + 1}</td>
                        <td className="p-3 text-left text-lg">{row[0]}</td>
                        <td className="p-3 text-left text-purple-700 text-lg">{row[1]}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="p-6 text-center text-gray-500">
                        Nta bishamvugo byabonetse 🔍
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Ikeshamvugo;
