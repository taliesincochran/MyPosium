import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Navbar from '../../components/Nav/Navbar'
import axios from 'axios';
import { authObj } from '../../authenticate';
import EventCard from '../../components/EventCard/EventCard';
import { Container,
        Button,
        Columns,
        Column,
        Box,
        Image,
        Modal,
        ModalContent,
        ModalClose,
        Title,
        Subtitle,
        Delete,
        ModalBackground,
        ModalCardTitle,
        Field,
        Label,
        Control,
        Input,
        TextArea } from 'bloomer';
import moment from 'moment';




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
      user: this.props.location.state,
      isActive: false,
      hasGotEvents: false,
      activeMessageModal: false,
      activeEventModal: false,
      modalEvent: {attendees: [], username: null},
      usernameForEventCancellation: '',
      messageRecipient: '',
      subject: '',
      message: '',
      subjects: [],
      cancelEventMessage: '',
      cancelEventModal: false,
      eventsWithin: 5,
      eventsWithinDistance: [],
      unread: 0
    }
    this.burgerOnClick = this.burgerOnClick.bind(this)
    this.setState = this.setState.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  //On load page checks for, in order, Messages then events. Also removes background image
  componentDidMount =() => {
    axios
      .get('api/message/checkForNewMessage')
      .then(response => {
        let unread = 0;
        response.data.map(message => message.read===false? unread++: message)
        this.setState({unread});
      })
      axios.get("/api/users/" + this.state.user.username).then(result=>{
        this.setState({user: result.data})
      }).then(res=>this.getEvents(false))
      document.querySelector('body').style.backgroundImage = 'none';
  }

  //Function to get the local events
  getEvents =(remote) => {
    var setState = this.setState;
    var state = this.state;
    console.log('state', state)
    axios.get("/api/event/").then(events => {
      var userCreatedArray = [];
      var eventsMatchArray = [];
      //================================================================
      //Set up parameters of google maps distance matrix api call=======
      //================================================================
      const userLocation = this.state.user.zipcode;
      const metersPerMile = 1609.344;
      const travelMiles = this.state.eventsWithin;
      const travelMeters = travelMiles * metersPerMile;
      var destinations = '';
      var user = this.state.user;
      //================================================================
      //Seperate user created events, events user is already attending,=
      // and other events that match the users interests================
      //================================================================
      var eventsArray = events.data;
      eventsArray.map(event=> {
        var category = event.category
        if(this.state.user.username === event.username) {
          userCreatedArray.push(event)
        }
        else if (this.state.user.interests.indexOf(category) > -1 && event.attendees.indexOf(user._id) === -1 && this.state.user.attending.indexOf(user._id) === -1){
          eventsMatchArray.push(event)
        }
      })
      //================================================================
      //Seperating local from remote if remote === true then only ======
      //remote events events============================================
      //================================================================
      var eventsToShow =[];
      eventsMatchArray.map(event=> {
        if(event.isRemote === remote) {
          destinations = destinations + event.zipcode + "|"
          eventsToShow.push(event);
        console.log('zipcode', event.zipcode)
        console.log('destination', destinations)
        }
        return({events: eventsArray, eventsToShow: eventsToShow})
      })
      //================================================================
      //Query google maps distance matrix to get rough distance of    ==
      //event by zipcodes, as google maps returns the distances in    ==
      //the order queried, use the index of the row.element array     ==
      //returned to select correct events to include from the local   ==
      //event array                                                   ==
      //================================================================
      if(remote === false) {
        axios.get(`/api/location/destinations/${destinations}`).then(result=> {
          var eventsWithinDistance = [];
          console.log(result.data.status)
          result.data.status==="OK"?(
            result.data.rows[0].elements.map((destination, i)=> {
            console.log(destination)
            if(destination.status !== "NOT_FOUND") {
              if(destination.distance.value < travelMeters) {
                eventsWithinDistance.push(eventsToShow[i])
              }
            }
          })): ''

          //=============================================================
          //To insure the axios call is done before setting the state, ==
          //return query results and arrays and set up a .then         ==
          //=============================================================
          return({eventsMatch: eventsToShow, userCreated: userCreatedArray, events: eventsArray, eventsWithinDistance: eventsWithinDistance})
        }).then(results =>{
        setState({eventsWithinDistance: results.eventsWithinDistance, events: results.events, eventsMatchInterests: results.eventsMatch, userCreated: results.userCreated, hasGotEvents: true, userAttending: state.user.attending}, ()=> console.log('state set', state))
        })
      } else{
        setState({eventsMatch: eventsToShow, userCreated: userCreatedArray, events: eventsArray, eventsWithinDistance: eventsToShow, userAttending: state.user.attending, hasGotEvents: true})
      }
   })
  }

