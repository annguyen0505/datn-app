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

export const apiGetOrderDetail = (params, onSuccess, onError) => {
    return axiosGet("/getOrderDetail", params).then(onSuccess).catch(onError);
};

export const apiGetNewOrderCount = (params, onSuccess, onError) => {
    return axiosGet("/getNewOrderCount", params).then(onSuccess).catch(onError);
};

export const apiSeenAllOrders = (params, onSuccess, onError) => {
    return axiosGet("/seenAllOrders", params).then(onSuccess).catch(onError);
};
