import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ShopProfile from "./../../shop-view/components/shop-profile";
import ProductGridView from "./../components/product-gridview";
import ProductFilter from "./../components/products-filter";
class ProductsManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const { shopId } = this.props;
        return (
            <div className="col-xs-12">
                <h2>Products Management</h2>
                <div className="">
                    {shopId !== null ? <ShopProfile shopId={`${shopId}`} /> : null}
                </div>
                <hr className="color-devider" />
                <div className="">
                    {shopId !== null ? <ProductFilter shopId={`${shopId}`} /> : null}
                </div>
                <div>
                    {shopId !== null ? <ProductGridView shopId={`${shopId}`} /> : null}
                </div>
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