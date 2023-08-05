import React from "react";
import { Route } from "react-router-dom";
import Home from "../page/Home";
import PageIndex from "../page/Index";
import List from "../page/List";
import SpreadSheet from "../page/SpreadSheet";

function RoutesIndex() {
  return (
    <Route
      path="/"
      element={<PageIndex />}
    >
      <Route
        index
        element={<Home />}
      />
      <Route
        path="/list"
        element={<List />}
      />
      <Route
        path="/spread-sheet"
        element={<SpreadSheet />}
      />
    </Route>
  );
}

export default RoutesIndex;
