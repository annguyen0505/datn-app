import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

class ProductsManagement extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }

    render() {
        return (
            <div className="row">
                <h2>Products Management</h2>
            </div>
        );
    }

}

ProductsManagement.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    return {

    };
};


export default connect(mapStateToProps)(ProductsManagement);
