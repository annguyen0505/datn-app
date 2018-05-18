import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts, increaseCartItem, decreaseCartItem, updateCartItem, removeItem } from "./../../../helpers/cookie-helper";
import { apiGetCartInfo } from "./../../../apis/cart-management";
import { toVNDformat } from "./../../../helpers/common-helper";
import PlaceOrderModal from "./../components/place-order-modal";

class CartManagement extends React.Component {
    constructor(props) {
        super(props);
        this.selectedCart = null;
        this.state = {
            carts: [],
            isOpenPlaceOrderModal: false
        };
    }
    componentDidMount() {
        const productsList = getProducts();
        apiGetCartInfo({ products: productsList },
            (result) => {
                const { carts } = result.data;
                this.setState({
                    carts
                });
            });
    }

    componentWillReceiveProps(nextProps) {
        const { isSuccess } = nextProps;
        if (isSuccess && this.selectedCart !== null) {
            const { products } = this.selectedCart;
            products.forEach((pdt) => {
                removeItem(pdt.productId);
            });
            const { carts } = this.state;
            const newCarts = carts.filter((cart) => {
                return cart.shopId !== this.selectedCart.shopId;
            });

            this.setState({
                carts: newCarts,
                isOpenPlaceOrderModal: false
            });

            this.selectedCart = null;

        }
    }

    handleQuantityChange(cartIndex, productIndex, e) {
        const { carts } = this.state;
        const value = e.target.value;
        updateCartItem({
            productId: carts[cartIndex].products[productIndex].productId,
            quantity: parseInt(value) || 0
        });
        carts[cartIndex].products[productIndex].quantity = parseInt(value) || 0;
        this.setState({ carts });
    }

    handleQuantityKeyDown(e) {

        const key = e.key;

        if (isNaN(parseInt(key)) && key !== "Backspace" && key !== "Delete") {
            e.preventDefault();
        } else {
            console.log("number");
        }

    }

    handleInCreaseItem(cartIndex, productIndex, e) {
        const { carts } = this.state;
        carts[cartIndex].products[productIndex].quantity += 1;
        increaseCartItem(carts[cartIndex].products[productIndex].productId);
        this.setState({
            carts
        });

    }

    handleDecreaseItem(cartIndex, productIndex, e) {
        const { carts } = this.state;
        decreaseCartItem(carts[cartIndex].products[productIndex].productId);
        carts[cartIndex].products[productIndex].quantity -= 1;
        this.setState({
            carts
        });
    }
    handleRemoveCartItem(cartIndex, pdtIndex, productId) {
        removeItem(productId);
        const { carts } = this.state;
        const { products } = carts[cartIndex];
        const newProducts = products.filter((pdt) => {
            return pdt.productId !== productId;
        });


        carts[cartIndex].products = newProducts;
        if (newProducts.length == 0) {
            const newCarts = carts.filter((cart) => {
                return cart.shopId !== carts[cartIndex].shopId;
            });

            this.setState({
                carts: newCarts
            });

        } else {
            this.setState({
                carts
            });
        }

    }

    handlePlaceOrder(cartIndex, e) {
        const { carts } = this.state;
        this.selectedCart = carts[cartIndex];
        this.handleToggleModal();
        // const payload = {
        //     cart: carts[cartIndex]
        // };
    }

    getOrderTotalCost(cartIndex) {
        const { carts } = this.state;
        const { products } = carts[cartIndex];
        let total = 0;
        products.forEach((pdt) => {
            total += pdt.quantity * pdt.price;
        });
        return toVNDformat(total);
    }
    //place oerder handler
    handleToggleModal() {
        const { isOpenPlaceOrderModal } = this.state;
        this.setState({
            isOpenPlaceOrderModal: !isOpenPlaceOrderModal
        });
    }

    /////////
    render() {

        const { carts, isOpenPlaceOrderModal } = this.state;


        const renderCarts = () => {
            return carts.map((cart, cartIndex) => {
                const { products } = cart;
                const renderProducts = (products) => {

                    return products.map((pdt, pdtIndex) => {
                        const { productId, productName, price, categoryId, categoryName, imgUrl, quantity } = pdt;
                        return (
                            <tr key={productId}>
                                <td><img src={imgUrl} alt="" height="60" /></td>
                                <td>{productName}</td>
                                <td>{toVNDformat(price)}<sup><u>đ</u></sup></td>
                                <td className="align-middle">
                                    <span
                                        onClick={e => { this.handleDecreaseItem(cartIndex, pdtIndex, e); }}
                                        className="glyphicon glyphicon-minus edit-icon" />
                                    <input type="text"
                                        onChange={(e) => {
                                            this.handleQuantityChange(cartIndex, pdtIndex, e);
                                        }}
                                        onKeyDown={(e) => {
                                            this.handleQuantityKeyDown(e);
                                        }}
                                        style={{ width: "40px" }}
                                        value={quantity}
                                    />
                                    <span
                                        onClick={e => { this.handleInCreaseItem(cartIndex, pdtIndex, e); }}
                                        className="glyphicon glyphicon-plus edit-icon" />
                                </td>
                                <td className="x align-middle" >
                                    <button onClick={e => { this.handleRemoveCartItem(cartIndex, pdtIndex, productId, e); }} type="button" className="btn btn-danger btn-sm">
                                        <span className="glyphicon glyphicon-remove" />
                                    </button>
                                </td>
                            </tr>
                        );
                    });

                };
                
                return (
                    <div key={cartIndex}>
                        <div className="col-12">
                            <h3 style={{ marginBottom: ".5em" }}>{cart.shopName}</h3>
                        </div>
                        <div className="col-12">
                            <table className="table table-bordered table-hover text-center">
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderProducts(products)}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={2} style={{ fontWeight: "bold" }}>Tổng tiền</td>
                                        <td colSpan={2}><b>{this.getOrderTotalCost(cartIndex)}<sup><u>đ</u></sup></b></td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="float-right" style={{ paddingRight: "5.5%" }}>
                                <a href="#"
                                    style={{ width: "100px", marginRight: "5px" }}
                                    onClick={(e) => { this.handlePlaceOrder(cartIndex, e); }}
                                    className="btn btn-success">Đặt hàng</a>
                                <a href="#" style={{ width: "100px" }} className="btn btn-danger">Hủy bỏ</a>
                            </div>
                        </div>
                    </div>
                );
            });
        };


        return (
            <div className="container">
                <h2 style={{ marginBottom: ".5em", marginTop: ".1em" }}>Giỏ hàng</h2>

                {renderCarts()}
                {isOpenPlaceOrderModal ?
                    <PlaceOrderModal
                        isOpenPlaceOrderModal={isOpenPlaceOrderModal}
                        handleToggleModal={this.handleToggleModal.bind(this)}
                        cart={this.selectedCart}
                    />
                    : null
                }
            </div >
        );
    }

}

CartManagement.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    const { cartManagementReducer } = state;
    const { isSuccess } = cartManagementReducer;
    return {
        isSuccess
    };
};


export default connect(mapStateToProps)(CartManagement);
