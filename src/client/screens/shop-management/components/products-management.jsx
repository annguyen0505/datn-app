import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ShopProfile from "./../../shop-view/components/shop-profile";
class ProductsManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const { shopId } = this.props;
        return (
            <div className="row">
                <h2>Products Management</h2>
                {shopId !== null ? <ShopProfile shopId={shopId} /> : null}
            </div>
        );
    }

}

ProductsManagement.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    const { authenticationReducer } = state;
    const { profile } = authenticationReducer;
    const userId = profile === null ? null : profile.userId;
    return {
        userId
    };
};

export default connect(mapStateToProps)(ProductsManagement);
