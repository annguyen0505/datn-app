import * as actions from "./../action/index";

const defaultState = {
    isSuccess: false,
    isFetching: false
};

const cartManagementReducer = (state = defaultState, action) => {

    switch (action.type) {
        case actions.REQUEST_PLACE_ORDER: return {
            ...state,
            isFetching: true
        };
        case actions.RECEIVE_PLACE_ORDER_RESPONSE: return {
            ...state,
            isSuccess: action.isSuccess,
            isFetching: false
        };
        case actions.RESET_CART: return {
            ...defaultState
        };
        default: return { ...state };
    }
};

export default cartManagementReducer;
