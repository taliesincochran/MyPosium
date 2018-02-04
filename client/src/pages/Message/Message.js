import React from 'react';
import { 
	Navbar,
	NavbarBrand,
	NavbarItem,
	NavbarBurger,
	NavbarMenu,
	NavbarEnd,
	Icon,
	NavbarDivider,
	Box
	} from 'bloomer';
class Message extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			recievedMessage: true,
			newMessage: true,
			recievedMessages: [],
			sentMessages: [],
			user: {}
		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.deleteMessage = this.deleteMessage.bind(this);
	}
	componentDidMount = () => {
		var messages = [];
		var sentMessages = [];
		var recievedMessages = [];
		axios.get(
		//userget route
		).then(user=> 
			this.setState({user: user}))
	}
	newMessageDisplay = () => {

	}
	recievedMessageDisplay = () => {

	}
	newMessageDisplay = () => {

	}
	messageDetailsDisplay = () => {

	}
}
<div>
	<Box isFullWidth=true hasTextAlign=left><h1>MyPosium</h1></Box>
	<Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
		<NavbarMenu isActive={props.isActive} onClick={props.onClickNav}>
	    <NavbarStart>
	        <NavbarItem><Button onClick={this.newMessageDisplay}>New Message</Button></NavbarItem>
	        <NavbarItem><Button onClick={this.sentMessageDisplay}>Sent</Button></NavbarItem>
	        <NavbarItem><Button onClick={this.recievedMessageDisplay}>Recieved</Button></NavbarItem>
	    </NavbarStart>
	    <NavbarEnd>
	        <NavbarItem href="/dashboard" isHidden='touch'>Dashboard</NavbarItem>
	    </NavbarEnd>
		</NavbarMenu>
	</Navbar>
	<Column>
	</Column>
	<Column>
	</Column>
</div>

