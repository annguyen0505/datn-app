import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getShopView } from "./../actions";
class ShopProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { dispatch, shopId } = this.props;
        dispatch(getShopView(shopId));
    }

    render() {
        const { shop } = this.props;
        return (
            <div className="row">
                <div className="col-sm-4">
                    <img
                        src={shop.imgUrl}
                        className="shop-cover-photo"
                        alt="..." />
                </div>
                <div className="col-sm-8">
                    <h3>Cửa hàng: {shop.shopName}</h3>
                    <div className="col-sm-6">
                        <h4>Địa chỉ: {shop.shopAddress}</h4>
                        <h4>Cung cấp: {shop.categories}</h4>
                    </div>
                    <div className="col-sm-6">
                        <h4>Ngày mở: {shop.dateOpen}</h4>
                        <h4>Khu vực giao dịch: {shop.businessLocations}</h4>
                    </div>
                    <h4>Mô tả: {shop.description}</h4>
                </div>
            </div>
        );
    }

}

ShopProfile.propTypes = {
    dispatch: PropTypes.func,
    searchCriteria: PropTypes.object,
    shopId: PropTypes.string,
    shop: PropTypes.object,
    products: PropTypes.array
};

const mapStateToProps = (state) => {
    const { shopViewReducer } = state;
    const { shop } = shopViewReducer;
    return {
        shop
    };
};


export default connect(mapStateToProps)(ShopProfile);
