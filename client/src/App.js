import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Event";
import UpdateUser from "./pages/UpdateUser";
import CreateEvent from "./pages/CreateEvent";
import SentMessages from './pages/SentMessages'
import ReceivedMessages from './pages/ReceivedMessages'
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
            <Route path='/messages/sent' component={ SentMessages } />
            <Route path='/messages/received' component={ ReceivedMessages } />
            <Route exact path="/event/create" component={ CreateEvent } />
            <Route exact path="/dashboard/:eventID" component={ Event} />
            <Route exact path="/dashboard/settings" component={ UpdateUser } />
            <Route component={ NoMatch } />
          </Switch>
        </div>
      </Router>
    )
  }
}
