import React from 'react';
import { Link } from 'react-router-dom';
import {
  CardHeaderTitle,
  CardHeaderIcon,
  Image,
  Columns,
  Column,
  Card,
  CardHeader,
  Icon,
  Button,
  CardImage,
  Media,
  MediaLeft,
  MediaContent,
  Title,
  Subtitle,
  Content,
  CardContent
} from 'bloomer';

const EventCard = props => {
  return(
    
    <Card>
      <CardHeader>
        <CardHeaderTitle>
          {props.event.title}
        </CardHeaderTitle>
      </CardHeader>
      <Columns >
        <Column isSize='1/2'>
          <CardImage>
            <Image isRatio='4:3' src={props.event.imgURL || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?w=1260&h=750&auto=compress&cs=tinysrgb'} alt={props.event.title} />
          </CardImage>
        </Column>
        <Column isSize='1/2'>
          <CardContent>
            <Media>
              <MediaContent>
                <Title isSize={4}>{props.event.title}</Title>
              </MediaContent>
            </Media>
            <Content>
              <p>{props.event.description}</p>
              <br/>
              <small>{props.event.date}{' '}{props.event.time}</small>
              <br />
              <small>${props.event.cost}</small>
              <Button value={props.event._id} onClick={props.onClick}>Attend</Button>
              <Link to={{pathname: "/event/", state: {state: props.state, event: props.event}}}>
                <Button>View More
                </Button>
              </Link>
            </Content>
          </CardContent>
        </Column>
      </Columns>
    </Card>
  )
}

export default EventCard;
