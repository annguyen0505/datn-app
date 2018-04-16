import * as actions from "./../actions/index";

const defaultState = {
    shops: [],
    totalRecords: 0,
    searchCriteria: {
        searchName: "",
        category: "",
        pageNumber: 1
    },
    categories: []
};

const homeReducer = (state = defaultState, action) => {

    switch (action.type) {
        case actions.REQUEST_FOR_SHOPS:
            return {
                ...state,
                isFetching: true
            };
        case actions.RECEIVE_SHOPS:
            {
                const { shops, totalRecords } = action;
                return {
                    ...state,
                    isFetching: false,
                    shops,
                    totalRecords
                };
            }

        case actions.REQUEST_FOR_CATEGORIES:
            return {
                ...state,
                isFetching: true
            };
        case actions.RECEIVE_CATEGORIES:
            return {
                ...state,
                isFetching: false,
                categories: action.categories
            };
        default: return { ...state };
    }
};

export default homeReducer;
