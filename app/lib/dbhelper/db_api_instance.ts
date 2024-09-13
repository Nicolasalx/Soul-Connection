import axios from 'axios';

export const sc_db_api = axios.create({
  baseURL: 'http://localhost:3000/api/back',
  headers: {
    'Content-Type': 'application/json',
  },
});
