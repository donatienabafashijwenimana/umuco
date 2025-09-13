import React, { useState } from "react";
import { Search, BookOpen } from "lucide-react";

function Imiganimiremire() {
  const imigani_miremire = [
    "umugani wa ngunda",
    "bakame n'ipyisi",
    "maguru ya sarwaya",
    "petero nzukira",
  ];

  const [query, setQuery] = useState("");

  // filter by search
  const filteredStories = imigani_miremire.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-[98%] m-1 p-4 h-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-blue-50 rounded-xl p-4 shadow mb-6 gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
          📖 Inkuru n'Imigani Miremire
        </h2>
        <div className="relative w-full md:w-[350px]">
          <input
            type="text"
            className="w-full h-11 pl-10 pr-4 bg-white rounded-xl outline-none shadow-md border focus:ring-2 focus:ring-blue-400"
            placeholder="🔍 Shakira hano..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Grid of stories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.length > 0 ? (
          filteredStories.map((item, index) => (
            <div
              key={index}
              className="group w-full p-6 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-md flex items-center gap-3 cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <BookOpen className="text-blue-500 group-hover:text-blue-700" size={28} />
              <h2 className="text-xl font-medium capitalize group-hover:text-blue-600">
                {item}
              </h2>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-6">
            Tegereza gato...
          </p>
        )}
      </div>
    </div>
  );
}

export default Imiganimiremire;
