import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { placeOrder } from "./../action";
const Modal = require("react-bootstrap-modal");

const { Header, Body, Footer } = Modal;

class PlaceOrderModal extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            customerName: {
                value: ""
            },
            customerAddress: {
                value: ""
            },
            customerPhone: {
                value: ""
            },
            customerEmail: {
                value: ""
            }
        };
        this.state = { ...this.defaultState };
    }

    handleInputChange(e) {
        const property = e.target.name;
        const value = e.target.value;

        this.setState({
            [property]: {
                value
            }
        });

    }

    handlePlaceOrder() {
        const { dispatch, cart } = this.props;
        const { customerName, customerAddress, customerPhone, customerEmail } = this.state;
        const payload = {
            customerName: customerName.value,
            customerAddress: customerAddress.value,
            customerPhone: customerPhone.value,
            customerEmail: customerEmail.value,
            cart
        };

        dispatch(placeOrder(payload));
    }

    handleClodeModal() {
        this.props.handleToggleModal();
    }

    render() {
        const { isOpenPlaceOrderModal } = this.props;
        const { customerName, customerEmail, customerAddress, customerPhone } = this.state;
        return (
            <div className="col-xs-6" >
                <Modal
                    show={isOpenPlaceOrderModal}
                    aria-labelledby="ModalHeader"
                    onHide={this.handleClodeModal.bind(this)}
                    lg={true}
                >   <Header closeButton>
                        <h4 className="text-info">
                            Đặt hàng
                        </h4>
                    </Header>
                    <Body>
                        <div className="container">
                            <div className="col-xs-12">
                                <label htmlFor="customerName" >Họ và tên</label>
                                <input id="customerName"
                                    name="customerName"
                                    className="form-control"
                                    onChange={(e) => { this.handleInputChange(e); }}
                                    value={customerName.value}
                                />
                                <span className="text-danger"></span>
                            </div>
                            <div className="col-xs-12">
                                <label htmlFor="customerAddress" >Địa chỉ</label>
                                <input id="customerAddress"
                                    onChange={(e) => { this.handleInputChange(e); }}

                                    name="customerAddress"
                                    value={customerAddress.value}
                                    className="form-control" />
                                <span className="text-danger"></span>
                            </div>
                            <div className="col-xs-12">
                                <label htmlFor="customerPhone" >Số điện thoại</label>
                                <input id="customerPhone"
                                    name="customerPhone"
                                    onChange={(e) => { this.handleInputChange(e); }}

                                    value={customerPhone.value}
                                    className="form-control" />
                                <span className="text-danger"></span>
                            </div>
                            <div className="col-xs-12">
                                <label htmlFor="customerEmail" >Email</label>
                                <input id="customerEmail"
                                    name="customerEmail"
                                    onChange={(e) => { this.handleInputChange(e); }}
                                    value={customerEmail.value}
                                    className="form-control" />
                                <span className="text-danger"></span>
                            </div>
                        </div>

                    </Body>
                    <Footer>
                        <div className="center-block">
                            <button className="btn btn-success"
                                style={{ width: "100px" }}
                                onClick={() => { this.handlePlaceOrder(); }}
                            >
                                Đặt Hàng
                          </button>
                            <button
                                onClick={this.handleClodeModal.bind(this)}
                                className="btn btn-default"
                                style={{ width: "100px" }}>
                                Hủy
                        </button>
                        </div>

                    </Footer>
                </Modal>
            </div>
        );
    }
}

PlaceOrderModal.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {

    return {

    };
};


export default connect(mapStateToProps)(PlaceOrderModal);
