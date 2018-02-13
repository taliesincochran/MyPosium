import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Tile, Box, Columns, Column, Container, Tabs, Tab, TabList, TabLink, Icon, Menu, MenuLabel, MenuList, MenuLink } from 'bloomer';
import { authObj } from '../../authenticate';
import Navbar from '../../components/Nav/Navbar';



export default class SentMessages extends Component {

  state = {
    sentMessages: this.props.location.state.sentMessages,
    receivedMessages: this.props.location.state.receivedMessages,
    logout: false,
    createEvent: false,
    dashboard: false,
    toggle: false,
    isActive: false,
    sentActive: false,
    receivedActive: true,
    user: this.props.location.state,
    currentMessage: '',
    updateProfile: false
  }

  //gets messages, stores in state
  componentDidMount() {
    this.getMessages()
        .then(response => {
          this.setState({ sentMessages: response.data.sentMessages, receivedMessages: response.data.receivedMessages });
        })
        .catch(err  => console.log(err));
  }

//The actual axios call to get the messages operation in routes folder
  getMessages = () => {
    return axios.get('/api/message/populate')
  }

//Repopulates when clicking on sent messages
  activateSent = () => {
    this.getMessages()
        .then(response => {
          this.setState({
            toggle: true,
            sentActive: true,
            receivedActive: false,
            currentMessage: '',
            sentMessages: response.data.sentMessages,
            receivedMessages: response.data.receivedMessages
          });
        })
        .catch(err => console.log(err))

  }

//Repopulates messages received when clicking on received messages
  activateReceived = () => {
    this.getMessages()
        .then(response => {
          this.setState({
            toggle: false,
            sentActive: false,
            receivedActive: true,
            currentMessage: '',
            sentMessages: response.data.sentMessages,
            receivedMessages: response.data.receivedMessages
          });
        })
        .catch(err => console.log(err))
  }

//Setting the path for sent message
  getOneSentMessage = id => {
    this.getOneMessage('/api/message/getOneSent/', id);
  }

//Setting the path for received message
  getOneReceivedMessage = id => {
    this.getOneMessage('/api/message/getOneReceived/', id);
  }

//Actually getting the message
  getOneMessage = (path, id) => {
    this.getMessages()
        .then(response => {
          this.setState({
            sentMessages: response.data.sentMessages,
            receivedMessages: response.data.receivedMessages
          }, function () {
            axios
              .get(path + id)
              .then(result => {
                this.setState({currentMessage: result.data});
              })
          });
        })
        .catch(err => console.log(err))
  }

  burgerOnClick = () =>this.setState((state) => ({isActive:!this.state.isActive}))


