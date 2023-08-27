import axios from 'axios';

const BASE_URL = '/api/v1';

export const baseInstance = axios.create({
  baseURL: BASE_URL,
});
