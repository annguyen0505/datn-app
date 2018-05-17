import { RECEIVE_REGISTER_RESPONSE, REQUEST_REGISTER } from "./../actions";


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
        default: return state;
    }
};

export default registerReducer;
