import React, { Component } from 'react';
import NavbarHeader from '../../components/Nav/Navbar';
export default class Landing extends Component {
  render() {
    return(
      <div>
        <NavbarHeader 
        	hasStart={true}
		      hasBrand={true}
		      brandText=''
		      brandImage='http://p1cdn4static.sharpschool.com/UserFiles/Servers/Server_1005942/Image/News/calendar.png'
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
		            href:"/login",  
		            text: "Login",
		            style: {border: "1px solid black"},
		            textStyle: {color: "blue"}
		          }, {
		            href:"/signup",  
		            text: 'SignUp'
		          }
		        ]
		      }
		      navbarEnd={[
		      	{
		            href:"/login",  
		            text: "Login",
		            style: {border: "1px solid black"},
		            textStyle: {color: "blue"}
		          }, {
		            href:"/signup",  
		            text: 'SignUp'
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
