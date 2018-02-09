import React, { Component } from 'react';
import NavbarHeader from '../../components/Nav/Navbar';
import './Landing.css';
import { Image,
	Container,
	Content,
	Column,
	Section,
	Title,
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
		            style: {marginLeft: '0px'}
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
								hasEndButtons: true,
								hasEnd: true,
		            href:"/login",
		            text: "Login",
		            textStyle: {textDecoration: 'none', color: '#4C4CFF'}
		          }, {
								hasEndButtons: true,
								hasEnd: true,
		            href:"/signup",
		            text: 'SignUp',
		            textStyle: {textDecoration: 'none', color: '#4C4CFF'}
		          }]}
		    />
			<a id="create" style={{marginTop: "20px"}}> </a>
			<div style={{height:'20px'}}/>
		    <Container>
					<Section className='is-vertical-center'>
				    <Columns>
				    	<Column isSize={4}>
				    		<Image src = "/img/tempImage.JPG" />
				    	</Column>
				    	<Column isSize={6} isOffset={2}>
				            <Title className='text-center'>Create</Title>
										<Content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam hic ipsa quibusdam, dolorum odit saepe molestias ipsum distinctio doloremque, possimus! Quas saepe similique commodi natus eligendi beatae illo. Tenetur, inventore!</Content>
				      </Column>
				    </Columns>
			    </Section>
					<a id="discover" style={{marginTop: "20px"}}> </a>
	        <Section className='is-vertical-center'>
				    <Columns>
				    	<Column isSize={6} >
				            <Title className='text-center'>Discover</Title>
										<Content >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quas velit atque odit rerum, impedit dolore commodi accusamus natus vel, nisi, deserunt magni sint cumque cupiditate magnam molestiae dignissimos quasi.</Content>
				      </Column>
				    	<Column isSize={4} isOffset={2}>
				    		<Image src = "/img/tempImage.JPG" className='is-vertical-center'/>
				    	</Column>
				    </Columns>
					</Section>
			    <a id="connect" style={{marginTop: "20px"}}> </a>
					<Section className='is-vertical-center'>
				    <Columns>
				    	<Column isSize={4}>
				    		<Image src = "/img/tempImage.JPG"/>
				    	</Column>
				    	<Column isSize={6} isOffset={2}>
				            <Title className='text-center'>Connect</Title>
										<Content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eos, consequuntur quidem, ab obcaecati atque veritatis aliquam officiis? Perspiciatis modi dolorum expedita facilis ipsum cupiditate. Quam a facilis nesciunt similique.</Content>
				      </Column>
				    </Columns>
			    </Section>
				</Container>
      </div>
    )
  }
}
