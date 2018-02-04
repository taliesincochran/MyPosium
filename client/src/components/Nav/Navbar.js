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
const MessageHeader = props => {
<Box isFullWidth=true hasTextAlign=left><h1>MyPosium</h1></Box>
<Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
	<NavbarMenu isActive={props.isActive} onClick={props.onClickNav}>
    <NavbarStart>
        <NavbarItem href='/newMessage'>New Message</NavbarItem>
        <NavbarItem href='/api/messages/sent'>Sent</NavbarItem>
        <NavbarItem href='/api/messages/recieved'>Recieved</NavbarItem>
    </NavbarStart>
    <NavbarEnd>
        <NavbarItem href="/dashboard" isHidden='touch'>Dashboard</NavbarItem>
    </NavbarEnd>
	</NavbarMenu>
</Navbar>