import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../../components/Nav/Navbar'
import axios from 'axios';
import { authObj } from '../../authenticate';
// import EventCard from '../../components/EventCard/EventCard';
// import Media from '../../components/Media/Media';
import { Container,
        Button,
        Columns,
        Column,
        Box,
        Image,
        Modal,
        ModalContent,
        ModalClose,
        Delete,
        ModalBackground,
        ModalCardTitle,
        Field,
        Label,
        Control,
        Input,
        TextArea } from 'bloomer';

class Dashboard extends Component {
    constructor(props) {
    super(props);
    this.state = {
      logout: false,
      checkMessages: false,
      createEvent: false,
      updateProfile: false,
      dashboard: false,
      events:[],
      userCreated: [],
      userAttending: [],
      eventsMatchInterests:[],
      user: this.props.location.state,
      isActive: false,
      hasGotEvents: false,
      activeMessageModal: false,
      messageRecipient: '',
      subject: '',
      message: '',
    }
    this.burgerOnClick = this.burgerOnClick.bind(this)
    this.setState = this.setState.bind(this)
  }
  componentDidMount =() => {
      axios.get("/api/users/" + this.state.user.username).then(result=>{
        // console.log("user get", result);
        this.setState({user: result.data})
      }).then(res=>this.getEvents())
      // console.log("user", this.props.location.state)
      // console.log("state, user", this.state.user)
      this.getEvents();
      document.querySelector('body').style.backgroundImage = 'none';
  }
  getEvents =() => {
    axios.get("/api/event/").then(events => {
      // console.log(events.data)
      var userCreatedArray = [];
      var eventsMatchArray = [];
      var user = this.state.user;
      // var interests = this.state.user.interests;
      var eventsArray = events.data
      // console.log(eventsArray);
      eventsArray.map(event => {
        var category = event.category
        if(this.state.user.username === event.username) {
          // console.log('created...', event)

          userCreatedArray.push(event)
        }
        if (
          this.state.user.interests.indexOf(category) > -1
          && event.attendees.indexOf(user._id) === -1
          &&
          this.state.user.attending.indexOf(user._id) === -1
          ){
          // console.log("interesting...", event)
          eventsMatchArray.push(event)
        }
        return event;
      })
      return({eventsMatch: eventsMatchArray, userCreated: userCreatedArray, events: eventsArray})
    }).then(results =>{
      // console.log(results)
      this.setState({events: results.events, eventsMatchInterests: results.eventsMatch, userCreated: results.userCreated, hasGotEvents: true, userAttending: this.state.user.attending}, ()=> console.log('state set', this.state))})
  }

  openMessageModal = (organizer) => {
    this.setState({activeMessageModal: true, messageRecipient: organizer});
  }

  closeModal = () => {
    this.setState({activeMessageModal: false})
  }

  handleInput = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  submitMessage = e => {
    this.setState({activeMessageModal: false})
    let newMessage = {
      sender: this.state.user,
      recipient: this.state.messageRecipient,
      subject: this.state.subject,
      message: this.state.message
    }
    axios
      .post('api/message/create', newMessage)
      .then(response => {
        // console.log('response from creating new message',response)
      })
      .catch(err => console.log(err));
  }

