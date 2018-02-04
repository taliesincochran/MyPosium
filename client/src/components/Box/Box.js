import React from "react";
import { Box } from 'bloomer';
const Box = props => {
	var fullWidth;
			boxAlign
	if(props.Box) {
		props.boxWidth? fullWidth = props.boxWidth : fullWidth = true;
		props.boxAlign? boxAlign = props.boxAlign : boxAlign = 'left';
		props.boxText? boxText = props.boxText : boxText = "MyPosium";
		return(
			<Box 
				isFullWidth={fullWidth}
				hasTextAlign={boxAlign} 
				style={this.props.boxStyle}
			>
				<h1 style={this.props.boxTextStyle}>{boxText}</h1>
			</Box>
		)
	}
}