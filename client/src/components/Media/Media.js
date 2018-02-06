import React from 'react';
import { Media, MediaLeft, Image, MediaContent, Link, Delete, MediaRight}

<Media>
  <MediaLeft>
    <Image isSize='64x64' src={props.imageURL} />
  </MediaLeft>
  <MediaContent>
    <Content>
      <p>
        <strong>{props.title}</strong>{' '}<small>{props.date}</small>
        <br />
        {props.description}
      </p>
    </Content>
  </MediaContent>
  <MediaRight>
      <Link to={"/events/" props.id}><Button>Go to event</Button></Link>
    <Delete />
  </MediaRight>
</Media>