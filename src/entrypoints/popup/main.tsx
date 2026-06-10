import React from "react";
import ReactDOM from "react-dom/client";
import { PopupApp } from "@/popup/app";
import "@/assets/tailwind.css";

document.documentElement.classList.add("bg-black");
document.body.classList.add("m-0", "p-0");

const root = document.getElementById("root");
if (!root) {
  throw new Error('Missing root element "#root"');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>
);
