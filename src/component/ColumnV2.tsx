/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import * as XLSX from "xlsx";

function ColumnV2({ data, formulas }: any) {
  console.log(data);
   const [tableData, setTableData] = useState(data);

  const handleSaveToExcel = () => {
    const copyOfData = [...tableData];

    // Create a new workbook and sheet
    const workbook = XLSX.utils.book_new();
    const sheetData = copyOfData.map((row) => Object.values(row));
    const sheet = XLSX.utils.aoa_to_sheet([
      Object.keys(copyOfData[0]),
      ...sheetData,
    ]);

    // Add the sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");

    // Save the Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const excelDataUrl = URL.createObjectURL(excelData);

    // Create a link element and click it programmatically
    const link = document.createElement("a");
    link.href = excelDataUrl;
    link.download = "output.xlsx";
    link.click();

    // Release the object URL to free up resources
    URL.revokeObjectURL(excelDataUrl);
  };

   
  const handleCellChange = (event, rowIndex, columnName) => {
    const { value } = event.target;
    const updatedData = [...tableData];
    updatedData[rowIndex][columnName] = value;
    setTableData(updatedData);
  };

  return (
    <div>
      <div className="column-v-two__container">
        {Object.keys(data[0]).map((header, columnIndex) => (
          <div
            className="column-v-two__column"
            key={columnIndex}
          >
            <div className="column-v-two__header">
              {header !== "row" ? <p className="second">{header}</p> : null}
            </div>
            {data.map((items, rowIndex) => (
              <div
                className="column-v-two__cell"
                key={rowIndex}
              >
                {header !== "row" ? (
                  <input
                    value={tableData[rowIndex][header]}
                    className="column-v-two__row"
                    onChange={(event) =>
                      handleCellChange(event, rowIndex, header)
                    }
                  />
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleSaveToExcel}>Save to Excel</button>
    </div>
  );
}

export default ColumnV2
