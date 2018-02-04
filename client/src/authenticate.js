import axios from 'axios';

export const isAuthenticated = () => {
  axios
    .get('/api/users/checkAuth')
    .then(response => {
      return response.data.isAuth;
    })
    .catch(err);
}
