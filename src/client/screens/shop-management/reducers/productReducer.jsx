import * as actions from "./../actions/product-actions";

const defaultState = {
    criteria: {
        pageNumber: 1,
        pageSize: 25,
        productName: "",
        category: {
            label: "Tất cả",
            value: ""
        },
        atPrice: "",
        priceDirection: 1
    },
    needReload: false,
    products: [],
    addingStatus: false,
    deleteStatus: false
};

const productReducer = (state = defaultState, action) => {

    switch (action.type) {


        case actions.REQUEST_FOR_SHOP_PRODUCTS: return {
            ...state,
            isFetching: true,
            needReload: false,
            criteria: action.criteria
        };

        case actions.RECEIVE_SHOP_PRODUCTS: {

            return {
                ...state,
                isFetching: false,
                totalRecords: action.totalRecords,
                products: action.products
            };
        }

        case actions.REQUEST_ADD_PRODUCT: return {
            ...state,
            isFetching: true
        };
        case actions.RECEIVE_ADDING_RESPONSE: return {
            ...state,
            needReload: true,
            addingStatus: action.addingStatus,
            isFetching: false
        };

        case actions.REQUEST_DELETE_PRODUCT: return {
            ...state,
            isFetching: true
        };

        case actions.RECEIVE_DELETING_RESPONSE: return {
            ...state,
            isFetching: false,
            needReload: true,
            deleteStatus: action.deleteStatus
        };

        case actions.REQUEST_UPDATE_PRODUCT: return {
            ...state,
            isFetching: true
        };

        case actions.RECEIVE_UPDATING_RESPONSE: return {
            ...state,
            isFetching: false,
            needReload: true,
            updateStatus: action.updateStatus
        };
        default: return { ...state };
    }
};

export default productReducer;
