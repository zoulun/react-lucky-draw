
import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "containers/app/app";
import NotFound from "containers/404/index";
import "../lib/css/style";

export default function router() {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/404" component={NotFound} />
    </Switch>
  )
}