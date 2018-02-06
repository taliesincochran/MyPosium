import React, { Component } from 'react';
import { Container, Button } from 'bloomer';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {authObj} from '../../authenticate'

class Dashboard extends Component {
  state = {
    logout: false,
    checkMessages: false,
    createEvent: false,
    dashboard: false
  }

  handleLogout = () => {
    console.log("api/users/logout called")
    axios
      .get('api/users/logout')
      .then(response => {
        authObj.logout();
        if (response.status === 200){
          this.setState({logout:true});
        }
      })
      .catch(err => console.log(err));
  }
  checkMessages = () => {
    this.setState({checkMessages: true});
  }

  createEvent = () => {
    this.setState({createEvent: true});
  }
  render() {
    return(
      <Container>
        <h1>Dashboard</h1>
        <Button onClick={this.handleLogout}>Logout</Button>
        <Button onClick={this.checkMessages}>Check Messages</Button>
        <Button onClick={this.createEvent}>Create Event</Button>
        {this.state.createEvent? (<Redirect to="/event/create" />) : null}
        {this.state.checkMessages? (<Redirect to="/messages/sent" />) : null}
        {this.state.logout? (<Redirect to="/" />) : null}
      </Container>
    )
  }
}
export default Dashboard;