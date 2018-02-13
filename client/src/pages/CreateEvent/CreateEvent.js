import React, { Component } from 'react';
import { Column, Columns, Title, Box, Checkbox, Container, Button, Select, Input, option, Label, Control, Field, TextArea} from 'bloomer';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
// import {API} from "../../utils/API";
import categories from "../../categories";
import { authObj } from '../../authenticate';
import Navbar from '../../components/Nav/Navbar';

export default class CreateEvent extends Component {
  state = {
  	title:'',
  	zipcode: '',
  	username: this.props.location.state.username,
  	date:'',
  	time:'',
  	isRemote: false,
  	cost:'',
  	category: '',
  	imgURL:'',
  	description:'',
  	minAttending:'',
  	maxAttending:'',
    isSubmitted: false,
    checkMessages: false,
    dashboard: false,
    logout: false,
    updateProfile: false,
    user: this.props.location.state
  }


  componentDidMount(){
    categories.sort();
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = e=> {
  	e.preventDefault();
  	console.log("Submit button clicked");
  	let {title, zipcode, username, date, time, isRemote, cost, category, imgURL, description, minAttending, maxAttending} = this.state;
  	let newEvent = {title, zipcode, username, date, time, isRemote, cost, category, imgURL, description, minAttending, maxAttending};
  	console.log(newEvent);
  	this.submitEvent(newEvent);
	}



  submitEvent = event=>{
  	console.log("event being submitted:");
  	console.log(event);
      axios
      .post("/api/event/create", event)
      .then(result =>{
      	   this.setState({isSubmitted: true});
        })
      .catch(err=> console.log(err));
}


  render(){
    return (
      // <div style={{width: '100%', background: 'linear-gradient(to right, rgb(200,245,240), MintCream, MintCream, white, white, MintCream, MintCream, rgb(200,245,240))', backgroundAttachment: 'fixed', backgroundSize: '100% 100%'}}>
      <div style={{minHeight: '100vh', backgroundImage: 'url("img/coloredLines.jpg")', backgroundAttachment: 'fixed', backgroundSize: '100% 100%'}}>
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
        <div style={{height: '100px'}}></div>
      	<Columns>
          <Column isSize={8} isOffset={2}>
            <Box style={{marginTop: '5%', position: 'relative'}}>
              <Title className="has-text-grey-light" isSize={1} style={{position: 'absolute', top: '-3.5%', right: '5%', background: 'white'}}>Create Event</Title>
              <Field>
            		<Label className="has-text-left">Event Title:</Label>
            		<Control>
            			<Input
            				type="text"
            				placeholder="Enter Event Title"
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
              <Field>
              	<Label className="has-text-left">Date and Time of Event:</Label>
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
            				onChange={this.handleChange}
            				>Event will be held remotely
                  </Checkbox>
            		</Control>
              </Field>
              <Field>
            		<Label className="has-text-left">Minimum Attending:</Label>
            		<Control>
            			<Input
            				type="text"
            				name="minAttending"
            				value={this.state.minAttending}
            				onChange={this.handleChange}
            			/>
            		</Control>
            		<Label className="has-text-left">Maximum Attending:</Label>
            		<Control>
            			<Input
            				type="text"
            				name="maxAttending"
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
              			value={this.state.description}
              			onChange={this.handleChange}
              		/>
              	</Control>
              </Field>
              <Field>
              	<Label className="has-text-left">Cost To Attend:</Label>
              	<Control>
              		<Input
              			type="text"
              			name="cost"
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
            				placeholder="Image URL"
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
          </Column>
        </Columns>
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
