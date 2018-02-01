import React, { Component } from 'react';
import { Field, Label, Control, Input, Button } from 'bloomer';
import axios from 'axios';

export default class Signup extends Component {
  state = {
    username: '',
    email: '',
    password2: '',
    zipcode: '',
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = e => {
    e.preventDefault();
    let { username, email, password, password2, zipcode } = this.state;
    let newUser = { username, email, password, password2, zipcode };
    this.submitUser(newUser);
  }

  submitUser = user => {
    axios
      .post('api/users/signup', user)
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <Field>
            <Label>User Name:</Label>
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
            <Label>Password</Label>
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
            <Label>Re-Enter Password</Label>
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
            <Label>Zipcode</Label>
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
      </div>
    )
  }
}
