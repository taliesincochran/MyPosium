import React, { Component } from 'react';
import { Container, Button } from 'bloomer';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {authObj} from '../../authenticate'

export default class Dashboard extends Component {
  state = {
    username:'',
    logout: false,
    checkMessages: false,
    createEvent: false,
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
    console.log(this.props);
    return(
      <Container>
        <h1>Dashboard</h1>
        <Button onClick={this.handleLogout}>Logout</Button>
        <Button onClick={this.checkMessages}>Check Messages</Button>
        <Button onClick={this.createEvent}>Create Event</Button>
        {this.state.createEvent? (<Redirect to={{
            pathname: "/event/create",
            state: this.state
            }} />) : null}
        {this.state.checkMessages? (<Redirect to="/messages/sent" />) : null}
        {this.state.logout? (<Redirect to="/" />) : null}
      </Container>
    )
  }
}
