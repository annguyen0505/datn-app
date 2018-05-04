import React from "react";

export const SHOW_SUCCESS = "SHOW_SUCCESS";
export const SHOW_WARNING = "SHOW_WARNING";
export const SHOW_ERROR = "SHOW_ERROR";
export const SHOW_INFO = "SHOW_INFO";
export const SHOW_WARNING_CONFIRM = "SHOW_WARNING_CONFIRM";

export const showSuccess = (message, callback, isBlocking) => {
    return {
        type: SHOW_SUCCESS,
        message,
        title: "Success",
        callback,
        isBlocking
    };
};

export const showWarning = (message, callback, isBlocking) => {
    return {
        type: SHOW_WARNING,
        message,
        title: "Warning",
        callback,
        isBlocking
    };
};

export const showError = (message, callback, isBlocking) => {
    return {
        type: SHOW_ERROR,
        message,
        title: "Error",
        callback,
        isBlocking
    };
};

export const showInfo = (message, callback, isBlocking) => {
    return {
        type: SHOW_INFO,
        message,
        title: "Information",
        callback,
        isBlocking
    };
};

/*eslint-disable */
export const showWarningConfirmation = (message, callbackYes, callbackNo, cancelOptionStr = "", callbackCancel = () => { }, isBlocking = false) => {
    const children = (
        <div className="container">
            <div className="row">
                <h4><strong>{message}</strong></h4>
                <div className="clearfix" />
                <button className="btn" onClick={() => callbackYes()}>Yes</button>
                <button className="btn" onClick={() => callbackNo()}>No</button>
                <button className={cancelOptionStr === "" ? "hidden" : "btn"} onClick={() => callbackCancel()}>{cancelOptionStr}</button>
            </div>
        </div>
    );

    return {
        type: SHOW_WARNING_CONFIRM,
        children,
        title: "Confirmation",
        level: "warning",
        isBlocking
    };
};
