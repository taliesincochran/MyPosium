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
import moment from 'moment';
const EventCard = props => {
  if(!props.isSmall) {
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
              <Image isRatio='4:3' src={props.event.imgUrl || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?w=1260&h=750&auto=compress&cs=tinysrgb'} alt={props.event.title} />
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
                <small>{moment(props.event.date).format("dddd, MMMM Do YYYY")} {'   '}{moment(props.time).format("h:mm a")}</small>
                <br />
                <small>${props.event.cost}</small>
                <Button onClick={props.attend}>Attend</Button>
                  <Button value={props.event._id} onClick={props.eventModal}>View More</Button>
                </Content>
            </CardContent>
          </Column>
        </Columns>
      </Card>
    )
  } else {
    //For a smaller card
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
              <Image isRatio='4:3' src={props.event.imgUrl || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?w=1260&h=750&auto=compress&cs=tinysrgb'} alt={props.event.title} />
            </CardImage>
            <Button className="button is-primary" style={{margin: "5px 0px 0px 0px"}} onClick={props.eventModal}>View More</Button>
          </Column>
          <Column isSize='1/2' style={{position: 'relative', top: '0px'}}>
            <CardContent>
              <Content>
                <small>{moment(props.event.date).format("dddd, MMMM Do YYYY")}</small>
                {'  '}
                <small>{moment(props.time).format("h:mm a")}</small>
              </Content>
            </CardContent>
          </Column>
        </Columns>
      </Card>
      )
  }
}

export default EventCard;
