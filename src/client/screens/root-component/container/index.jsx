import React, { Component } from "react";
import PropTypes from "prop-types";
import Nav from "../components/Nav";
import { connect } from "react-redux";
import { setUserProfile } from "./../../authencation/actions/index";
import { getLocalUserProfile } from "./../../../helpers/jwt-helper";

class MasterPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const localStorage = window.localStorage;
        dispatch(setUserProfile(localStorage));
    }

    render() {
        return (
            <div>
                <Nav />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

MasterPage.propTypes = {
    children: PropTypes.object
};

export default connect()(MasterPage);
