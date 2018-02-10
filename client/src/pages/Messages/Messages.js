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
  componentDidMount() {
    this.getMessages();
  }

  getMessages = () => {
    axios
      .get('/api/message/populate')
      .then(response => {
        this.setState({ sentMessages: response.data.sentMessages, receivedMessages: response.data.receivedMessages });
      })
      .catch(err  => console.log(err));
  }

  activateSent = () => {
    this.setState({toggle: true, sentActive: true, receivedActive: false, currentMessage: ''});
  }

  activateReceived = () => {
    this.setState({toggle: false, sentActive: false, receivedActive: true, currentMessage: ''});
  }

  getOneMessage = id => {
    axios
      .get('/api/message/getOne/' + id)
      .then(result => {
        this.setState({currentMessage: result.data});
      })
  }

  burgerOnClick = () =>this.setState((state) => ({isActive:!this.state.isActive}))


  render() {
    return(
      <div >
        <div style={{height: '100px'}}></div>
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
              text:"Dashboard",
              onClick:() => {
                this.setState({dashboard: true});
              },
            },
            {
              text:'Create Event',
              onClick:() => {
                this.setState({createEvent: true});
              }
            },
            {
              text:"Update Profile",
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
              buttonClass: "isDanger"
            }
          ]}
        />
        <Container isFluid>
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

          {/* conditional render here */}
          { this.state.toggle?
          (<Columns>
            <Column isSize={3}>
              <Menu>
                <MenuLabel>Messages</MenuLabel>
                <MenuList>
                  {
                    this.state.sentMessages.length >0?
                    (this.state.sentMessages.map((message,i) => {
                      return (<li key={i}><MenuLink onClick={() => {this.getOneMessage(message._id)}}>from: {message.sender}, subj: {message.subject}</MenuLink></li>)
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
            :
          (<Columns>
            <Column isSize={3}>
              <Menu>
                <MenuLabel>Messages</MenuLabel>
                <MenuList>
                  {
                    this.state.receivedMessages.length >0?
                    (this.state.receivedMessages.map((message,i) => {
                      return (<li key={i}><MenuLink onClick={() => {this.getOneMessage(message._id)}}>from: {message.sender}, subj: {message.subject}</MenuLink></li>)
                    })) : <p>No Received Messages</p>
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

          {/* end of conditional render */}
        </Container>
        {this.state.updateProfile? (<Redirect to={{pathname:"/updateProfile", state:this.state.user}}/>) : null}
        {this.state.createEvent? (<Redirect to= {{pathname:"/event/create", state:this.state.user}} />) : null}
        {this.state.dashboard? (<Redirect to={{pathname:"/dashboard", state:this.state.user}}/>) : null}
        {this.state.logout? (<Redirect to="/" />) : null}
      </div>
    )
  }
}
