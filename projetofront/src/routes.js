import React from "react";
import { PrivateRoute, AdminRoute } from "./services/privateRoutes";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <h1>Teste</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
