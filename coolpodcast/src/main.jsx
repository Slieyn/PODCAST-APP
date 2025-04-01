import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";  // ✅ Import the corrected App.jsx
import "./index.css";  // ✅ Ensure styles are applied

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
