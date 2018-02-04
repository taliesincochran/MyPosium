import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Event";
import UpdateUser from "./pages/UpdateUser";
import CreateEvent from "./pages/CreateEvent";
import NoMatch from "./pages/NoMatch";
// import PrivateRoute from "./components/PrivateRoute"


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
              <Switch>
                <Route exact path="/dashboard/:eventID" component={ Event} />
                <Route exact path="/dashboard/settings" component={ UpdateUser } />
                <Route exact path="/dashboard/create" component={ CreateEvent } />
              </Switch>
            <Route component={ NoMatch } />
          </Switch>
        </div>
      </Router>
    )
  }

}
