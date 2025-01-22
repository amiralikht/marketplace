import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./styles/index.css";
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/tailwind-light/theme.css";
import './utils/fontawesome.js'

ReactDOM.createRoot(document.getElementById("root")).render(
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
);
