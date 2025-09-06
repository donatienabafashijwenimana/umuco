// Import React and hooks
import React, { useEffect, useState } from "react";
// Import XLSX library for reading Excel files
import * as XLSX from "xlsx";

function Imiganimigufi() {
  // React state to store data read from Excel
  const [data, setData] = useState([]);

  // useEffect runs once when the component mounts
  useEffect(() => {
    const fetchExcel = async () => {
      try {
        // Fetch the Excel file from the public/document folder
        const response = await fetch("/document/imigani-migufi.xlsx");
        // Convert response into ArrayBuffer (binary data)
        const arrayBuffer = await response.arrayBuffer();

        // Read the Excel file into a workbook object
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        // Get the name of the first sheet
        const sheetName = workbook.SheetNames[0];
        // Get the actual sheet by its name
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet into JSON (array of objects, each row = object)
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // 🔥 Flatten the data into a single array (1D array)
        // flatMap → loops through each row, extracts all values, and merges them
        const flatArray = jsonData.flatMap(row => Object.values(row));

        // Save the flattened data into state
        setData(flatArray);
      } catch (error) {
        // Catch and log any errors
        console.error("Error reading excel:", error);
      }
    };

    // Call the async function to fetch Excel
    fetchExcel();
  }, []); // Empty dependency → runs only once

  return (
    <div className="p-4">
      {/* Page title */}
      <h2 className="text-[24px] shadow-lg mb-7">Imigani Migufi/imigani y'imigenurano</h2>

        <table className="border border-gray-300 w-full text-left">
            <thead className="bg-gray-200">
                <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Umugani mugufi / Umugenurano</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">{item}</td>
                </tr>
                ))}
            </tbody>
        </table>

    </div>
  );
}

// Export the component so it can be imported in Homepage.jsx
export default Imiganimigufi;
