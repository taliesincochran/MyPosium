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
			user: this.props.location.state,
      sentMessages: [],
      recievedMessages: [],
      makeNewMessage: false,
      newMessage: {},
			burgeractive:false,
			displayNew: false,
			displayRecieved: false,
			displaySent: false,
			displayCurrent: this.state.sentMessage.length > 0? this.state.sentMessage[this.state.sentMessage.length-1]

		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.deleteMessage = this.deleteMessage.bind(this);
	}
	componentDidMount = () => {
		axios.get(
		//userget route
		).then(user=> 
			this.setState({user: user})
		)
	}
  onClickBurger = () => {
      this.setState((state) => ({ isActive: !state.burgeractive }));
  }
  getRecievedMessages=()=> {
  }
  getSentMessages=()=>{

  }
  <NavbarHeader 
    hasStart={true}
    hasStartButtons={true}
    navbarStart={
      [
        {
          href:"/messages/recieved", 
            style:{border:'1px solid blue'}, 
            textStyle:{color:"blue"},
            helper:'isHoverable', 
            text: "Recieved",
            onClick: //function to get sent messages
        }, {
            href:"/messages/sent", 
            style:{border:'1px solid blue'},
            textStyle:{color:"blue"}, 
            helper:'isHoverable', 
            text: 'Sent'
            onClick: //function to get recieved messages
        },{
            href:"/messages/new", 
            style:{border:'1px solid blue'},
            textStyle:{color:"blue"}, 
            helper:'isHoverable', 
            text: 'New',
            onClick: //function to open modal for new messages
        }
      ]
    }
    hasEnd={true}
    hasEndButtons={true}
    navbarEnd={
        [
          {
            href:"/logout", 
            style:{border:'1px solid blue'}, 
            textStyle:{color:"blue"},
            helper:'isHoverable', 
            text: "logout"
          }, {
            href:"/dashboard", 
            style:{border:'1px solid blue'},
            textStyle:{color:"blue"}, 
            helper:'isHoverable', 
            text: 'Home'
          }
        ]
      }
      hasBrand={true}
      brandText='MyPosium: Messages'
      burgeractive={this.state.burgeractive}
      burgerOnClick={this.onClickBurger}
      navbarStyle={{boxShadow: '2px 2px 5px', position:"fixed", top:"0", left:"0", zIndex: '998', width: '100%'}} 
      isActive={this.navbarActive} 
      onClick={this.onClickBurger}
      hasTextColor={'black'}
    />
	newMessageDisplay = () => {
		this.setState({displayNew: true, display})
		this.state.displayNew = true;
		this.state.displayRecieved = false;
		this.state.dasplaySent = false;
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

