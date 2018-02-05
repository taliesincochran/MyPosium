import React from 'react';
import {
	NavbarStart,
	NavbarLink
} from 'bloomer';
import NavbarItem from './navbarHelpers';

const NavStart = props => {
	console.log("NavStart Props ", props)
	const hasStart= props.hasStart;
	if(hasStart) {
		return(
				<NavbarStart>
			    	{props.navbarStart.map(item => (<NavbarItem href={item.href} style={item.style}><p style={item.textStyle}>{item.text}</p></NavbarItem>))}
			    </NavbarStart>
			)
	} else {
		return null
	}
}
export default NavStart;