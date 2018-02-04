import React, { Component } from 'react';
import { Container, Button } from 'bloomer';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {authObj} from '../../authenticate'

export default class Dashboard extends Component {
  state = {
    logout: false,
  }

  handleLogout = () => {
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

  render() {
    return(
      <Container>
        <h1>Dashboard</h1>
        <Button onClick={this.handleLogout}>Logout</Button>
        {this.state.logout? (<Redirect to="/" />) : null}
      </Container>
    )
  }
}
