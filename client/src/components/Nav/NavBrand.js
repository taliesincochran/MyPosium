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
					<NavbarItem isHidden={props.brandHidden} href={props.brandHref}>
						<img src={props.brandImage} />
						{props.brandText}
					</NavbarItem>
					<NavbarBurger isActive={props.burgerActive} style={{position: 'absolute', right: '0px', top: '0px', zIndex:999}} onClick={props.onClick} />
				</NavbarBrand> 
			)
	} else {
		return null
	}
}
export default NavBrand;