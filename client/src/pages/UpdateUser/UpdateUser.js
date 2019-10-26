import React, { Component } from 'react';
import {
  Box,
  Title,
  Container,
  Columns,
  Column,
  Field,
  Label,
  Input,
  Control,
  TextArea,
  Button } from 'bloomer';
import Navbar from '../../components/Nav/Navbar';
import { authObj } from '../../authenticate';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import categories from '../../categories';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: this.props.location.state.interests,
      age: this.props.location.state.age,
      img: this.props.location.state.img,
      aboutMe: this.props.location.state.aboutMe,
      zipcode: this.props.location.state.zipcode,
      initialZipcode: this.props.location.state.zipcode,
      finishedProfile: false,
      user: this.props.location.state,
      logout: false,
      dashboard: false,
      checkMessages: false,
      createEvent: false,
      zipcodePlaceholder: 'Enter Zipcode'
    }
  }

//Sorts the categories for pretty reasons
  componentWillMount() {
    categories.sort()
  }


  handleInterestClick = (e) => {
    //store name interest clicked, and it's index (if any)
    let name = e.target.name;
    let index = this.state.interests.indexOf(name);
    let interests = [ ...this.state.interests ];
    
    if(index>-1) {
      //if interest exists in the array, the user must be trying to remove it
      interests.splice(index, 1);//splice it out and then set state
    } else {
      //otherwise, the user is trying to add it concatenate
      //it with existing interests and change state
      interests.push(name);
    }
    this.setState({ interests });
  }

  handleInput = (e) => {
    let {name, value} = e.target;
    this.setState({[name]: value})
  }

//On submission sends the info to the db via axios
  handleSubmit = () => {
    let { interests, age, img, aboutMe, zipcode } = this.state;
    let data = {
      interests,
      age,
      img,
      aboutMe,
      zipcode,
      username: this.props.location.state.username
    }
    console.log(data)
    //validate zip code
    axios.get(`/api/location/zipcode/${data.zipcode}`).then(result=>{
      console.log(result)
      return result.status === 200;
    }).then(result => {
      console.log('result: ', result);
      if(result){
        axios.post("/api/users/updateprofile", data).then(result =>{
          this.setState({user: result.data})
          console.log(this.state)
        }).then(()=> {
          this.setState({finishedProfile:true})
        }).catch(err => console.error(err));
      } else{
        this.setState({zipcodePlaceholder: 'Google can not find your zipcode.  Please try again.', zipcode: this.state.initialZipcode})
      }
    })
  }

  render() {
    var user= this.state.user
    return (
      <div style={{height: '100vh', backgroundImage: 'url("img/coloredLines.jpg")', backgroundAttachment: 'fixed', backgroundSize: '100% 100%'}}>
        <Container>

{/*======================================================================================================================================*/}
        {/*NAVBAR STUFF Probably not to be edited except if navbar is updated*/}
{/*======================================================================================================================================*/}

          <Navbar
            hasBrand={true}
            brandText="MyPosium Dashboard"
            onClick={this.burgerOnClick}
            isActive={this.state.isActive}
            hasEnd={true}
            hasEndButtons={true}
            navbarStyle={{boxShadow: '2px 2px 5px', position:"fixed", top:"0", left:"0", zIndex: '998', width: '100%'}}
            navbarEnd={[
              {
                text:'Dashboard',
                buttonClass: 'is-success',
                onClick:()=>{
                  this.setState({dashboard: true});
                }
              },
              {
                text:'Create Event',
                buttonClass: 'is-info',
                onClick:() => {
                  this.setState({createEvent: true});
                }
              },
              {
                text:"Check Messages",
                buttonClass: 'is-warning',
                onClick:() => {
                  this.setState({checkMessages: true});
                },
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
                buttonClass: "is-danger"
              }
            ]}
          />

{/*======================================================================================================================================*/}
      {/*END OF NAVBAR STUFF*/}
{/*======================================================================================================================================*/}

          <div style={{height: '150px'}}></div>
            <Columns isCentered>
              <Column isSize={5}>
      {/*Text Fields for profile updates*/}
                <Box style={{ position: 'relative'}}>
                  <Title className="has-text-grey-light" isSize={1} style={{position: 'absolute', top: '-8%', right: '5%', background: 'white'}}>Profile</Title>
                  <Field>
                    <Label className="has-text-left">Age:</Label>
                    <Control>
                      <Input type="text" name="age" value={this.state.age} onChange={this.handleInput} />
                    </Control>
                  </Field>
                  <Field>
                    <Label className="has-text-left">Zipcode:</Label>
                    <Control>
                      <Input type="text" name="zipcode" value={this.state.zipcode} onChange={this.handleInput} />
                    </Control>
                  </Field>
                  <Field>
                    <Label className="has-text-left">Image URL:</Label>
                    <Control>
                      <Input type="text" name="img" value={this.state.img} onChange={this.handleInput} />
                    </Control>
                  </Field>
                  <Field>
                    <Label className="has-text-left">About Me:</Label>
                    <Control>
                      <TextArea type="text" name="aboutMe" value={this.state.aboutMe} onChange={this.handleInput} />
                    </Control>
                  </Field>
                  <Control>
                      <Button isColor='primary' onClick={this.handleSubmit} className="is-fullwidth">Submit</Button>
                  </Control>
                </Box>
              </Column>
              <Column isSize={8}>
          {/*Area for interests update*/}
                <Box style={{ position: 'relative', display: 'grid', gridTemplateColumns: '19% 19% 19% 19% 19%', gridGap:'10px'}} className="has-text-centered">
                  <Title className="has-text-grey-light" isSize={1} style={{position: 'absolute', top: '-37px', right: '5%', background: 'white'}}>Interests</Title>
                  {

                    categories.map((category, i) =>{
                    //map through categories and render them different colors
                    //depending on whether the user has selected it or not
                    return(
                      this.state.interests.includes(category) ?
                        (<Button
                          key={i}
                          className="is-medium"
                          isColor="info"
                          name={category}
                          style={{fontSize: '1.8vh'}}
                          onClick={this.handleInterestClick}>
                          {category}
                        </Button>)
                          :
                        (<Button
                          key={i}
                          className="is-medium"
                          isColor=""
                          isOutlined
                          name={category}
                          style={{fontSize: '1.8vh'}}
                          onClick={this.handleInterestClick}>
                          {category}
                        </Button>)
                      )
                    })
                  }
                </Box>
              </Column>
            </Columns>
          {/*Redirects via state change*/}
            {this.state.checkMessages? (<Redirect to= {{pathname:"/messages", state:this.state.user}} />) : null}
            {this.state.createEvent? (<Redirect to= {{pathname:"/eventCreate", state:this.state.user}} />) : null}
            {this.state.dashboard? (<Redirect to={{pathname:"/dashboard", state:this.state.user}}/>) : null}
            {this.state.logout? (<Redirect to="/" />) : null}
            {
              this.state.finishedProfile ? (<Redirect to={{
                pathname: "/dashboard",
                state: user
              }} />) : null
            }
        </Container>
      </div>
    )
  }
}

export default Profile;
