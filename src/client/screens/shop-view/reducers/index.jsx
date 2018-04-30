import * as actions from "./../actions/index";

const defaultState = {
    shop: {
        shopName: "",
        shopAddress: "",
        description: "",
        businessLocations: "",
        dateOpen: "",
        categories: "",
        imgUrl: ""
    },
    searchCriteria: {

    },
    categories: [],
    products: []
};

const shopViewReducer = (state = defaultState, action) => {

    switch (action.type) {
        case actions.REQUEST_FOR_SHOPVIEW: return {
            ...state,
            isFetching: true
        };
        case actions.RECEIVE_SHOPVIEW: return {
            ...state,
            isFetching: false,
            shop: action.shop
        };
        case actions.REQUEST_FOR_SHOPCATEGORIES: return {
            ...state,
            isFetching: true
        };
        case actions.RECEIVE_SHOP_CATEGORIES: return {
            ...state,
            isFetching: false,
            categories: action.categories
        };

        default: return { ...state };
    }
};

export default shopViewReducer;
