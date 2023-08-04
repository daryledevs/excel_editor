import { Routes, Route } from "react-router-dom";
import RoutesIndex from "./config/Routes";

function App() {
  return (
    <Routes>
      {RoutesIndex()}
      <Route path="*" element={<div>404 Not Found Page</div>}/> 
    </Routes>
  );
}

export default App
