import axios from 'axios';

const isAuthenticated = () => {
  return axios
    .get('/api/users/checkAuth')
    .then(response => {
    	console.log('response', response);
      return response.data.isAuth;
    })
    .catch(err => console.log(err));
}
export default isAuthenticated;