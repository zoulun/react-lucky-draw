import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import RouteConfig from "./routes/index";
import reducer from './reducer'

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);