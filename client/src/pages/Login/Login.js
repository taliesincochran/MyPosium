import React, { Component } from 'react';
import { Field, Label, Control, Input, Button, Container } from 'bloomer';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import {authObj} from '../../authenticate'
import NavbarHeader from '../../components/Nav/Navbar';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false,
      isActive: false,
      user: {}
    }
    this.onClickNav = this.onClickNav.bind(this);
  }
  onClickNav = () => {
      this.setState((state) => ({ isActive: !state.isActive }));
  }
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    let { username, password } = this.state;
    let user = { username, password };
    e.preventDefault()
    this.submitUser(user);
  }

  submitUser = user => {
    axios
      .post('api/users/login', user)
      .then(result => {
        authObj
          .authenticate()
          .then(response => {
            console.log(response)
            authObj.isAuthenticated = response.data.isAuth;
            this.setState({user: response.data.user, isLoggedIn: true});
          })
          .catch(err => console.log(err));
        // setTimeout( () => {
        //   if (result.data.isAuth){
        //     this.setState({isLoggedIn: true});
        //   }
        // }, 100)
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <Container>
        <NavbarHeader
          hasEnd={true}
          hasBrand={true}
          navbarStyle={{boxShadow: '2px 2px 5px', position:"fixed", top:"0", left:"0", zIndex: '998', width: '100%'}}
          brandText='Myposium'
          burgerActive={this.state.isActive}
          isActive={this.state.isActive}
          onClick={this.onClickNav}
          hasTextColor={'black'}
          hasEndButton={true}
          navbarEnd={
            [
              {
                href:"/",
                text:"Home",
                textStyle: {textDecoration: 'underline', color: '#4C4CFF'},
                buttonHelper: 'isPrimary'
              },
              {
                href:"/signup",
                text: 'SignUp',
                textStyle: {textDecoration: 'underline', color: '#4C4CFF'}
              }
            ]
          }
        />
        <div style={{height: '100px'}} />
        <Field>
            <Label>User Name:</Label>
            <Control>
                <Input
                  type="text"
                  placeholder='Enter User Name'
                  name='username'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
            </Control>
        </Field>
        <Field>
            <Label>Name</Label>
            <Control>
              <Input
                type="password"
                placeholder='Enter Password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Control>
        </Field>
        <Control>
            <Button isColor='primary' onClick={this.handleSubmit}>Submit</Button>
        </Control>
        {this.state.isLoggedIn? (<Redirect to={{
          pathname: "/dashboard",
          state: this.state.user}}/>): null}
      </Container>
      )
    
  }
}
