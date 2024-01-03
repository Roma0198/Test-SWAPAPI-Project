import axios from 'axios';

const baseURL_V1 = 'https://swapi.dev/api/';

export const api = axios.create({
  baseURL: baseURL_V1,
});
