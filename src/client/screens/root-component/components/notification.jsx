import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationSystem from "react-notification-system";
import {hasStringValue } from "./../../../helpers/common-helper.js";
class Notification extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        const { notification } = nextProps;
        const { message, level, title, uid } = notification;

        return ((hasStringValue(message) || hasStringValue(title)) && hasStringValue(level)) &&
            uid !== this.props.notification.uid;
    }

    componentDidUpdate() {
        const { notificationSystem } = this.refs;
        const { notification } = this.props;
        const { message, level, title, uid, callback, isBlocking, type } = notification;

        const config = {
            title,
            message,
            level,
            position: "tc",
            uid
        };

        // main config
        if (isBlocking) {
            config.onAdd = () => {
                $.blockUI({ message: null });
            };
            config.onRemove = () => {
                $.unblockUI();
            };
        }

        // switch by types
        switch (type) {
            case "confirm":
                config.autoDismiss = 0;
                config.dismissible = true;
                config.children = message;
                config.message = "";
                break;
            default:
                if (level === "error") {
                    // set it can not be auto-dismiss
                    config.autoDismiss = 0;
                    config.dismissible = false;
                    config.action = {
                        label: "OK"
                    };

                    if (callback) {
                        config.action.callback = callback;
                    }
                }
                break;
        }

        notificationSystem.addNotification(config);
    }

    render() {
        const style = {
            NotificationItem: {
                DefaultStyle: {
                    margin: "10px 5px 2px 1px",
                    padding: "20px"
                }
            },
            Containers: {
                DefaultStyle: {
                    width: 350
                }
            }
        };

        return (
            <div>
                <NotificationSystem ref="notificationSystem" style={style} />
            </div >
        );
    }
}

Notification.propTypes = {
    notification: PropTypes.object,
    uid: PropTypes.string
};

export default Notification;
