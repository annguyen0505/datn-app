import { apiGetShopProducts } from "./../../../apis/shops-management";
import { showSuccess, showError } from "./../../root-component/actions/notification";
export const REQUEST_FOR_SHOP_PRODUCTS = "REQUEST_FOR_SHOP_PRODUCTS";
export const RECEIVE_SHOP_PRODUCTS = "RECEIVE_SHOP_PRODUCTS";

export const requestForShopProducts = (criteria) => {
    return {
        type: REQUEST_FOR_SHOP_PRODUCTS,
        criteria
    };

};

export const receiveShopProducts = (products, totalRecords) => {
    return {
        type: RECEIVE_SHOP_PRODUCTS,
        products,
        totalRecords
    };
};

export const getShopProducts = (criteria) => {
    return (dispatch) => {
        dispatch(requestForShopProducts(criteria));
        return apiGetShopProducts(criteria,
            (result) => {
                const { products, totalRecords } = result.data;
                dispatch(receiveShopProducts(products, totalRecords));
            },
            (error) => {
                dispatch(showError(error.toString()));
            });
    };
};




