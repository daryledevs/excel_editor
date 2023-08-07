import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx";
import ColumnV2 from '../component/ColumnV2';
import ColumnV3 from '../component/ColumnV3';
import SpreadSheet from './SpreadSheet';
import { useAppSelector } from '../redux/hooks/hooks';
import { useNavigate } from "react-router-dom";
import { options } from '../assets/data/date.options';

function List() {
  const [data, setData] = useState<any>([]);
  const uploads = useAppSelector((state) => state.upload);
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%" }}>
      {uploads.length
        ? uploads.map((item, index) => {
            const getCurrentDateTime = () => {
              const currentDate = new Date();
              return currentDate.toLocaleString("en-PH", options);
            };
            return (
              <div 
                style={{ display: "flex", gap: "2%", marginLeft: "2%" }}
                >
                <p
                  style={{ fontWeight: "bold" }}
                  onClick={() => {
                    setData(item);
                    navigate("/spread-sheet", { state: { data: item } });
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
    </div>
  );
}

export default List
