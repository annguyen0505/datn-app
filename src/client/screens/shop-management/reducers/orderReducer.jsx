import * as actions from "./../actions/order-action";

const defaultState = {
    criteria: {
        pageNumber: 1,
        pageSize: 25,
        searchName: "",
        shopId: ""
    },
    needReload: false,
    orders: [],
    totalRecords: 0,
    newOrders: 0
};

const orderReducer = (state = defaultState, action) => {

    switch (action.type) {
        case actions.REQUEST_FOR_ORDERS: return {
            ...state,
            isFetching: true,
            needReload: false,
            criteria: action.criteria
        };

        case actions.RECEIVE_ORDERS: return {
            ...state,
            isFetching: false,
            orders: action.orders,
            totalRecords: action.totalRecords
        };

        case actions.REQUEST_CHANGE_CONFIRMATION: return {
            ...state,
            isFetching: true

        };
        case actions.RECEIVE_CHANGE_RESPONSE: return {
            ...state,
            isFetching: false,
            needReload: true,
            isChangeSuccess: action.isChangeSuccess
        };
        case actions.REQUEST_DELETE_ORDER: return {
            ...state,
            isFetching: true

        };
        case actions.RECEIVE_DELETE_RESPONSE: return {
            ...state,
            isFetching: false,
            needReload: true,
            isDeleteSuccess: action.isDeleteSuccess
        };
        case actions.REQUEST_GET_NEW_ORDERS: return {
            ...state,
            isFetching: true
        };

        case actions.RECEIVE_NEW_ORDERS_COUNT: return {
            ...state,
            isFetching: false,
            newOrders: action.newOrders
        };

        default: return { ...state };
    }
};

export default orderReducer;
