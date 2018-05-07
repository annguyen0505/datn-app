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
    products: []
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
        default: return { ...state };
    }
};

export default productReducer;
