import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import axios from 'axios';
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Event";
import UpdateUser from "./pages/UpdateUser";
import CreateEvent from "./pages/CreateEvent";
import NoMatch from "./pages/NoMatch";
import PrivateRoute from "./components/PrivateRoute"


export default class App extends Component{
  state = {
    user: "",
  }

checkAuth = () => {
    axios
    .get('/api/users/checkAuth')
    .then(response => {
      console.log('??????????????????????????',response)
      if (!response.data.isAuth){
        console.log('firing')
        return(<Redirect to="/" />)
      } else {
        return true;
      }
      // this.setState({user: response.data.user})
      // console.log(this.state)
    })
  }

  render() {
    return(
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route exact path="/signup" component={ Signup } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/profile" component={ UpdateUser } />
            <PrivateRoute path='/dashboard' component={ Dashboard }/>
            {/* <Route exact path='/dashboard' component={ Dashboard } user={this.state.user} onEnter={this.checkAuth}/> */}
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
