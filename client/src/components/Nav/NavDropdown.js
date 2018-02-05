import React from 'react';
import {
	NavbarDropdown,
	NavbarLink
} from 'bloomer';
import NavbarItem from './navbarHelpers';

const NavDropdown = props => {
	const hasDropdown = props.hasDropdown;
	if(hasDropdown) {
		return(
				<NavbarItem hasDropdown isHoverable>
					<NavbarLink href={props.dropdownHref}>{props.dropdownText}</NavbarLink>
					<NavbarDropdown style={props.dropdownStyle}>
						{props.navbarDropdown.map(item => (<NavbarItem href={item.href} style={item.style}><p style={item.textStyle}>{item.text}</p></NavbarItem>))}
					</NavbarDropdown>
				</NavbarItem>
			)
	} else {
		return null
	}
}
export default NavDropdown;