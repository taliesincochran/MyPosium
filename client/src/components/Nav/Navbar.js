import React from 'react';
import {
	Navbar,
	NavbarMenu
	} from 'bloomer';
	// import NavbarItem from './navbarHelpers'
	import NavDropdown from './NavDropdown';
	import NavBrand from './NavBrand'
	import NavStart from './NavStart';
	import NavEnd from './NavEnd';

const NavbarHeader = props => {
	console.log("Navbar props", props)

	return(
		<div>
			<Navbar style={props.navbarStyle}>
				<NavBrand
					hasBrand={props.hasBrand}
					brandStyle={props.brandStyle}
					brandHref={props.brandHref}
					brandImage={props.brandImage}
					brandText={props.brandText}
					burgerActive={props.burgerActive}
					onClick={props.onClick}
					hasStartButtons={props.hasButtons}
					buttonClass={props.buttonClass}
				/>
				<NavbarMenu isActive={props.isActive} onClick={props.onClick}>
					<NavDropdown hasDropdown={props.hasDropdown} navbarDropdown={props.navbarDropdown} />
				    <NavStart
				    	hasStart={props.hasStart}
				    	navbarStart={props.navbarStart}
				    	hasStartButtons={props.hasStartButtons}
				    />
				    <NavEnd
				    	hasEnd={props.hasEnd}
				    	navbarEnd={props.navbarEnd}
				    	hasEndButtons={props.hasEndButtons}
				    />
				</NavbarMenu>
			</Navbar>
		</div>
	)
}
export default NavbarHeader;
