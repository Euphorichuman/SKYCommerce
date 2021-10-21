import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GoogleAuthProvider } from "./providers/authentication";
import { APIProvider } from "./providers/API";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <GoogleAuthProvider>
      <BrowserRouter>
        <APIProvider>
          <App />
        </APIProvider>
      </BrowserRouter>
    </GoogleAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
