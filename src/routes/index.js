
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import App from "view/app/app";
import NotFound from "view/404/index";

const history = createBrowserHistory();

const RouteConfig =
  <Router history={history}>
    <Switch>
      <Route path="/" component={App} />
      <Route path="/404" component={NotFound} />
    </Switch>
  </Router >

export default RouteConfig;