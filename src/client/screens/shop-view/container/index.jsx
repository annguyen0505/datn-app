import React from "react";
import ShopProfile from "./../components/shop-profile";
import ProductFilter from "./../components/product-filter";
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
            </div>
        );
    }

}


export default ShopView;
