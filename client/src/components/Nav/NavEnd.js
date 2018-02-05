import React from 'react';
import {
	NavbarEnd,
	NavbarLink
} from 'bloomer';
import NavbarItem from './navbarHelpers';

const NavEnd = props => {
	const hasEnd= props.hasEnd;
	if(hasEnd) {
		return(
				<NavbarEnd>
			    	{props.navbarEnd.map(item => (<NavbarItem href={item.href} style={item.style}><p style={item.textStyle}>{item.text}</p></NavbarItem>))}
			    </NavbarEnd>
			)
	} else {
		return null
	}
}
export default NavEnd;