  render() {
    return(
      // <div style={{width: '100%', height: '100%', background: 'linear-gradient(to right, rgb(200,245,240), MintCream, MintCream, white, white, MintCream, MintCream, rgb(200,245,240))'}}>
      <div style={{minHeight: '100vh', backgroundImage: 'url("img/coloredLines.jpg")', backgroundAttachment: 'fixed', backgroundSize: '100% 100%'}}>
        <div style={{height: '100px'}}></div>

{/*======================================================================================================================================*/}
        {/*NAVBAR STUFF Probably not to be edited except if navbar is updated*/}
{/*======================================================================================================================================*/}

        <Navbar
          hasBrand={true}
          brandText="MyPosium Messages"
          onClick={this.burgerOnClick}
          isActive={this.state.isActive}
          hasEnd={true}
          hasEndButtons={true}
          navbarStyle={{boxShadow: '2px 2px 5px', position:"fixed", top:"0", left:"0", zIndex: '998', width: '100%'}}
          navbarEnd={[
            {
              text:"Dashboard",
              buttonClass: 'button is-success',
              onClick:() => {
                this.setState({dashboard: true});
              },
            },
            {
              text:'Create Event',
              buttonClass: 'button is-info',
              onClick:() => {
                this.setState({createEvent: true});
              },
            },
            {
              text:"Update Profile",
              buttonClass: 'button is-primary',
              onClick:() => {
                this.setState({updateProfile: true});
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
              buttonClass: "button is-danger"
            }
          ]}
        />

{/*======================================================================================================================================*/}
      {/*END OF NAVBAR STUFF*/}
{/*======================================================================================================================================*/}

        <Container >
          <Box style={{minHeight: '80vh'}}>

        {/*-------------------------------*/}
        {/*The tabs for messages*/}
          <Tabs isBoxed={true}>
            <TabList>
              <Tab isActive={this.state.sentActive? true : false}>
                <TabLink onClick={this.activateSent}>
                  <Icon isSize='small'><span className='far fa-sticky-note' aria-hidden='true' /></Icon>
                  <span>Sent Messages</span>
                </TabLink>
              </Tab>
              <Tab isActive={this.state.receivedActive? true : false}>
                <TabLink onClick={this.activateReceived}>
                    <Icon isSize='small'><span className='far fa-envelope' aria-hidden='true' /></Icon>
                    <span>Received Messages</span>
                </TabLink>
              </Tab>

            </TabList>
          </Tabs>
        {/*End of the tabs for messages*/}
        {/*-------------------------------*/}

        {/*-------------------------------*/}
        {/*The biggest ternary Ever. Starts with display sent messages*/}
          { this.state.toggle?
          (<Columns>
            <Column isSize={3}>
              <Menu>
                <MenuLabel>Messages</MenuLabel>
                <MenuList>
                  {/*Checks if there are any sent messages*/}
                  {
                    this.state.sentMessages.length >0?
                    (this.state.sentMessages.map((message,i) => {
                      return (<li key={i}><MenuLink onClick={() => {this.getOneSentMessage(message._id)}}>From: {message.sender} <br/> Subject: {message.subject}</MenuLink></li>)
                    })) : <p>No Sent Messages</p>
                  }
                </MenuList>
              </Menu>
            </Column>
            <Column>
              {
                this.state.currentMessage !== '' && this.state.sentActive?
                (
                  <Tile isParent>
                    <Tile isChild render={
                        props => (
                            <Box {...props}>
                                <div>
                                  <p>From: {this.state.currentMessage.sender}</p>
                                  <p>To: {this.state.currentMessage.recipient}</p>
                                  <p>Subject: {this.state.currentMessage.subject}</p>
                                  <br/>
                                  <p>{this.state.currentMessage.message}</p>
                                </div>
                            </Box>
                          )
                      } />
                  </Tile>
                ) : ''
              }
            </Column>
          </Columns>)
        {/*End of the sent messages column*/}
        
        {/*The Else part of the biggest ternary ever*/}
            :
          (<Columns>
            <Column isSize={3}>
              <Menu>
                <MenuLabel>Messages</MenuLabel>
                <MenuList>
                {/*Checks if there are any received messages*/}
                  {
                    this.state.receivedMessages.length >0 ?
                    (this.state.receivedMessages.map((message,i) => {
                      if (message.read) {
                        return (<li key={i}><MenuLink style={{whiteSpace: 'pre', textDecoration: 'none'}} onClick={() => {this.getOneReceivedMessage(message._id)}}>&#9993;{" "}From: {message.sender}<br/>{"     "}Subject: {message.subject}</MenuLink></li>)
                      } else {
                        return (<li key={i}><MenuLink style={{whiteSpace: 'pre', textDecoration: 'none'}} onClick={() => {this.getOneReceivedMessage(message._id)}}>&#128232;{" "}<b>From: {message.sender}<br/>{"     "}Subject: {message.subject}</b></MenuLink></li>)
                      }
                    }))
                    :
                    (<p>No Received Messages</p>)
                  }
                </MenuList>
              </Menu>
            </Column>
            <Column>
              {
                this.state.currentMessage !== '' && this.state.receivedActive?
                (
                  <Tile isParent>
                    <Tile isChild render={
                        props => (
                            <Box {...props}>
                                <div>
                                  <p>From: {this.state.currentMessage.sender}</p>
                                  <p>To: {this.state.currentMessage.recipient}</p>
                                  <p>Subject: {this.state.currentMessage.subject}</p>
                                  <br/>
                                  <p>{this.state.currentMessage.message}</p>
                                </div>
                            </Box>
                          )
                      } />
                  </Tile>
                ) : ''
              }
            </Column>
          </Columns>)
        }
        {/*End of the ternary all others are afraid of. Congratulations*/}
        {/*-------------------------------*/}

        </Box>
        </Container>

        {/*Redirects operating from state changes*/}
        {this.state.updateProfile? (<Redirect to={{pathname:"/updateProfile", state:this.state.user}}/>) : null}
        {this.state.createEvent? (<Redirect to= {{pathname:"/event/create", state:this.state.user}} />) : null}
        {this.state.dashboard? (<Redirect to={{pathname:"/dashboard", state:this.state.user}}/>) : null}
        {this.state.logout? (<Redirect to="/" />) : null}
      </div>
    )
  }
}
