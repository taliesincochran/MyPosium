import React, { Component } from 'react';
import { Container, Button, Columns, Column, Card, CardHeader, Title, Icon, CardImage, Media, MediaLeft, MediaContent, Title, Subtitle, Content, CardContent } from 'bloomer';
<Card>
    <CardHeader>
        <CardHeaderTitle>
            Component
        </CardHeaderTitle>
        <CardHeaderIcon>
            <Icon className="fa fa-angle-down" />
        </CardHeaderIcon>
    </CardHeader>
    <CardImage>
        <Image isRatio='4:3' src='https://via.placeholder.com/1280x960' />
    </CardImage>
    <CardContent>
        <Media>
            <MediaLeft>
                <Image isSize='48x48' src='https://via.placeholder.com/96x96' />
            </MediaLeft>
            <MediaContent>
                <Title isSize={4}>John Wick</Title>
                <Subtitle isSize={6}>@John Wick</Subtitle>
            </MediaContent>
        </Media>
        <Content>
            People Keep Asking If I’m Back, And I Haven’t Really Had An Answer, But Now, Yeah, I’m Thinking I’m Back.
            <br/>
            <small>11:09 PM - 30 October 2014</small>
        </Content>
    </CardContent>
</Card>