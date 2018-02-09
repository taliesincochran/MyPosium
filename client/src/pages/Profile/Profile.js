import React, { Component } from 'react';
import { Container, Columns, Column, Field, Label, Input, Control, TextArea, Button } from 'bloomer';
// import {API} from '../../utils/API';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import categories from '../../categories';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: [],
      age: "",
      img: "",
      aboutMe: "",
      finishedProfile: false,
      user: {}
    }
  }

  componentWillMount() {

  }

  handleInterestClick = (e) => {
    let name = e.target.name;
    console.log (name);
    let index = this.state.interests.indexOf(name);
    if(index>-1){
      let arr =[...this.state.interests];
      arr.splice(index, 1)
      this.setState({interests: arr},()=>{
      console.log(this.state.interests);
    });
    }
    else{
      let arr =[...this.state.interests, name];
      this.setState({interests: arr},()=>{
    });
    }
    if (e.target.isColor === 'success') {

    }
  }

  handleInput = (e) => {
    let {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleSubmit = () => {
    let { interests, age, img, aboutMe } = this.state;
    let data = {
      interests,
      age,
      img,
      aboutMe,
      username: this.props.location.state.username
    }

    axios.post("/api/users/updateprofile", data).then(result =>{
      this.setState({user: result.data, finishedProfile: true})
    })
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
                  {categories.map((category, i) =>{
                    return(this.state.interests.includes(category)? (
                      <Button key={i} isColor="success" name={category} onClick={this.handleInterestClick}>{category}</Button>):
                    (<Button key={i} isColor="" name={category} onClick={this.handleInterestClick}>{category}</Button>))

                  })}
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
            state: this.state.user
          }} />) : null
        }
      </Container>
    )
  }
}

export default Profile;
