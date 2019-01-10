import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import RouteConfig from "./routes/index";
import "./lib/css/style";

const store = createStore(() => { return { funs: 1 } });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);