import { apiGetShopView, apiGetShopCategories, apiGetShopProducts, apiGetShopProvinces } from "./../../../apis/shops-management";

export const REQUEST_FOR_SHOPVIEW = "REQUEST_FOR_SHOPVIEW";
export const RECEIVE_SHOPVIEW = "RECEIVE_SHOPVIEW";
export const REQUEST_FOR_SHOPCATEGORIES = "REQUEST_FOR_SHOPCATEGORIES";
export const RECEIVE_SHOP_CATEGORIES = "RECEIVE_SHOP_CATEGORIES";

export const REQUEST_FOR_SHOPPROVINCES = "REQUEST_FOR_SHOPPROVINCES";
export const RECEIVE_SHOP_SHOPPROVINCES = "RECEIVE_SHOP_SHOPPROVINCES";

export const REQUEST_FOR_SHOP_PRODUCTS = "REQUEST_FOR_SHOP_PRODUCTS";
export const RECEIVE_SHOP_PRODUCTS = "RECEIVE_SHOP_PRODUCTS";
export const SEARCH_SHOP_PRODUCTS = "SEARCH_SHOP_PRODUCTS";
export const LOAD_MORE = "LOAD_MORE";
export const RESET_SHOPVIEW = "RESET_SHOPVIEW";

export const resetShopView = () => {
    return {
        type: RESET_SHOPVIEW
    };
};
export const requestForShopView = () => {
    return {
        type: REQUEST_FOR_SHOPVIEW
    };

};

export const receiveShopView = (shop) => {
    return {
        type: RECEIVE_SHOPVIEW,
        shop
    };
};


export const requestForShopCategories = () => {
    return {
        type: REQUEST_FOR_SHOPCATEGORIES
    };

};

export const receiveShopCategories = (categories) => {
    return {
        type: RECEIVE_SHOP_CATEGORIES,
        categories
    };
};

export const requestForShopProvinces = () => {
    return {
        type: REQUEST_FOR_SHOPPROVINCES
    };

};

export const receiveShopprovinces = (shopProvinces) => {
    return {
        type: RECEIVE_SHOP_SHOPPROVINCES,
        shopProvinces
    };
};


export const requestForShopProducts = () => {
    return {
        type: REQUEST_FOR_SHOP_PRODUCTS
    };

};

export const receiveShopProducts = (products, totalRecords, hasMoreItems) => {
    return {
        type: RECEIVE_SHOP_PRODUCTS,
        products,
        totalRecords,
        hasMoreItems
    };
};

export const loadMore = (nextPage) => {
    return {
        type: LOAD_MORE,
        pageNumber: nextPage
    };
};


export const getShopView = (shopId) => {
    return (dispatch) => {
        dispatch(requestForShopView());
        return apiGetShopView({ shopId },
            (result) => {
                const { shop } = result.data;
                dispatch(receiveShopView(shop));
            },
            (error) => {
                console.log(error);
            });
    };
};

export const getShopCategories = (shopId) => {
    return (dispatch) => {
        dispatch(requestForShopCategories());
        return apiGetShopCategories({ shopId },
            (result) => {
                const { categories } = result.data;
                dispatch(receiveShopCategories(categories));
            },
            (error) => {
                console.log(error);
            });
    };
};

export const getShopProvinces = (shopId) => {
    return (dispatch) => {
        dispatch(requestForShopProvinces());
        return apiGetShopProvinces({ shopId },
            (result) => {
                const { shopProvinces } = result.data;
                dispatch(receiveShopprovinces(shopProvinces));
            },
            (error) => {
                console.log(error);
            });
    };
};


export const getShopProducts = (criteria) => {
    return (dispatch) => {
        dispatch(requestForShopProducts());
        return apiGetShopProducts(criteria,
            (result) => {
                const { pageSize } = criteria;
                const { products, totalRecords } = result.data;
                const hasMoreItems = Math.round(totalRecords / pageSize) + 1 > criteria.pageNumber;
                dispatch(receiveShopProducts(products, totalRecords, hasMoreItems));
            },
            (error) => {
                console.log(error);
            });
    };
};

export const searchProducts = (criteria) => {
    return {
        type: SEARCH_SHOP_PRODUCTS,
        criteria
    };
};


