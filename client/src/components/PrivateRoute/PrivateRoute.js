import React from 'react';
import { Route, Redirect } from "react-router-dom";
import {authObj} from '../../authenticate'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    authObj.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/"/>
    )
  )}/>
)

export default PrivateRoute;
