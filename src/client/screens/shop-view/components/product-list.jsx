import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getShopProducts, loadMore, resetShopView } from "./../actions";
import InfiniteScroll from "react-infinite-scroller";
import { getProducts, addCartItem, removeAllCarts } from "./../../../helpers/cookie-helper";
import { showSuccess, showError } from "./../../root-component/actions/notification";
import { toVNDformat } from "./../../../helpers/common-helper";
import ProductDetailModal from "./product-detail-modal";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        const { criteria, shopId } = this.props;
        criteria.shopId = shopId;
        this.selectedProduct = null;
        this.state = {
            isOpenDetailModal: false
        };
    }

    componentDidMount() {
        const { dispatch, criteria } = this.props;
        dispatch(getShopProducts(criteria));
        window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(resetShopView());
        window.removeEventListener("scroll", this.handleScroll.bind(this));
    }

    handleScroll(event) {
        const { hasMoreItems } = this.props;
        if ($(window).scrollTop() + $(window).height() === $(document).height() && hasMoreItems) {
            const { dispatch, criteria } = this.props;
            criteria.pageNumber = ++criteria.pageNumber;
            dispatch(getShopProducts(criteria));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { needReload, dispatch } = nextProps;
        if (needReload) {
            const { criteria } = nextProps;
            dispatch(getShopProducts(criteria));
        }
    }

    toggleDetailModal() {
        const { isOpenDetailModal } = this.state;
        this.setState({
            isOpenDetailModal: !isOpenDetailModal
        });
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
                        className="col-xs-6 col-md-3"
                        style={
                            {
                                height: "auto",
                                maxHeight: "420px",
                                marginBottom: "1em"
                            }} >
                        <div
                            style={
                                {
                                    border: "1px solid #39c13057",
                                    borderRadius: "1em",
                                    borderWidth: "1px",
                                    maxWidth: "inherit",
                                    padding: "1em",
                                    height: "auto",
                                    maxHeight: "420px",
                                    marginBottom: "1em",
                                    overflow: "hidden",
                                    backgroundColor: "#f0f8ff"

                                }}>
                            <div style={{ margin: "auto" }}>
                                <img src={imgUrl} className="col-xs-12 thumbnail"
                                    style={{ maxWidth: "inherit", maxHeight: "200px", height: "200px", margin: "auto" }}
                                    alt="..." />
                            </div>

                            <div style={
                                {
                                    marginTop: "1em",
                                    clear: "both",
                                    // border: "1px solid #33333330",
                                    borderTop: "none",
                                    padding: "1em",
                                    borderRadius: "2px",
                                    fontFamily: "Sans-serif",
                                    margin: "auto"

                                }
                            }>
                                <h3>{productName}</h3>
                                <hr />
                                <p><strong>{toVNDformat(price)}<sup>đ</sup></strong></p>
                                <p>{categoryName}</p>
                                <div className="row"
                                    style={{
                                        margin: "auto"
                                    }}>
                                    <div className="col-xs-6">
                                        <button
                                            style={{
                                                width: "100px"
                                            }}
                                            onClick={(e) => { this.handleAddItem(productId, e); }}
                                            className="btn btn-sm btn-info pull-right">
                                            Thêm <i className="fa fa-shopping-cart"></i>
                                        </button>
                                    </div>
                                    <div className="col-xs-6">
                                        <button style={{
                                            width: "100px"
                                        }}
                                            onClick={(e) => {
                                                this.selectedProduct = productId;
                                                this.toggleDetailModal(e);
                                            }}
                                            className="btn btn-sm btn-info">
                                            Hình ảnh
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                );
            });
        }

        return (<div className="col-xs-12">
                {items}
         
            {this.state.isOpenDetailModal ? <ProductDetailModal
                productId={this.selectedProduct}
                isOpenDetailModal={this.state.isOpenDetailModal}
                onToggleModal={this.toggleDetailModal.bind(this)}
            /> : null}
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
