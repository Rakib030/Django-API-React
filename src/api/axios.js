import axios from "axios";

const baseURL = `http://127.0.0.1:8000/api`;
export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
})

const Baseurl = `http://127.0.0.1:8000`

export const axiosMain = axios.create({
    baseURL: Baseurl
})