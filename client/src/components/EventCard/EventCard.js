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
          {props.title}
        </CardHeaderTitle>
        <CardHeaderIcon>
          <Icon className="fa fa-angle-down" />
        </CardHeaderIcon>
      </CardHeader>
      <CardImage>
        <Image isRatio='4:3' src={props.imageURL} alt={props.title} />
      </CardImage>
      <CardContent>
        <Media>
          <MediaContent>
            <Title isSize={4}>{props.title}</Title>
            <Subtitle isSize={6}>{props.date}<span>{'  '}</span>{props.time}</Subtitle>
          </MediaContent>
        </Media>
        <Content>
          <p>{props.description}</p>
          <br/>
          <small>{props.date}{' '}{props.time}</small>
          <Link to={"/api/event/"+ props.id}><Button>View More</Button></Link>
        </Content>
      </CardContent>
    </Card>
  )
}

export default EventCard;
