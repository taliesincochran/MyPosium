import React, { Component } from 'react';
import { Section, Container, Field, Label, Control, Input, Button, Columns, Column, Box, Title } from 'bloomer';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import {authObj} from '../../authenticate'
import NavbarHeader from '../../components/Nav/Navbar'
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      zipcode: '',
      isLoggedIn: false,
      isActive: false
    }
    this.onClickNav = this.onClickNav.bind(this);
  }
  componentDidMount = () => {
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
    e.preventDefault();
    let { username, password, password2, zipcode } = this.state;
    let newUser = { username, password, password2, zipcode };
    this.submitUser(newUser);
  }

  submitUser = user => {
    axios
      .post('api/users/signup', user)
      .then(result => {
        authObj
          .authenticate()
          .then(response => {
            authObj.isAuthenticated = response.data.isAuth;
            this.setState({isLoggedIn: true});
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <Section>
        <NavbarHeader
          hasEnd={true}
          hasBrand={true}
          navbarStyle={{boxShadow: '2px 2px 5px', position:"fixed", top:"0", left:"0", zIndex: '998', width: '100%'}}
          brandText='Myposium'
          burgeractive={this.state.isActive}
          isActive={this.state.isActive}
          onClick={this.onClickNav}
          hasTextColor={'black'}
          navbarEnd={
            [
              {
                href:"/",
                text:"Home",
                textStyle: {textDecoration: 'underline', color: '#4C4CFF'}
              },
              {
                href:"/login",
                text: 'Login',
                textStyle: {textDecoration: 'underline', color: '#4C4CFF'}
              }
            ]
          }
        />
        <div style={{height: '40px'}} />
        <Container>
          <Columns>
            <Column isSize={8} isOffset={2}>
              <Box style={{marginTop: '15%', position: 'relative'}}>
                <Title className="has-text-grey-light" isSize={1} style={{position: 'absolute', top: '-8%', right: '5%', background: 'white'}}>Sign Up</Title>
                <Field>
                    <Label className="has-text-left">User Name:</Label>
                    <Control>
                        <Input
                          type="text"
                          placeholder='Enter User Name'
                          name="username"
                          value={this.state.username}
                          onChange={this.handleChange}
                        />
                    </Control>
                </Field>
                <Field>
                    <Label className="has-text-left">Password</Label>
                    <Control>
                        <Input
                          type="password"
                          placeholder='Enter Password'
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                    </Control>
                </Field>
                <Field>
                    <Label className="has-text-left">Re-Enter Password</Label>
                    <Control>
                        <Input
                          type="password"
                          placeholder='Re-Enter Password'
                          name="password2"
                          value={this.state.password2}
                          onChange={this.handleChange}
                        />
                    </Control>
                </Field>
                <Field>
                    <Label className="has-text-left">Zipcode</Label>
                    <Control>
                        <Input
                          type="text"
                          placeholder='Enter Zipcode'
                          name="zipcode"
                          value={this.state.zipcode}
                          onChange={this.handleChange}
                        />
                    </Control>
                </Field>
                <Control>
                    <Button isColor='primary' onClick={this.handleSubmit}>Submit</Button>
                </Control>
              </Box>
            </Column>
          </Columns>
          {this.state.isLoggedIn ? (<Redirect to={{
            pathname: "/profile",
            state: this.state
          }} />) : console.log("User isn't logged in")}
        </Container>
      </Section>
    )
  }
}
