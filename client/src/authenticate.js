import axios from 'axios';

export const authObj = {
  isAuthenticated: false,
  authenticate() {
    return axios
      .get('api/users/checkAuth')
      // .then(response=> this.isAuthenticated = true)
      // .catch(err => console.log(err))
  },
  logout() {
    return axios
      .get('api/users/checkAuth')
      .then(response=> this.isAuthenticated = false)
      .catch(err => console.log(err))
  }
}
