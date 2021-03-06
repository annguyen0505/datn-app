import { axiosGet, axiosPost } from "./../helpers/axios-helper.js";

export const apiGetShops = (params, onSuccess, onError) => {
    return axiosGet("/getShops", params).then(onSuccess).catch(onError);
};

export const apiGetCategories = (onSuccess, onError) => {
    return axiosGet("/getCategories").then(onSuccess).catch(onError);
};
export const apiProvinces = (onSuccess, onError) => {
    return axiosGet("/getProvinces").then(onSuccess).catch(onError);
};

export const apiGetShopView = (params, onSuccess, onError) => {
    return axiosGet("/getShopView", params).then(onSuccess).catch(onError);
};
export const apiGetShopViewOfUser = (params, onSuccess, onError) => {
    return axiosGet("/getShopViewOfUser", params).then(onSuccess).catch(onError);
};

export const apiGetShopCategories = (params, onSuccess, onError) => {
    return axiosGet("/getShopCategories", params).then(onSuccess).catch(onError);
};

export const apiGetShopProvinces = (params, onSuccess, onError) => {
    return axiosGet("/getShopProvinces", params).then(onSuccess).catch(onError);
};

export const apiGetShopProducts = (criteria, onSuccess, onError) => {
    return axiosGet("/getShopProducts", criteria).then(onSuccess).catch(onError);
};

export const apiAddPorduct = (payload, onSuccess, onError) => {
    return axiosPost("/addProduct", payload).then(onSuccess).catch(onError);
};
export const apiUpdateProduct = (payload, onSuccess, onError) => {
    return axiosPost("/updateProduct", payload).then(onSuccess).catch(onError);
};

export const apiDeleteProduct = (params, onSuccess, onError) => {
    return axiosGet("/deleteProduct", params).then(onSuccess).catch(onError);
};

export const apiGetProduct = (params, onSuccess, onError) => {
    return axiosGet("/getProduct", params).then(onSuccess).catch(onError);
};


export const apiGetProductDetail = (params, onSuccess, onError) => {
    return axiosGet("/getProductDetail", params).then(onSuccess).catch(onError);
};

export const apiUpdateShopInfo = (payload, onSuccess, onError) => {
    return axiosPost("/updateShopInfo", payload).then(onSuccess).catch(onError);
};
export const apiUpdateShopInfoWithoutImage = (payload, onSuccess, onError) => {
    return axiosPost("/updateShopInfoWithoutImage", payload).then(onSuccess).catch(onError);
};