import { apiGetShops, apiGetCategories, apiProvinces } from "./../../../apis/shops-management";

export const REQUEST_FOR_SHOPS = "REQUEST_FOR_SHOPS";
export const RECEIVE_SHOPS = "RECEIVE_SHOPS";
export const REQUEST_FOR_CATEGORIES = "REQUEST_FOR_CATEGORIES";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const REQUEST_FOR_PROVINCES = "REQUEST_FOR_PROVINCES";
export const RECEIVE_PROVINCES = "REVEIVE_PROVINCES";
export const LOAD_MORE_SHOPS = "LOAD_MORE_SHOPS";

export const requestForShops = (criteria, isSearch) => {
    return {
        type: REQUEST_FOR_SHOPS,
        criteria,
        isSearch
    };
};

export const receiveShops = (shops, hasMoreItems) => {
    return {
        type: RECEIVE_SHOPS,
        shops,
        hasMoreItems
    };
};

export const getShops = (criteria, isSearch = false) => {
    return (dispatch) => {
        dispatch(requestForShops(criteria, isSearch));
        return apiGetShops(criteria, (result) => {
            const { shops, totalRecords } = result.data;
            const hasMoreItems = Math.round(totalRecords / 6) + 1 > criteria.pageNumber;
            dispatch(receiveShops(shops, hasMoreItems));
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

export const requestForProvinces = () => {
    return {
        type: REQUEST_FOR_PROVINCES
    };
};

export const receiveProvinces = (provinces) => {
    return {
        type: RECEIVE_PROVINCES,
        provinces
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

export const getProvinces = () => {
    return (dispatch) => {
        dispatch(requestForProvinces());
        return apiProvinces((result) => {
            const { provinces } = result.data;
            dispatch(receiveProvinces(provinces));
        }, (error) => {
            console.log(error);
        });
    };

};

export const getInitialState = (seachCriteria) => {
    return (dispatch) => {
        dispatch(getProvinces());
        dispatch(getCategories());
        dispatch(getShops(seachCriteria));
    };
};

export const loadMoreShops = (nextPage) => {
    return {
        type: LOAD_MORE_SHOPS,
        pageNumber: nextPage
    };
};
