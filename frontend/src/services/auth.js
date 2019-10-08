import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/api/auth';

const SERVICE = axios.create({ baseURL, withCredentials: true })

const AUTH_SERVICE = {
  signup: (user) => SERVICE.post('/signup', user),
  login: (user) => SERVICE.post('/login', user),
  logout: () => SERVICE.post('/logout', { token: localStorage.token})
}

export default AUTH_SERVICE;