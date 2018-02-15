import React, { Component } from 'react';
import {
  Column,
  Columns,
  Title,
  Box,
  Checkbox,
  Button,
  Select,
  Input,
  option,
  Label,
  Control,
  Field,
  TextArea} from 'bloomer';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import categories from "../../categories";
import { authObj } from '../../authenticate';
import Navbar from '../../components/Nav/Navbar';
import moment from 'moment'
export default class CreateEvent extends Component {
  state = {
  	title:'',
  	zipcode: this.props.location.state.zipcode,
    initialZipcode: this.props.location.state.zipcode,
  	username: this.props.location.state.username,
  	date:'',
  	time:'',
  	isRemote: false,
  	cost:'',
  	category: '',
  	imgURL:'',
  	description:'',
  	maxAttending:'',
    isSubmitted: false,
    checkMessages: false,
    dashboard: false,
    logout: false,
    updateProfile: false,
    user: this.props.location.state,
    //Validation variables
    zipcodeVerified: false,
    timeVerified: false,
    dateVerified: false,
    maxAttendingVerified: false,
    descriptionVerified: false,
    costPlaceholder: '0',
    descriptionPlaceholder: 'Please Describe Your Event.',
    maxAttendingPlaceholder: 'Maximum number to attend.',
    zipcodePlaceholder: 'Zipcode',
    eventTitlePlaceholder: "Enter Event Title",
  }


//Sort the categories and set default
  componentDidMount(){
    categories.sort();
    this.setState({category:categories[0]});
  }

