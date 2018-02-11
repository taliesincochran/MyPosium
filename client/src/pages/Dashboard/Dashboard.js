import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../../components/Nav/Navbar'
import axios from 'axios';
import { authObj } from '../../authenticate';
import EventCard from '../../components/EventCard/EventCard';
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
        ModalCardBody,
        ModalCard,
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
      // eventsMatchInterests:[],
      user: this.props.location.state,
      isActive: false,
      hasGotEvents: false,
      activeMessageModal: false,
      activeEventModal: false,
      modalEvent: {attendees: []},
      messageRecipient: '',
      subject: '',
      message: '',
      eventsWithin: 5,
      eventsWithinDistance: []
    }
    this.burgerOnClick = this.burgerOnClick.bind(this)
    this.setState = this.setState.bind(this)
  }
  componentDidMount =() => {
      axios.get("/api/users/" + this.state.user.username).then(result=>{
        // console.log("user get", result);
        this.setState({user: result.data})
      }).then(res=>this.getEvents(false))
      // console.log("user", this.props.location.state)
      // console.log("state, user", this.state.user)
      document.querySelector('body').style.backgroundImage = 'none';
  }
  getEvents =(remote) => {
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
        if (this.state.user.interests.indexOf(category) > -1 && event.attendees.indexOf(user._id) === -1 && this.state.user.attending.indexOf(user._id) === -1){
          eventsMatchArray.push(event)
        }
      })
      //================================================================
      //Seperating local from remote if remote === true then only ======
      //remote events events============================================
      //================================================================
      var eventsToShow =[];
      eventsMatchArray.map(event=> {
        console.log(event)
        if(event.isRemote === remote) {
          destinations = destinations + event.zipcode + "|" 
          eventsToShow.push(event);
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
      if(remote === false && userLocation.toString().length === 5) {
        const queryURL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation}&destinations=${destinations}&key=AIzaSyDpwnTjzyOwCRmPRQhpu0eREKplFV0TCDI`
        axios.get(queryURL).then(result=> {
          console.log(result.data);
          var eventsWithinDistance = [];
          result.data.status==="OK"?(
          result.data.rows[0].elements.map((destination, i)=> {
            if(destination.distance.value < travelMeters) {
              eventsWithinDistance.push(eventsToShow[i])
            }
          })):console.log("queryURL", queryURL)
          //=============================================================
          //To insure the axios call is done before setting the state, ==
          //return query results and arrays and set up a .then         ==        
          //=============================================================
          return({eventsMatch: eventsToShow, userCreated: userCreatedArray, events: eventsArray, eventsWithinDistance: eventsWithinDistance})
        }).then(results =>{
        this.setState({eventsWithinDistance: results.eventsWithinDistance, events: results.events, eventsMatchInterests: results.eventsMatch, userCreated: results.userCreated, hasGotEvents: true, userAttending: this.state.user.attending}, ()=> console.log('state set', this.state))
        })
      } else{
        this.setState({eventsMatch: eventsToShow, userCreated: userCreatedArray, events: eventsArray, eventsWithinDistance: eventsToShow, userAttending: this.state.user.attending, hasGotEvents: true})
      }
   })
  }

  openMessageModal = (organizer) => {
    this.setState({activeMessageModal: true, messageRecipient: organizer});
  }

  closeModal = () => {
    this.setState({activeMessageModal: false})
  }
  closeEventModal = () => {
    this.setState({activeEventModal: false})
  }
  handleInput = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }
  setDistance = (x) => {
    if(isNaN(x)) {
      this.getEvents(true)
    }
    else {
      this.setState({eventsWithin: x}, () => this.getEvents(false))
    }
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
     console.log("attend called", e.target.value);
    var id = e.target.value
    var attending = this.state.userAttending;
    axios.post("/api/event/" + e.target.value, this.state.user._id).then(result=>{
      console.log("attending update result: ", result)
      this.getEvents();
      attending.push(id)
      console.log(attending);
      this.setState({userAttending: attending, activeEventModal: false})
    })
  }
  burgerOnClick = () =>this.setState((state) => ({isActive:!this.state.isActive}))
      
  eventModal = (event) => {
    if(event._id !== '0'){
      this.setState({modalEvent: event, activeEventModal: !this.state.activeEventModal})
    }
  }
  render() {
    console.log(this.state.modalEvent.attendees.length)
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
          hasDropdown={true}
          dropdownText={`Events Within ${this.state.eventsWithin} miles`}
          navbarDropdown={[
            {
              value: 5,
              text: '5 miles',
              class: 'button is-primary',
              onClick: () => this.setDistance(5)

            },
            {
              value: 10,
              text: '10 miles',
              class: 'button is-primary',
              onClick: () => this.setDistance(10)

            },{
              value: 15,
              text: '15 miles',
              class: 'button is-primary',
              onClick: () => this.setDistance(15)
            },{
              value: 20,
              text: '20 miles',
              class: 'button is-primary',
              onClick: () => this.setDistance(20)
            },{
              value: 30,
              text: '30 miles',
              class: 'button is-primary',
              onClick: () => this.setDistance(30)
            },{
              value: 40,
              text: '40 miles',
              class: 'button is-primary',
              onClick: () => this.setDistance(40)
            },{
              value: 50,
              text: '50 miles',
              class: 'button is-primary',
              onClick: () => this.setDistance(50)
            },{
              value: 'remote',
              text: 'Remote',
              class: 'button is-primary',
              onClick: () => this.setDistance('remote')
            }
          ]}
          navbarStyle={{boxShadow: '2px 2px 5px', position:"fixed", top:"0", left:"0", zIndex: '998', width: '100%'}}
          navbarEnd={[
            {
              text:'Create Event',
              onClick:() => {
                this.setState({createEvent: true});
              },
              buttonClass: "button is-warning"
            },
            {
              text:"Check Messages",
              onClick:() => {
                this.setState({checkMessages: true});
              },
              buttonClass:"button is-primary"
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
        <div style={{height: '100px'}}/>
        <Columns isCentered>
          <Column isSize="1/3">
            <Box>
              <Image isSize="128x128" src={this.props.location.state.img} />
              <p>Hi, {this.props.location.state.username}</p>
            </Box>
            <div style={{height: '20px'}} />
            <Box>
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
          <Column isSize='2/3'>
            <Box>
              <h2>Events you may be interested in.</h2>
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

        <Modal isSize='large' isActive={this.state.activeMessageModal? true: false} >
          <ModalBackground />
          <ModalContent style={{padding: '20px'}}>
            <Delete onClick={this.closeEventModal} />
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

        <Modal isSize='large' isActive={this.state.activeEventModal? true: false} >
          <ModalBackground />
          <ModalCard>
            <ModalCardTitle className="has-text-centered">{}{this.state.modalEvent.title}!</ModalCardTitle>
            <ModalCardBody style={{padding: '20px'}}>
              <Delete onClick={this.closeEventModal} />
                <Columns>
                  <Column isSize='1/3'>
                    <Image src={this.state.modalEvent.imgUrl} />
                    <Title>{moment(this.state.modalEvent.date).format("dddd, MMMM Do YYYY")}</Title>
                    <Subtitle>{moment(this.state.modalEvent.time).format("h:hh a")}</Subtitle>
                    {this.state.modalEvent.isRemote?(<Subtitle>Remote</Subtitle>):(
                      <Subtitle>Located in: {this.state.modalEvent.zipcode}</Subtitle>
                    )}
                  </Column>
                  <Column>
                    <Title>Organized By: {this.state.modalEvent.username} </Title>
                    {this.state.modalEvent.cost?(<Subtitle>Cost: {this.state.modalEvent.cost}</Subtitle>):(<Subtitle>Free Event</Subtitle>)}
                    <Subtitle>Because your intrested in {this.state.modalEvent.category}</Subtitle>
                    <Subtitle>{this.state.modalEvent.description}</Subtitle>
                    <Subtitle>{this.state.modalEvent.attendees.length}/{this.state.modalEvent.maxAttending} of attendees signed up</Subtitle>
                  </Column>
                </Columns>
                {this.state.user.attending.includes(this.state.modalEvent._id)?
                  (<Button isColor='primary' onClick={() => {
                    this.openMessageModal(this.state.modalEvent.username);
                    this.closeEventModal();
                  }}>Send Message To Organizer</Button>):
                  (<Button isColor="primary" onClick={this.attend} className="is-fullwidth">Attend</Button>)
                }
              </ModalCardBody>
            </ModalCard>
          <ModalClose isSize='large'/>
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
