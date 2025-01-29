import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the main App component
import "./styles.css"; // Import global styles (optional, for CSS styling)


const root = ReactDOM.createRoot(document.getElementById("root")); // Attach to the #root div in index.html

root.render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>
);