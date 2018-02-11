import React from 'react';
import {
	NavbarDropdown,
	NavbarLink,
	Button
} from 'bloomer';
import NavbarItem from './navbarHelpers';

const NavDropdown = props => {
	const hasDropdown = props.hasDropdown;
	if(hasDropdown) {
		return(
				<NavbarItem hasDropdown isHoverable>
					<NavbarLink href={props.dropdownHref}>{props.dropdownText}</NavbarLink>
					<NavbarDropdown style={props.dropdownStyle}>
						{props.navbarDropdown.map(item => 	
							(<NavbarItem href={item.href} 
								style={item.style}>
									<Button value={item.value} 
										onClick={item.onClick} 
										className={item.class}>
										{item.text}
									</Button>
								</NavbarItem>))}
					</NavbarDropdown>
				</NavbarItem>
			)
	} else {
		return null
	}
}
export default NavDropdown;