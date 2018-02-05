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
				<NavbarBrand>
					<NavbarItem isHidden={props.brandHidden} href={props.brandHref}>
						<img src={props.brandImage} />
						{props.brandText}
					</NavbarItem>
					<NavbarBurger isActive={props.burgerActive} onClick={props.burgerOnClick} />
				</NavbarBrand> 
			)
	} else {
		return null
	}
}
export default NavBrand;