import React, { Component } from 'react';
import { Progress, Image, Label, Control, Button, Content} from 'bloomer';
import { Link } from "react-router-dom";
// import axios from 'axios';
import {API} from "../../utils/API";



export default class Event extends Component {
  state = {
  	host:'Vytas',
  	title:'The Magical Mystery Tour',
  	imgURL:'http://via.placeholder.com/250/ffffff/000000',
  	zipcode:'27510',
  	category:'Massive Drugs',
  	description: "Lorem ipsum, mu'fucker",
  	minAttending:'2',
  	attending:'8',
  	maxAttending:'12',
  	date:'2/8/2018',
  	time:'6:00PM'
  };

  componentDidMount(){
  	API.getEvent();
  };

	render(){
	    return (
	      <Content>
	      	<Link to="/dashboard">Back to the Dashboard</Link>
	      	<h1>{this.state.title}</h1>
	      	<h2>{this.state.host}</h2>
	      	<h2>{this.state.category}</h2>
	        <Label>Date of Event:</Label>
	        <p>{this.state.date} at {this.state.time}</p>
	        <p>{this.state.description}</p>
	        <Image isSize="240x320" src={this.state.imgURL} alt="Event Image"/>
	        <p>Maximum attendees: {this.state.maxAttending}</p>
	        <Progress isColor='primary' isSize='small' value={this.state.attending} max={this.state.maxAttending}/>
	        <Control>
	        	<Button isColor='primary'>Join!</Button>
	        </Control>


	      </Content>
	    )
	}
}
