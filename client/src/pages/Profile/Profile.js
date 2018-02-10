import React, { Component } from 'react';
import { Box, Title, Container, Columns, Column, Field, Label, Input, Control, TextArea, Button } from 'bloomer';
// import {API} from '../../utils/API';
import Navbar from '../../components/Nav/Navbar';
import { authObj } from '../../authenticate';
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
      user: {},
      logout: false
    }
  }

  componentWillMount() {
    categories.sort()
  }

  handleInterestClick = (e) => {
    //store name interest clicked, and it's index (if any)
    let name = e.target.name;
    let index = this.state.interests.indexOf(name);

    if(index>-1){
      //if interest exists in the array, the user must be trying to remove it
      let arr =[...this.state.interests];
      arr.splice(index, 1)//splice it out and then set state
      this.setState({interests: arr},()=>{
      });
    }
    else{
      //otherwise, the user is trying to add it concatenate
      //it with existing interests and change state
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
      username: this.props.location.state.username,

    }

    axios.post("/api/users/updateprofile", data).then(result =>{
      this.setState({user: result.data})
    }).then(()=> {
        this.setState({finishedProfile:true})
    }).catch(err => console.error(err));

  }

  render() {
    var user= this.state.user
    return (

      // <Container>
        <Container>
          <Navbar
            hasEnd={true}
            hasBrand={true}
            navbarStyle={{boxShadow: '2px 2px 5px', position:"fixed", top:"0", left:"0", zIndex: '998', width: '100%'}}
            brandText='MyPosium'
            burgeractive={this.state.isActive}
            isActive={this.state.isActive}
            onClick={this.onClickNav}
            hasTextColor={'black'}
            hasEndButton={true}
            navbarEnd={
              [
                {
                  href:"/",
                  text:"Home",
                  textStyle: {textDecoration: 'none'},
                  buttonHelper: 'isPrimary'
                },
                {
                  text:"Logout",
                  onClick:() => {
                    axios
                      .get('api/users/logout')
                      .then(response => {
                        authObj.logout();
                        if (response.status === 200){
                          this.setState({logout:true});
                        }
                      })
                      .catch(err => console.log(err));
                  },
                  buttonClass: "isDanger"
                }
              ]
            }
          />
          <div style={{height: '100px'}}></div>
          <Columns isCentered>
            <Column isSize="1/2">
              <Box>
                <Title className="text-center">Profile</Title>
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
                <Control>
                    <Button isColor='primary' onClick={this.handleSubmit} className="is-fullwidth">Submit</Button>
                </Control>
              </Box>
            </Column>
            <Column isSize="1/2">
              <Box>
                <Title className="text-center">Interests</Title>
                {
                  categories.map((category, i) =>{
                  //map through categories and render them different colors
                  //depending on whether the user has selected it or not
                  return(
                    this.state.interests.includes(category) ?
                      (<Button
                        key={i}
                        isColor="primary"
                        name={category}
                        onClick={this.handleInterestClick}>
                        {category}
                      </Button>)
                        :
                      (<Button
                        key={i}
                        isColor=""
                        name={category}
                        onClick={this.handleInterestClick}>
                        {category}
                      </Button>)
                    )
                  })
                }
              </Box>
              {/* <Columns hasTextAlign='centered'>
                <Column>

                </Column>
              </Columns> */}
            </Column>
          </Columns>
        {/* </Container> */}
        {this.state.logout? (<Redirect to="/" />) : null}
        {
          this.state.finishedProfile ? (<Redirect to={{
            pathname: "/dashboard",
            state: user
          }} />) : null
        }
      </Container>
    )
  }
}

export default Profile;
