import React, { Component } from 'react';
import NavbarHeader from '../../components/Nav/Navbar';
export default class Landing extends Component {
  render() {
    return(
      <div>
          <NavbarHeader 
      brandHidden=''
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
            text: "Login"
          }, {
            href:"/signup",  
            text: 'SignUp'
          }
        ]
      }
      navbarEnd={[]}
      navbarDropdown={[]}
    />
      </div>
    )
  }
}
