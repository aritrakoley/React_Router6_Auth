import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import InterceptorInitializer from "./components/InterceptorInitializer";

ReactDOM.render(
  <BrowserRouter>
    <InterceptorInitializer />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
