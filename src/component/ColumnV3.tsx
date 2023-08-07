import React, { useEffect, useState } from "react";
import { createStringIdGenerator } from "../util/stringGenerator";

function ColumnV3({ data, formulas }: any) {
  const generator = createStringIdGenerator();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  function element(index: any, content:any){
    const styles = { width: "3vh", textAlign: "center" as const };
    if(!index && content === "_") return <p style={{ ...styles, color: "white" }}>{content}</p>;
    if(!index) return <p style={styles}>{content}</p>;
    return null
  }

 const handleHeaderChange = (event, oldName) => {
   const { value } = event.target;
   const renameMap = { [oldName]: value};
   const updatedTableData = tableData.map((obj) =>
     Object.fromEntries(
       Object.entries(obj).map(([key, value]) => [renameMap[key] ?? key, value])
     )
   );

   setTableData(updatedTableData);
 };

  const handleCellChange = (event, rowIndex, columnName) => {
    const { value } = event.target;
    let updatedData = [...tableData];
    updatedData[rowIndex][columnName] = value;
    setTableData(updatedData);
  };

  return (
    <div className="column-v-three__container">
      <div className="column-v-three__parent">
        {tableData?.length ? Object
          .keys(tableData?.[0])
          .map((header, columnIndex) => (
            <div
              className="column-v-three__column"
              key={columnIndex}
            >
              <div className="column-v-three__label">
                {element(columnIndex, "_")}
                <p>{generator.next()}</p>
              </div>
              <div className="column-v-three__header">
                {element(columnIndex, 1)}
                <input
                  value={header}
                  onChange={(event) => handleHeaderChange(event, header)}
                />
              </div>
              {tableData?.map((items, rowIndex) => (
                <div
                  className="column-v-three__row"
                  key={rowIndex}
                >
                  <div className="column-v-three__row-cell">
                    {element(columnIndex, rowIndex + 2)}
                    <input
                      value={tableData?.[rowIndex][header]}
                      onChange={(event) =>
                        handleCellChange(event, rowIndex, header)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )) : null}
      </div>
    </div>
  );
}

export default ColumnV3;
