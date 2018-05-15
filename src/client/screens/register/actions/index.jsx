import { getCategories, getProvinces } from "./../../home/actions/index";

export const getInitialState = () => {
    return (dispatch) => {
        dispatch(getCategories());
        dispatch(getProvinces());
    };
};
