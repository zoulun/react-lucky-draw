import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import RouteConfig from "./routes/index";
import "./lib/css/style";

ReactDOM.render(
  <BrowserRouter>
    <RouteConfig />
  </BrowserRouter>,
  document.getElementById('root')
);