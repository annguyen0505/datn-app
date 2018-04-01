import React, { Component } from "react";
import ProTypes from "prop-types";
import Nav from "../components/Nav";


class MasterPage extends Component {
    constructor(props) {
        super(props);
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
    children: ProTypes.object
};

export default MasterPage;
