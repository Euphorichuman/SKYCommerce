import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Sidebar } from "../components/dashboard/sidebar";
import { Products } from "../components/dashboard/products";
import { Sales } from "../components/dashboard/sales";
import { Users } from "../components/dashboard/users";

export function Dashboard() {
  return (
    <Router>
      <div className="dashboard d-flex">
        <Sidebar />
        <Switch>
          <Route exact path="/dashboard">
            <Products />
          </Route>
          <Route path="/dashboard/products">
            <Products />
          </Route>
          <Route path="/dashboard/sales">
            <Sales />
          </Route>
          <Route path="/dashboard/users">
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
