import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from './redux/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={<App />}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