  handleChange = e => {
    let { name, value } = e.target;
    console.log('!!!!!!!!!!!!!!!', name, value, this.state)
    this.setState({ [name]: value });
  }
  changeRemote = e => {
    this.setState({isRemote: !this.state.isRemote})
  }

//Set new event information to be passed from state
  handleSubmit = e=> {
    e.preventDefault();
    console.log("Submit button clicked");
    let {title, zipcode, username, date, time, isRemote, cost, category, imgURL, description, minAttending, maxAttending} = this.state;
    let newEvent = {title, zipcode, username, date, time, isRemote, cost, category, imgURL, description, minAttending, maxAttending};
    console.log(newEvent);
    //===================================================================================================================
    //Validate before the post, start with async call for location validation, then after this resolves, everything else
    //===================================================================================================================
    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${newEvent.zipcode || 5000}&destinations=27510&key=AIzaSyDpwnTjzyOwCRmPRQhpu0eREKplFV0TCDI`).then(result=>{
      console.log(result.data.rows[0].elements[0].status)
      //Check if google found the zipcode
      if(result.data.rows[0].elements[0].status==="OK" || this.state.isRemote) {
        this.setState({zipcodeVerified: true})
        console.log('zipcode verified')
      } else{
        this.setState({zipcodePlaceholder: "Google couldn't find your zipcode.", zipcode: this.state.initialZipcode})
        console.log('zip code not found')
      }
      //Check if maxAttending is over 0
      if(newEvent.maxAttending >0) {
        this.setState({maxAttendingVerified: true})
        console.log('max attending verified')
      } else {
        this.setState({maxAttendingPlaceholder: 'Please Enter a Number Greater Than Zero.', maxAttending: ''})
        console.log('max attending not verified')
      }
      //Check if there is a description that is not too big or too small.
      if(newEvent.description.length > 10 && newEvent.description.length<255) {
        this.setState({descriptionVerified: true})
        console.log('description verified')
      } else {
        this.setState({descriptionPlaceholder: "Needs to be between 10 and 255 characters."})
      }
      if(newEvent.time === '') {
        this.setState({eventTimePlaceholder: 'Please enter a time.'})
      } else {
        this.setState({timeVerified: true})
        console.log('time verified')
      }
      var now = moment()
      console.log('moment date', moment(moment()).isBefore(newEvent.date, 'year'))
      console.log('now', moment())
      console.log('then', newEvent.date)
      if (newEvent.date === '') {
        this.setState({datePlaceholder: 'Please enter a date'})
      } else if(moment().isBefore(newEvent.date)){
        this.setState({dateVerified: true})
        console.log('date verified', moment().isBefore(newEvent.date))
      }else {
        this.setState({datePlaceholder: "The event can not be in the past."})
        console.log('date not verified', moment().isBefore(newEvent.date))
      }
    }).then(result => {
      if(this.state.zipcodeVerified
        && this.state.maxAttendingVerified
        && this.state.descriptionVerified
        && this.state.dateVerified
        && this.state.timeVerified
        ){
  	    this.submitEvent(newEvent);
	    }
    })
  }


//submit to the backend
  submitEvent = event=>{
      axios
      .post("/api/event/create", event)
      .then(result =>{
      	   this.setState({isSubmitted: true});
        })
      .catch(err=> console.log(err));
  }
  render(){
    return (

      <div style={{minHeight: '100vh', backgroundImage: 'url("img/coloredLines.jpg")', backgroundAttachment: 'fixed', backgroundSize: '100% 100%'}}>

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
              text:"Dashboard",
              buttonClass: 'button is-success',
              onClick:() => {
                this.setState({dashboard: true});
              },
            },
            {
              text:'Check Messages',
              buttonClass: 'button is-warning',
              onClick:() => {
                this.setState({checkMessages: true});
              }
            },
            {
              text:'Update Profile',
              buttonClass: 'button is-primary',
              onClick:() => {
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
              buttonClass: "is-danger"
            }
          ]}
        />

{/*======================================================================================================================================*/}
      {/*END OF NAVBAR STUFF*/}
{/*======================================================================================================================================*/}

        <div style={{height: '100px'}}></div>
      	<Columns>
          <Column isSize={8} isOffset={2}>
            <Box style={{marginTop: '5%', position: 'relative'}}>
              <Title className="has-text-grey-light" isSize={1} style={{position: 'absolute', top: '-3.5%', right: '5%', background: 'white'}}>Create Event</Title>

{/*ALL THE FIELDS--Be sure any added field gets updated into state and the model gets updated as well*/}
              <Field>
            		<Label className="has-text-left">Event Title:</Label>
            		<Control>
            			<Input
            				type="text"
            				placeholder={this.state.eventTitlePlaceholder}
            				name="title"
            				value={this.state.title}
            				onChange={this.handleChange}
            			/>
            		</Control>
              </Field>
            	<Field>
            		<Label className="has-text-left">Category:</Label>
            		<Control>
              		<Select
              			name="category"
              			value={this.state.category}
              			onChange={this.handleChange}>
      	                {categories.map((category, i)=>{
              				return(<option key = {i} name={category}>{category}</option>)
              			})}
              		</Select>
          		  </Control>
      		    </Field>
              <p>{this.state.datePlaceholder}</p>
              <p>{this.state.eventTimePlaceholder}</p>
              <Field>
              	<Label className="has-text-left">Event Date: </Label>
              	<Control>
              		<Input
              			type="date"
              			name="date"
              			value={this.state.date}
              			onChange={this.handleChange}
              		/>
              	</Control>
              	<Control>
              		<Input
              			type="time"
              			name="time"
              			value={this.state.time}
              			onChange={this.handleChange}
              		/>
              	</Control>
             	</Field>
              <Field>
            		<Label className="has-text-left">Zipcode of Location:</Label>
            		<Control>
            			<Input
            				type="text"
            				placeholder="Enter Zipcode"
            				name="zipcode"
            				value={this.state.zipcode}
            				onChange={this.handleChange}
            			/>
            		</Control>
              </Field>
          		<Field>
                <Control style={{marginLeft: '20px'}}>
            			<Checkbox
            				name="isRemote"
            				value={this.state.isRemote}
            				onChange={this.changeRemote}
            				>Event will be held remotely
                  </Checkbox>
            		</Control>
              </Field>
              <Field>
            		<Label className="has-text-left">Maximum Attending:</Label>
            		<Control>
            			<Input
            				type="number"
            				name="maxAttending"
                    placeholder={this.state.maxAttendingPlaceholder}
            				value={this.state.maxAttending}
            				onChange={this.handleChange}
            			/>
            		</Control>
              </Field>
              <Field>
              	<Label className="has-text-left">Event Description:</Label>
              	<Control>
              		<TextArea
              			type="text"
              			name="description"
                    placeholder={this.state.eventPlaceholder}
              			value={this.state.description}
              			onChange={this.handleChange}
              		/>
              	</Control>
              </Field>
              <Field>
              	<Label className="has-text-left">Cost To Attend:</Label>
              	<Control>
              		<Input
              			type="number"
              			name="cost"
                    placeholder='0'
              			value={this.state.cost}
              			onChange={this.handleChange}
              		/>
              	</Control>
              </Field>
              <Field>
            		<Label className="has-text-left">Display Image for Event:</Label>
            		<Control>
            			<Input
            				type="text"
            				placeholder= 'Image Url'
            				name="imgURL"
            				value={this.state.imgURL}
            				onChange={this.handleChange}
            			/>
            		</Control>
              </Field>
              <Control>
              	<Button isColor='primary' onClick={this.handleSubmit}>Create</Button>
              </Control>
            </Box>

        {/*End of the event fields*/}

          </Column>
        </Columns>

      {/*Redirects processed via state change*/}

        {this.state.isSubmitted ? (<Redirect to = {{
        	pathname: "/dashboard",
        	state:this.state.user
        }}/>) : null}
        {this.state.checkMessages? (<Redirect to= {{pathname:"/messages", state:this.state.user}} />) : null}
        {this.state.updateProfile? (<Redirect to={{pathname:"/updateProfile", state:this.state.user}}/>) : null}
        {this.state.dashboard? (<Redirect to={{pathname:"/dashboard", state:this.state.user}}/>) : null}
        {this.state.logout? (<Redirect to="/" />) : null}
      </div>
    )
	}
}
