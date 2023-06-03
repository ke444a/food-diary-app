import axios from "axios";

export const customAxios = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_SERVER_URL : import.meta.env.VITE_LOCALHOST_URL
});