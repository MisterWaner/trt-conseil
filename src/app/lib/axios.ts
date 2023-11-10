import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const Axios: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

export default Axios;