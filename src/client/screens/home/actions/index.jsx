import { apiGetShops, apiGetCategories } from "./../../../apis/shops-management";

export const REQUEST_FOR_SHOPS = "REQUEST_FOR_SHOPS";
export const RECEIVE_SHOPS = "RECEIVE_SHOPS";
export const REQUEST_FOR_CATEGORIES = "REQUEST_FOR_CATEGORIES";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const requestForShops = () => {
    return {
        type: REQUEST_FOR_SHOPS
    };
};

export const receiveShops = (shops, totalRecords) => {
    return {
        type: RECEIVE_SHOPS,
        shops,
        totalRecords
    };
};

export const getShops = (params) => {
    return (dispatch) => {
        dispatch(requestForShops());
        return apiGetShops(params, (result) => {
            const { shops, totalRecords } = result.data;
            dispatch(receiveShops(shops, totalRecords));
        }, (error) => {
            console.log(error);
        });
    };
};

export const requestForCategories = () => {
    return {
        type: REQUEST_FOR_CATEGORIES
    };
};

export const receiveCategories = (categories) => {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    };
};

export const getCategories = () => {
    return (dispatch) => {
        dispatch(requestForCategories());
        return apiGetCategories((result) => {
            const { categories } = result.data;
            dispatch(receiveCategories(categories));
        }, (error) => {
            console.log(error);
        });
    };

};

export const getInitialState = (seachCriteria) => {
    return (dispatch) => {
        dispatch(getShops(seachCriteria)).then(() => {
            dispatch(getCategories());
        });
    };
};
