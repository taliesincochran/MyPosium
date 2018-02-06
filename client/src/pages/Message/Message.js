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
			user: {},
			navActive:false,
			burgerActive:false,
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
	onClickNav = () => {
        this.setState((state) => ({ isActive: !state.navActive }));
    }
    onClickDropdown = () => {
        this.setState((state) => ({ isDropdownOpen: !state.isDropdownOpen }));
    }
    onClickBurger = () => {
        this.setState((state) => ({ isActive: !state.burgerActive }));
    }
    <NavbarHeader 
      hasStart={true}
      navbarStart={
        [
          {
            href:"/messages/recieved", 
            style:{border:'1px solid blue'}, 
            textStyle:{color:"blue"},
            helper:'isHoverable', 
            text: "Recieved"
          }, {
            href:"/messages/sent", 
            style:{border:'1px solid blue'},
            textStyle:{color:"blue"}, 
            helper:'isHoverable', 
            text: 'Sent'
          },{
          	href:"/messages/new", 
            style:{border:'1px solid blue'},
            textStyle:{color:"blue"}, 
            helper:'isHoverable', 
            text: 'New'
          }
        ]
      }
      hasEnd={true}
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
    //========================================================================================================
    //================================Navbar Brand ===========================================================
    //========================================================================================================
      hasBrand={this.state.burgerActive}
      brandText='MyPosium'
      burgerActive={true}
      burgerOnClick={this.onClickBurger}
      burgerActive={true} 
    //========================================================================================================
    //================================Box Above Navbar========================================================
    //========================================================================================================
      hasBox={!this.state.burgerActive} 
      boxText='MyPosium'
      boxAlign='left'
    //========================================================================================================
    //================================General Navbar==========================================================
    //========================================================================================================
      navbarStyle={{color: black}} 
      isActive={this.navbarActive} 
      onClick={this.onClickNav}
    //========================================================================================================
    //================================Bloomer Helpers (applied to NavbarItem)=================================
    //==========================https://bloomer.js.org/#/documentation/overview/helpers=======================
    //========================================================================================================
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

