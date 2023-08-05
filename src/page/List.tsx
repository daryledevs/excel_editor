import React, { useState } from 'react'
import * as XLSX from "xlsx";
import ColumnV2 from '../component/ColumnV2';

function List() {
  const [data, setData] = useState<any>([]);
  const [formulas, setFormulas] = useState<any>([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target.result;
        const workbook = XLSX.read(fileData, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonWorksheet = XLSX.utils.sheet_to_json(worksheet, {
          raw: true,
        });

        setData(jsonWorksheet);
        console.log("jsonWorksheet: ", jsonWorksheet);

        // Extract and store formulas separately
        const extractedFormulas = [];
        for (const cellAddress in worksheet) {
          if (!worksheet.hasOwnProperty(cellAddress)) continue;
          
          const cell = worksheet[cellAddress];
          if (cell.f) {
            extractedFormulas.push({ cell: cellAddress, formula: cell.f });
          }
        }
        setFormulas(extractedFormulas);
        console.log("extractedFormulas", extractedFormulas);
      };
      reader.readAsBinaryString(file);
    }
  };


  return (
    <div style={{ width: "100%" }}>
      <label htmlFor="fileUpload"></label>
      <input
        onChange={handleFileUpload}
        type="file"
        id="fileUpload"
      />
      {data.length ? (
        <ColumnV2
          data={data}
          formulas={formulas}
        />
      ) : null}
    </div>
  );
}

export default List
