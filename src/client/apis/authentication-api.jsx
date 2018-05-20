import { axiosPost, axiosGet } from "./../helpers/axios-helper.js";


export const apiLogin = (credential, onSuccess, onError) => {
    return axiosPost("/login", credential).then(onSuccess).catch(onError);
};

export const apiCheckUserName = (userName, onSuccess, onError) => {
    return axiosGet("/checkUserIsExist", userName).then(onSuccess).catch(onError);
};

export const apiRegister = (payload, onSuccess, onError) => {
    return axiosPost("/register", payload).then(onSuccess).catch(onError);
};
