import React, { Component } from 'react';
import { Container, Button, Select, Input, option, Label, Control, Field, TextArea} from 'bloomer';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

export default class CreateEvent extends Component {
  state = {
  	username: '',
  	password: '',
  	category: '',
  	zipcode: '',
  	title:'',
  	imgURL:'',
  	description:'',
  	minAttending:'',
  	maxAttending:'',
  	date:'',
  	time:'',
  	remote:false
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render(){
    return (
      <Container>
      	<Link to="/dashboard">Go Home</Link>
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
	                <option>Crafts</option>
	                <option>Animals</option>
	                <option>Music</option>
	                <option>Books</option>
	                <option>History</option>
	                <option>Visual Arts</option>
	                <option>Finance</option>
	                <option>Religion</option>
	                <option>Automotive</option>
	                <option>Business</option>
	                <option>Fitness</option>
	                <option>Electronics</option>
	                <option>Home Improvement</option>
	                <option>Science</option>
	                <option>Politics</option>
	                <option>Philosophy</option>
	                <option>Games</option>
	                <option>Social</option>
	                <option>Sports</option>
	                <option>Photography</option>
	                <option>Real Estate</option>
	                <option>Self Improvement</option>
	                <option>Computers</option>
	                <option>Recreation</option>
	                <option>Comics</option>
	                <option>Performing Arts</option>
	                <option>Miscellaneous</option>
	                <option>Health and Beauty</option>            
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
        	<Button isColor='primary'>Create</Button>
        </Control>


      </Container>
    )
	}
}

