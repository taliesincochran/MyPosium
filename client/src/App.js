import React, { Component } from "react";
import { Link, Route, Switch, withRouter, Redirect, BrowserRouter as Router } from "react-router-dom";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Event";
import UpdateUser from "./pages/UpdateUser";
import CreateEvent from "./pages/CreateEvent";
import NoMatch from "./pages/NoMatch";
import PrivateRoute from "./components/PrivateRoute"
import axios from 'axios';
class App extends React.Component {
  state = {
    isAuthenticated: false
  }
  isAuthenticated = () => {
  return (axios
    .get('/api/users/checkAuth')
    .then(response => {
      console.log('response', response)
      return response.data.isAuth
    })
    .catch(err => console.log(err))
  )}
  componentDidMount = () => {
    let auth = this.isAuthenticated();
    this.setState({isAuthenticated: auth});
  }
  render() {
    console.log("App state", this.state);
    return(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route exact path="/signup" component={ Signup } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/login" component={ Login } />
        this.state.auth? {
          return(
            <PrivateRoute exact path="/dashboard" render={()=><Dashboard isAuth={this.state.auth}/>}/>
            <PrivateRoute exact path="/dashboard/:eventID" component={ Event} />
            <PrivateRoute exact path="/dashboard/settings" component={ UpdateUser } />
            <PrivateRoute exact path="/dashboard/create" component={ CreateEvent } />
          )
        }: null
        <Route component={ NoMatch } />
      </Switch>
    </div>
  </Router>
  )
}
}

export default App;


