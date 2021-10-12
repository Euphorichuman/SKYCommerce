import React, { Fragment } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/navigation";
import { Home } from "./pages/home";
import { Footer } from "./components/footer";
import { Login } from "./pages/login";

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
  return (
    <Router>
        <NavRoute exact path="/" component={Home} />
        <Route path="/login" component={Login}></Route>
      <Footer />
    </Router>
  );
}

export default App;
