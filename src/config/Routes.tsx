import React from "react";
import { Route } from "react-router-dom";
import Home from "../page/Home";
import PageIndex from "../page/Index";
import List from "../page/List";

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
    </Route>
  );
}

export default RoutesIndex;
