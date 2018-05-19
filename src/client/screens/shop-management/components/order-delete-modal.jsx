
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Modal = require("react-bootstrap-modal");

const { Header, Title, Body, Footer } = Modal;

class DeleteOrderModal extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }

    handleToggleModal() {
        this.props.handleToggleModal();
    }

    handleAcceptDelete() {
        this.props.onAcceptDetete();
    }
    render() {
        const { isOpenDeleteModal } = this.props;
        return (
            <div className="col-xs-6">
                <Modal
                    show={isOpenDeleteModal}
                    aria-labelledby="ModalHeader"
                    onHide={this.handleToggleModal.bind(this)}
                    small={true}
                >
                    <Body>
                        <p>Bạn muốn xóa đơn hàng này?</p>
                        <div className="row">
                            <div className="col-xs-6">
                                <button
                                    className="col-xs-12 btn btn-success"
                                    onClick={this.handleAcceptDelete.bind(this)}>
                                    Đồng ý
                             </button>
                            </div>
                            <div className="col-xs-6">
                                <button onClick={this.handleToggleModal.bind(this)} className="col-xs-12 btn btn-default">
                                    Hủy
                           </button>
                            </div>
                        </div>
                    </Body>
                </Modal>
            </div>
        );
    }

}

DeleteOrderModal.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    return {

    };
};


export default connect(mapStateToProps)(DeleteOrderModal);
