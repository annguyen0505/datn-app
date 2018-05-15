import { axiosGet, axiosPost } from "./../helpers/axios-helper.js";

export const apiGetCartInfo = (payload, onSuccess, onError) => {
    return axiosPost("/getCartInfo", payload).then(onSuccess).catch(onError);
};

export const apiPlaceOrder = (payload, onSuccess, onError) => {
    return axiosPost("/newOrder", payload).then(onSuccess).catch(onError);
};
