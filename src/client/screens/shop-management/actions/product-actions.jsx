import { apiGetShopProducts, apiAddPorduct, apiDeleteProduct, apiUpdateProduct } from "./../../../apis/shops-management";
import { showSuccess, showError } from "./../../root-component/actions/notification";
import { deleteImage } from "./../../../helpers/firebase-helper";
export const REQUEST_FOR_SHOP_PRODUCTS = "REQUEST_FOR_SHOP_PRODUCTS";
export const RECEIVE_SHOP_PRODUCTS = "RECEIVE_SHOP_PRODUCTS";
export const REQUEST_ADD_PRODUCT = "REQUEST_ADD_PRODUCT";
export const RECEIVE_ADDING_RESPONSE = "RECEIVE_ADDING_RESPONSE";
export const REQUEST_DELETE_PRODUCT = "REQUEST_DELETE_PRODUCT";
export const RECEIVE_DELETING_RESPONSE = "RECEIVE_DELETING_RESPONSE";
export const REQUEST_UPDATE_PRODUCT = "REQUEST_UPDATE_PRODUCT";
export const RECEIVE_UPDATING_RESPONSE = "RECEIVE_UPDATING_RESPONSE";

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

export const requestAddProduct = () => {
    return {
        type: REQUEST_ADD_PRODUCT
    };
};

export const receiveAddProduct = (addingStatus) => {
    return {
        type: RECEIVE_ADDING_RESPONSE,
        addingStatus
    };
};

export const requestDeleteProduct = () => {
    return {
        type: REQUEST_DELETE_PRODUCT
    };
};
export const receiveDeleteProductResponse = (deleteStatus) => {
    return {
        type: RECEIVE_DELETING_RESPONSE,
        deleteStatus
    };
};

export const requestUpdateProduct = () => {
    return {
        type: REQUEST_UPDATE_PRODUCT
    };
};

export const receiveUpdateResponse = (updateStatus) => {
    return {
        type: RECEIVE_UPDATING_RESPONSE,
        updateStatus
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

export const addProduct = (payload) => {
    return (dispatch) => {
        dispatch(requestAddProduct());
        return apiAddPorduct(payload, (result) => {
            dispatch(receiveAddProduct(true));
            dispatch(showSuccess("Thêm mới thành công"));
        }, (error) => {
            dispatch(showError(error.toString()));
        });
    };

};

export const deleteProduct = (productId) => {
    return (dispatch) => {
        dispatch(requestDeleteProduct());
        return apiDeleteProduct({ productId }, (result) => {
            const { status, imageRefs } = result.data;
            Promise.all(imageRefs.map((imageRef) => { deleteImage(imageRef.storageRef, () => { console.log("delete success") }); }))
                .then(() => {
                    dispatch(receiveDeleteProductResponse(status));
                    dispatch(showSuccess("Xóa thành công"));
                });
        }, (error) => {
            dispatch(showError(error.toString()));
        });
    };
};


export const updateProduct = (payload) => {
    return (dispatch) => {
        dispatch(requestUpdateProduct());
        return apiUpdateProduct(payload, (result) => {
            dispatch(receiveUpdateResponse(true));
            dispatch(showSuccess("Cập nhật thành công"));
        }, (error) => {
            dispatch(showError(error.toString()));
        });
    };

};
