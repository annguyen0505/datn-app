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

    handleBtnUpdateInfoClick() {
        const { router } = this.props;
        router.push("/update-shop-info");
    }

    render() {
        const { shopId } = this.props;
        return (
            <div className="col-xs-12" style={{ marginTop: "1em" }}>
                <div className="">
                    {shopId !== null ? <ShopProfile shopId={`${shopId}`} /> : null}
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => { this.handleBtnUpdateInfoClick(); }}
                        className="col-md-2 btn btn-success">
                        Cập nhật thông tin cửa hàng
                    </button>
                </div>
                <br />
                <hr className="color-devider" />
                <br />

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
