console.log("main.tsx is executing!");

import { createRoot } from "react-dom/client";

console.log("imports loaded!");

import App from "./App";

console.log("App imported!");

const rootElement = document.getElementById("root");
console.log("root element:", rootElement);

if (rootElement) {
  createRoot(rootElement).render(<App />);
  console.log("App rendered!");
} else {
  console.error("Root element not found!");
}
