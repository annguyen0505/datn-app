import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getShopProducts } from "./../actions";
import InfiniteScroll from "react-infinite-scroller";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const { resetPage } = nextProps;
        if (resetPage) {
            this.refs.scroller.pageLoaded = 0;
            window.scrollTo(0, 0);
        }

    }

    handleLoadMore(page) {
        console.log("new page", page);
        const { dispatch } = this.props;
        const { criteria, shopId } = this.props;
        const newCriteria = {
            ...criteria,
            shopId,
            pageNumber: page
        };
        dispatch(getShopProducts(newCriteria));
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
                isReverse={true}
                useCapture={true}
                useWindow={true}
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
    totalRecords: PropTypes.number
};
const mapStateToProps = (state) => {
    const { shopViewReducer } = state;
    const { criteria, products, totalRecords, hasMoreItems, resetPage } = shopViewReducer;
    return {
        criteria,
        products,
        totalRecords,
        hasMoreItems,
        resetPage
    };
};


export default connect(mapStateToProps)(ProductList);
