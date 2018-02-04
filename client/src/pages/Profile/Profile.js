import React, { Component } from 'react';
import { Container, Columns, Column, Field, Label, Input, Control, TextArea, Button } from 'bloomer';

class Profile extends Component {
  render() {
    return (
      <Container>
        <Columns isCentered>
          <Column isSize="1/2">
            <h1 className="text-center">Profile</h1>
            <Field>
              <Label>Display Name</Label>
              <Control>
                <Input type="text" />
              </Control>
            </Field>
            <Field>
              <Label>Age</Label>
              <Control>
                <Input type="text" />
              </Control>
            </Field>
            <Field>
              <Label>Zip Code</Label>
              <Control>
                <Input type="text" />
              </Control>
            </Field>
            <Field>
              <Label>About Me</Label>
              <Control>
                <TextArea type="text" />
              </Control>
            </Field>
          </Column>
          <Column isSize="1/2">
            <h1 className="text-center">Interests</h1>
            <Columns hasTextAlign='centered'>
              <Column>
                <Button isColor='success' isOutlined>Crafts</Button>
                <Button isColor='success' isOutlined>Animals</Button>
                <Button isColor='success' isOutlined>Music</Button>
                <Button isColor='success' isOutlined>Books</Button>
                <Button isColor='success' isOutlined>History</Button>
                <Button isColor='success' isOutlined>Visual Arts</Button>
                <Button isColor='success' isOutlined>Finance</Button>
              </Column>
              <Column>
                <Button isColor='success' isOutlined>Religion</Button>
                <Button isColor='success' isOutlined>Automotive</Button>
                <Button isColor='success' isOutlined>Business</Button>
                <Button isColor='success' isOutlined>Fitness</Button>
                <Button isColor='success' isOutlined>Electronics</Button>
                <Button isColor='success' isOutlined>Home Improvement</Button>
                <Button isColor='success' isOutlined>Science</Button>
              </Column>
              <Column>
                <Button isColor='success' isOutlined>Politics</Button>
                <Button isColor='success' isOutlined>Philosophy</Button>
                <Button isColor='success' isOutlined>Games</Button>
                <Button isColor='success' isOutlined>Social</Button>
                <Button isColor='success' isOutlined>Sports</Button>
                <Button isColor='success' isOutlined>Photography</Button>
                <Button isColor='success' isOutlined>Real Estate</Button>
              </Column>
              <Column>
                <Button isColor='success' isOutlined>Self Improvement</Button>
                <Button isColor='success' isOutlined>Computers</Button>
                <Button isColor='success' isOutlined>Recreation</Button>
                <Button isColor='success' isOutlined>Comics</Button>
                <Button isColor='success' isOutlined>Performing Arts</Button>
                <Button isColor='success' isOutlined>Miscellaneous</Button>
                <Button isColor='success' isOutlined>Health and Beauty</Button>
              </Column>
            </Columns>
          </Column>
        </Columns>
      </Container>
    )
  }
}

export default Profile;
