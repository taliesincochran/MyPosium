import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UpdateUser from "./pages/UpdateUser";
import CreateEvent from "./pages/CreateEvent";
import Messages from './pages/Messages';
import NoMatch from "./pages/NoMatch";
import PrivateRoute from "./components/PrivateRoute";

export default class App extends Component{

  render() {
    return(
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route exact path="/signup" component={ Signup } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/profile" component={ Profile } />
            <PrivateRoute exact path='/dashboard' component={ Dashboard }/>
            <Route path='/messages' component={ Messages } />
            <Route exact path="/event/create" component={ CreateEvent } />
            <Route exact path="/updateProfile" component={ UpdateUser } />
            <Route component={ NoMatch } />
          </Switch>
        </div>
      </Router>
    )
  }
}
