import axios from 'axios';

require('dotenv').config();

// define the api
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

api.interceptors.request.use(
    req => {

        if (!req.url.startsWith('auth')) {
            const token = sessionStorage.getItem('token');
            if (token) {
                req.headers.authorization = `Bearer ${token}`;
            }
        }

        return req;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    res => res.data,
    error => {
        throw { error: error.response.data.error, status: error.response.status };
    }
);

export default api;
