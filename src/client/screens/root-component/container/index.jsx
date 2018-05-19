import React, { Component } from "react";
import PropTypes from "prop-types";
import Nav from "../components/Nav";
import { connect } from "react-redux";
import { setUserProfile } from "./../../authencation/actions/index";
import Notification from "./../components/notification";
class MasterPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const localStorage = window.localStorage;
        dispatch(setUserProfile(localStorage));
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    render() {
        const { notificationReducers, isAuthenticated } = this.props;

        return (
            <div>
                <Nav isAuthenticated={isAuthenticated} router={this.props.router} />
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
    const { isAuthenticated } = authenticationReducer;

    return {
        isAuthenticated,
        notificationReducers
    };
};
export default connect(mapStateToProps)(MasterPage);
