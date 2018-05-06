import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

class OrdersManagement extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }

    render() {
        return (
            <div className="row">
                <h2>OrdersManagement</h2>
            </div>
        );
    }

}

OrdersManagement.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    return {

    };
};


export default connect(mapStateToProps)(OrdersManagement);
