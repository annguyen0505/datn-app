import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Modal = require("react-bootstrap-modal");
const { Header, Title, Body, Footer, Dismiss } = Modal;
class ProductAddingModal extends React.Component {
    constructor(props) {
        super(props);
        this.files = [];
        this.state = {
            images: [],
            fileNames: []
        }
    }
    componentDidMount() {

    }

    handleChangeImage(e) {
        const file = e.target.files[0];
        const { images } = this.state;
        const reader = new FileReader();
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            reader.addEventListener("load", (e) => {
                this.files.push(file);
                const imgAsUrl = e.target.result;
                console.log(typeof imgAsUrl)
                const newImages = [...this.state.images, imgAsUrl];
                const newFileNames = [...this.state.fileNames, file.name];
                this.setState({
                    images: newImages,
                    fileNames: newFileNames
                });
            });
        }

        if (images.length < 3) {
            reader.readAsDataURL(file);
        }
        else {
            alert("max roi");
        }
    }

    handleLabelClick(e) {
        const fileInput = document.getElementById("file");
        fileInput.click();
    }

    handleToggleModal() {
        const { handleToggleModal } = this.props;
        handleToggleModal();
    }
    render() {
        const { isOpenAddModal } = this.props;
        const { images, fileNames } = this.state;

        const renderPreviewer = () => {
            return images.map((image, index) => {
                return (
                    <img src={image} key={index} style={{ width: "auto", height: "auto", maxWidth: "100px", maxHeight: "100px" }} />
                );
            });

        };
        return (
            <div className="col-xs-6">
                <Modal
                    show={isOpenAddModal}
                    aria-labelledby="ModalHeader"
                    onHide={this.handleToggleModal.bind(this)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Thêm mới sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{width:"650px"}} >
                            <div>
                                <label htmlFor="productName" >Tên sản phẩm</label>
                                <input id="productName" className="form-control" />
                            </div>
                            <div>
                                <button className="btn btn-success" onClick={(e) => { this.handleLabelClick() }}>chon hinh anh</button>
                                <p>{fileNames.toString().replace(/,/g,"|")}</p>
                                <input type="file" id="file" style={{ display: "none" }} onChange={(e) => { this.handleChangeImage(e); }} /><br />
                                {renderPreviewer()}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
                        <button className='btn btn-primary' >
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

ProductAddingModal.propTypes = {
    dispatch: PropTypes.func,
    isOpenAddModal: PropTypes.bool,
    handleToggleModal: PropTypes.func
};

const mapStateToProps = (state) => {
    return {

    };
};


export default connect(mapStateToProps)(ProductAddingModal);
