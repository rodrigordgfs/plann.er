import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-day-picker/dist/style.css";
import { ToastContainer } from "react-toastify";
import { TripContextProvider } from "./context/trip-context";
import { AuthContextProvider } from "./context/auth-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TripContextProvider>
        <App />
        <ToastContainer />
      </TripContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
