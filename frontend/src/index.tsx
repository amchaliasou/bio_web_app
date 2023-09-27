import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom/client";
import RootStore from "stores/rootStore";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
const rootStore = new RootStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider {...rootStore}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
