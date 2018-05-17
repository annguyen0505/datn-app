import { getCategories, getProvinces } from "./../../home/actions/index";
import { apiRegister } from "./../../../apis/authentication-api";
import { showSuccess, showError } from "./../../root-component/actions/notification";
export const REQUEST_REGISTER = "REQUEST_REGISTER";
export const RECEIVE_REGISTER_RESPONSE = "RECEIVE_REGISTER_RESPONSE";

export const requestRegister = () => {
    return {
        type: REQUEST_REGISTER
    };
};

export const receiveRegisterResponse = (isSuccess) => {
    return {
        type: RECEIVE_REGISTER_RESPONSE,
        isSuccess
    };
};

export const register = (payload) => {
    return (dispatch) => {
        dispatch(requestRegister());
        return apiRegister(payload, (result) => {
            dispatch(receiveRegisterResponse(true));
            dispatch(showSuccess("Đăng ký thành công! Đăng nhập để sử dụng dịch vụ"));
        }, (err) => {
            dispatch(receiveRegisterResponse(false));
            dispatch(showError(err.toString()));
        });
    };
};

export const getInitialState = () => {
    return (dispatch) => {
        dispatch(getCategories());
        dispatch(getProvinces());
    };
};
