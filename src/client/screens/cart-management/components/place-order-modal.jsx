import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { placeOrder } from "./../action";
import { isEmptyInput, validateEmail, validatePhoneNumber } from "./../../../helpers/validation-helper";
// import io from "socket.io-client";

import { socket } from "./../../../socket/socket";
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
        // this.socket = io("localhost:3001");

    }

    handleInputChange(e) {
        const property = e.target.name;
        const value = e.target.value;

        this.setState({
            [property]: {
                value,
                isDirty: true
            }
        });

    }


    /*eslint-disable */

    validateInputs(isSubmit = false) {
        const { customerName, customerEmail, customerAddress, customerPhone } = this.state;

        customerName.message = (customerName.isDirty || isSubmit) && isEmptyInput(customerName.value) ? "Nhập họ và tên" : "";
        customerEmail.message = (customerEmail.isDirty || isSubmit) && isEmptyInput(customerEmail.value) ? "Nhập email" : "";
        customerAddress.message = (customerAddress.isDirty || isSubmit) && isEmptyInput(customerAddress.value) ? "Nhập địa chỉ" : "";
        customerPhone.message = (customerPhone.isDirty || isSubmit) && isEmptyInput(customerPhone.value) ? "Nhập số điện thoại" : "";

        if (!isEmptyInput(customerEmail.value)) {
            customerEmail.message = !validateEmail(customerEmail.value) ? "Email không hợp lệ" : "";
        }
        if (!isEmptyInput(customerPhone.value)) {
            customerPhone.message = !validatePhoneNumber(customerPhone.value) ? "Số điện thoại không hợp lệ" : "";
        }

        this.setState({
            customerName,
            customerAddress,
            customerEmail,
            customerPhone
        });
        return customerName.message.length === 0 && customerEmail.message.length === 0 && customerAddress.message.length === 0 && customerPhone.message.length === 0;
    }
    /*eslint-enable */
    handlePlaceOrder() {
        if (this.validateInputs(true)) {
            const { dispatch, cart } = this.props;
            const { customerName, customerAddress, customerPhone, customerEmail } = this.state;
            const payload = {
                customerName: customerName.value,
                customerAddress: customerAddress.value,
                customerPhone: customerPhone.value,
                customerEmail: customerEmail.value,
                cart
            };
            dispatch(placeOrder(payload)).then(() => {
                console.log("new -order", cart.shopId);
                socket.emit("order", cart.shopId);
            });
            this.handleClodeModal();
        }
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
                                    onBlur={(e => { this.validateInputs(); })}
                                    value={customerName.value}
                                />
                                <span className="text-danger">{customerName.message}</span>
                            </div>
                            <div className="col-xs-12">
                                <label htmlFor="customerAddress" >Địa chỉ</label>
                                <input id="customerAddress"
                                    onChange={(e) => { this.handleInputChange(e); }}
                                    onBlur={(e => { this.validateInputs(); })}

                                    name="customerAddress"
                                    value={customerAddress.value}
                                    className="form-control" />
                                <span className="text-danger">{customerAddress.message}</span>
                            </div>
                            <div className="col-xs-12">
                                <label htmlFor="customerPhone" >Số điện thoại</label>
                                <input id="customerPhone"
                                    name="customerPhone"
                                    onChange={(e) => { this.handleInputChange(e); }}
                                    onBlur={(e => { this.validateInputs(); })}

                                    value={customerPhone.value}
                                    className="form-control" />
                                <span className="text-danger">{customerPhone.message}</span>
                            </div>
                            <div className="col-xs-12">
                                <label htmlFor="customerEmail" >Email</label>
                                <input id="customerEmail"
                                    name="customerEmail"
                                    onBlur={(e => { this.validateInputs(); })}
                                    onChange={(e) => { this.handleInputChange(e); }}
                                    value={customerEmail.value}
                                    className="form-control" />
                                <span className="text-danger">{customerEmail.message}</span>
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
    const { cartManagementReducer } = state;
    const { isSucess } = cartManagementReducer;
    return {
        isSucess
    };
};


export default connect(mapStateToProps)(PlaceOrderModal);
