import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { apiGetOrderDetail } from "./../../../apis/order-management-api";
import { toVNDformat } from "./../../../helpers/common-helper";

const Modal = require("react-bootstrap-modal");

const { Header, Body } = Modal;

class OrderDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            products: []
        };
        this.state = {
            ...this.defaultState
        };
    }

    componentDidMount() {

        const { orderId } = this.props;
        apiGetOrderDetail({ orderId }, (result) => {
            const { products } = result.data;
            this.setState({
                products
            });
        });
    }
    handleClodeModal() {
        this.props.handleToggleModal();
    }


    getOrderTotalCost() {
        const { products } = this.state;
        let total = 0;
        products.forEach((pdt) => {
            total += pdt.quantity * pdt.price;
        });
        return toVNDformat(total);
    }

    render() {
        const { isOpenDetailModal } = this.props;
        const { products } = this.state;
        const renderProducts = () => {

            return products.map((pdt, pdtIndex) => {
                const { productId, productName, price, categoryName, imgUrl, quantity } = pdt;
                return (
                    <tr key={productId}>
                        <td><img src={imgUrl} alt="" height="60" /></td>
                        <td>{productName}</td>
                        <td>{toVNDformat(price)}<sup><u>đ</u></sup></td>
                        <td>{quantity}</td>
                    </tr>
                );
            });

        };


        return (
            <div className="col-xs-6" >
                <Modal
                    show={isOpenDetailModal}
                    aria-labelledby="ModalHeader"
                    onHide={this.handleClodeModal.bind(this)}
                    lg={true}
                >   <Header closeButton>
                        <h4 className="text-info">
                            Order detail
                        </h4>
                    </Header>
                    <Body>
                        <div className="">

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
                                        {renderProducts()}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={2} style={{ fontWeight: "bold" }}>Tổng tiền</td>
                                            <td colSpan={2}><b>{this.getOrderTotalCost()}<sup><u>đ</u></sup></b></td>
                                        </tr>
                                    </tfoot>
                                </table>

                            </div>
                        </div>
                    </Body>
                </Modal>
            </div>
        );
    }
}

OrderDetailModal.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    const { shopViewReducer } = state;
    const { categories } = shopViewReducer;
    return {
        categories
    };
};


export default connect(mapStateToProps)(OrderDetailModal);
