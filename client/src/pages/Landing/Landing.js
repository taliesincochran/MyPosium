import React, { Component } from 'react';
import NavbarHeader from '../../components/Nav/Navbar';
export default class Landing extends Component {
  render() {
    return(
      <div>
        <NavbarHeader 
        	hasStart={true}
        	hasEnd={true}
		      hasBrand={true}
		      navbarStyle={{boxShadow: '2px 2px 5px'}}
		      brandText='Myposium'
		      hasBox={true} 
		      boxText="MyPosium"
		      boxAlign='left'
		      burgerActive={true} 
		      isActive={true} 
		      burgerActive={true}
		      hasTextColor={'black'}
		      navbarStart={
		        [
		          {  
		            text: "Create",
		            style: {marginLeft: '100px'}
		          }, {
		            text: 'Discover',
		            style: {marginLeft: '150px'}
		          }, {
		          	text: 'Connect',
		            style: {marginLeft: '150px'}
		          }
		        ]
		      }
		      navbarEnd={[
		      	{
		            href:"/login",  
		            text: "Login",
		            textStyle: {textDecoration: 'underline', color: '#4C4CFF'}
		          }, {
		            href:"/signup",  
		            text: 'SignUp',
		            textStyle: {textDecoration: 'underline', color: '#4C4CFF'}
		          }]}
		      navbarDropdown={[
		      	{
		            href:"/login",  
		            text: "Login",
		            style: {border: "1px solid black"},
		            textStyle: {color: "blue"}
		          }, {
		            href:"/signup",  
		            text: 'SignUp'
		          }]}
		    />
      </div>
    )
  }
}
