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
        // ModalCard,
        // ModalCardFooter,
        // ModalCardBody,
        Delete,
        ModalBackground,
        ModalCardTitle,
        // ModalCardHeader,
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
      userAttending: this.props.location.state.attending,
      eventsMatchInterests:[],
      user: this.props.location.state,
      isActive: false,
      activeMessageModal: false,
      messageRecipient: '',
      subject: '',
      message: '',
    }
    this.burgerOnClick = this.burgerOnClick.bind(this)
    this.setState = this.setState.bind(this)
  }
  componentDidMount =() => {
      this.getEvents();
  }
  getEvents =() => {
    axios.get("/api/event/").then(events => {
      console.log(events.data)
      var userCreatedArray = [];
      var eventsMatchArray = [];
      var user = this.state.user;
      // var attending = this.state.user.attending;
      // var interests = this.state.user.interests;
      var eventsArray = events.data
      console.log(eventsArray);
      eventsArray.map(event => {
        var category = event.category
        if(this.props.location.state.username === event.username) {
          console.log('created...', event)
          userCreatedArray.push(event)
        }
        if (this.props.location.state.interests.indexOf(category) > -1 && event.attendees.indexOf(user._id) === -1 && this.props.location.state.attending.indexOf(user._id) === -1){
          // console.log("interesting...", event)
          eventsMatchArray.push(event)
        }
      })
      return({eventsMatch: eventsMatchArray, userCreated: userCreatedArray, events: eventsArray})
    }).then(results =>{
      console.log(results)
      this.setState({events: results.events, eventsMatchInterests: results.eventsMatch, userCreated: results.userCreated}, ()=> console.log('state set', this.state))})
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
    console.log('(((((((((((((((((((())))))))))))))))))))'  ,newMessage)
    axios
      .post('api/message/create', newMessage)
      .then(response => {
        console.log('response from creating new message',response)
      })
      .catch(err => console.log(err));
  }

  handleLogout = () => {
    console.log("api/users/logout called")
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
  // getCreatedEvents = () => {
  //   })
  // }
  // getInterestEvents = () => {
  // }
  attend = (e) => {
    console.log("attend called", e.target.value);
    var id = e.target.value
    axios.post("/api/event/" + e.target.value, this.state.user._id).then(result=>{
      console.log("attending update result: ", result)
      this.getEvents();
      var attending = this.state.userAttending;
      attending.push(id)
      console.log(attending);
      this.setState({userAttending: attending})
    })
  }
  burgerOnClick = () =>this.setState((state) => ({isActive:!this.state.isActive}))
  render() {
    // var checkMessages= this.checkMessages;
    // var createEvent = this.createEvent;
    // var handleLogout = this.handleLogout;
    var events = this.state.events
    //console.log(this.checkMessages)
    return(
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
              text:"Check Messages",
              onClick:() => {
                this.setState({checkMessages: true});
              },
            },
            {
              text:'Create Event',
              onClick:() => {
                this.setState({createEvent: true});
              }
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
                //console.log("api/users/logout called")
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
        <Columns>
          <Column isSize="1/4">
            <Box>
              <Image isSize="64x64" src="data:image/png;base64,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" />
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
                            <Image src={event.imageURL || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?h=350&auto=compress&cs=tinysrgb'} />
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
                    // console.log(this.state.userAttending.indexOf(event.id))
                    return (
                      this.state.userAttending.includes(event._id)?(
                      <Box style={{height: '150px', overflow: 'scroll'}}>
                        <Columns>
                          <Column isSize='1/4'>
                            <Image src={event.imageURL || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?h=350&auto=compress&cs=tinysrgb'} />
                          </Column>
                          <Column isSize='3/4'>
                            <h2>{event.title}</h2>
                            <p>time: {event.time}</p>
                            <p>date: {event.date}</p>
                            <button  isColor="primary" onClick={() => this.openMessageModal(event.username)}>Send Message</button>
                          </Column>
                        </Columns>
                      </Box>
                    ): null)})
                )}
            </Box>
          </Column>
          <Column isSize='3/4'>
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
                        <Image src={event.imgURL || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?w=1260&h=750&auto=compress&cs=tinysrgb'} />
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
            <ModalCardTitle className="has-text-centered">Send a Message!</ModalCardTitle>
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
              <Button isColor="primary" isSize="large" onClick={this.submitMessage} style={{width: "100%"}}>Send Message</Button>
            </Control>
          </ModalContent>
          <ModalClose />
        </Modal>

        {this.state.createEvent? (<Redirect to= {{pathname:"/event/create", state:this.state.user}} />) : null}
        {this.state.checkMessages? (<Redirect to={{pathname:"/messages/sent", state:this.state.user}}/>) : null}
        {this.state.updateProfile? (<Redirect to={{pathname:"/profile", state:this.state.user}}/>) : null}
        {this.state.logout? (<Redirect to="/" />) : null}
      </Container>
    )
  }
}
export default Dashboard;
