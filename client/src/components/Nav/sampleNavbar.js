    onClickNav = () => {
        this.setState((state) => ({ isActive: !state.isActive }));
    }
    onClickDropdown = () => {
        this.setState((state) => ({ isDropdownOpen: !state.isDropdownOpen }));
    }

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
      dropDownOnClick={this.onClickDropdown}
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
      burgeractive={true}
      burgerOnClick={this.onClickNav}
      burgeractive={true} 
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
      onClick={this.onClickNav}
    //========================================================================================================
    //================================Bloomer Helpers (applied to NavbarItem)=================================
    //==========================https://bloomer.js.org/#/documentation/overview/helpers=======================
    //========================================================================================================
      hasTextColor={'black'}
    />