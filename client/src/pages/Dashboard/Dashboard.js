import React, { Component } from 'react';
import { Container, Button } from 'bloomer';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Dashboard extends Component {
  state = {
    user: '',
    isAuth: false
  }

componentWillMount() {
  axios
    .get('api/users/checkAuth')
    .then(response => {
      let { user, isAuth } = response.data;
      this.setState({user,isAuth})
      console.log(this.state);
    })
}
//probably no longer needed since I think I solved the redirect from the backend
//for logout.  But, keeping just in case

  handleLogout = () => {
    axios
      .get('api/users/logout')
      .then(response => {
        console.log('firing',response)
        console.log(response.status)
        if (response.status === 200){
          console.log(this.props.location.state)
        this.setState({user: '', isAuth: false})
        // return  <Redirect to="/" />
          window.location.href = '/';
        }
      })
      .catch(err => console.log(err));
  }


   render(){
     return (
      this.state.isAuth ?
      <Container>
        <h1>Dashboard</h1>
        {this.props.children}
        <Button onClick={this.handleLogout}>Logout</Button>
        <Button href="/dashboard/create">Create</Button>
      </Container>:
      <div>
        <h2>You need to log in to do that.</h2>
        { '   '}
        <Button isColor='primary' href="/">Home</Button>
      </div>
    )
  }
}
      //*{this.state.logout? (<Redirect to="/" />) : null}*/}
