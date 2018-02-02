import React, { Component } from 'react';
import { Container, Button } from 'bloomer';
import axios from 'axios';

export default class Dashboard extends Component {
  state = {

  }

  handleLogout = () => {
    axios
      .get('api/users/logout')
      .then(response => {
        console.log('firing',response)
        console.log(response.status)
        if (response.status === 200){
          window.location.href = '/';
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <Container>
        <h1>Dashboard</h1>
        <Button onClick={this.handleLogout}>Logout</Button>
      </Container>
    )
  }
}
