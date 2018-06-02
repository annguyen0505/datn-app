import React, { Component } from "react";
import PropTypes from "prop-types";
import Nav from "../components/Nav";
import { connect } from "react-redux";
import { setUserProfile } from "./../../authencation/actions/index";
import Notification from "./../components/notification";
import { socket } from "./../../../socket/socket";
import { showInfo } from "./../actions/notification";
import { getNewOrders } from "./../../shop-management/actions/order-action";
import { getAccessToken } from "./../../../helpers/cookie-helper";
import { getLocalUserProfile } from "./../../../helpers/jwt-helper";

class MasterPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        const localStorage = window.localStorage;
        const accessToken = getAccessToken(localStorage) || null;
        const profile = accessToken === null ? null : getLocalUserProfile(accessToken);
        if (profile !== null) {
            socket.on("connect", () => {
                this.socketId = socket.id;
                socket.emit("login", profile.shopId);
            });
            socket.on("new-order", () => {
                dispatch(showInfo("Bạn vừa nhận được đơn hàng mới"));
                dispatch(getNewOrders(profile.shopId));
            });
        }
        dispatch(setUserProfile(localStorage));

    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        // const { dispatch } = nextProps;
        // if (nextProps.profile !== null) {
        // }
    }


    render() {
        const { notificationReducers, isAuthenticated } = this.props;

        return (
            <div>
                <Nav isAuthenticated={isAuthenticated} router={this.props.router} dispatch={this.props.dispatch.bind(this)} />
                <Notification notification={notificationReducers} />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

MasterPage.propTypes = {
    children: PropTypes.object,
    dispatch: PropTypes.func,
    notificationReducers: PropTypes.object

};

const mapStateToProps = (state) => {
    const { authenticationReducer, notificationReducers } = state;
    const { isAuthenticated, profile } = authenticationReducer;

    return {
        isAuthenticated,
        notificationReducers,
        profile
    };
};
export default connect(mapStateToProps)(MasterPage);
