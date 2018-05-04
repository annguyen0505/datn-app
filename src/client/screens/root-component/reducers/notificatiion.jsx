import { SHOW_SUCCESS, SHOW_ERROR, SHOW_INFO, SHOW_WARNING, SHOW_WARNING_CONFIRM } from "../actions/notification";
const uuidv1 = require("uuid/v1");

export default function notificationReducers(state = {
    message: "",
    level: "",
    title: ""
}, action) {
    switch (action.type) {
        case SHOW_SUCCESS:
            return {
                title: action.title,
                message: action.message,
                isBlocking: action.isBlocking,
                callback: action.callback,
                level: "success",
                uid: `success-${uuidv1()}`
            };
        case SHOW_ERROR:
            return {
                title: action.title,
                message: action.message,
                isBlocking: action.isBlocking,
                callback: action.callback,
                level: "error",
                uid: `error-${uuidv1()}`
            };
        case SHOW_INFO:
            return {
                title: action.title,
                message: action.message,
                isBlocking: action.isBlocking,
                callback: action.callback,
                level: "info",
                uid: `info-${uuidv1()}`
            };
        case SHOW_WARNING:
            return {
                title: action.title,
                message: action.message,
                isBlocking: action.isBlocking,
                callback: action.callback,
                level: "warning",
                uid: `warning-${uuidv1()}`
            };
        case SHOW_WARNING_CONFIRM:
            return {
                title: action.title,
                message: action.children,
                isBlocking: action.isBlocking,
                level: "warning",
                uid: `warning-confirm-${uuidv1()}`,
                type: "confirm"
            };
        default:
            return state;
    }
}