  handleLogout = () => {
    // console.log("api/users/logout called")
    axios
      .get('api/users/logout')
      .then(response => {
        authObj.logout();
        if (response.status === 200){
          this.setState({logout:true});
        }
      })
      .catch(err => console.log(err));
  }
  attend = (e) => {
    // console.log("attend called", e.target.value);
    var id = e.target.value
    axios.post("/api/event/" + e.target.value, this.state.user._id).then(result=>{
      // console.log("attending update result: ", result)
      this.getEvents();
      var attending = this.state.userAttending;
      attending.push(id)
      // console.log(attending);
      this.setState({userAttending: attending})
    })
  }
  burgerOnClick = () =>this.setState((state) => ({isActive:!this.state.isActive}))
  render() {
    // var checkMessages= this.checkMessages;
    // var createEvent = this.createEvent;
    // var handleLogout = this.handleLogout;
    var events = this.state.events;
    var hasGotEvents = this.state.hasGotEvents;
    // var setState = this.state.setState;
    //console.log(this.checkMessages)
    return(
      hasGotEvents?(
      <Container>
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
              text:'Create Event',
              onClick:() => {
                this.setState({createEvent: true});
              }
            },
            {
              text:"Check Messages",
              onClick:() => {
                this.setState({checkMessages: true});
              },
            },
            {
              text:'Update Profile',
              onClick:()=>{
                this.setState({updateProfile: true});
              }
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
          ]}
        />
        <div style={{height: '100px'}}/>
        <Columns isCentered>
          <Column isSize="1/3">
            <Box>
              <Image isSize="128x128" src={this.props.location.state.img} />
              <p>Hi, {this.props.location.state.username}</p>
            </Box>
            <Box>
              <h3>Events you've organized</h3>
              {this.state.events.length<0?(<p>You have organized no events</p>):
                (this.state.userCreated.map(event=>{

                  return(
                      <Box style={{height: '150px', overflow: 'scroll'}}>
                        <Columns>
                          <Column isSize='1/4'>
                            <Image src={event.imageUrl || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?h=350&auto=compress&cs=tinysrgb'} />
                          </Column>
                          <Column isSize='3/4'>
                            <h2>{event.title}</h2>
                            <p>time: {event.time}</p>
                            <p>date: {event.date}</p>
                          </Column>
                        </Columns>
                      </Box>
                    )
                }))}
            </Box>
            <Box>
              <h3>Events you are attending</h3>
              {this.state.userAttending.length<0?(<p>You are attending no events</p>):(
                events.map(event=>{
                    return (
                      this.state.userAttending.includes(event._id)?(
                      <Box style={{height: '150px', overflow: 'scroll'}}>
                        <Columns>
                          <Column isSize='1/4'>
                            <Image src={event.imgUrl || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?h=350&auto=compress&cs=tinysrgb'} />
                          </Column>
                          <Column isSize='3/4'>
                            <h2>{event.title}</h2>
                            <p>time: {event.time}</p>
                            <p>date: {event.date}</p>
                            <Button  isColor="secondary" onClick={() => this.openMessageModal(event.username)}>Send Message</Button>
                          </Column>
                        </Columns>
                      </Box>
                    ): null)})
                )}
            </Box>
          </Column>
          <Column isSize='2/3'>
            <Box>
              <h2>Events you may be interested in.</h2>
              <div style={{height: '50px'}} />
              {this.state.eventsMatchInterests.map(event=>{

                return(
                  <Box key={event._id} style={{height: '250px', overflow: 'auto'}}>
                    <Columns>
                      <Column isSize='1/4' >
                        <h1 style={{textDecoration: 'underline'}}><strong>{event.title}</strong></h1>
                        <br />
                        <Image src={event.imgUrl || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?w=1260&h=750&auto=compress&cs=tinysrgb'} />
                      </Column>
                      <Column isSize='3/4'>
                        <p>Description: {event.description}</p>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
                        <Button onClick={this.attend} value={event._id}>Attend</Button>
                      </Column>
                    </Columns>
                  </Box>
                )
              })}
            </Box>
          </Column>
        </Columns>

        <Modal isSize='large' isActive={this.state.activeMessageModal? true: false} >
          <ModalBackground />
          <ModalContent style={{padding: '20px'}}>
            <Delete onClick={this.closeModal} />
            <ModalCardTitle className="has-text-centered">Send a Message to: {this.state.messageRecipient}!</ModalCardTitle>
            <Field>
              <Label className="has-text-left">Subject:</Label>
              <Control>
                <Input name="subject" type="text" placeholder='Enter Subject' onChange={this.handleInput} value={this.state.subject}/>
              </Control>
            </Field>
            <Field>
              <Label className="has-text-left">Message:</Label>
              <Control>
                <TextArea name="message" placeholder={'Enter Message'} onChange={this.handleInput} value={this.state.message}/>
              </Control>
            </Field>
            <Control>
              <Button isColor="primary" onClick={this.submitMessage} className="is-fullwidth">Send Message</Button>
            </Control>
          </ModalContent>
          <ModalClose />
        </Modal>

        {this.state.createEvent? (<Redirect to= {{pathname:"/event/create", state:this.state.user}} />) : null}
        {this.state.checkMessages? (<Redirect to={{pathname:"/messages", state:this.state.user}}/>) : null}
        {this.state.updateProfile? (<Redirect to={{pathname:"/updateProfile", state:this.state.user}}/>) : null}
        {this.state.logout? (<Redirect to="/" />) : null}
      </Container>
      ): null
    )
  }
}
export default Dashboard;
