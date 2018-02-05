import React, { Component } from 'react';
import NavbarHeader from '../../components/Nav/Navbar';
import { Box,
	Image,
	Container,
	Column,
	Row,
	Section,
	Title,
	Subtitle,
	Columns
	} from 'bloomer';
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
		      burgerActive={true} 
		      isActive={true} 
		      burgerActive={true}
		      hasTextColor={'black'}
		      navbarStart={
		        [
		          {  
		            text: "Create",
		            href: "#create",
		            style: {marginLeft: '100px'}
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
		            textStyle: {textDecoration: 'underline', color: '#4C4CFF'}
		          }, {
		            href:"/signup",  
		            text: 'SignUp',
		            textStyle: {textDecoration: 'underline', color: '#4C4CFF'}
		          }]}
		    />
		    <Section>
			    <Columns>
			    	<a name="connect" />
			    	<Column isSize='1/3' isGrid={true}>
			    		<Image src = "https://media.defense.gov/2017/Nov/14/2001842780/-1/-1/0/171114-F-ZZ999-1004.JPG" />
			    	</Column>
			    	<Column isSize='2/3' isGrid={true}>
			            <Title>Section</Title>
			            <Subtitle> A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
			            </Subtitle>
			      </Column>
			    </Columns>
		    </Section>
		        <Section>
			    <Columns>
			    	<a name="discover" />
			    	<Column isSize='2/3'>
			            <Title>Section</Title>
			            <Subtitle> A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
			            </Subtitle>
			      </Column>
			    	<Column isSize='1/3'>
			    		<Image src = "https://media.defense.gov/2017/Nov/14/2001842780/-1/-1/0/171114-F-ZZ999-1004.JPG" />
			    	</Column>
			    </Columns>
			        <Section>
	    <Columns>
	    	<a name="connect" />
	    	<Column isSize='1/3'>
	    		<Image src = "https://media.defense.gov/2017/Nov/14/2001842780/-1/-1/0/171114-F-ZZ999-1004.JPG" />
	    	</Column>
	    	<Column isSize='2/3'>
	            <Title>Section</Title>
	            <Subtitle> A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
	            </Subtitle>
	      </Column>
	    </Columns>
    </Section>
		    </Section>
      </div>
    )
  }
}
