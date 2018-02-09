import React, { Component } from 'react';
import NavbarHeader from '../../components/Nav/Navbar';
import './Landing.css';
import { Image,
	Column,
	Section,
	Title,
	Subtitle,
	Columns
	} from 'bloomer';
export default class Landing extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
    this.onClickNav = this.onClickNav.bind(this);
  }
  onClickNav = () => {
      this.setState((state) => ({ isActive: !state.isActive }));
  }

  render() {
    return(
      <div>
        <NavbarHeader
        	hasStart={true}
        	brandStyle={{marginRight:'-50px'}}
        	hasEnd={true}
		      hasBrand={true}
		      navbarStyle={{boxShadow: '2px 2px 5px', position:"fixed", top:"0", left:"0", zIndex: '998', width: '100%'}}
		      brandText='Myposium'
		      burgerActive={this.state.isActive}
		      isActive={this.state.isActive}
		      onClick={this.onClickNav}
		      hasTextColor={'black'}
		      navbarStart={
		        [
		          {
		            text: "Create",
		            href: "#create",
		            style: {marginLeft: '150px'}
		          }, {
		            text: 'Discover',
		            href: "#discover",
		            style: {marginLeft: '150px'}
		          }, {
		          	text: 'Connect',
		          	href: "#connect",
		            style: {marginLeft: '150px'}
		          }
		        ]
		      }
		      navbarEnd={[
		      	{
		            href:"/login",
		            text: "Login",
		            textStyle: {textDecoration: 'none', color: '#4C4CFF'}
		          }, {
		            href:"/signup",
		            text: 'SignUp',
		            textStyle: {textDecoration: 'none', color: '#4C4CFF'}
		          }]}
		    />
			<a id="create" style={{marginTop: "20px"}}> </a>
			<div style={{height:'20px'}}/>
		    <Section>
			    <Columns>
			    	<Column isSize='1/3'>
			    		<Image src = "/img/tempImage.JPG" />
			    	</Column>
			    	<Column isSize='2/3'>
			            <Title>Create</Title>
			            {/* <Subtitle> A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading */}
			            {/* </Subtitle> */}
			      </Column>
			    </Columns>
		    </Section>
				<a id="discover" style={{marginTop: "20px"}}> </a>
		        <Section>
			    <Columns>
			    	<Column isSize='2/3'>
			            <Title>Discover</Title>
			            {/* <Subtitle> A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading */}
			            {/* </Subtitle> */}
			      </Column>
			    	<Column isSize='1/3'>
			    		<Image src = "/img/tempImage.JPG" />
			    	</Column>
			    </Columns>
			</Section>
	    <a id="connect" style={{marginTop: "20px"}}> </a>
			<Section>
			    <Columns>
			    	<Column isSize='1/3'>
			    		<Image src = "/img/tempImage.JPG" />
			    	</Column>
			    	<Column isSize='2/3'>
			            <Title>Connect</Title>
			            {/* <Subtitle> A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading */}
			            {/* </Subtitle> */}
			      </Column>
			    </Columns>
		    </Section>
      </div>
    )
  }
}
