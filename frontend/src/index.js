import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./assets/app.scss";
import init from "./init";

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));

  const appDom = init();

  root.render(
    <React.StrictMode>
      {appDom}
    </React.StrictMode>,
  );
};

app();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
