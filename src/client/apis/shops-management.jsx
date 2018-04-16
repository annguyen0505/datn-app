import { axiosGet } from "./../helpers/axios-helper.js";

export const apiGetShops = (params, onSuccess, onError) => {
    return axiosGet("/getShops", params).then(onSuccess).catch(onError);
};

export const apiGetCategories = (onSuccess, onError) => {
    return axiosGet("/getCategories").then(onSuccess).catch(onError);
};
