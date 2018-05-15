import { apiPlaceOrder } from "./../../../apis/cart-management";
import { showError, showSuccess } from "./../../root-component/actions/notification";
export const REQUEST_PLACE_ORDER = "REQUEST_PLACE_ORDER";
export const RECEIVE_PLACE_ORDER_RESPONSE = "RECEIVE_PLACE_ORDER_RESPONSE";

export const requestPlaceOrder = () => {
    return {
        type: REQUEST_PLACE_ORDER
    };
};

export const receivePlaceOrderResponse = (isSuccess) => {
    return {
        type: RECEIVE_PLACE_ORDER_RESPONSE,
        isSuccess
    };
};

export const placeOrder = (payload) => {
    return (dispatch) => {
        dispatch(requestPlaceOrder());
        return apiPlaceOrder(payload, (result) => {
            dispatch(receivePlaceOrderResponse(true));
            dispatch(showSuccess("Đặt hàng thành công"));
        }, (error) => {
            dispatch(receivePlaceOrderResponse(false));
            dispatch(showError(error.toString()));
        });
    };
};
