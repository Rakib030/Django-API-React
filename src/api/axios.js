import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        Authorization: "Token " + localStorage.getItem("token"),
        "Content-Type": "application/json",
        accept: "application/json"
    }
})

export const axiosInitial = axios.create({
    baseURL: "http://127.0.0.1:8000",
})