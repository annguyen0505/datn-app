import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getShopProducts, loadMore } from "./../actions";
import InfiniteScroll from "react-infinite-scroller";

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
                    <div key={index} className="col-xs-12 col-md-3" >
                        <img src={imgUrl} className="col-xs-12 img-thumbnail" style={{ height: "300px" }} alt="..." />
                        <p>{productName}</p>
                        <p>{price}VND</p>
                        <p>{categoryName}</p>
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
