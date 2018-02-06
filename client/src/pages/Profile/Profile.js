import React, { Component } from 'react';
import { Container, Columns, Column, Field, Label, Input, Control, TextArea, Button } from 'bloomer';
import { Redirect } from 'react-router-dom';
// import API from '../../utils/API';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: [],
      age: "",
      img: "",
      aboutMe: "",
      finishedProfile: false
    }
  }

  componentWillMount() {

  }

  handleInterestClick = (e) => {
    e.preventDefault();
  }

  handleInput = (e) => {
    let {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleSubmit = () => {
    let { interests, age, img, aboutMe } = this.state;
    this.setState({finishedProfile: true});
    let data = {
      interests,
      age,
      img,
      aboutMe,
      username: this.props.location.state.username
    }
    axios.post("/api/users/updateprofile", data)
      .then(result => console.log(result));
  }

  render() {
    return (
      //REDIRECT TO DASHBOARD
      <Container>
        <Container>
          <Columns isCentered>
            <Column isSize="1/2">
              <h1 className="text-center">Profile</h1>
              <Field>
                <Label>Age</Label>
                <Control>
                  <Input type="text" name="age" value={this.state.age} onChange={this.handleInput} />
                </Control>
              </Field>
              <Field>
                <Label>Image URL</Label>
                <Control>
                  <Input type="text" name="img" value={this.state.img} onChange={this.handleInput} />
                </Control>
              </Field>
              <Field>
                <Label>About Me</Label>
                <Control>
                  <TextArea type="text" name="aboutMe" value={this.state.aboutMe} onChange={this.handleInput} />
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
        <Container>
          <Control>
              <Button isColor='primary' onClick={this.handleSubmit}>Submit</Button>
          </Control>
        </Container>
        {
          this.state.finishedProfile ? (<Redirect to={{
            pathname: "/dashboard",
            state: this.state
          }} />) : null
        }
      </Container>
    )
  }
}

export default Profile;
