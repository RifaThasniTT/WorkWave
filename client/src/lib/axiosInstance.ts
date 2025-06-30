import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
})

export default API;