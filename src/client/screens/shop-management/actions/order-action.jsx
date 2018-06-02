import { showSuccess, showError } from "./../../root-component/actions/notification";
import { apiGetOrders, apiChangeConfirmation, apiDeleteOrder } from "./../../../apis/order-management-api";
import { apiGetNewOrderCount } from "./../../../apis/order-management-api";

export const REQUEST_FOR_ORDERS = "REQUEST_FOR_ORDERS";
export const RECEIVE_ORDERS = "RECEIVE_ORDERS";
export const REQUEST_DELETE_ORDER = "REQUEST_DELETE_ORDER";
export const RECEIVE_DELETE_RESPONSE = "RECEIVE_DELETE_RESPONSE";
export const REQUEST_CHANGE_CONFIRMATION = "REQUEST_CHANGE_CONFIRMATION";
export const RECEIVE_CHANGE_RESPONSE = "RECEIVE_CHANGE_RESPONSE";
export const REQUEST_GET_NEW_ORDERS = "REQUEST_GET_NEW_ORDERS";
export const RECEIVE_NEW_ORDERS_COUNT = "RECEIVE_NEW_ORDERS_COUNT";

export const requestOrders = (criteria) => {
    return {
        type: REQUEST_FOR_ORDERS,
        criteria
    };
};

export const receiveOrders = (orders, totalRecords) => {
    return {
        type: RECEIVE_ORDERS,
        orders,
        totalRecords
    };
};

export const requestChangeConfirmation = () => {
    return {
        type: REQUEST_CHANGE_CONFIRMATION
    };
};

export const receiveChangeResponse = (isChangeSuccess) => {
    return {
        type: RECEIVE_CHANGE_RESPONSE,
        isChangeSuccess
    };
};

export const requestDeleteOrder = () => {
    return {
        type: REQUEST_DELETE_ORDER
    };
};

export const receiveDeleteResponse = (isDeleteSuccess) => {
    return {
        type: RECEIVE_DELETE_RESPONSE,
        isDeleteSuccess
    };
};
export const getOrders = (criteria) => {
    return (dispatch) => {
        dispatch(requestOrders(criteria));
        return apiGetOrders((criteria), (result) => {
            const { orders, totalRecords } = result.data;
            dispatch(receiveOrders(orders, totalRecords));
        }, (err) => {
            dispatch(showError(err.toString()));
        });

    };
};


export const changeConfirmation = (orderId, value) => {

    return (dispatch) => {
        dispatch(requestChangeConfirmation());
        return apiChangeConfirmation({
            orderId, value
        }, (result) => {
            const { isSuccess } = result.data;
            if (isSuccess) {
                dispatch(showSuccess("Cập nhật thành công"));
            }
            dispatch(receiveChangeResponse(isSuccess));
        }, (err) => {
            dispatch(showError(err.toString()));
        });
    };
};

export const deleteOrder = (orderId) => {
    return (dispatch) => {
        dispatch(requestDeleteOrder());
        return apiDeleteOrder({
            orderId
        }, (result) => {
            const { isSuccess } = result.data;
            if (isSuccess) {
                dispatch(showSuccess("Xóa thành công"));
            }
            dispatch(receiveDeleteResponse(isSuccess));
        }, (err) => {
            dispatch(showError(err.toString()));
        });
    };
};


export const requestGetNewOrders = () => {
    return {
        type: REQUEST_GET_NEW_ORDERS
    };
};


export const receiveNewOrderCount = (newOrders) => {
    return {
        type: RECEIVE_NEW_ORDERS_COUNT,
        newOrders
    };
};

export const getNewOrders = (shopId) => {
    return (dispatch) => {
        dispatch(requestGetNewOrders());
        return apiGetNewOrderCount({ shopId },
            (rs) => {
                dispatch(receiveNewOrderCount(rs.data.count));
            });
    };
};
