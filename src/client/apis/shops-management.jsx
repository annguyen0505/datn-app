import { axiosGet } from "./../helpers/axios-helper.js";

export const apiGetShops = (params, onSuccess, onError) => {
    return axiosGet("/getShops", params).then(onSuccess).catch(onError);
};

export const apiGetCategories = (onSuccess, onError) => {
    return axiosGet("/getCategories").then(onSuccess).catch(onError);
};

export const apiGetShopView = (params, onSuccess, onError) => {
    return axiosGet("/getShopView", params).then(onSuccess).catch(onError);
};

export const apiGetShopCategories = (params, onSuccess, onError) => {
    return axiosGet("/getShopCategories", params).then(onSuccess).catch(onError);
};