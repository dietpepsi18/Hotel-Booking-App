import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/antd.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

//import everything we need for using the reduxå
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index.js";

/*For using the redux:
  1) create user reducer function
  2) combine multiple reducers
  3) create redux store
  4) provide redux store to the entire app
*/
const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
