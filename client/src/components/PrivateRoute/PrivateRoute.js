import React from 'react';
import axios from 'axios';
import { Route, Redirect } from "react-router-dom";
// import {isAuthenticated} from '../../authenticate.js';

// const PrivateRoute = props => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>

//
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

//
// export const PrivateRoute = props => {
//   axios
//     .get('api/users/checkAuth')
//     .then(response => {
//       var isAuthenticated = false;
//       if (response){
//          isAuthenticated = response.data.isAuth;
//       }
//       let asdf = isAuthenticated ?
//       (<Route path={props.path} component={props.component} />):
//       (<Redirect to="/" />)
//       console.log(asdf)
//       return asdf;
//     })
// }

export default class PrivateRoute extends React.Component {
  state = {
    user: '',
    isAuth: false
  }

componentWillReceiveProps() {
  axios
    .get('api/users/checkAuth')
    .then(response => {
      let { user, isAuth } = response.data;
      this.setState({user,isAuth})
      console.log(this.state);
    })
}
   render(){

     return (
      this.state.isAuth ?
      (<Route {...this.props} />) :
      (<Redirect to="/" />)
    )
  }
}
// export default PrivateRoute;

// Best one so far
// const PrivateRoute = ({ component: Component, ...rest }) => {
//   axios
//     .get('/api/users/checkAuth')
//     .then(response => {
//       var isAuthenticated = false;
//       if (response){
//         isAuthenticated = response.data.isAuth;
//       }
//       console.log(isAuthenticated)
//       return(
//         <Route {...rest} render={props => (
//           !isAuthenticated ? (
//             <Component {...props}/>
//           ) : (
//             <Redirect to='/' />
//           )
//         )}/>
//       )
//     })
//     .catch(err => console.log(err))
// }


// export const PrivateRoute = props => {
//   axios
//    .get('api/users/checkAuth')
//    .then(response => {
//      let isAuth = response.data.isAuth;
//      isAuth?
//      (<Route path={props.path} component={props.component}/>):
//      (<Redirect to={{
//        pathname: '/',
//        state: { from: props.location }
//      }}/>)
//    })
//    .catch(err => console.log(err));
// }
// export default const PrivateRoute = ({ component: Component, ...rest }) => {
//   let isAuthorized = false;
//
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// }
