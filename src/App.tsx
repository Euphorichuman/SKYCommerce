import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.scss";

// Inital page
import { Navigation } from "./components/navigation";
import { Home } from "./pages/home";
import { Footer } from "./components/footer";
import { Login } from "./pages/login";
import { useGoogleAuth } from "./providers/authentication";

// Dashboard
import { Dashboard } from "./pages/dashboard";

interface INavRouteProps {
  exact?: boolean;
  path: string;
  component: any;
}

const NavRoute = (prop: INavRouteProps) => (
  <Route
    exact={prop.exact}
    path={prop.path}
    render={(props) => (
      <Fragment>
        <Navigation />
        <prop.component {...props} />
      </Fragment>
    )}
  />
);

function App() {
  const { isInitialized, isSignedIn }: any = useGoogleAuth();
  return (
    <Router>
      <NavRoute exact path="/" component={Home} />
      <Route path="/login">
        {isInitialized && (isSignedIn ? <Redirect to="/dashboard"/> : <Login />)}
      </Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Footer />
    </Router>
  );
}

export default App;
