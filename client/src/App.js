import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Event";
import UpdateUser from "./pages/UpdateUser";
import CreateEvent from "./pages/CreateEvent";
import NoMatch from "./pages/NoMatch";
// import PrivateRoute from "./components/PrivateRoute"

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route exact path="/signup" component={ Signup } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/dashboard" component={ Dashboard } />
        <Route exact path="/dashboard/:eventID" component={ Event} />
        <Route exact path="/dashboard/settings" component={ UpdateUser } />
        <Route exact path="/dashboard/create" component={ CreateEvent } />
        <Route component={ NoMatch } />
      </Switch>
    </div>
  </Router>;

export default class App extends Component{


  render() {
    return(
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route exact path="/signup" component={ Signup } />
            <Route exact path="/login" component={ Login } />

            <Route exact path='/dashboard' component={ Dashboard } />
            <Route exact path="/dashboard/:eventID" component={ Event} />
            <Route exact path="/dashboard/settings" component={ UpdateUser } />
            <Route exact path="/dashboard/create" component={ CreateEvent } />
            <Route component={ NoMatch } />
          </Switch>
        </div>
      </Router>
    )
  }

}
