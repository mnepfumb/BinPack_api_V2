import axios from 'axios';
const { REACT_APP_API_BASE_URL } = process.env;

console.log(REACT_APP_API_BASE_URL)

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = 'http://localhost:3500';
// const BASE_URL = 'https://binpackapi.azurewebsites.net';
// const BASE_URL = 'https://binpack-api.onrender.com';
// https://binpackapi.azurewebsites.net
// console.log(BASE_URL)

// console.log(`${process.env.REACT_APP_API_BASE_URL}`)

export default axios.create({
    
    baseURL: BASE_URL, 
    headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL, 
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

// const axiosInstance = axios.create();
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
// );

// export default axiosInstance;
