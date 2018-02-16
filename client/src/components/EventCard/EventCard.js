import React from 'react';
import {
  CardHeaderTitle,
  Image,
  Columns,
  Column,
  Card,
  CardHeader,
  Button,
  CardImage,
  Title,
  Content,
  CardContent,
} from 'bloomer';
import moment from 'moment';

const EventCard = props => {
  if(!props.isSmall) {
    //Fullsize card render
    return(
      <Card>
        <CardHeader>
          <CardHeaderTitle style={{width: '100%', background: 'MintCream'}}>
            <Title isSize={4}>{props.event.title}</Title>
          </CardHeaderTitle>
        </CardHeader>
        <Columns style={{margin: '20px'}}>
          <Column isSize='1/2'>
            <CardImage style={{marginBottom: '20px'}}>
              <Image isRatio='4:3' src={props.event.imgURL || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?w=1260&h=750&auto=compress&cs=tinysrgb'} alt={props.event.title} />
            </CardImage>
          </Column>
          <Column isSize='1/2'>
            <Title isSize={4}>{props.event.title}</Title>
            <p style={{marginBottom: '20px'}}>{props.event.description}</p>
          </Column>
        </Columns>
        <Columns style={{margin: '20px', marginTop: '-30px'}}>
          <Column>
            <Title isSize={6}>Event Date: {moment(props.event.date).format("dddd, MMMM Do YYYY")} {'   '}{moment(props.event.time, "HH:mm").format("h:mm a")}</Title>
            <Title isSize={6}>Event Cost: {props.event.cost}</Title>
          </Column>
          <Column>
            <Button value={props.event._id} onClick={props.onClick} style={{width: '50%'}} className="is-success">Attend</Button>
            <Button onClick={()=> props.eventModal(props.event)} className="is-info" style={{width: '50%'}}>View More</Button>
          </Column>
        </Columns>
      </Card>
    )
  } else {
    //For a smaller card
    return(
      <Card>
        <CardHeader>
          <CardHeaderTitle style={{width: '100%', background: 'Mintcream'}}>
            {props.event.title}
          </CardHeaderTitle>
        </CardHeader>
        <Columns >
          <Column isSize='1/2'>
            <CardImage>
              <Image isRatio='4:3' src={props.event.imgURL || 'https://images.pexels.com/photos/6227/hands-technology-photo-phone.jpg?w=1260&h=750&auto=compress&cs=tinysrgb'} alt={props.event.title} />
            </CardImage>
          </Column>
          <Column isSize='1/2' style={{position: 'relative', top: '0px'}}>
            <CardContent>
              <Content>
                <small>{moment(props.event.date).format("dddd, MMMM Do YYYY")}</small>
                {'  '}
                <small>{moment(props.event.time, "HH:mm").format("h:mm a")}</small>
              </Content>
            </CardContent>
          </Column>
        </Columns>
        <Button className="button is-primary is-fullwidth" style={{margin: "5px 0px 0px 0px"}} onClick={()=> props.eventModal(props.event)}>View More</Button>
      </Card>
      )
  }
}

export default EventCard;
