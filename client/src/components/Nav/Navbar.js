import React from 'react';
import { 
	Navbar,
	NavbarBrand,
	NavbarBurger,
	NavbarMenu,
	NavbarStart,
	NavbarEnd,
	NavbarDropdown,
	Icon,
	NavbarDivider,
	NavbarLink,
	Box
	} from 'bloomer';
	import NavbarItem from './navbarHelpers'

const NavbarHeader = props => {
	return(
		<div>
			{props.hasBox? (<Box isFullWidth={true} hasTextAlign={props.boxAlign}><h1>{props.boxText}</h1></Box>): (null)}
			<Navbar>
				<NavbarBrand>
					<NavbarItem isHidden={props.brandHidden} href={props.brandHref}>
						<img src={props.brandImage} />
						{props.brandText}
					</NavbarItem>
					<NavbarBurger isActive={props.burgerActive} onClick={props.burgerOnClick} />
				</NavbarBrand> 
				<NavbarMenu isActive={props.isActive} onClick={props.onClickNav}>
			    <NavbarStart>
			    	{props.navbarStart.map(item => (<NavbarItem href={item.href}>{item.text}</NavbarItem>))}
			    </NavbarStart>
			    <NavbarEnd>
			    	{props.navbarEnd.map(item => (<NavbarItem href={item.href}>{item.text}</NavbarItem>))}
						<NavbarItem hasDropdown isHoverable>
							<NavbarLink href={props.dropdownHref}>{props.dropdownText}</NavbarLink>
							<NavbarDropdown>
								{props.navbarDropdown.map(item => (<NavbarItem href={item.href}>{item.text}</NavbarItem>))}
							</NavbarDropdown>
						</NavbarItem>
			    </NavbarEnd>
				</NavbarMenu>
			</Navbar>
		</div>
	)
}
export default NavbarHeader;