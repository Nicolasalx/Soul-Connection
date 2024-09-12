import axios from 'axios';

export const sc_db_api = axios.create({
  baseURL: `${process.env.NODE_ENV as string === 'development' ? process.env.devUrl as string : process.env.prodUrl as string}/api/back`,
  headers: {
    'Content-Type': 'application/json',
  },
});
