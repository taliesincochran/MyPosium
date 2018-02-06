import React from 'react';
import {
	NavbarStart,
} from 'bloomer';
import NavbarItem from './navbarHelpers';

const NavStart = props => {
	const hasStart= props.hasStart;
	if(hasStart) {
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
