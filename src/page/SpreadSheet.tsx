import React from 'react'
import ColumnV3 from '../component/ColumnV3';
import { useLocation } from "react-router-dom";

function SpreadSheet() {
  const { state } = useLocation();
  return (
    <div className="spread-sheet__container">
      {Object.keys(state.data).length ? (
        <ColumnV3
          data={state.data.jsonWorksheet}
          formulas={state.data.extractedFormulas}
        />
      ) : null}
    </div>
  );
}

export default SpreadSheet
