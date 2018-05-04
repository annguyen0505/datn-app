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
    criteria: {
        pageNumber: 1,
        productName: "",
        category: {
            label: "Tất cả",
            value: ""
        },
        atPrice: "",
        priceDirection: ""
    },
    hasMoreItems: true,
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
        case actions.REQUEST_FOR_SHOP_PRODUCTS: return {
            ...state,
            isFetching: true
        };
        case actions.RECEIVE_SHOP_PRODUCTS: {
            let products = [...state.products];
            if (action.products) {
                products = [...products, ...action.products];
            }
            return {
                ...state,
                isFetching: false,
                totalRecords: action.totalRecords,
                products,
                hasMoreItems: action.hasMoreItems,
                resetPage: false
            };
        }

        case actions.SEARCH_SHOP_PRODUCTS:
            return {
                ...state,
                criteria: action.criteria,
                products: [],
                hasMoreItems: true,
                resetPage: true
            };
        default: return { ...state };
    }
};

export default shopViewReducer;
