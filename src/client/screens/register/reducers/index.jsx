import { RECEIVE_REGISTER_RESPONSE, REQUEST_REGISTER, RESET_REGISTER_STORE } from "./../actions";


const defaultState = {
    isFetching: false,
    isSuccess: false
};
const registerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_REGISTER: return {
            ...state,
            isFetching: true
        };

        case RECEIVE_REGISTER_RESPONSE: return {
            ...state,
            isFetching: false,
            isSuccess: action.isSuccess
        };

        case RESET_REGISTER_STORE: return {
            ...defaultState
        };
        default: return state;
    }
};

export default registerReducer;
