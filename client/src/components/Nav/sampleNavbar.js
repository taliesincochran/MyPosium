    <NavbarHeader 
    //========================================================================================================
    //================================Navbar Left Buttons=====================================================
    //========================================================================================================
      hasStart={true}
      navbarStart={
        [
          {
            href:"www.google.com", 
            style:{border:'1px solid blue'}, 
            textStyle:{color:"blue"},
            helper:'isHoverable', 
            text: "Google"
          }, {
            href:"www.facebook.com", 
            style:{border:'1px solid blue'},
            textStyle:{color:"blue"}, 
            helper:'isHoverable', 
            text: 'Facebook'
          }
        ]
      }
    //========================================================================================================
    //================================Navbar Right Buttons====================================================
    //========================================================================================================
      hasEnd={true}
      navbarEnd={
        [
          {
            href:"www.google.com", 
            style:{border:'1px solid blue'}, 
            textStyle:{color:"blue"},
            helper:'isHoverable', 
            text: "Google"
          }, {
            href:"www.facebook.com", 
            style:{border:'1px solid blue'},
            textStyle:{color:"blue"}, 
            helper:'isHoverable', 
            text: 'Facebook'
          }
        ]
      }
    //========================================================================================================
    //======================================Navbar Dropdown Buttons===========================================
    //========================================================================================================
      hasDropdown={true}
      dropDownText={"More"}
      dropDownHref={'/'}
      navbarDropdown={
        [
          {
            href:"www.google.com", 
            style:{border:'1px solid blue'}, 
            textStyle:{color:"blue"},
            helper:'isHoverable', 
            text: "Google"
          }, {
            href:"www.facebook.com", 
            style:{border:'1px solid blue'},
            textStyle:{color:"blue"},
            helper:'isHoverable', 
            text: 'Facebook'
          }
        ]
      }
    //========================================================================================================
    //================================Navbar Brand ===========================================================
    //========================================================================================================
      hasBrand={true}
      brandHidden='mobile'
      brandText='Navbar'
      brandImage='http://p1cdn4static.sharpschool.com/UserFiles/Servers/Server_1005942/Image/News/calendar.png'
      burgerActive={true}
      burgerOnClick={()=>{console.log("Stay away from my burger!")}}
      burgerActive={true} 
    //========================================================================================================
    //================================Box Above Navbar========================================================
    //========================================================================================================
      hasBox={true} 
      boxText='MyPosium'
      boxAlign='left'
    //========================================================================================================
    //================================General Navbar==========================================================
    //========================================================================================================
      navbarStyle={{backgroundColor: 'aliceBlue'}} 
      isActive={true} 
      onClick={()=>{console.log("You Clicked Me!")}}
    //========================================================================================================
    //================================Bloomer Helpers (applied to NavbarItem)=================================
    //==========================https://bloomer.js.org/#/documentation/overview/helpers=======================
    //========================================================================================================
      hasTextColor={'black'}
    />