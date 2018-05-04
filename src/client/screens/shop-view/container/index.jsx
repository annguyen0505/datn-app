import React from "react";
import ShopProfile from "./../components/shop-profile";
import ProductFilter from "./../components/product-filter";
import ProductList from "./../components/product-list";
class ShopView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { shopId } = this.props.params;
        return (
            <div>
                <ShopProfile shopId={shopId} />
                <hr />
                <ProductFilter shopId={shopId} />
                <ProductList shopId={shopId} />
            </div>
        );
    }

}


export default ShopView;
