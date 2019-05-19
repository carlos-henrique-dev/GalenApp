import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-gallen.herokuapp.com/',
  // baseURL: "http://192.168.0.102:3003"
});

export default api;
