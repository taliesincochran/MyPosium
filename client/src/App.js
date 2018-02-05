import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Dashboard";
import UpdateUser from "./pages/Dashboard";
import CreateEvent from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import NavbarHeader from "./components/Nav/Navbar";
;


const App = () =>
  <Router>
    <div>
    <Switch>
        <Route exact path="/" component={ Landing } />
        <Route exact path="/signup" component={ Signup } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/dashboard" component={ Dashboard } />
        <Route exact path="/dashboard/:eventID" component={ Event} />
        <Route exact path="/dashboard/settings" component = { UpdateUser } />
        <Route exact path="/dashboard/create" component= { CreateEvent } />
        <Route component={ NoMatch } />
      </Switch>
    </div>
  </Router>;



export default App;
