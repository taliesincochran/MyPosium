import React from 'react';
import { Media, MediaLeft, Image, MediaContent, Button, Content, Link, Delete, MediaRight} from 'bloomer';

const EventMedia = props => {
  return(
    <Media>
      <MediaLeft>
        <Image isSize='64x64' src={props.imageURL} />
        <strong style={{fontSize: '1em'}}>{props.title}</strong>
      </MediaLeft>
      <MediaContent>
        <Content>
          <p>
            <small>{props.event.date}</small>
            <br />
            {props.event.time}
          </p>
        </Content>
      </MediaContent>
      <MediaRight>
          <Button className='button is-Primary' onClick={props.eventModal}>Details</Button>
        <Delete />
      </MediaRight>
    </Media>

    )
}
export default EventMedia;