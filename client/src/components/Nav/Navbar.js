import React from 'react';
import { 
	Navbar,
	NavbarMenu,
	Box
	} from 'bloomer';
	import NavbarItem from './navbarHelpers'
	import NavDropdown from './NavDropdown';
	import NavBrand from './NavBrand'
	import NavStart from './NavStart';
	import NavEnd from './NavEnd';

const NavbarHeader = props => {
	console.log(props)
	return(
		<div>
			{props.hasBox? (<Box isFullWidth={true} hasTextAlign={props.boxAlign}><h1>{props.boxText}</h1></Box>): (null)}
			<Navbar style={props.navbarStyle}>
				<NavDropdown hasDropdown={props.hasDropdown} navbarDropdown={props.navbarDropdown} />
				<NavBrand hasBrand={props.hasBrand} brandHidden={props.brandHidden} brandHref={props.brandHref} brandImage={props.brandImage} brandText={props.brandText} burgerActive={props.burgerActive} burgerOnClick={props.burgerOnClick} />
				<NavbarMenu isActive={props.isActive} onClick={props.onClickNav}>
				    <NavStart hasStart={props.hasStart} navbarStart={props.navbarStart} />
				    <NavEnd hasEnd={props.hasEnd} navbarEnd={props.navbarEnd} />
				</NavbarMenu>
			</Navbar>
		</div>
	)
}
export default NavbarHeader;