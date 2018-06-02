import * as actions from "./../actions/index";

export const defaultState = {
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
        priceDirection: 1
    },
    needReload: false,
    hasMoreItems: true,
    categories: [],
    products: [],
    shopProvinces: []
};
/*eslint-disable */

const shopViewReducer = (state = { ...defaultState }, action) => {

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

        case actions.REQUEST_FOR_SHOPPROVINCES: return {
            ...state,
            isFetching: true
        };
        case actions.RECEIVE_SHOP_SHOPPROVINCES: return {
            ...state,
            isFetching: false,
            shopProvinces: action.shopProvinces
        };
        case actions.REQUEST_FOR_SHOP_PRODUCTS: return {
            ...state,
            isFetching: true,
            needReload: false
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
        case actions.LOAD_MORE: {
            const { criteria } = state;
            return {
                ...state,
                criteria: {
                    ...criteria,
                    pageNumber: action.pageNumber
                },
                needReload: true,
                hasMoreItems: false
            };
        }
        case actions.SEARCH_SHOP_PRODUCTS:
            {
                return {
                    ...state,
                    criteria: action.criteria,
                    products: [],
                    needReload: true,
                    hasMoreItems: true,
                    resetPage: true
                };
            }
        case actions.RESET_SHOPVIEW: {
            return {
                ...defaultState
            };
        }
        default: return state;
    }
};

export default shopViewReducer;
