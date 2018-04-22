import {
    SET_USER_PROFILE,
    REMOVE_USER_PROFILE,
    REQUEST_LOGIN,
    RECEIVE_LOGIN_RESPONSE
} from "./../actions/index";

const defaultState = {
    profile: null,
    isAuthenicated: false
};

const authenticationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE: return {
            ...state,
            profile: action.profile,
            isAuthenicated: !!(action.profile || false)
        };

        case REMOVE_USER_PROFILE: return {
            ...state,
            profile: null
        };
        case REQUEST_LOGIN: return {
            ...state,
            isFetching: true
        };
        case RECEIVE_LOGIN_RESPONSE: return {
            ...state,
            isFetching: false,
            loginStatus: action.loginStatus
        };
        default: return state;
    }
};


export default authenticationReducer;
