import React, { Component } from 'react';
import { Container, Columns, Column, Field, Label, Input, Control, TextArea, Button } from 'bloomer';
import {API} from '../../utils/API';

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
    // let name = e.target.name;
    // if (e.target.isColor === 'success') {
    //   console.log(obj);
    // }
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
      .catch(err => console.error(err));
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
                  <Button name="Crafts" onClick={this.handleInterestClick}>Crafts</Button>
                  <Button name="Animals" onClick={this.handleInterestClick}>Animals</Button>
                  <Button name="Music" onClick={this.handleInterestClick}>Music</Button>
                  <Button name="Books" onClick={this.handleInterestClick}>Books</Button>
                  <Button name="History" onClick={this.handleInterestClick}>History</Button>
                  <Button name="Visual Arts" onClick={this.handleInterestClick}>Visual Arts</Button>
                  <Button name="Finance" onClick={this.handleInterestClick}>Finance</Button>
                </Column>
                <Column>
                  <Button name="Religion" onClick={this.handleInterestClick}>Religion</Button>
                  <Button name="Automotive" onClick={this.handleInterestClick}>Automotive</Button>
                  <Button name="Business" onClick={this.handleInterestClick}>Business</Button>
                  <Button name="Fitness" onClick={this.handleInterestClick}>Fitness</Button>
                  <Button name="Electronics" onClick={this.handleInterestClick}>Electronics</Button>
                  <Button name="Home Improvement" onClick={this.handleInterestClick}>Home Improvement</Button>
                  <Button name="Science" onClick={this.handleInterestClick}>Science</Button>
                </Column>
                <Column>
                  <Button name="Politics" onClick={this.handleInterestClick}>Politics</Button>
                  <Button name="Philosophy" onClick={this.handleInterestClick}>Philosophy</Button>
                  <Button name="Games" onClick={this.handleInterestClick}>Games</Button>
                  <Button name="Social" onClick={this.handleInterestClick}>Social</Button>
                  <Button name="Sports" onClick={this.handleInterestClick}>Sports</Button>
                  <Button name="Photography" onClick={this.handleInterestClick}>Photography</Button>
                  <Button name="Real Estate" onClick={this.handleInterestClick}>Real Estate</Button>
                </Column>
                <Column>
                  <Button name="Self Improvement" onClick={this.handleInterestClick}>Self Improvement</Button>
                  <Button name="Computers" onClick={this.handleInterestClick}>Computers</Button>
                  <Button name="Recreation" onClick={this.handleInterestClick}>Recreation</Button>
                  <Button name="Comics" onClick={this.handleInterestClick}>Comics</Button>
                  <Button name="Performing Arts" onClick={this.handleInterestClick}>Performing Arts</Button>
                  <Button name="Video Games" onClick={this.handleInterestClick}>Video Games</Button>
                  <Button name="Health and Beauty" onClick={this.handleInterestClick}>Health and Beauty</Button>
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
