import React, { Component } from 'react';
import { Container, Columns, Column, Field, Label, Input, Control, TextArea, Button } from 'bloomer';
import {API} from '../../utils/API';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleInterestClick = this.handleInterestClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount() {
    
  }

  handleInterestClick(e) {
    e.preventDefault();
  }

  handleInput(e) {
    let id = this.props
    API.postUserUpdate(id)
  }

  render() {
    return (
      <Container>
        <Columns isCentered>
          <Column isSize="1/2">
            <h1 className="text-center">Profile</h1>
            <Field>
              <Label>Display Name</Label>
              <Control>
                <Input type="text" onChange={this.handleInput} />
              </Control>
            </Field>
            <Field>
              <Label>Age</Label>
              <Control>
                <Input type="text" onChange={this.handleInput} />
              </Control>
            </Field>
            <Field>
              <Label>Zip Code</Label>
              <Control>
                <Input type="text" onChange={this.handleInput} />
              </Control>
            </Field>
            <Field>
              <Label>About Me</Label>
              <Control>
                <TextArea type="text" onChange={this.handleInput} />
              </Control>
            </Field>
          </Column>
          <Column isSize="1/2">
            <h1 className="text-center">Interests</h1>
            <Columns hasTextAlign='centered'>
              <Column>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Crafts</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Animals</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Music</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Books</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>History</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Visual Arts</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Finance</Button>
              </Column>
              <Column>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Religion</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Automotive</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Business</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Fitness</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Electronics</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Home Improvement</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Science</Button>
              </Column>
              <Column>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Politics</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Philosophy</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Games</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Social</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Sports</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Photography</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Real Estate</Button>
              </Column>
              <Column>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Self Improvement</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Computers</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Recreation</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Comics</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Performing Arts</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Miscellaneous</Button>
                <Button isColor='success' onClick={this.handleInterestClick} isOutlined>Health and Beauty</Button>
              </Column>
            </Columns>
          </Column>
        </Columns>
      </Container>
    )
  }
}

export default Profile;
