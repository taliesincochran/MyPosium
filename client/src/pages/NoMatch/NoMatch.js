import React from "react";
import { Container, Columns, Column, Title, Subtitle, Box } from 'bloomer'
import { Link } from 'react-router-dom'

const NoMatch = () =>
  <div style={{minHeight: '100vh', backgroundImage: 'url("/img/coloredLines.jpg")', backgroundAttachment: 'fixed', backgroundSize: '100% 100%'}}>
    <Container>
      <Columns>
        <Column className='has-text-centered' isSize={6} isOffset={3}>
          <Box style={{marginTop: '200px'}} hasTextAlign="center">
            <Title isSize={1}>404 Not found</Title>
            <Title>🙄</Title>
            <Link to="/login"><p>Try Signing In?</p></Link>
            <Link to="/signup"><p>Or Create An Account!</p></Link>
          </Box>
        </Column>
      </Columns>
    </Container>;
  </div>

export default NoMatch;
