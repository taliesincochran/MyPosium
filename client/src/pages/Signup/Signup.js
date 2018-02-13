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
      isActive: false,
      usernamePlaceholder: "Enter Username",
      passwordPlaceholder: "Enter Password",
      password2Placeholder: "Re-Enter Password",
      zipcodePlaceholder: "Enter 5 digit Zipcode",
      usernameUnique: false,
      zipcodeValidated: false,
      usernameMinLength: 1,
      passwordMinLength: 1
    }
    this.onClickNav = this.onClickNav.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
    let body = document.querySelector('body');
    body.style.backgroundImage = "url('img/coloredLines.jpg')"
    body.style.backgroundSize = '100% 100%';
    body.style.backgroundAttachment = 'fixed';
    // axios.get("api/users/logout")
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
    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.state.zipcode || 5000}&destinations=27510&key=AIzaSyDpwnTjzyOwCRmPRQhpu0eREKplFV0TCDI`).then(result=>{
      console.log(result.data.rows[0].elements[0].status)
      if(result.data.rows[0].elements[0].status==="OK") {
        this.setState({zipcodeValidated: true})
      }
    })
    axios.get('/api/users/checkUsername/' + this.state.username).then(result=> {
      if(result.data === null) {
        this.setState({usernameUnique: true})
        console.log('username is unique', result.data)
      } else {
        this.setState({usernamePlaceholder: 'That username already exists.  Please try another.'})
        console.log('username is taken ', result.data)
      }
      if(this.state.username.length < this.state.usernameMinLength) {
        this.setState({username: '', usernamePlaceholder: "Please enter a username with at least " + this.state.usernameMinLength + " characters."})
      } else{
        console.log("Username is minimum length")
      }
      if(this.state.password < this.state.passwordMinLength) {
        this.setState({passwordPlaceholder: 'Your password needs to be ' + this.state.passwordMinLength + ' characters long.', password2Placeholder: 'Re-Enter Password'})
      } else {
        console.log("Password is minimum length")
      }
      if(this.state.password !== this.state.password2) {
        this.setState({password: '', password2: '', passwordPlaceholder: 'Your passwords did not match.', password2Placeholder: 'Please Try Again.'})
      } else {
        console.log('Passwords match')
      }
    }).then(result => {
      if(this.state.username.length >= this.state.usernameMinLength 
        && this.state.usernameUnique
        && this.state.zipcodeValidated
        && this.state.password.length >= this.state.passwordMinLength
        && this.state.password === this.state.password2
        ) {
        console.log('User data validated')
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
      else{ 
        console.log("Validation failed ", this.state)
      }
      
    })
  }
  

  render() {
    return(
      <Section>
        <NavbarHeader
          hasEnd={true}
          hasBrand={true}
          navbarStyle={{boxShadow: '2px 2px 5px', position:"fixed", top:"0", left:"0", zIndex: '998', width: '100%'}}
          brandText={window.location.pathname==='/signup'? (<a href="/" style={{fontSize: '1.6em', textDecoration: 'none'}}>MyPosium</a>): "MyPosium"}
          hasEndButtons={true}
          burgeractive={this.state.isActive}
          isActive={this.state.isActive}
          onClick={this.onClickNav}
          hasTextColor={'black'}
          navbarEnd={
            [
              {
                href:"/",
                text:"Home",
                buttonClass: 'button is-primary',
                textStyle: {textDecoration: 'none'}
              },
              {
                href:"/login",
                text: 'Login',
                buttonClass: 'button is-primary',
                textStyle: {textDecoration: 'none'}
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
                          placeholder={this.state.usernamePlaceholder}
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
                          placeholder={this.state.passwordPlaceholder}
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
                          placeholder={this.state.password2Placeholder}
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
                          placeholder={this.state.zipcodePlaceholder}
                          name="zipcode"
                          value={this.state.zipcode}
                          onChange={this.handleChange}
                        />
                    </Control>
                </Field>
                <Control>
                    <Button isFullWidth={true} isColor='primary' onClick={this.handleSubmit}>Submit</Button>
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
