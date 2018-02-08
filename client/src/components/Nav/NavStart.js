import React from 'react';
import {
	NavbarStart,
	Button
} from 'bloomer';
import NavbarItem from './navbarHelpers';

const NavStart = props => {
	const hasStart= props.hasStart;
	const hasStartButtons = props.hasStartButtons;
	if(hasStart && hasStartButtons) {
		return(
				<NavbarStart>
			    	{props.navbarStart.map((item,i) => (<NavbarItem key={i} href={item.href} style={item.style}><Button onClick={item.onClick} className={item.buttonStyle}><p style={item.textStyle}>{item.text}</p></Button></NavbarItem>))}
			    </NavbarStart>
			)
	} else if(hasStart){
		return(
				<NavbarStart>
			    	{props.navbarStart.map((item,i) => (<NavbarItem key={i} href={item.href} style={item.style}><p style={item.textStyle}>{item.text}</p></NavbarItem>))}
			    </NavbarStart>
			)
	} else {
		return null
	}
}
export default NavStart;
