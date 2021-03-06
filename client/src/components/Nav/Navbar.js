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
					buttonClass={props.buttonClass}
				/>
				<NavbarMenu isActive={props.isActive} onClick={props.onClick}>
					<NavDropdown 
						dropdownText={props.dropdownText}
						hasDropdown={props.hasDropdown} 
						navbarDropdown={props.navbarDropdown} />
				    <NavStart
				    	hasStart={props.hasStart}
				    	navbarStart={props.navbarStart}
				    	hasStartButtons={props.hasButtons}
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