//Sets the recipient for messages before opening the message modal, necessary in case of multiple recipients

  openMessageModal = (recipient) => {
    this.setState({activeMessageModal: true, messageRecipient: recipient});
  }
  closeMessageModal = () => {
    this.setState({activeMessageModal: false})
  }

  //Close the Event Modal
  closeEventModal = () => {
    this.setState({activeEventModal: false})
  }


  handleInput = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

 // Sets distance preferred and gets events
  setDistance = (x) => {
    if(isNaN(x)) {
      this.getEvents(true)
    }
    else {
      this.setState({eventsWithin: x}, () => this.getEvents(false))
    }
  }

  //Message submission on click
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
      })
      .catch(err => console.log(err));
  }

  //This is hit before message modal opens to make sure multiple recipients is an option
  sendToAllAttendees= () => {
    axios.get('api/event/attendees/' + this.state.modalEvent._id)
      .then(response=> {
        let attendeeArr = [];
        response.data.attendees.forEach((username)=>{
          attendeeArr.push(username.username);
        })
        this.openMessageModal(attendeeArr);
      })
    this.closeEventModal();
  }

  //This is hit to set recipient for messages to host before opening the message modal
  sendMessageToOrganizer = () => {
    this.openMessageModal(this.state.modalEvent.username);
    this.closeEventModal();
  }

  //Logout, clear cookies.
  handleLogout = () => {
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

  //Function to add user to attending for event and add event to attending for user
  attend = (e) => {
    var id = e.target.value
    var attending = this.state.userAttending;
    axios.post("/api/event/" + e.target.value, this.state.user._id).then(result=>{
      this.getEvents(false);
      attending.push(id)
      this.setState({userAttending: attending, activeEventModal: false})
    })
  }

  burgerOnClick = () =>this.setState((state) => ({isActive:!this.state.isActive}))

//Sets the event information in state upon click
  eventModal = (event) => {
    if(event._id !== '0'){
      this.setState({modalEvent: event, activeEventModal: !this.state.activeEventModal})
    }
  }

//Sets event to be cancelled
  cancelEvent = () => {
    if(this.state.usernameForEventCancellation === this.state.modalEvent.username) {
      axios.get("api/event/cancelEvent/" + this.state.modalEvent._id).then(result =>{
        //Code for sending message
        this.setState({cancelEventModal: false}, ()=> {
          this.getEvents(false);
          this.sendToAllAttendees();
        })
      })
    }
  }

  //Opens cancel event modal
  toggleCancelEventModal = () => {
    this.setState({cancelEventModal: !this.state.cancelEventModal, activeEventModal: !this.state.activeEventModal})
  }


  render() {
    var events = this.state.events;
    var hasGotEvents = this.state.hasGotEvents;
    return(
      hasGotEvents?(
        <div style={{width: '100%', minHeight: '100vh', background: 'linear-gradient(to right, rgb(200,245,240), MintCream, MintCream, white, white, MintCream, MintCream, rgb(200,245,240))'}}>
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
          hasDropdown={true}
          dropdownText={`Events Within ${this.state.eventsWithin} miles`}

//-----------------------------------
//Dropdown for setting the distance tolerance
            navbarDropdown={[
            {
              value: 5,
              text: '5 miles',
              class: 'button is-primary is-fullwidth',
              onClick: () => this.setDistance(5)

            },
            {
              value: 10,
              text: '10 miles',
              class: 'button is-primary is-fullwidth',
              onClick: () => this.setDistance(10)

            },{
              value: 15,
              text: '15 miles',
              class: 'button is-primary is-fullwidth',
              onClick: () => this.setDistance(15)
            },{
              value: 20,
              text: '20 miles',
              class: 'button is-primary is-fullwidth',
              onClick: () => this.setDistance(20)
            },{
              value: 30,
              text: '30 miles',
              class: 'button is-primary is-fullwidth',
              onClick: () => this.setDistance(30)
            },{
              value: 40,
              text: '40 miles',
              class: 'button is-primary is-fullwidth',
              onClick: () => this.setDistance(40)
            },{
              value: 50,
              text: '50 miles',
              class: 'button is-primary is-fullwidth',
              onClick: () => this.setDistance(50)
            },{
              value: 'remote',
              text: 'Remote',
              class: 'button is-primary is-fullwidth',
              onClick: () => this.setDistance('remote')
            }
          ]}
//End of drop down for distance tolerance
//---------------------------------------------------

          navbarStyle={{boxShadow: '2px 2px 5px', position:"fixed", top:"0", left:"0", zIndex: '998', width: '100%'}}
          navbarEnd={[
            {
              text:'Create Event',
              onClick:() => {
                this.setState({createEvent: true});
              },
              buttonClass: "button is-info"
            },
            {
              text:"Check Messages",
              onClick:() => {
                this.setState({checkMessages: true});
              },
              buttonClass:"button is-warning"
            },
            {
              text:'Update Profile',
              onClick:()=>{
                this.setState({updateProfile: true});
              },
              buttonClass:"button is-primary"
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
              buttonClass: "button is-danger"
            }
          ]}
        />

{/*======================================================================================================================================*/}
      {/*END OF NAVBAR STUFF*/}
{/*======================================================================================================================================*/}

        <div style={{height: '100px'}}/>
          <Columns isCentered>
            <Column isSize="1/3">
              <Box>

              {/*Message notifications, user image and greeting*/}

                <Columns>
                  <Column>
                    <Image isSize="128x128" src={this.props.location.state.img || 'img/defaultUser.jpg'} />
                  </Column>
                  <Column>
                    <Title isSize={5}>Hi, {this.props.location.state.username}, welcome back!</Title>
                    {/* nested ternary checks if there are new messages, and outputs the message according to the number of new messages.  */}
                    <p>You have {this.state.unread===0 ?
                      'No new messages.'
                      :
                      (this.state.unread === 1 ?
                        (<Link to={{pathname: '/messages', state: this.state.user}}>{this.state.unread + ' new message!'}</Link>)
                        :
                        (<Link to={{pathname: '/messages', state: this.state.user}}>{this.state.unread + ' new messages!'}</Link>))}</p>
                  </Column>
                </Columns>


              </Box>
              <div style={{height: '20px'}} />
              <Box>

            {/*Events Area, first for organized then for attending*/}
                <h3>Events you've organized</h3>
                <div style={{height: '15px'}} />
                {this.state.events.length<0?(<p>You have organized no events</p>):
                  (this.state.userCreated.map(event=>{
                    return(
                      <div>
                        <EventCard event={event} isSmall={true} eventModal={this.eventModal} />
                        <div style={{height: '20px'}} />
                      </div>
                      )
                  }))}
              </Box>
              <div style={{height: '20px'}} />
              <Box>
                <h3>Events you are attending</h3>
                <div style={{height: '15px'}} />
                {this.state.userAttending.length<0?(<p>You are attending no events</p>):(
                  events.map(event=>{
                      return (
                        this.state.userAttending.includes(event._id)?(
                        <div>
                          <EventCard event={event} isSmall={true} eventModal={this.eventModal} />
                          <div style={{height: '20px'}} />
                        </div>
                      ): null)})
                  )}
              </Box>
            </Column>

          {/*------------------------------------*/}
          {/*Event area populated*/}
            <Column isSize='2/3'>
              <Box>
                <Title isSize={5}>Events you may be interested in.</Title>
                <div style={{height: '50px'}} />
                {this.state.eventsWithinDistance.map(event=>{
                    return(
                      <div>
                        <EventCard
                          event={event}
                          state={this.state}
                          onClick={this.attend}
                          eventModal={this.eventModal}
                        />
                        <div style={{height: '20px'}} />
                      </div>
                      )
                })}
              </Box>
            </Column>
          </Columns>

{/*==================================================*/}
{/*Here's the message modal There's virtually no functionality in this. Mostly styling*/}
        <Modal isActive={this.state.activeMessageModal ? true : false} >
          <ModalBackground />
          <ModalContent style={{padding: '20px'}}>
            <Delete onClick={this.closeMessageModal} />
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
      {/*End of the message modal */}
{/*==================================================*/}

{/*==================================================*/}
{/*Here's the Event modal. Pretty much just styling and formatting in here */}

        <Modal isActive={this.state.activeEventModal ? true : false} >
          <ModalBackground />
          <ModalContent style={{padding: '20px'}}>
            <Columns>
            <Delete onClick={this.closeEventModal} style={{margin: '20px 0'}}/>
            <ModalCardTitle  className="has-text-centered">
              <Title isSize={3}>{this.state.modalEvent.title}!</Title>
            </ModalCardTitle>
              </Columns>
              <Columns>
                <Column isSize='1/3'>
                  <Image src={this.state.modalEvent.imgUrl || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?w=1260&h=750&auto=compress&cs=tinysrgb'} />
                  <Title>{moment(this.state.modalEvent.date).format("dddd, MMMM Do YYYY")}</Title>
                  <Subtitle>{moment(this.state.modalEvent.time, 'HH:mm').format("h:mm a")}</Subtitle>
                  {this.state.modalEvent.isRemote?(<Subtitle>Remote</Subtitle>):(
                    <Subtitle>Located in: {this.state.modalEvent.zipcode}</Subtitle>
                  )}
                </Column>
                <Column>
                  <Title isSize={4}>Organized By: {this.state.modalEvent.username} </Title>
                  {this.state.modalEvent.cost?(<Subtitle>Cost: {this.state.modalEvent.cost}</Subtitle>):(<Subtitle>Free Event</Subtitle>)}
                  <Subtitle>Because you are interested in {this.state.modalEvent.category}</Subtitle>
                  <Subtitle>{this.state.modalEvent.description}</Subtitle>
                  <Subtitle>{this.state.modalEvent.attendees.length}/{this.state.modalEvent.maxAttending} of attendees signed up</Subtitle>
                </Column>
              </Columns>
              {this.state.user.attending.includes(this.state.modalEvent._id)?(<Button isColor='primary' onClick={this.sendMessageToOrganizer} className="is-fullWidth">Send Message To Organizer</Button>):null}
              {(this.state.user.username !== this.state.modalEvent.username && !this.state.user.attending.includes(this.state.modalEvent._id))?(<Button isColor="primary" onClick={this.attend} value={this.state.modalEvent._id} className="is-fullwidth">Attend</Button>):null}
              {(this.state.modalEvent.username === this.state.user.username)?(
                <div>
                  <Button isColor="primary" onClick={this.sendToAllAttendees} className='is-fullwidth'>Send Message To All Attending</Button>
                  <Button isColor="danger" onClick={this.toggleCancelEventModal} className='is-fullwidth'>Cancel Event</Button>
                </div>
                ):null}
            </ModalContent>
          <ModalClose isSize='large'/>
        </Modal>
      {/*End of the Event modal */}
{/*==================================================*/}

{/*==================================================*/}
{/*Here's the cancel event modal */}
        <Modal isActive={this.state.cancelEventModal? true: false} >
          <ModalBackground />
          <ModalContent style={{padding: '20px'}}>
            <Delete onClick={this.toggleCancelEventModal} />
            <ModalCardTitle className="has-text-centered">Are you sure you want to cancel this event? This cannot be undone!</ModalCardTitle>
            <Field>
              <Label className="has-text-left">Enter your username to confirm event cancelation.</Label>
              <Control>
                <Input name='usernameForEventCancellation' type="text" placeholder="Type your username here." onChange={this.handleInput} value={this.state.usernameForEventCancellation}/>
              </Control>
            </Field>
            <Field>
              <Label className="has-text-left">"Subject"</Label>
              <Control>
                <Input name='subject' type="text" placeholder="Type your username here." onChange={this.handleInput} value={this.state.subject}/>
              </Control>
            </Field>
            <Field>
              <Label className="has-text-left">"Send A Message To All Attending"</Label>
              <Control>
                <TextArea name='message' placeholder="Type Message Here" onChange={this.handleInput} value={this.state.message}/>
              </Control>
            </Field>
            <Control>
              <Button isColor="primary" onClick={this.toggleCancelEventModal} className="is-fullwidth">Close Window</Button>
              <Button isColor="danger" onClick={this.cancelEvent} className="is-fullwidth">Cancel Event</Button>
            </Control>
          </ModalContent>
          <ModalClose />
        </Modal>
      {/*End of the cancel event modal */}
{/*==================================================*/}


{/*Redirects operating through state change*/}
        {this.state.createEvent? (<Redirect to= {{pathname:"/eventCreate", state:this.state.user}} />) : null}
        {this.state.checkMessages? (<Redirect to={{pathname:"/messages", state:this.state.user}}/>) : null}
        {this.state.updateProfile? (<Redirect to={{pathname:"/updateProfile", state:this.state.user}}/>) : null}
        {this.state.logout? (<Redirect to="/" />) : null}
      </Container>
    </div>
      ): null
    )
  }
}
export default Dashboard;
