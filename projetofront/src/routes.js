import React from "react";
import { PrivateRoute, AdminRoute } from "./services/privateRoutes";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/signup";
import NavBar from "./components/navBar";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        component={() => (
          <>
            <NavBar />
            <div className="container">
              <h1>Teste</h1>
            </div>
          </>
        )}
      />
      <Route
        path="/login"
        component={() => (
          <>
            <NavBar />
            <Login />
          </>
        )}
      />
      <Route
        path="/signup"
        component={() => (
          <>
            <NavBar />
            <SignUp />
          </>
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
