import React, { Component } from 'react';
import NavbarHeader from '../../components/Nav/Navbar';
import './Landing.css';
// import { injectGlobal } from 'emotion';
import { Image,
	Container,
	Content,
	Column,
	Section,
	Title,
	Tile,
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



	componentDidMount() {
		// let body = document.querySelector('body');
		// body.style.backgroundImage = "url('img/woodBackground.jpg')"
		// body.style.backgroundSize = '100% 100%';
		// body.style.backgroundAttachment = 'fixed';
		// body.style.backgroundColor = 'green';
	}


  onClickNav = () => {
      this.setState((state) => ({ isActive: !state.isActive }));
  }

  render() {
    return(
      <div style={{backgroundImage: 'url("img/woodBackground.jpg")', backgroundSize: '100% 100%', backgroundAttachment: 'fixed'}}>
        <NavbarHeader
        	hasStart={true}
        	brandStyle={{marginRight:'-50px'}}
        	hasEnd={true}
		      hasBrand={true}
		      navbarStyle={{boxShadow: '2px 2px 5px', position:"fixed", top:"0", left:"0", zIndex: '998', width: '100%'}}
          hasEndButtons={true}
		      brandText={window.location.pathname==='/'? (<a href="#myposium" style={{fontSize: '1.6em', textDecoration: 'none'}}>MyPosium</a>): "MyPosium"}
		      burgeractive={this.state.isActive}
		      isActive={this.state.isActive}
		      onClick={this.onClickNav}
		      hasTextColor={'black'}
		      navbarStart={
		        [
		          {
		            text: "Create",
		            href: "#create",
		            style: {marginLeft: '0px', fontSize: '1.5em'}
		          }, {
		            text: 'Discover',
		            href: "#discover",
		            style: {marginLeft: '150px', fontSize: '1.5em'}
		          }, {
		          	text: 'Connect',
		          	href: "#connect",
		            style: {marginLeft: '150px', fontSize: '1.5em'}
		          }
		        ]
		      }
		      navbarEnd={[
		      	{
		            href:"/login",
		            text: "Login",
								buttonClass: 'is-primary',
		            textStyle: {textDecoration: 'none'}
		          }, {
		            href:"/signup",
		            text: 'Sign Up',
								buttonClass: 'is-primary',
		            textStyle: {textDecoration: 'none'}
		          }]}
		    />

			<div style={{height:'1px'}}/>
					<a id="myposium" ></a>
					<Section className='is-vertical-center' style={{position: 'fixed', zIndex: '0' }}>
						<Container className="is-clearfix">
							<Title isSize={1}  style={{marginLeft: '150px'}}>...MyPosium</Title>
							<br/>
								<Title isSize={3} className="is-pulled-right">A New Way to Create, Discover, and Connect!</Title>

						</Container>
			    </Section>
					<div className={'is-fullWidth'} style={{ width: '100%', position: 'relative', 'zIndex': '100', marginTop: '100vh', background: 'linear-gradient(to right, rgb(200,245,240), MintCream, MintCream, white, white, MintCream, MintCream, rgb(200,245,240)  )'}} >
						<a id="create" style={{marginTop: "20px"}}> </a>
						<Container>
						<Section className='is-vertical-center'>
					    <Columns>
					    	<Column isSize={4}>
					    		<Image src = "/img/gearBrain.jpg" />
					    	</Column>
					    	<Column isSize={6} isOffset={2}>
					            <Title className='text-center' style={{marginTop: '10%'}}>Create</Title>
											<Content className="is-size-4">MyPosium allows real people with real knowledge to create a connection with others who want and need that knowledge.  <span className="highlight">CREATE</span> an event, either in person or virtually, and share your wisdom with the world!</Content>
					      </Column>
					    </Columns>
				    </Section>

						<a id="discover" style={{marginTop: "20px"}}> </a>
		        <Section className='is-vertical-center'>
					    <Columns>
					    	<Column isSize={6} >
					            <Title className='text-center' style={{marginTop: '15%'}}>Discover</Title>
											<Content className="is-size-4">The world is brimming with people who have spent a lifetime gathering knowledge.  Search through our expansive list of events and <span className="highlight">DISCOVER</span> new content creators, new ideas, and new friends!  </Content>
					      </Column>
					    	<Column isSize={4} isOffset={2}>
					    		<Image src = "/img/lightBulb.jpg" className='is-vertical-center' style={{transform: 'rotate(20deg)', width: '70%'}}/>
					    	</Column>
					    </Columns>
						</Section>
				    <a id="connect" style={{marginTop: "20px"}}> </a>
						<Section className='is-vertical-center'>
					    <Columns>
					    	<Column isSize={4}>
					    		<Image src = "/img/connect.jpg"/>
					    	</Column>
					    	<Column isSize={6} isOffset={2}>
					            <Title className='text-center' style={{marginTop: '15%'}}>Connect</Title>
											<Content className="is-size-4">MyPosium aims to <span className="highlight">CONNECT</span> people who are thirsty for knowledge and entertainment with those who can provide it.  Ask questions, provide feedback, and help shape the future of Edu-tainment!  <a href="/signup">Sign up for an account now!</a></Content>
					      </Column>
					    </Columns>
				    </Section>
						</Container>
					</div>
      </div>
    )
  }
}
