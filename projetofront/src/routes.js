import React from "react";
import { PrivateRoute, AdminRoute } from "./services/privateRoutes";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/signup";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <h1>Teste</h1>} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
