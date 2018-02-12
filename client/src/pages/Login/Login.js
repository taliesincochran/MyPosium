import React, { Component } from 'react';
import { Field, Label, Control, Input, Button, Container, Box, Columns, Column, Title } from 'bloomer';
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

  componentDidMount() {
    let body = document.querySelector('body');
    body.style.backgroundImage = "url('img/coloredLines.jpg')"
    body.style.backgroundSize = '100% 100%';
    body.style.backgroundAttachment = 'fixed';
    axios.get("api/users/logout")
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
            authObj.isAuthenticated = response.data.isAuth;
            this.setState({user: response.data.user, isLoggedIn: true});
          })
          .catch(err => console.log(err));
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
          brandText={window.location.pathname==='/login'? (<a href="/" style={{fontSize: '1.6em', textDecoration: 'none'}}>MyPosium</a>): "MyPosium"}
          burgeractive={this.state.isActive}
          isActive={this.state.isActive}
          onClick={this.onClickNav}
          hasTextColor={'black'}
          hasEndButtons={true}
          navbarEnd={
            [
              {
                href:"/",
                text:"Home",
                  buttonClass: 'button is-primary',
                textStyle: {textDecoration: 'none'},
                buttonHelper: 'isPrimary'
              },
              {
                href:"/signup",
                text: 'SignUp',
                  buttonClass: 'button is-primary',
                textStyle: {textDecoration: 'none'}
              }
            ]
          }
        />
        <div style={{height: '100px'}} />
        <Columns>
          <Column isSize={8} isOffset={2}>
            <Box style={{marginTop: '15%', position: 'relative'}}>
              <Title className="has-text-grey-light" isSize={1} style={{position: 'absolute', top: '-15%', right: '5%', background: 'white'}}>Login</Title>
              <Field>
                  <Label className="has-text-left">User Name:</Label>
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
                  <Label className="has-text-left">Password:</Label>
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
                  <Button isColor='primary' onClick={this.handleSubmit} isFullWidth={true}>Submit</Button>
              </Control>
            </Box>
          </Column>
        </Columns>
        {this.state.isLoggedIn? (<Redirect to={{
          pathname: "/dashboard",
          state: this.state.user}}/>): null}
      </Container>
      )

  }
}
