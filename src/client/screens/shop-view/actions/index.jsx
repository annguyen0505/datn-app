import { apiGetShopView, apiGetShopCategories } from "./../../../apis/shops-management";


export const REQUEST_FOR_SHOPVIEW = "REQUEST_FOR_SHOPVIEW";
export const RECEIVE_SHOPVIEW = "RECEIVE_SHOPVIEW";
export const REQUEST_FOR_SHOPCATEGORIES = "REQUEST_FOR_SHOPCATEGORIES";
export const RECEIVE_SHOP_CATEGORIES = "RECEIVE_SHOP_CATEGORIES";

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
