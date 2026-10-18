import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import App from "./App.jsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  flushSync(() => root.render(<App />));
}
