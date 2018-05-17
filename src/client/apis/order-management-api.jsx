import { axiosGet, axiosPost } from "./../helpers/axios-helper.js";


export const apiGetOrders = (params, onSuccess, onError) => {
    return axiosGet("/getOrders", params).then(onSuccess).catch(onError);
};
export const apiDeleteOrder = (params, onSuccess, onError) => {
    return axiosGet("/deleteOrder", params).then(onSuccess).catch(onError);
};
export const apiChangeConfirmation = (params, onSuccess, onError) => {
    return axiosGet("/changeConfirmation", params).then(onSuccess).catch(onError);
};
