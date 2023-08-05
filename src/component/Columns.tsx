import React, { useEffect, useState } from 'react'
import { testData } from '../assets/data/columns.data'
import { createStringIdGenerator } from "../util/stringGenerator";

function Columns() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const generator = createStringIdGenerator();
    const header = testData[0].map(() => generator.next());
    let instance: any[] =testData.unshift(header);
    instance = testData.map((item: any[], index: number) => {
      if (index) item.unshift(index);
      else item.unshift("");
      return item;
    });
    setData(instance);

  }, [])

  const handleInputChange = (rowIndex: number, columnIndex: number, value: string) => {
    setData((prevData:any) => {
      const newData = prevData.map((row:any, idx:any) => {
        if (idx === rowIndex) {
          return row.map((cell:any, cellIdx:any) => (cellIdx === columnIndex ? value : cell));
        }
        return row;
      });
      return newData;
    });
  };

  return (
    <div className="column__container">
      <div className="column__fields">
        {data?.map((rows: any[], rowIndex: number) => {
          return (
            <div key={rowIndex} className="column__parent">
              {rows.map((row: any, columnIndex: number) => {
                return (
                  <div key={columnIndex} className={columnIndex ? 'columns__rows' : 'column__row-number'}>
                    {!columnIndex ? (
                      <p>{row}</p>
                    ) : (
                      <input value={row} onChange={(e) => handleInputChange(rowIndex, columnIndex, e.target.value)} />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Columns
