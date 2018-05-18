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
            <div className="row" style={{ marginBottom: "1rem", backgroundColor: "#f0f8ff" }}>
                <div className="col-sm-4" style={{ marginBottom: "1rem" }}>
                    <img
                        src={shop.imgUrl}
                        className="thumbnail shop-cover-photo"
                        alt="..."
                        style={{ width: "100%", height: "inherit" }} />
                </div>
                <div className="col-sm-8 widget-header-div"
                    style={{ display: "flex", flexWrap: "wrap", margin: "0px", padding: "0px" }}>
                    {/* <div className="col-sm-8  widget-header-item" style={{ marginBottom: "20px", height: "100%" }}> */}
                    <div className="panel panel-primary pmd-z-depth" style={{ width: "95%", display: "block", marginLeft: "auto", marginRight: "auto" }}>
                        <div className="panel-heading"><h4>Cửa hàng: {shop.shopName}</h4></div>
                        <div className="panel-body">
                            <table className="col-sm-12 text-left">
                                <tbody>
                                    <tr>
                                        <td style={{ width: "50%" }}><h4>Địa chỉ: {shop.shopAddress}</h4></td>
                                        <td><h4>Ngày mở: {shop.dateOpen}</h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4>Cung cấp: {shop.categories}</h4></td>
                                        <td><h4>Khu vực giao dịch: {shop.businessLocations}</h4></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><h4>Mô tả: {shop.description}</h4></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* </div> */}
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
