import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx";
import ColumnV2 from '../component/ColumnV2';
import ColumnV3 from '../component/ColumnV3';
import { useAppSelector } from '../redux/hooks/hooks';

function List() {
  const [data, setData] = useState<any>([]);
  const uploads = useAppSelector((state) => state.upload);

  return (
    <div style={{ width: "100%" }}>
      {uploads.length
        ? uploads.map((item, index) => {
            const getCurrentDateTime = () => {
              const currentDate = new Date();
              const options = {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              };
              return currentDate.toLocaleString("en-PH", options);
            };
            return (
              <div style={{ display: "flex", gap: "2%", marginLeft: "2%" }}>
                <p
                  style={{ fontWeight: "bold" }}
                  onClick={() => {
                    setData(item);
                  }}
                >
                  {item.filename}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Modified Date: </span>
                  {item.workbook.Props.ModifiedDate?.toLocaleString()}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Date:</span>{" "}
                  {getCurrentDateTime()}
                </p>
              </div>
            );
          })
        : null}
      {/* <label htmlFor="fileUpload"></label>
      <input
        onChange={handleFileUpload}
        type="file"
        id="fileUpload"
      /> */}
      {/* {data.length ? (
        <ColumnV2
          data={data}
          formulas={formulas}
        />
      ) : null} */}
      {Object.keys(data).length ? (
        <ColumnV3
          data={data.jsonWorksheet}
          formulas={data.extractedFormulas}
        />
      ) : null}
    </div>
  );
}

export default List
