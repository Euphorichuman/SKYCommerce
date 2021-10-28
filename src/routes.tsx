import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

// Pages
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";

import { useGoogleAuth } from "./providers/authentication";

export function Routes() {
  const history = createBrowserHistory();
  const { isInitialized, isSignedIn }: any = useGoogleAuth();

  return (
    <div>
      <Router history={history}>
        <Route path="/login" component={Login}>
          {isInitialized &&
            (isSignedIn ? <Redirect to="/dashboard" /> : <Login />)}
        </Route>
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}
