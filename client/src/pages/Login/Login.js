import React, { Component } from 'react';
import { Field, Label, Control, Input } from 'bloomer';

export default class Login extends Component {
  state = {

  }

  render() {
    return(
      <Field>
          <Label>Name</Label>
          <Control>
              <Input type="text" placeholder='Text Input' />
          </Control>
      </Field>
    )
  }
}
