import axios from "axios";
import { apiAddress } from "./../config/api-config.js";


const instance = axios.create({
    baseURL: apiAddress.devApi,
    timeout: 1000
});


export const axiosGet = (url, params) => {
    return instance.get(url, { params });
};

export const axiosPost = (url, payload) => {
    return instance.post(url, payload);
};


