import React from "react";
import ShopProfile from "./../components/shop-profile";
import ProductFilter from "./../components/product-filter";
import ProductList from "./../components/product-list";
import { getCategories } from "./../../home/actions/index";
import { connect } from "react-redux";

class ShopView extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(getCategories());
    }

    render() {
        const { shopId } = this.props.params;
        return (
            <div className="col-xs-12">
                <ShopProfile shopId={shopId} />
                <hr />
                <ProductFilter shopId={shopId} />
                <ProductList shopId={shopId} />
            </div>
        );
    }

}


export default connect()(ShopView);
