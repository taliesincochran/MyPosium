    <NavbarHeader 
  //Required===================================================================================================================================
  //navbarStart, navbarEnd, and navbarDropdown must have arrays to function, empty array for null=============================================
      navbarStart={
        [
          {
            href:"www.google.com", 
            style:"color:'blue'", 
            helper:'isHoverable', 
            text: "Google"
          }, {
            href:"www.facebook.com", 
            style:"color:'blue'", 
            helper:'isHoverable', 
            text: 'Facebook'
          }
        ]
      }
      navbarEnd={
        [
          {
            href:"http://www.google.com", 
            style:"color:'blue'", 
            helper:'isHoverable', 
            text: "Google"
          }, {
            href:"http://www.facebook.com", 
            style:"color:'blue'", 
            helper:'isHoverable', 
            text: "Facebook"
          }
        ]
      }
      navbarDropdown={
        [
          {
            href:"http://www.google.com", 
            style:"color:'blue'", 
            helper:'isHoverable', 
            text: "Google"
          }, {
            href:"http://www.facebook.com", 
            style:"color:'blue'", 
            helper:'isHoverable', 
            text: "Facebook"
          }
        ]
      }
    //Optional
      brandHidden='mobile'
      brandText='Navbar'
      brandImage='http://p1cdn4static.sharpschool.com/UserFiles/Servers/Server_1005942/Image/News/calendar.png'
      hasBox={true} 
      boxText='MyPosium'
      boxAlign='left'
      NavbarStyle='' 
      icon='' 
      burgerActive={true} 
      isActive={true} 
      onClick={()=>{console.log("You Clicked Me!")}}
      burgerActive={true}
      burgerOnClick={()=>{console.log("Stay away from my burger!")}}
      dropDownText={"More"}
      dropDownHref={'/'}
      //bloomer helpers can also be added but apply to everything
      hasTextColor={'black'}
    />