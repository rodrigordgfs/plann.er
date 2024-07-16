import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { TripContextProvider } from "./context/trip-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TripContextProvider>
      <App />
      <ToastContainer />
    </TripContextProvider>
  </React.StrictMode>
);
