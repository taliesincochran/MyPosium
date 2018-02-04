import React, { Component } from 'react';
import { Container, Button } from 'bloomer';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Dashboard extends Component {
  state = {

  }
//probably no longer needed since I think I solved the redirect from the backend
//for logout.  But, keeping just in case

  // handleLogout = () => {
  //   axios
  //     .get('api/users/logout')
  //     .then(response => {
  //       console.log('firing',response)
  //       console.log(response.status)
  //       if (response.status === 200){
  //         console.log(this.props.location.state)
  //       return  <Redirect to="/" />
  //         // window.location.href = '/';
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }

  render() {
    return(
      <Container>
        <h1>Dashboard</h1>
        <Button onClick={this.handleLogout}>Logout</Button>
      </Container>
    )
  }
}
