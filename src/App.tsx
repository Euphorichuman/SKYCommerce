import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/navigation";
import { Home } from "./pages/home";

function App() {
  return (
    <Router>
      <Navigation />
      <Route exact path="/" component={Home} />
    </Router>
  );
}

export default App;
