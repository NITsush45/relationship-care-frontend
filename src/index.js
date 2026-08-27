import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { SessionProvider } from "./context/SessionContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <SessionProvider>
          <App />
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();