import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "animate.css";
import "./index.css";

// Be careful of StrictMode:
// https://react.dev/blog/2022/03/29/react-v18#new-strict-mode-behaviors
/*
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
