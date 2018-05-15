import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Modal = require("react-bootstrap-modal");

const { Header, Body, Footer } = Modal;

class PlaceOrderModal extends React.Component {
    constructor(props) {
        super(props);

    }

    handleClodeModal() {

    }
    render() {
        const { isOpenPlaceModal } = this.props;
        return (
            <div className="col-xs-6" >
                <Modal
                    show={isOpenPlaceModal}
                    aria-labelledby="ModalHeader"
                    onHide={this.handleClodeModal.bind(this)}
                    lg={true}
                >   <Header closeButton>
                        <h4 className="text-info">
                            Chỉnh sửa thông tin sản phẩm
                        </h4>
                    </Header>
                    <Body>
                        <h4 className="text-info">
                            Chỉnh sửa thông tin sản phẩm
                        </h4>
                    </Body>
                    <Footer>
                        <button className="btn btn-success"
                            style={{ width: "100px" }}
                        >
                            Cập nhật
                        </button>
                        <button
                            className="btn btn-default"
                            style={{ width: "100px" }}>
                            Hủy
                        </button>
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
