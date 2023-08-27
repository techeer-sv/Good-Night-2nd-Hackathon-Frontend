import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { BASE_URL } from '../constants/config';

const baseInstance: AxiosInstance = axios.create({
	baseURL: BASE_URL
});

export default baseInstance;
