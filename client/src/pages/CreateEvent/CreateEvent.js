import React, { Component } from 'react';
import { Checkbox, Container, Button, Select, Input, option, Label, Control, Field, TextArea} from 'bloomer';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
// import {API} from "../../utils/API";
import categories from "../../categories";

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
    user: this.props.location.state
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
      <Container>
      	<Link to={{pathname:"/dashboard",state:this.state.user}}>Go Home</Link>
      	<Field>
      		<Label>Event Title:</Label>
      		<Control>
      			<Input
      				type="text"
      				placeholder="Event Title"
      				name="title"
      				value={this.state.title}
      				onChange={this.handleChange}
      			/>
      		</Control>
        </Field>
      	<Field>
      		<Label>Category:</Label>
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
        	<Label>Date of Event</Label>
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
      		<Label>Zipcode of Location:</Label>
      		<Control>
      			<Input
      				type="text"
      				placeholder="This is used so people can see how far away the event is."
      				name="zipcode"
      				value={this.state.zipcode}
      				onChange={this.handleChange}
      			/>
      		</Control>
      		<Control>
      			<Checkbox
      				name="isRemote"
      				value={this.state.isRemote}
      				onChange={this.handleChange}
      				>Remote Attendance</Checkbox>
      		</Control>
        </Field>
        <Field>
      		<Label>Minimum Attending:</Label>
      		<Control>
      			<Input
      				type="number"
      				name="minAttending"
      				value={this.state.minAttending}
      				onChange={this.handleChange}
      			/>
      		</Control>
      		<Label>Maximum Attending:</Label>
      		<Control>
      			<Input
      				type="number"
      				name="maxAttending"
      				value={this.state.maxAttending}
      				onChange={this.handleChange}
      			/>
      		</Control>
        </Field>
        <Field>
        	<Label>Description of Event</Label>
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
        	<Label>Event Cost</Label>
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
      		<Label>Image for Event:</Label>
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
        {this.state.isSubmitted ? (<Redirect to = {{
        	pathname: "/dashboard",
        	state:this.state.user
        }}/>) : null}

      </Container>
    )
	}
}
