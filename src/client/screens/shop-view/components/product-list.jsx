import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getShopProducts, loadMore } from "./../actions";
import InfiniteScroll from "react-infinite-scroller";
import { getProducts, addCartItem, removeAllCarts } from "./../../../helpers/cookie-helper";
import { showSuccess, showError } from "./../../root-component/actions/notification";
class ProductList extends React.Component {
    constructor(props) {
        super(props);
        const { criteria, shopId } = this.props;
        criteria.shopId = shopId;
    }

    componentWillReceiveProps(nextProps) {
        const { resetPage, needReload, dispatch } = nextProps;

        if (resetPage) {
            this.refs.scroller.pageLoaded = 0;
            window.scrollTo(0, 0);
        }
        if (needReload) {
            const { criteria } = nextProps;
            dispatch(getShopProducts(criteria));
        }
    }

    handleAddItem(productId) {
        const { dispatch } = this.props;
        const item = {
            productId,
            quantity: 1
        };
        try {
            addCartItem(item);
            dispatch(showSuccess("Thêm vào giỏ hàng thành công"));
        } catch (error) {
            dispatch(showSuccess(error.toString()));
            removeAllCarts();

        }

        console.log(getProducts());
    }

    handleLoadMore(page) {

        const { dispatch } = this.props;
        dispatch(loadMore(page));
    }

    render() {
        const { products, totalRecords } = this.props;
        const items = [];
        if (Array.isArray(products)) {
            products.map((product, index) => {
                const { productId, productName, price, categoryName, imgUrl } = product;
                items.push(
                    <div key={index}
                        className="col-xs-12 col-md-3"
                        style={
                            {
                                border: "1px solid black",
                                margin: "auto",
                                padding: "5px 5px"
                            }}
                    >
                        <img src={imgUrl} className="col-xs-12" style={{ height: "300px" }} alt="..." />
                        <div
                        >
                            <p>{productName}</p>
                            <p>{price}VND</p>
                            <p>{categoryName}</p>
                            <button onClick={(e) => { this.handleAddItem(productId, e); }} className="btn btn-sm btn-info center-block">Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                );
            });
        }

        return (<div>
            <InfiniteScroll
                pageStart={0}
                loadMore={this.handleLoadMore.bind(this)}
                hasMore={this.props.hasMoreItems}
                ref="scroller"
            >
                <div className="row">
                    {items}
                </div>
            </InfiniteScroll>
        </div>

        );
    }

}


ProductList.propTypes = {
    dispatch: PropTypes.func,
    products: PropTypes.array,
    criteria: PropTypes.object,
    shopId: PropTypes.string,
    totalRecords: PropTypes.number,
    hasMoreItems: PropTypes.bool,
    resetPage: PropTypes.bool,
    needReload: PropTypes.bool
};
const mapStateToProps = (state) => {
    const { shopViewReducer } = state;
    const { criteria, products, totalRecords, hasMoreItems, resetPage, needReload } = shopViewReducer;
    return {
        criteria,
        products,
        totalRecords,
        hasMoreItems,
        resetPage,
        needReload
    };
};


export default connect(mapStateToProps)(ProductList);
