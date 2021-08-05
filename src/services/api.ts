import axios from 'axios';

const api = axios.create({
  baseURL: '192.168.1.69'
});

export { api };
