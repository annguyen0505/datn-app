import { getAccessToken, saveAccessToken } from "./../../../helpers/cookie-helper";
import { getLocalUserProfile } from "./../../../helpers/jwt-helper";
import { apiLogin, apiCheckUserName } from "./../../../apis/authentication-api";
export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const REMOVE_USER_PROFILE = "REMOVE_USER_PROFILE";
export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const RECEIVE_LOGIN_RESPONSE = "RECEIVE_LOGIN_RESPONSE";
export const REQUEST_CHECK_USERNAME = "REQUEST_CHECK_USERNAME";
export const RECEIVE_CHECK_RESPONE = "RECEIVE_CHECK_RESPONE";

export const setUserProfile = (localStorage) => {
    const accessToken = getAccessToken(localStorage) || null;
    const profile = accessToken === null ? null : getLocalUserProfile(accessToken);
    return {
        type: SET_USER_PROFILE,
        profile
    };
};

export const removeUserProfile = () => {
    return {
        type: REMOVE_USER_PROFILE
    };
};

export const requestLogin = () => {
    return {
        type: REQUEST_LOGIN
    };
};

export const receiveLoginResponse = (loginStatus) => {
    return {
        type: RECEIVE_LOGIN_RESPONSE,
        loginStatus
    };
};

export const requestCheckUser = () => {
    return {
        type: REQUEST_CHECK_USERNAME
    };
};

export const receiveCheckUserResponse = (isExisted) => {
    return {
        type: REQUEST_CHECK_USERNAME,
        isExisted
    };
};


export const checkUserName = (userName) => {
    return (dispatch) => {
        dispatch(requestCheckUser());
        return apiCheckUserName(userName,
            (result) => {
                const status = result.data;
                dispatch(receiveCheckUserResponse(status));
            }, (error) => {
                console.log(error);
            });
    };
};


export const login = (credential, localStorage) => {
    return (dispatch) => {
        dispatch(requestLogin());
        return apiLogin(credential, (result) => {
            if (result.data.status) {
                const token = result.data.token;
                saveAccessToken(localStorage, token);
                dispatch(setUserProfile(localStorage));
                dispatch(receiveLoginResponse(true));
            } else {
                dispatch(receiveLoginResponse(false));
            }
        }, (error) => {
            console.log(error);
        });
    };
};
