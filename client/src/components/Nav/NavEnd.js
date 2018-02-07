import React from 'react';
import {
	NavbarEnd,
	Button
} from 'bloomer';
import NavbarItem from './navbarHelpers';

const NavEnd = props => {
	const hasEnd= props.hasEnd;
	const hasEndButtons = props.hasEndButtons
	if(hasEnd && hasEndButtons) {
		return(
				<NavbarEnd>
			    	{props.navbarEnd.map((item,i) => (<NavbarItem key={i} href={item.href} style={item.style}><Button onClick={item.onClick} className={item.buttonClass}><p style={item.textStyle}>{item.text}</p></Button></NavbarItem>))}
			    </NavbarEnd>
			)
	} else if (hasEnd) {
		return(
			<NavbarEnd>
		    	{props.navbarEnd.map((item,i) => (<NavbarItem key={i} href={item.href} style={item.style}><p style={item.textStyle}>{item.text}</p></NavbarItem>))}
		    </NavbarEnd>
		)
	}else {
		return null
	}
}
export default NavEnd;
