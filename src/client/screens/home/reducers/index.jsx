import * as actions from "./../actions/index";

const defaultState = {
    shops: [],
    totalRecords: 0,
    criteria: {
        searchName: "",
        category: "",
        pageNumber: 1
    },
    categories: [],
    provinces: [],
    needReload: false,
    hasMoreItems: true
};

const homeReducer = (state = defaultState, action) => {

    switch (action.type) {
        case actions.REQUEST_FOR_SHOPS:
            {
                const shops = action.isSearch ? [] : state.shops;
                return {
                    ...state,
                    isFetching: true,
                    criteria: action.criteria,
                    needReload: false,
                    shops
                };
            }
        case actions.RECEIVE_SHOPS:
            {
                let shops = [...state.shops];
                if (action.shops) {
                    shops = [...shops, ...action.shops];
                }
                return {
                    ...state,
                    isFetching: false,
                    totalRecords: action.totalRecords,
                    shops,
                    hasMoreItems: action.hasMoreItems,
                    resetPage: false
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

        case actions.REQUEST_FOR_PROVINCES:
            return {
                ...state,
                isFetching: true
            };
        case actions.RECEIVE_PROVINCES:
            return {
                ...state,
                isFetching: false,
                provinces: action.provinces
            };

        case actions.LOAD_MORE_SHOPS: {
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

        default: return { ...state };
    }
};

export default homeReducer;
