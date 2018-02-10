
import React from 'react';
import {
	NavbarBrand,
	NavbarBurger
} from 'bloomer';
import NavbarItem from './navbarHelpers';

const NavBrand = props => {
	const hasBrand = props.hasBrand;
	if(hasBrand) {
		return(
				<NavbarBrand style={props.brandStyle}>
					<NavbarItem href={props.brandHref}>
						<img src={props.brandImage} alt=""/>
						{props.brandText}
					</NavbarItem>
					<NavbarBurger isHidden='desktop' burgerActive={props.burgerActive} style={{position: 'absolute', right: '0px', top: '0px', zIndex:'999'}} onClick={props.onClick}>
						<div height="40px" />
					</NavbarBurger>
				</NavbarBrand>
			)
	} else {
		return null
	}
}
export default NavBrand;