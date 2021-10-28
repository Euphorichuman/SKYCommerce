import React, { Fragment, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.scss";

// Components
import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";

// Pages
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { NoAccess } from "./pages/no-access";

// Utilities
import { useGoogleAuth } from "./providers/authentication";
import { useApi } from "./providers/API";

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
  const { isInitialized, isSignedIn, googleUser }: any = useGoogleAuth();
  const { setTokenId }: any = useApi();
  
  const setTokenIdCallback = useCallback(
    (tokenId) => setTokenId(tokenId),
    [setTokenId]
  );

  useEffect(() => {
    if (googleUser) {
      setTokenIdCallback(googleUser.tokenId);
    }
  }, [googleUser, setTokenIdCallback]);

  return (
    <Router>
      <NavRoute exact path="/" component={Home} />
      <Route path="/login" component={Login}>
        {isInitialized && (isSignedIn ? <Redirect to="/dashboard" /> : <Login />)}
      </Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/no-access" component={NoAccess} />
      <Footer />
    </Router>
  );
}

export default App;
