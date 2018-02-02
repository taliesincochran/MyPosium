import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route exact path="/signup" component={ Signup } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/dashboard" component={ Dashboard } />
        <Route component={ NoMatch } />
      </Switch>
    </div>
  </Router>;



export default App;
